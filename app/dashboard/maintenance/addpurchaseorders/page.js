"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BillingForm } from "@/components/ui/reusableComponent/dashboardform";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, RotateCcw, X, Save, Plus, Trash2 } from "lucide-react";
import FormModal from "@/components/ui/reusableComponent/formmodal";
import ReusableTable from "@/components/ui/reusableComponent/reusabletable";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Validation schema for Purchase Order form
const purchaseOrderSchema = z.object({
  // Purchase Order section
  poId: z.string().min(1, "PO ID is required"),
  purchasedDate: z.string().min(1, "Purchased date is required"),
  vendor: z.string().min(1, "Vendor is required"),
  
  // Advance CMS / Drivers Amount section
  productName: z.string().optional(),
  quantity: z.string().optional(),
  uom: z.string().optional(),
  rate: z.string().optional(),
  per: z.string().optional(),
  taxPercent: z.string().optional(),
  taxType: z.string().optional(),
  taxAmount: z.string().optional(),
  amount: z.string().optional(),
  total: z.string().optional(),
  date: z.string().optional(),
  vehicleNumber: z.string().optional(),
  
  // Document Details section
  deliveryAddress: z.string().optional(),
  remarks: z.string().optional(),
});

// Component for the Advance CMS / Drivers Amount table
// Advance CMS Table configuration
const advanceCMSFields = [
  {
    key: "productName",
    label: "Product Name",
    type: "select",
    options: []
  },
  {
    key: "quantity",
    label: "Quantity",
    type: "text"
  },
  {
    key: "uom",
    label: "UOM",
    type: "text"
  },
  {
    key: "rate",
    label: "Rate",
    type: "text"
  },
  {
    key: "per",
    label: "Per",
    type: "text"
  },
  {
    key: "taxPercent",
    label: "Tax%",
    type: "text"
  },
  {
    key: "taxType",
    label: "Tax Type",
    type: "text"
  },
  {
    key: "taxAmount",
    label: "Tax Amount",
    type: "text"
  },
  {
    key: "amount",
    label: "Amount",
    type: "text"
  },
  {
    key: "total",
    label: "Total",
    type: "text"
  },
  {
    key: "date",
    label: "Date",
    type: "date"
  },
  {
    key: "vehicleNumber",
    label: "Vehicle Number",
    type: "select",
    options: []
  }
];

