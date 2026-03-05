'use client';

import { FormEvent, useMemo, useState } from 'react';
import { NFeExtraida, ResultadoAnaliseIA } from '@/lib/nfe/types';

interface LeadForm {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  faturamento: string;
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, '');
}

function getTagText(parent: Document | Element | undefined, tagName: string) {
  if (!parent) return '';
  const node = parent.getElementsByTagName(tagName)[0];
  return node?.textContent?.trim() ?? '';
}

function parseNFe(xmlString: string): NFeExtraida {
  const xml = new DOMParser().parseFromString(xmlString, 'application/xml');

  const emitNode = xml.getElementsByTagName('emit')[0];
  const destNode = xml.getElementsByTagName('dest')[0];

  const detItems = Array.from(xml.getElementsByTagName('det'));
  const itens = detItems.map((det) => {
    const prod = det.getElementsByTagName('prod')[0];
    return {
      descricao: getTagText(prod, 'xProd'),
      cfop: getTagText(prod, 'CFOP'),
      ncm: getTagText(prod, 'NCM'),
      valor: Number(getTagText(prod, 'vProd') || 0),
    };
  });

  const cfops = Array.from(new Set(itens.map((item) => item.cfop).filter(Boolean)));

  return {
    numeroNota: getTagText(xml, 'nNF'),
    serie: getTagText(xml, 'serie'),
    dataEmissao: getTagText(xml, 'dhEmi') || getTagText(xml, 'dEmi'),
    emitente: getTagText(emitNode, 'xNome'),
    emitenteCnpj: onlyDigits(getTagText(emitNode, 'CNPJ')),
    destinatario: getTagText(destNode, 'xNome'),
    destinatarioCnpj: onlyDigits(getTagText(destNode, 'CNPJ') || getTagText(destNode, 'CPF')),
    valorTotal: Number(getTagText(xml, 'vNF') || 0),
    valorIcms: Number(getTagText(xml, 'vICMS') || 0),
    valorIpi: Number(getTagText(xml, 'vIPI') || 0),
    cfops,
    itens,
  };
}

