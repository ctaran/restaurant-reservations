import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import ReservationForm from '../reservation-form/reservation-form.component';
import ReservationList from '../reservation-list/reservation-list.component';

function ReservationsPanel(props) {
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
            style={{ position: 'relative'}}
            >
            <Modal.Header>Reservations for Table #X</Modal.Header>
            <Modal.Content image>
                <ReservationList reservations={props.reservations}/>                    
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setAddOpen(true)} primary>Add Reservation</Button>
                <Button onClick={() => setEditOpen(true)} primary>Edit Reservation</Button>
                <Button color='black' onClick={() => setReservationsOpen(false)}>Back</Button>
            </Modal.Actions>
        
                <Modal
                    onClose={() => setAddOpen(false)}
                    open={addOpen}
                    size='small'
                    style={{ position: 'relative'}}
                >
                    <Modal.Header>Add new reservation</Modal.Header>
                        <Modal.Content>
                            <ReservationForm onSubmit={() => setAddOpen(false)} onClose={() => setAddOpen(false)}/>
                        </Modal.Content>                   
                </Modal>
                <Modal
                    onClose={() => setEditOpen(false)}
                    open={editOpen}
                    size='small'
                    style={{ position: 'relative'}}
                >
                    <Modal.Header>Update reservation</Modal.Header>
                        <Modal.Content>
                            <ReservationForm onSubmit={() => setEditOpen(false)} onClose={() => setEditOpen(false)}/>
                        </Modal.Content>                   
                </Modal>

            </Modal>
        </>
    )
}

export default ReservationsPanel;