import {createCharacterCard} from './components/card/card.js';

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');
const apiUrl = 'https://rickandmortyapi.com/api/character';

// States
let maxPage = 1;
let page = 1;
let searchQuery = '';

async function fetchCharacters() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(response.status + ': fetching data failed!');
    }
    const characters = await response.json();
    // console.log(characters);
    cardContainer.innerHTML = '';
    characters.results.forEach(character => {
      const characterCard = createCharacterCard(character);
      cardContainer.append(characterCard);
    });
  } catch (error) {
    console.error(error);
  }
}
fetchCharacters();
