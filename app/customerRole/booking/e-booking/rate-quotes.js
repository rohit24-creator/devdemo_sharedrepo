"use client";

import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Info, 
  Truck, 
  Plane, 
  Ship, 
  Train,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";
import Image from "next/image";

// Configuration constants
const CONFIG = {
  currency: {
    USD: { symbol: '$', position: 'before' },
    EUR: { symbol: '€', position: 'after' },
    GBP: { symbol: '£', position: 'before' },
    JPY: { symbol: '¥', position: 'before' }
  },
  sortOptions: [
    { value: 'all', label: 'All' },
    { value: 'cheapest', label: 'Cheapest' },
    { value: 'fastest', label: 'Fastest' },
    { value: 'recommended', label: 'Recommended' }
  ],
  transportIcons: {
    road: { icon: Truck, color: 'text-blue-600' },
    air: { icon: Plane, color: 'text-red-600' },
    sea: { icon: Ship, color: 'text-green-600' },
    rail: { icon: Train, color: 'text-purple-600' }
  },
  priceBreakdownLabels: {
    basicFee: 'Basic Fee',
    serviceFee: 'Service Fee',
    fuelSurcharge: 'Fuel Surcharge',
    chassisFee: 'Chassis Fee',
    tollFee: 'Toll Fee'
  },
  tableHeaders: [
    'Options',
    'Rate ID', 
    'Carrier',
    'Mode of Transport',
    'Total Cost',
    'Currency',
    'Door-Door Time',
    'Status',
    'Action'
  ]
};


const formatCurrency = (amount, currency = 'USD') => {
  const currencyConfig = CONFIG.currency[currency] || CONFIG.currency.USD;
  const formattedAmount = amount.toFixed(2);
  
  if (currencyConfig.position === 'before') {
    return `${currencyConfig.symbol}${formattedAmount}`;
  } else {
    return `${formattedAmount}${currencyConfig.symbol}`;
  }
};


const getTransportIcon = (type) => {
  const transportConfig = CONFIG.transportIcons[type.toLowerCase()] || CONFIG.transportIcons.road;
  const IconComponent = transportConfig.icon;
  return <IconComponent className={`w-4 h-4 ${transportConfig.color}`} />;
};


