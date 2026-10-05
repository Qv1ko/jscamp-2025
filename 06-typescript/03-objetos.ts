import type { User, UserEntity } from "./03-types.ts"

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

const entity: UserEntity = {
    id: 1234,
    name: "qv1ko",
    age: 21,
    birthdate: new Date("1994-05-15"),
    role: "admin",
    email: "test@mail.com"
};

type Dictionary = {
    [key: string]: string
}

const dictionary: Dictionary = {
    apple: "apple",
    banana: "banana",
    cherry: "cherry"
}