import React from 'react';
import { List } from 'semantic-ui-react';

const ReservationList = ({ reservations }) => (    
    <List divided relaxed animated verticalAlign='middle'>
        { reservations && reservations.length ? (
            reservations.map(reservation => (
                <List.Item>
                    <List.Icon name='hand point right' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{reservation.customerName}</List.Header>
                        <List.Description as='a'>10:00 - 2 pers.</List.Description>
                    </List.Content>
                </List.Item>    
            ))
        ) : (
            <h3>No reservations for this table...</h3>
        )}            
    </List>
);

export default ReservationList;