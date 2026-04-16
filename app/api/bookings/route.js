import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: { event: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(bookings)
}

export async function POST(req) {
  const { eventId, name, email, date, startTime, endTime } = await req.json()
  if (!eventId || !name || !email || !date || !startTime || !endTime)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const conflict = await prisma.booking.findFirst({
    where: { eventId, date, startTime, cancelled: false },
  })
  if (conflict) return NextResponse.json({ error: 'Slot already booked' }, { status: 409 })

  const booking = await prisma.booking.create({ data: { eventId, name, email, date, startTime, endTime } })
  return NextResponse.json(booking, { status: 201 })
}
