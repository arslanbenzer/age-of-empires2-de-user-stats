import React, { Component } from 'react';
import TableLeaderboard from './tables/TableLeaderBoard.js'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class App extends Component {
  constructor(props) {
    super(props);
    const axios = require('axios');

    this.state = {
      userID: "76561198014256703",
      count: "100",
      searchParam: "",
      leaderboard_id : 3
    }

    this.getLeaderboardData(3);
  }

  render() {
    return (
      <div style={{marginLeft: 40 + 'px'}}>
        <br></br>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" color="primary" onClick={() => this.getLeaderboardData(3)} style={{marginLeft: 10 + 'px'}}>
            1v1 Leaderboard
          </Button>
          <Button variant="contained" color="primary" onClick={() => this.getLeaderboardData(4)} style={{marginLeft: 10 + 'px'}}>
            Team Leaderboard
          </Button>
        </div>
        <br></br>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <TextField name="count" label="count" variant="outlined" value={this.state.count} onChange={event => this.setState({ "count": event.target.value })} style={{marginLeft: 10 + 'px'}} />
          <TextField name="searchParam" label="Search Text" variant="outlined" value={this.state.searchParam} onChange={event => this.setState({ "searchParam": event.target.value })} style={{marginLeft: 10 + 'px'}} />
       </div>
        <br></br>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {this.state && this.state.leaderboard ?
            <TableLeaderboard players={this.state.leaderboard}/> : null
          }
        </div>
      </div>
    );
  }

  getLeaderboardData(leaderboard_id) {
    const axios = require('axios');
    axios.get('https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=' + leaderboard_id + '&start=1&search=' + this.state.searchParam + '&count=' + this.state.count).then((resp) => {
      this.setState({ 'leaderboard': resp.data.leaderboard });
    });
  }

}

export default App;
