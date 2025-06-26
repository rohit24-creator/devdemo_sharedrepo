'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

const navItems = [
  { href: '/businessPartner/partnerDetails', label: 'Partner Details' },
  { href: '/businessPartner/additionalLocation', label: 'Additional Location' },
  { href: '/businessPartner/financials', label: 'Financials' },
  { href: '/businessPartner/EDIAPI', label: 'EDI-API' },
  { href: '/businessPartner/switch', label: 'Switches' },
   { href: '/profiles/customerProfile', label: 'Customer Profile' },
  { href: '/profiles/vendorProfile', label: 'Vehicle Profile' },
  { href: '/profiles/vehicleProfile', label: 'Vehicle Profile' },
    { href: '/status', label: 'Status Master' },
  { href: '/lanesMaster', label: 'Lanes Master' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-[#006397] px-6 py-3 shadow-sm">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={`text-white px-3 py-2 rounded-md hover:bg-[#02abf5] transition ${
                    pathname === item.href ? 'bg-[#02abf5]' : ''
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
