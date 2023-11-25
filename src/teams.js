const teamContainer = document.getElementById('team-container');


const urlParams = new URLSearchParams(window.location.search);
const teamDataUrl = urlParams.get('team');
const teamData = JSON.parse(decodeURIComponent(teamDataUrl));


if (teamData) {
    document.write(`<h2>${teamData.name}</h2>`);
    teamData.pokemons.forEach(pokemon => {
        renderTeamCard(pokemon);
    });
} else {
    document.write('<h2>Nenhum time encontrado.</h2>');
}

function renderTeamCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card', 'team-card');

    const name = document.createElement('p');
    name.textContent = pokemon.name;

    const id = document.createElement('p');
    id.textContent = `ID: ${pokemon.id}`;

    const types = document.createElement('p');
    types.textContent = `Type: ${pokemon.type}`;

    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(types);

    teamContainer.appendChild(card);
}
