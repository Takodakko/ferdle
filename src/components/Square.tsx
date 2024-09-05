import { squareStatus } from '../appTypes';
import './Square.css';

function Square(props: {squareStatus: squareStatus, enteredLetter: string, currentRow: boolean}) {
    const { squareStatus, enteredLetter, currentRow } = props;
    const squareClass = () => {
        let squareClass = 'square';
        if (currentRow) {
            squareClass = squareClass + ' current-row-square';
        }
        squareClass = squareClass + ` ${squareStatus}`;
        return squareClass;
    };
    return (
        <div className={squareClass()}>
          {enteredLetter}
        </div>
    )
}

export default Square;