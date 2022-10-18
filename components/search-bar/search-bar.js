export function createSearchBar(onSubmit, onReset) {
  const form = document.createElement('form');
  form.classList.add('search-bar');

  form.innerHTML = `
        <input
            name="query"
            class="search-bar__input"
            type="text"
            placeholder="search characters"
            aria-label="character name"
        />
        <button type="submit" class="search-bar__button" aria-label="search for character">
            <img
                class="search-bar__icon"
                src="assets/magnifying-glass.png"
                alt=""
            />
        </button>
        <button type="reset" class="search-bar__button" aria-label="reset form" data-js="reset-button">
            <img
                class="reset__icon"
                src="assets/close.png"
                alt=""
            />
        </button>`;

  form.addEventListener('submit', onSubmit);
  form.addEventListener('reset', onReset);

  return form;
}
