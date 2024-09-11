import { useState, useMemo, useEffect, useId, useRef } from 'react'
import Square from './components/Square';
import './App.css';
import { 
  squareStatus, 
  clickAddLetterType, 
  clickDeleteLetterType, 
  ILetterStatus,
  squareStatusGrid,
  gameWinStateType,
  playAgainType,
 } from './appTypes';
import KeyBoardRow from './components/KeyBoardRow';
import LetterKey from './components/LetterKey';
import WinScreen from './components/WinScreen';
import assets from './assets';
const voice = assets.voice;
const face = assets.face;

function App() {
  const initialSquareStatusesRow: squareStatus[] = new Array(5).fill('no');
  const initialSquareStatuses: squareStatusGrid = [
    [...initialSquareStatusesRow],
    [...initialSquareStatusesRow],
    [...initialSquareStatusesRow],
    [...initialSquareStatusesRow],
    [...initialSquareStatusesRow],
    [...initialSquareStatusesRow],
  ];

  const initialEnteredLetters: string[][] = [[], [], [], [], [], []];

  const answers: string[][] = [
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
  
  //const correctLetters = ['A', 'E', 'G', 'I', 'R'];
  const row1Letters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const row2Letters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const row3Letters = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const initialKeyBoardStatus: ILetterStatus = {
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

  const [gameWinState, setGameWinState] = useState<gameWinStateType>('playing');
  const [enteredLetters, setEnteredLetters] = useState(initialEnteredLetters);
  const [keyBoardStatus, setKeyBoardStatus] = useState(initialKeyBoardStatus);
  const [squareStatuses, setSquareStatuses] = useState<squareStatusGrid>(initialSquareStatuses);
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCorrect, setCurrentCorrect] = useState('');
  // const [shakeClass, setShakeClass] = useState('');

  // const shakeClassCss = useMemo(() => {
  //   return shakeClass;
  // }, [shakeClass]);

  const correctLetters = useMemo(() => {
    return answers[Math.floor(Math.random() * answers.length)];
  }, [gameWinState]);
  
  const hiddenInput = useId();
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const fiveCorrect = useMemo(() => {
    let count = 0;
    for (let key in keyBoardStatus) {
      if (keyBoardStatus[key] === 'correct') {
        count += 1;
      }
    }
    return count;
  }, [keyBoardStatus]);

  useEffect(() => {
    setCurrentCorrect(correctLetters.join(''));
    if (fiveCorrect === 5) {
      setTimeout(() => {
        setGameWinState('won');
      }, 500);
    }
    if (currentRow === 6 && fiveCorrect !== 5) {
      setTimeout(() => {
        setGameWinState('lost');
      }, 500);
    }
  }, [currentRow, fiveCorrect]);

  function enterLetterChoice() {
    // console.log(correctLetters, 'correct')
    if (fiveCorrect === 5) return;
    if (typedLetters.length !== 5) {
      // setShakeClass('shaking-screen');
      // setTimeout(() => {
      //   setShakeClass('');
      // }, 1000);
      return;
    }
    
    const newTyped = [...typedLetters];
    const newKeyBoard = {...keyBoardStatus};
    const newSquareStatuses = {...squareStatuses};
    const numberOfEachLetter: Record<string, number> = {};
    
    correctLetters.forEach((l) => {
      if (numberOfEachLetter.hasOwnProperty(l)) {
        numberOfEachLetter[l] += 1;
      } else {
        numberOfEachLetter[l] = 1;
      }
    });
    
    newTyped.forEach((letter, index) => {
      if (correctLetters[index] === letter) {
        numberOfEachLetter[letter] -= 1;
        newKeyBoard[letter] = 'correct';
        newSquareStatuses[currentRow][index] = 'correct';
        numberOfEachLetter[letter] -= 1;
        if (numberOfEachLetter[letter] < 0) {
          const partialInd = newTyped.findIndex((l, i) => {
            if (l === letter && newSquareStatuses[currentRow][i] === 'partial') {
              return true;
            }
            return false;
          });
          newSquareStatuses[currentRow][partialInd] = 'no';
        }
      } else if (correctLetters[index] !== letter && correctLetters.includes(letter)) {
        if (numberOfEachLetter[letter] > 0) {
          newSquareStatuses[currentRow][index] = 'partial';
          numberOfEachLetter[letter] -= 1;
        } else {
          newSquareStatuses[currentRow][index] = 'no';
        }
        if (newKeyBoard[letter] !== 'correct') {
          newKeyBoard[letter] = 'partial';
        }
        
      } else {
        newKeyBoard[letter] = 'no';
        newSquareStatuses[currentRow][index] = 'no';
      }
    });
    setKeyBoardStatus({...newKeyBoard});
    setTypedLetters([]);
    setCurrentRow(currentRow + 1);
    setSquareStatuses({...newSquareStatuses});
  };

  function addDeleteTypedLetters(event: React.KeyboardEvent<HTMLInputElement>) {
    if (currentRow > 5 || fiveCorrect === 5) return;
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    event.preventDefault();
    
    const letters = /^[a-zA-Z]+$/;
    const pressedKey = event.key;
    
    if (pressedKey === 'Delete' || pressedKey === 'Backspace') {
      if (typedLetters.length === 0) return;
      clickDeleteLetter();
      return;
    } else if (pressedKey === 'Enter') {
      if (typedLetters.length < 5) {
        return;
      } else {
        enterLetterChoice();
        return;
      }
    } else if (letters.test(pressedKey)) {
      clickAddLetterToTyped(pressedKey.toUpperCase());
      return;
    }  else {
      return;
    }
  };

  const clickAddLetterToTyped: clickAddLetterType = function(letter: string) {
    if (currentRow > 5 || fiveCorrect === 5) return;
    if (typedLetters.length === 5) {
      return;
    } else {
      if (letter === 'Del' || letter === 'Ent') return;
      const newEnteredLetters = [...enteredLetters];
      const newTyped = [...typedLetters];
      
      newTyped.push(letter.toUpperCase());
      newEnteredLetters[currentRow] = [...newTyped];

      const newKeyBoard = {...keyBoardStatus};
      keyBoardStatus[letter] = 'typed';
      
      setTypedLetters([...newTyped]);
      setKeyBoardStatus({...newKeyBoard});
      setEnteredLetters([...newEnteredLetters]);
    }
  };

  const clickDeleteLetter: clickDeleteLetterType = function() {
    if (currentRow > 5 || fiveCorrect === 5) return;
    if (typedLetters.length === 0) {
      return;
    } else {
      const newTyped = [...typedLetters];
      const newKeyboard = {...keyBoardStatus};
      const newEnteredLetters = [...enteredLetters];
      const removedLetter = newTyped[newTyped.length - 1];
      newTyped.pop();
      newEnteredLetters[currentRow] = [...newTyped];
      newKeyboard[removedLetter] = 'unchosen';
      setTypedLetters([...newTyped]);
      setKeyBoardStatus({...newKeyboard});
      setEnteredLetters([...newEnteredLetters]);
    }
  };

  useEffect(() => {
    if (gameWinState === 'playing' && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  });
  
  const refocusInput = function() {
    if (gameWinState === 'playing' && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  };

  const squares = useMemo(() => {
    const box = [];
    for (let j = 0; j < 6; j++) {
      const row = [];
      for (let i = 0; i < 5; i++) {
        const enteredLetter = enteredLetters[j][i];
        const status = squareStatuses[j][i];
        const aSquare = <Square key={`${i}-${j}`} squareStatus={status} enteredLetter={enteredLetter} currentRow={currentRow === j}/>;
        row.push(aSquare);
      }
      box.push(row);
    }
    return box;
  }, [squareStatuses, enteredLetters]);

  const playAgain: playAgainType = function() {
    setKeyBoardStatus(initialKeyBoardStatus);
    setSquareStatuses(initialSquareStatuses);
    setTypedLetters([]);
    setEnteredLetters(initialEnteredLetters);
    setCurrentRow(0);
    setGameWinState('playing');
  };

  return (
    <div>
      <label htmlFor={hiddenInput}></label>
      <input onBlur={refocusInput} ref={hiddenInputRef} name="hidden-input" id={hiddenInput} className="hidden-input" autoFocus={true} onKeyDown={(e) => addDeleteTypedLetters(e)}></input>
      {gameWinState === 'won' || gameWinState === 'lost' ? <WinScreen winWord={currentCorrect} face={face} voice={voice} wonOrLost={gameWinState} playAgain={playAgain}/> : 
      <div className={"whole-display"}>
        <h1>
          Ferdle
        </h1>
        <div className={"square-container"}>
          {squares.map((row, ind) => {
            return <div key={ind} className={"answer-square-row-container "}>{row}</div>
          })}
        </div>
        <div className="keyboard">
          <div className="keyboard-row" onKeyDown={addDeleteTypedLetters}>
            <KeyBoardRow keys={row1Letters} typedLetters={typedLetters} keyBoardStatus={keyBoardStatus} clickAddLetter={clickAddLetterToTyped}/>
          </div>
          <div className="keyboard-row">
            <KeyBoardRow keys={row2Letters} typedLetters={typedLetters} keyBoardStatus={keyBoardStatus} clickAddLetter={clickAddLetterToTyped}/>
          </div>
          <div className="keyboard-row">
            <KeyBoardRow keys={row3Letters} typedLetters={typedLetters} keyBoardStatus={keyBoardStatus} clickAddLetter={clickAddLetterToTyped}/>
          </div>
          <div className="keyboard-row">
            <div onClick={clickDeleteLetter}>
              <LetterKey letter="Del" status="unchosen" clickAddLetter={clickAddLetterToTyped} typed={false}/>
            </div>
            <div onClick={() => enterLetterChoice()}>
              <LetterKey letter="Ent" status="unchosen" clickAddLetter={clickAddLetterToTyped} typed={false}/>
            </div>
          </div>
        </div>
      </div>
}
    </div>
  )
}

export default App
