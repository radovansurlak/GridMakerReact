import React, { Component } from 'react';
import { render } from 'react-dom';
import Box from './Box';
import './style.css';

import brain from 'brain.js';

const GRID_SIZE = 13;

let net = new brain.NeuralNetwork();

const symmetricalPatterns = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

]

const asymmetricalPatterns = [
 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

if (symmetricalPatterns.length > 0 && asymmetricalPatterns.length > 0) {
  const asymmetryTrainingData = asymmetricalPatterns.map(pattern => ({
      input: pattern,
      output: {symmetrical: 0}
    }))
  const symmetryTrainingData = symmetricalPatterns.map(pattern => ({
      input: pattern,
      output: {symmetrical: 1}
    }))

  const trainingData = [...symmetryTrainingData, ...asymmetryTrainingData]
  console.log(net.train(trainingData))
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      grid: Array(Math.pow(GRID_SIZE,2)).fill(0),
      symmetrical: false,
    }
    this.updateGrid = this.updateGrid.bind(this);
    this.trainBrain = this.trainBrain.bind(this);
    this.testBrain = this.testBrain.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
  }

  updateGrid(index) {
    this.state.grid[index] ^= 1;
    this.forceUpdate()
    let input = document.getElementById('clipboard');
    input.select();
    document.execCommand("copy");
  }

  testBrain() {
    console.log(this.state.grid);
    const output = net.run(this.state.grid);
    alert(output.symmetrical);
  }

  trainBrain() {
    let output = this.state.symmetrical === true ? 1 : 0;
    let trainingIteration = net.train([{input: this.state.grid, output: {symmetrical: output}}]);
    console.log(trainingIteration)
    console.log(this.state.symmetrical)
  }

  resetGrid() {
    this.setState({grid: Array(Math.pow(GRID_SIZE,2)).fill(0)})
  }
   

  render() {
    const breakpoint = Math.sqrt(this.state.grid.length) + 1;
    let boxes = this.state.grid.map((box, index) => <Box index={index} toggled={this.state.grid[index] == 1} onBoxToggle={this.updateGrid} />)
    boxes.forEach((box, index) => {
      (index % breakpoint == 0) && boxes.splice(index, 0, <div className='line-break'/>);
    })

    return (
      <main>
        <div class="grid-container">
          {boxes}
        </div>
        <input id="clipboard" value={JSON.stringify(this.state.grid) + ','}></input>
        <label for="symmetrical-checkbox">symmetrical</label><input type="checkbox" id="symmetrical-checkbox" checked={this.state.symmetrical} onClick={() => this.setState({symmetrical: !this.state.symmetrical})}></input>
        <br/>
        <button onClick={() => this.trainBrain()}>Train network</button>
        <button onClick={() => this.testBrain()}>Test network</button>
        <button onClick={() => this.resetGrid()}>Reset grid</button>
      </main>
    );
  }
}



render(<App />, document.getElementById('root'));
