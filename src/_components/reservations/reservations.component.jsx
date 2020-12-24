import React from 'react';
import ReservationsGrid from './reservations-grid/reservations-grid.component';

const Reservations = ({ restaurant, handleCreateReservation, handleUpdateReservation, handleDeleteReservation }) => {
    const onCreateReservation = (date, time, customerName, customerEmail, customerPhone) => {
        handleCreateReservation(date, time, customerName, customerEmail, customerPhone);
    }

    const onUpdateReservation = (id, date, time, customerName, customerEmail, customerPhone) => {
        handleUpdateReservation(id, date, time, customerName, customerEmail, customerPhone);
    }

    const onDeleteReservation = (id) => {
        handleDeleteReservation(id);
    }
    
    return (
        <div>
            <h1>Manage Reservations</h1>
            <ReservationsGrid tables={restaurant.tables} 
                            createReservation={onCreateReservation} 
                            updateReservation={onUpdateReservation} 
                            deleteReservation={onDeleteReservation}/>
        </div>
    );
}

export default Reservations;