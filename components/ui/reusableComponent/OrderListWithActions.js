import React, { useState, useMemo } from "react";
import {
  Card, CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Eye, List, MapPin, FileText, Download, CheckCircle, Truck, Clock, File, FileCheck2, FileDown, FileBarChart2, FileCheck, FileText as FileTextIcon, FileDown as FileDownIcon, FileCheck as FileCheckIcon, FileBarChart2 as FileBarChart2Icon, FolderOpen, Search, LayoutGrid, ArrowRight, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Define filterFields as a constant inside the component file
const filterFields = [
  { name: "fromDate", label: "From Date", type: "date" },
  { name: "toDate", label: "To Date", type: "date" },
  { name: "bookingId", label: "Booking ID" },
  { name: "referenceNo", label: "Reference No." },
];

// --- Filter Tab (copied/adapted from viewtable.js) ---
function FilterTab({ filterFields, formValues, setFormValues, onSearch }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = () => {
    onSearch(formValues);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const renderField = (field) => {
    const { name, label, type = "text", options = [] } = field;
    return (
      <div key={name} className="flex flex-col gap-1 w-40">
        <label htmlFor={name} className="text-sm font-bold text-gray-700">
          {label} 
        </label>
        {type === "date" ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "w-full justify-start text-left font-normal border border-gray-300 h-9 text-sm rounded-full",
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
            <SelectTrigger className="w-full border border-gray-300 h-9 text-sm rounded-full">
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
            className="w-full border border-gray-300 h-9 text-sm rounded-full"
          />
        )}
      </div>
    );
  };

  return (
    <div className="mb-4 max-w-6xl mx-auto">
      {/* Simple Filter Bar - Only Booking ID and Filter */}
      <div className="flex items-center gap-3">
        {/* Booking ID Search */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700">Booking ID</label>
          <Input
            placeholder="Enter Booking ID..."
            value={formValues.bookingId || ""}
            onChange={(e) => setFormValues((prev) => ({ ...prev, bookingId: e.target.value }))}
            onKeyPress={handleKeyPress}
            className="w-48 border border-gray-300 h-9 text-sm rounded-full"
          />
        </div>

        {/* Search Button */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700 opacity-0">Search</label>
          <Button
            size="sm"
            className="bg-[#006397] hover:bg-[#02abf5] text-white px-4 rounded-full h-9 text-sm"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        {/* Filters Button */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700 opacity-0">Filters</label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 h-9 text-sm rounded-full"
          >
            <Search className="w-4 h-4" />
            Filters
            <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </div>

      {/* Expandable Advanced Filters */}
      {isExpanded && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mt-4">
          <div className="flex flex-wrap items-end gap-4">
            {/* Date Range Section */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700">From Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "w-32 justify-start text-left font-normal border border-gray-300 h-9 text-sm rounded-full",
                        !formValues.fromDate && "text-muted-foreground"
                      )}
                    >
                      {formValues.fromDate
                        ? format(new Date(formValues.fromDate), "yyyy-MM-dd")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formValues.fromDate ? new Date(formValues.fromDate) : undefined}
                      onSelect={(date) =>
                        setFormValues((prev) => ({ ...prev, fromDate: date ? format(date, "yyyy-MM-dd") : "" }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700">To Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "w-32 justify-start text-left font-normal border border-gray-300 h-9 text-sm rounded-full",
                        !formValues.toDate && "text-muted-foreground"
                      )}
                    >
                      {formValues.toDate
                        ? format(new Date(formValues.toDate), "yyyy-MM-dd")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formValues.toDate ? new Date(formValues.toDate) : undefined}
                      onSelect={(date) =>
                        setFormValues((prev) => ({ ...prev, toDate: date ? format(date, "yyyy-MM-dd") : "" }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Reference Number Section */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Reference No.</label>
              <Input
                type="text"
                id="referenceNo"
                value={formValues.referenceNo || ""}
                onChange={(e) => setFormValues((prev) => ({ ...prev, referenceNo: e.target.value }))}
                className="w-40 border border-gray-300 h-9 text-sm rounded-full"
                placeholder="Enter reference..."
              />
            </div>

            {/* Other Filter Fields */}
            {filterFields.filter(field => !['bookingId', 'fromDate', 'toDate', 'referenceNo'].includes(field.name)).map(renderField)}
            
            {/* Apply Filters Button */}
            <Button
              size="sm"
              className="bg-[#006397] hover:bg-[#02abf5] text-white px-3 rounded-full h-9 text-sm"
              onClick={handleSearch}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Reusable Order List Component ---
export default function OrderListWithActions({
  orders = [],
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
    <Card key={order.bookingId || idx} className="mb-8 border-2 bg-gray-50 rounded-3xl overflow-hidden hover:ring-2 hover:ring-blue-100 transition-all max-w-6xl mx-auto">
      {/* Compact Header Style - tightly grouped, no empty space */}
      <div className="flex items-center gap-3 py-2 px-4 rounded-t-3xl border-b border-blue-100 bg-white">
        {/* Booking ID Ribbon */}
        <span
          className="flex items-center gap-1 bg-blue-600 text-white font-bold text-sm px-3 py-1 rounded-l-lg"
          style={{
            clipPath: 'polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)',
          }}
        >
          <span>Booking ID:</span>
          <span>#{order.bookingId}</span>
        </span>
        {/* Truck Icon */}
        <span className="bg-blue-100 p-1 rounded-full flex items-center justify-center">
          <Truck className="text-blue-600 w-5 h-5" />
        </span>
        {/* Status beside truck */}
        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold border border-green-200">
          <CheckCircle className="w-4 h-4" />
          {order.status || 'Completed'}
        </span>
        {/* View Button on the right end */}
        <div className="ml-auto">
          <Button
            variant="default"
            size="default"
            onClick={() => openModal(order, 'view')}
            className="h-9 px-4 text-sm font-medium bg-[#006397] text-white border-0 rounded-full shadow-sm"
          >
            View
          </Button>
        </div>
      </div>
      <CardContent className="flex flex-col p-0">
        {/* Main Info Row */}
        <div className="grid grid-cols-[260px_260px_1fr] items-center px-5 gap-3">
          {/* City/From/To/Date */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold text-gray-700 flex items-center gap-1"><MapPin className="w-4 h-4 text-blue-400" />{order.from}</span>
              <span className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">{order.date}</span>
            </div>
            <ArrowRight className="align-middle size-7 font-bold text-blue-400" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold text-gray-700 flex items-center gap-1"><MapPin className="w-4 h-4 text-blue-400" />{order.to}</span>
              <span className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">{order.date}</span>
            </div>
          </div>
          {/* ETA/Cust Ref */}
          <div className="flex flex-row gap-12 min-w-[220px] ml-8">
            <div className="flex flex-col min-w-[140px] items-start">
              <span className="text-base font-semibold text-gray-700 whitespace-nowrap flex items-center gap-1"><Clock className="w-4 h-4 text-blue-400" />{order.eta}</span>
              <span className="text-xs text-gray-500 font-semibold">{order.etaLabel || "ETA"}</span>
            </div>
            <div className="flex flex-col min-w-[140px] items-start">
              <span className="text-base font-semibold text-gray-700 flex items-center gap-1"><FileText className="w-4 h-4 text-blue-400" />{order.shipmentId}</span>
              <span className="text-xs text-gray-500 font-medium">Cust Ref</span>
            </div>
          </div>
          {/* Action Icons */}
          <div className="flex flex-row items-center gap-3 justify-end">
            {actionsConfig.checkbox && (
              <span className="rounded-full bg-blue-100 p-2 flex items-center justify-center shadow-sm border border-blue-300">
                <CheckCircle className="size-5 text-green-500" />
              </span>
            )}
            {actionsConfig.view && (
              <Button variant="ghost" onClick={() => openModal(order, 'view')} title="View" className="rounded-full bg-blue-100 hover:bg-blue-200 p-2 m-0 flex items-center justify-center shadow-sm border border-blue-300 transition-colors">
                <Eye className="size-5 text-[#006397]" />
              </Button>
            )}
            {actionsConfig.status && (
              <Button variant="ghost" onClick={() => openModal(order, 'status')} title="Status View" className="rounded-full bg-blue-100 hover:bg-blue-200 p-2 m-0 flex items-center justify-center shadow-sm border border-blue-300 transition-colors">
                <List className="size-5 text-[#006397]" />
              </Button>
            )}
            {actionsConfig.liveTrack && (
              <Button variant="ghost" onClick={() => openModal(order, 'liveTrack')} title="Live Track" className="rounded-full bg-blue-100 hover:bg-blue-200 p-2 m-0 flex items-center justify-center shadow-sm border border-blue-300 transition-colors">
                <MapPin className="size-5 text-[#006397]" />
              </Button>
            )}
            {actionsConfig.manageDocs && (
              <Button variant="ghost" onClick={() => openModal(order, 'manageDocs')} title="Manage Documents" className="rounded-full bg-blue-100 hover:bg-blue-200 p-2 m-0 flex items-center justify-center shadow-sm border border-blue-300 transition-colors">
                <FileText className="size-5 text-[#006397]" />
              </Button>
            )}
            {actionsConfig.download && (
              <Button variant="ghost" onClick={() => onDownload(order)} title="Download ePOD" className="rounded-full bg-blue-100 hover:bg-blue-200 p-2 m-0 flex items-center justify-center shadow-sm border border-blue-300 transition-colors">
                <Download className="size-5 text-[#006397]" />
              </Button>
            )}
            {actionsConfig.lrReport && (
              <Button variant="ghost" onClick={() => onDownloadLR(order)} title="Download LR Report" className="rounded-full bg-blue-100 hover:bg-blue-200 p-2 m-0 flex items-center justify-center shadow-sm border border-blue-300 transition-colors">
                <FileDown className="size-5 text-[#006397]" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
  // --- Modal Content Renderers ---
  const renderModalContent = () => {
    if (!selectedOrder) return null;
    if (modalType === 'view') {
      // Use the accordion-style details from /orders/view/[id] (copy structure, but use selectedOrder data)
      // For brevity, just show a placeholder here; you can expand as needed
      return (
        <div className="p-4">
          <div className="font-bold text-lg mb-2">Order Details</div>
          {/* TODO: Render accordions for booking data, reference details, routing details, cargo details, involved parties, etc. */}
          <pre className="bg-gray-100 p-2 rounded text-xs">{JSON.stringify(selectedOrder, null, 2)}</pre>
        </div>
      );
    }
    if (modalType === 'status') {
      // Use StatusHistoryModal (pass dummy/selectedOrder data as needed)
      return (
        <StatusHistoryModal
          open={true}
          onClose={closeModal}
          statusHistory={selectedOrder.statusHistory || []}
          attachedDocuments={selectedOrder.attachedDocuments || []}
          drivers={selectedOrder.drivers || []}
          distance={selectedOrder.distance || "-"}
          duration={selectedOrder.duration || "-"}
        />
      );
    }
    if (modalType === 'liveTrack') {
      // Use TripDetailsModal (pass dummy/selectedOrder data as needed)
      return (
        <TripDetailsModal
          open={true}
          onClose={closeModal}
          shipment={selectedOrder}
        />
      );
    }
    if (modalType === 'manageDocs') {
      // Show manage documents modal (as in your screenshot)
      return (
        <Dialog open={true} onOpenChange={closeModal}>
          <DialogContent className="max-w-2xl p-0">
            <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
              <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                Manage Documents: {selectedOrder.bookingId}
              </DialogTitle>
            </div>
            <div className="p-6">
              <div className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FileTextIcon className="w-5 h-5 text-blue-700" /> Attached Documents
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-[#02abf5] text-white hover:bg-[#02abf5]">
                      <th className="p-3 text-left">S.No</th>
                      <th className="p-3 text-left">Location</th>
                      <th className="p-3 text-left">Document Type</th>
                      <th className="p-3 text-left">Document</th>
                      <th className="p-3 text-left">Stop ID</th>
                      <th className="p-3 text-left">Stop Type</th>
                      <th className="p-3 text-left">Created By</th>
                      <th className="p-3 text-left">Date & Time</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedOrder.documents || []).map((doc, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="p-3">{idx + 1}</td>
                        <td className="p-3">{doc.location}</td>
                        <td className="p-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">{doc.docType}</span>
                        </td>
                        <td className="p-3">
                          <Button variant="link" className="text-blue-700 px-0 py-0 h-auto min-w-0">View</Button>
                        </td>
                        <td className="p-3">{doc.stopId}</td>
                        <td className="p-3">{doc.stopType}</td>
                        <td className="p-3">{doc.createdBy}</td>
                        <td className="p-3">{doc.time}</td>
                        <td className="p-3">
                          <Button variant="ghost" className="p-1"><Download className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <Button className="bg-blue-600 text-white px-4 py-1 rounded">Upload New Document</Button>
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



