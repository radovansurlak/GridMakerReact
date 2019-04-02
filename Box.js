import React from 'react';

class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: this.props.toggled
    }
  }

  render() {
    let style = {};
    if (this.props.toggled) {
      style.backgroundColor = 'yellow'
    }
    return (
      <div className="grid-box" style={style} onClick={() => { this.props.onBoxToggle(this.props.index) }}>
      </div>
    );
  }
}

export default Grid;
