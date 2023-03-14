const valores = []
const categorias = []
var arregloPokemon = []

function getTypePokemon() {
  return new Promise((resolve) => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((element) => {
          categorias.push(element)
        })
        resolve("Categorias OK")
      })
  })
}

function slideCatPokemon() {
  getTypePokemon().then((response) => {
    let categoria
    categorias.forEach((element, index) => {
      if (index == 0) {
        categoria += `<div class="carousel-item active">
                        <div class="col-md-2">
                          <div class="card rounded-circle">
                            <div class="card-img">
                              <a onclick="localUrlPokemon('${element.url}')" href="typesPokemon.html">
                                <img src="../svgs/added/pokeball-pokemon-svgrepo-com.svg" class="img-fluid">
                              </a>
                              <div style="-webkit-text-stroke: 1.5px #000000" class="card-img-overlays text-white">${element.name}</div>
                            </div>
                            
                          </div>
                        </div>
                      </div>`
      } else {
        categoria += `<div class="carousel-item">
                        <div class="col-md-2">
                          <div class="card rounded-circle">
                            <div class="card-img">
                              <a onclick="localUrlPokemon('${element.url}')" href="typesPokemon.html">
                                <img src="../svgs/added/pokeball-pokemon-svgrepo-com.svg" class="img-fluid">
                              </a>
                              <div style="-webkit-text-stroke: 1.5px #000000" class="card-img-overlays text-white">${element.name}</div>
                            </div>
                            
                          </div>
                        </div>
                      </div>`
      }
    })
    document.getElementById("carou").innerHTML = categoria;
    flipCarrousel()
  })
}

slideCatPokemon()

function flipCarrousel() {
  let myCarousel = document.querySelectorAll(
    ".carousel-item"
  )
  myCarousel.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling;
    for (var i = 1; i < minPerSlide; i++) {
      if (!next) {
        next = myCarousel[0]
      }
      let cloneChild = next.cloneNode(true)
      el.appendChild(cloneChild.children[0])
      next = next.nextElementSibling
    }
  })  
}

function localUrlPokemon(urlType) {
  localStorage.setItem("url", urlType)
}

// Buscador

function loadAllPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
  .then((response) => response.json())
  .then(data => {
    console.log(data.results)
    arregloPokemon = Object.values(data.results) 
  })
}

function autoCompletePokemon() {
  let textoBuscar = document.getElementById("txtBuscar").value
  if (textoBuscar.length >= 3) {
    const filtroPokemon = arregloPokemon.filter(filtrarPokemon)
    console.log(filtroPokemon)
  }
  
}

function filtrarPokemon(element) {
  let textoBuscar = document.getElementById("txtBuscar").value
  let nombre = element.name
  return nombre.includes(textoBuscar.toLowerCase())
}