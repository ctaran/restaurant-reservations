import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../_helpers/drag-and-drop';
import { Button, Form, Modal } from 'semantic-ui-react';

const tableStyle = {
  cursor: 'move'
};

function TableForm( { table, pos_x, pos_y, handleCreate, handleUpdate, handleDelete } ) {  
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

    const [{ isDragging }, drag] = useDrag({
      item: { type: ItemTypes.TABLE, id: table && table.id, seats: table && table.seats },
      collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <>
        <div ref={drag} style={{ ...tableStyle, opacity: isDragging ? 0.5 : 1, }}>
          <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}
            trigger={table ? <Button color='green' inverted>{table ? `#${table.index} - ${table.seats} seats` : ''}</Button>
                          : <Button color='gray' className="button-no-table"></Button>}
            style={{ position:'relative', maxWidth:'600px' }}
          >
            <Modal.Header>{table ? `Table ${table.index}` : 'Add table'}</Modal.Header>
            <Modal.Content>          
              <Form onSubmit={onSubmit}>
                <Form.Input placeholder='Seats' label='Number of seats' name='seats' value={seats} onChange={e => setSeats(e.target.value)}/>
                <div align="right">      
                  <Button content='Submit' positive/>
                  {table && <Button color='red' onClick={onDelete}>Delete Table</Button>}
                  <Button color='black' onClick={() => setOpen(false)}>Back</Button>
                </div>
              </Form>
            </Modal.Content>
          </Modal>
        </div>
      </>
    )
}

export default TableForm;