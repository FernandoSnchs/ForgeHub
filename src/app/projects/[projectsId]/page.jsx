'use client'
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import {
  Plus, Trash2, CheckCircle2, Circle, Loader2,
  AlertTriangle, ChevronLeft, Terminal, Zap,
  FolderCode, MoreHorizontal, Pencil, X, Check
} from 'lucide-react'
import Link from 'next/link'

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

export default function ProjectPage() {
  const { projectsId } = useParams()

  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Novo task
  const [newTitle, setNewTitle] = useState('')
  const [adding, setAdding] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)

  // Edição inline
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')

  // Ações em progresso
  const [loadingTaskId, setLoadingTaskId] = useState(null)

  const fetchProject = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFetch('/api/projects')
      if (res.status === 401) { window.location.href = '/login'; return }
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao carregar projetos')

        
    console.log("ID da URL:", projectsId)
    console.log("Lista de Projetos da API:", data)

      const found = data.find(p => p.id == projectsId)
      if (!found) throw new Error('Projeto não encontrado')

      setProject(found)
      setTasks(found.task.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [projectsId])

  useEffect(() => { fetchProject() }, [fetchProject])

  // CRIAR TASK
  async function handleAddTask(e) {
    e.preventDefault()
    const url = `/api/projects/${projectsId}/tasks`;
    console.log("Tentando acessar a URL:", url)
    if (!newTitle.trim()) return
    setAdding(true)
    try {
      const res = await apiFetch(`/api/projects/${projectsId}/tasks`, {
        method: 'POST',
        body: JSON.stringify({ title: newTitle.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setTasks(prev => [data, ...prev])
      setNewTitle('')
    } catch (err) {
      alert(err.message)
    } finally {
      setAdding(false)
    }
  }

  // TOGGLE COMPLETED
  async function handleToggle(task) {
    setLoadingTaskId(task.id)
    try {
      const res = await apiFetch(`/api/task/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setTasks(prev => prev.map(t => t.id === task.id ? data : t))
    } catch (err) {
      alert(err.message)
    } finally {
      setLoadingTaskId(null)
    }
  }

  // DELETAR TASK
 async function handleDelete(taskId) {
  setLoadingTaskId(taskId)
  try {
    // MUDE DE fetch PARA apiFetch
    const res = await apiFetch(`/api/task/${taskId}`, { 
      method: 'DELETE' 
    })
    
    if (!res.ok) throw new Error('Erro ao deletar task')
    setTasks(prev => prev.filter(t => t.id !== taskId))
  } catch (err) {
    alert(err.message)
  } finally {
    setLoadingTaskId(null)
  }
}

  // EDITAR TASK
  function startEdit(task) {
    setEditingId(task.id)
    setEditingTitle(task.title)
  }

  async function confirmEdit(taskId) {
  if (!editingTitle.trim()) return
  setLoadingTaskId(taskId)
  try {
   
    const res = await apiFetch(`/api/task/${taskId}`, {
      method: 'PATCH',
      // O apiFetch já adiciona o Content-Type e o Authorization automaticamente
      body: JSON.stringify({ title: editingTitle.trim() }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error)

    setTasks(prev => prev.map(t => t.id === taskId ? data : t))
    setEditingId(null)
  } catch (err) {
    alert(err.message)
  } finally {
    setLoadingTaskId(null)
  }
}
  // Stats
  const total = tasks.length
  const done = tasks.filter(t => t.completed).length
  const pending = total - done
  const percent = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="flex min-h-screen bg-[#050505] text-zinc-300 font-mono">
      <Sidebar />

      <main className="flex-1 p-10 space-y-8 max-w-4xl">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase font-bold">
          <Link href="/dashboard" className="hover:text-orange-500 transition flex items-center gap-1">
            <ChevronLeft size={12} /> Dashboard
          </Link>
          <span className="text-zinc-800">/</span>
          <span className="text-zinc-500">Repositories</span>
          <span className="text-zinc-800">/</span>
          <span className="text-orange-600">{project?.name ?? '...'}</span>
        </div>

        {/* HEADER DO PROJETO */}
        {loading ? (
          <div className="flex items-center gap-3 text-zinc-600 text-xs pt-8">
            <Loader2 size={16} className="animate-spin" />
            <span>Loading_Repository...</span>
          </div>
        ) : error ? (
          <div className="border border-red-900 bg-red-950/20 p-4 flex items-center gap-3 text-red-500 text-xs font-bold uppercase">
            <AlertTriangle size={16} /> {error}
          </div>
        ) : (
          <>
            <header className="border-b border-zinc-900 pb-8 space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <FolderCode size={28} className="text-orange-600" />
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                      {project.name}
                    </h1>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase">
                    <span className="text-zinc-600">ID:</span>
                    <code className="text-zinc-700 bg-zinc-900 px-2 py-0.5">{project.id}</code>
                    <span className="border border-zinc-800 px-2 py-0.5 text-zinc-600">
                      <Terminal size={10} className="inline mr-1" />
                      Active_Repository
                    </span>
                  </div>
                </div>

                {/* COMPLETION BADGE */}
                <div className="text-right">
                  <p className={`text-5xl font-black ${percent === 100 && total > 0 ? 'text-green-500' : 'text-orange-600'}`}>
                    {percent}%
                  </p>
                  <p className="text-[9px] text-zinc-600 uppercase font-bold">Completion_Rate</p>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="space-y-2">
                <div className="w-full bg-zinc-900 h-1.5">
                  <div
                    className={`h-full transition-all duration-700 ${percent === 100 && total > 0 ? 'bg-green-600' : 'bg-orange-600'}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="flex gap-8 text-[10px] font-bold uppercase">
                  <span className="text-zinc-600">Total: <span className="text-white">{total}</span></span>
                  <span className="text-zinc-600">Pending: <span className="text-orange-500">{pending}</span></span>
                  <span className="text-zinc-600">Done: <span className="text-green-500">{done}</span></span>
                </div>
              </div>
            </header>

            {/* INPUT — NOVA TASK */}
            <section className="space-y-3">
              <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest flex items-center gap-2">
                <Zap size={10} className="text-orange-600" /> Add_New_Task
              </label>
              <form onSubmit={handleAddTask} className="flex gap-3">
                <div className={`flex-1 border transition-all ${inputFocused ? 'border-orange-600' : 'border-zinc-800'} bg-zinc-900 flex items-center`}>
                  <span className="text-zinc-700 font-bold px-3 text-xs select-none">{'>'}</span>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="Describe the task..."
                    className="flex-1 bg-transparent py-3 pr-3 text-sm text-white outline-none placeholder:text-zinc-700"
                  />
                </div>
                <button
                  type="submit"
                  disabled={adding || !newTitle.trim()}
                  className="bg-orange-600 text-black px-6 font-black uppercase text-xs hover:bg-white transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {adding
                    ? <Loader2 size={14} className="animate-spin" />
                    : <><Plus size={14} /> Execute</>
                  }
                </button>
              </form>
            </section>

            {/* LISTA DE TASKS */}
            <section className="space-y-1">
              {tasks.length === 0 ? (
                <div className="border border-dashed border-zinc-900 p-10 text-center space-y-2">
                  <p className="text-zinc-700 text-xs uppercase font-bold">
                    {'>'} No_Tasks_Found — initialize first task above.
                  </p>
                </div>
              ) : (
                <>
                  {/* PENDING */}
                  {tasks.filter(t => !t.completed).length > 0 && (
                    <div className="space-y-1 mb-4">
                      <p className="text-[9px] text-zinc-700 uppercase font-bold tracking-widest px-1 pb-1">
                        — Pending_Queue ({pending})
                      </p>
                      {tasks.filter(t => !t.completed).map(task => (
                        <TaskRow
                          key={task.id}
                          task={task}
                          isLoading={loadingTaskId === task.id}
                          isEditing={editingId === task.id}
                          editingTitle={editingTitle}
                          onEditTitleChange={setEditingTitle}
                          onToggle={() => handleToggle(task)}
                          onDelete={() => handleDelete(task.id)}
                          onStartEdit={() => startEdit(task)}
                          onConfirmEdit={() => confirmEdit(task.id)}
                          onCancelEdit={() => setEditingId(null)}
                        />
                      ))}
                    </div>
                  )}

                  {/* COMPLETED */}
                  {tasks.filter(t => t.completed).length > 0 && (
                    <div className="space-y-1">
                      <p className="text-[9px] text-zinc-700 uppercase font-bold tracking-widest px-1 pb-1">
                        — Completed_Log ({done})
                      </p>
                      {tasks.filter(t => t.completed).map(task => (
                        <TaskRow
                          key={task.id}
                          task={task}
                          isLoading={loadingTaskId === task.id}
                          isEditing={editingId === task.id}
                          editingTitle={editingTitle}
                          onEditTitleChange={setEditingTitle}
                          onToggle={() => handleToggle(task)}
                          onDelete={() => handleDelete(task.id)}
                          onStartEdit={() => startEdit(task)}
                          onConfirmEdit={() => confirmEdit(task.id)}
                          onCancelEdit={() => setEditingId(null)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

function TaskRow({
  task, isLoading, isEditing, editingTitle,
  onEditTitleChange, onToggle, onDelete,
  onStartEdit, onConfirmEdit, onCancelEdit
}) {
  return (
    <div
      className={`group flex items-center gap-3 p-3 border transition-all text-sm
        ${task.completed
          ? 'border-zinc-900 bg-black/20 opacity-60 hover:opacity-80'
          : 'border-zinc-900 bg-black hover:border-zinc-700'
        }`}
    >
      {/* TOGGLE CHECKBOX */}
      <button
        onClick={onToggle}
        disabled={isLoading}
        className="shrink-0 text-zinc-600 hover:text-orange-500 transition disabled:opacity-40"
      >
        {isLoading
          ? <Loader2 size={16} className="animate-spin text-orange-600" />
          : task.completed
            ? <CheckCircle2 size={16} className="text-green-600" />
            : <Circle size={16} />
        }
      </button>

      {/* TÍTULO / EDIT INLINE */}
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            autoFocus
            value={editingTitle}
            onChange={e => onEditTitleChange(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') onConfirmEdit()
              if (e.key === 'Escape') onCancelEdit()
            }}
            className="flex-1 bg-zinc-900 border border-orange-600 px-2 py-1 text-white outline-none text-sm"
          />
          <button onClick={onConfirmEdit} className="text-green-500 hover:text-green-400">
            <Check size={14} />
          </button>
          <button onClick={onCancelEdit} className="text-zinc-600 hover:text-white">
            <X size={14} />
          </button>
        </div>
      ) : (
        <span
          className={`flex-1 font-bold ${task.completed ? 'line-through text-zinc-600' : 'text-white'}`}
        >
          {task.title}
        </span>
      )}

      {/* ACTIONS — visíveis no hover */}
      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onStartEdit}
            disabled={isLoading}
            className="p-1.5 text-zinc-600 hover:text-white hover:bg-zinc-800 transition"
            title="Edit"
          >
            <Pencil size={12} />
          </button>
          <button
            onClick={onDelete}
            disabled={isLoading}
            className="p-1.5 text-zinc-600 hover:text-red-500 hover:bg-red-950/20 transition"
            title="Delete"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}
    </div>
  )
}