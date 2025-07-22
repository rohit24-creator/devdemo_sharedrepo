import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Route, GaugeCircle, Truck, Bell, ShieldAlert } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FileText, FileDown } from "lucide-react";

// Helper for safe value display
const safe = (v, fallback = "-") => (v !== undefined && v !== null && v !== "" ? v : fallback);


function SummaryCard({ title, children }) {
  return (
    <Card className="p-4 min-h-[90px] flex flex-col justify-between shadow-sm">
      <div className="font-semibold text-gray-700 mb-1">{title}</div>
      <div className="text-sm text-gray-600">{children}</div>
    </Card>
  );
}

// Status timeline for Status View tab
function StatusTimeline({ orders }) {
  // Find all status events from all orders, flatten and sort by time
  const allEvents = (orders || [])
    .flatMap(order => (order.statusHistory || []).map(e => ({ ...e, orderId: order.orderId })))
    .sort((a, b) => new Date(a.time) - new Date(b.time));
  if (!allEvents.length) return <div className="text-gray-400">No status history available.</div>;
  return (
    <ol className="relative border-l border-blue-200 ml-2">
      {allEvents.map((event, idx) => (
        <li key={idx} className="mb-6 ml-6">
          <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white">
            <Clock className="w-4 h-4 text-blue-600" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-blue-800">{safe(event.status)}</span>
            <span className="text-xs text-gray-500">{safe(event.time)}</span>
            <span className="text-xs text-gray-400">{safe(event.location)}</span>
            {event.comments && <span className="text-xs text-gray-600 italic">{event.comments}</span>}
          </div>
        </li>
      ))}
    </ol>
  );
}

