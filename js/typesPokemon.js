document.addEventListener("load", listPokemons());

const pokemon = [];
function getUrlParam(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

function listPokemons() {
  let listaPokemon = "";
  const pokemonType = getUrlParam("type");
  fetchPokemons(pokemonType).then((response) => {
    response.forEach((element) => {
      listaPokemon += `<div class="card mx-3 mb-3" style="width: 18rem;"><a onclick="urlPoke('${element.pokemon.url}')" style="text-decoration: none; color: black;" href="pokemon.html">
                <img id="img${element.pokemon.name}" src="" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center text-uppercase">${element.pokemon.name}</h5>
                    <div class="space-around">
                        <p id="peso${element.pokemon.name}" class="card-text"></p>
                        <p class="text-uppercase" style="text-decoration: none; color: black;" id="tipo${element.pokemon.name}" class="card-text"></p>
                    </div>
                </div>
                </a>
                </div>`;
    });
    document.getElementById("listPokemon").innerHTML = listaPokemon;
    detallePokemon(response);
  });
}

function fetchPokemons(type) {
  return new Promise((resolve) => {
    fetch(`${constants.APIURL}/type/${type}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.pokemon);
      });
  });
}
function detallePokemon(pokemon) {
  const categoria = getUrlParam("name")
  pokemon.forEach((element) => {
    fetch(element.pokemon.url)
      .then((response) => response.json())
      .then((data) => {
        let imagen = data.sprites.other["official-artwork"].front_default;
        let altura = data.height;
        let peso = data.weight;
        let numero = data.order;
        document.getElementById(`img${element.pokemon.name}`).src = imagen;
        document.getElementById(
          `peso${element.pokemon.name}`
        ).innerText = `Numero: ${numero} \n Altura: ${(altura * 0.1).toFixed(
          1
        )}Metros \n Peso: ${(peso * 0.1).toFixed(1)}Kgs`;

        let tipos = "Tipo: ";
        data.types.forEach((cat) => {
            console.log(cat)
          if (cat.type.name == categoria) {
            tipos += `${cat.type.url} `;
          } else {
            tipos += `<a onclick="localUrlPoke('${cat.type.url}')" href="typesPokemon.html">${cat.type.name} </a>`;
          }
        });
        document.getElementById(`tipo${element.pokemon.name}`).innerHTML = tipos;
      });
  });
}

function localUrlPoke(urlType) {
  localStorage.setItem("url", urlType);
}

function infoPokemon(urlPokemon) {
  fetch(urlPokemon.pokemon.url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(`img${urlPokemon.pokemon.name}`).src =
        data.sprites.other["official-artwork"].front_default;
    });
}

function urlPoke(urlPokemon) {
  localStorage.urlPoke = urlPokemon;
}