const PriceBreakdownPopover = memo(({ priceBreakdown, totalCost, currency }) => {
  const breakdownItems = [
    { key: 'basicFee', value: priceBreakdown.basicFee },
    { key: 'serviceFee', value: priceBreakdown.serviceFee },
    { key: 'fuelSurcharge', value: priceBreakdown.fuelSurcharge },
    { key: 'chassisFee', value: priceBreakdown.chassisFee },
    { key: 'tollFee', value: priceBreakdown.tollFee }
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Info className="w-3 h-3 text-blue-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Price Breakdown</h4>
          <div className="space-y-2">
            {breakdownItems.map(({ key, value }) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-600">{CONFIG.priceBreakdownLabels[key]}:</span>
                <span className="font-medium">{formatCurrency(value, currency)}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total Cost:</span>
              <span>{formatCurrency(totalCost, currency)} {currency}</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});

// Main Rate Quotes component
export default function RateQuotes({ onQuoteSelect, selectedQuoteId, onReset }) {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("all");
  const [showQuotes, setShowQuotes] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  const fetchRateQuotes = async () => {
    setLoading(true);
    try {

      const response = await fetch('/rateQuotes.json');
      const data = await response.json();
      setQuotes(data.rateQuotes);
      setShowQuotes(true);
    } catch (error) {
      console.error('Error fetching rate quotes:', error);
    } finally {
      setLoading(false);
    }
  };



  const sortedQuotes = useMemo(() => {
    if (sortBy === "all") return quotes;
    
    return [...quotes].sort((a, b) => {
      switch (sortBy) {
        case "cheapest":
          return a.totalCost - b.totalCost;
        case "fastest":
          return parseInt(a.doorToDoorTime) - parseInt(b.doorToDoorTime);
        case "recommended":
          return b.isRecommended - a.isRecommended;
        default:
          return 0;
      }
    });
  }, [quotes, sortBy]);

  // Memoized selected quote lookup
  const selectedQuote = useMemo(() => 
    quotes.find(q => q.id === selectedId), 
    [quotes, selectedId]
  );


  const handleQuoteSelect = useCallback((quoteId) => {
    setSelectedId(quoteId);
    const selectedQuote = quotes.find(q => q.id === quoteId);
    onQuoteSelect(selectedQuote);
  }, [quotes, onQuoteSelect]);

  const handleQuoteDeselect = useCallback(() => {
    setSelectedId(null);
    onQuoteSelect(null);
  }, [onQuoteSelect]);


  const handleQuoteAction = useCallback((quoteId) => {
    if (selectedId === quoteId) {
      handleQuoteDeselect();
    } else {
      handleQuoteSelect(quoteId);
    }
  }, [selectedId, handleQuoteSelect, handleQuoteDeselect]);


  useEffect(() => {
    if (onReset) {
      onReset(() => {
        setSelectedId(null);
        setQuotes([]);
        setLoading(false);
        setSortBy("all");
        setShowQuotes(false);
      });
    }
  }, [onReset]);

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="bg-[#E7ECFD] px-4 py-3 rounded-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#006397]">Rate Quotes</h3>
        </div>
      </div>

      {/* Action Section */}
      <div className="bg-white p-4 rounded-md border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-gray-700">Click here to get</span>
            <Button 
              type="button"
              onClick={fetchRateQuotes}
              disabled={loading}
              className="bg-[#006397] hover:bg-[#02abf5] text-white"
            >
              {loading ? "Loading..." : "Rate Quotes"}
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Sort By:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONFIG.sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Selected Quote Display */}
      {selectedQuote && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <span className="font-medium text-green-800">
                  Selected Quote: {selectedQuote.carrier.name} - {formatCurrency(selectedQuote.totalCost, selectedQuote.currency)} {selectedQuote.currency}
                </span>
                <p className="text-sm text-green-600">
                  {selectedQuote.modeOfTransport.fullName} • {selectedQuote.doorToDoorTime}
                </p>
              </div>
            </div>
            <Button 
              type="button"
              variant="outline" 
              size="sm"
              onClick={handleQuoteDeselect}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Deselect
            </Button>
          </div>
        </div>
      )}

      {/* Rate Quotes Table */}
      {showQuotes && (
        <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                {CONFIG.tableHeaders.map((header) => (
                  <TableHead key={header} className="font-semibold">{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedQuotes.map((quote, index) => (
                <TableRow 
                  key={quote.id}
                  className={`hover:bg-blue-50 ${selectedId === quote.id ? 'bg-blue-100' : ''}`}
                >
                  <TableCell className="font-medium">
                    Option-{index + 1}
                  </TableCell>
                  
                  <TableCell className="font-medium text-blue-600">
                    {quote.rateId}
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          {quote.carrier.code}
                        </span>
                      </div>
                      <span className="font-medium">{quote.carrier.name}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTransportIcon(quote.modeOfTransport.type)}
                      <span>{quote.modeOfTransport.fullName}</span>
                      {quote.isRecommended && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Recommended Price
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold">{formatCurrency(quote.totalCost, quote.currency)}</span>
                      <PriceBreakdownPopover 
                        priceBreakdown={quote.priceBreakdown}
                        totalCost={quote.totalCost}
                        currency={quote.currency}
                      />
                    </div>
                  </TableCell>
                  
                  <TableCell className="font-medium">{quote.currency}</TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{quote.doorToDoorTime}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {quote.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Button
                      type="button"
                      size="sm"
                      variant={selectedId === quote.id ? "outline" : "default"}
                      onClick={() => handleQuoteAction(quote.id)}
                      className={selectedId === quote.id ? "text-red-600 border-red-200 hover:bg-red-50" : "bg-[#006397] hover:bg-[#02abf5] text-white"}
                    >
                      {selectedId === quote.id ? "Deselect" : "Select"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
