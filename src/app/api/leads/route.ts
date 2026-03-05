import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      nome: string;
      empresa?: string;
      email: string;
      whatsapp?: string;
      faturamento?: string;
      origem: string;
      interesse?: string;
    };

    if (!body?.nome || !body?.email || !body?.origem) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    );

    const { error } = await supabase.from('leads').insert({
      nome: body.nome,
      empresa: body.empresa ?? null,
      email: body.email,
      whatsapp: body.whatsapp ?? null,
      faturamento: body.faturamento ?? null,
      origem: body.origem,
      interesse: body.interesse ?? null,
      consentimento_lgpd: true,
    });

    if (error) {
      return NextResponse.json({ error: 'Não foi possível salvar o lead.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Falha ao salvar lead.' }, { status: 500 });
  }
}
