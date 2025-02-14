import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: { },
    create: {
        email: 'alice@prisma.io',
        username: 'Alice',
        password: await hash('password', 10),
      }
    })

  await prisma.user.create({
    data: {
      email: 'bob@prisma.io',
      username: 'Bob',
      password: await hash('password', 10),
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
