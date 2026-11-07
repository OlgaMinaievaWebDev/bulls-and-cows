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

  const baseLabel = document.createElement('label');
  baseLabel.textContent = 'Number system';
  baseLabel.htmlFor = 'number-system';

  const baseSelect = document.createElement('select');
  baseSelect.id = 'number-system';
  baseSelect.name = 'base';

  const numberSystems = [
    { label: 'Binary (bin)', value: 2 },
    { label: 'Octal (oct)', value: 8 },
    { label: 'Decimal (dec)', value: 10 },
    { label: 'Hexadecimal (hex)', value: 16 },
  ];

  numberSystems.forEach(({ label, value }) => {
    const option = document.createElement('option');
    option.value = String(value);
    option.textContent = label;
    baseSelect.append(option);
  });

  baseSelect.value = '10';

  baseSelect.addEventListener('change', () => {
    const base = Number(baseSelect.value);

    Array.from(lengthSelect.options).forEach((option) => {
      option.disabled = Number(option.value) > base;
    });

    if (Number(lengthSelect.value) > base) {
      lengthSelect.value = '2';
    }
  });

  container.append(heading, lengthLabel, lengthSelect, baseLabel, baseSelect);

  return container;
}
