import { describe, it, expect } from 'vitest';
import isValidGuess from '../src/game/isValidGuess';

describe('isValidGuess', () => {
  it('accepts a decimal guess with the correct length and unique digits', () => {
    const result = isValidGuess('1234', 4, 10);
    expect(result).toBe(true);
  });

  it('rejects a guess shorter than the required length', () => {
    const result = isValidGuess('123', 4, 10);
    expect(result).toBe(false);
  });

  it('rejects a guess longer than the required length', () => {
    const result = isValidGuess('12345', 4, 10);
    expect(result).toBe(false);
  });

  it('rejects digits outside the selected base', () => {
    const result = isValidGuess('1283', 4, 8);
    expect(result).toBe(false);
  });

  it('rejects repeated digits', () => {
    const result = isValidGuess('1123', 4, 10);
    expect(result).toBe(false);
  });

  it('accepts uppercase hexadecimal digits', () => {
    const result = isValidGuess('A1B2', 4, 16);
    expect(result).toBe(true);
  });

  it('rejects repeated hexadecimal digits regardless of case', () => {
    const result = isValidGuess('aA12', 4, 16);
    expect(result).toBe(false);
  });
});
