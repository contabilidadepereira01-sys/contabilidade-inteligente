import Link from 'next/link';
import { SectionTitle } from '@/components/ui/section-title';

const tools = [
  {
    title: 'Calculadora de Simples Nacional',
    description: 'Estime tributos e compare cenários de faturamento mensal.',
  },
  {
    title: 'Simulador de Pró-labore',
    description: 'Projete o valor ideal de retirada para equilíbrio financeiro.',
  },
  {
    title: 'Checklist de Obrigações Mensais',
    description: 'Tenha visibilidade de impostos e entregas acessórias do mês.',
  },
];

export function ToolsHighlightSection() {
  return (
    <section className="py-16">
      <div className="container-default space-y-8">
        <SectionTitle
          title="Ferramentas gratuitas"
          subtitle="Recursos práticos para empresários ganharem clareza financeira e fiscal."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {tools.map((tool) => (
            <article key={tool.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">{tool.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
            </article>
          ))}
        </div>

        <Link href="/ferramentas" className="inline-block text-sm font-semibold text-brand-700 hover:text-brand-900">
          Ver todas as ferramentas →
        </Link>
      </div>
    </section>
  );
}
