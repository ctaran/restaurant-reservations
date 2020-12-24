import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import ReservationsPanel from '../reservations-panel/reservations-panel.component';

const ReservationsGrid = ( { tables, createReservation, updateReservation, deleteReservation }) => {
    const [tablesDict, setTablesDict] = useState({});

    useEffect(() => {
        let tbls = {};        
        
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
        })

        setTablesDict(tbls);

    }, [tables]);

    const handleCreateReservation = (date, time, customerName, customerEmail, customerPhone) => {        
        createReservation(date, time, customerName, customerEmail, customerPhone);
    }
    
    const handleUpdateReservation = (id, date, time, customerName, customerEmail, customerPhone) => {
        updateReservation(id, date, time, customerName, customerEmail, customerPhone);
    }

    const handleDeleteReservation = (id) => {
        deleteReservation(id);
    }        


    return (    
        <Grid>
            { Object.entries(tablesDict).map( (value) =>
                <Grid.Row key={value[0]}>
                    { Object.entries(value[1]).map( (v) => 
                        <Grid.Column key={v[0]}>                                        
                            {/* <TableForm pos_x={value[0]} pos_y={v[0]} table={v[1]} maxIndex={maxIndex} handleCreate={handleCreateTable} handleUpdate={handleUpdateTable} handleDelete={handleDeleteTable}/> */}
                            <ReservationsPanel table={v[1]} 
                                handleCreate={handleCreateReservation} 
                                handleUpdate={handleUpdateReservation} 
                                handleDelete={handleDeleteReservation}/>
                        </Grid.Column>                                         
                    )}
                </Grid.Row>
            )}         
        </Grid>
    );
};    

export default ReservationsGrid;