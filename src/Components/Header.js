import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import  {Container} from 'styled-bootstrap-grid'

const Header = () => {
    return (
        <Container>
            <AppBar title="My App">
                <Tabs>
                    <Link to="/" style={{ color: "white" }}>
                        <Tab label="Leaderboard" />
                    </Link>
                    <Tab label="Item 2" />
                    <Tab label="Item 3" />
                    <Tab label="Item 4" />
                </Tabs>
            </AppBar>
            <br></br>
            <br></br>
            <br></br>
        </Container>
    );
};

export default Header;