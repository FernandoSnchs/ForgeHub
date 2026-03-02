'use client'
import { 
  Hash, Activity, Terminal, Lock, Box, Timer, ChevronRight, 
  GitMerge, Cpu, Globe, Database, Zap, HardDrive, Search, 
  Code2, BarChart3, History as HistoryIcon
} from 'lucide-react'

import Link from 'next/link'

export default function ForgeHub() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#d1d1d1] font-mono selection:bg-orange-600 selection:text-white">
      
      {/* GRID DE FUNDO (FIXO) */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      {/* 01. BARRA DE STATUS (NAV) */}
      <nav className="relative z-10 border-b border-zinc-900 bg-black/80 px-4 py-3 flex justify-between items-center sticky top-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-600 animate-pulse"></div>
            <span className="font-black text-white tracking-widest uppercase text-sm">FORGEHUB_SYS</span>
          </div>
          <div className="hidden lg:flex gap-4 text-[10px] text-zinc-600 border-l border-zinc-800 pl-4 uppercase">
            <span>Uptime: 99.98%</span>
            <span>Latency: 12ms</span>
            <span className="text-orange-900/50">Nodes: 04_Active</span>
          </div>
        </div>
        <div className="flex gap-6 text-xs font-bold uppercase">
          <Link href="/login" className="hover:text-orange-500 transition">Access.Init()</Link>
          <Link href="/register" className="text-orange-600 hover:bg-orange-600 hover:text-white px-2 transition-all border border-orange-900/30">New_Account</Link>
        </div>
      </nav>

      {/* 02. HERO: COMMAND CENTER */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40 border-x border-zinc-900">
        <div className="grid lg:grid-cols-[1fr_400px] gap-20 items-start">
          <div className="space-y-12">
            <div className="inline-block border border-orange-600/30 px-3 py-1 text-[10px] font-bold text-orange-500 uppercase tracking-widest">
              Establish_Connection // Priority_High
            </div>
            <h1 className="text-6xl md:text-[120px] font-black text-white leading-[0.8] tracking-tighter uppercase italic">
              FORJE <br /> O SEU <br /> <span className="bg-orange-600 text-black not-italic px-4">LEGADO.</span>
            </h1>
            <p className="max-w-xl text-zinc-500 leading-snug text-base border-l-4 border-orange-600 pl-8">
              O ForgeHub não é um app de "to-do". É uma infraestrutura de dados para o seu desenvolvimento pessoal. Registre cada commit mental, cada sessão de foco e cada pivot técnico.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/register" className="bg-white text-black px-10 py-5 font-black uppercase text-sm hover:translate-x-2 transition-transform flex items-center gap-4">
                Initialize_Forger_ID <ChevronRight size={18} />
              </Link>
            </div>
          </div>
          
          {/* PAINEL LATERAL DE TELEMETRIA */}
          <div className="hidden lg:block space-y-1">
            <div className="bg-zinc-900/20 border border-zinc-800 p-4 text-[10px] space-y-3">
              <div className="flex justify-between border-b border-zinc-800 pb-2 italic text-zinc-400">
                <span>[SESSION_METRICS]</span>
                <Cpu size={12} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-zinc-600 uppercase">Memory_Used</p><p className="text-white font-bold">12.4 GB</p></div>
                <div><p className="text-zinc-600 uppercase">Active_Threads</p><p className="text-white font-bold">402</p></div>
              </div>
              <div className="space-y-1">
                 <p className="text-zinc-600 uppercase text-[9px]">Server_Load</p>
                 <div className="w-full bg-zinc-900 h-1"><div className="bg-orange-600 h-full w-[42%]"></div></div>
              </div>
            </div>
            <div className="border border-zinc-900 p-4 font-mono text-[11px] text-zinc-700">
               {">"} forge_hub --verbose <br/>
               {">"} checking_database_integrity... OK <br/>
               {">"} local_storage_active: true <br/>
               {">"} waiting_for_user_input_
            </div>
          </div>
        </div>
      </header>

      {/* 03. CORE MODULES (BENTO GRID BRUTALISTA) */}
      <section className="relative z-10 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 grid-rows-2 h-auto md:h-[600px] border-x border-zinc-900">
          
          {/* Card 1: Projetos */}
          <div className="md:col-span-2 border-b md:border-b-0 border-r border-zinc-900 p-12 group hover:bg-zinc-900/10">
            <GitMerge className="text-orange-600 mb-8" size={32} />
            <h3 className="text-4xl font-black text-white uppercase mb-4 tracking-tighter">Stack_Manager</h3>
            <p className="text-zinc-500 text-sm max-w-sm">
              Cada projeto é uma entidade. Vincule sua stack técnica (Next, MySQL, Rust) e defina objetivos imutáveis. O contexto é tudo.
            </p>
          </div>

          {/* Card 2: Timer */}
          <div className="border-b md:border-b-0 border-r border-zinc-900 p-12 group">
            <Timer className="text-orange-600 mb-8" size={32} />
            <h3 className="text-2xl font-black text-white uppercase mb-4">Deep_Focus</h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              Sessões de foco vinculadas ao ID do projeto. Se você não mediu o tempo, você não trabalhou.
            </p>
          </div>

          {/* Card 3: Metrics */}
          <div className="p-12 group">
            <BarChart3 className="text-orange-600 mb-8" size={32} />
            <h3 className="text-2xl font-black text-white uppercase mb-4">Raw_Data</h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              Exportação de produtividade. Sem métricas de vaidade. Apenas a verdade sobre seu tempo.
            </p>
          </div>

          {/* Card 4: Database */}
          <div className="md:col-span-2 border-t border-r border-zinc-900 p-12 flex items-center gap-12 bg-white/5">
            <Database size={48} className="text-orange-900" />
            <div>
              <h3 className="text-3xl font-black text-white uppercase mb-2">Relational_History</h3>
              <p className="text-zinc-400 text-sm italic">"O ForgeHub armazena não apenas o que você fez, mas por que você fez."</p>
            </div>
          </div>

          {/* Card 5: Log */}
          <div className="md:col-span-2 border-t border-zinc-900 p-12 flex flex-col justify-end">
             <div className="flex gap-2 mb-4">
                <div className="w-10 h-1 bg-orange-600"></div>
                <div className="w-10 h-1 bg-zinc-800"></div>
             </div>
             <h3 className="text-2xl font-black text-white uppercase">Decision_Log_v2</h3>
             <p className="text-zinc-500 text-xs mt-2">Um feed imutável de anotações técnicas. Documente o pivot antes que você esqueça o motivo.</p>
          </div>
        </div>
      </section>

      {/* 04. TECHNICAL WORKFLOW (O PROCESSO) */}
      <section className="relative z-10 py-32 border-x border-zinc-900 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-24">
          <div className="sticky top-32 h-fit">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">[PROCEDURE_LOG]</span>
            <h2 className="text-5xl font-black text-white uppercase mt-6 mb-12 tracking-tighter">O CICLO <br/> DE FORJA.</h2>
            <div className="space-y-4">
              <div className="p-4 border-l-2 border-orange-600 bg-white/5 font-bold text-sm">01. INITIALIZE_PROJECT</div>
              <div className="p-4 border-l-2 border-zinc-800 text-zinc-600 font-bold text-sm">02. ESTABLISH_OBJECTIVES</div>
              <div className="p-4 border-l-2 border-zinc-800 text-zinc-600 font-bold text-sm">03. EXECUTE_FOCUS_SESSION</div>
              <div className="p-4 border-l-2 border-zinc-800 text-zinc-600 font-bold text-sm">04. LOG_TECHNICAL_DECISION</div>
            </div>
          </div>
          
          <div className="space-y-32 py-12">
             <WorkflowItem 
                icon={<HardDrive />}
                title="Pense por Projetos"
                desc="Chega de listas infinitas de tarefas. No ForgeHub, tudo nasce de um projeto. Se não tem um objetivo, não deveria estar no seu radar."
             />
             <WorkflowItem 
                icon={<Activity />}
                title="Monitore o Esforço"
                desc="O timer não serve para te pressionar, mas para te dar dados. No final da semana, você saberá exatamente quantas horas 'forjou' de verdade."
             />
             <WorkflowItem 
                icon={<HistoryIcon />}
                title="Crie Memória Técnica"
                desc="Sabe aquele erro que você resolveu e esqueceu como? O Log de Decisões é onde você anota a solução. É o seu Stack Overflow pessoal."
             />
          </div>
        </div>
      </section>

      {/* 05. TERMINAL FAQ (MAIS DENSIDADE) */}
      <section className="relative z-10 bg-[#080808] border-y border-zinc-900 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Search className="text-zinc-600" size={20} />
            <h2 className="text-2xl font-black text-white uppercase tracking-widest">System_FAQ.query()</h2>
          </div>
          <div className="space-y-8 border-l border-zinc-800 pl-8">
            <FaqItem q="É para times ou solo?" a="Foco total em Single Players. Otimizado para quem precisa gerenciar a própria sanidade e produtividade." />
            <FaqItem q="Posso exportar meus dados?" a="Sim. Seus logs e métricas pertencem a você. Suporte a exportação em JSON e CSV via console." />
            <FaqItem q="O ForgeHub é um planner?" a="Não. É uma ferramenta de registro e análise. Nós focamos no que você FEZ, não no que você sonha fazer." />
          </div>
        </div>
      </section>

      {/* 06. FOOTER: SYSTEM_SHUTDOWN */}
      <footer className="relative z-10 py-20 px-6 border-x border-zinc-900 max-w-7xl mx-auto bg-black text-center">
        <div className="mb-12 opacity-20 flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest">
           <span>ForgeHub_v1.0</span>
           <span>MySQL_Stable</span>
           <span>Prisma_Active</span>
           <span>Edge_Runtime</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-zinc-900 uppercase tracking-tighter mb-12">PRONTO PARA <br/> CONSTRUIR?</h2>
        <Link href="/register" className="inline-block bg-orange-600 text-black px-12 py-6 font-black uppercase text-xl hover:bg-white transition-colors">
          Initialize_Registration
        </Link>
      </footer>

    </div>
  )
}

function WorkflowItem({ icon, title, desc }) {
  return (
    <div className="space-y-6">
      <div className="w-14 h-14 bg-zinc-900 flex items-center justify-center text-orange-600 border border-zinc-800">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h3>
      <p className="text-zinc-500 leading-relaxed text-sm">{desc}</p>
    </div>
  )
}

function FaqItem({ q, a }) {
  return (
    <div className="space-y-2">
      <p className="text-orange-600 font-bold text-xs uppercase tracking-widest">{">"} {q}</p>
      <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
    </div>
  )
}
