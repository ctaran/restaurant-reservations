import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import DefineRestaurant from '../../_components/define-restaurant/define-restaurant.component';
import Layout from '../../_components/layout/layout.component';
import Reservations from '../../_components/reservations/reservations.component';
import { authenticationService } from '../../_services';
import { restaurantService } from '../../_services/restaurant.service';
import { tableService } from '../../_services/table.service';
import { reservationService } from '../../_services/reservation.service';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            restaurant: null
        }

        this.onCreateTable = this.onCreateTable.bind(this);
        this.onUpdateTable = this.onUpdateTable.bind(this);
        this.onDeleteTable = this.onDeleteTable.bind(this);
        this.createRestaurant = this.createRestaurant.bind(this);
        this.updateRestaurant = this.updateRestaurant.bind(this);
        this.onCreateReservation = this.onCreateReservation.bind(this);
        this.onUpdateReservation = this.onUpdateReservation.bind(this);
        this.onDeleteReservation = this.onDeleteReservation.bind(this);
    }

    componentDidMount() {
        this.updateRestaurant();
    }

    onCreateTable(pos_x, pos_y, seats) {
        const restaurant_id = this.state.restaurant.id;       
        tableService.createNew(pos_x, pos_y, seats, restaurant_id)
            .then(() => {
                this.updateRestaurant();
            });
    }
    
    onUpdateTable(id, pos_x, pos_y, seats) {
        const restaurant_id = this.state.restaurant.id;
        tableService.updateByID(id, pos_x, pos_y, seats, restaurant_id )
            .then(() => {
                this.updateRestaurant();
            });
    }

    onDeleteTable(id) {
        tableService.deleteByID(id)
            .then(() => {
                this.updateRestaurant();
            });
    }        

    onCreateReservation(datetime, customerName, customerEmail, customerPhone, table_id) {
        reservationService.createNew(datetime, customerName, customerEmail, customerPhone, table_id)
            .then(() => {
                this.updateRestaurant();
            });
    }
    
    onUpdateReservation(id, datetime, customerName, customerEmail, customerPhone) {
        reservationService.updateByID(id, datetime, customerName, customerEmail, customerPhone )
            .then(() => {
                this.updateRestaurant();
            });
    }

    onDeleteReservation(id) {
        reservationService.deleteByID(id)
            .then(() => {
                this.updateRestaurant();
            });
    }        

    updateRestaurant() {
        const manager_id = authenticationService.currentUserValue.id;
        
        restaurantService.getByManagerID(manager_id)
            .then(
                (data) => {
                    this.setState({
                       restaurant: data
                   });
                },
                (error) => {
                    // if ([404].indexOf(error.status) !== -1) {
                    //     this.setState({                            
                    //         restaurantAssociated: false
                    //     });
                    // }
                    console.log("message" + error.message);
                }
            )
    }

    createRestaurant(name) {
        const manager_id = authenticationService.currentUserValue.id;
        
        restaurantService.createNew(name, manager_id)
            .then(
                (data) => {    
                    this.setState({
                        restaurant: data
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        const { restaurant } = this.state;
        var panes = null;

        if (restaurant) {
            panes = [
                { menuItem: 'Layout', render: () => <Layout restaurant={restaurant} handleCreateTable={this.onCreateTable} handleUpdateTable={this.onUpdateTable} handleDeleteTable={this.onDeleteTable}/> },
                { menuItem: 'Reservations', render: () => <Reservations restaurant={restaurant} 
                                                            handleCreateReservation={this.onCreateReservation} 
                                                            handleUpdateReservation={this.onUpdateReservation}
                                                            handleDeleteReservation={this.onDeleteReservation}/> },
            ]
        }

        return (
            restaurant ?
                <div className="row">
                    <div className="col"></div>
                    <div className="col-12">
                        <h1>=== {restaurant.name} ===</h1>
                        <h2>Manager: {authenticationService.currentUserValue.name}</h2>
                        <Tab panes={panes} menu={{ pointing: true }} />
                    </div>
                    <div className="col"></div>
                </div> : <DefineRestaurant handleSubmit={this.createRestaurant}/>                           
        );
    }
}

export default Home;