"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";
import { Edit, Eye, Trash2, History } from "lucide-react";
import { formatRowsWithId } from "@/lib/utils";
import { useOrderFields } from "@/components/ui/reusableComponent/orderForms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Schema for the new shipment form
const newShipmentSchema = z.object({
  templateId: z.string().min(1, { message: "Template ID is required" }),
  originLocation: z.string().min(1, { message: "Origin Location is required" }),
  dropLocation: z.string().min(1, { message: "Drop Location is required" }),
  startDate: z.string().min(1, { message: "Start Date is required" }),
  endDate: z.string().min(1, { message: "End Date is required" }),
  carrier: z.string().min(1, { message: "Carrier is required" }),
  modeOfTransport: z.string().min(1, { message: "Mode of Transport is required" }),
});

export default function TripsListingPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [isNewShipmentModalOpen, setIsNewShipmentModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use the flexible order fields hook
  const { renderField, renderModal } = useOrderFields();


  const newShipmentForm = useForm({
    resolver: zodResolver(newShipmentSchema),
    defaultValues: {
      templateId: "",
      originLocation: "",
      dropLocation: "",
      startDate: "",
      endDate: "",
      carrier: "",
      modeOfTransport: "",
    },
  });

  // Simple axios instance
  const api = axios.create({
    timeout: 30000,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data } = await api.get("/trips/tripsData.json");
        
        const formattedColumns = data?.headers?.map((header) => ({
          accessorKey: header.accessorKey,
          header: header.header,
          sortable: true,
        })) || [];

        const formattedRows = formatRowsWithId(data?.rows || []);
        
        setColumns(formattedColumns);
        setRows(formattedRows);
        
      } catch (error) {
        setError(error.message || "Failed to fetch data");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterFields = [
    { 
      name: "fromDate", 
      label: "From Date",
      type: "date"
    },
    { 
      name: "toDate", 
      label: "To Date",
      type: "date"
    },
    { 
      name: "shipmentId", 
      label: "Shipment ID",
      type: "text"
    },
    { 
      name: "carriers", 
      label: "Carriers", 
      type: "select",
      options: [
        "Cross - Border",
        "Express Logistics", 
        "Fast Track",
        "Reliable Transport",
        "Speed Cargo",
        "Premium Logistics",
        "Swift Transport",
        "Elite Cargo"
      ]
    },
  ];

  // Central action handler
  const handleActionClick = (action, row) => {
    if (action === "delete") {
      const updated = rows.filter((r) => r.id !== row.id);
      setRows(updated);
    } else if (action === "edit") {
      console.log("Edit trip", row);
    } else if (action === "view") {
      console.log("View trip", row);
    } 
  };

  const handleSearch = (searchData) => {
    console.log("Search filters:", searchData);
  };

  const handleNewShipment = () => {
    setIsNewShipmentModalOpen(true);
  };

  const handleNewShipmentSubmit = (data) => {
    console.log("New shipment data:", data);
  };


  const newShipmentFields = [
    { 
      name: "templateId", 
      label: "Template ID *", 
      type: "text",
      placeholder: "Enter template ID"
    },
    { 
      name: "originLocation", 
      label: "Origin Location *", 
      type: "text",
      placeholder: "Select origin location"
    },
    { 
      name: "dropLocation", 
      label: "Drop Location *", 
      type: "text",
      placeholder: "Select drop location"
    },
    { 
      name: "startDate", 
      label: "Start Date *", 
      type: "date"
    },
    { 
      name: "endDate", 
      label: "End Date *", 
      type: "date"
    },
    { 
      name: "carrier", 
      label: "Carrier *", 
      type: "select",
      options: [
        "Cross - Border",
        "Express Logistics", 
        "Fast Track",
        "Reliable Transport",
        "Speed Cargo",
        "Premium Logistics",
        "Swift Transport",
        "Elite Cargo"
      ],
      placeholder: "Select carrier"
    },
    { 
      name: "modeOfTransport", 
      label: "Mode of Transport *", 
      type: "select",
      options: ["Road", "Rail", "Air", "Sea", "Multimodal"],
      placeholder: "Select mode of transport"
    },
  ];

  const handleNewShipmentCancel = () => {
    newShipmentForm.reset();
    setIsNewShipmentModalOpen(false);
  };

  const handleNewShipmentFormSubmit = (data) => {
    handleNewShipmentSubmit(data);
    newShipmentForm.reset();
    setIsNewShipmentModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!columns.length || !rows.length) return <div>No data available</div>;

  return (
    <div className="p-4">
      <ReusableTable
        title="Trips List"
        columns={columns}
        rows={rows}
        showActions={true}
        filterFields={filterFields}
        onSearch={handleSearch}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        enabledActions={["edit", "view", "delete"]}
        onActionClick={handleActionClick}
        secondIconMenu={[
          { label: "New Shipment", onClick: handleNewShipment },
        ]}
        thirdIconMenu={[
          { label: "Export Excel", onClick: () => console.log("Export Excel") },
          { label: "Export PDF", onClick: () => console.log("Export PDF") },
          { label: "Print Report", onClick: () => console.log("Print Report") },
        ]}
      />
      
      {/* New Shipment Modal */}
      <Dialog open={isNewShipmentModalOpen} onOpenChange={setIsNewShipmentModalOpen}>
        <DialogContent className="lg:max-w-[50rem] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#006397]">
              New Shipment
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Create a new shipment with the required details
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Form {...newShipmentForm}>
              <form onSubmit={newShipmentForm.handleSubmit(handleNewShipmentFormSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {newShipmentFields.map((field) => renderField(field, newShipmentForm, 0))}
                </div>

                <DialogFooter className="mt-6 pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleNewShipmentCancel}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#006397] hover:bg-[#02abf5] text-white"
                  >
                    Create Shipment
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {renderModal()}
    </div>
  );
} 