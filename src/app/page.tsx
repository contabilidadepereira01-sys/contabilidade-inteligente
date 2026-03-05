import Link from 'next/link';

const metricas = [
  { valor: '+430', label: 'empresas atendidas' },
  { valor: 'R$ 8,2 mi', label: 'em economia tributária anual' },
  { valor: '97%', label: 'de retenção de clientes' },
];

const destaques = [
  {
    titulo: 'Auditoria de XML',
    descricao: 'Valide notas de entrada e saída, identifique inconsistências e reduza riscos fiscais.',
    href: '/auditoria-xml',
  },
  {
    titulo: 'Calculadoras contábeis',
    descricao: 'Simule pró-labore, impostos e ponto de equilíbrio para decisões mais rápidas.',
    href: '/calculadoras',
  },
  {
    titulo: 'Diagnóstico tributário',
    descricao: 'Receba uma análise inicial com oportunidades de economia e compliance.',
    href: '/diagnostico-tributario',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 via-white to-white py-20">
        <div className="container-default grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-700">
              Plataforma contábil para crescimento
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Ferramentas gratuitas para atrair, diagnosticar e converter empresários em novos clientes
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">
              Entregue valor antes da venda: ofereça simuladores, auditoria de XML e diagnóstico tributário com experiência moderna e foco em conversão.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/ferramentas" className="rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-900">
                Explorar ferramentas
              </Link>
              <Link href="/contato" className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100">
                Solicitar proposta
              </Link>
            </div>
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {metricas.map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-bold text-slate-900">{item.valor}</p>
                  <p className="text-sm text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-100/40">
            <h2 className="text-xl font-semibold text-slate-900">Receba um mini diagnóstico agora</h2>
            <p className="mt-2 text-sm text-slate-600">Preencha e nossa equipe envia uma visão inicial em até 1 dia útil.</p>
            <form className="mt-5 space-y-3">
              <input type="text" placeholder="Nome" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
              <input type="email" placeholder="E-mail corporativo" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
              <input type="text" placeholder="Faturamento mensal" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
              <button type="submit" className="w-full rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900">
                Quero meu diagnóstico
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-default">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Principais páginas</p>
              <h2 className="text-3xl font-semibold text-slate-900">Estratégia de conteúdo com foco em conversão</h2>
            </div>
            <Link href="/contato" className="text-sm font-semibold text-brand-700 hover:text-brand-900">
              Falar com consultor →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {destaques.map((item) => (
              <article key={item.titulo} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900">{item.titulo}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.descricao}</p>
                <Link href={item.href} className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:text-brand-900">
                  Acessar página →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
