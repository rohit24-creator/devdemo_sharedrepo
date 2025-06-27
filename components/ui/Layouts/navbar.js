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
      { href: '/businessPartner/partnerDetails', label: 'Partner Details' },
      { href: '/businessPartner/additionalLocation', label: 'Additional Location' },
      { href: '/businessPartner/financials', label: 'Financials' },
      { href: '/businessPartner/EDIAPI', label: 'EDI-API' },
      { href: '/businessPartner/switch', label: 'Switches' },
    ],
  },
  {
    label: 'Profiles',
    items: [
      { href: '/profiles/customerProfile', label: 'Customer Profile' },
      { href: '/profiles/vendorProfile', label: 'Vendor Profile' },
      { href: '/profiles/vehicleProfile', label: 'Vehicle Profile' },
    ],
  },
  {
    label: 'Fleet',
    items: [
      { href: '/fleet/Drivers', label: 'Drivers' },
      { href: '/fleet/vehicles', label: 'Vehicles' },
      { href: '/fleet/Co2form', label: 'Co2form' },
      { href: '/fleet/costCenter', label: 'Cost Center' },
      { href: '/fleet/orderType', label: 'Order Type' },
      { href: '/fleet/vehicleType', label: 'Vehicle Type' },
    ],
  },
  {
    label: 'PinCodes',
    items: [
      { href: '/pinCodes/pinCode', label: 'Pincode' },
      { href: '/pinCodes/preferedState', label: 'Prefered State' },
      { href: '/pinCodes/tripallocationRatio', label: 'Trip allocation Ratio' },
    ],
  },
]

const navItems = [
  { href: '/status', label: 'Status Master' },
  { href: '/lanesMaster', label: 'Lanes Master' },
  { href: '/regions', label: 'Regions' },
  { href: '/shipmentType', label: 'Shipment Type' },
  { href: '/trafficCode', label: 'Traffic Code' },
  { href: '/allocationRules', label: 'Allocation Rules' },
  { href: '/communication', label: 'Communication' },
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
