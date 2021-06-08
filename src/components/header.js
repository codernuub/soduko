import React from 'react';

function Header(props) {
    const message = props.emptyCell ? `Empty Cells: ${props.emptyCell}` : "Hurray! you won";
    const styles = `mt-2 ${props.emptyCell ? '':'text-green-800 font-bold'}`;
    return (<header className="text-center">
        <h1 className="font-bold text-4xl text-center p-5">Soduko</h1>
        <p className={styles}>{message}</p>
    </header>);
}

export default Header;