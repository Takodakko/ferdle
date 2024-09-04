import { clickAddLetterType, keyStatus } from "../appTypes";

function LetterKey(props: {letter: string, typed: boolean, status: keyStatus, clickAddLetter: clickAddLetterType}) {
  const { letter, status, clickAddLetter, typed } = props;
  
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
    <div className={letterKeyClass()} onClick={() => clickAddLetter(letter)}>
        {letter}
    </div>
  )
};

export default LetterKey;