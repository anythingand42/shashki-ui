import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import GameBoard from '../../components/game-board';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            height: '100%',
        },
    }),
);

function Training() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <GameBoard />
        </div>
    );
}

export default Training;
