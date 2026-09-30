// Tipos primitivos en TypeScript

// strings
const nombre: string = 'Qv1ko';
const saludo: string = `Hola, ${nombre}`; // Tipo inferido como string
const vacio: string = "";

// numbers
let edad: number = 21;
const precio = 19.99;
const color = 0x09f;
let infinito = Infinity;

// booleans
let isDeveloper: boolean;
isDeveloper = true;

// nulls & undefined
let nulo = null;
let indefinido: undefined = undefined;

// union type
let age: number | null;
age = null;

// bigint
const numeroGrande: bigint = 9999999999999n;

// symbols
const id: symbol = Symbol("id");
