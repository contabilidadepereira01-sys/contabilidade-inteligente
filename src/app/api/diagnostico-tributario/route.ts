import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { calcularDiagnosticoTributario } from '@/lib/tributario/analysis';
import { DiagnosticoInput } from '@/lib/tributario/types';

export async function POST(req: Request) {
  try {
    const input = (await req.json()) as DiagnosticoInput;

    if (!input.faturamento || !input.regimeTributario || !input.atividade || !input.estado || !input.numeroFuncionarios || !input.tipoMercadoria) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    const resultado = calcularDiagnosticoTributario(input);

    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    );

    const { error } = await supabase.from('diagnosticos_tributarios').insert({
      faturamento: input.faturamento,
      regime_tributario: input.regimeTributario,
      atividade: input.atividade,
      estado: input.estado,
      numero_funcionarios: input.numeroFuncionarios,
      tipo_mercadoria: input.tipoMercadoria,
      score_tributario: resultado.scoreTributario,
      classificacao_risco: resultado.classificacaoRisco,
      oportunidades: resultado.oportunidadesTributarias,
    });

    if (error) {
      return NextResponse.json({ error: 'Erro ao salvar diagnóstico.' }, { status: 500 });
    }

    return NextResponse.json(resultado);
  } catch {
    return NextResponse.json({ error: 'Falha ao processar diagnóstico tributário.' }, { status: 500 });
  }
}
