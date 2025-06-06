export interface AuthState {
    user: string,
    isAuthenticated: boolean,
    isLoggingIn: boolean,
    isRegistering: boolean,
    isLoggingOut: boolean,
    isRefreshing: boolean,
    isVerifying: boolean,
    error: string | null,
    lastLoginTime: string,
    sessionExpiry: string,
    rememberMe: boolean
}