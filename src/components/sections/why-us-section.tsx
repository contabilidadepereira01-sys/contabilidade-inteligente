import { SectionTitle } from '@/components/ui/section-title';

const benefits = [
  'Atendimento consultivo com especialistas em PMEs',
  'Dashboard mensal com indicadores contábeis',
  'Processos digitais para agilidade no envio de documentos',
  'Planejamento tributário focado em economia e segurança',
];

export function WhyUsSection() {
  return (
    <section className="bg-white py-16">
      <div className="container-default space-y-8">
        <SectionTitle
          title="Por que escolher nosso escritório?"
          subtitle="Unimos tecnologia, conteúdo e atendimento humano para apoiar o crescimento do seu negócio."
        />
        <ul className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
          {benefits.map((item) => (
            <li key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
