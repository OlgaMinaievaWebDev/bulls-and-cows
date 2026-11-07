export function renderSettings(): HTMLElement {
  const container = document.createElement('main');
  const heading = document.createElement('h1');
  heading.textContent = 'Bulls and Cows';

  const lengthLabel = document.createElement('label');
  lengthLabel.textContent = 'Secret length';
  lengthLabel.htmlFor = 'secret-length';

  const lengthSelect = document.createElement('select');
  lengthSelect.id = 'secret-length';
  lengthSelect.name = 'length';

  [2, 3, 4, 5, 6].forEach((length) => {
    const option = document.createElement('option');
    option.value = String(length);
    option.textContent = String(length);
    lengthSelect.append(option);
  });

  lengthSelect.value = '4';

  container.append(heading, lengthLabel, lengthSelect);

  return container;
}
