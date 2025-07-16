export  interface User  {
    name: string;
    email: string;
    password?: string;
    isadmin: boolean;
    role?:string
    refreshToken?:string
  }