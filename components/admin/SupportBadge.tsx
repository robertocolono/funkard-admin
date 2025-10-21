'use client'

import { useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://funkard-backend.onrender.com'

interface SupportBadgeProps {
  className?: string
}

export default function SupportBadge({ className = '' }: SupportBadgeProps) {
  const [newTicketsCount, setNewTicketsCount] = useState(0)

  useEffect(() => {
    const pollNewTickets = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/support/tickets`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
          },
        })
        if (!res.ok) return
        
        const data = await res.json()
        
        // Trova nuovi messaggi o ticket non letti
        const newOnes = data.filter((ticket: any) => 
          ticket.status === 'NEW' || ticket.status === 'open'
        )
        
        setNewTicketsCount(newOnes.length)
      } catch (e) {
        console.error('Polling support badge error', e)
      }
    }

    // Polling ogni 10 secondi per il badge (meno frequente)
    const interval = setInterval(pollNewTickets, 10000)
    pollNewTickets() // Chiamata iniziale
    
    return () => clearInterval(interval)
  }, [])

  if (newTicketsCount === 0) return null

  return (
    <span className={`absolute -top-1 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${className}`}>
      {newTicketsCount}
    </span>
  )
}