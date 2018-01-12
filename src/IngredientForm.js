import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { FormGroup, FormControl, Label } from 'react-bootstrap';
import './IngredientForm.css';

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {amount: this.props.amount, unit: this.props.unit||'', name: this.props.name||''}

    this.handleChange = this.handleChange.bind(this);
    this.handleTypeahead = this.handleTypeahead.bind(this);
  }

  handleChange(e) {
    this.props.change.call(this, e.target.id, e.target.value, e.target.type);
  }

  handleTypeahead(name, type) {
    return function(value) {
      this.props.change.call(this, name, value, type);
    }.bind(this);
  }

  render() {
    return (
      <div className="ingredient">
        <Label bsStyle="danger" onClick={this.props.click.bind(this)}>Delete</Label>
        <FormGroup controlId="amount">
          <FormControl type="number" min="1" value={this.state.amount} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup className="unit">
          <Typeahead emptyLabel=''
            options={this.props.units||[]}
            onInputChange={this.handleTypeahead("unit", "text")}
            inputProps={{name: 'unit', value: this.state.unit}}
            selected={this.state.unit.length > 0 ? [this.state.unit] : []}
            placeholder='Unit' />
        </FormGroup>
        <FormGroup className="name">
          <Typeahead emptyLabel=''
            options={this.props.ingredients||[]}
            onInputChange={this.handleTypeahead("name", "text")}
            inputProps={{name: 'name'}}
            selected={this.state.name.length > 0 ? [this.state.name] : []}
            placeholder='Ingredient' />
          </FormGroup>
      </div>
    );
  }
}

export default IngredientForm;
