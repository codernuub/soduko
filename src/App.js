import React from 'react';
import soduko from 'sudoku';
import Header from './components/header';
import Board from './components/board';
import './index.css';
import './app.css';


function generateSoduko() {
  const raw = soduko.makepuzzle();
  const rawResult = soduko.solvepuzzle(raw);
  const rows = [];

  for (let i = 0; i < 9; i++) {
    const row = { index: i, cols: [] };
    for (let j = 0; j < 9; j++) {
      const value = (raw[i * 9 + j]);
      const col = {
        row: i,
        col: j,
        value: value !== null ? value : "",
        readOnly: value ? true : false,
        conflict: false
      }
      row.cols.push(col);
    }
    rows.push(row);
  }
  return { rows, rawResult };
}

function checkConflict(solved, cell) {
  const correctValue = solved[cell.row * cell.col];
  if (correctValue === cell.value) {
    return false;
  }
  return true;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soduko: generateSoduko(),
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (cell) => {
    const { rows, rawResult } = this.state.soduko;
    rows[cell.row].cols[cell.col].value = cell.value;
    rows[cell.row].cols[cell.col].conflict = checkConflict(rawResult, cell);
    this.setState({
      rows: [...rows]
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
        <Board rows={this.state.soduko.rows} onChange={this.handleChange} />
        <button className="block m-auto p-2 bg-blue-600 text-white" onClick={this.resetSoduko}>reset</button>
      </div>
    );
  }
}

export default App;