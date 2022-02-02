
let contador_puntos = document.getElementById('contador-puntos');
let contador_errores = document.getElementById('contador-errores');


let errores = 0;

let nombre = "";
let nick = document.getElementById('nick');



// Elementos del ranking para que posteriormente se guarde si alguien hace una mejor puntuacion
let ranking_jugador = document.getElementById('ranking-jugador');
let ranking_puntuacion = document.getElementById('ranking-puntuacion');



// Le aplica el texto a los elementos del DOM las variables guardadas
ranking_jugador.textContent = localStorage.getItem("Jugador");
ranking_puntuacion.textContent = localStorage.getItem("Ranking");


let puntuacionTexto = document.getElementById('puntuacionTexto');
let botonEsp = document.getElementById('es');
let botonEng = document.getElementById('en');

let barra_informativa = document.getElementById("barra-informativa");


let restablecer = () => {

    // Celdas DIV
    celdaImagen1 = 0;
    celdaImagen2 = 0;

    // Valores que tienen los DIVs
    fichaValor1 = 0;
    fichaValor2 = 0;
}



// Aqui inicializamos las varibales, las llama y las inicializamos a 0
restablecer();

// Aqui pedimos el nombre al jugador y posteriormente lo metemos en la caja
let pedirNombre = () => {
    nombre = prompt("Dime tu nickname:");
    nick.textContent = nombre;
}



window.onload = pedirNombre;



function comprobarCartas(e) {

    // Guardamos el value del evento seleccionado
    let ficha_pulsada = e.target.getAttribute('value');

    // Comoprobamos este tiene un valor
    if (ficha_pulsada != null) {
        if (celdaImagen2 > 0) {
            celdaImagen1 = 0;
            celdaImagen2 = 0;
        }

        // Comprobamos si las dos variables de celdas ya tienen un valor, les asignamos el target
        if (celdaImagen1 == 0) {
            celdaImagen1 = e.target;
        } else {
            celdaImagen2 = e.target;
        }

        // Cambiamos el contenido de la celda para que aparezca la imagen segun su valor
        let celda_pulsado = e.target.innerHTML = "<img src='imagenes/ficha" + ficha_pulsada + ".jpg' class='imagen'>";

        if (fichaValor2 > 0) {
            fichaValor1 = 0;
            fichaValor2 = 0;
        }

        // Comprobamos si las dos variables ya tienen un valor, les asignamos la ficha pulsada

        if (fichaValor1 == 0) {

            fichaValor1 = ficha_pulsada;

        } else {

            fichaValor2 = ficha_pulsada;
        }

        //Aqui comprueba que las imagenes sean diferentes y que la ficha 2 tengo un valor
        if (fichaValor1 != fichaValor2 & fichaValor2 > 0) {
            barraInformativaTexto("message_mistake");


            //Cambia el contenido de la celda sengun el valor que tenga la ficha
            celdaImagen2.innerHTML = "<img src='imagenes/ficha" + celdaImagen2.getAttribute('value') + ".jpg' class='imagen'>";

            //Con el timeout detiene la pagina y borra la imagen
            window.setTimeout(() => {
                celdaImagen1.innerHTML = "";
                celdaImagen2.innerHTML = "";

                // Restablece valores
                restablecer();

                //Aqui sumamos los errores
                errores++;

                contador_errores.textContent = errores;
            }, 500);

            //Aqui comprueba si ha acertado las fichas mirando si los valores son iguales            
        } else if (fichaValor1 == fichaValor2) {
            //Cuando pulsa una celda lo guarda en un array 
            let celdas_pulsadas = document.querySelectorAll("div[value='" + fichaValor1 + "']");

            //Le añadimos un borde para decirle al usuario que ha acertado y le quitamos el click
            celdas_pulsadas[0].classList.add("sombra");
            celdas_pulsadas[0].removeEventListener('click', comprobarCartas);
            celdas_pulsadas[1].classList.add("sombra");
            celdas_pulsadas[1].removeEventListener('click', comprobarCartas);

            //Aqui lo añadimos al contador y se reinicia la partida
            contador_puntos.textContent = (parseInt(contador_puntos.textContent) + 1);

            barraInformativaTexto("message_success");

            restablecer();

            //Aqui comprueba que la puntuacion sea la maxima para terminar la partida y le mostramos el mensaje con los errores
            if (parseInt(contador_puntos.textContent) == 6) {
                barraInformativaTexto("message_victory");

                alert("Enhorabuena maquina! Has ganado!!! Has tenido un total de " + contador_errores.textContent + " errores");

                //Aqui quita todos los bordes a todas las celdas
                for (let i = 0; i < celdas.length; i++) {
                    celdas[i].classList.remove("sombra");
                    celdas[i].innerHTML = "";
                    celdas[i].addEventListener('click', comprobarCartas);
                }
                //Aqui lo que hace es que si los erroes que ha hecho este nickname es menor que el que ya esta en el record, lo guardamos
                if (errores < parseInt(localStorage.getItem("Ranking")) || localStorage.getItem("Ranking") == null) {
                    localStorage.setItem("Ranking", errores);
                    localStorage.setItem("Jugador", nombre);
                }

                //Aqui vamos a mostrar el nombre del jugador con el record
                ranking_jugador.textContent = localStorage.getItem("Jugador");
                ranking_puntuacion.textContent = localStorage.getItem("Ranking");

                // Restablecemos todo
                contador_puntos.textContent = "0";
                contador_errores.textContent = "0";
                errores = 0;

                //Aqui volvemos a pedir un nuevo nombre y se vulve a iniciar el juego
                pedirNombre();
            }


        }


    }


}




//Guarda todos los divs de las fichas en un array
let celdas = document.getElementsByClassName('celda');



let lista = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];


let establecerValor = (div) => {

    // Genera un número aleatorio de la lista
    let index = Math.floor(Math.random() * lista.length);

    div.setAttribute('value', lista[index]);

    lista.splice(index, 1);

}

//Recorre el array creado y pone un "listener" y pone un value
for (let i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener('click', comprobarCartas);

    establecerValor(celdas[i]);

}


function cambiarTextoIdioma(e) {
    // Guarda en el web storage el idioma
    localStorage.setItem("idioma", e.target.getAttribute('id'));


    loadLanguage();
    
}

// Les ponemos un listener a los botones de español e inglés
botonEsp.addEventListener("click", cambiarTextoIdioma);
botonEng.addEventListener("click", cambiarTextoIdioma);
