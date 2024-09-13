type squareStatus = 'correct' | 'partial' | 'no';

interface squareStatusGrid extends Record<string, squareStatus[]> {
    0: squareStatus[],
    1: squareStatus[],
    2: squareStatus[],
    3: squareStatus[],
    4: squareStatus[],
    5: squareStatus[],
}

type keyStatus = 'correct' | 'partial' | 'no' | 'typed' | 'unchosen';

type gameWinStateType = 'playing' | 'won' | 'lost';

type clickAddLetterType = (letter: string) => void;

type clickDeleteLetterType = () => void;

type playAgainType = () => void;

export const ADD_ONE_LETTER_TO_TYPED = 'add-one-letter-to-typed';

export const DELETE_ONE_LETTER_FROM_TYPED = 'delete-one-letter-from-typed';

export const ADD_LETTERS_TO_CHOSEN_AND_SORT = 'add-letters-to-chosen-and-sort';

export const UPDATE_ANSWER_SQUARE_STATUSES = 'update-answer-square-statuses';

export const KEYBOARD_STATUS = 'keyBoardStatus';

export const TYPED_LETTERS = 'typedLetters';

export const SQUARE_STATUSES = 'squareStatuses';

export const ERROR = 'ERROR';

type commandTypes = 'add-one-letter-to-typed' | 'delete-one-letter-from-typed' | 'delete-all-letters-from-typed' | 'add-letters-to-chosen-and-sort' | 'update-answer-square-statuses';

interface ILetterStatus {
    [key: string]: keyStatus,
}

export type {
    squareStatus,
    clickAddLetterType,
    clickDeleteLetterType,
    ILetterStatus,
    keyStatus,
    commandTypes,
    squareStatusGrid,
    gameWinStateType,
    playAgainType,
}