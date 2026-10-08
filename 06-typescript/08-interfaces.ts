// Interfaces en TypeScript

interface Persona {
    readonly name: string
    readonly age: number
}

interface Identificable {
    id: `user-${number}`
}

interface User extends Persona, Identificable {
    email?: string
    role: 'admin' | 'editor' | 'user' // literal type
    saludar: () => string
    login(): boolean
}

interface Admin extends User {
    adminLevel: number
    accessAllAread: boolean
    rootAdmin(): void
}

const user: User = {
    id: 'user-12345',
    name: 'qv1ko',
    age: 21,
    role: 'user',
    saludar: () => 'hola',
    login: () => true
}

interface Hero {
    nombre: string
}

interface Hero {
    poder: string
}

const hero: Hero = {
    nombre: 'Superman',
    poder: 'Volar'
}

interface Calculadora {
    (a: number, b: number): number
}

const calculadora: Calculadora = (x, y) => x + y;

// Interfaces para clases

interface MediaPlayer {
    play(): void
    pause(): void
    stop(): void
}

interface AudioPlayer {
    volumen: number
}

class Reproductor implements MediaPlayer, AudioPlayer {
    volumen: number = 50;

    play(): void {
        console.log('Reproduciendo...');
    }

    pause(): void {
        console.log('Pausando...');
    }

    stop(): void {
        console.log('Deteniendo...');
    }
}
