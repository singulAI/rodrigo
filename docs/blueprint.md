# Blueprint Completo - Rodrigo Alves Portfolio
## Documento de Arquitetura Estrutural

---

## 1. VISÃO GERAL DO PROJETO

### 1.1 Nome e Propósito
**Nome**: Portfolio Rodrigo Alves - Web3 & AI Showcase
**Repositório**: `singulAI/rodrigo`
**Descrição**: Portfolio profissional interativo que demonstra expertise em Web3, Blockchain, Inteligência Artificial e desenvolvimento Full Stack. Combina apresentação de projetos, assistentes GPT personalizados, certificações e tecnologias dominadas.

### 1.2 Objetivos de Negócio
- Apresentar portfólio profissional de Rodrigo Alves Ferreira (Desenvolvedor Web3, Especialista em IA, Advogado)
- Demonstrar projetos práticos com vídeos integrados do YouTube
- Exibir assistentes GPT customizados desenvolvidos
- Mostrar certificações e formação acadêmica
- Suporte multilíngue (Português e Inglês)
- Captura de leads através de chatbot integrado
- Demonstrar parceiros e clientes atendidos

---

## 2. ARQUITETURA TÉCNICA

### 2.1 Stack Tecnológica Principal

#### Frontend Framework
- **Next.js 15.3.3** - Framework React com Server-Side Rendering (SSR)
- **React 18.3.1** - Biblioteca UI
- **TypeScript 5** - Linguagem principal (tipagem estática)

#### Styling & UI
- **Tailwind CSS 3.4.1** - Framework CSS utility-first
- **Radix UI** - Componentes acessíveis e não-estilizados
  - Dialog, Dropdown, Accordion, Toast, Tabs, etc.
- **Class Variance Authority (CVA)** - Gerenciamento de variantes de componentes
- **tailwindcss-animate** - Animações CSS
- **Lucide React** - Biblioteca de ícones

#### Internacionalização (i18n)
- **next-intl 3.26.5** - Sistema de tradução
- **Locales suportados**: `pt-BR`, `en`
- **Arquivos de tradução**: `/src/messages/{locale}.json`

#### Database & ORM
- **Prisma 5.14.0** - ORM para TypeScript/Node.js
- **Neon PostgreSQL** - Database serverless PostgreSQL
- **@neondatabase/serverless** - Driver serverless
- **@prisma/adapter-neon** - Adapter Prisma para Neon

#### IA & Genkit
- **Genkit 1.15.5** - Framework para apps de IA generativa
- **@genkit-ai/googleai** - Integração Google AI
- **@genkit-ai/next** - Plugin Next.js para Genkit

#### Testing
- **Jest 30.1.1** - Framework de testes
- **@testing-library/react** - Testes de componentes React
- **@testing-library/jest-dom** - Matchers customizados

#### Deployment & Hosting
- **Netlify** - Hospedagem principal (SSR)
- **Firebase** - Projeto configurado (fallback/histórico)
- **Node.js 20** - Versão runtime

### 2.2 Estrutura de Diretórios

```
rodrigo/
├── .firebase/                 # Firebase build artifacts
├── .github/
│   └── workflows/             # GitHub Actions CI/CD
├── .vscode/                   # VS Code config
├── docs/                      # Documentação
│   ├── blueprint.md          # Este documento
│   └── deploy-nobom.md       # Deploy Windows
├── prisma/
│   └── schema.prisma         # Database schema
├── public/
│   └── images/               # Assets estáticos (logos, perfil)
├── src/
│   ├── ai/                   # Genkit AI flows
│   │   ├── dev.ts
│   │   └── genkit.ts
│   ├── app/                  # Next.js App Router
│   │   ├── [locale]/         # Rotas localizadas
│   │   │   ├── home/         # Página principal do portfolio
│   │   │   ├── layout.tsx    # Layout locale-specific
│   │   │   └── page.tsx      # Landing page
│   │   ├── api/
│   │   │   └── health/       # Health check endpoint
│   │   ├── globals.css       # Estilos globais
│   │   ├── layout.tsx        # Root layout
│   │   └── not-found.tsx     # 404 page
│   ├── components/
│   │   ├── sections/         # Seções da página
│   │   │   ├── about.tsx
│   │   │   ├── certifications.tsx
│   │   │   ├── gpts.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── partners.tsx
│   │   │   ├── projects.tsx
│   │   │   └── technologies.tsx
│   │   ├── ui/               # Componentes Radix UI
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── global-controls.tsx
│   │   ├── theme-provider.tsx
│   │   └── ...
│   ├── contexts/
│   │   └── hero-animation-context.tsx
│   ├── hooks/
│   │   ├── use-localization.ts
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── data.ts           # Dados estáticos (projects, GPTs, etc.)
│   │   ├── db.ts             # Database connection
│   │   └── utils.ts          # Utilidades
│   ├── messages/
│   │   ├── en.json           # Traduções inglês
│   │   └── pt-BR.json        # Traduções português
│   └── middleware.ts         # Next.js middleware (i18n)
├── test/                     # Testes unitários
├── .env.example              # Template variáveis de ambiente
├── components.json           # Shadcn config
├── i18n.ts                   # Config next-intl
├── jest.config.js            # Config Jest
├── netlify.toml              # Config Netlify
├── next.config.ts            # Config Next.js
├── package.json              # Dependencies
├── postcss.config.mjs        # PostCSS config
├── tailwind.config.ts        # Tailwind config
└── tsconfig.json             # TypeScript config
```

