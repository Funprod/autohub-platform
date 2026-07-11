// eslint-disable-next-line boundaries/dependencies
import { User } from '@/entities/user/model/types'
import bcrypt from 'bcryptjs'

interface StoredUser extends User {
    passwordHash: string
}

// In-memory "БД" — обнуляется при перезапуске dev-сервера, этого достаточно для учебных целей
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
