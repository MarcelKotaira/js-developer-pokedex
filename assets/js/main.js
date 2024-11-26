const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.getElementById('pokeModal');
const closeBtn = document.getElementsByClassName('close-btn')[0];

const maxRecords = 351
const limit = 10
let offset = 0;
const pokemonListLi = []

function clearSelection() {
    const selected = document.getElementsByClassName('selected')
    for (let element of selected) {
        element.className = 'pokemon_menuIten'
    }
}

function carregarAbout(pokemon) {
    clearSelection()
    const about = document.getElementById('pokemon_about')
    about.classList.add('selected')
    const pokeBody = document.getElementById('pokeBody')
    pokeBody.innerHTML = `
        <div class="pokemon_lineDescription">
            <span class="pokemon_textTag">Height</span>
            <span class="pokemon_information">${pokemon.height} m</span>
        </div>
        <div class="pokemon_lineDescription">
            <span class="pokemon_textTag">Weight</span>
            <span class="pokemon_information">${pokemon.weight} kg</span>
        </div>
        <div class="pokemon_lineDescription">
            <span class="pokemon_textTag">Base Experience</span>
            <span class="pokemon_information">${pokemon.baseExperience} kg</span>
        </div>
        <div class="pokemon_lineDescription">
            <span class="pokemon_textTag">Abilities</span>
            <span class="pokemon_information">${pokemon.abilities.join(', ')}</span>
        </div>
    `
}

function colorStats(value, cat = 0) {
    if (cat == 1)
        return value <= 250 ? 'red' : value <= 500 ? 'green' : value < 600 ? 'blue' : 'gold'
    return value <= 50 ? 'red' : value <= 100 ? 'green' : value < 150 ? 'blue' : 'gold'
}

function carregarBaseStats(pokemon) {
    clearSelection()
    const baseStats = document.getElementById('pokemon_baseStats')
    baseStats.classList.add('selected')
    const pokeBody = document.getElementById('pokeBody')
    const hp_stats = (pokemon.baseStats[0].base_stat / 150 * 100).toFixed(0)
    const attack_stats = (pokemon.baseStats[1].base_stat / 150 * 100).toFixed(0)
    const defense_stats = (pokemon.baseStats[2].base_stat / 150 * 100).toFixed(0)
    const spAtk_stats = (pokemon.baseStats[3].base_stat / 150 * 100).toFixed(0)
    const spDef_stats = (pokemon.baseStats[4].base_stat / 150 * 100).toFixed(0)
    const speed_stats = (pokemon.baseStats[5].base_stat / 150 * 100).toFixed(0)
    const total = pokemon.baseStats.reduce((total, stats) => total + stats.base_stat, 0)
    const totalStats = (total / 600 * 100).toFixed(0)
    pokeBody.innerHTML = `
        <div class="pokemon_lineDescription">
            <span class="pokemon_textTag">HP</span>
            <span class="pokemon_statsInf">${pokemon.baseStats[0].base_stat}</span>
            <div class="progressBar">
                <span class="${colorStats(pokemon.baseStats[0].base_stat)}" style="width: ${hp_stats}%;" >
                </span>
            </div>
        </div>
        <div class="pokemon_lineDescription">
            <span class="pokemon_textTag">Attack</span>
            <span class="pokemon_statsInf">${pokemon.baseStats[1].base_stat}</span>
            <div class="progressBar">
                <span class="${colorStats(pokemon.baseStats[1].base_stat)}" style="width: ${attack_stats}%;" >
                </span>
            </div>
        </div>
        <div class="pokemon_lineDescription">
            <span class="pokemon_textTag">Defense</span>
            <span class="pokemon_statsInf">${pokemon.baseStats[2].base_stat}</span>
            <div class="progressBar">
                <span class="${colorStats(pokemon.baseStats[2].base_stat)}" style="width: ${defense_stats}%;" >
                </span>
            </div>
        </div>
        <div class="pokemon_lineDescription">
            <span class="pokemon_textTag">Sp. Atk</span>
            <span class="pokemon_statsInf">${pokemon.baseStats[3].base_stat}</span>
            <div class="progressBar">
                <span class="${colorStats(pokemon.baseStats[3].base_stat)}" style="width: ${spAtk_stats}%;" >
                </span>
            </div>
        </div>
        <div class="pokemon_lineDescription">
            <span class="pokemon_textTag">Sp. Def</span>
            <span class="pokemon_statsInf">${pokemon.baseStats[4].base_stat}</span>
            <div class="progressBar">
                <span class="${colorStats(pokemon.baseStats[4].base_stat)}" style="width: ${spDef_stats}%;" >
                </span>
            </div>
        </div>
        <div class="pokemon_lineDescription">
            <span class="pokemon_textTag">Speed</span>
            <span class="pokemon_statsInf">${pokemon.baseStats[5].base_stat}</span>
            <div class="progressBar">
                <span class="${colorStats(pokemon.baseStats[5].base_stat)}" style="width: ${speed_stats}%;" >
                </span>
            </div>
        </div>
        <div class="pokemon_lineDescription">
            <span class="pokemon_textTag">Total</span>
            <span class="pokemon_statsInf">${total}</span>
            <div class="progressBar">
                <span class="${colorStats(total, 1)}" style="width: ${totalStats}%;" >
                </span>
            </div>
        </div>
    `
}

