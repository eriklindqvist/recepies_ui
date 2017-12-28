import React, { Component } from 'react';

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {amount: this.props.amount, unit: this.props.unit, name: this.props.name}
  }

  render() {
    return (
      <div>
        <input type="number" name="amount" min="1" value={this.state.amount||1} onChange={this.props.change.bind(this)} />
        <input type="text" name="unit" value={this.state.unit||''} onChange={this.props.change.bind(this)}/>
        <label>
          Name:
          <input type="text" name="name" value={this.state.name||''} onChange={this.props.change.bind(this)} />
        </label>
        <button onClick={this.props.click.bind(this)}>Del</button>
      </div>
    );
  }
}

export default IngredientForm;
