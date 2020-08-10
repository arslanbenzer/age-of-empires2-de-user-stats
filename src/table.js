import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import Player from './components/Player'

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const TableMatches = ({ matches }) => {
  const classes = useStyles();

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
              <TableCell>Started</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(matches.length > 0) ? matches.map((droplet, index) => {

              let players = droplet.players;
              let rows = [];
              for (let index = 0; index < players.length; index++) {
                rows.push(<Player name={players[index].name} won={players[index].won} team={players[index].team} rating={players[index].rating} />);
              }

              return (
                <TableRow key={index}>
                  <TableCell >{index + 1}</TableCell>
                  <TableCell >{droplet.leaderboard_id}</TableCell>
                  <TableCell >{droplet.server}</TableCell>
                  <TableCell >
                    {rows}
                  </TableCell>
                  <TableCell >{new Date(droplet.started * 1000).toLocaleString()}</TableCell>
                </TableRow >
              )
            }) : <tr><td colSpan="5">Loading...</td></tr>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableMatches