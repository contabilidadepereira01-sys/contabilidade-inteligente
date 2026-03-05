import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/ferramentas', label: 'Ferramentas' },
  { href: '/auditoria-xml', label: 'Auditoria de XML' },
  { href: '/calculadoras', label: 'Calculadoras' },
  { href: '/diagnostico-tributario', label: 'Diagnóstico tributário' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="container-default flex h-16 items-center justify-between gap-8">
        <Link href="/" className="text-base font-bold text-brand-700 sm:text-lg">
          Contabilidade Inteligente
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-brand-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contato" className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-900">
          Agendar diagnóstico
        </Link>
      </div>
    </header>
  );
}
