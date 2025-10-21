const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://funkard-backend.onrender.com/api';

/** 
 * ✅ Recupera i dettagli completi di un ticket (con messaggi)
 * GET /api/admin/support/tickets/{id}
 */
export async function fetchTicketById(id: string) {
  const token = localStorage.getItem('funkard_token');
  const res = await fetch(`${API_BASE}/admin/support/tickets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Errore caricamento ticket');
  return res.json();
}

/** 
 * 💬 Invia risposta a un ticket 
 * POST /api/admin/support/reply/{id}
 * body: { message: string }
 */
export async function replyToTicket(id: string, message: string) {
  const token = localStorage.getItem('funkard_token');
  const res = await fetch(`${API_BASE}/admin/support/reply/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error('Errore invio messaggio');
  return res.json();
}

/**
 * 🧩 Assegna ticket a un support (self-lock)
 * POST /api/admin/support/assign/{id}?email={supportEmail}
 */
export async function assignTicket(id: string, supportEmail: string) {
  const token = localStorage.getItem('funkard_token');
  const res = await fetch(`${API_BASE}/admin/support/assign/${id}?email=${encodeURIComponent(supportEmail)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Errore assegnazione ticket');
  return res.json();
}

/**
 * 🚪 Chiudi ticket
 * POST /api/admin/support/close/{id}
 */
export async function closeTicket(id: string) {
  const token = localStorage.getItem('funkard_token');
  const res = await fetch(`${API_BASE}/admin/support/close/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Errore chiusura ticket');
  return res.json();
}
