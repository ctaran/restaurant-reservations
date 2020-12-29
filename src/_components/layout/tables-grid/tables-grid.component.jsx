import React from 'react';
import TableForm from '../table-form/table-form.component';
import TablesGridSquare from './tables-grid-square.component';

const TablesGrid = ( { tables, createTable, updateTable, deleteTable } ) => {    
    const handleCreateTable = (pos_x, pos_y, seats) => {        
        createTable(pos_x, pos_y, seats);
    }
    
    const handleUpdateTable = (id, pos_x, pos_y, seats) => {
        updateTable(id, pos_x, pos_y, seats);
    }

    const handleDeleteTable = (id) => {
        deleteTable(id);
    }                
    
    const squares = [];    
    const tablePositions = [];
    let maxIndex = 0;
        
    function renderSquare(i, j) {
        const key = "9" + i.toString() + j.toString();

        return (
            <div key={key} className="grid-item">
                <TablesGridSquare existingTables={tablePositions} x={i} y={j} handleMoveTable={handleUpdateTable}>
                    <TableForm pos_x={i} pos_y={j} table={tablePositions[i][j]} maxIndex={maxIndex} 
                        handleCreate={handleCreateTable} handleUpdate={handleUpdateTable} handleDelete={handleDeleteTable}/>
                </TablesGridSquare>
            </div>);
    }    

    for (let i = 0; i < 15; i++) {
        tablePositions[i] = [];
        for (let j = 0; j < 10; j++) {
            tablePositions[i][j] = null;
        }
    }

    tables.forEach(table => {
        const i = table.pos_x;
        const j = table.pos_y;
        tablePositions[i][j] = table;
        maxIndex = table.index > maxIndex && table.index;
    })  

    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 10; j++) {
            squares.push(renderSquare(i, j));
        }
    }               
    
    return (   
        <div className="grid-container">{squares}</div>
    );    
};   

export default TablesGrid;