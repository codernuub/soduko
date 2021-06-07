import React from 'react';
import Cell from './cell';

function Board(props){
    return (<div id="board" className="grid grid-col-start grid-cols-9 gap-0 min-w-max max-w-max m-auto">
        {props.rows.map(({ index, cols }) => {
            return <div className="rows" key={index}>
                {cols.map((cell => <Cell key={cell.col.toString()} cell={cell} onchange={props.onChange} />))}
            </div>
        })}
    </div>)
}

export default Board;