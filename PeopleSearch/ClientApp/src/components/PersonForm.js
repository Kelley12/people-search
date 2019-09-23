import React, { Component } from 'react';

export class PersonForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            age: 0,
            address: "",
            interests: "",
            imagePath: "Resources\\Images\\default-picture.png",
            image: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleImageChange = (event) => {
        this.setState({
            [event.target.id]: event.target.files[0]
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        var file = this.state.image;
        var formData = new FormData();
        formData.append('file', file, file.name);

        fetch('api/People/Upload', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    imagePath: res.dbPath
                });
            })
            .then(() => this.submitForm())
            .catch(error => console.log(error));
    }

    submitForm() {
        fetch('api/People', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(() => this.props.closeModal())
            .catch(error => console.log(error));
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
                <div className="form-group">
                    <label htmlFor="images">Image</label>
                    <input type="file" id="image" accept="image/png, image/jpeg"
                        onChange={this.handleImageChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.hideModal}>Create Person</button>
            </form>
        );
    }
}