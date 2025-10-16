import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Solo metodo POST per test
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.CRON_SECRET_TOKEN;
  const auth = req.headers.authorization;

  // Verifica autenticazione
  if (auth !== `Bearer ${token}`) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    // Test del cleanup
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/cleanup`, {
      method: "DELETE",
      headers: { 
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      },
    });

    if (!apiRes.ok) {
      throw new Error(`Backend API error: ${apiRes.status}`);
    }

    const result = await apiRes.json();
    
    console.log('🧪 Test cleanup notifiche completato:', result);
    
    res.status(200).json({
      success: true,
      message: 'Test cleanup notifiche completato',
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Errore durante test cleanup:', error);
    
    res.status(500).json({
      success: false,
      error: 'Errore durante il test cleanup',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
