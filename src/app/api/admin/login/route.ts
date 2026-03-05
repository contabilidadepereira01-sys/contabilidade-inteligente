import { NextResponse } from 'next/server';
import { getSessionToken, validateAdminCredentials, ADMIN_COOKIE_NAME } from '@/lib/admin/auth';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; password?: string };

    if (!body.email || !body.password) {
      return NextResponse.json({ error: 'Informe e-mail e senha.' }, { status: 400 });
    }

    const valid = validateAdminCredentials(body.email, body.password);
    if (!valid) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE_NAME, getSessionToken(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Falha ao autenticar.' }, { status: 500 });
  }
}
