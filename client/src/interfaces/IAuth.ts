export interface AuthState {
    user: string,
    token: string | null,
    isAuthenticated :boolean ,
    loading: boolean,
    error: string |null

}