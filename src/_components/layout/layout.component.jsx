import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TablesGrid from './tables-grid/tables-grid.component';

const Layout = ({ restaurant, handleCreateTable, handleUpdateTable, handleDeleteTable }) => {
    const onCreateTable = (pos_x, pos_y, seats) => {
        handleCreateTable(pos_x, pos_y, seats);
    }

    const onUpdateTable = (id, pos_x, pos_y, seats) => {
        handleUpdateTable(id, pos_x, pos_y, seats);
    }

    const onDeleteTable = (id) => {
        handleDeleteTable(id);
    }

    return (
    <div>
        <h2>Table Layout</h2>
        <DndProvider backend={HTML5Backend}>
            <TablesGrid tables={restaurant.tables} createTable={onCreateTable} updateTable={onUpdateTable} deleteTable={onDeleteTable}/>
        </DndProvider>
    </div>
    );
}

export default Layout;