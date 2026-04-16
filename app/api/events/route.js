import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  if (slug) {
    const event = await prisma.event.findUnique({
      where: { slug },
      include: { availability: true },
    })
    if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(event)
  }
  const events = await prisma.event.findMany({ include: { availability: true }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(events)
}

export async function POST(req) {
  const { title, description, duration, slug, availability } = await req.json()
  if (!title || !slug || !duration) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const exists = await prisma.event.findUnique({ where: { slug } })
  if (exists) return NextResponse.json({ error: 'Slug already taken' }, { status: 400 })
  const event = await prisma.event.create({
    data: {
      title, description, duration, slug,
      availability: { create: availability || [] },
    },
    include: { availability: true },
  })
  return NextResponse.json(event, { status: 201 })
}
