import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-slate-50 py-20">
      <div className="container-default grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Escritório contábil digital</p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Ferramentas gratuitas para empresários tomarem decisões melhores
          </h1>
          <p className="text-lg text-slate-600">
            Use calculadoras, checklists e materiais práticos para organizar sua empresa e conheça nossa assessoria contábil estratégica.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ferramentas"
              className="rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-900"
            >
              Explorar ferramentas
            </Link>
            <Link
              href="/contato"
              className="rounded-md border border-brand-700 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              Falar com especialista
            </Link>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Checklist rápido para abertura de empresa</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Defina regime tributário ideal (Simples, Presumido ou Real)</li>
            <li>• Organize documentação societária</li>
            <li>• Planeje pró-labore e distribuição de lucros</li>
            <li>• Estruture rotinas fiscais e financeiras</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
