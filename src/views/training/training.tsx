import React, { useRef, useEffect } from 'react';
//@ts-ignore
import GameBoard from '@mposk98/game-board';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            height: '100%',
        },
    }),
);

const gameBoard = GameBoard();

function Training() {
    const classes = useStyles();
    const boardDiv = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        boardDiv.current?.appendChild(gameBoard.elements.main);
        gameBoard.initSize();
        return () => {
            gameBoard.cleanup();
        };
    }, []);

    return <div className={classes.container} ref={boardDiv} />;
    // return null
}

export default Training;
