import { DiagnosticoInput, DiagnosticoResultado } from '@/lib/tributario/types';

export function calcularDiagnosticoTributario(input: DiagnosticoInput): DiagnosticoResultado {
  let score = 100;
  const oportunidades = new Set<string>();

  const faturamento = Number(input.faturamento);

  if (input.regimeTributario === 'simples' && faturamento > 4800000) {
    score -= 25;
    oportunidades.add('Reavaliar migração do Simples Nacional para Lucro Presumido ou Lucro Real.');
  }

  if (input.regimeTributario === 'presumido' && ['servicos', 'tecnologia'].includes(input.atividade)) {
    score -= 10;
    oportunidades.add('Comparar carga efetiva entre Lucro Presumido e Lucro Real para serviços com alta folha.');
  }

  if (input.regimeTributario === 'real' && faturamento < 1200000) {
    score -= 12;
    oportunidades.add('Validar se o Lucro Real continua competitivo para o nível atual de faturamento.');
  }

  if (input.numeroFuncionarios > 40) {
    score -= 10;
    oportunidades.add('Avaliar benefícios fiscais relacionados à folha e créditos sobre encargos permitidos.');
  }

  if (['revenda', 'industria'].includes(input.atividade) && input.tipoMercadoria !== 'servico') {
    oportunidades.add('Mapear oportunidades de recuperação de créditos de ICMS, PIS e COFINS.');
  }

  if (['sp', 'mg', 'rs', 'sc', 'pr'].includes(input.estado)) {
    oportunidades.add('Analisar incentivos fiscais estaduais e regimes especiais aplicáveis ao estado selecionado.');
  }

  if (input.tipoMercadoria === 'monofasica') {
    score -= 8;
    oportunidades.add('Verificar correta aplicação da tributação monofásica para evitar recolhimento indevido.');
  }

  if (input.tipoMercadoria === 'substituicao-tributaria') {
    score -= 8;
    oportunidades.add('Revisar cálculo de ICMS-ST e possíveis ressarcimentos por base de cálculo maior.');
  }

  if (oportunidades.size === 0) {
    oportunidades.add('Manter revisão tributária trimestral para antecipar riscos e ganhos de eficiência fiscal.');
  }

  score = Math.max(0, Math.min(100, score));

  const classificacaoRisco: DiagnosticoResultado['classificacaoRisco'] =
    score >= 80 ? 'Baixo' : score >= 60 ? 'Médio' : 'Alto';

  return {
    scoreTributario: score,
    classificacaoRisco,
    oportunidadesTributarias: Array.from(oportunidades),
  };
}
