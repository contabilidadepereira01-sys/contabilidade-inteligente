export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          nome: string;
          empresa: string | null;
          email: string;
          whatsapp: string | null;
          faturamento: string | null;
          origem: string;
          interesse: string | null;
          consentimento_lgpd: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          nome: string;
          empresa?: string | null;
          email: string;
          whatsapp?: string | null;
          faturamento?: string | null;
          origem: string;
          interesse?: string | null;
          consentimento_lgpd?: boolean;
        };
        Update: {
          nome?: string;
          empresa?: string | null;
          email?: string;
          whatsapp?: string | null;
          faturamento?: string | null;
          origem?: string;
          interesse?: string | null;
          consentimento_lgpd?: boolean;
        };
      };
      auditorias_xml: {
        Row: {
          id: string;
          created_at: string;
          nome_arquivo: string;
          numero_nota: string | null;
          emitente: string | null;
          score_fiscal: number;
          classificacao_risco: string;
          inconsistencias: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          nome_arquivo: string;
          numero_nota?: string | null;
          emitente?: string | null;
          score_fiscal: number;
          classificacao_risco: string;
          inconsistencias: Json;
        };
        Update: {
          nome_arquivo?: string;
          numero_nota?: string | null;
          emitente?: string | null;
          score_fiscal?: number;
          classificacao_risco?: string;
          inconsistencias?: Json;
        };
      };
      diagnosticos_tributarios: {
        Row: {
          id: string;
          created_at: string;
          faturamento: string;
          regime_tributario: string;
          atividade: string;
          estado: string;
          numero_funcionarios: number;
          tipo_mercadoria: string;
          score_tributario: number;
          classificacao_risco: string;
          oportunidades: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          faturamento: string;
          regime_tributario: string;
          atividade: string;
          estado: string;
          numero_funcionarios: number;
          tipo_mercadoria: string;
          score_tributario: number;
          classificacao_risco: string;
          oportunidades: Json;
        };
        Update: {
          faturamento?: string;
          regime_tributario?: string;
          atividade?: string;
          estado?: string;
          numero_funcionarios?: number;
          tipo_mercadoria?: string;
          score_tributario?: number;
          classificacao_risco?: string;
          oportunidades?: Json;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
