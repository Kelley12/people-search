import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export class AddPerson extends Component {
    state = { show: false };

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        return (
            <p>
                <button type="button" className="btn btn-secondary" onClick={this.showModal}>Add Person</button>

                <Modal show={this.state.show} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Person</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>This should be a form</Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={this.hideModal}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={this.hideModal}>Create Person</button>
                    </Modal.Footer>
                </Modal>
            </p>
        );
    }
}