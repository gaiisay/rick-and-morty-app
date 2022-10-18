import {createCharacterCard} from './components/card/card.js';
import {createButton} from './components/nav-button/nav-button.js';
import {createPagination} from './components/nav-pagination/nav-pagination.js';

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = createButton(getPreviousPage, 'previous');
const nextButton = createButton(getNextPage, 'next');
const pagination = createPagination();
const apiUrl = 'https://rickandmortyapi.com/api/character';

// States
let maxPage = 1;
let page = 1;
let searchQuery = '';

fetchCharacters(page);
navigation.append(prevButton, pagination, nextButton);

async function fetchCharacters() {
  try {
    const response = await fetch(apiUrl + `?page=${page}&name=${searchQuery}`);
    if (!response.ok) {
      throw new Error(response.status + ': fetching data failed!');
    }
    const characters = await response.json();
    maxPage = characters.info.pages;
    console.log(characters);
    cardContainer.innerHTML = '';
    characters.results.forEach(character => {
      const characterCard = createCharacterCard(character);
      cardContainer.append(characterCard);
    });
    pagination.textContent = `${page} / ${maxPage}`;
  } catch (error) {
    console.error(error);
  }
}

function getNextPage() {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
}

function getPreviousPage() {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
}

function search(event) {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  page = 1;
  fetchCharacters();
  //event.target.reset();
}
