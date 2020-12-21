import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import Layout from '../../_components/layout/layout.component';
import Reservations from '../../_components/reservations/reservations.component';
import { authenticationService } from '../../_services';
import { restaurantService } from '../../_services/restaurant.service';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            restaurant: null
        }
    }

    componentDidMount() {
        const manager_id = authenticationService.currentUserValue.id;
        
        restaurantService.getByManagerID(manager_id)
            .then(
                (data) => {
                   this.setState({
                       restaurant: data.restaurant
                   });
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        const { restaurant } = this.state;

        const panes = [
            { menuItem: 'Layout', render: () => <Layout tables={restaurant.tables}/> },
            { menuItem: 'Reservations', render: () => <Reservations tables={restaurant.tables}/> },
        ]

        console.log(restaurant);

        return (
            restaurant ?
                <div className="row">
                    <div className="col"></div>
                    <div className="col-12">
                        <h1>Name: {restaurant.name}</h1>
                        <h2>Manager: {authenticationService.currentUserValue.name}</h2>
                        <Tab panes={panes} menu={{ pointing: true }} />
                    </div>
                    <div className="col"></div>
                </div> :
                <div>Loading...</div>          
        );
    }
}

export default Home;