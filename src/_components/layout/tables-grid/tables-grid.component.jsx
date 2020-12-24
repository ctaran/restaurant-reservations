import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import TableForm from '../table-form/table-form.component';

const TablesGrid = ( { tables, createTable, updateTable, deleteTable } ) => {    
    const [tablesDict, setTablesDict] = useState(null);
    const [maxIndex, setMaxIndex] = useState(0);

    useEffect(() => {
        let tbls = {};
        let midx = 0;
        
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
            midx = table.index > midx && table.index;
        })

        setTablesDict(tbls);
        setMaxIndex(midx);

    }, [tables]);

    const handleCreateTable = (pos_x, pos_y, seats) => {        
        createTable(pos_x, pos_y, seats);
    }
    
    const handleUpdateTable = (id, pos_x, pos_y, seats) => {
        updateTable(id, pos_x, pos_y, seats);
    }

    const handleDeleteTable = (id) => {
        deleteTable(id);
    }        

    return (   
        tablesDict && 
        <Grid>
            { Object.entries(tablesDict).map( (value) =>
                <Grid.Row key={value[0]}>
                    { Object.entries(value[1]).map( (v) => 
                        <Grid.Column key={v[0]}>                                        
                            <TableForm pos_x={value[0]} pos_y={v[0]} table={v[1]} maxIndex={maxIndex} handleCreate={handleCreateTable} handleUpdate={handleUpdateTable} handleDelete={handleDeleteTable}/>
                        </Grid.Column>                                         
                    )}
                </Grid.Row>
            )}         
        </Grid>
    );
};    

export default TablesGrid;