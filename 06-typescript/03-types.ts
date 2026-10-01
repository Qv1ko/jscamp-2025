type Company = {
    name: string
    address: string
    phone?: string

}

export type User = {
    readonly name: string
    age: number
    email?: string
    role: 'admin' | 'editor' | 'user' // literal type
    company?: Company
}

export type Configuration = {
    readonly apiKey: string
    readonly theme: 'light' | 'dark'
}