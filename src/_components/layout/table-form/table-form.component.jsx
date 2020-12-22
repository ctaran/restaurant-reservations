import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

function TableForm( { table, maxIndex, handleSubmit, handleDelete } ) {
  
    const [open, setOpen] = React.useState(false);
    const [index, setIndex] = React.useState(
      table ? table.index : maxIndex+1
    )
    const [seats, setSeats] = React.useState(
      table ? table.seats : ''
    );           

    const onSubmit = () => {
      const { seats } = this.state;  
      handleSubmit(index, seats);
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
        trigger={<Button size='tiny' color='green' inverted>{table && `#${index} - ${seats} seats`}</Button>}
      >
        <Modal.Header>Table {index}</Modal.Header>
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