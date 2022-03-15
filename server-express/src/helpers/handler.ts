import { NextFunction, Request, RequestHandler, Response } from 'express'

const createError = require('http-errors')

function asyncHandler(handler: Function): RequestHandler {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await handler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

function valideBody(req: Request, _: Response, next: NextFunction): void {
  if (Object.keys(req.body).length === 0) {
    throw createError(400, 'Body can not be empty!')
  }
  next()
}

export { asyncHandler, valideBody }
