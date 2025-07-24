import React, { useState, useMemo } from "react";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Eye, List, MapPin, FileText, Download, CheckCircle, /*Truck,*/ Clock, File, FileCheck2, FileDown, FileBarChart2, FileCheck, FileText as FileTextIcon, FileDown as FileDownIcon, FileCheck as FileCheckIcon, FileBarChart2 as FileBarChart2Icon, FolderOpen, Search, LayoutGrid, ArrowRight } from "lucide-react";
import TripDetailsModal from "./TripDetailsModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// --- Filter Tab (copied/adapted from viewtable.js) ---
function FilterTab({ filterFields, formValues, setFormValues, onSearch }) {
  const renderField = (field) => {
    const { name, label, type = "text", options = [] } = field;
    return (
      <div key={name} className="flex flex-col gap-1 w-40">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {type === "date" ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border border-gray-300",
                  !formValues[name] && "text-muted-foreground"
                )}
              >
                {formValues[name]
                  ? format(new Date(formValues[name]), "yyyy-MM-dd")
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formValues[name] ? new Date(formValues[name]) : undefined}
                onSelect={(date) =>
                  setFormValues((prev) => ({ ...prev, [name]: date ? format(date, "yyyy-MM-dd") : "" }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        ) : type === "select" ? (
          <Select
            value={formValues[name]}
            onValueChange={(value) => setFormValues((prev) => ({ ...prev, [name]: value }))}
          >
            <SelectTrigger className="w-full border border-gray-300">
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) =>
                typeof option === "string" ? (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ) : (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        ) : (
          <Input
            type={type}
            id={name}
            value={formValues[name] || ""}
            onChange={(e) => setFormValues((prev) => ({ ...prev, [name]: e.target.value }))}
            className="w-full border border-gray-300"
          />
        )}
      </div>
    );
  };
  return (
    <Card className="mb-4">
      <CardContent className="p-4 flex justify-between flex-wrap gap-4">
        <div className="flex flex-wrap items-end gap-3">
          {filterFields.map(renderField)}
          <Button
            className="bg-[#006397] hover:bg-[#02abf5] text-white px-4 rounded-full"
            onClick={() => onSearch(formValues)}
          >
            Search
          </Button>
        </div>
        <div className="flex items-end gap-6 pr-2">
          <Search size={18} className="cursor-pointer text-gray-600 mb-1" />
          <LayoutGrid size={18} className="cursor-pointer text-gray-600 mb-1" />
          <FileText size={18} className="cursor-pointer text-gray-600 mb-1" />
        </div>
      </CardContent>
    </Card>
  );
}

