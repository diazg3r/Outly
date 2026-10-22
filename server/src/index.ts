
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { prisma } from './lib/prisma.js'
import { Prisma } from './generated/prisma/client.js'

const app = express()
const PORT = Number(process.env.PORT) || 3000

// Middleware
app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json())

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Outly API is running'
  })
})

// GET - Retrieve all users from PostgreSQL
app.get('/api/users', async (_req, res) => {
  try {
    const users = await prisma.user.findMany()

    return res.status(200).json(users)
  } catch (error) {
    console.error('Error fetching users:', error)

    return res.status(500).json({
      error: 'Failed to fetch users'
    })
  }
})

// POST - Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof email !== 'string' ||
      !email.trim()
    ) {
      return res.status(400).json({
        error: 'Name and email are required'
      })
    }

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim()
      }
    })

    return res.status(201).json(user)

  } catch (error) {
    // Handle duplicate email errors
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return res.status(409).json({
        error: 'A user with this email already exists'
      })
    }

    // Handle unexpected errors
    console.error('Error creating user:', error)

    return res.status(500).json({
      error: 'Failed to create user'
    })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Outly API running at http://localhost:${PORT}`)
})
