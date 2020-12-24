import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

function TableForm( { table, maxIndex, pos_x, pos_y, handleCreate, handleUpdate, handleDelete } ) {  
    const [open, setOpen] = React.useState(false);    
    const [seats, setSeats] = React.useState(
                                table ? table.seats : ''
                              );           

    const onSubmit = () => {            
      table ? handleUpdate(table.id, table.pos_x, table.pos_y, seats) : handleCreate(pos_x, pos_y, seats);
      setOpen(false);
    };

    const onDelete = () => {
      handleDelete(table.id);
      setOpen(false);
    }

    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='tiny' color='green' inverted>{table && `#${table.index} - ${table.seats} seats`}</Button>}
        style={{ position:'relative' }}
      >
        <Modal.Header>{table ? `Table ${table.index}` : 'Add table'}</Modal.Header>
        <Modal.Content>          
          <Form onSubmit={onSubmit}>
            <Form.Input
              placeholder='Number of seats'
              label='Number of seats'
              name='seats'
              value={seats}
              onChange={e => setSeats(e.target.value)}
            />           
            <Form.Button content='Submit' positive/>
            <Button color='red' onClick={onDelete} disabled={!table}>Delete Table</Button>
            <Button color='black' onClick={() => setOpen(false)}>Back</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
}

export default TableForm;