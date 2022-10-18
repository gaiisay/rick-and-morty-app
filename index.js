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

async function fetchCharacters(currentPage) {
  try {
    const response = await fetch(apiUrl + `?page=${currentPage}`);
    if (!response.ok) {
      throw new Error(response.status + ': fetching data failed!');
    }
    const characters = await response.json();
    console.log();
    maxPage = characters.info.pages;
    // console.log(characters);
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

nextButton.addEventListener('click', () => {
  console.log('next button clicked ' + page + ' ' + maxPage);
  if (page < maxPage) {
    page++;
    fetchCharacters(page);
  }
});

prevButton.addEventListener('click', () => {
  if (page > 1) {
    page--;
    fetchCharacters(page);
  }
});

fetchCharacters(page);