---

## 3. ARQUITETURA DE COMPONENTES

### 3.1 Padrão de Arquitetura
- **App Router** (Next.js 15): Roteamento baseado em sistema de arquivos
- **Server Components**: Rendering no servidor por padrão
- **Client Components**: Marcados com `'use client'` quando necessário
- **Layouts Aninhados**: Layout raiz + layout locale-specific

### 3.2 Hierarquia de Páginas

```
/ (root)
├── [locale]/
│   ├── page.tsx              # Landing page (FrasesOrbitais, IconsDrift, CTA)
│   └── home/
│       └── page.tsx          # Portfolio completo
```

### 3.3 Componentes Principais

#### Landing Page (`/[locale]`)
- **FrasesOrbitais**: Frases animadas orbitando
- **IconsDrift**: Ícones flutuantes de background
- **GlobalControls**: Controles globais (tema, idioma)
- **CTA Button**: "Acesso Autorizado" → redireciona para `/home`

#### Home Page (`/[locale]/home`)
**Seções (ordem):**
1. **TopBar** - Navegação e controles
2. **About** - Sobre Rodrigo Alves
3. **GPTs** - Assistentes GPT customizados (6 cards)
4. **Projects** - Projetos com vídeos YouTube (4 projetos)
5. **Partners** - Logos de parceiros (9 empresas)
6. **Technologies** - Stack tecnológica (13 tecnologias)
7. **Certifications** - Formação e certificações (4 certificações)
8. **Footer** - Rodapé com links sociais

**Integrações:**
- **Typebot Bubble**: Chatbot integrado (API: `painelapi.respostainteligente.online`)

### 3.4 Sistema de Design (Radix UI + Tailwind)

**Componentes UI disponíveis:**
- Accordion, Alert, AlertDialog, Avatar, Badge
- Button, Calendar, Card, Carousel, Chart
- Checkbox, Collapsible, Dialog, DropdownMenu
- Form, Input, Label, Menubar, Popover
- Progress, RadioGroup, ScrollArea, Select
- Separator, Sheet, Skeleton, Slider, Switch
- Table, Tabs, Textarea, Toast, Tooltip

---

## 4. GERENCIAMENTO DE DADOS

### 4.1 Database Schema (Prisma)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  content     String?   @db.Text
  published   Boolean   @default(false)
  publishedAt DateTime?
  viewCount   Int       @default(0)
  authorId    String
  author      User      @relation(fields: [authorId], references: [id])
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

**Características:**
- IDs: CUID (Collision-resistant Unique ID)
- Relação: User 1:N Posts
- Índices: email, slug, authorId, published
- Soft-delete ready (publishedAt nullable)

### 4.2 Dados Estáticos (src/lib/data.ts)

**Estruturas de dados:**

1. **projectsData** (4 projetos)
   - id, title (pt/en), embedId (YouTube)
   - Mentor der neuen Zeit, Bot Jurídico, Grupo Win Chatbot, SingulAI

2. **gptsData** (6 assistentes)
   - id, title (pt/en), description (pt/en), link, icon
   - Advogado x Juiz, Proteção Veicular, Analista de Sinistros, Salomão GPT, etc.

3. **certificationsData** (4 certificações)
   - id, title (pt/en), issuer, year, link, icon
   - Bacharel em Direito, Full Stack Dev, LGPD, Blockchain

