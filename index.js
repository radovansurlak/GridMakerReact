import React, { Component } from 'react';
import { render } from 'react-dom';
import Box from './Box';
import './style.css';

import brain from 'brain.js';

const GRID_SIZE = 5;

class App extends Component {
  constructor() {
    super();
    this.state = {
      grid: Array(Math.pow(GRID_SIZE,2)).fill(0),
      ordered: false,
    }
    this.updateGrid = this.updateGrid.bind(this);
    this.trainBrain = this.trainBrain.bind(this);
  }

  updateGrid(index) {
    this.state.grid[index] ^= 1;
    this.forceUpdate()
    console.log(this.state.grid)
  }

  trainBrain() {
    alert('training the brain');
  }
   

  render() {
    const breakpoint = Math.sqrt(this.state.grid.length) + 1;
    console.log(breakpoint)
    let boxes = this.state.grid.map((box, index) => <Box index={index} toggled={this.state.grid[index] == 1} onBoxToggle={this.updateGrid} />)
    boxes.forEach((box, index) => {
      (index % breakpoint == 0) && boxes.splice(index, 0, <div className='line-break'/>);
    })

    return (
      <main>
        <div class="grid-container">
          {boxes}
        </div>
        <p>{JSON.stringify(this.state.grid)}</p>
        <label for="ordered-checkbox">Ordered</label><input type="checkbox" id="ordered-checkbox" checked={this.state.ordered} onClick={() => this.setState({ordered: !this.state.ordered})}></input>
        <br/>
        <button onClick={() => this.trainBrain()}>Train network</button>
      </main>
    );
  }
}

const net = new brain.NeuralNetwork();

net.train([{input: [0, 0], output: [0]},
           {input: [0, 1], output: [1]},
           {input: [1, 0], output: [1]},
           {input: [1, 1], output: [0]}]);

const output = net.run([1, 0]);  // [0.987]

render(<App />, document.getElementById('root'));
