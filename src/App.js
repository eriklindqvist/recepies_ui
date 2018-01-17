import React, { Component } from 'react';
import Login from './Login.js'
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
      _this.setState({login: false, recipe_id: this.state.recipe.id});
    }

    this.editRecipe = function(e) {
      _this.setState({login: false, add: true, recipe: this.state.recipe});
    }

    this.savedRecipe = function(e) {
      _this.setState({login: false, add: false, recipe: this.state.recipe, recipe_id: this.state.recipe.id});
    }

    this.setToken = function(token) {
      _this.setState({login: false, token: token});
    }

    this.resetRecipe = this.resetRecipe.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  resetRecipe() {
    this.setState({login: false, add: false, recipe_id: null, recipe: null});
  }

  addRecipe() {
    this.setState({login: false, add: true, recipe_id: null, recipe: null});
  }

  login() {
    this.setState({login: true});
  }

  logout() {
    this.setState({login: false, token: null, add: false, recipe_id: null, recipe: null});
  }

  render() {
    var body, create;

    var login = this.state.token ? <label onClick={this.logout}>Logout</label> : <label onClick={this.login}>Login</label>

    if (this.state.login) {
      body = <Login submit={this.setToken}>Login</Login>;
    } else if (this.state.add) {
      body = <RecipeForm recipe={this.state.recipe} submit={this.savedRecipe} token={this.state.token} />;
    } else if (this.state.recipe_id) {
      body = <Recipe id={this.state.recipe_id} recipe={this.state.recipe} click={this.editRecipe} token={this.state.token} />;
      create = this.state.token && <h5 onClick={this.addRecipe}>Create new recipe</h5>;
    } else {
      body = <Recepies click={this.handleClick} edit={this.editRecipe} token={this.state.token} />;
      create = this.state.token && <h5 onClick={this.addRecipe}>Create new recipe</h5>;
    }

    return (
      <div className="App">
        <header className="header">
          <h1 className="display-1" onClick={this.resetRecipe}>Recepies</h1>
          {login}
        </header>
        {body}
        {create}
      </div>
    );
  }
}

export default App;
