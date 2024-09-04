import { squareStatus } from '../appTypes';
import './Square.css';

function Square(props: {squareStatus: squareStatus, enteredLetter: string}) {
    const { squareStatus, enteredLetter } = props;
    const squareClass = () => {
        if (squareStatus === 'correct') {
            return 'square correct';
        } else if (squareStatus === 'partial') {
            return 'square partial';
        } else {
            return 'square';
        }
    };
    return (
        <div className={squareClass()}>
          {enteredLetter}
        </div>
    )
}

export default Square;