const url = "https://pokeapi.co/api/v2/pokemon/";
const evoP = "https://pokeapi.co/api/v2/evolution-chain/";
var numP;

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

const cssTypes = {
  acero: "#b8b8d0",
  agua: "#6890f0",
  bicho: "#a8b820",
  dragón: "#7038f8",
  eléctrico: "#f8d030",
  fantasma: "#705898",
  fuego: "#f08030",
  hada: "#ee99ac",
  hielo: "#98d8d8",
  lucha: "#c03028",
  normal: "#a8a878",
  planta: "#78c850",
  psyquico: "#f85888",
  roca: "#b8a038",
  siniestro: "#705848",
  tierra: "#e0c068",
  veneno: "#a040a0",
  volador: "#a890f0",
};

const idEvo = {
  1: 1, 2: 1, 3: 1,
  4: 2, 5: 2, 6: 2,
  7: 3, 8: 3, 9: 3,
  10: 4, 11: 4, 12: 4,
  13: 5, 14: 5, 15: 5,
  16: 6, 17: 6, 18: 6,
  19: 7, 20: 7,
  21: 8, 22: 8,
  23: 9, 24: 9,
  25: 10, 26: 10,
  27: 11, 28: 11,
  29: 12, 30: 12, 31: 12,
  32: 13, 33: 13, 34: 13,
  35: 14, 36: 14,
  37: 15, 38: 15,
  39: 16, 40: 16,
  41: 17, 42: 17,
  43: 18, 44: 18, 45: 18,
  46: 19, 47: 19,
  48: 20, 49: 20,
  50: 21, 51: 21,
  52: 22, 53: 22,
  54: 23, 55: 23,
  56: 24, 57: 24,
  58: 25, 59: 25,
  60: 26, 61: 26, 62: 26,
  63: 27, 64: 27, 65: 27,
  66: 28, 67: 28, 68: 28,
  69: 29, 70: 29, 71: 29,
  72: 30, 73: 30,
  74: 31, 75: 31, 76: 31,
  77: 32, 78: 32,
  79: 33, 80: 33,
  81: 34, 82: 34,
  83: 35,
  84: 36, 85: 36,
  86: 37, 87: 37,
  88: 38, 89: 38,
  90: 39, 91: 39,
  92: 40, 93: 40, 94: 40,
  95: 41,
  96: 42, 97: 42,
  98: 43, 99: 43,
  100: 44, 101: 44,
  102: 45, 103: 45,
  104: 46, 105: 46,
  106: 47, 107: 47,
  108: 48,
  109: 49, 110: 49,
  111: 50, 112: 50,
  113: 51,
  114: 52,
  115: 53,
  116: 54, 117: 54,
  118: 55, 119: 55,
  120: 56, 121: 56,
  122: 57,
  123: 58,
  124: 59,
  125: 60,
  126: 61,
  127: 62,
  128: 63,
  129: 64, 130: 64,
  131: 65,
  132: 66,
  133: 67, 134: 67, 135: 67, 136: 67,
  137: 68,
  138: 69, 139: 69,
  140: 70, 141: 70,
  142: 71,
  143: 72,
  144: 73,
  145: 74,
  146: 75,
  147: 76, 148: 76, 149: 76,
  150: 77,
  151: 78,
};

function showError(msg) {
  pokedexContainer.innerHTML = `<p>${msg}</p>`;
}

function clean() {
  searchInput.value = "";
  pokedexContainer.innerHTML = "";
  showPokemon();
}

async function cEvoPoke(id, name) {
  const evo = await fetch(evoP + idEvo[id]);

  const dataEvo = await evo.json();

  if (dataEvo.chain) {
    console.log(dataEvo.chain.species.name);
  }
  if (dataEvo.chain.evolves_to[0]) {
    console.log(dataEvo.chain.evolves_to[0].species.name);
  }
  if (!dataEvo.chain.evolves_to[0].evolves_to[0]) {
    console.log("no tiene tercera evo")
  }else{
    console.log(dataEvo.chain.evolves_to[0].evolves_to[0].species.name);
  }

/* 
   console.log(dataEvo.chain.species.name);
  console.log("evoluciona en:");
  console.log(dataEvo.chain.evolves_to[0].species.name);
  console.log(dataEvo.chain.evolves_to[0].evolution_details[0].min_level); */
}



async function connectionAPI(pokemon) {
  try {
    const response = await fetch(url + pokemon);
    var tipos = "";
    const newDiv = document.createElement("div");
    const data = await response.json();

    newDiv.setAttribute("id", `${data.id} ${data.name}`);

    const tipo1 = tiposEs[data.types[0].type.name];
    const cssSpan1 = `style="background: ${cssTypes[tipo1]}"`;

    //uno o dos tipos elementales
    if (data.types[0] && data.types[1]) {
      const tipo2 = tiposEs[data.types[1].type.name];
      const cssSpan2 = `style="background: ${cssTypes[tipo2]}"`;
      tipos = `<span ${cssSpan1} id="${tipo1}">${tipo1}</span> - <span ${cssSpan2} id="${tipo2}">${tipo2}</span>`;
      newDiv.style.background = `linear-gradient(to bottom, ${cssTypes[tipo1]} 5%, ${cssTypes[tipo2]})`;
    } else {
      tipos = `<span ${cssSpan1} id="${tipo1}">${tipo1}</span>`;
      newDiv.style.background = `${cssTypes[tipo1]}`;
    }

    if (data.id < 10) {
      numP = "00" + data.id;
    } else if (data.id < 100) {
      numP = "0" + data.id;
    } /* else if (data.id < 1000) {
      numP = "0" + data.id;
    } */ else {
      numP = data.id;
    }
    if (data.id > 151) {
      showError(
        "Esta pokedex esta limitada a Kanto solo se muestran los primeros 151 Pokemons"
      );
    } else {
      createDiv(data, newDiv, tipos, numP);
    }
    
  } catch (error) {
    console.error(error);
    showError("Ha ocurrido un error al buscar el pokemon");
  }
}
function createDiv(data, newDiv, tipos, numP) {
  if (data.name === "nidoran-f") {
    data.name = "nidoran ♀️";
  } else if (data.name === "nidoran-m") {
    data.name = "nidoran ♂️";
  }

  newDiv.innerHTML = `
  <a href="/pokemonInfo.html" onclick="{localStorage.setItem(${data.id}, '${data.name}')}"></a>
  <h2># ${numP}</h2>
  <img src="${data.sprites.front_default}">
  <h3>${data.name.toUpperCase()}</h3>
  `;

  {
    /* <img src="${data.sprites.back_default}">
  <h3>${data.name.toUpperCase()}</h3>
<p>Tipo: ${tipos}</p>
<p>Altura: ${data.height / 10}m</p>
<p>Peso: ${data.weight / 10}kg</p> */
  }
  pokedexContainer.appendChild(newDiv);
}

async function showPokemon() {
  try {
    for (let i = 1; i <= 151; i++) {
      await connectionAPI(i);
      document.getElementById("cleanSearch").disabled = true;
    }
    document.getElementById("cleanSearch").disabled = false;
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
    }
    connectionAPI(searchedPokemon); /* 
    pokedexContainer.innerHTML = ``; */

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



function enter(e) {
  if (e.keyCode == 13) {
    searchedPokemon();
  }
}

document.getElementById("btnSearch").addEventListener("click", searchedPokemon);
document.getElementById("cleanSearch").addEventListener("click", clean);
