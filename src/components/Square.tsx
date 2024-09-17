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

    const ariaLabel = () => {
        const letterLabel = enteredLetter ?? 'empty';
        return 'square ' + letterLabel + ' ' + squareStatus;
    };

    return (
        <div className={squareClass()} aria-label={ariaLabel()}>
          {enteredLetter}
        </div>
    )
}

export default Square;