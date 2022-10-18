export function createButton(onClick, btnText) {
  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = btnText;

  button.addEventListener('click', onClick);

  return button;
}
