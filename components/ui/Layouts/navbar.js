'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

const navGroups = [
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
]

const navItems = [
  { href: '/masters/status', label: 'Status Master' },
  { href: '/masters/lanesMaster', label: 'Lanes Master' },
  { href: '/masters/regions', label: 'Regions' },
  { href: '/masters/shipmentType', label: 'Shipment Type' },
  { href: '/masters/trafficCode', label: 'Traffic Code' },
  { href: '/masters/allocationRules', label: 'Allocation Rules' },
  { href: '/masters/communication', label: 'Communication' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState(null)

  const handleDropdownToggle = (label) => {
    setOpenDropdown(prev => (prev === label ? null : label))
  }

  const handleLinkClick = () => {
    setOpenDropdown(null)
  }

  return (
    <nav className="bg-[#006397] px-6 py-3 shadow-sm relative z-50">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4 relative">
          {/* Dropdowns */}
          {navGroups.map((group) => (
            <NavigationMenuItem key={group.label} className="relative">
              <button
                onClick={() => handleDropdownToggle(group.label)}
                className={`text-white px-3 py-2 rounded-md hover:bg-[#02abf5] transition ${openDropdown === group.label ? 'bg-[#02abf5]' : ''
                  }`}
              >
                {group.label}
              </button>

              {openDropdown === group.label && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg py-2 min-w-[200px]">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`block px-4 py-2 rounded-md transition hover:bg-[#f0f0f0] ${pathname === item.href ? 'bg-[#02abf5] text-white' : 'text-black'
                        }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </NavigationMenuItem>
          ))}

          {/* Flat links */}
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={`text-white px-3 py-2 rounded-md hover:bg-[#02abf5] transition ${pathname === item.href ? 'bg-[#02abf5]' : ''
                    }`}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