4. **technologies** (13 tecnologias)
   - name, icon (CDN jsdelivr/devicons)
   - HTML5, TailwindCSS, JS, React, Solidity, Python, Figma, Canva, AE, PS, Firebase, OpenAI, Gemini

5. **partners** (9 parceiros)
   - name, logo (path), hint
   - Logos de clientes/parceiros

---

## 5. INTERNACIONALIZAÇÃO (I18N)

### 5.1 Configuração next-intl

**Locales suportados:**
- `pt-BR` (Português Brasil) - Padrão
- `en` (Inglês)

**Middleware:** `/src/middleware.ts`
- Detecta locale da URL (`/pt-BR/...`, `/en/...`)
- Redireciona para locale padrão se ausente

**Arquivos de tradução:**
- `/src/messages/pt-BR.json`
- `/src/messages/en.json`

**Namespaces:**
```json
{
  "landing": {
    "h1": "...",
    "phrases": [...],
    "cta": "..."
  }
}
```

### 5.2 Uso em Componentes

```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations('landing');
return <h1>{t('h1')}</h1>;
```

---

## 6. ESTILIZAÇÃO & DESIGN SYSTEM

### 6.1 Cores do Tema (CSS Variables)

**Paleta principal:**
- **Primary**: Vibrant cyan (#06B6D4) - Tecnologia moderna
- **Background**: Dark slate (#0F172A) - Fundo profissional
- **Accent**: Electric purple (#8B5CF6) - Destaques interativos
- **Foreground**: Variável (light/dark mode)

**Sistema HSL:**
```css
--background: hsl(var(--background))
--foreground: hsl(var(--foreground))
--primary: hsl(var(--primary))
--accent: hsl(var(--accent))
```

### 6.2 Tipografia

**Fontes:**
- **Body & Headline**: 'Inter' (Google Fonts)
- **Code**: 'monospace'
- **Font Weights**: 400, 500, 600, 700

### 6.3 Animações

**Keyframes personalizadas:**
- `accordion-down/up`: Animação accordion Radix
- `scroll`: Infinite scroll horizontal (logos parceiros)

**Duração:**
- Accordion: 0.2s ease-out
- Scroll: 40s linear infinite

### 6.4 Dark Mode

**Implementação:**
- `next-themes` - Provider de tema
- `class` strategy (Tailwind)
- Default: `dark`
- System preference: Habilitado

---

## 7. INTEGRAÇÕES EXTERNAS

### 7.1 Google Fonts
- **Fonte**: Inter (weights 400-700)
- **Carregamento**: Preconnect para otimização
- **Strategy**: `display=swap`

### 7.2 YouTube Embeds
- **Componente**: Embedded player
- **Projetos**: 4 vídeos (IDs em `data.ts`)
- **Aspect ratio**: 16:9
- **Lazy loading**: Implementado

### 7.3 Typebot Chatbot
- **Package**: `@typebot.io/nextjs`
- **Componente**: `<Bubble />`
- **Config**:
  - typebot: `"rodrigoalves"`
  - apiHost: `https://painelapi.respostainteligente.online`
  - Theme: `{ button: { backgroundColor: "#06B6D4" }, placement: 'right' }`

### 7.4 DevIcons CDN
- **CDN**: `https://cdn.jsdelivr.net/gh/devicons/devicon`
- **Formato**: SVG
- **Tecnologias**: 13 ícones carregados

---

## 8. GENKIT AI INTEGRATION

### 8.1 Estrutura AI

**Arquivos:**
- `/src/ai/genkit.ts` - Configuração Genkit
- `/src/ai/dev.ts` - Development server

**Plugins:**
- `@genkit-ai/googleai` - Google AI models
- `@genkit-ai/next` - Next.js integration

**Scripts:**
```json
"genkit:dev": "genkit start -- tsx src/ai/dev.ts",
"genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts"
```

### 8.2 Uso Potencial
- Geração de conteúdo
- Assistentes conversacionais
- Análise de dados
- Automações inteligentes

---

## 9. DEPLOYMENT & INFRAESTRUTURA

### 9.1 Netlify (Principal)

**Configuração:** `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**Features:**
- SSR (Server-Side Rendering)
- Edge Functions
- Automatic deployments (Git push)
- Environment variables management

### 9.2 Firebase (Alternativo/Histórico)

**Projetos configurados:**
- `feedback-flow-rx2gz`
- `firebase-config-analyzer-kmnl8`

**Status atual:**
- Configuração presente, mas não deployment ativo
- Build artifacts em `.firebase/` (gitignored)

### 9.3 VPS rodrigo.run (Separado)

**Informações (de memories):**
- **IP**: 72.60.147.56
- **User**: root
- **Hostname**: srv993737.hstgr.cloud
- **OS**: Ubuntu 22.04 LTS
- **Path**: `/projects/rodrigo-run`
- **Repositório**: `https://github.com/frodrigoalves/run.git` (diferente do portfolio)

**Nota**: VPS é ambiente separado, não relacionado ao portfolio principal.

### 9.4 Variáveis de Ambiente

**Arquivo:** `.env.local` (não versionado)

```env
# Database
DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/db?sslmode=require"
DIRECT_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/db?sslmode=require"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # ou domínio produção
```

---

## 10. BUILD & DEVELOPMENT

### 10.1 Scripts NPM

```json
{
  "dev": "next dev",                          // Dev server
  "build": "prisma generate && next build",   // Production build
  "start": "next start",                      // Production server
  "lint": "next lint",                        // ESLint
  "typecheck": "tsc --noEmit",               // Type checking
  "test": "jest",                             // Run tests
  "db:push": "prisma db push",               // Sync DB schema
  "db:studio": "prisma studio",              // Prisma GUI
  "genkit:dev": "genkit start -- tsx src/ai/dev.ts"
}
```

### 10.2 Processo de Build

1. **Prisma Generate**: Gera Prisma Client
2. **Next.js Build**:
   - Compila TypeScript
   - Bundling (Webpack)
   - Otimização de assets
   - Geração de páginas estáticas
   - SSR setup
3. **Output**: `.next/` directory

### 10.3 Next.js Config

**Características importantes:**
```typescript
{
  typescript: { ignoreBuildErrors: true },  // Skip TS errors (cuidado!)
  eslint: { ignoreDuringBuilds: true },     // Skip ESLint
  images: {
    formats: ['image/avif', 'image/webp']   // Formatos modernos
  },
  webpack: {
    // Aliases para evitar erros de bundling:
    '@opentelemetry/exporter-jaeger': false,
    '@genkit-ai/firebase': false
  }
}
```

---

## 11. TESTING STRATEGY

### 11.1 Framework
- **Jest 30.1.1** - Test runner
- **@testing-library/react** - Component testing
- **@testing-library/jest-dom** - Custom matchers
- **jest-environment-jsdom** - DOM simulation

### 11.2 Configuração

**jest.config.js:**
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

### 11.3 Cobertura Esperada
- Componentes UI
- Hooks customizados
- Utilitários
- API routes

---

## 12. SEGURANÇA & BOAS PRÁTICAS

### 12.1 Environment Variables
- ✅ `.env.local` no `.gitignore`
- ✅ `.env.example` com template
- ✅ Uso de `NEXT_PUBLIC_*` para variáveis client-side
- ✅ Secrets apenas no servidor

### 12.2 Database
- ✅ Prepared statements (Prisma ORM)
- ✅ Connection pooling (Neon)
- ✅ SSL obrigatório (`sslmode=require`)
- ✅ Índices otimizados

### 12.3 TypeScript
- ✅ Strict mode habilitado
- ✅ Tipos explícitos em props
- ✅ No `any` (preferencialmente)

### 12.4 Acessibilidade
- ✅ Radix UI (componentes acessíveis)
- ✅ `sr-only` para textos de screen reader
- ✅ `aria-label` em elementos interativos
- ✅ Navegação por teclado

---

## 13. PERFORMANCE & OTIMIZAÇÕES

### 13.1 Next.js Image Optimization
- Formatos modernos: AVIF, WebP
- Lazy loading automático
- Responsive images
- CDN delivery (Netlify)

### 13.2 Code Splitting
- Automatic route-based splitting
- Dynamic imports para componentes pesados
- Tree shaking (Webpack)

### 13.3 Font Optimization
- Google Fonts com `preconnect`
- `display=swap` para evitar FOIT
- Subsetting automático

### 13.4 Bundle Analysis
- Tailwind PurgeCSS (prod)
- Minificação CSS/JS
- Compression (gzip/brotli)

---

## 14. CONTEÚDO & DADOS

### 14.1 Projetos Destacados

1. **Mentor der neuen Zeit**
   - YouTube ID: `YOTgISedhN0`
   - Categoria: Consultoria/Mentoria

2. **Bot Jurídico**
   - YouTube ID: `HW9EqHiobSo`
   - Categoria: IA Legal

3. **Grupo Win Chatbot**
   - YouTube ID: `qgFuxq6TS68`
   - Categoria: Automação Empresarial

4. **SingulAI - Legado Digital**
   - YouTube ID: `URqnOXDsc0Y`
   - Categoria: Web3/Blockchain

### 14.2 Assistentes GPT (6)

1. **Advogado x Juiz** - Debates jurídicos
2. **Proteção Veicular Sieben** - Análises diretoria
3. **Analista de Sinistros** - Engenharia de processos
4. **Salomão GPT** - Sabedoria e conselhos
5. **Assistente Financeiro** - Relatórios estratégicos
6. **Proteção Veicular Diretoria** - Relatórios gerais

### 14.3 Stack Tecnológica (13)
HTML5, TailwindCSS, JavaScript, React, Solidity, Python, Figma, Canva, After Effects, Photoshop, Firebase, OpenAI, Gemini

### 14.4 Parceiros (9)
Assessoria e Consultoria, Grupo Win, Pexaria, Equânime, Alape, Colman Motos, See Bier, SingulAI, Resposta Inteligente

---

## 15. ROADMAP & MELHORIAS FUTURAS

### 15.1 Funcionalidades Planejadas
- [ ] Blog com posts dinâmicos (usando model Post)
- [ ] Sistema de autenticação
- [ ] Dashboard administrativo
- [ ] Analytics integrado
- [ ] Newsletter subscription
- [ ] Contact form com validação

### 15.2 Melhorias Técnicas
- [ ] Implementar ISR (Incremental Static Regeneration)
- [ ] Service Worker para PWA
- [ ] Testes E2E (Playwright/Cypress)
- [ ] Storybook para componentes
- [ ] CI/CD completo com testes automatizados

### 15.3 Performance
- [ ] Implement Bundle analyzer
- [ ] Lazy load imagens parceiros
- [ ] Optimize YouTube embeds (facade pattern)
- [ ] Implement route prefetching estratégico

---

## 16. MANUTENÇÃO & SUPORTE

### 16.1 Atualização de Dependências
```bash
npm outdated                    # Verificar atualizações
npm update                      # Atualizar minor/patch
npm install <pkg>@latest        # Major updates
```

### 16.2 Database Migrations
```bash
npx prisma migrate dev          # Development migration
npx prisma migrate deploy       # Production migration
npx prisma db push              # Prototyping (sem histórico)
npx prisma studio               # GUI para DB
```

### 16.3 Logs & Monitoring
- Netlify Functions logs
- Next.js production logs
- Database query logs (Neon dashboard)
- Error tracking (recomendado: Sentry)

---

## 17. GLOSSÁRIO DE TECNOLOGIAS

| Tecnologia | Propósito | Versão |
|------------|-----------|--------|
| Next.js | Framework React SSR | 15.3.3 |
| React | Biblioteca UI | 18.3.1 |
| TypeScript | Linguagem tipada | 5.x |
| Tailwind CSS | Framework CSS | 3.4.1 |
| Prisma | ORM Database | 5.14.0 |
| Neon | PostgreSQL serverless | - |
| next-intl | Internacionalização | 3.26.5 |
| Radix UI | Componentes headless | - |
| Genkit | Framework IA | 1.15.5 |
| Jest | Testing framework | 30.1.1 |
| Netlify | Hosting/Deployment | - |

---

## 18. CONTATOS & RECURSOS

### 18.1 Autor
**Rodrigo Alves Ferreira**
- Desenvolvedor Web3
- Especialista em IA
- Bacharel em Direito (UNISUL 2025)
- Full Stack Developer (desde 2014)

### 18.2 Links Úteis
- Repository: `https://github.com/singulAI/rodrigo`
- Portfolio: (domínio produção)
- Chatbot API: `https://painelapi.respostainteligente.online`

### 18.3 Documentação Referência
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com)
- [next-intl](https://next-intl-docs.vercel.app)
- [Genkit](https://firebase.google.com/docs/genkit)

---

**Versão do Blueprint**: 1.0
**Data**: 2026-04-11
**Status**: Documento Completo e Estruturado
