import React, { useRef, useEffect } from 'react';
//@ts-ignore
import JSGameBoard from '@mposk98/game-board';
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
gameBoard.onDragStart(() => white);
gameBoard.onDragEnd(() => black);

interface IGameBoardProps {
    className?: string;
}

function GameBoard({ className }: IGameBoardProps) {
    const classes = useStyles();
    const boardDiv = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        boardDiv.current?.appendChild(gameBoard.elements.main);
        gameBoard.initSize();
        return () => {
            gameBoard.cleanup();
        };
    }, []);

    return <div className={className ?? classes.container} ref={boardDiv} />;
}

export default GameBoard;
