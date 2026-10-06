// Tuplas en TypeScript

const persona: [string, number] = ["qv1ko", 21];

const [personaName, personaAge] = persona;

// Coordenadas
type Coordenadas = [latitude: number, longitude: number];
const [lat, lon]: Coordenadas = [40.4168, -3.768];

type RGB = [number, number, number];
const rojo: RGB = [255, 0, 0];

// Rangos de valores
type Rango = [min: number, max: number];
const rangoEdad: Rango = [18, 65];

// useState de React
type EstadoContador = [value: number, updateFunction: (nuevoValor: number) => void];

// Tuplas con REST elements
type StringYNumeros = [string, ...number[]];

const [text, firstNumber, ...RestOfNumbers]: StringYNumeros = ['texto', 1, 2, 3, 4, 5, 6];

type Config = readonly [server: string, port: number, useSSL: boolean];
const dbConfig: Config = ["localhost", 5432, true];
// dbConfig[0] = "otroServer" // Error