import Link from 'next/link';

export default function SobrePage() {
  return (
    <section className="py-16">
      <div className="container-default grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Sobre</p>
          <h1 className="text-4xl font-bold text-slate-900">Contabilidade consultiva com mentalidade de crescimento</h1>
          <p className="text-slate-600">Somos um escritório focado em pequenas e médias empresas que precisam de previsibilidade financeira, segurança fiscal e dados para crescer.</p>
          <p className="text-slate-600">Combinamos tecnologia, processos e atendimento próximo para transformar contabilidade em vantagem competitiva.</p>
          <Link href="/contato" className="inline-block rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900">
            Falar com especialista
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-2xl font-bold text-slate-900">10+ anos</p>
            <p className="text-sm text-slate-600">de experiência em planejamento tributário</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-2xl font-bold text-slate-900">430+</p>
            <p className="text-sm text-slate-600">empresas atendidas em todo o Brasil</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-2xl font-bold text-slate-900">Atendimento consultivo</p>
            <p className="text-sm text-slate-600">reuniões estratégicas com especialistas de negócio</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-2xl font-bold text-slate-900">Tecnologia</p>
            <p className="text-sm text-slate-600">integrações e automações para reduzir retrabalho</p>
          </div>
        </div>
      </div>
    </section>
  );
}
