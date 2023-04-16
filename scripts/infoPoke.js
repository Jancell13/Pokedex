import { tiposEs, cssTypes } from "./tipos.js";
import { idEvo } from "./evoFamily.js";
import { obj } from "./Obj.js";
const url = "https://pokeapi.co/api/v2/pokemon/";
const evoP = "https://pokeapi.co/api/v2/evolution-chain/";
var numP = "",
  tipos = "",
  color = "",
  preEvolucion = "",
  evolucion = "",
  evoEevee = "",
  evoEevee2 = "",
  evoEevee3 = "";
const selectPoke = localStorage.getItem(1);
const pokemonInfo = document.getElementById("pokemonInfo");
const uCF = selectPoke.charAt(0).toUpperCase() + selectPoke.slice(1);
window.sendName = sendName;
document.title = uCF;
0;
document.addEventListener("DOMContentLoaded", () => {
  connectionAPI(selectPoke);
});
function sendName(data) {
  if (data === "nidoran ♀️") {
    data = "nidoran-f";
  } else if (data === "nidoran ♂️") {
    data = "nidoran-m";
  }
  localStorage.setItem(1, data);
}
function numPokemon(id) {
  if (id < 10) {
    numP = "00" + id;
  } else if (id < 100) {
    numP = "0" + id;
  } else {
    numP = id;
  }
}

function bgPokemon(data) {
  const tipo1 = tiposEs[data.types[0].type.name];
  //uno o dos tipos elementales
  if (data.types[0] && data.types[1]) {
    const tipo2 = tiposEs[data.types[1].type.name];
    return (color = `linear-gradient(to bottom, ${cssTypes[tipo1]} 5%, ${cssTypes[tipo2]})`);
  } else {
    return (color = `${cssTypes[tipo1]}`);
  }
}

