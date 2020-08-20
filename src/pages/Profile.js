import React, { Component } from 'react';

import queryString from 'query-string';
import TableMatches from './../tables/TableMatches.js';
import TableRatings from './../tables/TableRatings.js';
import TableSummary from './../tables/TableSummary'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Profile extends Component {

    constructor(props) {
        super(props);
        const axios = require('axios');

        let params = queryString.parse(window.location.search);

        this.state = {
            userID: params.id,
            count: 250
        }

        this.getRatingData();
        this.getMatchesData();
        this.getStrings();
        this.getLeaderboardData(3);
    }

    getStrings() {
        const axios = require('axios');

        axios.get('https://cors-anywhere.herokuapp.com/https://aoe2.net/api/strings?game=aoe2de&language=en').then((resp) => {
            this.setState({ 'strings': resp.data });
        });
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

    getLeaderboardData(leaderboard_id){
        const axios = require('axios');
        axios.get('https://cors-anywhere.herokuapp.com/https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=' + leaderboard_id + '&start=1&steam_id=' + this.state.userID + '&count=' + this.state.count).then((resp) => {
          this.setState({ 'summary': resp.data.leaderboard });
        });
    }

    render() {
        return (
            <div style={{ marginLeft: 40 + 'px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField name="userID" label="Steam ID" variant="outlined" value={this.state.userID} onChange={event => this.setState({ "userID": event.target.value })} />
                    <TextField name="count" label="count" variant="outlined" value={this.state.count} onChange={event => this.setState({ "count": event.target.value })} style={{ marginLeft: 10 + 'px' }} />
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={this.getMatchesData.bind(this)}>
                        Matches
                    </Button>
                    <Button variant="contained" color="secondary" onClick={this.getRatingData.bind(this)} style={{ marginLeft: 10 + 'px' }}>
                        Ratings
                    </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        this.state && this.state.summary ? <TableSummary data={this.state.summary} /> : null
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        this.state && this.state.ratings ? <TableRatings matches={this.state.ratings} /> : null
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        this.state && this.state.matches && this.state.strings ? <TableMatches matches={this.state.matches} strings={this.state.strings} /> : null
                    }
                </div>
            </div>
        );
    }
}

export default Profile;