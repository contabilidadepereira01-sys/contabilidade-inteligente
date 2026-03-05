import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { analisarNFeComIA } from '@/lib/nfe/analysis';
import { NFeExtraida } from '@/lib/nfe/types';
import { Database } from '@/types/supabase';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { nfe: NFeExtraida; nomeArquivo?: string };

    if (!body?.nfe) {
      return NextResponse.json({ error: 'Dados da NF-e não enviados.' }, { status: 400 });
    }

    const resultado = analisarNFeComIA(body.nfe);

    const classificacaoRisco = resultado.scoreFiscal >= 80 ? 'Baixo' : resultado.scoreFiscal >= 60 ? 'Médio' : 'Alto';

    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    );

    await supabase.from('auditorias_xml').insert({
      nome_arquivo: body.nomeArquivo ?? 'xml-sem-nome.xml',
      numero_nota: body.nfe.numeroNota || null,
      emitente: body.nfe.emitente || null,
      score_fiscal: resultado.scoreFiscal,
      classificacao_risco: classificacaoRisco,
      inconsistencias: resultado.inconsistencias,
    });

    return NextResponse.json(resultado);
  } catch {
    return NextResponse.json({ error: 'Falha ao processar análise fiscal.' }, { status: 500 });
  }
}
