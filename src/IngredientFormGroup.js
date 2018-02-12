import React, { Component } from 'react';
import { FormGroup, FormControl, Label } from 'react-bootstrap';

import IngredientForm from './IngredientForm.js';

class IngredientFormGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.title}

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.changeLabel.call(this, this.props.group, e.target.value);
  }

  render() {
    var ingredients = this.props.ingredients.map((ingredient, index) => {
        var key = `${this.props.group}.${index}.${ingredient.name}`
        return <IngredientForm
          key={key}
          index={index}
          group={this.props.group}
          title={this.props.title}
          amount={ingredient.amount}
          unit={ingredient.unit}
          name={ingredient.name}
          change={this.props.change}
          click={this.props.click} />
    });

    return (
        <div className="ingredient">
          <Label bsStyle="danger" onClick={this.props.click.bind(this)}>Delete</Label>
          <FormGroup controlId="title">
            <FormControl type="text" value={this.props.title} placeholder="Enter title" onChange={this.handleChange} />
          </FormGroup>
          {ingredients}
        </div>
    );
  }
}

export default IngredientFormGroup;
