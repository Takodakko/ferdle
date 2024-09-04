// import { 
//     squareStatus, 
//     ILetterStatus, 
//     commandTypes, 
//     ADD_ONE_LETTER_TO_TYPED, 
//     ADD_LETTERS_TO_CHOSEN_AND_SORT, 
//     DELETE_ONE_LETTER_FROM_TYPED, 
//     UPDATE_ANSWER_SQUARE_STATUSES,
//     SQUARE_STATUSES,
//     KEYBOARD_STATUS,
//     TYPED_LETTERS,
//     ERROR,
// } from './appTypes';
// import { useState } from 'react';

// export const correctLetters = ['A', 'E', 'G', 'I', 'R'];

// export const getTypedLetters = function() {
//     return typedLetters;
//   };

//   export const getKeyBoardStatus = function() {
//     return keyBoardStatus;
//   };

//   export const getSquareStatuses = function() {
//     return squareStatuses;
//   };


// const initialSquareStatuses: squareStatus[] = new Array(5).fill('no');

// const initialKeyBoardStatus: ILetterStatus = {
//     'A': 'unchosen',
//     'B': 'unchosen',
//     'C': 'unchosen',
//     'D': 'unchosen',
//     'E': 'unchosen',
//     'F': 'unchosen',
//     'G': 'unchosen',
//     'H': 'unchosen',
//     'I': 'unchosen',
//     'J': 'unchosen',
//     'K': 'unchosen',
//     'L': 'unchosen',
//     'M': 'unchosen',
//     'N': 'unchosen',
//     'O': 'unchosen',
//     'P': 'unchosen',
//     'Q': 'unchosen',
//     'R': 'unchosen',
//     'S': 'unchosen',
//     'T': 'unchosen',
//     'U': 'unchosen',
//     'V': 'unchosen',
//     'W': 'unchosen',
//     'X': 'unchosen',
//     'Y': 'unchosen',
//     'Z': 'unchosen',
//   };

//   //const [keyBoardStatus, setKeyBoardStatus] = useState(initialKeyBoardStatus);
//   let keyBoardStatus: ILetterStatus = {};
//   const setKeyBoardStatus = function(newStatus: ILetterStatus) {
//     keyBoardStatus = {...newStatus};
//   };
//   //const [typedLetters, setTypedLetters] = useState<string[]>([]);
//   let typedLetters: string[] = [];
//   const setTypedLetters = function(newStatus: string[]) {
//     typedLetters = [...newStatus];
//   };
//   //const [chosenCorrectLetters, setChosenCorrectLetters] = useState<string[]>([]);
//   //const [squareStatuses, setSquareStatuses] = useState<squareStatus[]>(initialSquareStatuses);
//   let squareStatuses: squareStatus[] = [];
//   const setSquareStatuses = function(newStatus: squareStatus[]) {
//     squareStatuses = [...newStatus];
//   };



//   const updateSquareStatuses = function (letters: string[]) {
//     const newSquareStatuses = [...squareStatuses];
//     letters.forEach((letter, index) => {
//       if (letter === correctLetters[index]) {
//         newSquareStatuses[index] = 'correct';
//       } else if (correctLetters.includes(letter) && letter !== correctLetters[index]) {
//         newSquareStatuses[index] = 'partial';
//       }
//     });
//     setSquareStatuses([...newSquareStatuses]);
//   };
  
//   const addLettersToTyped = function(letters: string[]) {
//     const letter = letters[0];
//     if (typedLetters.length === 5) {
//         return;
//     } else {
//         const newTypedLetters = [...typedLetters];
//         newTypedLetters.push(letter.toUpperCase());

//         const newKeyBoardStatus = {...keyBoardStatus};
//         newKeyBoardStatus[letter] = 'typed';

//         setTypedLetters([...newTypedLetters]);
//         setKeyBoardStatus({...newKeyBoardStatus});
//     }
//   };

//   const removeLettersFromTyped = function(_letters: string[] = ['']) {
//     if (typedLetters.length === 0) {
//         return;
//     } else {
//         const newTypedLetters = [...typedLetters];
//         const removedLetter: string = newTypedLetters[newTypedLetters.length - 1];
//         newTypedLetters.pop();

//         const newKeyBoardStatus = {...keyBoardStatus};
//         keyBoardStatus[removedLetter] = 'unchosen';

//         setTypedLetters([...newTypedLetters]);
//         setKeyBoardStatus({...newKeyBoardStatus});
//     }
//   };

//   const changeLettersToChosenStatuses = function(letters: string[]) {
//     const newKeyBoardStatus = {...keyBoardStatus};
//     letters.forEach((letter, i) => {
//         if (correctLetters.includes(letter) && i === correctLetters.indexOf(letter)) {
//             newKeyBoardStatus[letter] = 'correct';
//         } else if (correctLetters.includes(letter) && i !== correctLetters.indexOf(letter)) {
//             newKeyBoardStatus[letter] = 'partial';
//         } else {
//             newKeyBoardStatus[letter] = 'no';
//         }
//     });
//     setKeyBoardStatus({...newKeyBoardStatus});
//     setTypedLetters([]);
//   };



//   export const controller = function(command: commandTypes, data: string[]) {
//     if (command === ADD_ONE_LETTER_TO_TYPED) {
//         addLettersToTyped(data);
//     } else if (command === ADD_LETTERS_TO_CHOSEN_AND_SORT) {
//         changeLettersToChosenStatuses(data);
//     } else if (command === DELETE_ONE_LETTER_FROM_TYPED) {
//         removeLettersFromTyped();
//     } else if (command === UPDATE_ANSWER_SQUARE_STATUSES) {
//         updateSquareStatuses(data);
//     }
//   };