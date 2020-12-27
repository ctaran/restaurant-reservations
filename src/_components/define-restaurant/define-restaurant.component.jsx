import React, { useState } from 'react';
import { Form, Modal } from 'semantic-ui-react';
import { authenticationService } from '../../_services';

const DefineRestaurant = ( { handleSubmit } ) => {
    const [restaurantName, setRestaurantName] = useState('');
    const [open, setOpen] = useState(true);

    const onSubmit = () => {        
        handleSubmit(restaurantName);
        setOpen(false);
    }

    const userName = authenticationService.currentUserValue.name;

    return (
        <Modal onOpen={() => setOpen(true)} open={open} style={{ position: 'relative'}}
            // trigger={<Button size='tiny' color='green' inverted>{table && `#${index} - ${seats} seats`}</Button>}
            >
            <Modal.Header>Hi {userName}! Please define your Restaurant details</Modal.Header>
            <Modal.Content>          
                <Form onSubmit={onSubmit}>
                <Form.Input required placeholder='name' label='Restaurant name' name='name' value={restaurantName} onChange={e => setRestaurantName(e.target.value)}/>           
                <Form.Button content='Submit' positive disabled={!restaurantName}/>                
                </Form>
            </Modal.Content>
        </Modal>
    );
};

export default DefineRestaurant;