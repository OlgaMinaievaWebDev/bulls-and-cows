export function evaluateGuess(secret: string, guess: string) {
  const secretArray = secret.toLowerCase().split('');
  const guessArray = guess.toLowerCase().split('');
  const bullsDigits = secretArray.filter(
    (digit, index) => digit === guessArray[index],
  );
  const cowDigits = secretArray.filter(
    (digit, index) => digit !== guessArray[index] && guessArray.includes(digit),
  );

  return { bulls: bullsDigits.length, cows: cowDigits.length };
}
