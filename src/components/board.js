import React from 'react';
import Cell from './cell';

function Board(props){
    return (<div id="board" className="grid grid-rows-9 gap-0 max-w-max m-auto">
        {props.rows.map(({ index, cols }) => {
            return <div className="row grid grid-cols-9 gap-0" key={index}>
                {cols.map((cell => <Cell key={cell.col.toString()} cell={cell} onchange={props.onChange} />))}
            </div>
        })}
    </div>)
}

export default Board;