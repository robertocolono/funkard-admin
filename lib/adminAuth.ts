// lib/adminAuth.ts

// Mock temporaneo (verrà sostituito con JWT decoding)
export function useAdminRole() {
  return {
    role: process.env.NEXT_PUBLIC_ADMIN_ROLE || "owner", // default owner per ora
    permissions: {
      market: true,
      support: true,
      notifications: true,
      settings: true,
      staff: process.env.NEXT_PUBLIC_ENABLE_STAFF === "true",
    },
  };
}

// 🔐 Verifica se il ruolo ha accesso a una determinata area
export function canAccess(role: string, section: string): boolean {
  const accessMap: Record<string, string[]> = {
    owner: ["market", "support", "notifications", "settings", "staff"],
    admin: ["market", "support", "notifications", "settings"],
    moderator: ["market", "support", "notifications"],
    analyst: ["market"],
  };

  return accessMap[role]?.includes(section) ?? false;
}

// 🔐 Verifica se l'admin può eseguire una specifica azione
export function canPerformAction(role: string, action: string): boolean {
  const actionMap: Record<string, string[]> = {
    owner: ["create", "read", "update", "delete", "manage_staff", "system_settings"],
    admin: ["create", "read", "update", "delete"],
    moderator: ["create", "read", "update"],
    analyst: ["read"],
  };

  return actionMap[role]?.includes(action) ?? false;
}

// 🔐 Ottieni il livello di accesso per una sezione
export function getAccessLevel(role: string, section: string): "none" | "read" | "write" | "admin" {
  const accessLevels: Record<string, Record<string, string>> = {
    owner: {
      market: "admin",
      support: "admin", 
      notifications: "admin",
      settings: "admin",
      staff: "admin",
    },
    admin: {
      market: "write",
      support: "write",
      notifications: "write", 
      settings: "read",
      staff: "none",
    },
    moderator: {
      market: "write",
      support: "write",
      notifications: "read",
      settings: "none",
      staff: "none",
    },
    analyst: {
      market: "read",
      support: "none",
      notifications: "none",
      settings: "none",
      staff: "none",
    },
  };

  return (accessLevels[role]?.[section] as "none" | "read" | "write" | "admin") || "none";
}
