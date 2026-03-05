'use client';

import { FormEvent, useState } from 'react';
import { DiagnosticoResultado } from '@/lib/tributario/types';

interface DiagnosticoForm {
  faturamento: string;
  regimeTributario: string;
  atividade: string;
  estado: string;
  numeroFuncionarios: string;
  tipoMercadoria: string;
}

const initialForm: DiagnosticoForm = {
  faturamento: '',
  regimeTributario: '',
  atividade: '',
  estado: '',
  numeroFuncionarios: '',
  tipoMercadoria: '',
};

export default function DiagnosticoTributarioPage() {
  const [form, setForm] = useState<DiagnosticoForm>(initialForm);
  const [resultado, setResultado] = useState<DiagnosticoResultado | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErro('');
    setResultado(null);

    const response = await fetch('/api/diagnostico-tributario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        numeroFuncionarios: Number(form.numeroFuncionarios),
      }),
    });

    if (!response.ok) {
      setLoading(false);
      setErro('Não foi possível concluir o diagnóstico. Tente novamente.');
      return;
    }

    const data = (await response.json()) as DiagnosticoResultado;
    setResultado(data);
    setLoading(false);
  }

  return (
    <section className="py-16">
      <div className="container-default grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Diagnóstico tributário interativo</p>
          <h1 className="text-4xl font-bold text-slate-900">Responda o questionário e receba um score tributário</h1>
          <p className="text-slate-600">
            Coletamos informações-chave da sua operação para gerar uma leitura rápida de risco fiscal e oportunidades tributárias.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <input
              required
              type="number"
              placeholder="Faturamento mensal (R$)"
              value={form.faturamento}
              onChange={(e) => setForm((prev) => ({ ...prev, faturamento: e.target.value }))}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />

            <select
              required
              value={form.regimeTributario}
              onChange={(e) => setForm((prev) => ({ ...prev, regimeTributario: e.target.value }))}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Regime tributário</option>
              <option value="simples">Simples Nacional</option>
              <option value="presumido">Lucro Presumido</option>
              <option value="real">Lucro Real</option>
            </select>

            <select
              required
              value={form.atividade}
              onChange={(e) => setForm((prev) => ({ ...prev, atividade: e.target.value }))}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Atividade</option>
              <option value="servicos">Serviços</option>
              <option value="comercio">Comércio</option>
              <option value="industria">Indústria</option>
              <option value="revenda">Revenda</option>
              <option value="tecnologia">Tecnologia</option>
            </select>

            <input
              required
              placeholder="Estado (UF)"
              value={form.estado}
              onChange={(e) => setForm((prev) => ({ ...prev, estado: e.target.value.toLowerCase() }))}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />

            <input
              required
              type="number"
              placeholder="Número de funcionários"
              value={form.numeroFuncionarios}
              onChange={(e) => setForm((prev) => ({ ...prev, numeroFuncionarios: e.target.value }))}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />

            <select
              required
              value={form.tipoMercadoria}
              onChange={(e) => setForm((prev) => ({ ...prev, tipoMercadoria: e.target.value }))}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Tipo de mercadoria</option>
              <option value="servico">Serviço puro</option>
              <option value="comum">Mercadoria comum</option>
              <option value="monofasica">Monofásica</option>
              <option value="substituicao-tributaria">Substituição tributária</option>
            </select>

            <button type="submit" disabled={loading} className="w-full rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900 disabled:bg-slate-400">
              {loading ? 'Gerando diagnóstico...' : 'Gerar diagnóstico'}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Resultado do diagnóstico</h2>

          {erro ? <p className="mt-3 text-sm text-rose-600">{erro}</p> : null}

          {!resultado ? (
            <p className="mt-3 text-sm text-slate-600">Preencha o questionário para visualizar score, risco e oportunidades tributárias.</p>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="rounded-lg bg-brand-50 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-slate-500">Score tributário</p>
                <p className="mt-1 text-4xl font-bold text-brand-700">{resultado.scoreTributario}</p>
                <p className="text-sm text-slate-600">Classificação de risco: <strong>{resultado.classificacaoRisco}</strong></p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">Possíveis oportunidades tributárias</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
                  {resultado.oportunidadesTributarias.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
