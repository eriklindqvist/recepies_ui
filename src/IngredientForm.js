import React, { Component } from 'react';
import { Typeahead } from 'react-typeahead';

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {amount: this.props.amount, unit: this.props.unit, name: this.props.name}
  }

  render() {
    return (
      <div>
        <input type="number" name="amount" min="1" value={this.state.amount} onChange={this.props.change.bind(this)} />
        <input type="text" name="unit" value={this.state.unit||''} onChange={this.props.change.bind(this)}/>
        <Typeahead name="name"
          value={this.state.name||''}
          options={this.props.ingredients}
          onChange={this.props.change.bind(this)}
          inputProps={{name: 'name'}}
          placeholder='Ingredient' />
        <button onClick={this.props.click.bind(this)}>Del</button>
      </div>
    );
  }
}

export default IngredientForm;
