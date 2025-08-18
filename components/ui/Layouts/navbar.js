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
          { href: '/masters/businessPartner/partnerDetails', label: 'Partner Details' },
          { href: '/masters/businessPartner/additionalLocation', label: 'Additional Location' },
          { href: '/masters/businessPartner/financials', label: 'Financials' },
          { href: '/masters/businessPartner/EDIAPI', label: 'EDI-API' },
          { href: '/masters/businessPartner/switch', label: 'Switches' },
        ],
      },
      {
        label: 'Profiles',
        items: [
          { href: '/masters/profiles/customerProfile', label: 'Customer Profile' },
          { href: '/masters/profiles/vendorProfile', label: 'Vendor Profile' },
          { href: '/masters/profiles/vehicleProfile', label: 'Vehicle Profile' },
        ],
      },
      {
        label: 'Fleet',
        items: [
          { href: '/masters/fleet/Drivers', label: 'Drivers' },
          { href: '/masters/fleet/vehicles', label: 'Vehicles' },
          { href: '/masters/fleet/Co2form', label: 'Co2form' },
          { href: '/masters/fleet/costCenter', label: 'Cost Center' },
          { href: '/masters/fleet/orderType', label: 'Order Type' },
          { href: '/masters/fleet/vehicleType', label: 'Vehicle Type' },
        ],
      },
      {
        label: 'PinCodes',
        items: [
          { href: '/masters/pinCodes/pinCode', label: 'Pincode' },
          { href: '/masters/pinCodes/preferedState', label: 'Prefered State' },
          { href: '/masters/pinCodes/tripallocationRatio', label: 'Trip allocation Ratio' },
        ],
      },
      {
        label: 'General',
        items: [
          { href: '/masters/status', label: 'Status Master' },
          { href: '/masters/lanesMaster', label: 'Lanes Master' },
          { href: '/masters/regions', label: 'Regions' },
          { href: '/masters/shipmentType', label: 'Shipment Type' },
          { href: '/masters/trafficCode', label: 'Traffic Code' },
          { href: '/masters/allocationRules', label: 'Allocation Rules' },
          { href: '/masters/communication', label: 'Communication' },
        ],
      },
    ],
  },
  bookings: {
    label: 'Bookings',
    items: [
      { href: '/bookings/newOrder', label: 'New Order' },
      { href: '/bookings/list', label: 'Order view' },
      { href: '/bookings/orderFinancials', label: 'Order Financials' },
      { href: '/bookings/port/delivery', label: 'Port Delivery' },
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
        ],
      },
    ],
  },
  trips: {
    label: 'Trips',
    items: [
      { href: '/trip/lists/trips', label: 'Trips' },
      {
        label: 'Trip Expense',
        items: [
          { href: '/trip/tripExpense', label: 'Trip Expense' },
        ],
      },
      {
        label: 'Trip Template',
        items: [
          { href: '/trip/tripTemplate', label: 'Trip Template' },
        ],
      },
      { href: '/trip/lists/returnTrucks', label: 'Return Trucks' },
      {
        label: 'Routing',
        items: [
          { href: '/trip/routing', label: 'Routing' },
          { href: '/trip/routing/addtionalDetails', label: 'Additional Details' },
        ],
      },
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
