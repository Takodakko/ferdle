import { playAgainType, gameWinStateType } from '../appTypes';
import { useRef, useEffect } from 'react';

function WinScreen(props: {playAgain: playAgainType, wonOrLost: gameWinStateType, voice: string, face: string}) {
    const { playAgain, wonOrLost, voice, face } = props;
    const playAgainButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (playAgainButton.current !== null && wonOrLost === 'won' || wonOrLost === 'lost') {
            playAgainButton.current?.focus();
        }
    }, [playAgainButton.current, wonOrLost]);

    const displayFace = wonOrLost === 'won' ? <div>
    <img style={{height: '50%', width: '50%'}} src={face}></img>
    <audio autoPlay={true} src={voice}></audio>
  </div> : <div>How ignoble of you!</div>;
  return (
    <div>
        {displayFace}
        <button ref={playAgainButton} onClick={playAgain}>Play Again?</button>
    </div>
  )
};

export default WinScreen;