import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
    displayName = Home.name

    constructor(props) {
        super(props);
        this.state = { people: [], loading: true };

        fetch('api/People')
            .then(response => response.json())
            .then(data => {
                this.setState({ people: data, loading: false });
            });

        this.handleSearch = this.handleSearch.bind(this);
    }

    static renderPeopleTable(people) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Interests</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(person =>
                        <tr key={person.personId}>
                            <td><img src={person.imagePath ? person.imagePath : "Resources/Images/default-picture.png"} className="person-image" alt={person.firstName + " " + person.lastName} /></td>
                            <td>{person.age}</td>
                            <td>{person.address}</td>
                            <td>{person.interests}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    handleSearch(e) {
        this.setState({ people: [], loading: true });

        fetch('api/People/Search', {
            method: 'POST',
            body: JSON.stringify(e.target.value),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ people: data, loading: false });
            });
    }

    render() {
        let contents = this.state.loading
            ? <div className="container"><h1 className="loading">Loading...</h1></div>
            : this.state.people.length < 1
                ? <div className="container"><h1 className="loading">No results match your search</h1></div>
            : Home.renderPeopleTable(this.state.people);

        return (
            <div>
                <input type="text" onChange={this.handleSearch} className="form-control" placeholder="Search..." />
                {contents}
            </div>
        );
    }
}
