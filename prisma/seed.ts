// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A classic American novel about the Jazz Age and the American Dream.',
    imageUrl: 'https://covers.openlibrary.org/b/id/8225261-L.jpg',
    price: 15.99,
    rentalPrice: 3.99,
    category: 'Classic',
    isbn: '9780743273565',
    stock: 10
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A gripping tale of racial injustice and childhood innocence.',
    imageUrl: 'https://covers.openlibrary.org/b/id/8226689-L.jpg',
    price: 14.99,
    rentalPrice: 3.49,
    category: 'Classic',
    isbn: '9780061120084',
    stock: 15
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    description: 'Epic science fiction novel set in a distant future.',
    imageUrl: 'https://covers.openlibrary.org/b/id/8225261-L.jpg',
    price: 18.99,
    rentalPrice: 4.99,
    category: 'Science Fiction',
    isbn: '9780441172719',
    stock: 8
  },
  {
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    description: 'A captivating novel about a reclusive Hollywood icon.',
    imageUrl: 'https://covers.openlibrary.org/b/id/12583254-L.jpg',
    price: 16.99,
    rentalPrice: 4.49,
    category: 'Contemporary Fiction',
    isbn: '9781501161933',
    stock: 12
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'An easy and proven way to build good habits and break bad ones.',
    imageUrl: 'https://covers.openlibrary.org/b/id/8509858-L.jpg',
    price: 18.99,
    rentalPrice: 4.99,
    category: 'Self-Help',
    isbn: '9780735211292',
    stock: 20
  },
  {
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    description: 'A mystery novel about four unlikely friends investigating cold cases.',
    imageUrl: 'https://covers.openlibrary.org/b/id/10523110-L.jpg',
    price: 15.99,
    rentalPrice: 3.99,
    category: 'Mystery',
    isbn: '9781984880949',
    stock: 7
  }
]

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.rental.deleteMany()
  await prisma.purchase.deleteMany()
  await prisma.book.deleteMany()

  // Create books
  for (const book of sampleBooks) {
    await prisma.book.create({
      data: book
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// package.json scripts to add:
/*
{
  "scripts": {
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset && npm run db:seed",
    "db:push": "prisma db push",
    "db:generate": "prisma generate"
  }
}
*/