import React, { useEffect, useState } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import ReservationsPanel from '../reservations-panel/reservations-panel.component';

const ReservationsGrid = ( { tables }) => {
    const [tablesDict, setTablesDict] = useState({});
    const [maxIndex, setMaxIndex] = useState(0);

    useEffect((maxIndex) => {
        let tbls = {};
        let mindex = 0;
        
        for (var i = 1; i <= 15; i++) {
            tbls[i] = {};
            for (var j = 1; j <= 10; j++) {
                tbls[i][j] = null;
            }
        }

        tables.forEach(table => {
            i = table.pos_x;
            j = table.pos_y;
            tbls[i][j] = table;
            mindex = table.index > maxIndex && table.index;
        })

        setTablesDict(tbls);
        setMaxIndex(mindex);

    }, [tables]);

    return (    
        <Grid>
            { Object.entries(tablesDict).map( (value) =>
                <Grid.Row key={value[0]}>
                    { Object.entries(value[1]).map( (v) => 
                        <Grid.Column key={v[0]}>                                        
                            {/* <TableForm pos_x={value[0]} pos_y={v[0]} table={v[1]} maxIndex={maxIndex} handleCreate={handleCreateTable} handleUpdate={handleUpdateTable} handleDelete={handleDeleteTable}/> */}
                            <ReservationsPanel>
                                <Button size='tiny' color='blue' inverted>{v[1] ? `#${v[1].index} - ${v[1].seats} seats` : ''}</Button>
                            </ReservationsPanel>
                        </Grid.Column>                                         
                    )}
                </Grid.Row>
            )}         
        </Grid>
    );
};    

export default ReservationsGrid;