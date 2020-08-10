import React, { Component } from 'react';
import TableMatches from './table.js';
import TableRatings from './table_ratings.js';
import TableLeaderboard from './table_leaderboard.js'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: "76561198014256703",
      count: "250"
    }
  }

  render() {
    return (
      <div style={{marginLeft: 40 + 'px'}}>
        <br></br>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" color="primary" onClick={this.getMatchesData.bind(this)}>
            Matches
          </Button>
          <Button variant="contained" color="secondary" onClick={this.getRatingData.bind(this)} style={{marginLeft: 10 + 'px'}}>
            Ratings
          </Button>
          <Button variant="contained" color="primary" onClick={this.getLeaderboardData.bind(this)} style={{marginLeft: 10 + 'px'}}>
            1v1 Leaderboard
          </Button>
        </div>
        <br></br>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <TextField name="userID" label="Steam ID" variant="outlined" value={this.state.userID} onChange={event => this.setState({ "userID": event.target.value })} />
          <TextField name="count" label="count" variant="outlined" value={this.state.count} onChange={event => this.setState({ "count": event.target.value })} style={{marginLeft: 10 + 'px'}} />
        </div>
        <br></br>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {this.state && this.state.matches ?
            <TableMatches matches={this.state.matches} /> : null
          }
          {this.state && this.state.ratings ?
            <TableRatings matches={this.state.ratings} /> : null
          }
          {this.state && this.state.leaderboard ?
            <TableLeaderboard players={this.state.leaderboard} /> : null
          }
        </div>
      </div>
    );
  }

  getRatingData() {
    const axios = require('axios');
    axios.get('https://cors-anywhere.herokuapp.com/https://aoe2.net/api/player/ratinghistory?game=aoe2de&leaderboard_id=3&steam_id=' + this.state.userID + '&count=' + this.state.count).then((resp) => {
      this.setState({ 'ratings': resp.data });
      this.setState({ 'matches': undefined });
      this.setState({ 'leaderboard': undefined });
    });
  }

  getMatchesData() {
    const axios = require('axios');
    axios.get('https://cors-anywhere.herokuapp.com/https://aoe2.net/api/player/matches?game=aoe2de&steam_id=' + this.state.userID + '&count=' + this.state.count).then((resp) => {
      this.setState({ 'matches': resp.data });
      this.setState({ 'ratings': undefined });
      this.setState({ 'leaderboard': undefined });
    });
  }

  getLeaderboardData() {
    const axios = require('axios');
    axios.get('https://cors-anywhere.herokuapp.com/https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&start=1' + '&count=' + this.state.count).then((resp) => {
      this.setState({ 'matches': undefined });
      this.setState({ 'ratings': undefined });
      this.setState({ 'leaderboard': resp.data.leaderboard });
    });
  }

}

export default App;
