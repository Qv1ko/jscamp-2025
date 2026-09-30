// Arrays en TypeScript

const numeros: number[] = [1, 2, 3, 4, 5];
numeros.push(6);

const numerosAlt: Array<number> = [10, 20, 30];
numerosAlt.push(40);

const frutas: [string, string, number] = ["🍎", "🍌", 10]; // tupla

let strings: string[] = [];

// Arrays de tipos mixtos
const mixto: (string | number)[] = [1, "dos", 3, "cuatro"];
const arrayToFilter: (string | undefined)[] = ["uno", undefined, "tres", undefined];
