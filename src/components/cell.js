import React from 'react';

class Cell extends React.Component {
    handleChange = (e) => {
        const value = e.target.value === "" ? "" : parseInt(e.target.value, 10)
        this.props.onchange({ ...this.props.cell, value });
    }
    render() {
        const cellData = this.props.cell;
        let styles = "flex w-5 h-5 m-1 text-center border-black border-2 "
        let bgColor = "";

        bgColor = cellData.value ? "bg-yellow-300" : "";
        bgColor = cellData.value && cellData.conflict ? "bg-red-500" : bgColor;
        
        styles += bgColor;
        return (
            <input 
            onChange={this.handleChange} 
            value={cellData.value ? cellData.value : ""} 
            className={styles}
            readOnly={cellData.readOnly} />
        );
    }
}

export default Cell