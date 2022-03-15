import { Request, Response } from 'express'
import createError from 'http-errors'
import { IWilder, Wilder } from '../models/wilder.model'
import { validateInputWilderDto } from '../helpers/Joi'

const create = async (req: Request, res: Response) => {
  await Wilder.init()
  const inputDto: IWilder = req.body
  console.log('🚀 ~ create ~ req.body', req.body)
  // let validationError = null
  // validationError = validateInputWilderDto(inputDto)
  // if (validationError) {
  //   throw createError(400, 'Body does not have a correct format.')
  // }
  const wilder = Wilder.build({ ...inputDto })

  try {
    const result = await wilder.save()
    return res.status(201).json({ success: true, result: result })
  } catch (error: any) {
    if(error.code === 11000) {
      throw createError(409, `Name '${inputDto.name}' already use.`)
    }
    throw error
  }
}

const findOneById = async (req: Request, res: Response) => {
  const { id } = req.params

  const wilder = await Wilder.findById(id)
  if (!wilder) {
    throw createError(404, `Wilder with ID '${id}' not found.`)
  } else {
    return res.status(200).json({ success: true, result: wilder })
  }
}

const findAll = async (_: Request, res: Response) => {
  const wilders = await Wilder.find()
  if (!wilders) {
    throw createError(404, `Wilders not found.`)
  } else {
    return res.status(200).json({ success: true, result: wilders })
  }
}

const updatePartial = async (req: Request, res: Response) => {
  const { id } = req.params
  const inputDto: IWilder = req.body
  let validationError = null
  validationError = validateInputWilderDto(inputDto, false)
  if (validationError) {
    throw createError(400, 'Body does not have a correct format.')
  }
  try {
    const wilder = await Wilder.findByIdAndUpdate({ _id: id }, inputDto, {
      new: true
    })
    return res.status(200).json({ success: true, result: wilder })
  } catch (error: any) {
    if (error.path === '_id') {
      throw createError(404, `Wilder with ID '${id}' not found.`)
    }
    throw error
  }
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params
  const inputDto: IWilder = req.body
  let validationError = null
  validationError = validateInputWilderDto(inputDto, false)
  if (validationError) {
    throw createError(400, 'Body does not have a correct format.')
  }

  const wilder: any = await Wilder.findById(id)
  if (!wilder) {
    throw createError(404, `Wilder with ID '${id}' not found.`)
  } else {
    wilder.name = inputDto.name
    wilder.city = inputDto.city
    wilder.skills = inputDto.skills
    const result = await wilder.save(wilder)
    return res.status(200).json({ success: true, result: result })
  }
}

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await Wilder.deleteOne({ _id: id })
    return res.status(200).json({ success: true, result: result })
  } catch (error: any) {
    if (error.path === '_id') {
      throw createError(404, `Wilder with ID '${id}' not found.`)
    }
    throw error
  }
}

export default {
  create,
  findAll,
  findOneById,
  updatePartial,
  update,
  destroy
}
