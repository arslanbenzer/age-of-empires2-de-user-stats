import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
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

const TableSummary = ({summary, leaderboardStrings}) => {
    const classes = useStyles();
    console.log("summ:  ", summary);
    console.log("leaderboardStrings:  ", leaderboardStrings);
    return (
        summary ?
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
                            {
                                summary.map((leaderboard) =>
                                    leaderboard.leaderboard[0] ?
                                        <TableRow key={0}>
                                            <TableCell>{leaderboardStrings[leaderboard.leaderboard_id]}</TableCell>
                                            <TableCell>{leaderboard.leaderboard[0].rank}</TableCell>
                                            <TableCell>{leaderboard.leaderboard[0].rating}</TableCell>
                                            <TableCell>{leaderboard.leaderboard[0].name}</TableCell>
                                            <TableCell>{leaderboard.leaderboard[0].streak}</TableCell>
                                            <TableCell>{leaderboard.leaderboard[0].lowest_streak}</TableCell>
                                            <TableCell>{leaderboard.leaderboard[0].highest_streak}</TableCell>
                                            <TableCell>{leaderboard.leaderboard[0].games} </TableCell>
                                            <TableCell>{leaderboard.leaderboard[0].wins} ({(leaderboard.leaderboard[0].wins / leaderboard.leaderboard[0].games * 100).toFixed(2)}%)</TableCell>
                                            <TableCell>{leaderboard.leaderboard[0].losses}</TableCell>
                                            <TableCell>{new Date(leaderboard.leaderboard[0].last_match * 1000).toLocaleString()}</TableCell>
                                        </TableRow> : null
                                )
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </div> : null
    );
};

export default TableSummary;