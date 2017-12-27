import React, { Component } from 'react';

class Ingredient extends Component {
  render() {
    return <li>{this.props.amount} {this.props.unit} {this.props.name}</li>;
  }
}

export default Ingredient;
