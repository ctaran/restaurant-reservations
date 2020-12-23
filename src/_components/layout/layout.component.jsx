import React from 'react';
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
        <h1>Table Layout</h1>
        <TablesGrid tables={restaurant.tables} createTable={onCreateTable} updateTable={onUpdateTable} deleteTable={onDeleteTable}/>
    </div>
    );
}

export default Layout;