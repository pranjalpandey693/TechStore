export  interface User  {
    name: string;
    email: string;
    password?: string;
    isadmin: string;
    role?:string
    refreshToken?:string
  }