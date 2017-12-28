import React, { Component } from 'react';
import Recepies from './Recepies.js'
import Recipe from './Recipe.js'
import RecipeForm from './RecipeForm.js'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {add: false, recipe_id: this.props.recipe}

    var _this = this;

    this.handleClick = function(e) {
      _this.setState({recipe_id: this.props.id});
    }

    this.editRecipe = function(e) {
      _this.setState({add: true, recipe: this.state.recipe});
    }

    this.savedRecipe = function(e) {
      _this.setState({add: false, recipe: this.state.recipe, recipe_id: this.state.recipe.id});
    }

    this.resetRecipe = this.resetRecipe.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }

  resetRecipe() {
    this.setState({add: false, recipe_id: null, recipe: null});
  }

  addRecipe() {
    this.setState({add: true, recipe_id: null, recipe: null});
  }

  render() {
    if (this.state.add) {
      var body = <RecipeForm recipe={this.state.recipe} submit={this.savedRecipe} />;
    } else if (this.state.recipe_id) {
      body = <Recipe id={this.state.recipe_id} recipe={this.state.recipe} click={this.editRecipe} />;
    } else {
      body = <Recepies click={this.handleClick} />;
    }

    return (
      <div className="App">
        <header className="header">
          <h1 className="title" onClick={this.resetRecipe}>Recept</h1>
          <h3 onClick={this.addRecipe}>Nytt recept</h3>
        </header>
        {body}
      </div>
    );
  }
}

export default App;
