import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    paper: {
        height: '80vh',
    },
});

function createData(name: string, rating: number, time: string, mode: string) {
    return { name, rating, time, mode };
}

const rows = [
    createData('Lambert', 1529, '1+0', 'rated'),
    createData('Kramnik', 2750, '2+0', 'rated'),
    createData('Carlsen', 2890, '3+2', 'rated'),
    createData('Caruana', 2810, '5+0', 'rated'),
    createData('Giri', 2556, '15+3', 'rated'),
];

function Lobby() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Player</TableCell>
                            <TableCell align="center">Rating</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Mode</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.rating}</TableCell>
                                <TableCell align="center">{row.time}</TableCell>
                                <TableCell align="center">{row.mode}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default Lobby;
