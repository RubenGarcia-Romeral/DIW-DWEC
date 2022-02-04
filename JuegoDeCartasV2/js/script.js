let puntuacionTexto = $("#puntuacionTexto");
let puntuacionTextoRanking = $("#puntuacionTextoRanking");

let errorTexto = $("#errorTexto");
let top_player = $("#top-player");
let idiomaTexto = $("#idiomaTexto");
let descripcion = $("#descripcion");

let botonEsp = $("#es");
let botonEng = $("#en");

let barra_informativa = $("#barra-informativa");

let contador_puntos = $("#contador-puntos");
let contador_errores = $("#contador-errores");

let errores = 0;

let nombre = "";
let nick = $("#nick");

let caja_invisible = $("#invisible")[0];

$(document).ready(function() {

let pedirNombre = () => {
    nombre = prompt("Dime tu nick:");
    $("#nick").text(nombre);
}


let restablecer = () => {

    celdaImagen1 = 0;
    celdaImagen2 = 0;

    fichaValor1 = 0;
    fichaValor2 = 0;
}

let comenzarJuego = () => {
    
    restablecer();

   
    contador_puntos.text("0");
    contador_errores.text("0");
    errores = 0;

    //pedirNombre();

    anadirListenerYValueACartas();

    
    $("#ranking-jugador").text(localStorage.getItem("Jugador"));
    $("#ranking-puntuacion").text(localStorage.getItem("Ranking"));
}


comenzarJuego();
//$(window).load(comenzarJuego());

function comprobarValores(carta, ficha_pulsado) {
    if (celdaImagen2 > 0) {
        celdaImagen1 = 0;
        celdaImagen2 = 0;
    }

   
    if (celdaImagen1 == 0) {
        celdaImagen1 = carta;
    } else {
        celdaImagen2 = carta;
    }


    carta.innerHTML = "<img src='imagenes/ficha" + ficha_pulsado + ".jpg' class='imagen'>";

    if (fichaValor2 > 0) {
        fichaValor1 = 0;
        fichaValor2 = 0;
    }

    if (fichaValor1 == 0 || celdaImagen1 == celdaImagen2) {
        fichaValor1 = ficha_pulsado;
    } else {
        fichaValor2 = ficha_pulsado;
    }
}

function detenPagina() {
    window.setTimeout(() => {
       
        celdaImagen1.innerHTML = "";
        celdaImagen2.innerHTML = "";

        restablecer();

        errores++;
        contador_errores.text(errores);

     
        caja_invisible.style.display = "none";
    }, 500);
}

function anadeSombraYQuitaListener() {
    
    let celdas_pulsadas = $("div[value='" + fichaValor1 + "']");

    celdas_pulsadas[0].classList.add("sombra");
    $(celdas_pulsadas[0]).unbind('click');
    celdas_pulsadas[1].classList.add("sombra");
    $(celdas_pulsadas[1]).unbind('click');
}

function quitarSombraYAnadirListenerATodosLosDivs() {
    let celdas = $(".celda");

    for (let i = 0; i < celdas.length; i++) {
        celdas[i].classList.remove("sombra");
        celdas[i].innerHTML = "";
    }

    celdas.click(comprobarCartas);
}

function comprobarRanking() {
    if (errores < parseInt(localStorage.getItem("Ranking")) || localStorage.getItem("Ranking") == null) {
        localStorage.setItem("Ranking", errores);
        localStorage.setItem("Jugador", nombre);
    }
}

function comprobarPuntuacion() {
    if (parseInt(contador_puntos.text()) == 6) {
        
        barraInformativaTexto("message_victory");

        alert("¡Felicidades! Has ganado el juego. Tuviste un total de " + contador_errores.text() + " errores");

       
        quitarSombraYAnadirListenerATodosLosDivs();

        comprobarRanking();

     
        comenzarJuego();
    }
}

function comprobarCartas(carta) {
    carta = carta.currentTarget;

    //alert($(carta));
    let ficha_pulsado = carta.getAttribute("value");

 
    if (ficha_pulsado != null) {
        comprobarValores(carta, ficha_pulsado);

     
        if (fichaValor1 != fichaValor2 & fichaValor2 > 0) {
        
            barraInformativaTexto("message_mistake");

            celdaImagen2.innerHTML = "<img src='imagenes/ficha" + celdaImagen2.getAttribute('value') + ".jpg' class='imagen'>";
        
            caja_invisible.style.display = "block";

       
            detenPagina();
       
        } else if (fichaValor1 == fichaValor2 && celdaImagen1 != celdaImagen2) {
        
            anadeSombraYQuitaListener();

            contador_puntos.text((parseInt(contador_puntos.text()) + 1));

            
            barraInformativaTexto("message_success");

           
            restablecer();

            comprobarPuntuacion();
        }
    }
}

function establecerValor(div, lista) {
   
    let index = Math.floor(Math.random() * lista.length);

    $(div).attr('value', lista[index]);

    lista.splice(index, 1);
}

function anadirListenerYValueACartas() {
   
    let lista = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

    for (let i = 0; i < $(".celda").length; i++) {
        establecerValor($(".celda")[i], lista);
    }

    $(".celda").click(comprobarCartas);
}

function cambiarTextoIdioma(boton) {
    
    localStorage.setItem("idioma", boton.currentTarget.id);

    loadLanguage();
}

botonEsp.click(cambiarTextoIdioma);
botonEng.click(cambiarTextoIdioma);
});