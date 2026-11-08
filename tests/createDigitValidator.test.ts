import { describe, it, expect } from 'vitest';
import createDigitValidator from '../src/game/createDigitValidator';

describe('createDigitValidator', () => {
  it('A binary validator accepts "0"', () => {
    const isBinaryDigit = createDigitValidator(2);
    const result = isBinaryDigit('0');
    expect(result).toBe(true);
  });

  it('A binary validator accepts "1"', () => {
    const isBinaryDigit = createDigitValidator(2);
    const result = isBinaryDigit('1');
    expect(result).toBe(true);
  });

  it('A binary validator rejects "2"', () => {
    const isBinaryDigit = createDigitValidator(2);
    const result = isBinaryDigit('2');
    expect(result).toBe(false);
  });

  it('A hexadecimal validator accepts "a"', () => {
    const isHexDigit = createDigitValidator(16);
    const result = isHexDigit('a');
    expect(result).toBe(true);
  });

  it('A hexadecimal validator accepts "A"', () => {
    const isHexDigit = createDigitValidator(16);
    const result = isHexDigit('A');
    expect(result).toBe(true);
  });

  it('A hexadecimal validator rejects "g"', () => {
    const isHexDigit = createDigitValidator(16);
    const result = isHexDigit('g');
    expect(result).toBe(false);
  });

  it('A hexadecimal validator rejects ""', () => {
    const isHexDigit = createDigitValidator(16);
    const result = isHexDigit('');
    expect(result).toBe(false);
  });

  it('A hexadecimal validator rejects "10"', () => {
    const isHexDigit = createDigitValidator(16);
    const result = isHexDigit('10');
    expect(result).toBe(false);
  });

  it('A octal validator accepts "7"', () => {
    const isOctalDigit = createDigitValidator(8);
    const result = isOctalDigit('7');
    expect(result).toBe(true);
  });

  it('A octal validator rejects "8"', () => {
    const isOctalDigit = createDigitValidator(8);
    const result = isOctalDigit('8');
    expect(result).toBe(false);
  });

  it('A decimal validator accepts "9"', () => {
    const isDecimalDigit = createDigitValidator(10);
    const result = isDecimalDigit('9');
    expect(result).toBe(true);
  });

  it('A decimal validator rejects "a"', () => {
    const isDecimalDigit = createDigitValidator(10);
    const result = isDecimalDigit('a');
    expect(result).toBe(false);
  });
});
