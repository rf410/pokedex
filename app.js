// Contenedor <ul>
var listaPokemon = document.getElementById('pokeList');
// Imagen pokemon
var imagen = document.getElementById("imgPoke");
// Descripcion pokemon
var description = document.getElementById("description");

// Función para cargar archivos json
function loadJSON(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

loadJSON("pokemonList.json", function (text) {
    var data = JSON.parse(text);
    for (let index = 0; index < data.length; index++) {
        // Datos que van en la etiqueta li
        var id = data[index].id.toString().padStart(3, '0');
        var nombre = data[index].name.english;
        // Etiquetas li insertadas
        var node = document.createElement("li");
        if (index === 0) { 
            node.className = "grey"; 
            imagen.src = "images/001Bulbasaur.png";
            description.innerText = data[index].description;
        }
        var textNode = document.createTextNode("#" + id + "  " + nombre);
        node.id = id;
        node.dataset.description = data[index].description;
        node.appendChild(textNode);
        listaPokemon.appendChild(node);
        listaPokemon.lastChild.addEventListener("click", desplegarInfoEImagen);
    }
});

function desplegarInfoEImagen() {
    // Obtenemos el id y el nombre
    var pokemon = document.getElementById(this.id);
    var pokemonFormat = pokemon.innerHTML.slice(1);
    var aux = pokemonFormat.replace(/\s+|\u2642|\u2640|'/g, '');
    // Se establece la fuente de la imagen    
    imagen.src = "images/" + aux + ".png";
    // ---- Diseño ---- No deberia ir aqui
    var todos = listaPokemon.querySelectorAll('li');

    for (let index = 0; index < todos.length; index++) {
        if (todos[index].id === this.id) {
            todos[index].classList.add("grey");
            description.innerText = todos[index].dataset.description;
        } else {
            todos[index].classList.remove("grey");
        }

    }
    // ---- /Diseño ----    
}