// --- Main Reusable Order List Component ---
export default function OrderListWithActions({
  orders = [],
  filterFields = [],
  actionsConfig = {}, // { view: true, status: true, liveTrack: true, manageDocs: true, download: true, lrReport: true, checkbox: false }
  onSearch = () => {},
  onDownload = () => {},
  onDownloadLR = () => {},
  onDownloadEPOD = () => {},
  // ...other action handlers as needed
}) {
  const [formValues, setFormValues] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view', 'status', 'liveTrack', 'manageDocs'
  const [modalOpen, setModalOpen] = useState(false);

  // --- Modal open helpers ---
  const openModal = (order, type) => {
    setSelectedOrder(order);
    setModalType(type);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
    setModalType(null);
  };

  // --- Render order card/row ---
  const renderOrderCard = (order, idx) => (
    <Card key={order.bookingId || idx} className="mb-4 shadow border border-gray-200">
      <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 gap-3">
        {/* Left: Order Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 flex-1">
          <div className="flex items-center gap-3">
            {/* Replace Truck with universal orders icon */}
            <FolderOpen className="w-8 h-8 text-blue-400" />
            <div>
              <div className="font-semibold text-lg text-[#006397]">
                Booking ID : <span className="text-blue-700">#{order.bookingId}</span>
              </div>
              <div className="text-gray-500 text-sm mt-3 flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-base font-semibold text-gray-700">{order.from}</span>
                  <span className="text-sm font-semibold text-gray-500 mt-0.5">{order.date}</span>
                </div>
                <ArrowRight className="align-middle size-7 font-bold" />
                <div className="flex flex-col items-center">
                  <span className="text-base font-semibold text-gray-700">{order.to}</span>
                  <span className="text-sm font-semibold text-gray-500 mt-0.5">{order.date}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-16 flex flex-col gap-1 min-w-[180px]">
            <div className="text-sm text-gray-700 font-medium">{order.etaLabel || "ETA"}</div>
            <div className="text-base text-blue-700 font-bold">{order.eta}</div>
          </div>
          <div className="ml-16 flex flex-col gap-1 min-w-[180px]">
            <div className="text-sm text-gray-700 font-medium">Shipment ID</div>
            <div className="text-base text-blue-700 font-bold">{order.shipmentId}</div>
          </div>
        </div>
        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {actionsConfig.checkbox && (
            <CheckCircle className="size-5 text-green-500" />
          )}
          {actionsConfig.view && (
            <Button variant="ghost" onClick={() => openModal(order, 'view')} title="View">
              <Eye className="size-5 text-[#006397]" />
            </Button>
          )}
          {actionsConfig.status && (
            <Button variant="ghost" onClick={() => openModal(order, 'status')} title="Status View">
              <List className="size-5 text-[#006397]" />
            </Button>
          )}
          {actionsConfig.liveTrack && (
            <Button variant="ghost" onClick={() => openModal(order, 'liveTrack')} title="Live Track">
              <MapPin className="size-5 text-[#006397]" />
            </Button>
          )}
          {actionsConfig.manageDocs && (
            <Button variant="ghost" onClick={() => openModal(order, 'manageDocs')} title="Manage Documents">
              <FileText className="size-5 text-[#006397]" />
            </Button>
          )}
          {actionsConfig.download && (
            <Button variant="ghost" onClick={() => onDownload(order)} title="Download ePOD">
              <Download className="size-5 text-[#006397]" />
            </Button>
          )}
          {actionsConfig.lrReport && (
            <Button variant="ghost" onClick={() => onDownloadLR(order)} title="Download LR Report">
              <FileDown className="size-5 text-[#006397]" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderModalContent = () => {
    if (!selectedOrder) return null;
    if (modalType === 'view') {
      return (
        <OrderViewModal open={true} onClose={closeModal} order={selectedOrder} />
      );
    }
    if (modalType === 'status') {
      return (
        <OrderStatusModal open={true} onClose={closeModal} order={selectedOrder} />
      );
    }
    if (modalType === 'manageDocs') {
      return (
        <OrderDocumentsModal open={true} onClose={closeModal} order={selectedOrder} />
      );
    }
    if (modalType === 'liveTrack') {
      return (
        <TripDetailsModal open={true} onClose={closeModal} shipment={selectedOrder} />
      );
    }
    return null;
  };
  

  return (
    <div>
      {/* Filter Tab */}
      <FilterTab filterFields={filterFields} formValues={formValues} setFormValues={setFormValues} onSearch={onSearch} />
      {/* Order List */}
      <div>
        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No orders found.</div>
        ) : (
          orders.map(renderOrderCard)
        )}
      </div>
      {/* Modals */}
      {modalOpen && renderModalContent()}
    </div>
  );
} 

// --- Modal Components ---
function renderKeyValueGrid(fields, columns = 4) {
  if (!fields) return <div className="text-gray-400">No data</div>;
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
      {Object.entries(fields).map(([label, value]) => (
        <div key={label} className="md:col-span-1">
          <div className="text-sm font-semibold text-[#162d56] mb-1">{label}</div>
          <div className="text-base text-gray-500">{value}</div>
        </div>
      ))}
    </div>
  );
}


