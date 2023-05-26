const pokemonList = document.getElementById("pokemonList"); // chamando a lista atraves do ID = pokemonList no html ,atraves do metodo.get
const loadMoreButton = document.getElementById("loadMore");

let offset = 0;
const limit = 12;
const limitMax = 151; // maixmo de pokemon mostrado

function loadPokemonList(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    //criando .then requisit para percorrer a lista e devolver um array com informações precisas.
    const newHtml = pokemons
      .map(
        (pokemon) =>
          `   <li class="pokemon ${pokemon.type}">
                <div class="info">
                    <span class="name">${pokemon.name}</span>
                    <span class="number"> # 0${pokemon.number}</span>
                </div>
                <img    
                src="${pokemon.photo}" 
                alt="${pokemon.name}">    
                <div class="detail">
                    <ol class="types">
                        <h6>Type</h6>
                        ${pokemon.types
                          .map(
                            (type) => `<li class="type ${type}">${type}</li>`
                          )
                          .join("")}
                    </ol>
                    <ol class="abilities">
                    <h6>Ability</h6>
                        ${pokemon.abilities
                          .map(
                            (ability) =>
                              `<li class="ability ${ability}">${ability}</li>`
                          )
                          .join("")}
                    </ol>

                    <ol class="weight">
                    <h6>Weight</h6>
                    <li>${pokemon.weight.toFixed(1)} kg</li> 
                    </ol>
                </div>
            </li>
        `
      )
      .join(""); // usando uma metodo map(mapeia os valores em lista), em cada pokemon, chamando a funcao e usando join para separar as informações dos pokemons;
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonList(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const maxPageContent = offset + limit;

  if (maxPageContent >= limitMax) {
    const newLimit = limitMax - offset;
    loadPokemonList(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonList(offset, limit);
  }
});
