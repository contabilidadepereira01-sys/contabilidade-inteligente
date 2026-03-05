export interface DiagnosticoInput {
  faturamento: string;
  regimeTributario: string;
  atividade: string;
  estado: string;
  numeroFuncionarios: number;
  tipoMercadoria: string;
}

export interface DiagnosticoResultado {
  scoreTributario: number;
  classificacaoRisco: 'Baixo' | 'Médio' | 'Alto';
  oportunidadesTributarias: string[];
}
