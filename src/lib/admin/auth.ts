import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'admin_session';

function getExpectedSessionToken() {
  return process.env.ADMIN_SESSION_TOKEN ?? 'admin-dev-session-token';
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return cookieValue === getExpectedSessionToken();
}

export function validateAdminCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL ?? 'admin@contabilidadeinteligente.com.br';
  const expectedPassword = process.env.ADMIN_PASSWORD ?? 'admin123';

  return email === expectedEmail && password === expectedPassword;
}

export function getSessionToken() {
  return getExpectedSessionToken();
}
