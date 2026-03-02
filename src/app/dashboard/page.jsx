'use client'
import Sidebar from '@/components/Sidebar'
import { Plus, Timer, CheckCircle2 } from 'lucide-react'

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen bg-[#050505] text-zinc-300 font-mono">
      <Sidebar />
      <main className="flex-1 p-10 space-y-10">
        <header className="flex justify-between items-end border-b border-zinc-900 pb-6">
          <div>
            <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">/ Welcome_User</span>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">OPERATIONAL_DASHBOARD</h1>
          </div>
          <button className="bg-orange-600 text-black px-6 py-2 font-black uppercase text-xs flex items-center gap-2 hover:bg-white transition-all">
            <Plus size={16} /> New_Project
          </button>
        </header>

        {/* STATS ROW */}
        <div className="grid grid-cols-3 gap-6">
          <StatCard label="Active_Tasks" value="12" icon={<Timer className="text-orange-600"/>} />
          <StatCard label="Completed_Projects" value="08" icon={<CheckCircle2 className="text-green-600"/>} />
          <StatCard label="Total_Focus_Time" value="45.2h" icon={<Plus className="text-zinc-600"/>} />
        </div>

        {/* QUICK TASKS LIST */}
        <section className="border border-zinc-900 bg-black/40 p-6">
          <h2 className="text-xs font-bold text-zinc-500 uppercase mb-6 tracking-[0.2em]">Latest_Activity_Log</h2>
          <div className="space-y-2">
            <ActivityItem task="Refactor Database Connection" status="DONE" project="ForgeHub" />
            <ActivityItem task="Setup Jose Library for JWT" status="IN_PROGRESS" project="AuthModule" />
          </div>
        </section>
      </main>
    </div>
  )
}

function StatCard({ label, value, icon }) {
  return (
    <div className="border border-zinc-900 p-6 bg-black flex justify-between items-start">
      <div>
        <p className="text-[10px] text-zinc-600 uppercase font-bold">{label}</p>
        <p className="text-3xl font-black text-white">{value}</p>
      </div>
      {icon}
    </div>
  )
}

function ActivityItem({ task, status, project }) {
  return (
    <div className="flex justify-between items-center text-[11px] p-3 border border-zinc-900 hover:border-zinc-700 transition">
      <div className="flex gap-4 items-center">
        <span className="text-zinc-700">{">"}</span>
        <span className="text-white font-bold">{task}</span>
        <span className="bg-zinc-900 px-2 py-0.5 text-zinc-500 uppercase">{project}</span>
      </div>
      <span className={status === 'DONE' ? 'text-green-600' : 'text-orange-600'}>[{status}]</span>
    </div>
  )
}
