import React from 'react';
import { List } from 'semantic-ui-react';

const ReservationList = ({ reservations, handleClick, past }) => {    
    return (
    <List divided relaxed animated verticalAlign='middle'>
        { reservations && reservations.length ? (
            reservations.map((reservation) => {
                const reservationDate = new Date(reservation.date_time);
                const now = new Date();

                return (((!past && reservationDate >= now) || (past && reservationDate < now)) ?
                        <List.Item key={reservation.id} onClick={() => handleClick(reservation)}>
                            <List.Icon name='food' size='normal' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a'>{reservation.customer_name} - {reservation.customer_email} - {reservation.customer_phone}</List.Header>
                                <List.Description as='a'>{`on the ${reservation.date_time.split(" ")[0]} at ${reservation.date_time.split(" ")[1]}`}</List.Description>
                            </List.Content>
                        </List.Item>
                        : null)
            })
        ) : (<h3>No reservations for this table...</h3>
        )}            
    </List>
    );
};

export default ReservationList;