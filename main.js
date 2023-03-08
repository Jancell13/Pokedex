const url = "https://pokeapi.co/api/v2/pokemon/";

const searchInput = document.getElementById("search");
const pokedexContainer = document.getElementById("pokedexContainer");

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
  if (data.types[0] && data.types[1]) {
    tipos = `<p>Tipos: ${data.types[0].type.name} - ${data.types[1].type.name}</p>`;
  } else {
    tipos = `<p>Tipo: ${data.types[0].type.name}</p>`;
    if (data.types[0].type.name === "fire") {
      tipos =`<p>Tipo: fuego</p>`
    }
  }
  createDiv(data, newDiv, tipos);
}

function createDiv(data, newDiv, tipos) {
  newDiv.innerHTML = `
<h2>${data.name.toUpperCase()}</h2>
<img src="${data.sprites.front_default}">
<img src="${data.sprites.back_default}">
${tipos}
<p>Numero: ${data.id}</p>
<p>Altura: ${data.height / 10}m</p>
<p>Peso: ${data.weight / 10}kg</p>
`;
  pokedexContainer.appendChild(newDiv);
}

async function showPokemon() {
  try {
    for (let i = 1; i <= 151; i++) {
      connectionAPI(i);
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
