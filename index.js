var express = require("express");
var app = express();
 
app.get('/', inicio);
app.get('/pokedex', pokedex);

function inicio(peticion, resultado) {
	resultado.send("Este es el <b>home</b>");
}

function pokedex(peticion, resultado) {
	resultado.sendfile("index.html");
}

app.listen(8989);