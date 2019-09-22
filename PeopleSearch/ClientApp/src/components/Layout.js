import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { NavBar } from './NavBar';

export class Layout extends Component {
    displayName = Layout.name

    render() {
        return (
            <Grid fluid>
                <Row>
                    <NavBar />
                </Row>
                <Row>
                    <div className="container">
                        {this.props.children}
                    </div>
                </Row>
            </Grid>
        );
    }
}
