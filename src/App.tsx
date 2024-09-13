import { useState, useMemo, useEffect, useId, useRef } from 'react'
import Square from './components/Square';
import './App.css';
import { 
  clickAddLetterType, 
  clickDeleteLetterType,
  gameWinStateType,
  playAgainType,
 } from './appTypes';
import KeyBoardRow from './components/KeyBoardRow';
import LetterKey from './components/LetterKey';
import WinScreen from './components/WinScreen';
import CorrectGuessList from './components/CorrectGuessList';
import { answers,
  initialKeyBoardStatus,
  initialSquareStatuses,
  initialEnteredLetters,
  row1Letters,
  row2Letters,
  row3Letters
} from './hardcoded';
import { denestSquareStatusGrid, denestArrayOfArrays } from './util/denest';
import assets from './assets';
const voice = assets.voice;
const face = assets.face;

function App() {

  const initialSquareStatusesForHook = denestSquareStatusGrid(initialSquareStatuses);
  const initialNotUsedAnswersForHook = answers();
  const initialEnteredLettersForHook = denestArrayOfArrays([...initialEnteredLetters]);

  const [gameWinState, setGameWinState] = useState<gameWinStateType>('playing');
  const [enteredLetters, setEnteredLetters] = useState(initialEnteredLettersForHook);
  const [keyBoardStatus, setKeyBoardStatus] = useState({...initialKeyBoardStatus});
  const [squareStatuses, setSquareStatuses] = useState(initialSquareStatusesForHook);
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCorrect, setCurrentCorrect] = useState('');
  const [correctGuessListWords, setCorrectGuessListWords] = useState<string[][]>([]);
  const [showCorrectList, setShowCorrectList] = useState(false);
  const [notUsedAnswers, setNotUsedAnswers] = useState(initialNotUsedAnswersForHook);
  // const [shakeClass, setShakeClass] = useState('');

  // const shakeClassCss = useMemo(() => {
  //   return shakeClass;
  // }, [shakeClass]);

  const voiceRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (gameWinState === 'won') {
      if (voiceRef.current) voiceRef.current.play();
    }
  }, [gameWinState]);

  const correctLetters = useMemo(() => {
    return notUsedAnswers[Math.floor(Math.random() * answers.length)] ?? [''];
  }, [gameWinState]);

  const correctGuessDisplay = useMemo(() => {
    return correctGuessListWords.length;
  }, [correctGuessListWords]);

  const remainingWordsDisplay = useMemo(() => {
    return notUsedAnswers.length;
  }, [notUsedAnswers]);
  
  const hiddenInput = useId();
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const fiveCorrect = useMemo(() => {
    let count = 0;
    if (currentRow === 0) return 0;
    squareStatuses[currentRow - 1].forEach((l) => {
      if (l === 'correct') {
        count += 1;
      }
    })
    return count;
  }, [squareStatuses]);

  useEffect(() => {
    console.log(fiveCorrect, correctLetters, 'fiveCorrect and correctLetters')
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

  const playAgain: playAgainType = function() {
    console.log(initialSquareStatuses)
    setKeyBoardStatus({...initialKeyBoardStatus});
    setSquareStatuses(denestSquareStatusGrid(initialSquareStatuses));
    
    setEnteredLetters(denestArrayOfArrays(initialEnteredLetters));
    setCurrentRow(0);
    
    if (gameWinState === 'lost') {
      setCorrectGuessListWords([]);
      setNotUsedAnswers(answers);
    } else {
      const list = denestArrayOfArrays(correctGuessListWords);
      console.log(list, typedLetters, 'list and typedLetters')
      // const newEntry = [...typedLetters];
      const newEntry = [currentCorrect];
      list.push(newEntry);
      setCorrectGuessListWords([...list]);

      const newNotUsedAnswers = denestArrayOfArrays(notUsedAnswers);
      const usedIndex = newNotUsedAnswers.findIndex((word) => {
        return word.join('') === newEntry.join('');
      });
      const modNotUsedAnswers = [...newNotUsedAnswers.slice(0, usedIndex), ...newNotUsedAnswers.slice(usedIndex + 1)];
      setNotUsedAnswers([...modNotUsedAnswers]);
    }
    setCurrentCorrect('');
    setGameWinState('playing');
    setTypedLetters([]);
  };

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
    const newSquareStatuses = denestSquareStatusGrid(squareStatuses);
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
      const newEnteredLetters = denestArrayOfArrays(enteredLetters);
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
      const newEnteredLetters = denestArrayOfArrays(enteredLetters);
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

  return (
    <div>
      <label htmlFor={hiddenInput}></label>
      <input onBlur={refocusInput} ref={hiddenInputRef} name="hidden-input" id={hiddenInput} className="hidden-input" autoFocus={true} onKeyDown={(e) => addDeleteTypedLetters(e)}></input>
      {gameWinState === 'won' || gameWinState === 'lost' ? <WinScreen winWord={currentCorrect} face={face} wonOrLost={gameWinState} playAgain={playAgain}/> : 
      <div className={"whole-display"}>
        <h1>
          Ferdle
        </h1>
        <h2>
          Correct Guesses: {correctGuessDisplay}<br></br>
          Remaining Words: {remainingWordsDisplay}
          <button onClick={() => setShowCorrectList(!showCorrectList)}>{showCorrectList ? "Hide" : "Show"}</button>
        </h2>
        <div>
          {showCorrectList ? <CorrectGuessList list={correctGuessListWords} /> : null}
        </div>
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
<audio src={voice} autoPlay={false} preload={'auto'} ref={voiceRef}></audio>
    </div>
  )
}

export default App
