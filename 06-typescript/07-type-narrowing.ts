// Type Narrowing

function procesar(valor: number | string) {
    if (typeof valor === "number") {
        console.log("El valor es un número:", valor.toFixed(2));
    } else {
        console.log("El valor es una cadena de texto:", valor.toUpperCase());
    }
}

function imprimirMensaje(mensaje: string | null | undefined) {
    if (mensaje) {
        console.log(mensaje.toUpperCase());
    }
}

type Pez = {
    nadar: () => void
    nombre: string
}

type Pajaro = {
    volar: () => void
    nombre: string
}

type Perro = {
    ladrar: () => void
    nombre: string
}

type Animal = Pez | Pajaro | Perro;

function moverAnimal(animal: Animal) {
    if ('nadar' in animal) {
        console.log('El pez está nadando');
        animal.nadar();
    } else if ('volar' in animal) {
        console.log('El pajaro está volando');
        animal.volar();
    } else if ('lodrar' in animal) {
        console.log('El perro está ladrando');
        animal.ladrar();
    }
}

// instance narrowing

function formatDate(value: Date | string) {
    if (value instanceof Date) {
        return value.toUTCString();
    }

    return new Date(value).toUTCString();
}