function metodoEvo(dataEvo) {
  if (dataEvo.evolution_details[0].min_level != null) {
    return `nivel ${dataEvo.evolution_details[0].min_level}`;
  }
  if (dataEvo.evolution_details[0].item != null) {
    return `${obj[dataEvo.evolution_details[0].item.name]}`;
  }
  if (dataEvo.evolution_details[0].trigger.name === "trade") {
    return "Intercambio";
  }
}

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
    if (dataEvo.chain.evolves_to[0] && dataEvo.id != 67) {
      if (dataEvo.chain.species.name === data.name) {
        const evo1 = await fetch(
          url + dataEvo.chain.evolves_to[0].species.name
        );
        const dataEvo1 = await evo1.json();
        if (dataEvo1.id <= 151) {
          numPokemon(dataEvo1.id);
          bgPokemon(dataEvo1);

          evolucion = `
              <div class="cardPoke" style="background:${color}">
                <a href="pokemonInfo.html" class="infoP" onclick="sendName('${
                  dataEvo1.name
                }')"></a>
                <h2>Evoluciona en:</h2>
                <img src="${dataEvo1.sprites.front_default}">
                <h3>${dataEvo1.name.toUpperCase()}</h3>
                <p>metodo: ${metodoEvo(dataEvo.chain.evolves_to[0])}</p>
              </div>
              `;
        } else {
          evolucion = "";
        }
      }
      if (dataEvo.chain.evolves_to[0].species.name === data.name) {
        const preEvo = await fetch(url + dataEvo.chain.species.name);
        const dataPreEvo = await preEvo.json();
        if (dataEvo.chain.evolves_to[0].evolves_to[0]) {
          const evo2 = await fetch(
            url + dataEvo.chain.evolves_to[0].evolves_to[0].species.name
          );
          const dataEvo2 = await evo2.json();
          if (dataPreEvo.id <= 151) {
            numPokemon(dataPreEvo.id);
            bgPokemon(dataPreEvo);
            preEvolucion = `<div class="cardPoke" style="background:${color}">
              <a href="pokemonInfo.html" class="infoP" onclick="sendName('${
                dataPreEvo.name
              }')"></a>
              <h2>Evolucion de:</h2>
              <img src="${dataPreEvo.sprites.front_default}">
              <h3>${dataPreEvo.name.toUpperCase()}</h3>
              <p>metodo: ${metodoEvo(dataEvo.chain.evolves_to[0])}</p>
            </div>`;
          } else {
            preEvolucion = "";
          }
          if (dataEvo2.id <= 151) {
            numPokemon(dataEvo2.id);
            bgPokemon(dataEvo2);
            evolucion = `
                <div class="cardPoke" style="background:${color}">
                  <a href="pokemonInfo.html" class="infoP" onclick="sendName('${
                    dataEvo2.name
                  }')"></a>
                  <h2>Evoluciona en:</h2>
                  <img src="${dataEvo2.sprites.front_default}">
                  <h3>${dataEvo2.name.toUpperCase()}</h3>
                  <p>metodo: ${metodoEvo(
                    dataEvo.chain.evolves_to[0].evolves_to[0]
                  )}</p>
                </div>
              `;
          } else {
            evolucion = "";
          }
        } else {
          if (dataPreEvo.id <= 151) {
            preEvolucion = `<div class="cardPoke" style="background:${color}">
              <a href="pokemonInfo.html" class="infoP" onclick="sendName('${
                dataPreEvo.name
              }')"></a>
              <h2>Evolucion de:</h2>
              <img src="${dataPreEvo.sprites.front_default}">
              <h3>${dataPreEvo.name.toUpperCase()}</h3>
              <p>metodo: ${metodoEvo(dataEvo.chain.evolves_to[0])}</p>
            </div>`;
          }
        }
      }
      if (dataEvo.chain.evolves_to[0].evolves_to[0]) {
        if (
          dataEvo.chain.evolves_to[0].evolves_to[0].species.name === data.name
        ) {
          const preEvo = await fetch(
            url + dataEvo.chain.evolves_to[0].species.name
          );
          const dataPreEvo = await preEvo.json();
          numPokemon(dataPreEvo.id);
          bgPokemon(dataPreEvo);

          preEvolucion = `<div class="cardPoke" style="background:${color}">
              <a href="pokemonInfo.html" class="infoP" onclick="sendName('${
                dataPreEvo.name
              }')"></a>
              <h2>Evolucion de:</h2>
              <img src="${dataPreEvo.sprites.front_default}">
              <h3>${dataPreEvo.name.toUpperCase()}</h3>
              <p>metodo: ${metodoEvo(
                dataEvo.chain.evolves_to[0].evolves_to[0]
              )}</p>
            </div>`;
        }
      }
    } else {
      try {
        if (dataEvo.id === 67) {
          if (dataEvo.chain.species.name === data.name) {
            const eevee1 = await fetch(
              url + dataEvo.chain.evolves_to[0].species.name
            );
            const dataEevee1 = await eevee1.json();
            const eevee2 = await fetch(
              url + dataEvo.chain.evolves_to[1].species.name
            );
            const dataEevee2 = await eevee2.json();
            const eevee3 = await fetch(
              url + dataEvo.chain.evolves_to[2].species.name
            );
            const dataEevee3 = await eevee3.json();

            evoEevee = `
              <div class="cardPoke" style="background:${bgPokemon(dataEevee1)}">
                <a href="pokemonInfo.html" class="infoP" onclick="sendName('${
                  dataEevee1.name
                }')"></a>
                <h3>Evoluciona en:</h3>
                <img src="${dataEevee1.sprites.front_default}">
                <h3>${dataEevee1.name.toUpperCase()}</h3>
                <p>metodo: ${metodoEvo(dataEvo.chain.evolves_to[0])}</p>
              </div>
              `;
            evoEevee2 = `<div class="cardPoke" style="background:${bgPokemon(
              dataEevee2
            )}">
                <a href="pokemonInfo.html" class="infoP" onclick="sendName('${
                  dataEevee2.name
                }')"></a>
                <h3>Evoluciona en:</h3>
                <img src="${dataEevee2.sprites.front_default}">
                <h3>${dataEevee2.name.toUpperCase()}</h3>
                <p>metodo: ${metodoEvo(dataEvo.chain.evolves_to[1])}</p>
              </div>`;
            evoEevee3 = `
              <div class="cardPoke" style="background:${bgPokemon(dataEevee3)}">
                <a href="pokemonInfo.html" class="infoP" onclick="sendName('${
                  dataEevee3.name
                }')"></a>
                <h3>Evoluciona en:</h3>
                <img src="${dataEevee3.sprites.front_default}">
                <h3>${dataEevee3.name.toUpperCase()}</h3>
                <p>metodo: ${metodoEvo(dataEvo.chain.evolves_to[2])}</p>
              </div>
              `;
          }
        }
        if (
          dataEvo.chain.evolves_to[0].species.name === data.name ||
          dataEvo.chain.evolves_to[1].species.name === data.name ||
          dataEvo.chain.evolves_to[2].species.name === data.name
        ) {
          const preEvo = await fetch(url + dataEvo.chain.species.name);
          const dataPreEvo = await preEvo.json();
          if (dataPreEvo.id <= 151) {
            numPokemon(dataPreEvo.id);
            bgPokemon(dataPreEvo);
            preEvolucion = `<div class="cardPoke" style="background:${color}">
                  <a href="pokemonInfo.html" class="infoP" onclick="sendName('${
                    dataPreEvo.name
                  }')"></a>
                  <h2>Evolucion de:</h2>
                  <img src="${dataPreEvo.sprites.front_default}">
                  <h3>${dataPreEvo.name.toUpperCase()}</h3>
                  <p>metodo: ${metodoEvo(dataEvo.chain.evolves_to[0])}</p>
                </div>`;
          } else {
            preEvolucion = "";
          }
        }
      } catch (error) {
        console.error(error);
        loaderPokeball.classList.add("ocultar");
        showError("Ha ocurrido un error al mostrar los datos del pokemon");
      }
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

    loaderPokeball.classList.add("ocultar");
  } catch (error) {
    console.error(error);
    loaderPokeball.classList.add("ocultar");
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
  pokemonInfo.innerHTML = `<p>${msg}</p>`;
}

