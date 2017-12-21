import React, { Component } from 'react';
import Recepies from './Recepies.js'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {recipe: this.props.recipe}

    var _this = this;

    this.handleClick = function(e) {
      _this.setState({recipe: this.props.id});
    }

    this.resetRecipe = this.resetRecipe.bind(this);
  }

  resetRecipe() {
    this.setState({recipe: null});
  }

  render() {
    var body = this.state.recipe ? <p>Recipe: {this.state.recipe}</p> : <Recepies click={this.handleClick} />

    return (
      <div className="App">
        <header className="header">
          <h1 className="title" onClick={this.resetRecipe}>Recepies</h1>
        </header>
        {body}
      </div>
    );
  }
}

export default App;
