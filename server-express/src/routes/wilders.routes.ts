const wildersRouter = require('express').Router()
import WilderController from '../controllers/wilders.controller'
import { asyncHandler, valideBody } from '../helpers/handler'

wildersRouter.get('/', asyncHandler(WilderController.findAll))
wildersRouter.get('/:id', asyncHandler(WilderController.findOneById))
wildersRouter.post('/', valideBody, asyncHandler(WilderController.create))
wildersRouter.put('/:id', valideBody, asyncHandler(WilderController.update))
wildersRouter.patch(
  '/:id',
  valideBody,
  asyncHandler(WilderController.updatePartial)
)
wildersRouter.delete('/:id', asyncHandler(WilderController.destroy))

export default wildersRouter
