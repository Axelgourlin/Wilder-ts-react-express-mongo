import 'dotenv/config'
import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import morgan from 'morgan'

import { setupRoutes } from './routes/index'

const app = express()

// Connection URI
const uri = `mongodb://127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`

// Create a new MongoClient
const client = new MongoClient(uri)

const Init = async (): Promise<void> => {
  try {
    // Connect the client to the server
    await client.connect()
    // Establish and verify connection
    await client.db('admin').command({ ping: 1 })
    console.log('Connected successfully to server')
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }

  app.use(morgan('tiny'))
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(__dirname + '/public'))

  setupRoutes(app)

  const PORT = process.env.API_PORT || 4000
  app.listen(PORT, (): void => {
    console.log('Server is running on port : ' + PORT)
  })
}
Init().catch(console.dir)
