import React from 'react';
import ReservationsGrid from './reservations-grid/reservations-grid.component';

const Reservations = ( { restaurant }) => (
    <div>
        <h1>Manage Reservations</h1>
        <ReservationsGrid tables={restaurant.tables} />
    </div>
)

export default Reservations;