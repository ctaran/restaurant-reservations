import React from 'react';
import { Button, Form, List, Modal } from 'semantic-ui-react';

function ReservationsForm(props) {
    const [reservationsOpen, setReservationsOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
  
    return (
        <>                
            <Modal
            onClose={() => setReservationsOpen(false)}
            onOpen={() => setReservationsOpen(true)}
            open={reservationsOpen}
            trigger={props.children}
            >
            <Modal.Header>Reservations for Table #X</Modal.Header>
            <Modal.Content image>                
                <List divided relaxed animated verticalAlign='middle'>
                    <List.Item>
                        <List.Icon name='hand point right' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>Codruta Mercea</List.Header>
                            <List.Description as='a'>10:00 - 2 pers.</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='hand point right' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>Kerciov Cristian</List.Header>
                            <List.Description as='a'>18:00 - 6 pers.</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='hand point right' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>Sisu Alexandru</List.Header>
                            <List.Description as='a'>21:30 - 3 pers.</List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setAddOpen(true)} primary>Add Reservation</Button>
                <Button onClick={() => setEditOpen(true)} secondary>Edit Reservation</Button>
                <Button color='black' onClick={() => setReservationsOpen(false)}>Cancel</Button>
            </Modal.Actions>
    
            <Modal
                onClose={() => setAddOpen(false)}
                open={addOpen}
                size='small'
            >
                <Modal.Header>Add new reservation</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Date</label>
                                <input placeholder='date' />
                            </Form.Field>
                            <Form.Field>
                                <label>Time</label>
                                <input placeholder='time' />
                            </Form.Field>
                            <Form.Field>
                                <label>Customer Name</label>
                                <input placeholder='name' />
                            </Form.Field> 
                            <Form.Field>
                                <label>Customer Email</label>
                                <input placeholder='email' />
                            </Form.Field> 
                            <Form.Field>
                                <label>Customer Phone number</label>
                                <input placeholder='phone no.' />
                            </Form.Field> 
                            <Button icon='check' type='submit' onClick={() => setAddOpen(false)} positive>Create</Button>
                            <Button color='black' onClick={() => setAddOpen(false)}>Cancel</Button>
                        </Form>
                    </Modal.Content>
                {/* <Modal.Actions>               
                </Modal.Actions> */}
            </Modal>
            <Modal
                onClose={() => setEditOpen(false)}
                open={editOpen}
                size='small'
            >
                <Modal.Header>Update reservation</Modal.Header>
                    <Modal.Content>
                        <p>That's everything!</p>
                    </Modal.Content>
                <Modal.Actions>
                <Button
                    icon='check'
                    content='Update'
                    onClick={() => setEditOpen(false)}
                />
                </Modal.Actions>
            </Modal>

            </Modal>
        </>
    )
}

export default ReservationsForm;