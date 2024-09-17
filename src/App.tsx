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

  function isMobileTablet(){
    let check = false;
    (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
            check = true;
    })(navigator.userAgent);
    return check;
  };

  const isMobile = isMobileTablet();

  const hiddenInputHtml = isMobile ? null : <div><label htmlFor={hiddenInput}></label>
  <input onBlur={refocusInput} ref={hiddenInputRef} name="hidden-input" id={hiddenInput} className="hidden-input" autoFocus={true} onKeyDown={(e) => addDeleteTypedLetters(e)}></input></div>;

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
      {hiddenInputHtml}
      {gameWinState === 'won' || gameWinState === 'lost' ? <WinScreen winWord={currentCorrect} face={face} wonOrLost={gameWinState} playAgain={playAgain}/> : 
      <div className={"whole-display"}>
        <h2>
          Ferdle
        </h2>
        <h3>
          Correct Guesses: {correctGuessDisplay}<br></br>
          Remaining Words: {remainingWordsDisplay} 
          <button onClick={() => setShowCorrectList(!showCorrectList)}>{showCorrectList ? "Hide" : "Show"}</button>
        </h3>
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
            <div onClick={clickDeleteLetter}>
              <LetterKey letter="Del" status="unchosen" clickAddLetter={clickAddLetterToTyped} typed={false}/>
            </div>
            <KeyBoardRow keys={row3Letters} typedLetters={typedLetters} keyBoardStatus={keyBoardStatus} clickAddLetter={clickAddLetterToTyped}/>
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
