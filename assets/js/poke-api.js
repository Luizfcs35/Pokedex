const pokeApi = {};

function convertPokemonApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon(); // nova estrutura criada

  pokemon.number = pokeDetail.id; // dando novos nomes aos dados da api
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;

  const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
  const [ability] = abilities;
  pokemon.abilities = abilities;
  pokemon.ability = ability;
  
  //const base = pokeDetail.stats.map((base) => base.base_stat);
  //pokemon.base_stat = [base];
  //const stats = pokeDetail.stats.map((statSlot) => statSlot.stat.name)
  //const [stat] = stats;
  //pokemon.stats = stats;
  //pokemon.stat = stat;

  pokemon.weight = pokeDetail.weight / 10;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokemonApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 12) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url) // Buscando uma lista via Api;
    .then((response) => response.json()) //retorno de uma promise em json();
    .then((jsonBody) => jsonBody.results) //usando os results com jsonBody(detalhes);
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail)) //mapeando uma lista com detalhes dos pokemons com um novo fetch
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
  //.catch((error) => console.error(error)) //tratamento de erros
};
