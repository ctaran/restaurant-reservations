import React from 'react';
import { useDrop } from 'react-dnd';
import { Square } from './square.component';
import { moveTable, ItemTypes, Overlay } from '../../../_helpers/drag-and-drop';

const TablesGridSquare = ({ existingTables, x, y, children, handleMoveTable }) => {   
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.TABLE,
        canDrop: () => !existingTables[x][y],
        drop: (table) => {
            moveTable(x, y);
            handleMoveTable(table.id, x, y, table.seats);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });
    
    return (<div ref={drop} style={{ position: 'relative', width: '100%', height: '100%' }}>
                {children}
                {isOver && !canDrop && <Overlay color="red"/>}
                {isOver && canDrop && <Overlay color="green"/>}
            </div>);
}

export default TablesGridSquare;