function carregarEvolution(pokemon) {
    clearSelection()
    const evolution = document.getElementById('pokemon_evolution')
    evolution.classList.add('selected')
    const pokeBody = document.getElementById('pokeBody')
    pokeBody.innerHTML = 'Not implemented'

}

function carregarMoves(pokemon) {
    clearSelection()
    const moves = document.getElementById('pokemon_moves')
    moves.classList.add('selected')
    const pokeBody = document.getElementById('pokeBody')
    pokeBody.innerHTML = pokemon.moves.map((move) => `
        <div class="pokemon_lineDescription">
            <span class="pokemon_move">${move.move.name}</span>
        </div>
    `).join('')

}

function abrirPokeModal(pokemon) {
    modal.style.display = 'block';

    const closeBtn = document.getElementById('close-btn')
    closeBtn.onclick = () => {
        modal.style.display = 'none'
    }

    const modal_content = document.getElementById('modal_content')
    modal_content.className = 'modal-content ' + pokemon.type

    const name = document.getElementById('pokemon_name')
    name.innerText = pokemon.name
    const number = document.getElementById('pokemon_id')
    const pokeNumber = pokemon.number
    number.innerText = pokeNumber < 10 ? "#00" + pokeNumber : pokeNumber < 100 ? "#0" + pokeNumber : "#" + pokeNumber
    const types = document.getElementById('pokemon_types')
    types.innerText = ''
    pokemon.types.map((type) => {
        const typeLi = document.createElement('span')
        typeLi.className = "type " + type
        typeLi.innerHTML = type
        types.appendChild(typeLi)
    })

    const about = document.getElementById('pokemon_about')
    about.onclick = () => carregarAbout(pokemon)
    const baseStats = document.getElementById('pokemon_baseStats')
    baseStats.onclick = () => carregarBaseStats(pokemon)
    const evolution = document.getElementById('pokemon_evolution')
    evolution.onclick = () => carregarEvolution(pokemon)
    const moves = document.getElementById('pokemon_moves')
    moves.onclick = () => carregarMoves(pokemon)

    const img = document.getElementById('pokemon_photo')
    img.src = pokemon.photo
    img.alt = pokemon.name

    carregarAbout(pokemon)
}

function convertPokemonToLi(pokemon) {
    const li = document.createElement('li')
    li.className = "pokemon " + pokemon.type
    li.innerHTML = `
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
        </div>
    `
    li.addEventListener("click", () => abrirPokeModal(pokemon))

    pokemonListLi.push(li)
    return li
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.map(poke => pokemonList.appendChild(convertPokemonToLi(poke)))
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// Fechar o modal se o usuário clicar fora da área do modal
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
