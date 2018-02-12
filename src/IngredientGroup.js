import React, { Component } from 'react';

import Ingredient from './Ingredient.js';

class IngredientGroup extends Component {
  render() {
    var ingredients = this.props.ingredients.map((ingredient) => <Ingredient key={ingredient.name} amount={ingredient.amount} unit={ingredient.unit} name={ingredient.name} /> );

    return (
        <div>
          <p>{this.props.title}</p>
          <ul>{ingredients}</ul>
        </div>
    );
  }
}

export default IngredientGroup;
