type Company = {
    name: string
    address: string
    phone?: string
}

type UserId = {
    id: number | string
}

type UserWithBirthdate = {
    birthdate: Date
}

export type User = {
    readonly name: string
    age: number
    email?: string
    role: 'admin' | 'editor' | 'user' // literal type
    company?: Company
}

export type UserEntity = User & UserId & UserWithBirthdate; // Intersection types

export type Configuration = {
    readonly apiKey: string
    readonly theme: 'light' | 'dark'
}