import { squareStatus, squareStatusGrid, ILetterStatus } from './appTypes';

const potentialAnswerList: string[][] = [
  ['A', 'E', 'G', 'I', 'R'],
  ['L', 'A', 'N', 'C', 'E'],
  ['H', 'I', 'L', 'D', 'A'],
  ['S', 'W', 'O', 'R', 'D'],
  ['P', 'E', 'T', 'R', 'A'],
  ['C', 'R', 'E', 'S', 'T'],
  ['F', 'L', 'A', 'Y', 'N'],
  ['T', 'H', 'I', 'E', 'F'],
  ['A', 'S', 'H', 'E', 'N'],
  ['H', 'O', 'L', 'S', 'T'],
  ['L', 'E', 'V', 'I', 'N'],
  ['A', 'L', 'O', 'I', 'S'],
  ['U', 'B', 'E', 'R', 'T'],
  ['F', 'E', 'L', 'I', 'X'],
  ['C', 'Y', 'R', 'I', 'L'],
  ['E', 'S', 'S', 'A', 'R'],
  ['B', 'L', 'A', 'C', 'K'],
  ['L', 'I', 'O', 'N', 'S'],
  ['N', 'O', 'B', 'L', 'E'],
  ['B', 'R', 'A', 'V', 'E'],
  ['D', 'E', 'V', 'I', 'L'],
  ['D', 'E', 'M', 'O', 'N'],
  ['S', 'T', 'E', 'E', 'L'],
  ['V', 'E', 'N', 'I', 'N'],
  ['I', 'N', 'D', 'R', 'A'],
  ['S', 'P', 'E', 'A', 'R'],
  ['A', 'S', 'S', 'A', 'L'],
  ['M', 'A', 'G', 'I', 'C'],
  ['V', 'A', 'J', 'R', 'A'],
  ['A', 'U', 'B', 'I', 'N'],
  ['B', 'E', 'A', 'S', 'T'],
  ['S', 'P', 'E', 'E', 'D'],
  ['S', 'T', 'A', 'F', 'F'],
  ['F', 'A', 'I', 'T', 'H'],
  ['A', 'E', 'G', 'I', 'S'],
  ['D', 'R', 'O', 'M', 'I'],
  ['C', 'H', 'E', 'S', 'T'],
  ['T', 'O', 'R', 'C', 'H'],
  ['A', 'G', 'N', 'E', 'A'],
  ['H', 'A', 'D', 'E', 'S'],
  ['S', 'W', 'A', 'R', 'M'],
  ['B', 'R', 'A', 'W', 'L'],
  ['F', 'A', 'I', 'R', 'E'],
  ['R', 'A', 'L', 'L', 'Y'],
  ['C', 'H', 'A', 'R', 'M'],
  ['W', 'R', 'A', 'T', 'H'],
  ['A', 'S', 'T', 'R', 'A'],
  ['S', 'H', 'O', 'V', 'E'],
  ['S', 'M', 'I', 'T', 'E'],
  ['B', 'L', 'A', 'Z', 'E'],
  ['S', 'A', 'U', 'N', 'A'],
  ['M', 'I', 'G', 'H', 'T'],
  ['D', 'E', 'D', 'U', 'E'],
  ['C', 'L', 'A', 'S', 'S'],
  ['H', 'O', 'U', 'S', 'E'],
];
  export const answers = function() {
    const resultArray: string[][] = [];
    let list = [...potentialAnswerList];
    while (list.length) {
      const currentIndex = Math.floor(Math.random() * list.length);
      resultArray.push([...list[currentIndex]]);
      list = [...list.slice(0, currentIndex), ...list.slice(currentIndex + 1)];
    }
    return resultArray;
  };

  export const initialKeyBoardStatus: ILetterStatus = {
    'A': 'unchosen',
    'B': 'unchosen',
    'C': 'unchosen',
    'D': 'unchosen',
    'E': 'unchosen',
    'F': 'unchosen',
    'G': 'unchosen',
    'H': 'unchosen',
    'I': 'unchosen',
    'J': 'unchosen',
    'K': 'unchosen',
    'L': 'unchosen',
    'M': 'unchosen',
    'N': 'unchosen',
    'O': 'unchosen',
    'P': 'unchosen',
    'Q': 'unchosen',
    'R': 'unchosen',
    'S': 'unchosen',
    'T': 'unchosen',
    'U': 'unchosen',
    'V': 'unchosen',
    'W': 'unchosen',
    'X': 'unchosen',
    'Y': 'unchosen',
    'Z': 'unchosen',
  };

  const initialSquareStatusesRow: squareStatus[] = new Array(5).fill('no');
  export const initialSquareStatuses: squareStatusGrid = {
   0: [...initialSquareStatusesRow],
   1: [...initialSquareStatusesRow],
   2: [...initialSquareStatusesRow],
   3: [...initialSquareStatusesRow],
   4: [...initialSquareStatusesRow],
   5: [...initialSquareStatusesRow],
  };

  export const initialEnteredLetters: string[][] = [[], [], [], [], [], []];

  export const row1Letters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  export const row2Letters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  export const row3Letters = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];