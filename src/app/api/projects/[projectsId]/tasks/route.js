import { prisma } from "@/lib/prisma"
import { v4 as uuidv4 } from "uuid"
import { NextResponse } from "next/server"

export async function POST(req, { params }) {
  try {
    // 1. Resolve o params (Next 15)
    const resolvedParams = await params; 
    const { projectsId } = resolvedParams;

    const { title } = await req.json()

    if (!title) {
      return NextResponse.json({ error: "Título é obrigatório" }, { status: 400 })
    }

    // 2. Cria a task usando os nomes EXATOS do seu schema
    const task = await prisma.task.create({
      data: {
        id: uuidv4(),
        title: title,
        completed: false, 
        // Aqui está a correção: o campo se chama 'project_id' no seu model 'task'
        // E a relação se chama 'projects' (plural)
        projects: {
          connect: {
            id: projectsId
          }
        }
      }
    })

    return NextResponse.json(task, { status: 201 })
  } catch (err) {
    console.error("ERRO NO PRISMA:", err)
    return NextResponse.json(
      { error: "Erro ao criar task", details: err.message }, 
      { status: 500 }
    )
  }
}