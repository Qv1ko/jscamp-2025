// JavaScript -> tipado dinamico y debil (conversiones implicitas)
// function double(n) {
//   return n * 2;
// }

// double("10"); // 20

// TypeScript -> tipado estatico y fuerte

function double(n: number) {
  return n * 2;
}

double(10); // 20

// TypeScript valida en tiempo de compilación, pero no en tiempo de ejecución
