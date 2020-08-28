import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Link, Route, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const handleClick = (id) => {

}

const TableLeaderboard = ({ players }) => {
  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Number of Games</TableCell>
              <TableCell>Streak</TableCell>
              <TableCell>Won</TableCell>
              <TableCell>Last Match</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(players.length > 0) ? players.map((player, index) => {
              return (
                <TableRow key={index}>
                  <TableCell >{player.rank}</TableCell>
                  <TableCell >{player.rating}</TableCell>
                  <TableCell onClick={() => { handleClick(player.steam_id) }}>
                    <Link to={"/profile?id=" + player.steam_id }>{player.name}</Link>
                  </TableCell>
                  <TableCell >{player.games} </TableCell>
                  <TableCell >{player.streak}</TableCell>
                  <TableCell >{player.wins} ({(player.wins / player.games * 100).toFixed(2)}%)</TableCell>
                  <TableCell >{new Date(player.last_match * 1000).toLocaleString()}</TableCell>
                </TableRow >
              )
            }) : <tr><td colSpan="5">Loading...</td></tr>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableLeaderboard