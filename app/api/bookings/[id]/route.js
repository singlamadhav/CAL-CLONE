import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(req, { params }) {
  const { id } = await params
  const booking = await prisma.booking.update({ where: { id }, data: { cancelled: true } })
  return NextResponse.json(booking)
}
