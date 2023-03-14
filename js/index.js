document.addEventListener("load", slideCatPokemon());
// document.addEventListener("load", loadAllPokemon());

const valores = []
let categorias = []
var arregloPokemon = []

function getTypePokemon() {
  return new Promise((resolve) => {
    fetch(`${constants.APIURL}/type`)
      .then((response) => response.json())
      .then((data) => {
          categorias = data.results;
      
        resolve("Categorias OK")
      })
  })
}



function slideCatPokemon() {
  getTypePokemon().then(() => {
    let categoria
    categorias.forEach((element, index) => {
      const pokemonId = element.url.split("/")[6];
      if (index == 0) {
        active = "active"
      
      } else {
        active = ""
      }
      categoria += `<div class="carousel-item ${active}">
                        <div class="col-md-2">
                          <div class="card rounded-circle">
                            <div class="card-img">
                              <a href="typesPokemon.html?type=${pokemonId}&name=${element.name}">
                                <img src="../svgs/added/pokeball-pokemon-svgrepo-com.svg" class="img-fluid">
                              </a>
                              <div style="-webkit-text-stroke: 1.5px #000000" class="card-img-overlays text-white">${element.name}</div>
                            </div>
                          </div>
                        </div>
                      </div>`
    })
    document.getElementById("carou").innerHTML = categoria;
    flipCarrousel()
  })
}

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

// function loadAllPokemon() {
//   fetch()
//   .then((response) => response.json())
//   .then(data => {
//     console.log(data.results)
//     arregloPokemon = Object.values(data.results) 
//   })
// }

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