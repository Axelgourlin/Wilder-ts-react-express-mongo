import { Application, NextFunction, Request, Response } from 'express'

import wildersRouter from './wilders.routes'

export const setupRoutes = (app: Application): void => {
  app.use('/api/v1/wilders', wildersRouter)
  app.use(
    (error: any, req: Request, res: Response, next: NextFunction): Response => {
      if (!error.status) {
        return res.status(500).json({ message: 'Error server.' })
      }
      return res
        .status(error.status)
        .json({ message: error.message, stack: error.stack })
    }
  )
  app.use((_: Request, res: Response): Response => {
    return res.status(404).json({ message: 'Route not found' })
  })
}
