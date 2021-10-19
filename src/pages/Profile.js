import React, {Component} from 'react';

import queryString from 'query-string';
import TableMatches from './../tables/TableMatches.js';
import TableRatings from './../tables/TableRatings.js';
import TableSummary from './../tables/TableSummary'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";

class Profile extends Component {

    constructor(props) {
        super(props);
        const axios = require('axios');

        let params = queryString.parse(window.location.search);

        this.state = {
            userID: params.id,
            count: 250,
            ratings: [],
            summary: [],
        }
    }

    componentDidMount() {
        this.getStrings();
        this.getLeaderboards();
        this.getRatingData();
        this.getMatchesData();
    }

    getStrings() {
        const axios = require('axios');

        axios.get('https://aoe2.net/api/strings?game=aoe2de&language=en').then((resp) => {
            this.setState({'strings': resp.data});
        });
    }

    getRatingData() {
        this.setState({
            ratings: [],
        });
        this.getLeaderboardRatings(3);
        this.getLeaderboardRatings(4);
        this.getLeaderboardRatings(13);
        this.getLeaderboardRatings(14);
    }

    getLeaderboardRatings(leaderboardId) {
        const axios = require('axios');
        axios.get('https://aoe2.net/api/player/ratinghistory?game=aoe2de&leaderboard_id=' + leaderboardId + '&steam_id=' + this.state.userID + '&count=' + this.state.count).then((resp) => {
            this.setState({
                'ratings':
                    [
                        ...this.state.ratings,
                        {
                            'data': resp.data,
                            leaderboardId,
                            hidden: 0,
                        }
                    ]
            });
        });
    }

    getMatchesData() {
        const axios = require('axios');
        axios.get('https://aoe2.net/api/player/matches?game=aoe2de&steam_id=' + this.state.userID + '&count=' + this.state.count).then((resp) => {
            this.setState({'matches': resp.data});
        });
    }

    getLeaderboards() {
        this.getLeaderboardData(3);
        this.getLeaderboardData(4);
        this.getLeaderboardData(13);
        this.getLeaderboardData(14);
    }

    getLeaderboardData(leaderboard_id) {
        const axios = require('axios');
        axios.get('https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=' + leaderboard_id + '&start=1&steam_id=' + this.state.userID + '&count=' + this.state.count).then((resp) => {
            this.setState({'summary': [...this.state.summary, resp.data]});
        });
    }

    getLeaderboardNames() {
        const leaders = this.state.strings?.leaderboard;
        const leaderMap = {};
        for (let i = 0; i < leaders?.length; i++) {
            leaderMap[leaders[i].id] = leaders[i].string;
        }
        return leaderMap;
    }

    onChangeCheckBox(checked, index) {
        debugger;
        const { ratings } = this.state;
        if (checked) {
            ratings[index].hidden = 0;

        } else {
            ratings[index].hidden = 1;
        }
        this.setState({
            ratings
        })
    }

    render() {
        return (
            <div style={{marginLeft: 40 + 'px'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <TextField name="userID" label="Steam ID" variant="outlined" value={this.state.userID}
                               onChange={event => this.setState({"userID": event.target.value})}/>
                    <TextField name="count" label="count" variant="outlined" value={this.state.count}
                               onChange={event => this.setState({"count": event.target.value})}
                               style={{marginLeft: 10 + 'px'}}/>
                </div>
                <br></br>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="contained" color="primary" onClick={this.getMatchesData.bind(this)}>
                        Matches
                    </Button>
                    <Button variant="contained" color="secondary" onClick={this.getRatingData.bind(this)}
                            style={{marginLeft: 10 + 'px'}}>
                        Ratings
                    </Button>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {
                        this.state && this.state.summary ? <TableSummary summary={this.state.summary}
                                                                         leaderboardStrings={this.getLeaderboardNames()}/> : null
                    }
                </div>
                <br></br>
                <hr></hr>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {
                        this.state && this.state.ratings ?
                            <FormGroup row>
                                {
                                    this.state.ratings.map((rating, i) => {
                                        const leaderboardName = this.getLeaderboardNames()[rating.leaderboardId];
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked={1}
                                                    name={leaderboardName}
                                                    onChange={event => this.onChangeCheckBox(event.target.checked, i)}
                                                />
                                            }
                                            label={leaderboardName}
                                        />)
                                    })
                                }
                            </FormGroup>
                            : null
                    }
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {
                        this.state && this.state.ratings ? <TableRatings ratings={this.state.ratings} leaderboardNames={this.getLeaderboardNames()}/> : null
                    }
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {
                        this.state && this.state.matches && this.state.strings ?
                            <TableMatches matches={this.state.matches} strings={this.state.strings}/> : null
                    }
                </div>
            </div>
        );
    }
}

export default Profile;