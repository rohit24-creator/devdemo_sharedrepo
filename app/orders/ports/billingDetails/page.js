"use client";

import { useState } from "react";
import { OrdersForm } from "@/components/ui/reusableComponent/orderForms";
import { useForm } from "react-hook-form";
import FormModal from "@/components/ui/reusableComponent/formmodal";

export default function BillingDetailsFormPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState({
    billingType: ["Prepaid", "Collect"],
    billingStatus: ["Pending", "Paid"]
  });
  const [files, setFiles] = useState([]);

  const form = useForm({
    defaultValues: {
      billingType: "",
      billingStatus: ""
    }
  });

  const handlePlus = (field) => () => {
    setModalField(field);
    setModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    if (modalField && data && data.name) {
      setDropdownOptions((prev) => ({
        ...prev,
        [modalField]: [...(prev[modalField] || []), data.name]
      }));
    }
    setModalOpen(false);
    setModalField(null);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5);
    setFiles(selectedFiles);
  };

  const sections = [
    {
      title: "Billing Details",
      type: "form",
      form,
      fields: [
        {
          name: "billingType",
          label: "Billing type *",
          type: "select",
          options: dropdownOptions.billingType,
          plusAction: handlePlus("billingType")
        },
        {
          name: "billingStatus",
          label: "Billing status *",
          type: "select",
          options: dropdownOptions.billingStatus,
          plusAction: handlePlus("billingStatus")
        },
           {
          name: "supportingDocuments",
          label: "Upload Documents",
          type: "file",
        }
      ],
    //   children: (
    //     <div className="col-span-4 mt-6">
    //       <label className="block font-medium mb-1">Upload Container files</label>
    //       <input
    //         type="file"
    //         multiple
    //         onChange={handleFileChange}
    //         accept="*"
    //         className="mb-1"
    //         // disabled={files.length >= 5}
    //       />
    //       <div className="text-xs text-gray-500 mb-2">
    //         You can upload up to 5 files.
    //       </div>
    //       {files.length > 0 && (
    //         <ul className="text-xs text-gray-700 mb-2">
    //           {files.map((file, idx) => (
    //             <li key={idx}>{file.name}</li>
    //           ))}
    //         </ul>
    //       )}
    //     </div>
    //   )
    }
  ];

  const modalFormFields = [
    {
      name: "name",
      label: "Enter Name *",
      type: "text"
    }
  ];

  return (
    <div className="p-4">
      <OrdersForm sections={sections} useAccordion={true} />
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalField ?
          modalField === "billingType" ? "Billing Type" :
          modalField === "billingStatus" ? "Billing Status" :
          ""
          : ""
        }
        formFields={modalFormFields}
        onSubmit={handleModalSubmit}
        footerType="submitOnly"
        submitLabel="Submit"
        dialogClassName="max-w-md p-0"
      />
    </div>
  );
}
