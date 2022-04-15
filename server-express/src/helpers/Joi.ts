import { Wilder } from '../models/wilder.model'
import Joi, { ValidationResult } from 'joi'

export const createInputWilderDto = (inputDto: Wilder): ValidationResult => {
  return Joi.object({
    name: Joi.string().alphanum().min(2).max(254).required(),
    city: Joi.string().alphanum().min(2).max(254).required(),
    skills: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().min(1).max(254),
          votes: Joi.number().min(0).max(10)
        })
      )
      .required()
  }).validate(inputDto, { abortEarly: false })
}
export const updateInputWilderDto = (inputDto: Wilder, partial: boolean = true): ValidationResult => {
  const presence = partial ? 'optional' : 'required'
  return Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().alphanum().min(2).max(254).presence(presence),
    city: Joi.string().alphanum().min(2).max(254).presence(presence),
    skills: Joi.array()
      .items(
        Joi.object({
          _id: Joi.string().required(),
          title: Joi.string().min(1).max(254).presence(presence),
          votes: Joi.number().min(0).max(10).presence(presence)
        })
      )
      .presence(presence)
  }).validate(inputDto, { abortEarly: false })
}
