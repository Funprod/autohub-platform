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
        email: 'admin@autohub.dev',
        firstName: 'Сергей',
        surname: 'Волков',
        role: 'admin',
        dealershipCenterId: null,
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '2',
        email: 'analyst@autohub.dev',
        firstName: 'Ольга',
        surname: 'Соколова',
        role: 'analyst',
        dealershipCenterId: null,
        passwordHash: bcrypt.hashSync('password123', 10),
    },

    {
        id: '3',
        email: 'manager@autohub.dev',
        firstName: 'Иван',
        surname: 'Петров',
        role: 'manager',
        dealershipCenterId: 'dc-1',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '4',
        email: 'manager2@autohub.dev',
        firstName: 'Дмитрий',
        surname: 'Кузнецов',
        role: 'manager',
        dealershipCenterId: 'dc-1',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '5',
        email: 'manager3@autohub.dev',
        firstName: 'Анна',
        surname: 'Морозова',
        role: 'manager',
        dealershipCenterId: 'dc-2',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '6',
        email: 'manager4@autohub.dev',
        firstName: 'Павел',
        surname: 'Новиков',
        role: 'manager',
        dealershipCenterId: 'dc-3',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '7',
        email: 'manager5@autohub.dev',
        firstName: 'Елена',
        surname: 'Фёдорова',
        role: 'manager',
        dealershipCenterId: 'dc-4',
        passwordHash: bcrypt.hashSync('password123', 10),
    },

    {
        id: '8',
        email: 'head@autohub.dev',
        firstName: 'Виктор',
        surname: 'Григорьев',
        role: 'dealership-head',
        dealershipCenterId: 'dc-1',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '9',
        email: 'head2@autohub.dev',
        firstName: 'Наталья',
        surname: 'Егорова',
        role: 'dealership-head',
        dealershipCenterId: 'dc-2',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '10',
        email: 'head3@autohub.dev',
        firstName: 'Алексей',
        surname: 'Романов',
        role: 'dealership-head',
        dealershipCenterId: 'dc-3',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '11',
        email: 'head4@autohub.dev',
        firstName: 'Мария',
        surname: 'Лебедева',
        role: 'dealership-head',
        dealershipCenterId: 'dc-4',
        passwordHash: bcrypt.hashSync('password123', 10),
    },

    {
        id: '12',
        email: 'operator@autohub.dev',
        firstName: 'Кирилл',
        surname: 'Козлов',
        role: 'operator',
        dealershipCenterId: 'cc-1',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '13',
        email: 'operator2@autohub.dev',
        firstName: 'Татьяна',
        surname: 'Никитина',
        role: 'operator',
        dealershipCenterId: 'cc-1',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '14',
        email: 'operator3@autohub.dev',
        firstName: 'Роман',
        surname: 'Захаров',
        role: 'operator',
        dealershipCenterId: 'cc-1',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '15',
        email: 'operator4@autohub.dev',
        firstName: 'Юлия',
        surname: 'Павлова',
        role: 'operator',
        dealershipCenterId: 'cc-2',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '16',
        email: 'operator5@autohub.dev',
        firstName: 'Артём',
        surname: 'Семёнов',
        role: 'operator',
        dealershipCenterId: 'cc-2',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '17',
        email: 'operator6@autohub.dev',
        firstName: 'Светлана',
        surname: 'Голубева',
        role: 'operator',
        dealershipCenterId: 'cc-2',
        passwordHash: bcrypt.hashSync('password123', 10),
    },

    {
        id: '18',
        email: 'supervisor@autohub.dev',
        firstName: 'Максим',
        surname: 'Виноградов',
        role: 'supervisor',
        dealershipCenterId: 'cc-1',
        passwordHash: bcrypt.hashSync('password123', 10),
    },
    {
        id: '19',
        email: 'supervisor2@autohub.dev',
        firstName: 'Ирина',
        surname: 'Богданова',
        role: 'supervisor',
        dealershipCenterId: 'cc-2',
        passwordHash: bcrypt.hashSync('password123', 10),
    },

    {
        id: '20',
        email: 'demo@autohub.dev',
        firstName: 'Тест',
        surname: 'Тестов',
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

export function getAllUsers(): User[] {
    return users.map(toPublicUser)
}
