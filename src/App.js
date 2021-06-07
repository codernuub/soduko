import Header from './components/header';
import Board from './components/board';
import './index.css';
import './app.css';
import soduko from 'sudoku';
import React from 'react';

function generateSoduko() {
  const raw = soduko.makepuzzle();
  const rows = [];

  for (let i = 0; i < 9; i++) {
    const row = { index: i, cols: [] };
    for (let j = 0; j < 9; j++) {
      const value = (raw[i * 9 + j]);
      const col = {
        row: i,
        col: j,
        value: value !== null ? value + 1 : "",
        readOnly: value ? true : false,
        conflict:false
      }
      row.cols.push(col);
    }
    rows.push(row);
  }
  return rows;
}

function checkConflict(rows, cell) {
  let conflict = false;
  const cols = rows[cell.row].cols;
  //vertical check
  //same row different col
  for (let i = 0; i < cols.length; i++) {
    if (i === cell.col) continue;
    if (cols[i].value === cell.value) {
      conflict = true;
      break;
    }
  }
  if(conflict) return conflict;
  //same col different row
  for(let j = 0; j < 9; j++) {
    const col = rows[j].cols[cell.col];
    if((cell.row === j) && col.col === cell.col) continue;
    if(col.value === cell.value) {
      conflict = true;
      break;
    }
  }
  return conflict;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: generateSoduko(),
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (cell) => {
    const newRowState = this.state.rows;
    newRowState[cell.row].cols[cell.col].value = cell.value;
    newRowState[cell.row].cols[cell.col].conflict = checkConflict(newRowState, cell);
    this.setState({
      rows: [...newRowState]
    })
  }

  resetSoduko = () => {
    this.setState({
      rows: generateSoduko()
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Board rows={this.state.rows} onChange={this.handleChange} />
        <button className="block m-auto p-2 bg-blue-600 text-white" onClick={this.resetSoduko}>reset</button>
      </div>
    );
  }
}

export default App;