export default function AddPurchaseOrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);
  const [advanceCMSData, setAdvanceCMSData] = useState([]);

  // Form instances
  const purchaseOrderForm = useForm({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      poId: "SHX431",
      purchasedDate: "",
      vendor: "",
      productName: "",
      quantity: "",
      uom: "NOS",
      rate: "",
      per: "",
      taxPercent: "",
      taxType: "",
      taxAmount: "",
      amount: "",
      total: "",
      date: "",
      vehicleNumber: "",
      deliveryAddress: "",
      remarks: "",
    },
  });

  // Mock data for dropdowns with state management
  const [vendorOptions, setVendorOptions] = useState([
    "ABC Suppliers",
    "XYZ Corporation",
    "Global Parts Ltd",
    "Premium Auto Parts",
    "Quality Components",
    "Reliable Suppliers",
    "Best Parts Co",
    "Top Quality Ltd"
  ]);

  const [productNameOptions, setProductNameOptions] = useState([
    "Engine Oil",
    "Brake Pads",
    "Air Filter",
    "Tire Set",
    "Battery",
    "Spark Plugs",
    "Oil Filter",
    "Coolant"
  ]);

  const [vehicleNumberOptions, setVehicleNumberOptions] = useState([
    "BHC 246",
    "586 5GX", 
    "DMC 4583",
    "AB4-195",
    "TRK 789",
    "FLE 456",
    "CAR 321",
    "VAN 654"
  ]);

  // Update field options when dropdown options change
  const updatedAdvanceCMSFields = advanceCMSFields.map(field => {
    if (field.key === "productName") {
      return { ...field, options: productNameOptions };
    }
    if (field.key === "vehicleNumber") {
      return { ...field, options: vehicleNumberOptions };
    }
    return field;
  });

  // Form submission handlers
  const handlePurchaseOrderSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Purchase Order Data:", data);
      console.log("Advance CMS Data:", advanceCMSData);
      // Here you would typically make an API call to save the data
      alert("Purchase Order details saved successfully!");
      purchaseOrderForm.reset();
      setAdvanceCMSData([]);
    } catch (error) {
      console.error("Error saving purchase order:", error);
      alert("Error saving purchase order details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    purchaseOrderForm.reset();
    setAdvanceCMSData([]);
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
      purchaseOrderForm.reset();
      setAdvanceCMSData([]);
      // Navigate back or close form
    }
  };

  // Modal handlers
  const handlePlus = (field) => () => {
    setModalField(field);
    setModalOpen(true);
  };

  // Handle modal submit
  const handleModalSubmit = (data) => {
    if (modalField && data) {
      if (modalField === "vendor") {
        setVendorOptions((prev) => [...prev, data.name]);
      } else if (modalField === "productName") {
        setProductNameOptions((prev) => [...prev, data.name]);
      } else if (modalField === "vehicleNumber") {
        setVehicleNumberOptions((prev) => [...prev, data.name]);
      }
    }
    setModalOpen(false);
    setModalField(null);
  };

  // Form sections configuration
  const sections = [
    {
      title: "Purchase Order",
      form: purchaseOrderForm,
      onSubmit: handlePurchaseOrderSubmit,
      fields: [
        {
          name: "poId",
          label: "PO ID *",
          type: "text",
        },
        {
          name: "purchasedDate",
          label: "Purchased Date *",
          type: "date",
        },
        {
          name: "vendor",
          label: "Choose Vendor *",
          type: "select",
          options: vendorOptions,
          plusAction: handlePlus("vendor"),
        },
      ],
    },
    {
      title: "Advance CMS / Drivers Amount",
      form: purchaseOrderForm,
      onSubmit: handlePurchaseOrderSubmit,
      children: (
        <ReusableTable
          fields={updatedAdvanceCMSFields}
          data={advanceCMSData}
          onChange={setAdvanceCMSData}
          accordionTitle="Advance CMS / Drivers Amount Details"
        />
      ),
    },
    {
      title: "Document Details",
      form: purchaseOrderForm,
      onSubmit: handlePurchaseOrderSubmit,
      fields: [
        {
          name: "deliveryAddress",
          label: "Delivery Address",
          type: "textarea",
          wide: true,
        },
        {
          name: "remarks",
          label: "Remarks",
          type: "textarea",
          wide: true,
        },
      ],
    },
  ];

  return (
    <div className="">
      {/* Action Bar */}
      <div className="bg-[#006397] text-white px-6 py-4 flex justify-between items-center rounded-t-md">
        <div className="flex items-center gap-2">
          <Info size={20} />
          <span className="font-semibold">Add Purchase Order</span>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="bg-white text-[#006397] hover:bg-gray-100"
          >
            <RotateCcw size={16} className="mr-1" />
            Reset
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            size="sm"
            className="bg-red-500 text-white hover:bg-red-600"
          >
            <X size={16} className="mr-1" />
            Cancel
          </Button>
          <Button
            onClick={purchaseOrderForm.handleSubmit(handlePurchaseOrderSubmit)}
            disabled={isSubmitting}
            size="sm"
            className="bg-green-500 text-white hover:bg-green-600"
          >
            <Save size={16} className="mr-1" />
            Save
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Form Content with Accordions */}
        <BillingForm
          sections={sections}
          useAccordion={true}
        />
      </div>

      {/* Modal for adding new options */}
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalField ? 
          modalField === "vendor" ? "Add Vendor" : 
          modalField === "productName" ? "Add New Product" :
          modalField === "vehicleNumber" ? "Add New Vehicle" :
          ""
          : ""
        }
        formFields={
          modalField === "vendor" ? [
            {
              name: "shLoginAccount",
              label: "Sh Login Account *",
              type: "text"
            },
            {
              name: "password",
              label: "Password *",
              type: "text"
            },
            {
              name: "name",
              label: "Name *",
              type: "text"
            },
            {
              name: "email",
              label: "Email *",
              type: "text"
            },
            {
              name: "phone",
              label: "Phone",
              type: "text"
            },
            {
              name: "country",
              label: "Country *",
              type: "text"
            },
            {
              name: "state",
              label: "State",
              type: "text"
            },
            {
              name: "locality",
              label: "Locality(City) *",
              type: "text"
            },
            {
              name: "divisionName",
              label: "Division Name",
              type: "text"
            },
            {
              name: "street",
              label: "Street *",
              type: "text"
            },
            {
              name: "zipCode",
              label: "Zip Code *",
              type: "text"
            },
            {
              name: "street2",
              label: "Street 2",
              type: "text"
            },
            {
              name: "street3",
              label: "Street 3",
              type: "text"
            },
            {
              name: "houseNumber",
              label: "House Number",
              type: "text"
            },
            {
              name: "building",
              label: "Building",
              type: "text"
            },
            {
              name: "latitude",
              label: "Latitude *",
              type: "text"
            },
            {
              name: "longitude",
              label: "Longitude *",
              type: "text"
            }
          ] : [
            {
              name: "name",
              label: modalField === "productName" ? "Enter Product Name *" :
                     modalField === "vehicleNumber" ? "Enter Vehicle Number *" :
                     "Enter Name *",
              type: "text"
            }
          ]
        }
        onSubmit={handleModalSubmit}
        footerType="submitOnly"
        submitLabel="Save"
        dialogClassName={modalField === "vendor" ? "lg:max-w-[60rem] p-0" : "max-w-md p-0"}
      />
    </div>
  );
}