function FilteredTable({ data, title }) {
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const rows = Array.isArray(data) ? data : [data];
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
  
  // Filter rows based on search term
  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    return rows.filter(row => 
      Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [rows, searchTerm]);
  
  // Pagination
  const totalPages = Math.ceil(filteredRows.length / displayCount);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * displayCount,
    currentPage * displayCount
  );
  
  return (
    <Card className="bg-white rounded-xl shadow border p-6">
      <CardHeader className="p-0 border-b pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-[#0088d2]">{title}</CardTitle>
          
          {/* Filter Controls */}
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Search</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  className="pl-10 w-48 border border-gray-300 rounded-md h-8 text-sm"
                />
              </div>
            </div>
            
            {/* Display Count */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Display</label>
              <Select
                value={displayCount.toString()}
                onValueChange={(value) => {
                  setDisplayCount(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 50].map((count) => (
                    <SelectItem key={count} value={count.toString()}>
                      {count}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600">records</span>
            </div>
            
            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="h-8 w-8 p-0"
              >
                {"<"}
              </Button>
              <span className="text-sm text-gray-600">
                {currentPage} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="h-8 w-8 p-0"
              >
                {">"}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, idx) => (
                <TableHead key={header} className={`text-[#006397] text-left text-sm font-semibold px-6 py-3 ${idx !== 0 ? 'border-l border-gray-300' : ''}`}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, rowIdx) => (
                <TableRow key={rowIdx}>
                  {headers.map((header, idx) => (
                    <TableCell key={idx} className="px-6 py-3">
                      {row[header] ?? ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} className="text-center py-6 text-gray-500">
                  {searchTerm ? "No results found for your search." : "No data available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function renderTable(data) {
  return <FilteredTable data={data} />;
}

function renderAccordionSection({ section, fields, order }) {
  if (section === "Routing Details") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(fields).map(([cardTitle, cardFields]) => (
          <Card key={cardTitle} className="bg-white rounded-xl shadow border p-6">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-semibold mb-4 border-b pb-2 text-[#0088d2]">{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {renderKeyValueGrid(cardFields, 2)}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  

  return renderKeyValueGrid(fields, 4);
}

function OrderViewModal({ open, onClose, order }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[70rem] p-0 max-h-[90vh] flex flex-col">
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <DialogTitle className="text-lg font-semibold">Order Details</DialogTitle>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <Accordion type="single" className="mb-6" defaultValue="Booking Info">
            <AccordionItem value="Booking Info">
              <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">Booking Info</AccordionTrigger>
              <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                {renderKeyValueGrid(order.bookingInfo, 4)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Reference Details">
              <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">Reference Details</AccordionTrigger>
              <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                {renderTable(order.referenceDetails, "Reference Details")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Routing Details">
              <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">Routing Details</AccordionTrigger>
              <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                {renderAccordionSection({ section: "Routing Details", fields: order.routingDetails, order })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Cargo Details">
              <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">Cargo Details</AccordionTrigger>
              <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                {renderTable(order.cargoDetails, "Cargo Details")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Involved Parties">
              <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">Involved Parties</AccordionTrigger>
              <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
                {renderTable(order.involvedParties, "Involved Parties")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <DialogFooter className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="outline" className="px-6 rounded-full">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StatusTimeline({ statusHistory }) {
  if (!statusHistory || statusHistory.length === 0) {
    return <div className="text-gray-400 text-center py-8">No status history available.</div>;
  }
  return (
    <ol className="relative border-l-2 border-blue-200 ml-4">
      {statusHistory.map((event, idx) => (
        <li key={idx} className="mb-8 ml-6 flex flex-col gap-1">
          <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full ring-8 ring-white">
            <Clock className="w-5 h-5 text-blue-600" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-blue-800 text-lg">{event.status || event.Status}</span>
            <span className="text-sm text-gray-500 font-medium">{event.time || event.Time}</span>
            <span className="text-base text-gray-400 font-medium">{event.location || event.Location}</span>
            {event.stopId || event.StopID ? (
              <span className="text-base text-gray-700 font-semibold">Stop ID: <span className="font-mono">{event.stopId || event.StopID}</span>{event.stopType || event.StopType ? `  (Type: ${event.stopType || event.StopType})` : ""}</span>
            ) : null}
            {event.comments || event.Comments ? (
              <span className="text-base text-gray-700 italic font-semibold">{event.comments || event.Comments}</span>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

function OrderStatusModal({ open, onClose, order }) {
  const [search, setSearch] = React.useState("");
  const statusHistory = order.statusHistory || [];
  const filteredHistory = search
    ? statusHistory.filter(event =>
        Object.values(event).some(val =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      )
    : statusHistory;
  const distance = order.distance || "0 miles";
  const duration = order.duration || "Not Found!";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-2xl max-h-[90vh] flex flex-col p-0">
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <DialogTitle className="text-lg font-semibold">Status View{order?.bookingId ? ` : ${order.bookingId}` : ""}</DialogTitle>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {/* Est. Distance & Duration */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
            <div className="text-base font-semibold text-gray-700">
              <span className="text-gray-500">Est. Distance:</span> {distance}
            </div>
            <div className="text-base font-semibold text-gray-700">
              <span className="text-gray-500">Est. Duration:</span> {duration}
            </div>
          </div>
          {/* Search Bar */}
          <div className="flex justify-end mb-4">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="border border-gray-300 rounded-full px-4 py-1 w-64 text-sm h-8 focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>
          <StatusTimeline statusHistory={filteredHistory} />
        </div>
        <DialogFooter className="bg-gray-50 px-6 py-4 flex justify-end space-x-2 rounded-b-lg">
          <DialogClose asChild>
            <Button variant="outline" className="px-6 rounded-full">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function OrderDocumentsModal({ open, onClose, order }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[70rem] p-0 max-h-[90vh]">

        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <DialogTitle className="text-lg font-semibold">Manage Documents</DialogTitle>
        </div>

        <div className="p-6 overflow-auto">
          <div className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FileTextIcon className="w-5 h-5 text-blue-700" /> Attached Documents
          </div>


          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#02abf5] text-white hover:bg-[#02abf5]">
                    <TableHead className="p-3 text-left text-white">S.No</TableHead>
                    <TableHead className="p-3 text-left text-white">Location</TableHead>
                    <TableHead className="p-3 text-left text-white">Doc Type</TableHead>
                    <TableHead className="p-3 text-left text-white">Document</TableHead>
                    <TableHead className="p-3 text-left text-white">Stop ID</TableHead>
                    <TableHead className="p-3 text-left text-white">Stop Type</TableHead>
                    <TableHead className="p-3 text-left text-white">Created By</TableHead>
                    <TableHead className="p-3 text-left text-white">Time</TableHead>
                    <TableHead className="p-3 text-left text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(order.documents || []).map((doc, idx) => (
                    <TableRow key={idx} className="hover:bg-gray-50 border-b border-gray-100">
                      <TableCell className="p-3">{idx + 1}</TableCell>
                      <TableCell className="p-3">{doc.location}</TableCell>
                      <TableCell className="p-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                          {doc.docType}
                        </span>
                      </TableCell>
                      <TableCell className="p-3">
                        <Button variant="link" className="text-blue-700 px-0 py-0 h-auto min-w-0">
                          View
                        </Button>
                      </TableCell>
                      <TableCell className="p-3">{doc.stopId}</TableCell>
                      <TableCell className="p-3">
                        <span className={doc.stopType === 'P' ? 'bg-green-100 text-green-800 px-2 py-1 text-xs rounded' : 'bg-red-100 text-red-800 px-2 py-1 text-xs rounded'}>
                          {doc.stopType}
                        </span>
                      </TableCell>
                      <TableCell className="p-3">{doc.createdBy}</TableCell>
                      <TableCell className="p-3">{doc.time}</TableCell>
                      <TableCell className="p-3">
                        <Button variant="ghost" className="p-1">
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>


            <div className="p-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-block bg-white border border-gray-300 rounded px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Choose Document
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={(e) => console.log(e.target.files)}
                />
                <Button className="bg-[#006397] hover:bg-[#02abf5] text-white px-4 rounded-full">
                  Upload New Document
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="bg-gray-50 px-6 py-4 flex justify-end space-x-2 rounded-b-lg">
          <DialogClose asChild>
            <Button variant="outline" className="px-6 rounded-full">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
 