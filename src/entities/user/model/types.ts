export type Role = 'manager' | 'operator' | 'admin' | 'supervisor' | 'analyst'

export interface User {
    id: string
    email: string
    firstName: string
    surname: string
    role: Role
    dealershipCenterId: string | null
}

export interface UserState {
    user: User | null
    isAuthenticated: boolean
}
