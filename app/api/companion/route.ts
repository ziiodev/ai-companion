import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const {
      src,
      name,
      description,
      instruction,
      seed,
      categoryId
    } = body

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!src || !name || !description || !instruction || !seed || !categoryId) {
      return new NextResponse('Missing required field', { status: 400 })
    }

    // TODO: check for subscription

    const companion = await prismadb.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instruction,
        seed
      }
    })

    return NextResponse.json(companion)
  } catch (error) {
    console.log('[COMPANION_POST]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}