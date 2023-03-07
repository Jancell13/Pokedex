const url = "https://pokeapi.co/api/v2/pokemon/";

const searchInput = document.getElementById("search");
const pokedexContainer = document.getElementById("pokedex-container");

function showError(msg) {
  pokedexContainer.innerHTML = `<p>${msg}</p>`;
}

async function showPokemon() {
  try {
    for (let i = 1; i < 151; i++) {
      const response = await fetch(url + i);

      const data = await response.json();
      console.log(data.name);
      pokedexContainer.innerHTML = `
    <h2>${data.name.toUpperCase()}</h2>
    <img src="${data.sprites.front_default}">
    <img src="${data.sprites.back_default}">
    <p>Numero: ${data.id}</p>
    <p>Altura: ${data.height / 10}m</p>
    <p>Peso: ${data.weight / 10}kg</p>
    `;
    }
  } catch (error) {}
}

async function searchedPokemon() {
  const searchedPokemon = searchInput.value.toLowerCase();

  const data = await response.json();
  
  try {
    for (let i = 1; i < 10; i++) {
      const response = await fetch(url + i);

      const data = await response.json();
      console.log(data.name);
    }
    /* const response = await fetch(url + searchedPokemon);
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
    const data = await response.json();

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

document
  .getElementById("btn-search")
  .addEventListener("click", searchedPokemon);