// Helper for rendering tables
function RenderTable({ columns, rows, headerClass = "bg-blue-100 text-[#006397] font-semibold" }) {
  return (
    <table className="w-full text-sm rounded-lg overflow-hidden">
      <thead className={headerClass}>
        <tr>
          {columns.map(col => (
            <th key={col.key} className="px-4 py-2 text-left">{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className="even:bg-[#f6fbff]">
            {columns.map(col => (
              <td key={col.key} className="px-4 py-2 border-b border-[#e0e7ef]">{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Helper for rendering key-value tables
function RenderKeyValue({ fields, data }) {
  return (
    <table className="w-full text-sm rounded-lg overflow-hidden">
      <tbody>
        {fields[0] && Array.isArray(fields[0])
          ? fields.map((pair) => {

              const rowId = pair.map(field => (data.find(f => f.label === field) || {}).id).filter(Boolean).join('-') || pair.join('-');
              return (
                <tr key={rowId} className="even:bg-[#f6fbff]">
                  {pair.map((field) =>
                    field ? (
                      <React.Fragment key={field + '-' + rowId}>
                        <td key={field + '-label'} className="font-semibold px-4 py-2 text-[#006397]">{field}</td>
                        <td key={field + '-value'} className="px-4 py-2">{(data.find(f => f.label === field) || {}).value || ''}</td>
                      </React.Fragment>
                    ) : null
                  )}
                </tr>
              );
            })
          : fields.map((field) => {
              const rowObj = data.find(f => f.label === field) || {};
              const rowKey = rowObj.id || field;
              return (
                <tr key={rowKey} className="even:bg-[#f6fbff]">
                  <td className="font-semibold px-4 py-2 text-[#006397]">{field}</td>
                  <td className="px-4 py-2">{rowObj.value || ''}</td>
                </tr>
              );
            })}
      </tbody>
    </table>
  );
}

function DynamicAccordionSection({ type, label, data, fields, columns, pickupData, deliveryData, deliveryFields }) {
  return (
    <AccordionItem value={label}>
      <AccordionTrigger className="bg-[#006397] text-white px-4 py-2">{label}</AccordionTrigger>
      <AccordionContent className="bg-white p-0 rounded-b-lg">
        <div className="mt-3">
          {type === 'key-value' && (
            <RenderKeyValue fields={fields} data={data} />
          )}
          {type === 'table' && (
            <RenderTable columns={columns} rows={data} />
          )}
          {type === 'pickup-delivery' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Table */}
              <RenderTable
                columns={[
                  { key: 'label', label: 'Pickup Field' },
                  { key: 'value', label: 'Value' },
                ]}
                rows={pickupData}
              />
              {/* Delivery Table */}
              <RenderTable
                columns={[
                  { key: 'label', label: 'Delivery Field' },
                  { key: 'value', label: 'Value' },
                ]}
                rows={deliveryData}
              />
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function DetailsTab({ shipment }) {
  // Mock data for demonstration (replace with API data later)
  const data = {
    booking: [
      { label: "Company", value: "SXIN" },
      { label: "Branch", value: "SXINHYD" },
      { label: "Product", value: "AsiaDirect" },
      { label: "Service Type", value: "FTL" },
      { label: "Freight Terms", value: "Free of Charge" },
      { label: "Total Weight", value: "200.00" },
      { label: "Total Volume", value: "250.00" },
      { label: "No of Packages", value: "1.00" },
    ],
    referenceDetails: [
      { id: "DQ", name: "Delivery Note", value: "SX1745919917" },
      { id: "CTR", name: "Container Number", value: "MSCU3408414" },
      { id: "XBRDR", name: "XBorder", value: "SXIN" },
    ],
    routingDetailsPickup: [
      { label: "PartyIdentifier", value: "SX317526" },
      { label: "CustomerIdentifier", value: "SX317526" },
      { label: "Name", value: "Rotterdam Port" },
      { label: "Street", value: "3198 LK Europoort Rotterdam, Netherland" },
      { label: "City", value: "Rotterdam" },
      { label: "CountryCode", value: "NETHERLANDS" },
      { label: "ZipCode", value: "3198LK" },
      { label: "Pickup Date", value: "02 Jun, 2025" },
      { label: "Pickup Time", value: "17:00 PM" },
    ],
    routingDetailsDelivery: [
      { label: "PartyIdentifier", value: "SX317527" },
      { label: "CustomerIdentifier", value: "SX317527" },
      { label: "Name", value: "Rotterdam" },
      { label: "Street", value: "Postbus 70012 3000 KP Rotterdam NETHERLANDS" },
      { label: "City", value: "Rotterdam" },
      { label: "CountryCode", value: "NETHERLANDS" },
      { label: "ZipCode", value: "3000 KP" },
      { label: "Delivery Date", value: "02 Jun, 2025" },
      { label: "Delivery Time", value: "23:00 PM" },
    ],
    involvedParties: [
      { type: "Shipper", partyId: "SX317524", customerId: "SX317524", name: "Ankleshwar", street: "Ankleshwar", city: "Ankleshwar" },
      { type: "Consignee", partyId: "SX317527", customerId: "SX317527", name: "Rotterdam", street: "Rotterdam", city: "Rotterdam" },
      { type: "Carrier", partyId: "SX222209", customerId: "", name: "BHARAT CARRIER", street: "VISAKHAPATNAM", city: "VISAKHAPATNAM" },
      { type: "Customer", partyId: "SX317523", customerId: "", name: "cohizon", street: "Mumbai", city: "Mumbai" },
    ],
    cargoDetails: [
      { number: "code item", type: "METALS", description: "code item", weight: "200.000", volume: "250.000" },
    ],
  };

  // Config for dynamic rendering (no design classes)
  const sections = [
    {
      key: 'booking',
      label: 'Booking',
      type: 'key-value',
      fields: [
        ["Company", "Freight Terms"],
        ["Branch", "Total Weight"],
        ["Product", "Total Volume"],
        ["Service Type", "No of Packages"],
      ],
    },
    {
      key: 'referenceDetails',
      label: 'Reference Details',
      type: 'table',
      columns: [
        { key: 'id', label: 'Reference ID' },
        { key: 'name', label: 'Reference Name' },
        { key: 'value', label: 'Value' },
      ],
    },
    {
      key: 'routingDetails',
      label: 'Routing Details',
      type: 'pickup-delivery',
      pickupKey: 'routingDetailsPickup',
      deliveryKey: 'routingDetailsDelivery',
      fields: [
        "PartyIdentifier",
        "CustomerIdentifier",
        "Name",
        "Street",
        "City",
        "CountryCode",
        "ZipCode",
        "Pickup Date",
        "Pickup Time",
      ],
      deliveryFields: [
        "PartyIdentifier",
        "CustomerIdentifier",
        "Name",
        "Street",
        "City",
        "CountryCode",
        "ZipCode",
        "Delivery Date",
        "Delivery Time",
      ],
    },
    {
      key: 'involvedParties',
      label: 'Involved Parties',
      type: 'table',
      columns: [
        { key: 'type', label: 'Party Type' },
        { key: 'partyId', label: 'PartyIdentifier' },
        { key: 'customerId', label: 'CustomerIdentifier' },
        { key: 'name', label: 'Name' },
        { key: 'street', label: 'Street' },
        { key: 'city', label: 'City' },
      ],
    },
    {
      key: 'cargoDetails',
      label: 'Cargo Details',
      type: 'table',
      columns: [
        { key: 'number', label: 'Number' },
        { key: 'type', label: 'Type' },
        { key: 'description', label: 'Description' },
        { key: 'weight', label: 'Weight' },
        { key: 'volume', label: 'Volume' },
      ],
    },
  ];

  return (
    <Accordion type="multiple" defaultValue={sections.map(s => s.label)} className="space-y-2">
      {sections.map(section => (
        <DynamicAccordionSection
          key={section.key}
          type={section.type}
          label={section.label}
          data={data[section.key]}
          fields={section.fields}
          columns={section.columns}
          pickupData={data[section.pickupKey]}
          deliveryData={data[section.deliveryKey]}
          deliveryFields={section.deliveryFields}
        />
      ))}
    </Accordion>
  );
}

// Documents tab: List attached documents from all orders
function DocumentsTab({ orders }) {
  const allDocs = (orders || []).flatMap(order => order.attachedDocuments || []);
  if (!allDocs.length) return <div className="text-gray-400">No documents available.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border">
        <thead className="bg-blue-50">
          <tr>
            <th className="p-2">Order ID</th>
            <th className="p-2">Type</th>
            <th className="p-2">Name</th>
            <th className="p-2">Location</th>
            <th className="p-2">Time</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allDocs.map((doc, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{safe(doc.orderId)}</td>
              <td className="p-2">{safe(doc.docType)}</td>
              <td className="p-2">{safe(doc.document)}</td>
              <td className="p-2">{safe(doc.location)}</td>
              <td className="p-2">{safe(doc.time)}</td>
              <td className="p-2 flex gap-2">
                <Button size="icon" variant="ghost"><FileText className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost"><FileDown className="w-4 h-4" /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Timeline View: Show all order status events in a timeline (grouped by order)
function TimelineTab({ orders }) {
  if (!orders?.length) return <div className="text-gray-400">No timeline data.</div>;
  return (
    <div className="space-y-6">
      {orders.map((order, idx) => (
        // Use a unique id if available, else fallback to orderId-idx
        <Card key={order.id || order.uuid || `${order.orderId}-${idx}`} className="p-4">
          <div className="font-semibold text-blue-700 mb-2">Order: {safe(order.orderId)}</div>
          <StatusTimeline orders={[order]} />
        </Card>
      ))}
    </div>
  );
}


function ContainerInfoTab({ shipment }) {
  // Mock data for demonstration (replace with API data later)
  const containerDetails = {
    containerNumber: "MSCU3408414",
    containerType: "20' DRY VAN",
    billOfLading: "MEDUVY292238",
    podEtaDate: "07/05/2025",
    latestMove: "YANTIAN, CN",
    shippedFrom: "YANTIAN, CN",
    shippedTo: "MANZANILLO, MX",
    portOfLoad: "YANTIAN, CN",
    portOfDischarge: "MANZANILLO, MX",
    deliveredStatus: "No",
  };
  const containerEvents = [
    {
      order: 3,
      date: "07/05/2025",
      location: "MANZANILLO, MX",
      unLocationCode: "MXZLO",
      description: "Estimated Time of Arrival",
      details: "MANZANILLO EXPRESS, 2515E",
      equipmentHandlingName: "SSA MEXICO HOLDINGS, S.A. DE C.V.",
      smdgCode: "SSAMX",
      vesselIMO: "9520039",
      vesselFlag: "MH",
    },
    {
      order: 2,
      date: "09/04/2025",
      location: "YANTIAN, CN",
      unLocationCode: "CNYTN",
      description: "Export Loaded on Vessel",
      details: "MANZANILLO EXPRESS, 2515E",
      equipmentHandlingName: "SSA MEXICO HOLDINGS, S.A. DE C.V.",
      smdgCode: "SSAMX",
      vesselIMO: "9520039",
      vesselFlag: "MH",
    },
  ];

  const containerDetailsFields = [
    { key: "containerNumber", label: "Container Number" },
    { key: "containerType", label: "Container Type" },
    { key: "billOfLading", label: "Bill Of Lading Number" },
    { key: "podEtaDate", label: "Pod ETA Date" },
    { key: "latestMove", label: "Latest Move" },
    { key: "shippedFrom", label: "Shipped From" },
    { key: "shippedTo", label: "Shipped To" },
    { key: "portOfLoad", label: "Port Of Load" },
    { key: "portOfDischarge", label: "Port Of Discharge" },
    { key: "deliveredStatus", label: "Delivered Status" },
  ];

  const containerEventFields = [
    { key: "order", label: "Order" },
    { key: "date", label: "Date" },
    { key: "location", label: "Location" },
    { key: "unLocationCode", label: "UnLocationCode" },
    { key: "description", label: "Description" },
    { key: "details", label: "Details" },
    { key: "equipmentHandlingName", label: "Equipment Handling Name" },
    { key: "smdgCode", label: "SMDG Code" },
    { key: "vesselIMO", label: "Vessel IMO" },
    { key: "vesselFlag", label: "Vessel Flag" },
  ];

  return (
    <Accordion type="multiple" defaultValue={["Container Tracking Details", "Container Events"]} className="space-y-2">
      {/* Container Tracking Details Accordion */}
      <AccordionItem value="Container Tracking Details">
        <AccordionTrigger className="bg-[#006397] text-white px-4 py-2">Container Tracking Details</AccordionTrigger>
        <AccordionContent className="bg-white p-0 rounded-b-lg">
          <div className="p-4">
            <table className="w-full text-sm rounded-lg overflow-hidden">
              <tbody>
                {containerDetailsFields.map(field => (
                  <tr key={field.key} className="even:bg-[#f6fbff]">
                    <td className="font-semibold px-4 py-2 text-[#006397] w-1/3">{field.label}</td>
                    <td className="px-4 py-2">{containerDetails[field.key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* Container Events Accordion (all events in one accordion) */}
      <AccordionItem value="Container Events">
        <AccordionTrigger className="bg-[#006397] text-white px-4 py-2">Container Events</AccordionTrigger>
        <AccordionContent className="bg-white p-0 rounded-b-lg">
          <div className="p-4 space-y-6">
            {containerEvents.map(event => (
              <div key={event.order} className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                <div className="font-semibold text-blue-900 mb-1">Order: {event.order}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-sm">
                  {containerEventFields.map(field => (
                    <div key={field.key}>
                      <span className="font-semibold">{field.label}:</span> {event[field.key]}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// Right sidebar summary tile
function SummaryTile({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center p-2 bg-gray-100 rounded min-w-[80px]">
      <Icon className="mb-1 text-blue-600" />
      <span className="text-xs font-semibold text-gray-700">{label}</span>
      <span className="text-xs text-gray-500">{value}</span>
    </div>
  );
}

export default function TripDetailsModal({ open, onClose, shipment }) {
  if (!shipment) return null;
  // Example calculations for summary tiles (replace with real logic as needed)
  const eta = "0:0:0";
  const mi = shipment.route?.segments?.reduce((sum, seg) => sum + (parseFloat(seg.distance) || 0), 0) + " mi";
  const speed = "0 MPH";
  const hos = "383 Hr";
  const fence = "OUT";
  const alarm = "0";
  const routeLabel = shipment.route?.segments?.map(seg => seg.location).join(" → ") || "-";

  // Last location logic
  const lastOrder = shipment.orders?.[shipment.orders.length - 1] || {};
  const lastLocation = lastOrder.location || shipment.destination;
  const lastStatus = lastOrder.status || shipment.status;
  const lastTime = lastOrder.endDT || shipment.endDT;

  // Driver details
  const driver = shipment.driver || "N/A";
  const vehicle = shipment.vehicle || "N/A";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[106rem] h-[97vh] max-h-[97vh] p-0 rounded-2xl flex flex-col overflow-hidden" showCloseButton={false}>
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
          <DialogTitle className="text-lg font-semibold">
            Trip Details / Live Track: <span className="font-mono">{shipment?.id}</span>
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="text-white">✕</Button>
          </DialogClose>
        </div>
        {/* Main Layout */}
        <div className="flex flex-1 h-full overflow-hidden">
          {/* Left: Main Content */}
          <div className="flex-1 flex flex-col overflow-y-auto p-6 bg-gray-50">
            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <SummaryCard title="Trip Details">
                <div>Trip ID: <span className="font-bold">{safe(shipment.id)}</span></div>
                <div>Order Ref: <span>{shipment.orders?.map(o => o.requestId).filter(Boolean).join(", ")}</span></div>
              </SummaryCard>
              <SummaryCard title="Address Details">
                <div>Pickup: <span>{shipment.source}</span></div>
                <div>Drop: <span>{shipment.destination}</span></div>
                <div>Start: <span>{shipment.startDT}</span></div>
                <div>End: <span>{shipment.endDT}</span></div>
              </SummaryCard>
              <SummaryCard title="Last Location">
                <div>Status: <span>{lastStatus}</span></div>
                <div>Location: <span>{lastLocation}</span></div>
                <div>Time: <span>{lastTime}</span></div>
              </SummaryCard>
              <SummaryCard title="Distance Details">
                <div>Travelled: <span>{mi}</span></div>
                <div>Pings: <span>0</span></div>
              </SummaryCard>
              <SummaryCard title="Driver Details">
                <div>Name: <span>{driver}</span></div>
                <div>Vehicle: <span>{vehicle}</span></div>
              </SummaryCard>
            </div>
            {/* Tabs */}
            <Tabs defaultValue="status" className="flex-1">
              <TabsList className="mb-4 grid grid-cols-5 w-full">
                <TabsTrigger value="status">Status View</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="timeline">Timeline View</TabsTrigger>
                <TabsTrigger value="container">Container Info</TabsTrigger>
              </TabsList>
              <TabsContent value="status">
                <div className="p-4 bg-white rounded shadow flex flex-col md:flex-row gap-8">
                  {/* Left: Status Timeline */}
                  <div className="flex-1 min-w-0">
                    <StatusTimeline orders={shipment.orders} />
                  </div>
                  {/* Right: Larger Sticky Map */}
                  <div className="w-full md:w-[650px] lg:w-[800px] max-w-[1000px] min-h-[340px] h-[400px] flex items-center justify-center ml-0 md:ml-8 sticky top-8 self-start">
                    <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center shadow-inner">
                      <span className="text-gray-500">[Map will be shown here]</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="details">
                <div className="p-4 bg-white rounded shadow">
                  <DetailsTab shipment={shipment} />
                </div>
              </TabsContent>
              <TabsContent value="documents">
                <div className="p-4 bg-white rounded shadow">
                  <DocumentsTab orders={shipment.orders} />
                </div>
              </TabsContent>
              <TabsContent value="timeline">
                <div className="p-4 bg-white rounded shadow">
                  <TimelineTab orders={shipment.orders} />
                </div>
              </TabsContent>
              <TabsContent value="container">
                <div className="p-4 bg-white rounded shadow">
                  <ContainerInfoTab shipment={shipment} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          {/* Right: Sidebar */}
          <div className="w-[350px] min-w-[300px] max-w-[400px] bg-white border-l flex flex-col p-4 gap-4">
            {/* Summary Tiles */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <SummaryTile icon={Clock} label="ETA" value={eta} />
              <SummaryTile icon={Route} label="mi" value={mi} />
              <SummaryTile icon={MapPin} label="Route" value={routeLabel} />
              <SummaryTile icon={GaugeCircle} label="Speed" value={speed} />
              <SummaryTile icon={Truck} label="HOS" value={hos} />
              <SummaryTile icon={ShieldAlert} label="Fence Warning" value={fence} />
              <SummaryTile icon={Bell} label="Alarm" value={alarm} />
            </div>
            {/* Map Placeholder */}
            <div className="flex-1 bg-gray-200 rounded flex items-center justify-center min-h-[200px]">
              <span className="text-gray-500">[Map will be shown here]</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 