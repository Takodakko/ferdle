import LetterKey from './LetterKey';
import { ILetterStatus, clickAddLetterType } from '../appTypes';

function KeyBoardRow(props: {keys: string[], keyBoardStatus: ILetterStatus, clickAddLetter: clickAddLetterType, typedLetters: string[]}) {
  const { keys, keyBoardStatus, clickAddLetter, typedLetters } = props;

  const keyRow = keys.map((key) => {
    return <LetterKey key={key} letter={key} status={keyBoardStatus[key]} clickAddLetter={clickAddLetter} typed={typedLetters.includes(key) ? true : false}/>
  });

  return (
    <>
      {keyRow}
    </>
  )
};

export default KeyBoardRow;