'use client'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/admin/dashboard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        if (Array.isArray(res)) {
          setData(res)
        } else {
          setError(res.error || 'erro desconhecido')
        }
      })
  }, [])

  if (error) {
    return <p>Erro: {error}</p>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      {data.map(user => (
        <div key={user.id} style={{ marginBottom: 20 }}>
          <h2>{user.email} ({user.role})</h2>

          {user.projects.map(project => (
            <div key={project.id} style={{ marginLeft: 20 }}>
              <h4>📁 {project.name}</h4>
              <ul>
                {project.task.map(task => (
                  <li key={task.id}>📝 {task.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}