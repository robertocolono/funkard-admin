"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Users, Store, Bell, LogOut, LifeBuoy, Settings, BarChart3, TestTube } from "lucide-react"
import { cn } from "@/lib/utils"
import SupportBadge from "@/components/admin/SupportBadge"

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Utenti", href: "/dashboard/users", icon: Users },
  { name: "Market", href: "/dashboard/market", icon: Store },
  { name: "Notifiche", href: "/dashboard/notifications", icon: Bell },
  { name: "Logs", href: "/dashboard/logs", icon: BarChart3 },
  { name: "Supporto", href: "/dashboard/support", icon: LifeBuoy },
  { name: "Test Toast", href: "/dashboard/test-toast", icon: TestTube },
  { name: "Impostazioni", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "h-full border-r bg-white shadow-sm transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className={cn("text-lg font-bold transition-opacity", collapsed && "opacity-0")}>
          Funkard
        </h1>
        <button onClick={onToggle} className="text-gray-500 hover:text-black">
          ☰
        </button>
      </div>
      <nav className="flex-1 space-y-1 mt-4">
        {menuItems.map(({ name, href, icon: Icon }) => {
          const active = pathname === href
          const isSupport = href === '/dashboard/support'
          return (
            <Link key={href} href={href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer relative",
                  active && "bg-gray-200 font-semibold text-black",
                  collapsed && "justify-center"
                )}
              >
                <Icon size={20} />
                {!collapsed && <span>{name}</span>}
                {isSupport && <SupportBadge />}
              </div>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t">
        <button className="flex items-center gap-3 text-gray-500 hover:text-black w-full">
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}