import React, { Component } from 'react';

export class PersonForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            age: 0,
            address: "",
            interests: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        fetch('api/People', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(_ => this.props.closeModal());
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" className="form-control"
                        value={this.state.firstName} onChange={this.handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" className="form-control"
                        value={this.state.lastName} onChange={this.handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" className="form-control"
                        value={this.state.age} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" className="form-control"
                        value={this.state.address} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="interests">Interests</label>
                    <textarea type="text" id="interests" className="form-control"
                        value={this.state.interests} onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.hideModal}>Create Person</button>
            </form>
        );
    }
}