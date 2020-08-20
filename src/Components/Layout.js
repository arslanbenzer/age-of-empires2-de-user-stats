import React, { Component } from 'react';
import Header from './Header'
import { Row, Container } from 'styled-bootstrap-grid'

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

export default Layout;