export  interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isadmin: string;
  role?:string
  refreshToken?:string
}

export interface JwtPayload {
  id:string
  email?:string
  exp?:number
}