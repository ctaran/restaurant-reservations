import React from 'react';
import TablesGrid from './tables-grid/tables-grid.component';

const Layout = ({ restaurant }) => {
    const onCreateTable = () => {

    }

    const onUpdateTable = () => {
        
    }

    const onDeleteTable = () => {
        
    }

    return (
    <div>
        <h1>Table Layout</h1>
        <TablesGrid tables={restaurant.tables} createTable={onCreateTable} updateTable={onUpdateTable} deleteTable={onDeleteTable}/>
    </div>
    );
}

export default Layout;