function createDiv(data) {
  const tipo1 = tiposEs[data.types[0].type.name];
  const cssSpan1 = `style="background: ${cssTypes[tipo1]}"`;

  //uno o dos tipos elementales
  if (data.types[0] && data.types[1]) {
    const tipo2 = tiposEs[data.types[1].type.name];
    const cssSpan2 = `style="background: ${cssTypes[tipo2]}"`;
    tipos = `<span ${cssSpan1} id="${tipo1}">${tipo1}</span> - <span ${cssSpan2} id="${tipo2}">${tipo2}</span>`;
    pokemonInfo.style.background = `linear-gradient(to bottom, ${cssTypes[tipo1]} 5%, ${cssTypes[tipo2]})`;
  } else {
    tipos = `<span ${cssSpan1} id="${tipo1}">${tipo1}</span>`;
    pokemonInfo.style.background = `${cssTypes[tipo1]}`;
  }

  if (data.name === "nidoran-f") {
    data.name = "nidoran ♀️";
  } else if (data.name === "nidoran-m") {
    data.name = "nidoran ♂️";
  }
  numPokemon(data.id);
  pokemonInfo.innerHTML = `
  
  <div class ="genContainer">
    <div class="btns" id="genM">
      <input type="checkbox" name="btn-M" id="btnM" checked>
      <img src="${data.sprites.front_default}" id="defFront">
      <img src="${data.sprites.back_default}" id="defBack">
    </div>
  
    <div class="btns" id="genF"> 
        <input type="checkbox" name="btn-F" id="btnF">
        <img src="${
          data.sprites.front_female
        }" id="femaleFront" class="ocultar">
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
    </div>
    <div id="pokedexContainer">
    ${preEvolucion}
    ${evolucion}
    ${evoEevee}
    ${evoEevee2}
    ${evoEevee3}
    </div>
  </div>
    <div class="btnContainer">
      <button class="volver" onclick="{location.href='./'; localStorage.clear();}"><img src="assets/Unown-X.webp" height="48" width="48"/></button>
    </div>
  `;

  if (data.id >= 29 && data.id <= 31) {
    document.getElementById("btnF").checked = true;
    imgFemale();
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

function imgFemale() {
  const genM = document.getElementById("genM");
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

  if (
    btnF.checked === false &&
    btnSF.checked === false &&
    genM.classList.contains("ocultar")
  ) {
    imgFF.classList.remove("ocultar");
    imgFB.classList.remove("ocultar");
    btnF.checked = true;
    imgFSF.classList.add("ocultar");
    imgFSB.classList.add("ocultar");
  } else {
    if (btnF.checked) {
      imgFF.classList.remove("ocultar");
      imgFB.classList.remove("ocultar");
    } else {
      imgFF.classList.add("ocultar");
      imgFB.classList.add("ocultar");
    }
    if (btnSF.checked) {
      imgFSF.classList.remove("ocultar");
      imgFSB.classList.remove("ocultar");
    } else {
      imgFSF.classList.add("ocultar");
      imgFSB.classList.add("ocultar");
    }
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
