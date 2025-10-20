"use client"

import { Bell, User } from "lucide-react"

export function Header({
  collapsed,
  onToggle,
}: {
  collapsed: boolean
  onToggle: () => void
}) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
      <div className="flex items-center gap-3">
        <button onClick={onToggle} className="text-gray-500 hover:text-black md:hidden">
          ☰
        </button>
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <Bell size={20} className="text-gray-500" />
        <div className="flex items-center gap-2">
          <User size={20} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700 hidden md:block">Admin</span>
        </div>
      </div>
    </header>
  )
}
