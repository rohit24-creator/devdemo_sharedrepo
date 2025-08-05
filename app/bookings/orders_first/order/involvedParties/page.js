"use client";

import React, { useState } from "react";
import ReusableTable from "../../../../../components/ui/reusableComponent/reusabletable";
import {
  UserSquare,
  User,
  Briefcase,
  MapPin,
  Building2,
  Landmark,
  Globe,
  Hash,
  Phone,
  Printer,
  Mail,
} from "lucide-react";

const partyFormFields = [
  { name: "partyId", label: "Party ID", type: "text", required: true },
  { name: "partyName", label: "Party Name", type: "text", required: true },
  { name: "role", label: "Role", type: "select", options: ["Shipper", "Consignee", "Notify", "Carrier", "Agent", "Other"] },
  { name: "street", label: "Street", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "province", label: "Province", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "zipcode", label: "Zipcode", type: "text" },
  { name: "mobile", label: "Mobile", type: "text" },
  { name: "fax", label: "Fax", type: "text" },
  { name: "email", label: "Email", type: "text" },
];

const partyFields = [
  { key: "partyId", label: "Party ID", type: "text+icons", icon: UserSquare, showPlus: false },
  { key: "partyName", label: "Party Name", type: "text", icon: User },
  { key: "role", label: "Role", type: "select", icon: Briefcase, options: ["Shipper", "Consignee", "Notify", "Carrier", "Agent", "Other"] },
  { key: "street", label: "Street", type: "text", icon: MapPin },
  { key: "city", label: "City", type: "text", icon: Building2 },
  { key: "province", label: "Province", type: "text", icon: Landmark },
  { key: "country", label: "Country", type: "text", icon: Globe },
  { key: "zipcode", label: "Zipcode", type: "text", icon: Hash },
  { key: "mobile", label: "Mobile", type: "text", icon: Phone },
  { key: "fax", label: "Fax", type: "text", icon: Printer },
  { key: "email", label: "Email", type: "text", icon: Mail },
];

// Example party list data for the modal
const partyList = [
  { "Party ID": "P001", "Party Name": "Acme Corp", Role: "Shipper", City: "New York", Country: "USA" },
  { "Party ID": "P002", "Party Name": "Beta Ltd", Role: "Consignee", City: "London", Country: "UK" },
  { "Party ID": "P003", "Party Name": "Gamma LLC", Role: "Notify", City: "Berlin", Country: "Germany" },
];
const partyColumns = ["Party ID", "Party Name", "Role", "City", "Country"];

export default function InvolvedPartiesPage() {
  const [partyData, setPartyData] = useState([]);

  return (
    <div style={{ padding: 24 }}>
      <ReusableTable
        fields={partyFields}
        data={partyData}
        onChange={setPartyData}
        accordionTitle="Involved Parties"
        formFields={partyFormFields}
        modalData={{
          data: partyList,
          columns: partyColumns,
          title: "List of Parties"
        }}
      />
    </div>
  );
}
