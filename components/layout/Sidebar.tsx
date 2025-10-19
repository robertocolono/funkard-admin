"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Users, ShoppingBag, BarChart3, LifeBuoy, Settings, Shield, Server, FileText, Menu, X } from "lucide-react";
import { useAdminRole, canAccess } from "@/lib/adminAuth";
import { useAdminHealth } from "@/providers/AdminHealthProvider";
import SupportBadge from "@/components/admin/SupportBadge";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useAdminRole();
  const { lastResult } = useAdminHealth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const nav = [
    { label: "Dashboard", icon: <BarChart3 />, href: "/dashboard" },
    { label: "Utenti", icon: <Users />, href: "/dashboard/users" },
    { label: "Market", icon: <ShoppingBag />, href: "/dashboard/market" },
    { label: "Notifiche", icon: <Bell />, href: "/dashboard/notifications" },
    { label: "Logs", icon: <FileText />, href: "/dashboard/logs" },
    { label: "Sistema", icon: <Server />, href: "/dashboard/system" },
    { label: "Impostazioni", icon: <Settings />, href: "/dashboard/settings" },
  ];

  // Mostra "Staff" solo se permesso
  if (canAccess(role, "staff")) {
    nav.push({ label: "Staff", icon: <Shield />, href: "/dashboard/staff" });
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isMobileOpen ? 0 : "-100%" }}
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-background border-r border-border flex flex-col justify-between",
          "lg:translate-x-0 transition-transform duration-300 ease-in-out"
        )}
      >
        <div>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-6 py-6"
          >
            <h1 className="text-2xl font-bold gradient-text tracking-tight">
              Funkard Admin
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Sistema di gestione
            </p>
          </motion.div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-1 px-3">
            {nav.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground shadow-lg funkard-glow"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                      pathname === item.href ? "text-primary-foreground" : "text-muted-foreground"
                    )}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.href === "/dashboard/system" && lastResult === "error" && (
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="ml-2 inline-flex h-2 w-2 rounded-full bg-red-500"
                      aria-label="Errore"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* 🔥 Support Badge dinamico */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: nav.length * 0.1 }}
            >
              <SupportBadge />
            </motion.div>
          </nav>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs text-muted-foreground py-4 px-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Sistema Online</span>
          </div>
          <div>v1.0 • Funkard © 2025</div>
        </motion.div>
      </motion.aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
