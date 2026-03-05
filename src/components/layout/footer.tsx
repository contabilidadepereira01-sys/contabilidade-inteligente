import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-default grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-brand-700">Contabilidade Inteligente</p>
          <p className="mt-2 text-sm text-slate-600">Contabilidade consultiva, tecnologia e ferramentas gratuitas para escalar sua empresa com segurança fiscal.</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-900">Links rápidos</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/ferramentas" className="hover:text-brand-700">Ferramentas</Link></li>
            <li><Link href="/calculadoras" className="hover:text-brand-700">Calculadoras</Link></li>
            <li><Link href="/diagnostico-tributario" className="hover:text-brand-700">Diagnóstico tributário</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-900">Contato</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>comercial@contabilidadeinteligente.com.br</li>
            <li>(11) 4000-0000</li>
            <li>Atendimento nacional</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Contabilidade Inteligente. Todos os direitos reservados.
      </div>
    </footer>
  );
}
