"use client";
import React, { useRef } from "react";
import { z } from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/billingForm";
import { Button } from "@/components/ui/button";

const documentData = [
  { documentId: "DOC001", name: "Invoice" },
  { documentId: "DOC002", name: "Packing List" },
  { documentId: "DOC003", name: "Bill of Lading" },
];

const documentListColumns = [
  {
    accessorKey: "documentId",
    header: "Document ID",
    type: "select",
    options: documentData.map(d => d.documentId),
    placeholder: "Select Document ID"
  },
  {
    accessorKey: "name",
    header: "Name",
    type: "text",
    disabled: true,
    placeholder: "Document Name"
  },
  {
    accessorKey: "document",
    header: "Document",
    type: "file",
    placeholder: "Upload Document"
  },
  {
    accessorKey: "createdDate",
    header: "Created Date",
    type: "date",
    placeholder: "Select Date"
  },
];

const remarksColumns = [
  {
    accessorKey: "remarkType",
    header: "Remark Type",
    type: "text",
    placeholder: "Enter Remark Type"
  },
  {
    accessorKey: "description",
    header: "Description",
    type: "text",
    placeholder: "Enter Description"
  },
];


const documentRowSchema = z.object({
  documentId: z.string().min(1, "Document ID is required"),
  name: z.string().min(1, "Name is required"), 
  document: z.any().refine(val => val && val !== "", { message: "Document is required" }),
  createdDate: z.string().min(1, "Created Date is required"),
});

const remarksRowSchema = z.object({
  remarkType: z.string().min(1, "Remark Type is required"),
  description: z.string().min(1, "Description is required"),
});

// Overall page validation schema
const pageSubmissionSchema = z.object({
  documentList: z.array(documentRowSchema).min(1, "At least one document is required"),
  remarks: z.array(remarksRowSchema).min(1, "At least one remark is required"),
});

export default function ReferenceInfoPage() {
  // Refs to access table data from BillingForm
  const documentTableRef = useRef(null);
  const remarksTableRef = useRef(null);
  const handleTableSave = (rowData, rowIndex, errors) => {
    if (errors && Object.keys(errors).length > 0) {
      console.log("Document List has validation errors for row", rowIndex, ":", errors);
    } else {
      console.log("Document List row saved:", rowData, "at index:", rowIndex);
    }
  };

  const handleRemarksSave = (rowData, rowIndex, errors) => {
    if (errors && Object.keys(errors).length > 0) {
      console.log("Remarks has validation errors for row", rowIndex, ":", errors);
    } else {
      console.log("Remarks row saved:", rowData, "at index:", rowIndex);
    }
  };

  // Overall form submission handler
  const handleOverallSubmit = () => {
    try {
      // Get data from both tables
      const rawDocumentListData = documentTableRef.current?.getData() || [];
      const rawRemarksData = remarksTableRef.current?.getData() || [];

      // Filter out empty default rows (rows where all required fields are empty)
      const documentListData = rawDocumentListData.filter(row => 
        row.documentId?.trim() || row.name?.trim() || row.document || row.createdDate?.trim()
      );
      
      const remarksData = rawRemarksData.filter(row => 
        row.remarkType?.trim() || row.description?.trim()
      );

      console.log("Filtered data - Documents:", documentListData.length, "Remarks:", remarksData.length);

      // Validate only non-empty data
      const result = pageSubmissionSchema.safeParse({
        documentList: documentListData,
        remarks: remarksData
      });

      if (result.success) {
        alert("Page submitted successfully!");
        console.log("Submitted data:", result.data);
      } else {
        console.error("Validation failed - Raw errors:", result.error.issues);
        
        let errorMsg = "Validation failed:\n\n";
        
        // Group errors by table
        const docErrors = result.error.issues.filter(issue => issue.path[0] === 'documentList');
        const remarkErrors = result.error.issues.filter(issue => issue.path[0] === 'remarks');
        
        if (docErrors.length > 0) {
          errorMsg += "Document List:\n";
          docErrors.forEach(issue => {
            const rowIndex = issue.path[1] + 1;
            const field = issue.path[2];
            errorMsg += `  Row ${rowIndex} - ${field}: ${issue.message}\n`;
          });
          errorMsg += "\n";
        }
        
        if (remarkErrors.length > 0) {
          errorMsg += "Remarks:\n";
          remarkErrors.forEach(issue => {
            const rowIndex = issue.path[1] + 1;
            const field = issue.path[2];
            errorMsg += `  Row ${rowIndex} - ${field}: ${issue.message}\n`;
          });
        }
        
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission error occurred.");
    }
  };

  const sections = [
    {
      type: "table",
      title: "Document List",
      dynamicRows: true,
      showActions: false, 
      columns: documentListColumns,
      defaultRow: {
        documentId: "",
        name: "",
        document: "",
        createdDate: "",
      },
      onSave: handleTableSave,
      mappingConfig: {
        documentId: {
          keyField: "documentId",
          data: documentData,
          mappedFields: ["name"]
        }
      },
      tableSchema: documentRowSchema,
      ref: documentTableRef,
    },
    {
      type: "table",
      title: "Remarks",
      dynamicRows: true,
      showActions: false, 
      columns: remarksColumns,
      defaultRow: {
        remarkType: "",
        description: "",
      },
      onSave: handleRemarksSave,
      tableSchema: remarksRowSchema,
      ref: remarksTableRef,
    },
  ];


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#006397] mb-4">Reference Info</h1>
      <BillingForm sections={sections} useAccordion={true} />
      
      <div className="mt-6 flex justify-end">
        <Button 
          onClick={handleOverallSubmit}
          className="bg-[#006397] hover:bg-[#02abf5] text-white rounded-full px-8 py-2"
        >
          Submit Reference Info
        </Button>
      </div>
    </div>
  );
}
