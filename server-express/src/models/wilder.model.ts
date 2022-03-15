import mongoose from 'mongoose'

const Schema = mongoose.Schema

type Skill = { title: string, votes: number }

interface IWilder {
  name: string;
  city: string;
  skills: Skill[];
}


interface WilderDoc extends mongoose.Document {
  name: string;
  city: string;
  skills: Skill[];
}

interface WilderModelInterface extends mongoose.Model<WilderDoc> {
  build(attr: IWilder): WilderDoc;
}

const WilderSchema = new Schema({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }]
})

WilderSchema.statics.build = (attr: IWilder) => {
  return new Wilder(attr)
}

const Wilder = mongoose.model<WilderDoc, WilderModelInterface>('wilder', WilderSchema)

export { Wilder, IWilder }
