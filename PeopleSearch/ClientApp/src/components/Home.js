import React, { Component } from 'react';

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
    }

    static renderPeopleTable(people) {
        return (
            <table className='table'>
                <thead>
                    <tr>
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
                            <td>{person.firstName}</td>
                            <td>{person.lastName}</td>
                            <td>{person.age}</td>
                            <td>{person.address}</td>
                            <td>{person.interests}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderPeopleTable(this.state.people);

        return (
            <div>
                <h1>People</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
