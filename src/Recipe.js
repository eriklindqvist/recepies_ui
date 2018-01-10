import React, { Component } from 'react';
import Ingredient from './Ingredient.js';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = { recipe: this.props.recipe, loading: true };

    this.checkStatus = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        console.log(response);
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
  }

  componentDidMount() {
    if (this.state.recipe) {
      this.setState({loading: false});
    } else {
      return fetch(`/api/recipe/${this.props.id}`)
       .then(this.checkStatus)
       .then(response => response.json())
       .then(json => this.setState({recipe: json, loading: false}))
       .catch(e => console.log(e));
     }
   }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }

    var ingredients = this.state.recipe.ingredients.map((ingredient) => <Ingredient key={ingredient.name} amount={ingredient.amount} unit={ingredient.unit} name={ingredient.name} /> );
    var image = this.state.recipe.image && <img src={"images/thumbs/" + this.state.recipe.image} alt="logo" />;
    var link = this.state.recipe.url && <a href={this.state.recipe.url}>Originalrecept</a>;

    return (
      <div>
      <h2 onClick={this.props.click.bind(this)}>{this.state.recipe.title}</h2>
      {image}
      <h3>Ingredienser</h3>
      <ul>{ingredients}</ul>
      <h3>Beskrivning</h3>
      <p>{this.state.recipe.description}</p>
      {link}
      </div>
    );
  }
}

export default Recipe;
