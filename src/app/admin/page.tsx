import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin/auth';
import { AuditoriaXml, DiagnosticoTributario, Lead, getAdminDashboardData } from '@/lib/admin/data';

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  const { leads, auditorias, diagnosticos, errors } = await getAdminDashboardData();

  return (
    <section className="py-10">
      <div className="container-default space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Área administrativa</h1>
            <p className="text-sm text-slate-600">Visualize leads, auditorias XML e diagnósticos tributários.</p>
          </div>
          <div className="flex gap-2">
            <a href="/api/admin/export-leads-csv" className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
              Exportar leads CSV
            </a>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Sair
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Leads</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{leads.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Auditorias XML</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{auditorias.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Diagnósticos</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{diagnosticos.length}</p>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Leads</h2>
            {errors.leads ? <p className="mt-2 text-sm text-rose-600">Erro: {errors.leads}</p> : null}
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-2 py-2">Data</th><th className="px-2 py-2">Nome</th><th className="px-2 py-2">Empresa</th><th className="px-2 py-2">E-mail</th><th className="px-2 py-2">Origem</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead: Lead) => (
                    <tr key={lead.id} className="border-b border-slate-100">
                      <td className="px-2 py-2">{new Date(lead.created_at).toLocaleString('pt-BR')}</td>
                      <td className="px-2 py-2">{lead.nome}</td>
                      <td className="px-2 py-2">{lead.empresa ?? '-'}</td>
                      <td className="px-2 py-2">{lead.email}</td>
                      <td className="px-2 py-2">{lead.origem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Auditorias XML</h2>
            {errors.auditorias ? <p className="mt-2 text-sm text-rose-600">Erro: {errors.auditorias}</p> : null}
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-2 py-2">Data</th><th className="px-2 py-2">Arquivo</th><th className="px-2 py-2">Nota</th><th className="px-2 py-2">Emitente</th><th className="px-2 py-2">Score</th><th className="px-2 py-2">Risco</th>
                  </tr>
                </thead>
                <tbody>
                  {auditorias.map((auditoria: AuditoriaXml) => (
                    <tr key={auditoria.id} className="border-b border-slate-100">
                      <td className="px-2 py-2">{new Date(auditoria.created_at).toLocaleString('pt-BR')}</td>
                      <td className="px-2 py-2">{auditoria.nome_arquivo}</td>
                      <td className="px-2 py-2">{auditoria.numero_nota ?? '-'}</td>
                      <td className="px-2 py-2">{auditoria.emitente ?? '-'}</td>
                      <td className="px-2 py-2">{auditoria.score_fiscal}</td>
                      <td className="px-2 py-2">{auditoria.classificacao_risco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Diagnósticos tributários</h2>
            {errors.diagnosticos ? <p className="mt-2 text-sm text-rose-600">Erro: {errors.diagnosticos}</p> : null}
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-2 py-2">Data</th><th className="px-2 py-2">Faturamento</th><th className="px-2 py-2">Regime</th><th className="px-2 py-2">UF</th><th className="px-2 py-2">Funcionários</th><th className="px-2 py-2">Score</th><th className="px-2 py-2">Risco</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnosticos.map((item: DiagnosticoTributario) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="px-2 py-2">{new Date(item.created_at).toLocaleString('pt-BR')}</td>
                      <td className="px-2 py-2">{item.faturamento}</td>
                      <td className="px-2 py-2">{item.regime_tributario}</td>
                      <td className="px-2 py-2">{item.estado.toUpperCase()}</td>
                      <td className="px-2 py-2">{item.numero_funcionarios}</td>
                      <td className="px-2 py-2">{item.score_tributario}</td>
                      <td className="px-2 py-2">{item.classificacao_risco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <p className="text-xs text-slate-500">
          Dica: para segurança em produção, configure `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `ADMIN_SESSION_TOKEN` no ambiente.
        </p>
      </div>
    </section>
  );
}
