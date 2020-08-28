import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const TableSummary = (summary) => {
    const classes = useStyles();

    const player = summary.data[0];
    console.log(player);
    return (
        <div>
            <TableContainer component={Paper} height={300} width={1600}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Leaderboard</TableCell>
                            <TableCell>Rank</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Current Streak</TableCell>
                            <TableCell>Lowest Streak</TableCell>
                            <TableCell>Hights Streak</TableCell>
                            <TableCell>Number of Games</TableCell>
                            <TableCell>Wins</TableCell>
                            <TableCell>Loses</TableCell>
                            <TableCell>Last Match</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={0}>
                            <TableCell >RM 1v1</TableCell>
                            <TableCell >{player.rank}</TableCell>
                            <TableCell >{player.rating}</TableCell>
                            <TableCell >{player.name}</TableCell>
                            <TableCell >{player.streak}</TableCell>
                            <TableCell >{player.lowest_streak}</TableCell>
                            <TableCell >{player.highest_streak}</TableCell>
                            <TableCell >{player.games} </TableCell>
                            <TableCell >{player.wins} ({(player.wins / player.games * 100).toFixed(2)}%)</TableCell>
                            <TableCell >{player.losses}</TableCell>
                            <TableCell >{new Date(player.last_match * 1000).toLocaleString()}</TableCell>
                        </TableRow >
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableSummary;