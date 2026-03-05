interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-slate-600">{subtitle}</p> : null}
    </div>
  );
}
