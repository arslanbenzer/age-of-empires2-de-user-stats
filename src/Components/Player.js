import React, { Component } from 'react';

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

class Player extends Component {
    render() {
        let color = 'grey';
        if (this.props.won === 1) {
            color = 'green';
        } else if (this.props.won === 0) {
            color = 'red';
        }
        return (
            <div style={{ color: color, alignItems: 'center', display: 'flex' }}>
                <img
                    style={{ height: '30px', marginTop: '5px' }}
                    src={process.env.PUBLIC_URL + '/civicons/' + this.props.civ?.toLowerCase() + '.png'}
                    title={this.props.civ}
                ></img>
                <span style={{ marginLeft: '5px' }}>
                    {this.props.name}({this.props.rating})
                </span>
                {this.props.won ? <DoneIcon /> : <ClearIcon />}
            </div>
        );
    }
}

export default Player;
