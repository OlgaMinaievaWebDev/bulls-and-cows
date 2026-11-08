const cachedCounts = new Map<string, number>();

function countArrangements(length: number, availableDigits: number): number {
  if (length === 0) {
    return 1;
  }

  return availableDigits * countArrangements(length - 1, availableDigits - 1);
}

export default function countPossibleSecrets(
  length: number,
  base: number,
): number {
  if (
    !Number.isInteger(length) ||
    length < 0 ||
    ![2, 8, 10, 16].includes(base)
  ) {
    throw new RangeError(
      'Use a nonnegative integer length and base 2, 8, 10, or 16.',
    );
  }

  if (length > base) {
    return 0;
  }

  const cacheKey = `${length}:${base}`;
  const cachedCount = cachedCounts.get(cacheKey);

  if (cachedCount !== undefined) {
    return cachedCount;
  }

  const count = countArrangements(length, base);
  cachedCounts.set(cacheKey, count);
  return count;
}
