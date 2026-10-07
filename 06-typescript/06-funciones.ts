// Funciones TypeScript

// Tipar parámetros y retorno
function sumar(a: number, b: number): number {
    return a + b;
}

const multiplicar = (a: number, b: number): number => a * b;

// Parámetros opcionales
function saludar(nombre: string, apellido?: string): string {
    if (apellido) {
        return `Hola, ${nombre} ${apellido}`;
    }

    return `Hola, ${nombre}`;
}

// Parámetros por defecto

function crearUsuario(nombre: string, rol: string = "admin") {
    return {
        nombre,
        rol
    }
}

// Rest parameters

function sumarNumeros(...numeros: number[]) {
    return numeros.reduce((acc: number, curr: number): number => acc + curr, 0)
}

// Tipo de función

type OperacionMatematica = (a: number, b: number) => number;
const division: OperacionMatematica = (a, b) => a / b;
const resta: OperacionMatematica = (a, b) => a - b;
