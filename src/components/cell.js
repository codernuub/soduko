import React from 'react';

class Cell extends React.Component {
    handleChange = (e) => {
        const value = e.target.value === "" ? "" : parseInt(e.target.value, 10)
        this.props.onchange({ ...this.props.cell, value });
    }
    render() {
        const cellData = this.props.cell;
        const isCellValueEmpty = cellData.value === "";
        let styles = "col flex w-5 h-5 m-1 text-center border-black border-2 "
        let bgColor = "";
        bgColor = isCellValueEmpty ? "" : "bg-yellow-300";
        bgColor = !isCellValueEmpty && cellData.conflict ? "bg-red-500" : bgColor;
        styles += bgColor;

        return (
            <input
                type="number"
                onChange={this.handleChange}
                value={!isCellValueEmpty ? cellData.value : ""}
                className={styles}
                readOnly={cellData.readOnly} />
        );
    }
}

export default Cell