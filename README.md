# Contabilidade Inteligente

Base de uma plataforma web para escritório contábil focada em geração e qualificação de leads.

## Stack

- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- Supabase

## Páginas implementadas

- Home
- Ferramentas
- Auditoria de XML (upload, parse, análise IA, score e inconsistências com captura de lead)
- Calculadoras
- Diagnóstico tributário interativo (score, risco, oportunidades e persistência no banco)
- Área administrativa protegida por login
- Sobre
- Contato

## Área administrativa

A página `/admin` é protegida por login e permite:

- visualizar leads
- visualizar auditorias XML
- visualizar diagnósticos tributários
- exportar leads em CSV (`/api/admin/export-leads-csv`)

Configuração de credenciais via variáveis de ambiente:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_TOKEN`

## Funcionalidade de auditoria XML de NF-e

A página `auditoria-xml` inclui:

- Upload de arquivo XML de NF-e
- Parse em client-side para extração de dados fiscais
- Envio dos dados para endpoint de análise IA (`/api/auditoria-ia`)
- Retorno de score fiscal e inconsistências
- Gate de conversão com formulário de lead (nome, empresa, email, whatsapp, faturamento)
- Persistência do lead no Supabase via `/api/leads`
- Persistência da auditoria em `auditorias_xml`

## Funcionalidade de diagnóstico tributário

A página `diagnostico-tributario` inclui questionário interativo com perguntas de:

- faturamento
- regime tributário
- atividade
- estado
- número de funcionários
- tipo de mercadoria

Após o envio:

- cálculo de score tributário
- classificação de risco
- oportunidades tributárias
- persistência do resultado no banco via `/api/diagnostico-tributario`

## Estrutura

```bash
src/
  app/
    admin/
      login/
    api/
      admin/
      auditoria-ia/
      diagnostico-tributario/
      leads/
    auditoria-xml/
    calculadoras/
    contato/
    diagnostico-tributario/
    ferramentas/
    sobre/
  lib/
    admin/
    nfe/
    tributario/
    supabase/
  types/
```

## Como executar

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Supabase

- Clients prontos em `src/lib/supabase/client.ts` e `src/lib/supabase/server.ts`
- Schema inicial em `supabase/schema.sql`
