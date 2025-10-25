export  interface User  {
    name: string;
    email: string;
    password?: string;
    isadmin: boolean;
    role?:"admin"| "seller" | "customer"
    refreshToken?:string
  }