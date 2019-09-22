import React, { Component } from 'react';
import { Glyphicon, Navbar } from 'react-bootstrap';
import { AddPerson } from './AddPerson';

export class NavBar extends Component {
    displayName = NavBar.name

    render() {
        return (
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#"><Glyphicon glyph='search' /> People Search</Navbar.Brand>
                <AddPerson />
            </Navbar>
        );
    }
}
