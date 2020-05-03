import React, { useRef, useEffect } from 'react';
//@ts-ignore
import JSGameBoard from '@mposk98/game-board';
//@ts-ignore
import shashki from '@mposk98/shashki-validator';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import whiteMan from './icons/white-man.svg';
import blackMan from './icons/black-man.svg';
import whiteKing from './icons/white-king.svg';
import blackKing from './icons/black-king.svg';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            height: '100%',
        },
    }),
);

const gameBoard = JSGameBoard();
const shashkiGame = new shashki.Validator();
shashkiGame.setStartingPosition();
//@ts-ignore
window.shashkiGame = shashkiGame;

const setPiece = (row: number, col: number, flip: boolean = false) => {
    const piece = shashkiGame.boardState[row][col];
    const boardRow = flip ? 7 - row : row;
    const boardCol = flip ? 7 - col : col;
    if (piece !== null) {
        if (piece.turn === shashki.Turns.White) {
            if (piece.pieceType === shashki.PieceTypes.Man) {
                gameBoard.setPiece([boardRow, boardCol], whiteMan);
            } else {
                gameBoard.setPiece([boardRow, boardCol], whiteKing);
            }
        }
        if (piece.turn === shashki.Turns.Black) {
            if (piece.pieceType === shashki.PieceTypes.Man) {
                gameBoard.setPiece([boardRow, boardCol], blackMan);
            } else {
                gameBoard.setPiece([boardRow, boardCol], blackKing);
            }
        }
    } else {
        gameBoard.setPiece([boardRow, boardCol], null);
    }
};
const setPieces = () => {
    for (let row = 0; row < 8; ++row) {
        for (let col = 0; col < 8; ++col) {
            setPiece(row, col);
        }
    }
};
setPieces();

const removeHighlighters = () => {
    for (let row = 0; row < 8; ++row) {
        for (let col = 0; col < 8; ++col) {
            gameBoard.unhighlightCell([row, col]);
        }
    }
};

let idFrom: [number, number] | null = null;

gameBoard.onDragStart((id: [number, number]) => {
    const [row, col] = id;
    const piece = shashkiGame.boardState[row][col];
    if (piece !== null) {
        idFrom = id;
        const possibleMoves = shashkiGame.getPossibleMoves(id);
        if (possibleMoves !== null) {
            possibleMoves.moves.forEach((move: any) => {
                gameBoard.highlightCell(move.to);
            });
        }

        if (piece.turn === shashki.Turns.White) {
            if (piece.pieceType === shashki.PieceTypes.King) {
                return whiteKing;
            }
            return whiteMan;
        }
        if (piece.pieceType === shashki.PieceTypes.King) {
            return blackKing;
        }
        return blackMan;
    }
    return null;
});
gameBoard.onDragEnd((idTo?: [number, number]) => {
    if (idTo !== null) {
        shashkiGame.makeMove(idFrom, idTo);
        idFrom = null;
    }
    setPieces();
    removeHighlighters();
});

interface IGameBoardProps {
    className?: string;
}

function GameBoard({ className }: IGameBoardProps) {
    const classes = useStyles();
    const boardDiv = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        boardDiv.current!.appendChild(gameBoard.elements.main);
        gameBoard.initSize();
        return () => {
            gameBoard.cleanup();
        };
    }, []);

    return <div className={className ?? classes.container} ref={boardDiv} />;
}

export default GameBoard;
