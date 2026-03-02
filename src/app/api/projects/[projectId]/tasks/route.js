import { prisma } from "@/lib/prisma"
import { v4 as uuidv4 } from "uuid"

export async function POST(req, { params }) {
  const { projectId } = await params
  const { title } = await req.json()

  if (!title) {
    return Response.json(
      { error: "Título é obrigatório" },
      { status: 400 }
    )
  }

  const task = await prisma.task.create({
    data: {
      id: uuidv4(),
      title,
      project: {
        connect: {
          id: projectId
        }
      }
    }
  })

  return Response.json(task, { status: 201 })
}