const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const event = await prisma.event.create({
    data: {
      title: '30 Min Meeting',
      description: 'A quick 30-minute call.',
      duration: 30,
      slug: '30-min-meeting',
      availability: {
        create: [
          { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
          { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' },
          { dayOfWeek: 3, startTime: '09:00', endTime: '17:00' },
          { dayOfWeek: 4, startTime: '09:00', endTime: '17:00' },
          { dayOfWeek: 5, startTime: '09:00', endTime: '17:00' },
        ],
      },
    },
  })
  console.log('Seeded event:', event.slug)
}

main().catch(console.error).finally(() => prisma.$disconnect())
