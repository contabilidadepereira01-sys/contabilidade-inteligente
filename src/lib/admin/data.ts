import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

export type Lead = Database['public']['Tables']['leads']['Row'];
export type AuditoriaXml = Database['public']['Tables']['auditorias_xml']['Row'];
export type DiagnosticoTributario = Database['public']['Tables']['diagnosticos_tributarios']['Row'];

export interface AdminDashboardData {
  leads: Lead[];
  auditorias: AuditoriaXml[];
  diagnosticos: DiagnosticoTributario[];
  errors: {
    leads: string | null;
    auditorias: string | null;
    diagnosticos: string | null;
  };
}

function getSupabaseAdmin() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  );
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const supabase = getSupabaseAdmin();

  const [leadsResult, auditoriasResult, diagnosticosResult] = await Promise.all([
    supabase
      .from('leads')
      .select('id,created_at,nome,empresa,email,whatsapp,faturamento,origem,interesse')
      .order('created_at', { ascending: false })
      .limit(200),
    supabase
      .from('auditorias_xml')
      .select('id,created_at,nome_arquivo,numero_nota,emitente,score_fiscal,classificacao_risco,inconsistencias')
      .order('created_at', { ascending: false })
      .limit(200),
    supabase
      .from('diagnosticos_tributarios')
      .select('id,created_at,faturamento,regime_tributario,atividade,estado,numero_funcionarios,tipo_mercadoria,score_tributario,classificacao_risco,oportunidades')
      .order('created_at', { ascending: false })
      .limit(200),
  ]);

  const leads: Lead[] = (leadsResult.data ?? []) as Lead[];
  const auditorias: AuditoriaXml[] = (auditoriasResult.data ?? []) as AuditoriaXml[];
  const diagnosticos: DiagnosticoTributario[] = (diagnosticosResult.data ?? []) as DiagnosticoTributario[];

  return {
    leads,
    auditorias,
    diagnosticos,
    errors: {
      leads: leadsResult.error?.message ?? null,
      auditorias: auditoriasResult.error?.message ?? null,
      diagnosticos: diagnosticosResult.error?.message ?? null,
    },
  };
}
