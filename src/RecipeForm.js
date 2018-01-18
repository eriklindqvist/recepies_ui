import React, { Component } from 'react';
import { Alert, Collapse, Glyphicon, Panel, FormGroup, ControlLabel, FormControl, Label, Button, Image } from 'react-bootstrap'

import IngredientForm from './IngredientForm.js'

import './RecipeForm.css';

class RecipeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.recipe||{title: "", description:"", url: "", ingredients: []},
      existingIngredients: null,
      existingUnits: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    var _this = this;

    this.handleChangeIngredient = function(name, val, type) {
      var recipe = _this.state.recipe;
      var value = type === "number" ? Number.parseInt(val, 10) : val;
      recipe.ingredients[this.props.index][name] = value;
      this.setState({[name]: value});
      _this.setState({recipe: recipe});
    }

    this.addIngredient = function(e) {
      e.preventDefault();
      const ingredient = { amount: 1, unit: null, name: null};

      var recipe = _this.state.recipe;
      var newRecipe = Object.assign({}, recipe);
      var ingredients = recipe.ingredients.concat(ingredient);
      newRecipe.ingredients = ingredients;

      _this.setState({recipe: newRecipe});
    }

    this.deleteIngredient = function(e) {
      e.preventDefault();
      var recipe = _this.state.recipe;
      var newRecipe = Object.assign({}, recipe);

      recipe.ingredients.splice(this.props.index,1);

      newRecipe.ingredients = recipe.ingredients;

      _this.setState({recipe: newRecipe});
    }

    this.checkStatus = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
  }

  componentDidMount() {
    [
      ["ingredients", "existingIngredients"],
      ["units","existingUnits"]
    ].forEach((a) => {
      fetch("/api/"+a[0])
        .then(this.checkStatus)
        .then(response => response.json())
        .then(json => this.setState({[a[1]]: json}))
        .catch(e => console.log(e))
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recipe !== this.props.recipe) {
      this.setState({recipe: nextProps.recipe||{title: "", description:"", url: "", ingredients: []}})
    }
  }

   handleChange(e) {
     var recipe = this.state.recipe;
     recipe[e.target.id] = e.target.value;
     this.setState({recipe: recipe});
   }

   handleSubmit(e) {
     e.preventDefault();

     var id = !!this.state.recipe.id ? '/'+this.state.recipe.id : ''
     var url = `/api/recipe${id}`;
     var data = JSON.stringify(this.state.recipe);
     var method = this.state.recipe.id ? 'PUT' : 'POST';
     var headers = {'Authorization':`Bearer ${this.props.token}`}
     var options = {method: method, headers: headers, body: data};

     fetch(url, options)
      .then(this.checkStatus)
      .then(response => response.json())
      .then(json => this.setState({recipe: json}))
      .then(() => {
        var file = document.getElementById('image').files[0];

        if (file) {
          url = `/api/recipe/${this.state.recipe.id}/upload`;
          data = new FormData();
          data.append('file', file)
          options = {method: 'POST', headers: headers, body: data};
          fetch(url, options)
            .then(this.checkStatus)
            .catch(e => {
              this.setState({error: e.message})
              setTimeout(() => {this.setState({error: null})}, 3000);
            });
        }
      })
      .then(() => this.props.submit.call(this))
      .catch(e => {
        this.setState({error: e.message})
        setTimeout(() => {this.setState({error: null})}, 3000);
      });
   }

  render() {
    var ingredients = this.state.recipe.ingredients.map((ingredient, index) => {
      return <IngredientForm
        key={index}
        index={index}
        amount={ingredient.amount}
        unit={ingredient.unit}
        name={ingredient.name}
        change={this.handleChangeIngredient}
        click={this.deleteIngredient}
        ingredients={this.state.existingIngredients}
        units={this.state.existingUnits} />
    });

    var disabled = !this.state.recipe.id;

    return (
      <Panel>
        <form onSubmit={this.handleSubmit}>

          <FormGroup controlId="title">
            <ControlLabel>Title of the recipe</ControlLabel>
            <FormControl type="text" value={this.state.recipe.title} placeholder="Enter title" onChange={this.handleChange}	/>
          </FormGroup>

          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" value={this.state.recipe.description} placeholder="Enter description" onChange={this.handleChange}	/>
          </FormGroup>

          <FormGroup controlId="url">
            <ControlLabel>URL to original recipe</ControlLabel>
            <FormControl type="url" value={this.state.recipe.url} placeholder="Enter URL" onChange={this.handleChange}	/>
          </FormGroup>

          <h3>Ingredients</h3>
          {ingredients}

          <Label bsStyle="success" onClick={this.addIngredient}>Add ingredient</Label>

          <Panel>
            <Image src={"images/thumbs/" + this.state.recipe.image} thumbnail />
            <FormGroup controlId="image">
              <ControlLabel>Upload an image</ControlLabel>
              <FormControl type="file" accept=".gif,.jpg,.jpeg,.png" disabled={disabled} />
            </FormGroup>
            <br />
          </Panel>
          <Button type="submit">Save</Button>
          <Collapse in={!!this.state.error}>
            <Alert bsStyle="danger">
              <Glyphicon glyph="exclamation-sign" /> <strong>Could not save recipe:</strong> {this.state.error}
            </Alert>
          </Collapse>
        </form>
      </Panel>
    );
  }
}

export default RecipeForm;
