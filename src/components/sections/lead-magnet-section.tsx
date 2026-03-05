export function LeadMagnetSection() {
  return (
    <section className="py-16">
      <div className="container-default">
        <div className="rounded-2xl bg-brand-900 px-6 py-10 text-white sm:px-10">
          <h2 className="text-3xl font-semibold">Baixe gratuitamente o Guia de Gestão Fiscal 2026</h2>
          <p className="mt-3 max-w-2xl text-brand-100">
            Material prático para reduzir riscos fiscais e melhorar a previsibilidade financeira da sua empresa.
          </p>
          <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Nome"
              className="rounded-md border border-brand-700 bg-brand-800 px-3 py-2 text-sm placeholder:text-brand-200"
            />
            <input
              type="email"
              placeholder="E-mail"
              className="rounded-md border border-brand-700 bg-brand-800 px-3 py-2 text-sm placeholder:text-brand-200"
            />
            <button
              type="submit"
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand-900 transition hover:bg-brand-100"
            >
              Receber material
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
