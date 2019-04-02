import React, { Component } from 'react';
import { render } from 'react-dom';
import Box from './Box';
import './style.css';

const gridSize = 14;

class App extends Component {
  constructor() {
    super();
    this.state = {
      grid: Array(Math.pow(gridSize,2)).fill(0)
    }
    this.updateGrid = this.updateGrid.bind(this);
  }

  updateGrid(index) {
    this.state.grid[index] ^= 1;
    this.forceUpdate()
    console.log(this.state.grid)
  }
   

  render() {
    const breakpoint = Math.sqrt(this.state.grid.length) + 1;
    console.log(breakpoint)
    let boxes = this.state.grid.map((box, index) => <Box index={index} toggled={this.state.grid[index] == 1} onBoxToggle={this.updateGrid} />)
    boxes.forEach((box, index) => {
      (index % breakpoint == 0) && boxes.splice(index, 0, <div className='line-break'/>);
    })
    console.log(boxes)

    return (
      <div class="grid-container">
        {boxes}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
