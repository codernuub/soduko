import React from 'react';

function Header(props) {
    return (<header className="text-center">
        <h1 className="font-bold text-4xl text-center p-5">Soduko</h1>
        <p className="mt-2">Empty Cells: {props.emptyCell}</p>
    </header>);
}

export default Header;