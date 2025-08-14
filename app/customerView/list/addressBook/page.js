"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/components/ui/reusableComponent/customerViewReusable/masterListReusable";

export default function AddressBookListPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([
    { name: "cid", label: "CID", type: "text", value: "" },
    { name: "customerName", label: "Customer Name", type: "text", value: "" },
    { name: "emailId", label: "Email Id", type: "text", value: "" },
    { name: "phone", label: "Phone", type: "text", value: "" }
  ]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("/addressBook.json");
        const data = await res.json();
        setColumns(data.columns || []);
        setRows(data.rows || []);
      } catch (error) {
        console.error("Error fetching address book data:", error);
        setColumns([]);
        setRows([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (formValues) => {
    setRows((prevRows) => {
      // Reset to original data first
      const originalRows = [
        {
          "cid": "74373212",
          "name": "SHINDEY",
          "emailId": "",
          "phone": "9797987586",
          "street": "MG ROAD",
          "country": "INDIA",
          "zipcode": "400001"
        },
        {
          "cid": "9869060",
          "name": "SINGH",
          "emailId": "",
          "phone": "9070698682",
          "street": "MG ROAD",
          "country": "INDIA",
          "zipcode": "110002"
        },
        {
          "cid": "5484512",
          "name": "SHAHRAJ",
          "emailId": "",
          "phone": "9797987586",
          "street": "MG ROAD",
          "country": "INDIA",
          "zipcode": "440002"
        },
        {
          "cid": "2532531",
          "name": "SHIVAJI",
          "emailId": "",
          "phone": "9070698682",
          "street": "NAG STREET",
          "country": "INDIA",
          "zipcode": "530068"
        },
        {
          "cid": "8757578",
          "name": "MAHADEV",
          "emailId": "",
          "phone": "9797987586",
          "street": "NAIK STREET",
          "country": "INDIA",
          "zipcode": "700001"
        },
        {
          "cid": "868696",
          "name": "RAJU YADAV",
          "emailId": "",
          "phone": "9070698682",
          "street": "MG ROAD",
          "country": "INDIA",
          "zipcode": "500001"
        },
        {
          "cid": "979662",
          "name": "SHINDEY",
          "emailId": "",
          "phone": "UK2429137394",
          "street": "NAIK STREET",
          "country": "INDIA",
          "zipcode": "400001"
        }
      ];

      // Apply filters
      return originalRows.filter((row) => {
        const cidMatch = !formValues.cid || 
          row.cid.toLowerCase().includes(formValues.cid.toLowerCase());
        
        const nameMatch = !formValues.customerName || 
          row.name.toLowerCase().includes(formValues.customerName.toLowerCase());
        
        const emailMatch = !formValues.emailId || 
          (row.emailId && row.emailId.toLowerCase().includes(formValues.emailId.toLowerCase()));
        
        const phoneMatch = !formValues.phone || 
          row.phone.toLowerCase().includes(formValues.phone.toLowerCase());

        return cidMatch && nameMatch && emailMatch && phoneMatch;
      });
    });
  };

  const handleActionClick = (action, row) => {
    switch (action) {
      case "edit":
        alert(`Edit clicked for CID: ${row.cid}`);
        break;
      case "view":
        alert(`View clicked for CID: ${row.cid}`);
        break;
      case "delete":
        alert(`Delete clicked for CID: ${row.cid}`);
        break;
      case "tripHistory":
        alert(`Trip History clicked for CID: ${row.cid}`);
        break;
      default:
        alert(`${action} clicked for CID: ${row.cid}`);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-lg text-gray-600">Loading address book data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ReusableTable
        title="Customer Address Book"
        filterFields={filters}
        columns={columns}
        rows={rows}
        onSearch={handleSearch}
        onActionClick={handleActionClick}
        enabledActions={["edit", "view", "delete"]}
        showActions={true}
        showFirstIcon={true}
        showSecondIcon={true}
        showThirdIcon={true}
        secondIconMenu={[
          { label: "Grid View", onClick: () => alert("Grid view clicked") },
          { label: "List View", onClick: () => alert("List view clicked") }
        ]}
        thirdIconMenu={[
          { label: "Export CSV", onClick: () => alert("Export CSV clicked") },
          { label: "Export PDF", onClick: () => alert("Export PDF clicked") }
        ]}
      />
    </div>
  );
}
