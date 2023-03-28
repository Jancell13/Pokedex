import { tiposEs, cssTypes } from "./tipos.js";
import { idEvo } from "./evoFamily.js";
const url = "https://pokeapi.co/api/v2/pokemon/";
const evoP = "https://pokeapi.co/api/v2/evolution-chain/";
var numP,
  tipos = "",
  evolution = "";
const selectPoke = localStorage.getItem(1);
const pokedexContainer = document.getElementById("pokemonInfo");
const uCF = selectPoke.charAt(0).toUpperCase() + selectPoke.slice(1);

document.title = uCF;
0;
document.addEventListener("DOMContentLoaded", () => {
  connectionAPI(selectPoke);
});

async function connectionAPI(pokemon) {
  if (pokemon === "nidoran ♀️") {
    pokemon = "nidoran-f";
  } else if (pokemon === "nidoran ♂️") {
    pokemon = "nidoran-m";
  }
  const loaderPokeball = document.querySelector(".container");
  try {
    const response = await fetch(url + pokemon);
    const data = await response.json();
    title(data);

    const evo = await fetch(evoP + idEvo[data.id]);
    const dataEvo = await evo.json();
    if (!dataEvo.chain.evolves_to[0] === "") {
    }
    if (dataEvo.chain.species.name === data.name) {
      const res1 = await fetch(url + dataEvo.chain.evolves_to[0].species.name);
      const d1 = await res1.json();
      if (d1.id <= 151) {
        evolution =
          "Evoluciona a:&nbsp;&nbsp;&nbsp;" +
          dataEvo.chain.evolves_to[0].species.name;
      } else {
        evolution = "";
      }
    }
    if (dataEvo.chain.evolves_to[0].species.name === data.name) {
      if (dataEvo.chain.evolves_to[0].evolves_to[0]) {
        const res2 = await fetch(
          url + dataEvo.chain.evolves_to[0].evolves_to[0].species.name
        );
        const d2 = await res2.json();
        if (d2.id <= 151) {
          evolution =
            "Evoluciona a:&nbsp;&nbsp;&nbsp;" +
            dataEvo.chain.evolves_to[0].evolves_to[0].species.name;
        } else {
          evolution = "";
        }
      }
    }

    if (data.id < 10) {
      numP = "00" + data.id;
    } else if (data.id < 100) {
      numP = "0" + data.id;
    } else {
      numP = data.id;
    }

    if (data.sprites.front_female === null) {
      data.sprites.front_female = data.sprites.front_default;
    }
    if (data.sprites.back_female === null) {
      data.sprites.back_female = data.sprites.back_default;
    }
    if (data.sprites.front_shiny_female === null) {
      data.sprites.front_shiny_female = data.sprites.front_shiny;
    }
    if (data.sprites.back_shiny_female === null) {
      data.sprites.back_shiny_female = data.sprites.back_shiny;
    }
    createDiv(data);

    loaderPokeball.style.opacity = 0;
    loaderPokeball.style.visibility = 0;
  } catch (error) {
    console.error(error);
    showError("Ha ocurrido un error al mostrar los datos del pokemon");
  }
}
function title(data) {
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = data.sprites.versions["generation-vii"].icons.front_default;
}

function showError(msg) {
  pokedexContainer.innerHTML = `<p>${msg}</p>`;
}

