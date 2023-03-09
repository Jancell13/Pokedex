const url = "https://pokeapi.co/api/v2/pokemon/";

const searchInput = document.getElementById("search");
const pokedexContainer = document.getElementById("pokedexContainer");

const tiposEs = {
  bug: "bicho",
  dark: "siniestro",
  dragon: "dragón",
  electric: "eléctrico",
  fairy: "hada",
  fighting: "lucha",
  fire: "fuego",
  flying: "volador",
  ghost: "fantasma",
  grass: "planta",
  ground: "tierra",
  ice: "hielo",
  normal: "normal",
  poison: "veneno",
  psychic: "psyquico",
  rock: "roca",
  steel: "acero",
  water: "agua",
};
var numP;
function showError(msg) {
  pokedexContainer.innerHTML = `<p>${msg}</p>`;
}

function clean() {
  searchInput.value = "";
  pokedexContainer.innerHTML = "";
  showPokemon();
}

async function connectionAPI(pokemon) {
  const response = await fetch(url + pokemon);
  var tipos = "";
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", `${pokemon}`);
  const data = await response.json();

  const tipo1 = tiposEs[data.types[0].type.name];

  if (data.types[0] && data.types[1]) {
    const tipo2 = tiposEs[data.types[1].type.name];
    tipos = `<span class="${tipo1}">${tipo1}</span> - <span class="${tipo2}">${tipo2}</span>`;
  } else {
    tipos = `<span class="${tipo1}">${tipo1}</span>`;
  }

  

  if (data.id < 10) {
    numP = "000" + data.id;
  } else if (data.id < 100) {
    numP = "00" + data.id;
  } else if (data.id < 1000) {
    numP = "0" + data.id;
  } else{
    numP = data.id
  }

  createDiv(data, newDiv, tipos, numP);
}

function createDiv(data, newDiv, tipos, numP) {
  newDiv.innerHTML = `
  <h2># ${numP}</h2>
  <img src="${data.sprites.front_default}">
  <img src="${data.sprites.back_default}">
  <h3>${data.name.toUpperCase()}</h3>
<p>Tipo: ${tipos}</p>
<p>Altura: ${data.height / 10}m</p>
<p>Peso: ${data.weight / 10}kg</p>
`;
  pokedexContainer.appendChild(newDiv);
}

async function showPokemon() {
  try {
    for (let i = 1; i <= 151; i++) {
      await connectionAPI(i);
    }
  } catch (error) {
    console.error("Ocurrio un error, " + error);
  }
}

async function searchedPokemon() {
  const searchedPokemon = searchInput.value.toLowerCase();

  try {
    const response = await fetch(url + searchedPokemon);
    if (!response.ok) {
      if (Number(searchInput.value)) {
        showError(
          `No se encontró ningún pokemon con el número: ${searchedPokemon}`
        );
      } else {
        showError(`No se encontró ningún pokemon llamado: ${searchedPokemon}`);
      }
      return;
    }
    pokedexContainer.innerHTML = ``;
    connectionAPI(searchedPokemon);
    /* const data = await response.json();

    pokedexContainer.innerHTML = `
    <h2>${data.name.toUpperCase()}</h2>
    <img src="${data.sprites.front_default}">
    <img src="${data.sprites.back_default}">
    <p>Numero: ${data.id}</p>
    <p>Altura: ${data.height / 10}m</p>
    <p>Peso: ${data.weight / 10}kg</p>
    `; */
  } catch (error) {
    console.error(error);
    showError("Ha ocurrido un error al buscar el pokemon");
  }
}

document.getElementById("btnSearch").addEventListener("click", searchedPokemon);
document.getElementById("cleanSearch").addEventListener("click", clean);
