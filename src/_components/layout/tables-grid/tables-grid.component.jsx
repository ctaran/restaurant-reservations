import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';
import TableForm from '../table-form/table-form.component';

const TablesGrid = ( { tables, createTable, updateTable, deleteTable } ) => {    
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

    }, []);

    const handleDeleteTable = (id) => {
        deleteTable(id);
    }

    const handleUpdateTable = (e, index, seats) => {
        (index > maxIndex) ?
        createTable(seats) :
        updateTable(seats)
    }

    return (    
        <Grid>
            { Object.entries(tablesDict).map( (value) =>
                <Grid.Row key={value[0]}>
                    { Object.entries(value[1]).map( (v) => 
                        <Grid.Column key={v[0]}>            
                            <TableForm table={v[1]} maxIndex={maxIndex} handleSubmit={handleUpdateTable} handleDelete={handleDeleteTable}/>
                        </Grid.Column>                                         
                    )}
                </Grid.Row>
            )}         
        </Grid>
    );
};    

export default TablesGrid;