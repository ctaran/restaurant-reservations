import React, { useState } from 'react'
import { Form, Checkbox } from 'semantic-ui-react'

const PastFutureRadios = ( { onToggle }) => {  
    const [value, setValue] = useState("future");

    const handleChange = (e, { value }) => {
        setValue(value);
        onToggle(value);
    }

    return (
      <Form>        
        <Form.Field>
          <Checkbox radio label='Future reservations' name='checkboxRadioGroup' value='future' checked={value === 'future'} onChange={handleChange}/>
        </Form.Field>
        <Form.Field>
          <Checkbox radio label='Past reservations' name='checkboxRadioGroup' value='past' checked={value === 'past'} onChange={handleChange}/>
        </Form.Field>
      </Form>
    )
}

export default PastFutureRadios;