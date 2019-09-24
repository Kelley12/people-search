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
                    </tr>
                </thead>
                <tbody>
                    {people.map(person =>
                        <tr key={person.personId}>
                            <td>
                                <div className="card mb-3 person-card">
                                    <div className="row no-gutters">
                                        <div className="col-md-2">
                                            <img src={person.imagePath ? person.imagePath : "Resources/Images/default-picture.png"} className="person-image" alt={person.firstName + " " + person.lastName} />
                                        </div>
                                        <div className="col-md-10">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <h3 className="card-title">{person.firstName + " " + person.lastName}</h3>
                                                        <p className="card-text"><strong>Age</strong> <small className="text-muted">{person.age}</small></p>
                                                        <p className="card-text"><strong>Address</strong> <small className="text-muted">{person.address}</small></p>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <p className="card-text card-interests"><strong>Interests</strong> <small className="text-muted">{person.interests}</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
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
