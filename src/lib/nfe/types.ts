export interface NFeExtraida {
  numeroNota: string;
  serie: string;
  dataEmissao: string;
  emitente: string;
  emitenteCnpj: string;
  destinatario: string;
  destinatarioCnpj: string;
  valorTotal: number;
  valorIcms: number;
  valorIpi: number;
  cfops: string[];
  itens: Array<{
    descricao: string;
    cfop: string;
    ncm: string;
    valor: number;
  }>;
}

export interface ResultadoAnaliseIA {
  scoreFiscal: number;
  resumoExecutivo: string;
  inconsistencias: string[];
  recomendacoes: string[];
}
