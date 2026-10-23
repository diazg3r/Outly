
import { prisma } from '../lib/prisma.js'

// Retrieve all users
export async function getAllUsers() {
  return prisma.user.findMany()
}

// Create a new user
export async function createUser(name: string, email: string) {
  return prisma.user.create({
    data: {
      name,
      email
    }
  })
}
