import React, { Component } from 'react';
import './RecipeListItem.css';

class RecipeListItem extends Component {
  render() {
    return <li onClick={this.props.click.bind(this)}>{this.props.title}</li>;
  }
}

export default RecipeListItem;