function createDiv(data) {
  const tipo1 = tiposEs[data.types[0].type.name];
  const cssSpan1 = `style="background: ${cssTypes[tipo1]}"`;

  //uno o dos tipos elementales
  if (data.types[0] && data.types[1]) {
    const tipo2 = tiposEs[data.types[1].type.name];
    const cssSpan2 = `style="background: ${cssTypes[tipo2]}"`;
    tipos = `<span ${cssSpan1} id="${tipo1}">${tipo1}</span> - <span ${cssSpan2} id="${tipo2}">${tipo2}</span>`;
    pokedexContainer.style.background = `linear-gradient(to bottom, ${cssTypes[tipo1]} 5%, ${cssTypes[tipo2]})`;
  } else {
    tipos = `<span ${cssSpan1} id="${tipo1}">${tipo1}</span>`;
    pokedexContainer.style.background = `${cssTypes[tipo1]}`;
  }

  if (data.name === "nidoran-f") {
    data.name = "nidoran ♀️";
  } else if (data.name === "nidoran-m") {
    data.name = "nidoran ♂️";
  }

  pokedexContainer.innerHTML = `
    
  <button onclick="{location.href='/'; localStorage.clear();}">Volver</button>
  <div class ="genContainer">
    <div class="btns" id="genM">
      <input type="checkbox" name="btn-M" id="btnM" checked>
      <img src="${data.sprites.front_default}" id="defFront">
      <img src="${data.sprites.back_default}" id="defBack">
    </div>

    <div class="btns" id="genF"> 
      <input type="checkbox" name="btn-F" id="btnF">
      <img src="${data.sprites.front_female}" id="femaleFront" class="ocultar">
      <img src="${data.sprites.back_female}" id="femaleBack" class="ocultar" >
    </div>
    <div class="btns" id="genS">
      <input type="checkbox" name="btn-S" id="btnS">
      <img src="${data.sprites.front_shiny}" id="shinyFront" class="ocultar">
      <img src="${data.sprites.back_shiny}" id="shinyBack" class="ocultar" >
    </div>
    <div class="btns" id="genSF">
      <input type="checkbox" name="btn-SF" id="btnSF">
      <img src="${
        data.sprites.front_shiny_female
      }" id="femaleSFront" class="ocultar">
      <img src="${
        data.sprites.back_shiny_female
      }" id="femaleSBack" class="ocultar" >
    </div>

  </div>
  <div class="datosContainer">
    <div class="datos">
      <h1># ${numP}</h2>
      <h1>${data.name.toUpperCase()}</h1>
      <p>Tipo: ${tipos} </p>
      <p>Altura: ${data.height / 10}m</p>
      <p>Peso: ${data.weight / 10}kg</p>
      <p>${evolution}</p>
    </div>
  </div>
  `;

  if (data.id >= 29 && data.id <= 31) {
    document.getElementById("btnF").checked = true;
    imgFemale(data.id);
    document.getElementById("genM").classList.add("ocultar");
    document.getElementById("genS").classList.add("ocultar");
  }
  if (data.id >= 32 && data.id <= 34) {
    document.getElementById("genF").classList.add("ocultar");
    document.getElementById("genSF").classList.add("ocultar");
  }
  document.getElementById("btnF").addEventListener("change", imgFemale);
  document.getElementById("btnM").addEventListener("change", imgFemale);
  document.getElementById("btnS").addEventListener("change", imgFemale);
  document.getElementById("btnSF").addEventListener("change", imgFemale);
}

function imgFemale(id) {
  const btnM = document.getElementById("btnM");
  const btnF = document.getElementById("btnF");
  const btnS = document.getElementById("btnS");
  const btnSF = document.getElementById("btnSF");
  const imgMF = document.getElementById("defFront");
  const imgMB = document.getElementById("defBack");
  const imgFF = document.getElementById("femaleFront");
  const imgFB = document.getElementById("femaleBack");
  const imgMSF = document.getElementById("shinyFront");
  const imgMSB = document.getElementById("shinyBack");
  const imgFSF = document.getElementById("femaleSFront");
  const imgFSB = document.getElementById("femaleSBack");

  if (id >= 29 && id<=31 && btnF.checked === false) {
    imgFF.classList.remove("ocultar");
    imgFB.classList.remove("ocultar");
    btnF.checked = true;
    imgFSF.classList.add("ocultar");
    imgFSB.classList.add("ocultar");
  }
  if (
    btnM.checked === false &&
    btnF.checked === false &&
    btnS.checked === false &&
    btnSF.checked === false
  ) {
    imgMF.classList.remove("ocultar");
    imgMB.classList.remove("ocultar");
    btnM.checked = true;
    imgFF.classList.add("ocultar");
    imgFB.classList.add("ocultar");
    imgFF.classList.add("ocultar");
    imgFB.classList.add("ocultar");
    imgMSF.classList.add("ocultar");
    imgMSB.classList.add("ocultar");
    imgFSF.classList.add("ocultar");
    imgFSB.classList.add("ocultar");
  } else {
    if (btnM.checked) {
      imgMF.classList.remove("ocultar");
      imgMB.classList.remove("ocultar");
    } else {
      imgMF.classList.add("ocultar");
      imgMB.classList.add("ocultar");
    }
    if (btnF.checked) {
      imgFF.classList.remove("ocultar");
      imgFB.classList.remove("ocultar");
    } else {
      imgFF.classList.add("ocultar");
      imgFB.classList.add("ocultar");
    }
    if (btnS.checked) {
      imgMSF.classList.remove("ocultar");
      imgMSB.classList.remove("ocultar");
    } else {
      imgMSF.classList.add("ocultar");
      imgMSB.classList.add("ocultar");
    }
    if (btnSF.checked) {
      imgFSF.classList.remove("ocultar");
      imgFSB.classList.remove("ocultar");
    } else {
      imgFSF.classList.add("ocultar");
      imgFSB.classList.add("ocultar");
    }
  }
}
