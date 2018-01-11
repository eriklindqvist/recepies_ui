import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { ControlLabel, Form, FormGroup, FormControl, Label } from 'react-bootstrap';
import './IngredientForm.css';

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {amount: this.props.amount, unit: this.props.unit||'', name: this.props.name||''}

    this.handleChange = this.handleChange.bind(this);
    this.handleTypeahead = this.handleTypeahead.bind(this);
  }

  handleChange(e) {
    this.props.change.call(this, e.target.name, e.target.value, e.target.type);
  }

  handleTypeahead(name, type) {
    return function(value) {
      this.props.change.call(this, name, value, type);
    }.bind(this);
  }

  render() {
    return (
      <Form inline>
        <FormGroup controlId="amount">
          <ControlLabel>Amount</ControlLabel>
          <FormControl type="number" min="1" value={this.state.amount} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup controlId="unit">
          <ControlLabel>Unit</ControlLabel>
          <FormControl type="text" placeholder="Unit" value={this.state.unit} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <Typeahead allowNew newSelectionPrefix=''
            value={this.state.name}
            options={this.props.ingredients||[]}
            onInputChange={this.handleTypeahead("name", "text")}
            inputProps={{name: 'name', value: this.state.name}}
            selected={[this.state.name]}
            placeholder='Ingredient' />
          </FormGroup>
          <Label bsStyle="danger" onClick={this.props.click.bind(this)}>Delete</Label>
      </Form>
    );
  }
}

export default IngredientForm;
