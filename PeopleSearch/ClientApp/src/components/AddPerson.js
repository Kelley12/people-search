import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { PersonForm } from './PersonForm';

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
                    <Modal.Body>
                        <PersonForm closeModal={this.hideModal} />
                    </Modal.Body>
                </Modal>
            </p>
        );
    }
}