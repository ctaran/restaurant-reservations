import React from 'react';
import ReservationsGrid from './reservations-grid/reservations-grid.component';

const Reservations = ({ restaurant, handleCreateReservation, handleUpdateReservation, handleDeleteReservation }) => {
    const onCreateReservation = (datetime, customerName, customerEmail, customerPhone, table_id) => {
        handleCreateReservation(datetime, customerName, customerEmail, customerPhone, table_id);
    }

    const onUpdateReservation = (id, datetime, customerName, customerEmail, customerPhone) => {
        handleUpdateReservation(id, datetime, customerName, customerEmail, customerPhone);
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