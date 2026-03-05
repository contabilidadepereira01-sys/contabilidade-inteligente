import Link from 'next/link';

const recursos = [
  {
    nome: 'Auditoria de XML',
    descricao: 'Envie XMLs e identifique divergências fiscais, CFOP inválido e notas não escrituradas.',
    href: '/auditoria-xml',
  },
  {
    nome: 'Calculadoras',
    descricao: 'Simulações financeiras e tributárias para apoiar decisões do empresário.',
    href: '/calculadoras',
  },
  {
    nome: 'Diagnóstico tributário',
    descricao: 'Questionário inteligente para mapear riscos e oportunidades de economia.',
    href: '/diagnostico-tributario',
  },
];

export default function FerramentasPage() {
  return (
    <section className="py-16">
      <div className="container-default space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Ferramentas gratuitas</p>
          <h1 className="text-4xl font-bold text-slate-900">Central de ferramentas para geração de leads</h1>
          <p className="max-w-3xl text-slate-600">Cada ferramenta foi desenhada para entregar valor imediato e conduzir o empresário para uma conversa comercial qualificada.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {recursos.map((recurso) => (
            <article key={recurso.nome} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{recurso.nome}</h2>
              <p className="mt-2 text-sm text-slate-600">{recurso.descricao}</p>
              <Link href={recurso.href} className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:text-brand-900">
                Abrir ferramenta →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
