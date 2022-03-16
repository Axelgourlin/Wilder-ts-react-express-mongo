export interface IError {
  message: string;
  status: boolean;
}

export interface ISkill {
  title: string;
  votes: number;
}

export interface IWilder {
  _id: string;
  name: string;
  city: string;
  skills: ISkill[];
}
