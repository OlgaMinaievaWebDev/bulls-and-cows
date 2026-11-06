export default function createDigitValidator(base: number) {
  const digitAlphabet = '0123456789abcdef';
  const allowedDigits = digitAlphabet.slice(0, base);

  return (char: string) => {
    return char.length === 1 && allowedDigits.includes(char.toLowerCase());
  };
}
