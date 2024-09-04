import assets from '../assets';
const voice = assets.voice;
const face = assets.face;
import { playAgainType, gameWinStateType } from '../appTypes';

function WinScreen(props: {playAgain: playAgainType, wonOrLost: gameWinStateType}) {
    const { playAgain, wonOrLost } = props;
    const displayFace = wonOrLost === 'won' ? <div>
    <img src={face}></img>
    <audio autoPlay={true} src={voice}></audio>
  </div> : <div>How ignoble of you!</div>;
  return (
    <div>
        {displayFace}
        <button onClick={playAgain}>Play Again?</button>
    </div>
  )
};

export default WinScreen;