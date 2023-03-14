function traerPokemon() {
  return new Promise((response) => {
    let urlPoke = localStorage.urlPoke;
    fetch(urlPoke)
      .then((response) => response.json())
      .then((data) => {
        // llamado al sprite para el icono
        let icon =
          data.sprites.versions["generation-v"]["black-white"].animated
            .front_default;
        document.getElementById("icon").href = icon;
        // llamado al nombre del pokemon para el titulo
        document.getElementById(
          "tituloPokemon"
        ).innerHTML = `${data.name.toUpperCase()}`;
        // llamado a la imagen para la carta
        let imagen = data.sprites.other["official-artwork"].front_default;

        let detalles = [];
        let mov1 = `${data.moves[0].move.url}`;
        let mov2 = `${data.moves[1].move.url}`;
        let mov3 = `${data.moves[2].move.url}`;
        let hab1 = `${data.abilities[0].ability.url}`;
        let hab2 = `${data.abilities[1].ability.url}`;

        fetch(mov1)
          .then(function (response) {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error en la solicitud");
            }
          })
          .then(function (detalles) {
            detalles1 = detalles;
            let precision = detalles1.accuracy;
            let daño = detalles1.power;

            // segunda cochinada de fetch

            fetch(mov2)
              .then(function (response) {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error("Error en la solicitud");
                }
              })
              .then(function (detalles) {
                detalles2 = detalles;
                let precision = detalles2.accuracy;
                let daño = detalles2.power;

                // tercer cochinada de fetch

                fetch(mov3)
                  .then(function (response) {
                    if (response.ok) {
                      return response.json();
                    } else {
                      throw new Error("Error en la solicitud");
                    }
                  })
                  .then(function (detalles) {
                    detalles3 = detalles;
                    let precision = detalles3.accuracy;
                    let daño = detalles3.power;

                    // cuarta cochinada de fetch
                    fetch(hab1)
                      .then(function (response) {
                        if (response.ok) {
                          return response.json();
                        } else {
                          throw new Error("Error en la solicitud");
                        }
                      })
                      .then(function (detalles) {
                        detalles4 = detalles;

                        // quinta y ultima cochinada de fetch
                        fetch(hab2)
                          .then(function (response) {
                            if (response.ok) {
                              return response.json();
                            } else {
                              throw new Error("Error en la solicitud");
                            }
                          })
                          .then(function (detalles) {
                            detalles5 = detalles;

                            // Creación de la carta con la información
                            document.getElementById("cajaPokemon").innerHTML = `
                <div class="card" style="max-width: 720px; heigh: 500px; margin: auto auto auto auto">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <img src="${imagen}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body">
                                <h5 class="card-title text-uppercase">${
                                  data.name
                                }</h5>
                                <p class="card-text">Altura: ${(
                                  data.height * 0.1
                                ).toFixed(1)}Mts</p>
                                <p class="card-text">Peso: ${(
                                  data.weight * 0.1
                                ).toFixed(1)}Kgs</p>
                                <p class="card-text">Habilidades:
                                    <ul style="margin: -2.5em 0 0 6em;">
                                    <li>${detalles4.names[5].name}</li>
                                    <li>${detalles5.names[5].name}</li>
                                    
                                    </ul>
                                    </p>
                                <p class="card-text">Movimientos:
                                    <ul style="margin: -2.5em 0 0 6em;">
                                        <li>${detalles1.names[5].name}(${
                              detalles1.accuracy
                            })(${detalles1.power})</li>
                                        <li>${detalles2.names[5].name}(${
                              detalles2.accuracy
                            })(${detalles2.power})</li>
                                        <li>${detalles3.names[5].name}(${
                              detalles3.accuracy
                            })(${detalles3.power})</li>
                                        
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`;
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  });
}
