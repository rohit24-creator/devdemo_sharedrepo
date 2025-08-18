"use client";

import { useState, useEffect } from "react";
import ReusableTable from "@/components/ui/reusableComponent/viewtable";

export default function DeliveryOrdersPage() {
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/deliveryOrders.json');
        const data = await response.json();
        setDeliveryOrders(data);
      } catch (error) {
        console.error('Error fetching delivery orders:', error);
        setDeliveryOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Column definitions based on the image
  const columns = [
    {
      accessorKey: "adviceNumber",
      header: "Advice Number",
      sortable: true,
    },
    {
      accessorKey: "shipperName",
      header: "Shipper Name",
      sortable: true,
    },
    {
      accessorKey: "shipperContact",
      header: "Shipper Contact",
      sortable: true,
    },
    {
      accessorKey: "consigneeName",
      header: "Consignee Name",
      sortable: true,
    },
    {
      accessorKey: "consigneeContact",
      header: "Consignee Contact",
      sortable: true,
    },
    {
      accessorKey: "carrierName",
      header: "Carrier Name",
      sortable: true,
    },
    {
      accessorKey: "vesselName",
      header: "Vessel Name",
      sortable: true,
    },
    {
      accessorKey: "voyageNo",
      header: "Voyage No",
      sortable: true,
    },
  ];

  // Filter fields based on the image
  const filterFields = [
    {
      name: "adviceNumber",
      label: "Advice Number",
      type: "text",
    },
    {
      name: "fromDate",
      label: "From Date",
      type: "date",
    },
    {
      name: "toDate",
      label: "To Date",
      type: "date",
    },
  ];

  // Action handlers
  const handleActionClick = (action, row) => {
    console.log(`${action} action clicked for:`, row);
    // Handle different actions here
    switch (action) {
      case "edit":
        // Handle edit
        break;
      case "view":
        // Handle view
        break;
      case "delete":
        // Handle delete
        break;
      case "tripHistory":
        // Handle trip history
        break;
      default:
        break;
    }
  };

  // Search handler
  const handleSearch = (formValues) => {
    console.log("Search with values:", formValues);
    // Implement search logic here
  };

  // Menu items for the icons
  const secondIconMenu = [
    { label: "Export to Excel", onClick: () => console.log("Export to Excel") },
    { label: "Export to PDF", onClick: () => console.log("Export to PDF") },
    { label: "Print", onClick: () => console.log("Print") },
  ];

  const thirdIconMenu = [
    { label: "Download Report", onClick: () => console.log("Download Report") },
    { label: "Email Report", onClick: () => console.log("Email Report") },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading delivery orders...</div>
      </div>
    );
  }

  return (
    <div className=" p-6">
      <ReusableTable
        title="Delivery Orders"
        columns={columns}
        rows={deliveryOrders}
        filterFields={filterFields}
        onSearch={handleSearch}
        onActionClick={handleActionClick}
        enabledActions={["edit", "view", "delete", "tripHistory"]}
        showActions={true}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
      />
    </div>
  );
}
