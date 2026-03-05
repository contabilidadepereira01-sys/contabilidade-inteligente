import { NFeExtraida, ResultadoAnaliseIA } from '@/lib/nfe/types';

export function analisarNFeComIA(nfe: NFeExtraida): ResultadoAnaliseIA {
  const inconsistencias: string[] = [];
  const recomendacoes: string[] = [];

  if (!nfe.emitenteCnpj || nfe.emitenteCnpj.length !== 14) {
    inconsistencias.push('CNPJ do emitente ausente ou com formato inválido.');
  }

  if (!nfe.destinatarioCnpj || nfe.destinatarioCnpj.length !== 14) {
    inconsistencias.push('CNPJ/CPF do destinatário ausente ou inconsistente.');
  }

  if (nfe.cfops.length === 0) {
    inconsistencias.push('Nenhum CFOP identificado na NF-e.');
  }

  const cfopsInvalidos = nfe.cfops.filter((cfop) => cfop.length !== 4 || Number.isNaN(Number(cfop)));
  if (cfopsInvalidos.length > 0) {
    inconsistencias.push(`CFOP(s) possivelmente inválido(s): ${cfopsInvalidos.join(', ')}.`);
  }

  const itensSemNcm = nfe.itens.filter((item) => !item.ncm);
  if (itensSemNcm.length > 0) {
    inconsistencias.push(`${itensSemNcm.length} item(ns) sem NCM preenchido.`);
  }

  const totalItens = nfe.itens.reduce((acc, item) => acc + item.valor, 0);
  if (Math.abs(totalItens - nfe.valorTotal) > 1) {
    inconsistencias.push('Soma dos itens diverge do valor total da nota (tolerância de R$ 1,00).');
  }

  if (nfe.valorIcms <= 0) {
    recomendacoes.push('Validar regra tributária de ICMS: valor zerado ou ausente pode indicar classificação indevida.');
  }

  if (nfe.valorIpi <= 0) {
    recomendacoes.push('Revisar incidência de IPI para os itens industrializados desta operação.');
  }

  if (nfe.cfops.some((cfop) => cfop.startsWith('5')) && nfe.cfops.some((cfop) => cfop.startsWith('6'))) {
    recomendacoes.push('Existem CFOPs internos e interestaduais na mesma nota: confirme se a operação mista está correta.');
  }

  if (recomendacoes.length === 0) {
    recomendacoes.push('Manter rotina mensal de auditoria para prevenir autuações e perdas de crédito tributário.');
  }

  const scoreFiscal = Math.max(0, 100 - inconsistencias.length * 15 - (recomendacoes.length > 2 ? 5 : 0));

  const resumoExecutivo =
    inconsistencias.length === 0
      ? 'A NF-e não apresentou inconsistências críticas no diagnóstico inicial automatizado.'
      : `A análise automatizada encontrou ${inconsistencias.length} ponto(s) de atenção fiscal.`;

  return {
    scoreFiscal,
    resumoExecutivo,
    inconsistencias,
    recomendacoes,
  };
}
