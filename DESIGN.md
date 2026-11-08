# Design decisions

This document describes the current implementation. Sections marked pending will
be completed alongside the corresponding features.

## Data structures and algorithms

### Digits and guesses

Guesses are strings so leading zeroes are preserved. For example, `0123` has four
digits. Hexadecimal characters are converted to lowercase before validation or
comparison so `a` and `A` represent the same digit.

### Digit validation

In `src/game/createDigitValidator.ts`, `createDigitValidator(base)` selects the
first `base` characters from `0123456789abcdef`. It returns a predicate that checks
whether its argument is exactly one character and belongs to that alphabet after
lowercasing.

The returned function retains access to the allowed alphabet through a closure.
`isValidGuess` reuses this predicate to check each character. Reuse for live input
filtering is pending.

### Guess validation

In `src/game/isValidGuess.ts`, `isValidGuess` normalizes the guess and combines
three boolean checks. The length must match the selected length, every character
must pass the digit validator, and every digit must be unique.

A `Set` stores the distinct characters. Comparing its size with the normalized
string's length detects duplicates, including mixed-case hexadecimal duplicates
such as `aA`.

### Guess evaluation

In `src/game/evaluateGuess.ts`, `evaluateGuess` normalizes both strings and splits
them into character arrays. It assumes the caller supplies valid guesses with
unique digits and the same length as the secret.

The first `filter` collects digits matching at the same index. Its result length
is the number of bulls. The second `filter` collects secret digits present in the
guess at a different index. Its result length is the number of cows. Requiring a
different index prevents a bull from also being counted as a cow.

The function returns a new object containing `bulls` and `cows`. It leaves its
inputs unchanged.

### Settings and UI

The `GameSettings` type in `src/ui/renderSettings.ts` contains numeric `length`
and `base` properties. Select values are converted from strings to numbers when
the Start button invokes the supplied callback.

Changing the number system disables lengths larger than the base. Selecting
binary therefore makes only length 2 available. If the previously selected length
is too large, it changes to 2.

`renderSettings` creates elements using DOM methods and returns the containing
element. `src/main.ts` mounts the screen and currently displays the settings
received through the callback.

### Pending algorithms and state

- `generateSecret` is pending, including its injected random source and algorithm.
- `countPossibleSecrets` is pending, including recursion and memoization.
- Round state and attempt history are pending. The task requires immutable updates
  that preserve previous state and history entries.
- Settings locking, round completion, timing, and persistent records are pending.

## Complexity

Let `n` be the number of characters in a valid guess and secret. Supported bases
are 2, 8, 10, and 16. Complexity describes how the algorithms scale with input
length even though the game's UI limits guesses to 2–6 characters.

| Function               | Time                                 | Additional space | Reason                                                                                                                                                                                                              |
| ---------------------- | ------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `evaluateGuess`        | O(n²) worst case                     | O(n)             | The cow filter visits n digits and can search n guess characters with `includes` for each digit. Normalized strings, character arrays, and filtered arrays occupy linear space.                                     |
| `isValidGuess`         | O(n) expected                        | O(n)             | Normalization, splitting, character checks, and Set construction each process at most n characters. Alphabet searches are bounded by 16 characters. Set operations use the usual expected constant-time assumption. |
| `createDigitValidator` | O(1) factory and per-character check | O(1)             | The alphabet has at most 16 characters. Inputs longer or shorter than one character are rejected before normalization and alphabet lookup.                                                                          |
| `generateSecret`       | Pending                              | Pending          | Record complexity after choosing and implementing the generation algorithm.                                                                                                                                         |
| `countPossibleSecrets` | Pending                              | Pending          | Record recursive calculation and cache-hit costs after implementing memoization.                                                                                                                                    |

## Clean code decisions

- **Separation of responsibilities.** Files in `src/game` contain DOM-independent
  game calculations. `src/ui/renderSettings.ts` creates controls and handles their
  events, while `src/main.ts` mounts the screen and receives selected settings.
- **Reusable validation.** `isValidGuess` calls `createDigitValidator` rather than
  duplicating the allowed-character rules.
- **Descriptive names.** `hasCorrectLength`, `hasValidDigits`, and
  `hasUniqueDigits` in `isValidGuess` name each condition before combining them.
- **Small functions.** Evaluation, digit validation, and whole-guess validation
  have individual functions and test files.
- **Pure calculations.** The implemented functions in `src/game` return results
  without changing their inputs or accessing browser state. The digit validator's
  closure captures the alphabet prepared for its base.
- **Tests before implementation.** Separate failing-test and implementation
  commits exist for `evaluateGuess`, `createDigitValidator`, and `isValidGuess`.
  Their tests use fixed inputs and explicit expected results.
