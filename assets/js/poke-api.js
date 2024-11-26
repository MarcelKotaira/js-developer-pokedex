function capitalizeWords(str) {
    return str.replace(/\b\w/g, function(char) {
      return char.toUpperCase();
    });
  }

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {

    console.log(pokeDetail)
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height / 10 // The height of this Pokémon in decimetres. From Decimeter to Meter divide by 10
    pokemon.weight = pokeDetail.weight / 10 // The weight of this Pokémon in hectograms. From Hectogram to Kilogram divide by 10
    pokemon.baseExperience = pokeDetail.base_experience
    pokemon.abilities = pokeDetail.abilities.map((ability) => capitalizeWords(ability.ability.name))

    pokemon.baseStats = pokeDetail.stats

    pokemon.moves = pokeDetail.moves
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