export default function AuditoriaXmlPage() {
  const [xmlName, setXmlName] = useState('');
  const [nfe, setNfe] = useState<NFeExtraida | null>(null);
  const [resultado, setResultado] = useState<ResultadoAnaliseIA | null>(null);
  const [leadSalvo, setLeadSalvo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [leadForm, setLeadForm] = useState<LeadForm>({
    nome: '',
    empresa: '',
    email: '',
    whatsapp: '',
    faturamento: '',
  });

  const podeVerRelatorio = Boolean(leadSalvo && resultado);

  const resumoDados = useMemo(() => {
    if (!nfe) return [];
    return [
      { label: 'Nota', value: nfe.numeroNota || '-' },
      { label: 'Série', value: nfe.serie || '-' },
      { label: 'Valor total', value: `R$ ${nfe.valorTotal.toFixed(2)}` },
      { label: 'Qtd. itens', value: String(nfe.itens.length) },
      { label: 'CFOPs', value: nfe.cfops.join(', ') || '-' },
    ];
  }, [nfe]);

  async function handleUpload(file: File) {
    setErro('');
    setLoading(true);
    setResultado(null);
    setLeadSalvo(false);

    try {
      const xmlString = await file.text();
      const parsedNFe = parseNFe(xmlString);
      setNfe(parsedNFe);
      setXmlName(file.name);

      const response = await fetch('/api/auditoria-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nfe: parsedNFe, nomeArquivo: file.name }),
      });

      if (!response.ok) throw new Error('Falha na análise IA');
      const data = (await response.json()) as ResultadoAnaliseIA;
      setResultado(data);
    } catch {
      setErro('Não foi possível processar o XML. Verifique se o arquivo é uma NF-e válida.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro('');

    if (!nfe) return;

    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...leadForm,
        origem: 'auditoria-xml',
        interesse: `NF-e ${nfe.numeroNota || 'sem-numero'} | score pendente`,
      }),
    });

    if (!response.ok) {
      setErro('Falha ao salvar cadastro. Tente novamente em instantes.');
      return;
    }

    setLeadSalvo(true);
  }

  return (
    <section className="py-16">
      <div className="container-default space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Ferramenta gratuita</p>
          <h1 className="text-4xl font-bold text-slate-900">Auditoria de XML de NF-e com análise inteligente</h1>
          <p className="max-w-3xl text-slate-600">
            Faça upload do XML da nota fiscal, extraia os dados fiscais automaticamente e receba um score com inconsistências detectadas.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">1) Upload e parse do XML</h2>
            <p className="mt-1 text-sm text-slate-600">Aceitamos XML de NF-e para validação fiscal preliminar.</p>

            <label className="mt-4 block cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-brand-500 hover:bg-brand-50">
              <span className="text-sm font-medium text-slate-700">Clique para selecionar o XML</span>
              <input
                type="file"
                accept=".xml,text/xml"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void handleUpload(file);
                }}
              />
            </label>

            {loading ? <p className="mt-3 text-sm text-brand-700">Processando XML e enviando para análise com IA...</p> : null}
            {xmlName ? <p className="mt-3 text-xs text-slate-500">Arquivo carregado: {xmlName}</p> : null}
            {erro ? <p className="mt-3 text-sm text-rose-600">{erro}</p> : null}

            {resumoDados.length > 0 ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {resumoDados.map((item) => (
                  <div key={item.label} className="rounded-md border border-slate-200 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">2) Cadastre-se para desbloquear o relatório completo</h2>
            <p className="mt-1 text-sm text-slate-600">Antes de mostrar score fiscal e inconsistências, precisamos dos seus dados.</p>

            <form className="mt-4 grid gap-3" onSubmit={handleLeadSubmit}>
              <input required placeholder="Nome" className="rounded-md border border-slate-300 px-3 py-2 text-sm" value={leadForm.nome} onChange={(e) => setLeadForm((prev) => ({ ...prev, nome: e.target.value }))} />
              <input required placeholder="Empresa" className="rounded-md border border-slate-300 px-3 py-2 text-sm" value={leadForm.empresa} onChange={(e) => setLeadForm((prev) => ({ ...prev, empresa: e.target.value }))} />
              <input required type="email" placeholder="E-mail" className="rounded-md border border-slate-300 px-3 py-2 text-sm" value={leadForm.email} onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))} />
              <input required placeholder="WhatsApp" className="rounded-md border border-slate-300 px-3 py-2 text-sm" value={leadForm.whatsapp} onChange={(e) => setLeadForm((prev) => ({ ...prev, whatsapp: e.target.value }))} />
              <input required placeholder="Faturamento mensal" className="rounded-md border border-slate-300 px-3 py-2 text-sm" value={leadForm.faturamento} onChange={(e) => setLeadForm((prev) => ({ ...prev, faturamento: e.target.value }))} />
              <button
                type="submit"
                disabled={!resultado || loading || leadSalvo}
                className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {leadSalvo ? 'Cadastro realizado com sucesso' : 'Desbloquear relatório'}
              </button>
            </form>
          </div>
        </div>

        {podeVerRelatorio ? (
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <h2 className="text-2xl font-semibold text-slate-900">Relatório fiscal completo</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[180px_1fr]">
              <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Score fiscal</p>
                <p className="mt-2 text-4xl font-bold text-brand-700">{resultado.scoreFiscal}</p>
                <p className="text-xs text-slate-500">de 100</p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Resumo da análise IA</p>
                  <p className="text-sm text-slate-600">{resultado.resumoExecutivo}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Inconsistências detectadas</p>
                  {resultado.inconsistencias.length > 0 ? (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-700">
                      {resultado.inconsistencias.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-emerald-700">Nenhuma inconsistência crítica detectada na análise inicial.</p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Recomendações</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {resultado.recomendacoes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
