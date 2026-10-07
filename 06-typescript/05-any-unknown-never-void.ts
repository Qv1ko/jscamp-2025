// any, unknown, never y void

// any - Deshactiva typescript
let cualquierCosa: any = "hola";
cualquierCosa = 42;
cualquierCosa = true;

const result = cualquierCosa + 8;

// 1. migraciones de JS a TS
// 2. librerías de terceros sin tipos

// unknown - Alternativa segura de any

let valorDesconocido: unknown = "hola";
valorDesconocido = 42;
valorDesconocido = true;

// const suma = valorDesconocido + 10 // no deja utilizar el valor

// type narrowing
if (typeof valorDesconocido === "number") {
    const suma = valorDesconocido + 10 // resultado seguro
}

// void - funciones que no retornan valor

function saludar(): void {
    console.log('hola');
}

function errorMessage(errorMessage: string): void {
    if (errorMessage.length === 0) return undefined

    console.log("Error:", errorMessage)
}

// never - el tipo imposible

function bucleInfinito(): never { // nunca devuelve nada
    while (true) {
    }
}

function throwError(message: string): never {
    throw new Error(message);
}
