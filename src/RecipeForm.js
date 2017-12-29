import React, { Component } from 'react';
import IngredientForm from './IngredientForm.js'

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {recipe: this.props.recipe||{title: "", description:"", url: "", ingredients: []}};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    var _this = this;

    this.handleChangeIngredient = function(e) {
      var recipe = _this.state.recipe;
      var name = e.target.name;
      var value = e.target.type === "number" ? Number.parseInt(e.target.value, 10) : e.target.value;
      recipe.ingredients[this.props.index][name] = value;
      this.setState({[name]: value});
      _this.setState({recipe: recipe});
    }

    this.addIngredient = function(e) {
      e.preventDefault();
      const ingredient = { amount: null, unit: null, name: null};

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.recipe !== this.props.recipe) {
      this.setState({recipe: nextProps.recipe||{title: "", description:"", url: "", ingredients: []}})
    }
  }

   handleChange(e) {
     var recipe = this.state.recipe;
     recipe[e.target.name] = e.target.value;
     this.setState({recipe: recipe});
   }

   handleSubmit(e) {
     e.preventDefault();

     var id = !!this.state.recipe.id ? '/'+this.state.recipe.id : ''
     var url = `/api/recipe${id}`;
     var data = JSON.stringify(this.state.recipe);
     var method = this.state.recipe.id ? 'PUT' : 'POST';
     var options = {method: method, body: data};

     fetch(url, options)
      .then(this.checkStatus)
      .then(response => response.json())
      .then(json => this.setState({recipe: json}))
      .catch(e => console.log(e));

    var file = document.getElementById('file').files[0];

    if (file) {
      url = `/api/recipe/${this.state.recipe.id}/upload`;
      data = new FormData();
      data.append('file', file)
      options = {method: 'POST', body: data};
      fetch(url, options)
        .then(this.checkStatus)
        .catch(e => console.log(e));
    }

    this.props.submit.call(this);
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
        click={this.deleteIngredient} />
    });

    var disabled = !this.state.recipe.id;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={this.handleChange} value={this.state.recipe.title} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" onChange={this.handleChange} value={this.state.recipe.description} />
        </label>
        <br />
        <label>
          URL:
          <input type="text" name="url" onChange={this.handleChange} value={this.state.recipe.url} />
        </label>
        <br />
        <h3>Ingredients</h3>
        {ingredients}
        <button onClick={this.addIngredient}>Add</button>
        <br/>
        <label>
          Image:
          <input type="file" name="file" id="file" accept=".gif,.jpg,.jpeg,.png" disabled={disabled} />
        </label>
        <br />
        <button>Save</button>
      </form>
    );
  }
}

export default RecipeForm;
