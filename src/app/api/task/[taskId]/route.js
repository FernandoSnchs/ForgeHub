import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// ATUALIZAR TASK
export async function PATCH(req, { params }) {
  const { taskId } = await params
  const body = await req.json()

  const { title, completed } = body

  if (!taskId) {
    return NextResponse.json(
      { error: "Task id é obrigatório" },
      { status: 400 }
    )
  }

  if (title === undefined && completed === undefined) {
    return NextResponse.json(
      { error: "Nada para atualizar" },
      { status: 400 }
    )
  }

  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed }),
      },
    })

    return NextResponse.json(task)
  } catch (err) {
    return NextResponse.json(
      { error: "Task não encontrada" },
      { status: 404 }
    )
  }
}

// DELETAR TASK
export async function DELETE(req, { params }) {
  const { taskId } = await params

  if (!taskId) {
    return NextResponse.json(
      { error: "Task id é obrigatório" },
      { status: 400 }
    )
  }

  try {
    await prisma.task.delete({
      where: { id: taskId },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Task não encontrada" },
      { status: 404 }
    )
  }
}