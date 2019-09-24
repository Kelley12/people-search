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
                            <div class="card mb-3" style="max-width: 1200px;">
                                <div class="row no-gutters">
                                    <div class="col-md-2">
                                        <img src={person.imagePath ? person.imagePath : "Resources/Images/default-picture.png"} className="person-image" alt={person.firstName + " " + person.lastName} />
                                    </div>
                                    <div class="col-md-10">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-8">
                                                    <h5 class="card-title">{person.firstName + " " + person.lastName}</h5>
                                                    <p class="card-text"><h6>Age <small class="text-muted">{person.age}</small></h6></p>
                                                    <p class="card-text"><h6>Address <small class="text-muted">{person.address}</small></h6></p>
                                                </div>
                                                <div class="col-md-4">
                                                <p class="card-text"><h6>Interests <small class="text-muted">{person.interests}</small></h6></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
