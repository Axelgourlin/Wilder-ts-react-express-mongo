import { Schema, model } from 'mongoose'

export interface IImage {
  name: string;
  description: string;
  img: {
    data: Buffer,
    contentType: string
  };
}

// prettier-ignore
var imageSchema = new Schema<IImage>({
  name: String,
  description: String,
  img: {
    data: Buffer,
    contentType: String
  }
})

// prettier-ignore
export default model<IImage>('Image', imageSchema)
