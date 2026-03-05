import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

export async function GET() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  );

  const { data, error } = await supabase
    .from('leads')
    .select('created_at,nome,empresa,email,whatsapp,faturamento,origem,interesse')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Erro ao exportar leads.' }, { status: 500 });
  }

  const headers = ['created_at', 'nome', 'empresa', 'email', 'whatsapp', 'faturamento', 'origem', 'interesse'];
  const escape = (v: string | null) => `"${(v ?? '').replace(/"/g, '""')}"`;

  const rows = data.map((row) =>
    [
      row.created_at,
      row.nome,
      row.empresa,
      row.email,
      row.whatsapp,
      row.faturamento,
      row.origem,
      row.interesse,
    ]
      .map((v) => escape(v))
      .join(','),
  );

  const csv = [headers.join(','), ...rows].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="leads.csv"',
    },
  });
}
