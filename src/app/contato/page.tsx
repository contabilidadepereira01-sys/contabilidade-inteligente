export default function ContatoPage() {
  return (
    <section className="py-16">
      <div className="container-default grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Contato</p>
          <h1 className="text-4xl font-bold text-slate-900">Vamos estruturar a contabilidade da sua empresa?</h1>
          <p className="text-slate-600">Preencha o formulário e receba um plano inicial para reduzir riscos fiscais e organizar a operação financeira.</p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Retorno em até 1 dia útil</li>
            <li>• Diagnóstico inicial sem custo</li>
            <li>• Atendimento com especialista tributário</li>
          </ul>
        </div>

        <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-3">
            <input type="text" placeholder="Nome completo" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <input type="email" placeholder="E-mail" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <input type="text" placeholder="Telefone / WhatsApp" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <input type="text" placeholder="Nome da empresa" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <textarea placeholder="Contexto e principais desafios" className="min-h-28 rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <button type="submit" className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900">
              Quero ser atendido
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
