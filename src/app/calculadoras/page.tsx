const calculadoras = [
  {
    titulo: 'Simulador de Simples Nacional',
    descricao: 'Projeção de alíquota efetiva por faixa de faturamento.',
  },
  {
    titulo: 'Calculadora de Pró-labore',
    descricao: 'Defina retirada ideal e compare impacto financeiro.',
  },
  {
    titulo: 'Ponto de equilíbrio',
    descricao: 'Entenda faturamento mínimo para operar no positivo.',
  },
];

export default function CalculadorasPage() {
  return (
    <section className="py-16">
      <div className="container-default space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Calculadoras</p>
          <h1 className="text-4xl font-bold text-slate-900">Simuladores para apoiar decisões empresariais</h1>
          <p className="max-w-3xl text-slate-600">Experiência simples, rápida e educativa para transformar visitantes em oportunidades comerciais.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {calculadoras.map((item) => (
            <article key={item.titulo} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{item.titulo}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.descricao}</p>
              <button className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-slate-700">
                Em breve
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
