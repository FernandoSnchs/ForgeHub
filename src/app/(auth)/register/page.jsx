'use client'
import { useState } from 'react'
import { Terminal, ChevronRight, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMsg('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setMsg(data.error || 'Erro ao registrar')
        return
      }

      setMsg('Usuário registrado com sucesso')
      setEmail('')
      setPassword('')
    } catch (err) {
      setMsg('Erro de conexão com a API')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono p-4">
      {/* FRAME DO FORMULÁRIO */}
      <div className="w-full max-w-sm border border-zinc-900 bg-black relative overflow-hidden">
        
        {/* HEADER DO BOX */}
        <div className="border-b border-zinc-900 p-4 flex justify-between items-center bg-zinc-900/10">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-orange-600" />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              Auth.Initialize_User()
            </span>
          </div>
          <div className="flex gap-1">
             <div className="w-2 h-2 bg-zinc-800"></div>
             <div className="w-2 h-2 bg-zinc-800"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-4">
            New_Repository_Access
          </h2>

          {/* MENSAGEM DE STATUS / FEEDBACK */}
          {msg && (
            <div className={`text-[11px] p-3 border font-bold uppercase tracking-tighter ${
              msg.includes('sucesso') 
                ? 'bg-green-950/20 border-green-900 text-green-500' 
                : 'bg-red-950/20 border-red-900 text-red-500'
            }`}>
              {">"} {msg}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Email_Addr</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
                className="bg-zinc-900 border border-zinc-800 p-3 text-white outline-none focus:border-orange-600 transition-all placeholder:text-zinc-700"
                placeholder="user@forgehub.sys"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Password_Key</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
                className="bg-zinc-900 border border-zinc-800 p-3 text-white outline-none focus:border-orange-600 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-600 text-black font-black py-4 uppercase text-sm hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>Execute_Registration <ChevronRight size={18} /></>
            )}
          </button>

          <p className="text-[10px] text-zinc-700 text-center uppercase font-bold pt-4">
            Já possui acesso? <Link href="/login" className="text-orange-900 hover:text-orange-500 underline underline-offset-4 transition">Auth.Login()</Link>
          </p>
        </form>
        
        {/* FOOTER DO BOX */}
        <div className="h-1 bg-zinc-900">
           <div className={`h-full bg-orange-600 transition-all duration-1000 ${loading ? 'w-full' : 'w-0'}`}></div>
        </div>
      </div>
    </div>
  )
}
