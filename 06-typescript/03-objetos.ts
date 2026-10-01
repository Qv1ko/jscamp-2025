import type { User } from "./03-types.ts"

const user: User = {
    name: "Qv1ko",
    age: 21,
    email: "test@gmail.com",
    role: "admin",
    company: {
        name: "my name",
        address: "my address"
    }
}

// user.name = "victor"; // propiedad solo de lectura

const otroUser: User = Object.freeze({
    name: "pepe",
    age: 25,
    email: "pepe@gmail.com",
    role: "user",
});

const anotherUser: User = {
    name: "ana",
    age: 28,
    email: "ana@gmail.com",
    role: "editor",
}