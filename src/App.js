import React from 'react';
import Header from './components/header';
import Board from './components/board';
import './index.css';

import { generateSoduko, checkConflict } from './lib/sodukoBoard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...generateSoduko() }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (cell) => {
    let { rows, rawResult, emptyCells } = this.state;
    const isCellValueEmpty = (cell.value === "");
    const conflict = isCellValueEmpty ? false : checkConflict(rawResult, cell);
    const currentCell = rows[cell.row].cols[cell.col];

    //update empty cells
    if (!currentCell.conflict) {
      emptyCells -= conflict ? 0 : 1;
    }

    //temp update cell value
    currentCell.value = cell.value;
    currentCell.conflict = conflict;
    currentCell.readOnly = isCellValueEmpty ? false : !conflict;

    this.setState({
      rows: [...rows],
      emptyCells,
    })
  }

  resetSoduko = () => this.setState({ ...generateSoduko() });

  render() {

    return (
      <div className="App">
        <Header emptyCell={this.state.emptyCells} />
        <Board rows={this.state.rows} onChange={this.handleChange} />
        <button className="block m-auto my-4 rounded-lg px-6 py-1 bg-blue-600 text-white" onClick={this.resetSoduko}>Reset</button>
      </div>
    );
  }
}

export default App;