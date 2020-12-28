export const ItemTypes = {
    TABLE: 'table',
}

let tablePosition = [0, 0]
let observers = []
function emitChange() {
  observers.forEach((o) => o && o(tablePosition))
}
export function observe(o) {
  observers.push(o)
  emitChange()
  return () => {
    observers = observers.filter((t) => t !== o)
  }
}
export function moveTable(toX, toY) {
  tablePosition = [toX, toY]  
  emitChange()
}

export const Overlay = ({ color }) => {
    return (<div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
    }}/>);
};