import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import moment from 'moment';

import Player from './../Components/Player'

const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const TableMatches = props => {
    const classes = useStyles();

    let leaderBoardTypes = {
        0: "Unranked",
        1: "1v1 Deathmatch",
        2: "Team Deathmatch",
        3: "1v1 Random Map",
        4: "Team Random Map",
        13: "1v1 Empires Wars"
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Leaderboard</TableCell>
                            <TableCell>Server</TableCell>
                            <TableCell>Players</TableCell>
                            <TableCell>Map</TableCell>
                            <TableCell>Started</TableCell>
                            <TableCell>Match Length</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(props.matches.length > 0) ? props.matches.map((droplet, index) => {
                            let players = droplet.players;
                            let rows = [];
                            const startedTime = droplet.started;
                            const finishedTime = droplet.finished;
                            const now = Date.now() / 1000;

                            let startedText = "";

                            const elapsedTime = Math.floor(now - startedTime);
                            const day = Math.floor(elapsedTime / 60 / 60 / 24);
                            const hour = Math.floor(elapsedTime / 60 / 60);
                            const minute = Math.floor(elapsedTime / 60) - hour * 60;

                            if (elapsedTime && elapsedTime < 60) {
                                startedText = "Just now";
                            } else if (elapsedTime < 60 * 60) {
                                startedText = minute + (minute === 1 ? " min " : " mins ") + " ago";
                            } else if (hour < 3) {
                                startedText = hour + (hour === 1 ? " hour " : " hours ") + minute + (minute === 1 ? " min " : " mins ") + " ago";
                            } else if (hour < 24) {
                                startedText = hour + " hours ago";
                            } else if (day < 2) {
                                startedText = "Yesterday";
                            } else if (day < 30) {
                                startedText = day + " days ago";
                            } else {
                                startedText = moment(new Date(droplet.started * 1000)).format('DD MMM YYYY');
                            }

                            const matchTime = startedTime ? finishedTime - startedTime : null;

                            let matchTimeText = "";
                            const matchHour = Math.floor(elapsedTime / 60 / 60);
                            const matchMinute = Math.floor(elapsedTime / 60) - hour * 60;

                            if (matchTime < 60 * 60) {
                                matchTimeText = matchMinute + (minute === 1 ? " min " : " mins ");
                            } else {
                                matchTimeText = matchHour + (matchHour === 1 ? " hour " : " hours ") + matchMinute + " mins";
                            }

                            for (let index = 0; index < players.length; index++) {
                                rows.push(
                                    <Player
                                        name={players[index].name}
                                        won={players[index].won}
                                        team={players[index].team}
                                        rating={players[index].rating}
                                        civ={props?.strings.civ[players[index].civ]?.string}/>
                                );
                            }

                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{leaderBoardTypes[droplet.leaderboard_id]}</TableCell>
                                    <TableCell>{droplet.server}</TableCell>
                                    <TableCell>
                                        {rows}
                                    </TableCell>
                                    <TableCell>{droplet.location}</TableCell>
                                    <TableCell>{startedText}</TableCell>
                                    <TableCell>{matchTimeText}</TableCell>
                                </TableRow>
                            )
                        }) : <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TableMatches