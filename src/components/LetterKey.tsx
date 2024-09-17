import { clickAddLetterType, keyStatus } from "../appTypes";

function LetterKey(props: {letter: string, typed: boolean, status: keyStatus, clickAddLetter: clickAddLetterType}) {
  const { letter, status, clickAddLetter, typed } = props;

  const ariaLabel = () => {
    let letterLabel = '';
    let statusLabel = '';
    if (letter === 'Ent') {
      letterLabel = 'Enter';
    } else if (letter === 'Del') {
      letterLabel = 'Delete';
    } else {
      letterLabel = letter;
      statusLabel = typed ? ' typed' : ' ' + status;
    }
    return letterLabel + ' key' + statusLabel;
  };

  const pressEnterToAddLetter = function(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
        clickAddLetter(letter);
    }
  };
  
  const letterKeyClass = () => {
    let keyClass = 'square';
    if (typed) {
      keyClass = keyClass + ' typed-key';
    }
      if (letter === 'Ent' || letter === 'Del') {
        keyClass = keyClass + ' delete-enter-key';
        return keyClass;
      }
        if (status === 'correct') {
          keyClass = keyClass + ' correct-key';
          return keyClass;
        } else if (status === 'partial') {
          keyClass = keyClass + ' partial-key';
          return keyClass;
        } else if (status === 'no') {
          keyClass = keyClass + ' no-key';
          return keyClass;
        } else {
          keyClass = keyClass + ' keyboard-key';
          return keyClass;
        }
  };

  return (
    <div className={letterKeyClass()} onKeyDown={pressEnterToAddLetter} onClick={() => clickAddLetter(letter)} aria-label={ariaLabel()} tabIndex={0}>
        {letter}
    </div>
  )
};

export default LetterKey;