const pokemonContainer = document.getElementById('poke-container');
const teamNameInput = document.getElementById('name');


fetch('https://pokeapi.co/api/v2/pokemon?limit=151') // obtem data.
    .then(response => response.json())
    .then(data => {
        const pokemons = data.results.slice(0, 151); // Manipula os dados da obtidos da resposta.

        pokemons.forEach(pokemon => {
            fetchPokemonDetails(pokemon.url); //é chamada para obter mais dados dos pokemons.
        });
    });

function fetchPokemonDetails(url) { //é chamada para obter detalhes específicos dos pokemons, como imagem, nome e etc.
    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            createPokemonCard(pokemon); //cria uma div para representar uma card de pokemon
        });
}

function createPokemonCard(pokemon) { // chamada para criar um elemento Html.
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img'); // adiciona a imagem
    image.src = pokemon.sprites.front_default;

    const name = document.createElement('p'); // adiciona o nome
    name.textContent = pokemon.name;

    const id = document.createElement('p'); // adiciona o ID
    id.textContent = `ID: ${pokemon.id}`;

    const types = document.createElement('p');
    types.textContent = `Type: ${pokemon.types.map(type => type.type.name).join(', ')}`;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(types);
    // .appendChild usado para anexar os elementos na div.
    card.onclick = function () {
        addToTeam(pokemon);
    };

    pokemonContainer.appendChild(card);
}

function addToTeam(pokemon) { // é chamada quando um pokemon é clicado
    const selectedPokemons = JSON.parse(localStorage.getItem('selectedPokemons')) || []; // armazena em uma array.

    if (selectedPokemons.length < 6) { // verifica se o numero de pokemons selecionados está abaixo de 6.
        selectedPokemons.push({
            id: pokemon.id,
            name: pokemon.name,
            type: pokemon.types.map(type => type.type.name).join(', '),
        });

        localStorage.setItem('selectedPokemons', JSON.stringify(selectedPokemons)); //adiciona o pokemon na array

        alert(`Pokemon ${pokemon.name} adicionado ao time!`);
    } else {
        alert('Você atingiu o limite de 6 pokémons!');
    }
}

function saveTeam() { // chamado quando o botão "Salvar time" é clicado
    const teamName = teamNameInput.value;
    const selectedPokemons = JSON.parse(localStorage.getItem('selectedPokemons')) || [];

    if (teamName && selectedPokemons.length > 0) { //verifica se pelo menos um pokemon foi selecionado e o nome do time foi colocado.
        const teamData = {
            name: teamName,
            pokemons: selectedPokemons,
        };

        const teamDataUrl = encodeURIComponent(JSON.stringify(teamData));
        window.location.href = `teams.html?team=${teamDataUrl}`;
    } else {
        alert('dê um nome ao time e selecione pelo menos um pokémon.');
    }
}
