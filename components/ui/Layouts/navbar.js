'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

const navigationData = {
  master: {
    label: 'Master',
    items: [
      {
        label: 'Business Partner',
        items: [
          { href: '/masters/lists/partnerDetails', label: 'Partner Details' },
          { href: '/masters/lists/additionalLocation', label: 'Additional Location' },
          { href: '/masters/lists/financials', label: 'Financials' },
          { href: '/masters/lists/EDIAPI', label: 'EDI-API' },
          { href: '/masters/lists/switch', label: 'Switches' },
        ],
      },
      {
        label: 'Profiles',
        items: [
          { href: '/masters/lists/profiles/customerProfile', label: 'Customer Profile' },
          { href: '/masters/lists/profiles/vendorProfile', label: 'Vendor Profile' },
          { href: '/masters/lists/profiles/vehicleProfile', label: 'Vehicle Profile' },
        ],
      },
      {
        label: 'Fleet',
        items: [
          { href: '/masters/lists/fleet/Drivers', label: 'Drivers' },
          { href: '/masters/lists/fleet/vehicles', label: 'Vehicles' },
          { href: '/masters/lists/fleet/Co2form', label: 'Co2form' },
          { href: '/masters/lists/fleet/costCenter', label: 'Cost Center' },
          { href: '/masters/lists/fleet/orderType', label: 'Order Type' },
          { href: '/masters/lists/fleet/vehicleType', label: 'Vehicle Type' },
        ],
      },
      {
        label: 'PinCodes',
        items: [
          { href: '/masters/lists/pinCodes/pinCode', label: 'Pincode' },
          { href: '/masters/lists/pinCodes/preferedState', label: 'Prefered State' },
          { href: '/masters/lists/pinCodes/tripallocationRatio', label: 'Trip allocation Ratio' },
        ],
      },
      {
        label: 'General',
        items: [
          { href: '/masters/lists/statusMaster', label: 'Status Master' },
          { href: '/masters/lists/laneMaster', label: 'Lanes Master' },
          { href: '/masters/lists/regions', label: 'Regions' },
          { href: '/masters/lists/shipmentType', label: 'Shipment Type' },
          { href: '/masters/lists/trafficCode', label: 'Traffic Code' },
          { href: '/masters/lists/allocationRules', label: 'Allocation Rules' },
          { href: '/masters/lists/communication', label: 'Communication' },
        ],
      },
    ],
  },
  bookings: {
    label: 'Bookings',
    items: [

      { href: '/bookings/list', label: 'Order view' },
      { href: '/bookings/orderFinancials', label: 'Order Financials' },
      { href: '/bookings/lists/orders', label: 'Orders' },
      { href: '/bookings/lists/massStatus', label: 'Mass Status' },
      { href: '/bookings/lists/documentControl', label: 'Document Control' },
      {
        label: 'Claims',
        items: [
          { href: '/bookings/lists/claims/payment', label: 'Payment' },
          { href: '/bookings/lists/claims/claim', label: 'Claim' },
        ],
      },
      { href: '/bookings/lists/xbrdrOrders', label: 'XBRDR Orders' },
      {
        label: 'Ports',
        items: [
          { href: '/bookings/lists/ports/workOrder', label: 'Work Order' },
          { href: '/bookings/lists/ports/deliveryOrders', label: 'Delivery Orders' },
          { href: '/bookings/lists/ports/containers', label: 'Containers' },
        ],
      },
    ],
  },
  visibility: {
    label: 'Visibility',
    items: [
      { href: '/visiblity/activeOrders', label: 'Active Orders' },
      { href: '/visiblity/pendingOrders', label: 'Pending Orders' },
      { href: '/visiblity/doneOrders', label: 'Done Orders' },
      { href: '/visiblity/milestone', label: 'Milestone' },
    ],
  },
  reports: {
    label: 'Reports',
    items: [
      {
        label: 'Operational Reports',
        items: [
          { href: '/reports/operationalReport/ecoTransitReport', label: 'Eco Transit Report' },
          { href: '/reports/operationalReport/customerReport', label: 'Customer Report' },
          { href: '/reports/operationalReport/truckerVolume', label: 'Trucker Volume' },
          { href: '/reports/operationalReport/basicShipmentReport', label: 'Basic Shipment Report' },
        ],
      },
      {
        label: 'General',
        items: [
          { href: '/reports/speedometer', label: 'Speedometer' },
          { href: '/reports/smsReports', label: 'SMS Reports' },
          { href: '/reports/speedReports', label: 'Speed Reports' },
          { href: '/reports/kmReports', label: 'KM Reports' },
          { href: '/reports/shipmentStopLevel', label: 'Shipment Stop Level' },
          { href: '/reports/slaOccupancy', label: 'SLA Occupancy' },
          { href: '/reports/tripReports', label: 'Trip Reports' },
          { href: '/reports/trackReport', label: 'Track Report' },
          { href: '/reports/ndrReport', label: 'NDR Report' },
          { href: '/reports/misReport', label: 'MIS Report' },
          { href: '/reports/financialreports', label: 'Financial Reports' },
          { href: '/reports/ediLogs', label: 'EDI Logs' },
          { href: '/reports/customisedReport/customReport', label: 'Customised Report' },
          { href: '/reports/customerDaily', label: 'Customer Daily' },
          { href: '/reports/billingControl', label: 'Billing Control' },
          { href: '/reports/allRoundBig', label: 'All Round Big' },
        ],
      },
    ],
  },
  trips: {
    label: 'Trips',
    items: [
      { href: '/trip/lists/trips', label: 'Trips' },
      { href: '/trip/lists/tripExpense', label: 'Trip Expense' },
      { href: '/trip/lists/tripTemplate', label: 'Trip Template' },
      { href: '/trip/lists/returnTrucks', label: 'Return Trucks' },
      { href: '/trip/lists/routing', label: 'Routing' },
      { href: '/trip/shipmentplan', label: 'Shipment Plan' },
    ],
  },
  dashboard: {
    label: 'Dashboard',
    items: [
      { href: '/dashboard/fleetView', label: 'Fleet View' },
      {
        label: 'Maintenance',
        items: [
          { href: '/dashboard/maintenance/lists/tyre', label: 'Tyre' },
          { href: '/dashboard/maintenance/lists/regularMaintenance', label: 'Regular Maintenance' },
          { href: '/dashboard/maintenance/lists/insurance', label: 'Insurance' },
          { href: '/dashboard/maintenance/lists/battery', label: 'Battery' },
          { href: '/dashboard/maintenance/lists/finance', label: 'Finance' },
          { href: '/dashboard/maintenance/lists/addPurchaseOrder', label: 'Add Purchase Order' },
        ],
      },
    ],
  },
  billing: {
    label: 'Billing',
    items: [
      { href: '/billing/lists/vatMaster', label: 'VAT Master' },
      {
        label: 'Tiers',
        items: [
          { href: '/billing/lists/tiers/rateTier', label: 'Rate Tier' },
          { href: '/billing/lists/tiers/geoTier', label: 'Geo Tier' },
        ],
      },
      { href: '/billing/lists/rateService', label: 'Rate Service' },
      { href: '/billing/lists/rateRecord', label: 'Rate Record' },
      { href: '/billing/lists/ratePreference', label: 'Rate Preference' },
      { href: '/billing/lists/rateOffering', label: 'Rate Offering' },
      { href: '/billing/lists/rateCalendar', label: 'Rate Calendar' },
      { href: '/billing/lists/fuelSurcharge', label: 'Fuel Surcharge' },
      { href: '/billing/lists/exchangeRate', label: 'Exchange Rate' },
      { href: '/billing/lists/conversionFactor', label: 'Conversion Factor' },
      { href: '/billing/lists/consolidation', label: 'Consolidation' },
      { href: '/billing/lists/billing', label: 'Billing' },
      { href: '/billing/quickRates', label: 'Quick Rates' },
    ],
  },
}

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-[#006397] px-6 py-3 shadow-sm relative z-50">
      <div className="flex gap-4 relative">
        {Object.entries(navigationData).map(([key, section]) => (
          <DropdownMenu key={key}>
            <DropdownMenuTrigger asChild>
              <button className="text-white px-4 py-2 rounded-md transition font-medium hover:bg-[#02abf5] data-[state=open]:bg-[#02abf5]">
                {section.label}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="min-w-[250px] max-h-[450px] overflow-y-auto bg-white rounded-md shadow-lg py-2 border"
              align="start"
              sideOffset={4}
            >
              {section.items.map((item) => {
                if (item.items) {
                  // Nested section
                  return (
                    <div key={item.label}>
                      <DropdownMenuLabel className="px-4 py-2 font-semibold text-gray-700 bg-gray-50 text-sm border-b border-gray-200">
                        {item.label}
                      </DropdownMenuLabel>
                      {item.items.map((subItem) => (
                        <DropdownMenuItem key={subItem.href} asChild>
                          <Link
                            href={subItem.href}
                            className={`block px-6 py-2 text-sm transition hover:bg-[#f0f0f0] ${pathname === subItem.href ? 'bg-[#02abf5] text-white' : 'text-gray-700'}`}
                          >
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                                              ))}
                    </div>
                  )
                } else {
                  // Direct link
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={`block px-4 py-2 text-sm transition hover:bg-[#f0f0f0] ${pathname === item.href ? 'bg-[#02abf5] text-white' : 'text-gray-700'}`}
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  )
                }
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </nav>
  )
}
