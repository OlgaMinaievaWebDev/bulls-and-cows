import { describe, it, expect } from 'vitest';
import { evaluateGuess } from '../src/game/evaluateGuess';

describe('evaluateGuess', () => {
  it('returns four bulls when all digits match in the correct positions', () => {
    const result = evaluateGuess('1234', '1234');
    expect(result).toEqual({ bulls: 4, cows: 0 });
  });

  it('returns zero bulls and zero cows when all digits do not match', () => {
    const result = evaluateGuess('1234', '5678');
    expect(result).toEqual({ bulls: 0, cows: 0 });
  });

  it('returns zero bulls and four cows when all digits match in the wrong positions', () => {
    const result = evaluateGuess('1234', '4321');
    expect(result).toEqual({ bulls: 0, cows: 4 });
  });

  it('returns two bulls and two cows when two digits match in the correct positions and two digit do not match the correct position', () => {
    const result = evaluateGuess('1234', '1243');
    expect(result).toEqual({ bulls: 2, cows: 2 });
  });

  it('treats uppercase and lowercase hex digits equally', () => {
    const result = evaluateGuess('a1b2', 'A1B2');
    expect(result).toEqual({ bulls: 4, cows: 0 });
  });
});
