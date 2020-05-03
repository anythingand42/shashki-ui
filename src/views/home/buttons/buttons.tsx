import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const menuButton = (text: string) => (
    <Button fullWidth variant="contained" color="primary">
        {text}
    </Button>
);

function Buttons() {
    return (
        <>
            <Grid item>{menuButton('custom')}</Grid>
            <Grid item>{menuButton('bullet 1+0')}</Grid>
            <Grid item>{menuButton('bullet 2+1')}</Grid>
            <Grid item>{menuButton('blitz 3+0')}</Grid>
            <Grid item>{menuButton('blitz 3+2')}</Grid>
            <Grid item>{menuButton('blitz 5+0')}</Grid>
            <Grid item>{menuButton('blitz 5+3')}</Grid>
            <Grid item>{menuButton('rapid 10+0')}</Grid>
            <Grid item>{menuButton('rapid 10+5')}</Grid>
            <Grid item>{menuButton('rapid 15+10')}</Grid>
        </>
    );
}

export default Buttons;
