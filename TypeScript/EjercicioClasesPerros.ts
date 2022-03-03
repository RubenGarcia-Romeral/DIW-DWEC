function construirNombre(nombre: string, apellido?: string) : string {
    if (apellido) return nombre + " " + apellido;
    else return nombre;
}

function comparar(p1: Persona, p2: Persona) : void {
    if (p1.edad > p2.edad) {
        console.log(p1.nombre + ' es mayor que ' + p2.nombre);
    } else {
        console.log(p2.nombre + ' es mayor que ' + p1.nombre);
    }
}

enum Profesion {
    Pintor = 'pintor',
    Programador = 'programador',
    Panadero = 'panadero'
}

class Persona implements Mamifero {

    public nombre: string;
    public edad: number;
    public profesion: Profesion;
    velocidad: number;

    constructor(nombre: string, edad: number, velocidad: number, profesion?: Profesion) {
        this.nombre = nombre;
        this.edad = edad;
        this.profesion = profesion;
        this.velocidad = velocidad;
    }
    
    public caminar(distancia) {
        return distancia / this.velocidad;
    }

    public saludar() : void {
        console.log("¡Hola! mi nombre es " + this.nombre
            + " y tengo " + this.edad + " años. Profesion: "
            + this.profesion);
    }

}

let p1 = new Persona("Ruben", 21, 30);
p1.profesion = Profesion.Pintor;

let p2 = new Persona("Carlos", 20, 30);
p2.profesion = Profesion.Programador;

p1.saludar();
p2.saludar();
comparar(p1, p2);

class Perro implements Mamifero {
    raza: string;
    color: string;
    velocidad: number;

    public constructor(raza: string, color: string, velocidad: number) {
        this.raza = raza;
        this.color = color;
        this.velocidad = velocidad;
    }
    
    public caminar(distancia) {
        return distancia / this.velocidad;
    }
}

interface Mamifero {
    velocidad: number;
    caminar(distancia);
}

const perro1 = new Perro("Caniche", "Blanco", 14);
const perro2 = new Perro("Husky", "Gris", 2);

function compararVelocidad(perro1: Perro, p2: Persona) : void {
    if (perro1.caminar(100) < p2.caminar(100)) {
        console.log(perro1.raza + ' tarda menos que ' + p2.nombre);
    } else {
        console.log(perro1.raza + ' tarda más que ' + p2.nombre);
    }
}

compararVelocidad(perro1, p1);
compararVelocidad(perro1, p2);
compararVelocidad(perro2, p1);
compararVelocidad(perro2, p2);