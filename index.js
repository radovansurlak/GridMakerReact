import React, { Component } from 'react';
import { render } from 'react-dom';
import Box from './Box';
import './style.css';

import brain from 'brain.js';

const GRID_SIZE = 5;

const net = new brain.NeuralNetwork();

const symmetricalPatterns = [
  [0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,0,0,0,0,0],
  [0,0,1,0,0,0,1,1,1,0,1,1,0,1,1,0,1,1,1,0,0,0,1,0,0],
  [1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1],
  [1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1],
  [0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0],
  [0,0,1,0,0,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,0,0,1,0,0],
  [0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0],
  [0,1,1,1,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,0,1,1,1,0],
  [0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0],
]

const asymmetricalPatters = [
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0],

]

symmetricalPatterns.forEach(pattern => {
  console.log(net.train({input: pattern, output: [1]}))
})

const output = net.run([1, 0]);  // [0.987]

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
  }

  updateGrid(index) {
    this.state.grid[index] ^= 1;
    this.forceUpdate()
    console.log(this.state.grid)
  }

  testBrain() {
    console.log(this.state.grid);
    const output = net.run(this.state.grid);
    alert(output);
  }

  trainBrain() {
    let output = this.state.symmetrical === true ? 1 : 0;
    let trainingIteration = net.train([{input: this.state.grid, output: [output]}]);
    console.log(trainingIteration)
    console.log(this.state.symmetrical)
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
        <p>{JSON.stringify(this.state.grid)},</p>
        <label for="symmetrical-checkbox">symmetrical</label><input type="checkbox" id="symmetrical-checkbox" checked={this.state.symmetrical} onClick={() => this.setState({symmetrical: !this.state.symmetrical})}></input>
        <br/>
        <button onClick={() => this.trainBrain()}>Train network</button>
        <button onClick={() => this.testBrain()}>Test network</button>
      </main>
    );
  }
}



render(<App />, document.getElementById('root'));
