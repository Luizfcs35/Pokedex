const pokemonList = document.getElementById("pokemonList") // chamando a lista atraves do ID = pokemonList no html ,atraves do metodo.get
const loadMoreButton = document.getElementById("loadMore")

let offset = 0;
const limit = 12;
const limitMax = 151; // maixmo de pokemon mostrado


function loadPokemonList (offset, limit){
   
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {     //criando .then requisit para percorrer a lista e devolver um array com informações precisas.
        const newHtml = pokemons.map((pokemon) =>
        `   <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img    
                        src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join('')    // usando uma metodo map(mapeia os valores em lista), em cada pokemon, chamando a funcao e usando join para separar as informações dos pokemons;
        pokemonList.innerHTML += newHtml
            
    })
   
}

loadPokemonList (offset, limit)

loadMoreButton.addEventListener('click', () =>{
    offset += limit
    const maxPageContent = offset + limit

    if (maxPageContent >= limitMax) {
        const newLimit = limitMax - offset
        loadPokemonList (offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemonList (offset, limit)
    }   
})
    
