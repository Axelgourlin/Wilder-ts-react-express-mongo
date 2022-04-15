import { Request, Response } from 'express'
import createError from 'http-errors'
import  {WilderModel}  from '../models/wilder.model'
import {createInputWilderDto, updateInputWilderDto } from '../helpers/Joi'
import ImageModel, { IImage } from '../models/Image.model'

import fs from'fs';
import path from 'path';

const WilderController = {
  create: async (req: Request, res: Response) => {
    await WilderModel.init()
    const inputDto = req.body
    const validationResult = createInputWilderDto(inputDto)
    if (validationResult.error) {
      throw createError(400, 'Body does not have a correct format.')
    }
    const wilder = new WilderModel({ ...inputDto })

    try {
      const result = await wilder.save()
      return res.status(201).json({ success: true, result: result })
    } catch (error: any) {
      if(error.code === 11000) {
        throw createError(409, `Name '${inputDto.name}' already use.`)
      }
      throw error
  }
},
findOneById: async (req: Request, res: Response) => {
  const { id } = req.params

  const wilder = await WilderModel.findById(id)
  if (!wilder) {
    throw createError(404, `Wilder with ID '${id}' not found.`)
  } else {
    return res.status(200).json({ success: true, result: wilder })
  }
},

findAll: async (_: Request, res: Response) => {
  const wilders = await WilderModel.find()
  if (!wilders) {
    throw createError(404, `Wilders not found.`)
  } else {
    return res.status(200).json({ success: true, result: wilders })
  }
},

updatePartial: async (req: Request, res: Response) => {
  const { id } = req.params
  const inputDto = req.body
  console.log("🚀 ~ updatePartial: ~ inputDto", inputDto);
  const validationResult = updateInputWilderDto(inputDto)
  if (validationResult.error) {
    throw createError(400, 'Body does not have a correct format.')
  }
  try {
    const wilder = await WilderModel.findByIdAndUpdate({ _id: id }, inputDto, {
      new: true
    })
    return res.status(200).json({ success: true, result: wilder })
  } catch (error: any) {
    if (error.path === '_id') {
      throw createError(404, `Wilder with ID '${id}' not found.`)
    }
    throw error
  }
},

update: async (req: Request, res: Response) => {
  const { id } = req.params
  const inputDto = req.body
  let validationError = null
  validationError = updateInputWilderDto(inputDto, false)
  if (validationError) {
    throw createError(400, 'Body does not have a correct format.')
  }

  const wilder: any = await WilderModel.findById(id)
  if (!wilder) {
    throw createError(404, `Wilder with ID '${id}' not found.`)
  } else {
    wilder.name = inputDto.name
    wilder.city = inputDto.city
    wilder.skills = inputDto.skills
    const result = await wilder.save(wilder)
    return res.status(200).json({ success: true, result: result })
  }
},

destroy: async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await WilderModel.deleteOne({ _id: id })
    return res.status(200).json({ success: true, result: result })
  } catch (error: any) {
    if (error.path === '_id') {
      throw createError(404, `Wilder with ID '${id}' not found.`)
    }
    throw error
  }
},

uploadImg: async (req: Request, res: Response) => {
  if(!req.file) {
    throw createError(400, `No file received`)
  } else {
    console.log('File received', req.file);

    const imageObject: IImage = {
      name: req.body.name,
      description: req.body.description,
      img: {
        data: fs.readFileSync(path.join(process.cwd(), 'images', req.file.filename)),
        contentType: 'image/png'
      }
    }

    ImageModel.create(imageObject, (err: any, item) =>{
      if(err) {
        console.log('Error image model.');
      } else {
        return res.status(200).json({success: true, result: {_id: item._id}})
      }
    })

  } 
    
    
  }
}

export default WilderController