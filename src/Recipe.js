import React, { Component } from 'react';
import { Alert, Collapse, Glyphicon, Panel, Label, Image } from 'react-bootstrap';
import Markdown from 'react-remarkable';

import './Recipe.css';

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
      var options = {headers: {'Authorization':`Bearer ${this.props.token}`}};

      return fetch(`/api/recipe/${this.props.id}`, options)
       .then(this.checkStatus)
       .then(response => response.json())
       .then(json => this.setState({recipe: json, loading: false}))
       .catch(e => this.setState({recipe: null, loading: false, error: e.message}))
     }
   }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }

    if (this.state.error) {
      return (
        <Panel>
          <Collapse in={!!this.state.error}>
            <Alert bsStyle="danger">
              <Glyphicon glyph="exclamation-sign" /> <strong>Could not read recipe:</strong> {this.state.error}
            </Alert>
          </Collapse>
        </Panel>
      )
    }

    var ingredients = this.state.recipe.ingredients.map((ingredient) => <Ingredient key={ingredient.name} amount={ingredient.amount} unit={ingredient.unit} name={ingredient.name} /> );
    var image = this.state.recipe.image && <Image src={"images/thumbs/" + this.state.recipe.image} thumbnail />;
    var link = this.state.recipe.url && <a href={this.state.recipe.url}>Originalrecept</a>;
    var edit = this.props.token && <Label bsStyle="info" onClick={this.props.click.bind(this)}>Edit recipe</Label>;

    return (
      <Panel>
        <h2>{this.state.recipe.title}</h2>
        {edit}
        {image}
        <h4>Ingredienser</h4>
        <ul>{ingredients}</ul>
        <h4>Beskrivning</h4>
        <Markdown>{this.state.recipe.description}</Markdown>
        {link}
        <br />
      </Panel>
    );
  }
}

export default Recipe;
