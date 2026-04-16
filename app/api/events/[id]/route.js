import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(req, { params }) {
  const { id } = await params
  await prisma.event.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
