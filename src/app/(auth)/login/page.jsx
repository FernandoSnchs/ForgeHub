'use client'
import { useState } from 'react'
import { Lock, ChevronRight, Activity, Terminal } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function handleLogin(e) {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        window.location.href = '/dashboard'
      } else {
        setError(data.error || 'Erro ao logar')
      }
    } catch (err) {
      setError('Erro de conexão com o servidor')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono p-4">
      {/* CONTAINER PRINCIPAL */}
      <div className="w-full max-w-sm border border-zinc-900 bg-black shadow-2xl relative">
        
        {/* TOP STATUS BAR */}
        <div className="border-b border-zinc-900 p-3 flex justify-between items-center bg-zinc-900/10">
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-orange-600 animate-pulse" />
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">
              System.Access_Portal
            </span>
          </div>
          <span className="text-[9px] text-zinc-800 font-bold">NODE_01_ACTIVE</span>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <header className="mb-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
              Verify_Credentials
            </h2>
            <p className="text-[10px] text-zinc-600 uppercase font-bold mt-1">
              Insira sua chave de acesso para sincronizar.
            </p>
          </header>

          {/* MENSAGEM DE ERRO CRÍTICO */}
          {error && (
            <div className="bg-red-950/20 border border-red-900 p-3 flex items-start gap-3">
              <Terminal size={14} className="text-red-500 mt-0.5" />
              <p className="text-[11px] text-red-500 font-bold uppercase leading-tight">
                ERROR_MESSAGE: <br /> {error}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Identify_Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white outline-none focus:border-orange-600 transition-all placeholder:text-zinc-800"
                placeholder="root@forgehub.sys"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Access_Code</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white outline-none focus:border-orange-600 transition-all"
                  placeholder="••••••••"
                />
                <Lock size={14} className="absolute right-3 top-3.5 text-zinc-800" />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-black font-black py-4 uppercase text-sm hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-3 group"
          >
            Authenticate_Session <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <footer className="pt-4 border-t border-zinc-900 mt-6 flex justify-between items-center">
            <Link href="/register" className="text-[10px] text-zinc-600 hover:text-orange-500 uppercase font-bold transition">
              [ Create_New_Access ]
            </Link>
            <span className="text-[10px] text-zinc-800 font-bold italic">FORGE_v1.0</span>
          </footer>
        </form>

        {/* EFEITO DE BORDA LARANJA SUTIL */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-600 to-transparent opacity-30"></div>
      </div>
    </div>
  )
}
