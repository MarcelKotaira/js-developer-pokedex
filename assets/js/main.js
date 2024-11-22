const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.getElementById('pokeModal');
const closeBtn = document.getElementsByClassName('close-btn')[0];

const maxRecords = 151
const limit = 10
let offset = 0;
const pokemonListLi = []

function abrirPokeModal(pokemon) {
    modal.style.display = 'block';

    const closeBtn = document.createElement('span')
    closeBtn.className = 'close-btn'
    closeBtn.innerText = '←'
    closeBtn.onclick = () => {
        modal.style.display = 'none'
    }

    const name = document.createElement('span')
    name.className = 'name'
    name.innerText = pokemon.name
    const number = document.createElement('span')
    number.className = 'number'
    const pokeNumber = pokemon.number
    number.innerText = pokeNumber < 10 ? "#00" + pokeNumber : pokeNumber < 100 ? "#0" + pokeNumber : "#" + pokeNumber
    const types = document.createElement('div')
    types.className = 'typesInLine'
    pokemon.types.map((type) => {
        const typeLi = document.createElement('span')
        typeLi.className = "type " + type
        typeLi.innerHTML = type
        types.appendChild(typeLi)
    })
    name.innerText = pokemon.name
    const modalHeader = document.createElement('div')
    modalHeader.className = 'modal-header'
    modalHeader.appendChild(name)
    modalHeader.appendChild(number)
    modalHeader.appendChild(types)

    const bodyText = document.createElement('p')
    bodyText.innerHTML = "Conteúdo do Pokemon"
    const img = document.createElement('img')
    img.className = 'image_pokemon'
    img.src = pokemon.photo
    img.alt = pokemon.name
    const modalBody = document.createElement('div')
    modalBody.className = 'modal-body'
    modalBody.appendChild(img)
    modalBody.appendChild(bodyText)

    const content = document.createElement('div')
    content.className = `modal-content ${pokemon.type}`
    content.appendChild(closeBtn)
    content.appendChild(modalHeader)
    content.appendChild(modalBody)

    modal.innerHTML = ""
    modal.appendChild(content)
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
