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
import { Eye, List, MapPin, FileText, Download, CheckCircle, /*Truck,*/ Clock, File, FileCheck2, FileDown, FileBarChart2, FileCheck, FileText as FileTextIcon, FileDown as FileDownIcon, FileCheck as FileCheckIcon, FileBarChart2 as FileBarChart2Icon, FolderOpen, Search, LayoutGrid, ArrowRight } from "lucide-react";
import StatusHistoryModal from "./statusHistoryModal";
import TripDetailsModal from "./TripDetailsModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

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