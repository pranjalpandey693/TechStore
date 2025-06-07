import type { User } from "./IUser"

export interface AuthState {
    user: User|null,
    isAuthenticated: boolean,
    isLoggingIn: boolean,
    isRegistering: boolean,
    isLoggingOut: boolean,
    isRefreshing: boolean,
    isVerifying: boolean,

    error: string | null,
   
}

export interface LoginCredentials {
    email:string,
    password:string
}

export interface RegisterCredentials{
     name:string,
     email:string,
     password:string

}