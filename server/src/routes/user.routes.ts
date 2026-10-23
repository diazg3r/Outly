
import { Router } from 'express'
import { getUsers, addUser } from '../controllers/user.controller.js'

const router = Router()

// GET /api/users
router.get('/', getUsers)

// POST /api/users
router.post('/', addUser)

export default router
