import { prop, getModelForClass } from '@typegoose/typegoose';

export class Skill {
  @prop({ required: true })
  title?: string;

  @prop({ required: true })
  votes?: number;
}
export class Wilder {
  @prop()
  public name!: string;

  @prop()
  city!: string;

  @prop({ type: () => [Skill] })
  public skills!: Skill[];
}

export const WilderModel = getModelForClass(Wilder); 