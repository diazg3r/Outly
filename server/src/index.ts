
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRoutes from './routes/user.routes.js'

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

// User routes
app.use('/api/users', userRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(`Outly API running at http://localhost:${PORT}`)
})
