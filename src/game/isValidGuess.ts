import createDigitValidator from './createDigitValidator';

export default function isValidGuess(
  guess: string,
  length: number,
  base: number,
) {
  const normalizedGuess = guess.toLowerCase();
  const isAllowedDigit = createDigitValidator(base);
  const hasCorrectLength = normalizedGuess.length === length;
  const hasValidDigits = normalizedGuess.split('').every(isAllowedDigit);
  const hasUniqueDigits =
    new Set(normalizedGuess).size === normalizedGuess.length;
  return hasCorrectLength && hasValidDigits && hasUniqueDigits;
}
