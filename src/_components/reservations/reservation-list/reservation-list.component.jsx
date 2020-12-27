import React from 'react';
import { List } from 'semantic-ui-react';

const ReservationList = ({ reservations, handleClick }) => {    
    return (
    <List divided relaxed animated verticalAlign='middle'>
        { reservations && reservations.length ? (
            reservations.map((reservation) => (
                <List.Item onClick={() => handleClick(reservation)}>
                    <List.Icon name='hand point right' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{reservation.customer_name} - {reservation.customer_email} - {reservation.customer_phone}</List.Header>
                        <List.Description as='a'>{`on the ${reservation.date_time.split(" ")[0]} at ${reservation.date_time.split(" ")[1]}`}</List.Description>
                    </List.Content>
                </List.Item>    
            ))
        ) : (
            <h3>No reservations for this table...</h3>
        )}            
    </List>
    );
};

export default ReservationList;