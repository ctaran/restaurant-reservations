import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import ReservationForm from '../reservation-form/reservation-form.component';
import ReservationList from '../reservation-list/reservation-list.component';

function ReservationsPanel( { table, handleCreate, handleUpdate, handleDelete }) {
    const [reservationsOpen, setReservationsOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
  
    const onCreate = (date, time, customerName, customerEmail, customerPhone) => {            
        handleCreate(date, time, customerName, customerEmail, customerPhone);
        setAddOpen(false);
    }

    const onUpdate = (date, time, customerName, customerEmail, customerPhone) => {            
        handleUpdate(date, time, customerName, customerEmail, customerPhone);
        setEditOpen(false);
    }

    const onDelete = () => {
        handleDelete(table.id);
        setDeleteOpen(false);
    }

    return (
        <>                
            <Modal
            onClose={() => setReservationsOpen(false)}
            onOpen={() => setReservationsOpen(true)}
            open={reservationsOpen}
            trigger={<Button size='tiny' color='blue' inverted>{table ? `#${table.index} - ${table.seats} seats` : ''}</Button>}
            style={{ position: 'relative'}}
            >
            <Modal.Header>Reservations for Table #X</Modal.Header>
            <Modal.Content image>
                <ReservationList reservations={table && table.reservations}/>                    
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
                            <ReservationForm add onSubmit={onCreate} onClose={() => setAddOpen(false)}/>
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
                            <ReservationForm onSubmit={onUpdate} onClose={() => setEditOpen(false)}/>
                        </Modal.Content>                   
                </Modal>
                <Modal
                    onClose={() => setDeleteOpen(false)}
                    open={deleteOpen}
                    size='small'
                    style={{ position: 'relative'}}
                >
                    <Modal.Header>Delete reservation</Modal.Header>
                        <Modal.Content>
                            {/* <ReservationForm onSubmit={onDelete} onClose={() => setDeleteOpen(false)}/> */}
                            <h2>Are you sure you want to remove the reservation?</h2>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={onDelete} positive>Yes</Button>                            
                            <Button color='black' onClick={() => setDeleteOpen(false)}>No</Button>
                        </Modal.Actions>                   
                </Modal>

            </Modal>
        </>
    )
}

export default ReservationsPanel;