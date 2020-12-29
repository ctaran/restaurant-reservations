import React, { useEffect } from 'react';
import { Button, Checkbox, Modal } from 'semantic-ui-react';
import { reservationService } from '../../../_services/reservation.service';
import ReservationForm from '../reservation-form/reservation-form.component';
import ReservationList from '../reservation-list/reservation-list.component';

function ReservationsPanel( { table, handleCreate, handleUpdate, handleDelete }) {
    const [reservations, setReservations] = React.useState([]);
    const [selectedReservation, setSelectedReservation] = React.useState(null);
    const [pastReservations, setPastReservations] = React.useState(false);
    const [reservationsOpen, setReservationsOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
  
    useEffect(() => {
        reservationService.getByTableID(table.id)
            .then((data) => {
                setReservations(data.reservations);
            });
    }, [table]);

    const onCreate = (datetime, customerName, customerEmail, customerPhone) => {    
        handleCreate(datetime, customerName, customerEmail, customerPhone, table.id);
        setAddOpen(false);
    }

    const onUpdate = (datetime, customerName, customerEmail, customerPhone) => {          
        handleUpdate(selectedReservation.id, datetime, customerName, customerEmail, customerPhone);
        setEditOpen(false);
    }

    const onDelete = () => {
        handleDelete(selectedReservation.id);
        setDeleteOpen(false);
    }

    const handleReservationClick = (reservation) => {
        setSelectedReservation(reservation);
        setEditOpen(true);
    }
    
    const handlePastFutureToggle = (data) => {        
        setPastReservations(data.checked);        
    }

    return (               
        <Modal tiny onClose={() => setReservationsOpen(false)} onOpen={() => setReservationsOpen(true)} open={reservationsOpen} style={{ position: 'relative'}}
                trigger={<Button color='blue' inverted>{table ? `#${table.index} - ${table.seats} seats` : ''}</Button>}>
            <Modal.Header>Reservations for Table #{table.index}</Modal.Header>
            <Modal.Content image>                       
                <ReservationList past={pastReservations} reservations={table && reservations} handleClick={handleReservationClick}/>                    
            </Modal.Content>
            <Modal.Actions>
                <Checkbox toggle label='Show past reservations' onChange={(evt, data) => handlePastFutureToggle(data)}/>
                <Button onClick={() => setAddOpen(true)} primary>Add Reservation</Button>
                <Button color='black' onClick={() => setReservationsOpen(false)}>Back</Button>
            </Modal.Actions> 

            <Modal onClose={() => setAddOpen(false)} open={addOpen} size='small' style={{ position: 'relative'}}>
                <Modal.Header>Add new reservation</Modal.Header>
                    <Modal.Content>
                        <ReservationForm tableID={table.id} onSubmit={onCreate} onClose={() => setAddOpen(false)}/>
                    </Modal.Content>                   
            </Modal>

            <Modal onClose={() => setEditOpen(false)} open={editOpen} size='small' style={{ position: 'relative'}}>
                <Modal.Header>Update reservation</Modal.Header>
                    <Modal.Content>
                        <ReservationForm reservation={selectedReservation} tableID={table.id} onSubmit={onUpdate} onDelete={() => setDeleteOpen(true)} onClose={() => setEditOpen(false)}/>
                    </Modal.Content>                         
            </Modal>    

            <Modal onClose={() => setDeleteOpen(false)} open={deleteOpen} size='small' style={{ position: 'relative'}}>
                <Modal.Header>Delete reservation</Modal.Header>
                <Modal.Content>
                    <h3>Are you sure you want to remove this reservation?</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={onDelete} positive>Yes</Button>                            
                    <Button color='black' onClick={() => setDeleteOpen(false)}>No</Button>
                </Modal.Actions>                   
            </Modal>
        </Modal>
    )
}

export default ReservationsPanel;