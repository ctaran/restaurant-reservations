import React, { useEffect, useState } from 'react';
import ReservationsPanel from '../reservations-panel/reservations-panel.component';

const ReservationsGrid = ( { tables, createReservation, updateReservation, deleteReservation }) => {
    const [tablesDict, setTablesDict] = useState({});

    useEffect(() => {
        let tbls = {};        
        
        for (var i = 0; i < 15; i++) {
            tbls[i] = {};
            for (var j = 0; j < 10; j++) {
                tbls[i][j] = null;
            }
        }

        tables.forEach(table => {
            i = table.pos_x;
            j = table.pos_y;
            tbls[i][j] = table;        
        });

        setTablesDict(tbls);

    }, [tables]);

    const handleCreateReservation = (datetime, customerName, customerEmail, customerPhone, table_id) => {        
        createReservation(datetime, customerName, customerEmail, customerPhone, table_id);
    }
    
    const handleUpdateReservation = (id, datetime, customerName, customerEmail, customerPhone) => { 
        updateReservation(id, datetime, customerName, customerEmail, customerPhone);
    }

    const handleDeleteReservation = (id) => {
        deleteReservation(id);
    }        

    return (            
        <div className="grid-container">
            {Object.entries(tablesDict).map((value) =>
                Object.entries(value[1]).map((v) => (
                    <div key={v[0]} className="grid-item">
                        {v[1] && (
                            <ReservationsPanel table={v[1]}
                            handleCreate={handleCreateReservation}
                            handleUpdate={handleUpdateReservation}
                            handleDelete={handleDeleteReservation}
                            />
                        )}
                    </div>
                ))
            )}
        </div>  
    );
};    

export default ReservationsGrid;