import React, { useRef, useEffect } from 'react';
//@ts-ignore
import JSGameBoard from '@mposk98/game-board';
//@ts-ignore
import shashki from '@mposk98/shashki-validator';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import white from './icons/white-man.svg';
import black from './icons/black-man.svg';

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

const setPieces = () => {
    for (let row = 0; row < 8; ++row) {
        for (let col = 0; col < 8; ++col) {
            const piece = shashkiGame.boardState[row][col];
            if (piece !== null) {
                if (piece.turn === shashki.Turns.White) {
                    gameBoard.setPiece([row, col], white);
                } else {
                    gameBoard.setPiece([row, col], black);
                }
            } else {
                gameBoard.setPiece([row, col], null);
            }
        }
    }
};
setPieces();

let idFrom: [number, number] | null = null;

gameBoard.onDragStart(([row, col]: [number, number]) => {
    const piece = shashkiGame.boardState[row][col];
    if (piece !== null) {
        idFrom = [row, col];
        if (piece.turn === shashki.Turns.White) {
            return white;
        }
        return black;
    }
    return null;
});
gameBoard.onDragEnd((idTo?: [number, number]) => {
    console.log('idFrom', idFrom);
    console.log('idTo', idTo);
    if (idTo !== null) {
        shashkiGame.makeMove(idFrom, idTo);
        idFrom = null;
        console.log(shashkiGame.ascii());
    }
    setPieces();
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
