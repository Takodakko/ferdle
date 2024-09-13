import { playAgainType, gameWinStateType } from '../appTypes';
import { useRef, useEffect } from 'react';

function WinScreen(props: {playAgain: playAgainType, wonOrLost: gameWinStateType, face: string, winWord: string}) {
    const { playAgain, wonOrLost, face, winWord } = props;
    const playAgainButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (playAgainButton.current !== null && wonOrLost === 'won' || wonOrLost === 'lost') {
            playAgainButton.current?.focus();
        }
    }, [playAgainButton.current, wonOrLost]);

    const displayFace = wonOrLost === 'won' ? <div>
    <img style={{height: '50%', width: '50%'}} src={face}></img>
  </div> : <div>How ignoble of you!</div>;

    const correctDisplay = wonOrLost === 'lost' ? <div>
        Correct Answer: {winWord}
    </div> : null;

  return (
    <div>
        {correctDisplay}
        {displayFace}
        <button ref={playAgainButton} onClick={playAgain}>Play Again?</button>
    </div>
  )
};

export default WinScreen;