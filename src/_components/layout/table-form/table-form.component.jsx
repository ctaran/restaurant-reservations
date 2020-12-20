import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

function TableForm() {
    const [open, setOpen] = React.useState(false)
  
    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='tiny' color='green' inverted>#X - n seats</Button>}
      >
        <Modal.Header>Table X</Modal.Header>
        <Modal.Content>          
          <Form>
            <Form.Field>
                <label>Seat count</label>
                <input placeholder='Seat count' />
            </Form.Field>            
            <Button type='submit' onClick={() => setOpen(false)} positive>Submit</Button>
            <Button color='red' onClick={() => setOpen(false)}>Delete Table</Button>
            <Button color='black' onClick={() => setOpen(false)}>Cancel</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
}

export default TableForm;