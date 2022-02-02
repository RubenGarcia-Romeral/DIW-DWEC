//funcion que carga el lenguaje
function loadLanguage() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadJSON(this.responseText);
        }
    };

    xhr.open("GET", "idioma.json", true);
    xhr.send();
}

//Funcion que carga el json y cambia los textos de idioma
function loadJSON(json) {
    let docJSON = JSON.parse(json);

    let elementosLangJSON = docJSON["lang"];

    let lang = ""

    if (localStorage.getItem("idioma") != null) {
        lang = localStorage.getItem("idioma")
    } else {
        lang = "es"
    }

    let elements = elementosLangJSON[lang];

    document.getElementById('puntuacionTexto').textContent = elements["score"];
    document.getElementById('puntuacionTextoRanking').textContent = elements["score"];
    document.getElementById('errorTexto').textContent = elements["errors"];
    document.getElementById('top-player').textContent = elements["top_player"];
    document.getElementById('idiomaTexto').textContent = elements["language"];
    document.getElementById('descripcion').textContent = elements["game_description"];
}


//Aquí esta el codigo que hace que se escriban los mensajes en la barra de informacion 
// tambien que se cambie el idioma de esta
function barraInformativaTexto(estado) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let docJSON = JSON.parse(this.responseText);

            let elementosLangJSON = docJSON["lang"];

            let lang = ""

            if (localStorage.getItem("idioma") != null) {
                lang = localStorage.getItem("idioma")
            } else {
                lang = "ES"
            }

            let elements = elementosLangJSON[lang];

            barra_informativa.textContent = elements[estado];
        }
    };

    xhr.open("GET", "idioma.json", true);
    xhr.send();
}

loadLanguage();