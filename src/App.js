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
      if(!value) emptyCells++;
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
  return { rows, rawResult, emptyCells };
}

function checkConflict(solved, cell) {
  const correctValue = solved[cell.row * 9 + cell.col];
  if (correctValue === cell.value) {
    return false;
  }
  return true;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...generateSoduko() }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (cell) => {
    const { rows, rawResult, emptyCells } = this.state;
    const conflict = checkConflict(rawResult, cell);

    rows[cell.row].cols[cell.col].value = cell.value;
    rows[cell.row].cols[cell.col].conflict = conflict;
    //if value is empty
    emptyCells = cell.value === ""? emptyCells + 1 : emptyCells;
    //if conflict occured
    emptyCells = conflict ? emptyCells : emptyCells - 1;
    this.setState({
      rows: [...rows],
      emptyCells
    })

    if(!this.state.emptyCells) {
      alert("Hurray you won");
      this.resetSoduko();
    }
  }

  resetSoduko = () => this.setState({ ...generateSoduko() });

  render() {
    return (
      <div className="App">
        <Header emptyCell={this.state.emptyCells}/>
        <Board rows={this.state.rows} onChange={this.handleChange} />
        <button className="block m-auto p-2 bg-blue-600 text-white" onClick={this.resetSoduko}>reset</button>
      </div>
    );
  }
}

export default App;