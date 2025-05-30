export interface AuthState {
    user: string|null,
    token: string | null,
    isAuthenticated :boolean ,
    loading: boolean,
    error: string |null

}