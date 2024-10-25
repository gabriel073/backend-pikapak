const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const postEmail = async (email) => {
  const exists = await prisma.newsLetter.findUnique({ where: { email } })
  if (exists) {
    throw Error('Existing Email')
  }
  await prisma.newsLetter.create({ data: { email } })
  await prisma.$disconnect()
}

module.exports = { postEmail }
