import { describe, expect, it } from 'vitest';
import countPossibleSecrets from '../src/game/countPossibleSecrets';

describe('countPossibleSecrets', () => {
  it.each([
    [0, 10, 1],
    [1, 10, 10],
    [2, 10, 90],
    [3, 10, 720],
    [2, 2, 2],
    [4, 8, 1680],
    [4, 16, 43680],
    [6, 16, 5765760],
    [3, 2, 0],
  ])('counts length %i in base %i as %i', (length, base, expected) => {
    expect(countPossibleSecrets(length, base)).toBe(expected);
  });

  it('keeps results for different settings independent on repeated calls', () => {
    expect(countPossibleSecrets(2, 10)).toBe(90);
    expect(countPossibleSecrets(2, 8)).toBe(56);
    expect(countPossibleSecrets(3, 10)).toBe(720);
    expect(countPossibleSecrets(2, 10)).toBe(90);
  });

  it.each([
    [-1, 10],
    [2.5, 10],
    [NaN, 10],
    [2, 3],
    [2, Infinity],
  ])('rejects invalid settings (%s, %s)', (length, base) => {
    expect(() => countPossibleSecrets(length, base)).toThrow(RangeError);
  });
});
