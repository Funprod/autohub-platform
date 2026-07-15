// eslint-disable-next-line boundaries/dependencies
import { User } from '@/entities/user/model/types'
import bcrypt from 'bcryptjs'

interface StoredUser extends User {
    passwordHash: string
}

interface PasswordResetEntry {
    code: string
    expiresAt: number
}

const users: StoredUser[] = [
    {
        id: '1',
        email: 'manager@autohub.dev',
        firstName: 'Иван',
        surname: 'Петров',
        role: 'manager',
        dealershipCenterId: 'dc-1',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
]

export function findUserByEmail(email: string) {
    return users.find((u) => u.email === email) ?? null
}

export function findUserById(id: string) {
    return users.find((u) => u.id === id) ?? null
}

export function createUser(data: Omit<StoredUser, 'id'>) {
    const newUser: StoredUser = { ...data, id: String(users.length + 1) }
    users.push(newUser)
    return newUser
}

export function toPublicUser(u: StoredUser): User {
    const { passwordHash: _passwordHash, ...publicUser } = u
    return publicUser
}

const passwordResetCodes = new Map<string, PasswordResetEntry>() //

export function createPasswordResetCode(email: string): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = Date.now() + 10 * 60 * 1000
    passwordResetCodes.set(email, { code, expiresAt })
    return code
}

export function verifyPasswordResetCode(email: string, code: string): boolean {
    const entry = passwordResetCodes.get(email)
    if (!entry) return false
    if (Date.now() > entry.expiresAt) return false
    return entry.code === code
}

export function updateUserPassword(email: string, newPasswordHash: string) {
    const user = users.find((u) => u.email === email)
    if (!user) return false
    user.passwordHash = newPasswordHash
    passwordResetCodes.delete(email)
    return true
}
