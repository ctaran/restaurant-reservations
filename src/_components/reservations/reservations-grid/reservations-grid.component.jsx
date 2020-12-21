import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import ReservationsPanel from '../reservations-panel/reservations-panel.component';

const ReservationsGrid = () => {
    const columns = _.times(10, (i) => (
        <Grid.Column key={i}>            
            <ReservationsPanel>
                <Button size='tiny' color='grey' inverted>#X - n seats</Button>
            </ReservationsPanel>
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