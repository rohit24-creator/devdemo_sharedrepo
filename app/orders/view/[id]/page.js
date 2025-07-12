"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Hourglass, Handshake, DollarSign } from "lucide-react";

const tabs = [
  { label: "General Info", key: "general" },
  { label: "Order Financials", key: "financials" },
  { label: "Order Reference", key: "orderReference" },
  { label: "Add Ons", key: "addOns" },
];

function renderKeyValueGrid(fields, columns = 4) {
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

function renderTable(data, title) {
  const rows = Array.isArray(data) ? data : [data];
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
  return (
    <Card className="bg-white rounded-xl shadow border p-6">
      <CardHeader className="p-0 border-b">
        <CardTitle className="text-lg font-semibold text-[#0088d2]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, idx) => (
                <TableHead key={header} className={`text-[#006397] text-left text-sm font-semibold px-6 py-3 ${idx !== 0 ? 'border-l border-gray-300' : ''}`}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {headers.map((header, idx) => (
                  <TableCell key={idx} className="px-6 py-3">{row[header]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function renderTableWithoutHeader(data) {
  const rows = Array.isArray(data) ? data : [data];
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
  return (
    <Card className="bg-white rounded-xl shadow border p-6">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, idx) => (
                <TableHead key={header} className={`text-[#006397] text-left text-sm font-semibold px-6 py-3 ${idx !== 0 ? 'border-l border-gray-300' : ''}`}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {headers.map((header, idx) => (
                  <TableCell key={idx} className="px-6 py-3">{row[header]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function renderAccordionSection({ section, fields, booking }) {
  if (section === "Routing Details") {
    return (
      <AccordionItem value={section} key={section}>
        <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">
          {section}
        </AccordionTrigger>
        <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
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
        </AccordionContent>
      </AccordionItem>
    );
  }
  if (section === "Shipping Info") {
    return [
      <AccordionItem value="CargoDetails" key="CargoDetails">
        <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">
          Cargo Details
        </AccordionTrigger>
        <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
          {renderTable(fields, "Cargo Details")}
        </AccordionContent>
      </AccordionItem>,
      <AccordionItem value="InvolvedParties" key="InvolvedParties">
        <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">
          Involved Parties
        </AccordionTrigger>
        <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
          {renderTable(booking.generalInfo["Other"], "Involved Parties")}
        </AccordionContent>
      </AccordionItem>
    ];
  }
  if (section === "Other") {
    return null;
  }
  // Default: General Info, etc.
  return (
    <AccordionItem value={section} key={section}>
      <AccordionTrigger className="bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2">
        {section}
      </AccordionTrigger>
      <AccordionContent className="bg-[#ffffff] p-6 rounded-b-md">
        {renderKeyValueGrid(fields, 4)}
      </AccordionContent>
    </AccordionItem>
  );
}

// Style constants for consistency
const STYLES = {
  accordion: {
    trigger: "bg-[#006397] text-white px-4 py-2 rounded-md data-[state=open]:bg-[#02abf5] mt-2",
    content: "bg-[#ffffff] p-6 rounded-b-md"
  },
  card: {
    container: "flex flex-col h-full",
    content: "flex flex-col h-full p-6",
    header: "flex items-center mb-3",
    icon: "text-[#006397] mr-3",
    title: "text-xl font-semibold text-[#006397]",
    dataContainer: "flex-1 flex flex-col gap-1 text-[#162d56] text-sm",
    fieldRow: "flex items-center",
    fieldLabel: "font-semibold text-gray-700",
    fieldValue: "font-normal text-gray-500",
    noData: "text-gray-500 text-center"
  }
};

// Financial card data configuration
const FINANCIAL_CARDS = [
  { dataKey: 'summary', title: 'Gross Profit', icon: Hourglass, labelWidth: 'w-32', maxFields: null },
  { dataKey: 'revenue', title: 'Revenue Breakup', icon: Handshake, labelWidth: 'w-24', maxFields: 2 },
  { dataKey: 'cost', title: 'Cost Breakup', icon: DollarSign, labelWidth: 'w-24', maxFields: 2 }
];


export default function BookingViewPage() {
  const params = useParams();
  const id = params.id;
  const [booking, setBooking] = useState({});
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    fetch("/bookingData.json")
      .then(res => res.json())
      .then(data => setBooking(data[id] || {}));
  }, [id]);

  const defaultAccordionValues = useMemo(() => {
    if (!booking.generalInfo) return undefined;
    return Object.entries(booking.generalInfo).flatMap(([section]) =>
      section === "Shipping Info"
        ? ["CargoDetails", "InvolvedParties"]
        : section === "Other"
        ? []
        : [section]
    );
  }, [booking.generalInfo]);

  // Helper function to check if data exists for current tab
  const hasDataForCurrentTab = () => {
    switch (activeTab) {
      case "general":
        return booking.generalInfo && Object.keys(booking.generalInfo).length > 0;
      case "financials":
        return booking.financials && (booking.financials.revenue?.length > 0 || booking.financials.cost?.length > 0);
      case "orderReference":
        return booking.orderReference && Object.keys(booking.orderReference).length > 0;
      case "addOns":
        return booking.addOns && Object.keys(booking.addOns).length > 0;
      default:
        return false;
    }
  };

  // Get button text and styling based on data availability
  const getActionButton = () => {
    const hasData = hasDataForCurrentTab();
    return {
      text: hasData ? "Edit" : "Add",
      className: hasData 
        ? "ml-4 px-5 py-2 bg-[#006397] text-white rounded-md font-semibold hover:bg-[#0088d2] transition-colors"
        : "ml-4 px-5 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors"
    };
  };

  const actionButton = getActionButton();

  return (
    <div className="px-8"> 
      <nav className="flex border-b border-gray-200 mb-6 px-8 items-center justify-between"> 
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 font-semibold border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-[#006397] text-[#006397] bg-white"
                  : "border-transparent text-gray-500 hover:text-[#006397]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          className={actionButton.className}
          type="button"
        >
          {actionButton.text}
        </button>
      </nav>
      {activeTab === "general" && defaultAccordionValues && (
        <Accordion
          type="multiple"
          className="mb-6"
          defaultValue={defaultAccordionValues}
        >
          {Object.entries(booking.generalInfo).map(([section, fields]) =>
            renderAccordionSection({ section, fields, booking })
          )}
        </Accordion>
      )}
      {activeTab === "financials" && (
        <div className="px-0 md:px-0 py-0">
          {hasDataForCurrentTab() ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-6">
                {FINANCIAL_CARDS.map((cardConfig, index) => {
                  const { dataKey, title, icon: Icon, labelWidth, maxFields } = cardConfig;
                  
                  // Get data based on card type
                  let cardData;
                  if (dataKey === 'summary') {
                    cardData = booking.financials?.summary;
                  } else {
                    cardData = Array.isArray(booking.financials?.[dataKey]) && booking.financials[dataKey].length > 0 
                      ? booking.financials[dataKey][0] 
                      : null;
                  }
                  
                  const entries = cardData ? Object.entries(cardData) : [];
                  const displayEntries = maxFields ? entries.slice(0, maxFields) : entries;
                  
                  return (
                    <Card key={index} className={STYLES.card.container}>
                      <CardContent className={STYLES.card.content}>
                        <div className={STYLES.card.header}>
                          <Icon className={STYLES.card.icon} size={24} />
                          <span className={STYLES.card.title}>{title}</span>
                        </div>
                        <div className={STYLES.card.dataContainer}>
                          {displayEntries.length > 0 ? (
                            displayEntries.map(([key, value]) => (
                              <div key={key} className={STYLES.card.fieldRow}>
                                <span className={`${STYLES.card.fieldLabel} ${labelWidth}`}>{key}</span> 
                                <span className={STYLES.card.fieldValue}>{value ?? '-'}</span>
                              </div>
                            ))
                          ) : (
                            <div className={STYLES.card.noData}>No data available</div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <Accordion type="multiple" className="mb-6" defaultValue={["revenue", "cost"]}>
                <AccordionItem value="revenue">
                  <AccordionTrigger className={STYLES.accordion.trigger}>
                    Revenue
                  </AccordionTrigger>
                  <AccordionContent className={STYLES.accordion.content}>
                    {Array.isArray(booking.financials?.revenue) && booking.financials.revenue.length > 0 ? (
                      renderTable(booking.financials.revenue, "Revenue")
                    ) : (
                      <div className="text-gray-500">No data available</div>
                    )}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="cost">
                  <AccordionTrigger className={STYLES.accordion.trigger}>
                    Cost
                  </AccordionTrigger>
                  <AccordionContent className={STYLES.accordion.content}>
                    {Array.isArray(booking.financials?.cost) && booking.financials.cost.length > 0 ? (
                      renderTable(booking.financials.cost, "Cost")
                    ) : (
                      <div className="text-gray-500">No data available</div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-center">
                <div className="text-6xl text-gray-300 mb-4">💰</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Order Financials Data</h3>
                <p className="text-gray-500 mb-4">This section will contain financial information.</p>
                <p className="text-sm text-gray-400">Click the "Add" button above to start adding financial data.</p>
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === "orderReference" && (
        <div className="px-0 md:px-0 py-0">
          {hasDataForCurrentTab() ? (
            <Accordion type="multiple" className="mb-6" defaultValue={["reference", "statusList", "documentsList", "quotesList"]}>
              <AccordionItem value="reference">
                <AccordionTrigger className={STYLES.accordion.trigger}>
                  Reference
                </AccordionTrigger>
                <AccordionContent className={STYLES.accordion.content}>
                  {Array.isArray(booking.orderReference?.reference) && booking.orderReference.reference.length > 0 ? (
                    renderTable(booking.orderReference.reference, "Reference")
                  ) : (
                    <div className="text-gray-500">No data available</div>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="statusList">
                <AccordionTrigger className={STYLES.accordion.trigger}>
                  Status List
                </AccordionTrigger>
                <AccordionContent className={STYLES.accordion.content}>
                  {Array.isArray(booking.orderReference?.statusList) && booking.orderReference.statusList.length > 0 ? (
                    renderTable(booking.orderReference.statusList, "Status List")
                  ) : (
                    <div className="text-gray-500">No data available</div>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="documentsList">
                <AccordionTrigger className={STYLES.accordion.trigger}>
                  Documents List
                </AccordionTrigger>
                <AccordionContent className={STYLES.accordion.content}>
                  {Array.isArray(booking.orderReference?.documentsList) && booking.orderReference.documentsList.length > 0 ? (
                    renderTable(booking.orderReference.documentsList, "Documents List")
                  ) : (
                    <div className="text-gray-500">No data available</div>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="quotesList">
                <AccordionTrigger className={STYLES.accordion.trigger}>
                  Quotes List
                </AccordionTrigger>
                <AccordionContent className={STYLES.accordion.content}>
                  {Array.isArray(booking.orderReference?.quotesList) && booking.orderReference.quotesList.length > 0 ? (
                    renderTable(booking.orderReference.quotesList, "Quotes List")
                  ) : (
                    <div className="text-gray-500">No data available</div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-center">
                <div className="text-6xl text-gray-300 mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Order Reference Data</h3>
                <p className="text-gray-500 mb-4">This section will contain order reference information.</p>
                <p className="text-sm text-gray-400">Click the "Add" button above to start adding order reference data.</p>
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === "addOns" && (
        <div className="px-0 md:px-0 py-0">
          {hasDataForCurrentTab() ? (
            <Accordion type="multiple" className="mb-6" defaultValue={["valueAddedService"]}>
              <AccordionItem value="valueAddedService">
                <AccordionTrigger className={STYLES.accordion.trigger}>
                  Value Added Service
                </AccordionTrigger>
                <AccordionContent className={STYLES.accordion.content}>
                  {Array.isArray(booking.addOns?.valueAddedService) && booking.addOns.valueAddedService.length > 0 ? (
                    renderTable(booking.addOns.valueAddedService, "Value Added Service")
                  ) : (
                    <div className="text-gray-500">No data available</div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-center">
                <div className="text-6xl text-gray-300 mb-4">🔧</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Add Ons Data</h3>
                <p className="text-gray-500 mb-4">This section will contain add-on services information.</p>
                <p className="text-sm text-gray-400">Click the "Add" button above to start adding add-on services.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 