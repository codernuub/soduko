import React from 'react';
import Header from './components/header';
import Board from './components/board';
import './index.css';
import './app.css';

import {generateSoduko, checkConflict, trackEmptyCells} from './lib/sodukoBoard';

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