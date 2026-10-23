
import type { Request, Response } from 'express'
import { Prisma } from '../generated/prisma/client.js'
import { getAllUsers, createUser } from '../services/user.service.js'

// Controller: Retrieve all users
export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await getAllUsers()

    return res.status(200).json(users)
  } catch (error) {
    console.error('Error fetching users:', error)

    return res.status(500).json({
      error: 'Failed to fetch users'
    })
  }
}

// Controller: Create a new user
export async function addUser(req: Request, res: Response) {
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

    const user = await createUser(name.trim(), email.trim())

    return res.status(201).json(user)
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return res.status(409).json({
        error: 'A user with this email already exists'
      })
    }

    console.error('Error creating user:', error)

    return res.status(500).json({
      error: 'Failed to create user'
    })
  }
}
