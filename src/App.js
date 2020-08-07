import React, { Component } from 'react';
import Table from './table.js';
import TableRatings from './table_ratings.js';

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
        <div>
          <Button variant="contained" color="primary" onClick={this.getMatchesData.bind(this)}>
            Matches
          </Button>
          <Button variant="contained" color="primary" onClick={this.getRatingData.bind(this)}>
            Ratings
          </Button>
        </div>
        <br></br>
        <div>
          <TextField name="userID" label="Steam ID" variant="outlined" value={this.state.userID} onChange={event => this.setState({ "userID": event.target.value })} />
          <TextField name="count" label="count" variant="outlined" value={this.state.count} onChange={event => this.setState({ "count": event.target.value })} />
        </div>
        <br></br>
        <div>
          {this.state && this.state.matches ?
            <Table matches={this.state.matches} /> : null
          }
          {this.state && this.state.ratings ?
            <TableRatings matches={this.state.ratings} /> : null
          }
        </div>
      </div>
    );
  }

  getRatingData() {
    const axios = require('axios');
    axios.get('https://cors-anywhere.herokuapp.com/https://aoe2.net/api/player/ratinghistory?game=aoe2de&leaderboard_id=3&steam_id=' + this.state.userID + '&count=' + this.state.count).then((resp) => {
      this.setState({ 'ratings': resp.data });
    });
  }

  getMatchesData() {
    const axios = require('axios');
    axios.get('https://cors-anywhere.herokuapp.com/https://aoe2.net/api/player/matches?game=aoe2de&steam_id=' + this.state.userID + '&count=' + this.state.count).then((resp) => {
      this.setState({ 'matches': resp.data });
    });
  }

}

export default App;
