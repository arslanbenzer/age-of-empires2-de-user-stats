import React, { Component } from 'react';

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

class Player extends Component {
    render() {
        return (
            <div style={{color: this.props.team == 1 ? "green" : "blue"}}>
                {this.props.name}
                ({this.props.rating})
                {this.props.won ? <DoneIcon /> : <ClearIcon />}
            </div>
        );
    }
}

export default Player;