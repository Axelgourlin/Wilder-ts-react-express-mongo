import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'

import { setupRoutes } from './routes/index'

const app = express()

const Init = async (): Promise<void> => {
  try {
    // Init connection to mongodb
    await mongoose.connect(
      `mongodb://127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      { autoIndex: true }
    )
    console.log('Connected to database !')
  } catch (error) {
    console.log(error)
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
Init()
