import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

function generateSlots(startTime, endTime, duration) {
  const slots = []
  const [sh, sm] = startTime.split(':').map(Number)
  const [eh, em] = endTime.split(':').map(Number)
  let start = sh * 60 + sm
  const end = eh * 60 + em
  while (start + duration <= end) {
    const s = `${String(Math.floor(start / 60)).padStart(2, '0')}:${String(start % 60).padStart(2, '0')}`
    const e = `${String(Math.floor((start + duration) / 60)).padStart(2, '0')}:${String((start + duration) % 60).padStart(2, '0')}`
    slots.push({ startTime: s, endTime: e })
    start += duration
  }
  return slots
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const eventId = searchParams.get('eventId')
  const date = searchParams.get('date')
  if (!eventId || !date) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { availability: true },
  })
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 })

  const dayOfWeek = new Date(date + 'T00:00:00').getDay()
  const avail = event.availability.filter(a => a.dayOfWeek === dayOfWeek)
  if (!avail.length) return NextResponse.json([])

  let allSlots = []
  for (const a of avail) {
    allSlots = allSlots.concat(generateSlots(a.startTime, a.endTime, event.duration))
  }

  const booked = await prisma.booking.findMany({
    where: { eventId, date, cancelled: false },
    select: { startTime: true },
  })
  const bookedTimes = new Set(booked.map(b => b.startTime))
  const available = allSlots.filter(s => !bookedTimes.has(s.startTime))

  return NextResponse.json(available)
}
