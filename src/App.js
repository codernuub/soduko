import React from 'react';
import soduko from 'sudoku';
import Header from './components/header';
import Board from './components/board';
import './index.css';
import './app.css';

function generateSoduko() {
  const raw = soduko.makepuzzle();
  const rawResult = soduko.solvepuzzle(raw);
  let emptyCells = 0;
  const rows = [];

  for (let i = 0; i < 9; i++) {
    const row = { index: i, cols: [] };
    for (let j = 0; j < 9; j++) {
      const value = (raw[i * 9 + j]);
      if (value === null) emptyCells++;
      const col = {
        row: i,
        col: j,
        value: value !== null ? value : "",
        readOnly: value !== null ? true : false,
        conflict: false
      }
      row.cols.push(col);
    }
    rows.push(row);
  }
  return { rows, rawResult, emptyCells, remEmptyCells: emptyCells };
}

function checkConflict(solved, cell) {
  const correctValue = solved[cell.row * 9 + cell.col];
  if (correctValue === cell.value) {
    return false;
  }
  return true;
}

function trackEmptyCells(emptyCells, remEmptyCells, isCellValueEmpty) {
  //update remaining empty cells value
  if (isCellValueEmpty) {
    let newEmptyCells = remEmptyCells + 1;
    remEmptyCells = newEmptyCells <= emptyCells ? newEmptyCells : remEmptyCells;
  } else {
    remEmptyCells -= 1;
  }
  return remEmptyCells;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...generateSoduko() }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (cell) => {
    let { rows, rawResult, emptyCells, remEmptyCells } = this.state;
    const isCellValueEmpty = (cell.value === "");
    const conflict = isCellValueEmpty ? false : checkConflict(rawResult, cell);
    console.log(conflict);
    //temp update cell value
    rows[cell.row].cols[cell.col].value = cell.value;
    rows[cell.row].cols[cell.col].conflict = conflict;
    rows[cell.row].cols[cell.col].readOnly = isCellValueEmpty ? false : !conflict;
    console.log(rows[cell.row].cols[cell.col])
    
    remEmptyCells = trackEmptyCells(emptyCells, remEmptyCells, isCellValueEmpty)

    this.setState({
      rows: [...rows],
      remEmptyCells
    })

    if (!this.state.emptyCells) {
      alert("Hurray you won");
      this.resetSoduko();
    }
  }

  resetSoduko = () => this.setState({ ...generateSoduko() });

  render() {
    return (
      <div className="App">
        <Header emptyCell={this.state.remEmptyCells} />
        <Board rows={this.state.rows} onChange={this.handleChange} />
        <button className="block m-auto p-2 bg-blue-600 text-white" onClick={this.resetSoduko}>reset</button>
      </div>
    );
  }
}

export default App;