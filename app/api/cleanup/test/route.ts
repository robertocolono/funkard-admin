import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const token = process.env.CRON_SECRET_TOKEN;
  const auth = request.headers.get('authorization');

  // Verifica autenticazione
  if (auth !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
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
    
    return NextResponse.json({
      success: true,
      message: 'Test cleanup notifiche completato',
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Errore durante test cleanup:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Errore durante il test cleanup',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
