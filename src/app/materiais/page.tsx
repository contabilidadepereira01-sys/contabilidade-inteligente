import { SectionTitle } from '@/components/ui/section-title';

const materiais = [
  'Guia de Gestão Fiscal para PMEs',
  'Checklist para contratação de equipe CLT',
  'Modelo de controle de fluxo de caixa',
];

export default function MateriaisPage() {
  return (
    <section className="py-16">
      <div className="container-default space-y-8">
        <SectionTitle
          title="Materiais gratuitos"
          subtitle="Conteúdos ricos para educar empresários e apoiar decisões estratégicas."
        />
        <div className="space-y-3">
          {materiais.map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
