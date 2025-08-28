import { useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Search, LayoutGrid, FileText, Paperclip, CloudUpload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Helper to determine if a field is a date/time field
const isDateTimeField = (key) =>
  [
    "accept",
    "gateIn",
    "pickup",
    "gateOut",
    "inTransit",
    "destGateIn",
    "delivery",
    "destGateOut",
    "close",
  ].includes(key);

function FilterTab({
  filterFields = [],
  onFilterChange = () => {},
  onSearch = () => {},
  showFirstIcon = true,
  showSecondIcon = true,
  showThirdIcon = true,
  secondIconMenu = [],
  thirdIconMenu = [],
}) {
  // Local state for filter values
  const [formValues, setFormValues] = useState(() => {
    const initial = {};
    filterFields.forEach(f => { initial[f.name] = f.value || ""; });
    return initial;
  });

  const handleChange = (name, value) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    onFilterChange(name, value);
  };

  const renderField = (field) => {
    const { name, label, type = "text", options = [] } = field;
    return (
      <div key={name} className="flex flex-col gap-1"> {/* Default width */}
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {type === "date" ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border border-gray-300", // Default size
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
                  handleChange(name, date ? format(date, "yyyy-MM-dd") : "")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        ) : type === "select" ? (
          <Select
            value={formValues[name]}
            onValueChange={(value) => handleChange(name, value)}
          >
            <SelectTrigger className="w-full border border-gray-300"> {/* Default size */}
              <SelectValue placeholder={`Select`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) =>
                typeof option === "string" ? (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ) : (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        ) : (
          <Input
            type={type}
            id={name}
            value={formValues[name] || ""}
            onChange={(e) => handleChange(name, e.target.value)}
            className="w-full border border-gray-300" // Default size
          />
        )}
      </div>
    );
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4 flex justify-between items-center flex-wrap gap-4">
        <div className="flex flex-wrap items-end gap-3">
          {filterFields.map(renderField)}
          <Button
            className="bg-[#006397] text-white px-4 rounded-full h-10 flex items-center gap-2"
            onClick={() => onSearch(formValues)}
          >
            <Search size={16} /> Search
          </Button>
        </div>
        <div className="flex items-end gap-6 pr-2">
          {showFirstIcon && (
            <Search size={18} className="cursor-pointer text-gray-600 mb-1" />
          )}
          {showSecondIcon && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <LayoutGrid size={18} className="cursor-pointer text-gray-600 mb-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {secondIconMenu.map((item, idx) => (
                  <DropdownMenuItem key={idx} onClick={item.onClick}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {showThirdIcon && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <FileText size={18} className="cursor-pointer text-gray-600 mb-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {thirdIconMenu.map((item, idx) => (
                  <DropdownMenuItem key={idx} onClick={item.onClick}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReusableMassStatus({
  columns = [],
  data = [],
  filterFields = [],
  onFilterChange = () => {},
  onSearch = () => {},
  showFirstIcon = true,
  showSecondIcon = true,
  showThirdIcon = true,
  secondIconMenu = [],
  thirdIconMenu = [],
}) {
  // Local state for editable fields
  const [tableData, setTableData] = useState(() =>
    data.map((row) => ({ ...row }))
  );
  // Checkbox selection state
  const [selectedRows, setSelectedRows] = useState([]);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [docModalRow, setDocModalRow] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState({});

  // Checkbox logic
  const isAllSelected =
    tableData.length > 0 && tableData.every((row) => selectedRows.includes(row.id));
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map((row) => row.id));
    }
  };
  const toggleRow = (rowId) => {
    setSelectedRows((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  // Handle input change
  const handleInputChange = (rowIdx, key, value) => {
    setTableData((prev) => {
      const updated = [...prev];
      updated[rowIdx] = { ...updated[rowIdx], [key]: value };
      return updated;
    });
  };

  // Render editable cell
  const renderCell = (row, rowIdx, col) => {
    // Main columns: always read-only (from JSON)
    if (!isDateTimeField(col.accessorKey) && col.readOnly !== false) {
      // If you want to make some columns editable, set readOnly: false in column config
      return <span>{row[col.accessorKey] || ""}</span>;
    }
    // Date/time fields: use date-time picker
    if (isDateTimeField(col.accessorKey)) {
      const value = row[col.accessorKey] || "";
      let dateValue = value ? new Date(value) : undefined;
      const popoverKey = `${rowIdx}-${col.accessorKey}`;
      
      return (
        <Popover open={popoverOpen[popoverKey]} onOpenChange={(open) => setPopoverOpen(prev => ({ ...prev, [popoverKey]: open }))}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border border-gray-300 px-2 py-1 text-base h-9 min-h-[36px]", // Increased height and font size for table fields with minimum height
                !value && "text-muted-foreground"
              )}
            >
              {value ? value : <span className="text-white">Select date & time</span>}
              <CalendarIcon size={18} className="ml-2 text-gray-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateValue}
              onSelect={(date) => {
                if (date) {
                  // Set time to now if not present
                  const now = new Date();
                  date.setHours(now.getHours(), now.getMinutes());
                  handleInputChange(rowIdx, col.accessorKey, format(date, "dd-MM-yyyy HH:mm:ss"));
                  setPopoverOpen(prev => ({ ...prev, [popoverKey]: false }));
                }
              }}
              initialFocus
            />
            {/* Time picker (simple dropdown for demo) */}
            <div className="flex gap-2 mt-2 px-2 pb-2">
              <Input
                type="time"
                value={value ? value.split(" ")[1]?.slice(0,5) : ""}
                onChange={e => {
                  const datePart = value ? value.split(" ")[0] : format(new Date(), "dd-MM-yyyy");
                  handleInputChange(rowIdx, col.accessorKey, `${datePart} ${e.target.value}:00`);
                }}
                className="w-28 text-base h-9" // Increased height and font size for table fields
              />
            </div>
          </PopoverContent>
        </Popover>
      );
    }
    // All other fields: editable input
    return (
      <Input
        value={row[col.accessorKey] || ""}
        onChange={e => handleInputChange(rowIdx, col.accessorKey, e.target.value)}
        className="w-full text-xs px-2 py-1 border border-gray-300" // Default size
      />
    );
  };

  // Group columns for tabbed header
  const nonGroupedCols = columns.filter(col => !col.group || col.group === "");
  // Find indices for pickup and inTransit for Origin, delivery and close for Destination
  const pickupIdx = columns.findIndex(col => col.accessorKey === "pickup");
  const inTransitIdx = columns.findIndex(col => col.accessorKey === "inTransit");
  const deliveryIdx = columns.findIndex(col => col.accessorKey === "delivery");
  const closeIdx = columns.findIndex(col => col.accessorKey === "close");

  // Origin: pickup to inTransit (inclusive)
  const originCols = pickupIdx !== -1 && inTransitIdx !== -1 ? columns.slice(pickupIdx, inTransitIdx + 1) : [];
  // Destination: delivery to close (inclusive)
  const destinationCols = deliveryIdx !== -1 && closeIdx !== -1 ? columns.slice(deliveryIdx, closeIdx + 1) : [];
  // Columns before pickup, between inTransit and delivery, and after close
  const beforeOrigin = columns.slice(0, pickupIdx);
  const betweenOriginDest = columns.slice(inTransitIdx + 1, deliveryIdx);
  const afterDest = columns.slice(closeIdx + 1);

  return (
    <>
      <FilterTab
        filterFields={filterFields}
        onFilterChange={onFilterChange}
        onSearch={onSearch}
        showFirstIcon={showFirstIcon}
        showSecondIcon={showSecondIcon}
        showThirdIcon={showThirdIcon}
        secondIconMenu={secondIconMenu}
        thirdIconMenu={thirdIconMenu}
      />
      <Card className="mt-4">
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              {/* First row: blue tab group headers, only for Origin and Destination */}
              <TableRow>
                <TableHead className="bg-transparent border-b-0 align-middle text-center">
                  <span>&nbsp;</span>
                </TableHead>
                {beforeOrigin.map((col) => (
                  <TableHead key={col.accessorKey} className="bg-transparent border-b-0">
                    <span>&nbsp;</span>
                  </TableHead>
                ))}
                {originCols.length > 0 && (
                  <TableHead
                    colSpan={originCols.length}
                    className="bg-blue-600 text-white text-center font-semibold rounded-t-lg border-b-0 py-2 text-base"
                  >
                    Origin
                  </TableHead>
                )}
                {betweenOriginDest.map((col) => (
                  <TableHead key={col.accessorKey} className="bg-transparent border-b-0">
                    <span>&nbsp;</span>
                  </TableHead>
                ))}
                {destinationCols.length > 0 && (
                  <TableHead
                    colSpan={destinationCols.length}
                    className="bg-blue-600 text-white text-center font-semibold rounded-t-lg border-b-0 py-2 text-base"
                  >
                    Destination
                  </TableHead>
                )}
                {afterDest.map((col) => (
                  <TableHead key={col.accessorKey} className="bg-transparent border-b-0">
                    <span>&nbsp;</span>
                  </TableHead>
                ))}
              </TableRow>
              {/* Second row: normal column headers */}
              <TableRow>
                <TableHead className="w-12 px-6 py-3 align-middle text-center">
                  <Checkbox checked={isAllSelected} onCheckedChange={toggleSelectAll}
                  className="border-[#003366] data-[state=checked]:bg-[#006397] data-[state=checked]:border-[#006397]" />
                </TableHead>
                {beforeOrigin.map((col) => (
                  <TableHead
                    key={col.accessorKey}
                    className="text-[#006397] text-xs font-semibold px-4 py-2 align-middle text-center bg-gray-50"
                  >
                    {col.header}
                  </TableHead>
                ))}
                {originCols.map((col) => (
                  <TableHead
                    key={col.accessorKey}
                    className="text-[#006397] text-xs font-semibold px-4 py-2 align-middle text-center bg-gray-50"
                  >
                    {col.header}
                  </TableHead>
                ))}
                {betweenOriginDest.map((col) => (
                  <TableHead
                    key={col.accessorKey}
                    className="text-[#006397] text-xs font-semibold px-4 py-2 align-middle text-center bg-gray-50"
                  >
                    {col.header}
                  </TableHead>
                ))}
                {destinationCols.map((col) => (
                  <TableHead
                    key={col.accessorKey}
                    className="text-[#006397] text-xs font-semibold px-4 py-2 align-middle text-center bg-gray-50"
                  >
                    {col.header}
                  </TableHead>
                ))}
                {afterDest.map((col) => (
                  <TableHead
                    key={col.accessorKey}
                    className="text-[#006397] text-xs font-semibold px-4 py-2 align-middle text-center bg-gray-50"
                  >
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, rowIdx) => (
                <TableRow key={row.id || rowIdx} className="min-h-[56px]"> {/* Increased row height */}
                  <TableCell className="px-6 py-4"> {/* Increased cell height */}
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onCheckedChange={() => toggleRow(row.id)}
                      className="border-[#003366] data-[state=checked]:bg-[#006397] data-[state=checked]:border-[#006397]"
                    />
                  </TableCell>
                  {beforeOrigin.map((col) => (
                    <TableCell key={col.accessorKey} className="text-sm px-4 py-4">
                      {renderCell(row, rowIdx, col)}
                    </TableCell>
                  ))}
                  {originCols.map((col) => (
                    <TableCell key={col.accessorKey} className="text-sm px-4 py-4">
                      {renderCell(row, rowIdx, col)}
                    </TableCell>
                  ))}
                  {betweenOriginDest.map((col) => (
                    <TableCell key={col.accessorKey} className="text-sm px-4 py-4">
                      {renderCell(row, rowIdx, col)}
                    </TableCell>
                  ))}
                  {destinationCols.map((col) => (
                    <TableCell key={col.accessorKey} className="text-sm px-4 py-4 w-full">
                      <div className="flex items-center w-full">
                        {renderCell(row, rowIdx, col)}
                        {col.accessorKey === "delivery" && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto"
                            title="Manage Documents"
                            onClick={() => {
                              setDocModalRow(row);
                              setDocModalOpen(true);
                            }}
                          >
                            <FileText size={20} className="text-[#006397] hover:text-blue-700" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  ))}
                  {afterDest.map((col) => (
                    <TableCell key={col.accessorKey} className="text-sm px-4 py-4">
                      {renderCell(row, rowIdx, col)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <DocumentModal open={docModalOpen} onClose={() => setDocModalOpen(false)} row={docModalRow} columns={documentColumns} data={sampleDocumentData} />
    </>
  );
}

// Example columns and data (replace with your actual data)
const documentColumns = [
  "S.No", "Location", "Document Type", "Document", "Stop ID", "Stop Type", "Created By", "Date & Time", "Actions"
];

const sampleDocumentData = [
  {
    "S.No": 1,
    "Location": "Origin",
    "Document Type": "Invoice",
    "Document": "INV123.pdf",
    "Stop ID": "STP001",
    "Stop Type": "Pickup",
    "Created By": "Admin",
    "Date & Time": "2025-07-14 10:00:00",
    "Actions": "View"
  }
  // ...more rows
];

// Dynamic Modal Component
function DocumentModal({ open, onClose, columns = [], data = [], row }) {
  const [docs, setDocs] = useState(data || []);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    "Document Type": "",
    "Stop": "",
    "Document": "",
  });
  const fileInputRef = useRef();

  // Example options (replace with your actual data)
  const documentTypeOptions = [
    { value: "Delivery Note", label: "Delivery Note" },
    { value: "Invoice", label: "Invoice" },
    { value: "POD", label: "POD" },
  ];
  const stopOptions = [
    { value: "TAMPA (Delivery)", label: "TAMPA (Delivery)" },
    { value: "BANGALORE (Pickup)", label: "BANGALORE (Pickup)" },
  ];

  const handleUploadChange = (e) => {
    setUploadForm({ ...uploadForm, "Document": e.target.files[0]?.name || "" });
  };

  const handleFormChange = (field, value) => {
    setUploadForm({ ...uploadForm, [field]: value });
  };

  const handleUpload = () => {
    setDocs([
      ...docs,
      {
        "S.No": docs.length + 1,
        "Location": "Origin",
        "Document Type": uploadForm["Document Type"],
        "Document": uploadForm["Document"],
        "Stop ID": uploadForm["Stop"],
        "Stop Type": uploadForm["Stop"],
        "Created By": "Admin",
        "Date & Time": new Date().toISOString().slice(0, 19).replace("T", " "),
        "Actions": "View"
      }
    ]);
    setShowUpload(false);
    setUploadForm({
      "Document Type": "",
      "Stop": "",
      "Document": "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-none !w-[90vw] !rounded-lg !p-0" style={{ minWidth: "900px" }}>
        <DialogHeader className="bg-[#006397] rounded-t-lg px-6 py-4">
          <DialogTitle className="text-white text-lg font-semibold">
            Manage Documents: {row?.id || row?.referenceId || "N/A"}
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pt-6 pb-2">
          <Label className="text-base font-semibold flex items-center gap-2 mb-2">
            <FileText className="text-[#006397]" /> Attached Documents
          </Label>
          <div className="rounded-lg border overflow-x-auto bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  {columns.map(col => (
                    <TableHead key={col} className="px-3 py-2 font-semibold text-left">{col}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {docs && docs.length > 0 ? (
                  docs.map((doc, idx) => (
                    <TableRow key={idx}>
                      {columns.map(col => (
                        <TableCell key={col} className="px-3 py-2">{doc[col] || ""}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center text-gray-500 py-6">
                      No documents found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* Upload form */}
          {showUpload && (
            <div className="mt-6 bg-[#f7f7f7] border rounded-lg p-4">
              <div className="flex flex-wrap gap-4 items-end">
                {/* Document Type */}
                <div className="flex flex-col w-60">
                  <label className="mb-1 text-sm font-medium text-gray-700">Document Type</label>
                  <select
                    className="border px-3 py-2 rounded focus:outline-none"
                    value={uploadForm["Document Type"]}
                    onChange={e => handleFormChange("Document Type", e.target.value)}
                  >
                    <option value="">Select</option>
                    {documentTypeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                {/* Stop */}
                <div className="flex flex-col w-60">
                  <label className="mb-1 text-sm font-medium text-gray-700">Select Stop</label>
                  <select
                    className="border px-3 py-2 rounded focus:outline-none"
                    value={uploadForm["Stop"]}
                    onChange={e => handleFormChange("Stop", e.target.value)}
                  >
                    <option value="">Select</option>
                    {stopOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                {/* File */}
                <div className="flex flex-col w-72">
                  <label className="mb-1 text-sm font-medium text-gray-700">Document File</label>
                  <label className="flex items-center border rounded px-3 py-2 bg-white cursor-pointer gap-2">
                    <Paperclip size={18} className="text-[#006397]" />
                    <span className="flex-1 truncate">{uploadForm["Document"] || "Choose File"}</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleUploadChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {/* Upload Button */}
                <div className="flex-1 flex justify-end">
                  <Button
                    className="bg-[#006397] text-white flex items-center gap-2 px-8"
                    onClick={handleUpload}
                    type="button"
                  >
                    <CloudUpload size={18} /> Upload
                  </Button>
                </div>
              </div>
            </div>
          )}
          {/* Upload button */}
          {!showUpload && (
            <div className="mt-6">
              <Button
                className="bg-[#006397] text-white flex items-center gap-2"
                onClick={() => setShowUpload(true)}
              >
                <FileText size={18} /> Upload New Document
              </Button>
            </div>
          )}
        </div>
        <DialogClose asChild>
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            aria-label="Close"
          >
            &times;
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

// Usage in your main component
//   open={docModalOpen}
//   onClose={() => setDocModalOpen(false)}
//   columns={documentColumns}
//   data={sampleDocumentData}
//   row={docModalRow}
// />
