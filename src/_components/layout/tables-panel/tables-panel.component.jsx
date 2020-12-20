import React from 'react';
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';
import TableForm from '../table-form/table-form.component';

const TablesGrid = () => {
    const columns = _.times(10, (i) => (
        <Grid.Column key={i}>            
            <TableForm/>        
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

export default TablesGrid;