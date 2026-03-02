'use client'
import { useEffect, useState, useCallback } from 'react'
import Sidebar from '@/components/Sidebar'
import { Plus, Timer, CheckCircle2, Loader2, X, FolderCode, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
// Helper: pega token e faz fetch autenticado
async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token')
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })
}

export default function UserDashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  // Modal novo projeto
  const [showModal, setShowModal] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [creating, setCreating] = useState(false)

  // Carrega projetos da API
  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFetch('/api/projects')
      if (res.status === 401) {
        window.location.href = '/login'
        return
      }
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao carregar projetos')
      setProjects(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Carrega usuário do localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))

    fetchProjects()
  }, [fetchProjects])

  // Cria novo projeto
  async function handleCreateProject(e) {
    e.preventDefault()
    if (!newProjectName.trim()) return
    setCreating(true)
    try {
      const res = await apiFetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify({ name: newProjectName.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao criar projeto')
      setNewProjectName('')
      setShowModal(false)
      fetchProjects() // Recarrega a lista
    } catch (err) {
      alert(err.message)
    } finally {
      setCreating(false)
    }
  }

  // Stats derivadas dos projetos
  const totalTasks = projects.reduce((acc, p) => acc + p.task.length, 0)
  const completedTasks = projects.reduce((acc, p) => acc + p.task.filter(t => t.completed).length, 0)
  const completedProjects = projects.filter(p => p.task.length > 0 && p.task.every(t => t.completed)).length

  // Últimas tarefas criadas (activity log)
  const recentTasks = projects
    .flatMap(p => p.task.map(t => ({ ...t, projectName: p.name })))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

  return (
    <div className="flex min-h-screen bg-[#050505] text-zinc-300 font-mono">
      <Sidebar />

      <main className="flex-1 p-10 space-y-10">
        {/* HEADER */}
        <header className="flex justify-between items-end border-b border-zinc-900 pb-6">
          <div>
            <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">
              / Welcome_User{user ? `: ${user.email}` : ''}
            </span>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
              OPERATIONAL_DASHBOARD
            </h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-600 text-black px-6 py-2 font-black uppercase text-xs flex items-center gap-2 hover:bg-white transition-all"
          >
            <Plus size={16} /> New_Project
          </button>
        </header>

        {/* STATS ROW */}
        <div className="grid grid-cols-3 gap-6">
          <StatCard
            label="Active_Tasks"
            value={loading ? '—' : String(totalTasks - completedTasks).padStart(2, '0')}
            icon={<Timer className="text-orange-600" />}
          />
          <StatCard
            label="Completed_Tasks"
            value={loading ? '—' : String(completedTasks).padStart(2, '0')}
            icon={<CheckCircle2 className="text-green-600" />}
          />
          <StatCard
            label="Total_Projects"
            value={loading ? '—' : String(projects.length).padStart(2, '0')}
            icon={<FolderCode className="text-zinc-400" />}
          />
        </div>

        {/* ESTADO DE ERRO */}
        {error && (
          <div className="border border-red-900 bg-red-950/20 p-4 flex items-center gap-3 text-red-500 text-xs font-bold uppercase">
            <AlertTriangle size={16} />
            ERROR: {error}
          </div>
        )}

        {/* ACTIVITY LOG */}
        <section className="border border-zinc-900 bg-black/40 p-6">
          <h2 className="text-xs font-bold text-zinc-500 uppercase mb-6 tracking-[0.2em]">
            Latest_Activity_Log
          </h2>

          {loading ? (
            <div className="flex items-center gap-3 text-zinc-600 text-xs">
              <Loader2 size={14} className="animate-spin" />
              <span>Fetching_Data...</span>
            </div>
          ) : recentTasks.length === 0 ? (
            <p className="text-zinc-700 text-xs uppercase font-bold">
              {'>'} No_Tasks_Found — create a project to get started.
            </p>
          ) : (
            <div className="space-y-2">
              {recentTasks.map(task => (
                <ActivityItem
                  key={task.id}
                  task={task.title}
                  status={task.completed ? 'DONE' : 'PENDING'}
                  project={task.projectName}
                />
              ))}
            </div>
          )}
        </section>

        {/* LISTA DE PROJETOS */}
        <section className="border border-zinc-900 bg-black/40 p-6">
          <h2 className="text-xs font-bold text-zinc-500 uppercase mb-6 tracking-[0.2em]">
            Repositories_Overview
          </h2>

          {loading ? (
            <div className="flex items-center gap-3 text-zinc-600 text-xs">
              <Loader2 size={14} className="animate-spin" />
              <span>Loading_Repositories...</span>
            </div>
          ) : projects.length === 0 ? (
            <p className="text-zinc-700 text-xs uppercase font-bold">
              {'>'} No_Projects_Found.
            </p>
          ) : (
            <div className="grid gap-3">
              {projects.map(project => (
              <Link href={`/projects/${project.id}`} key={project.id}> 
                <ProjectRow project={project} />
              </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* MODAL NOVO PROJETO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm border border-zinc-800 bg-black p-8 space-y-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-600 hover:text-white"
            >
              <X size={16} />
            </button>
            <h2 className="text-lg font-black text-white uppercase tracking-tighter">
              Initialize_New_Project
            </h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">
                  Project_Name
                </label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  required
                  autoFocus
                  className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white outline-none focus:border-orange-600 transition-all placeholder:text-zinc-700"
                  placeholder="my-project-name"
                />
              </div>
              <button
                type="submit"
                disabled={creating}
                className="w-full bg-orange-600 text-black font-black py-3 uppercase text-xs hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {creating ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                {creating ? 'Creating...' : 'Create_Project'}
              </button>
            </form>
          </div>
        </div>
      )}
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
        <span className="text-zinc-700">{'>'}</span>
        <span className="text-white font-bold truncate max-w-[200px]">{task}</span>
        <span className="bg-zinc-900 px-2 py-0.5 text-zinc-500 uppercase text-[9px]">{project}</span>
      </div>
      <span className={status === 'DONE' ? 'text-green-600 font-bold' : 'text-orange-600 font-bold'}>
        [{status}]
      </span>
    </div>
  )
}

function ProjectRow({ project }) {
  const total = project.task.length
  const done = project.task.filter(t => t.completed).length
  const percent = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="border border-zinc-900 p-4 flex items-center justify-between gap-6 hover:border-zinc-700 transition">
      <div className="flex items-center gap-3 min-w-0">
        <FolderCode size={14} className="text-orange-600 shrink-0" />
        <span className="text-white font-bold text-sm truncate">{project.name}</span>
      </div>
      <div className="flex items-center gap-6 shrink-0 text-[10px] text-zinc-500 font-bold uppercase">
        <span>{done}/{total} tasks</span>
        <div className="w-24 bg-zinc-900 h-1">
          <div
            className="bg-orange-600 h-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className={percent === 100 && total > 0 ? 'text-green-600' : 'text-zinc-600'}>
          {percent}%
        </span>
      </div>
    </div>
  )
}