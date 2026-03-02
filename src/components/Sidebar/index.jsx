import { LayoutDashboard, FolderCode, Settings, LogOut, Terminal } from 'lucide-react'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-900 h-screen sticky top-0 bg-black p-6 flex flex-col justify-between">
      <div className="space-y-12">
        <div className="flex items-center gap-2 text-orange-600 font-black tracking-widest uppercase">
          <Terminal size={20} /> FORGEHUB
        </div>
        <nav className="flex flex-col gap-2 uppercase font-bold text-xs text-zinc-500">
          <NavLink href="/dashboard" icon={<LayoutDashboard size={16}/>} label="Overview" />
          <NavLink href="/projects" icon={<FolderCode size={16}/>} label="Repositories" />
          <NavLink href="/settings" icon={<Settings size={16}/>} label="System.Cfg" />
        </nav>
      </div>
      <button className="flex items-center gap-2 text-zinc-700 hover:text-red-500 text-xs font-black uppercase">
        <LogOut size={16} /> Disconnect_Session
      </button>
    </aside>
  )
}

function NavLink({ href, icon, label }) {
  return (
    <Link href={href} className="flex items-center gap-3 p-3 hover:bg-zinc-900 hover:text-white transition-all border border-transparent hover:border-zinc-800">
      {icon} {label}
    </Link>
  )
}
