import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import ReservationsForm from '../reservations-form/reservations-form.component';

const ReservationsGrid = () => {
    const columns = _.times(10, (i) => (
        <Grid.Column key={i}>            
            <ReservationsForm>
                <Button size='tiny' color='grey' inverted>#X - n seats</Button>
            </ReservationsForm>
        </Grid.Column>
      ))

    const rows = _.times(15, (i) => (
        <Grid.Row key={i}>
            {columns}
        </Grid.Row>        
    ))

    return (    
        <Grid>
            {rows}
        </Grid>
    );
};    

export default ReservationsGrid;