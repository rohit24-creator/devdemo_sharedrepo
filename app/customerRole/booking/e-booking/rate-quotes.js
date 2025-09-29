"use client";

import React, { useState, useEffect } from "react";
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

// Mock carrier logos - in real app, these would be actual image files
const CARRIER_LOGOS = {
  "SAIA": "/carrier-logos/saia.png",
  "C.H. ROBINSON": "/carrier-logos/ch-robinson.png", 
  "CRST": "/carrier-logos/crst.png",
  "DHL": "/carrier-logos/dhl.png",
  "KUEHNE+NAGEL": "/carrier-logos/kuehne-nagel.png",
  "FEDEX": "/carrier-logos/fedex.png",
  "UPS": "/carrier-logos/ups.png"
};

// Mode of transport icons
const getTransportIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'road':
      return <Truck className="w-4 h-4 text-blue-600" />;
    case 'air':
      return <Plane className="w-4 h-4 text-red-600" />;
    case 'sea':
      return <Ship className="w-4 h-4 text-green-600" />;
    case 'rail':
      return <Train className="w-4 h-4 text-purple-600" />;
    default:
      return <Truck className="w-4 h-4 text-gray-600" />;
  }
};

// Price breakdown component
const PriceBreakdownPopover = ({ priceBreakdown, totalCost, currency }) => {
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
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Basic Fee:</span>
              <span className="font-medium">${priceBreakdown.basicFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Fee:</span>
              <span className="font-medium">${priceBreakdown.serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Fuel Surcharge:</span>
              <span className="font-medium">${priceBreakdown.fuelSurcharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Chassis Fee:</span>
              <span className="font-medium">${priceBreakdown.chassisFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Toll Fee:</span>
              <span className="font-medium">${priceBreakdown.tollFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total Cost:</span>
              <span>${totalCost.toFixed(2)} {currency}</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Main Rate Quotes component
export default function RateQuotes({ onQuoteSelect, selectedQuoteId }) {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("all");
  const [showQuotes, setShowQuotes] = useState(false);

  // Fetch rate quotes data
  const fetchRateQuotes = async () => {
    setLoading(true);
    try {
      // Simulate API call - in real app, this would be an actual API
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

  // Sort quotes based on selected criteria
  const getSortedQuotes = () => {
    if (sortBy === "all") return quotes;
    
    const sorted = [...quotes].sort((a, b) => {
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
    
    return sorted;
  };

  // Handle quote selection
  const handleQuoteSelect = (quoteId) => {
    const updatedQuotes = quotes.map(quote => ({
      ...quote,
      isSelected: quote.id === quoteId
    }));
    setQuotes(updatedQuotes);
    onQuoteSelect(quotes.find(q => q.id === quoteId));
  };

  // Handle quote deselection
  const handleQuoteDeselect = () => {
    const updatedQuotes = quotes.map(quote => ({
      ...quote,
      isSelected: false
    }));
    setQuotes(updatedQuotes);
    onQuoteSelect(null);
  };

  const sortedQuotes = getSortedQuotes();
  const selectedQuote = quotes.find(q => q.isSelected);

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
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="cheapest">Cheapest</SelectItem>
                <SelectItem value="fastest">Fastest</SelectItem>
                <SelectItem value="recommended">Recommended</SelectItem>
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
                  Selected Quote: {selectedQuote.carrier.name} - ${selectedQuote.totalCost} {selectedQuote.currency}
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
                <TableHead className="font-semibold">Options</TableHead>
                <TableHead className="font-semibold">Rate ID</TableHead>
                <TableHead className="font-semibold">Carrier</TableHead>
                <TableHead className="font-semibold">Mode of Transport</TableHead>
                <TableHead className="font-semibold">Total Cost</TableHead>
                <TableHead className="font-semibold">Currency</TableHead>
                <TableHead className="font-semibold">Door-Door Time</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedQuotes.map((quote, index) => (
                <TableRow 
                  key={quote.id}
                  className={`hover:bg-blue-50 ${quote.isSelected ? 'bg-blue-100' : ''}`}
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
                      <span className="font-semibold">${quote.totalCost.toFixed(2)}</span>
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
                      variant={quote.isSelected ? "outline" : "default"}
                      onClick={() => quote.isSelected ? handleQuoteDeselect() : handleQuoteSelect(quote.id)}
                      className={quote.isSelected ? "text-red-600 border-red-200 hover:bg-red-50" : "bg-[#006397] hover:bg-[#02abf5] text-white"}
                    >
                      {quote.isSelected ? "Deselect" : "Select"}
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
