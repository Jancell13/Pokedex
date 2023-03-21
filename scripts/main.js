import { tiposEs, cssTypes } from "./tipos.js";
const url = "https://pokeapi.co/api/v2/pokemon/";
var numP,tipos;
const pokedexContainer = document.getElementById("pokedexContainer");

window.sendName = sendName;

document.addEventListener("DOMContentLoaded", () => {
  showPokemon();
});

function showError(msg) {
  pokedexContainer.innerHTML = `<p>${msg}</p>`;
}

const loaderPokeball = document.querySelector(".container");

async function connectionAPI(pokemon) {
  try {
    const response = await fetch(url + pokemon);

    if (!response.ok) {
      if (Number(pokemon)) {
        showError(`No se encontró ningún pokemon con el número: ${pokemon}`);
      } else {
        showError(`No se encontró ningún pokemon llamado: ${pokemon}`);
      }
    }
    
    const newDiv = document.createElement("div");
    const data = await response.json();

    newDiv.setAttribute("id", `${data.id} ${data.name}`);
    newDiv.setAttribute("class", "cardPoke ocultar");

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
//typesCss(data)


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
function createDiv(data, newDiv,) {
  if (data.name === "nidoran-f") {
    data.name = "nidoran ♀️";
  } else if (data.name === "nidoran-m") {
    data.name = "nidoran ♂️";
  }
  
  newDiv.innerHTML = `
  <a href="/pokemonInfo.html" class="infoP" onclick="sendName('${data.name}')"></a>
  <h2># ${numP}</h2>
  <img src="${data.sprites.front_default}">
  <p>${tipos}</p>
  <h3>${data.name.toUpperCase()}</h3>
  `;
  
  pokedexContainer.appendChild(newDiv);
}

function sendName(data) {
  if (data === "nidoran ♀️") {
    data = "nidoran-f";
  } else if (data === "nidoran ♂️") {
    data = "nidoran-m";
  }
  console.log(data);
  localStorage.setItem(1, data);
}

async function showPokemon() {
  const loaderPokeball = document.querySelector(".container");
  try {
    for (let i = 1; i <= 151; i++) {
      await connectionAPI(i);
      //document.getElementById("cleanSearch").disabled = true;
    }
    loaderPokeball.style.opacity = 0;
    loaderPokeball.style.visibility = 0;
    document.querySelectorAll(".ocultar").forEach((poke) => {
      poke.classList.remove("ocultar");
    });
    //document.getElementById("cleanSearch").disabled = false;
  } catch (error) {
    console.error("Ocurrio un error, " + error);
  }
}

document.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  if (e.target.matches("#search")) {
    document.querySelectorAll(".cardPoke").forEach((poke) => {
      poke.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        ? poke.classList.remove("ocultar")
        : poke.classList.add("ocultar");
    });
  }
});
