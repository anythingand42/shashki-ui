import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Buttons from './buttons';
import Lobby from './lobby';

function Home() {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} md={10}>
                    <Lobby />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Buttons />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home;
