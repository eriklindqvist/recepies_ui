import React, { Component } from 'react';
import { ListGroupItem, Label } from 'react-bootstrap';

import './RecipeListItem.css';

class RecipeListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { recipe: this.props.recipe };

    this.checkStatus = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }

    this.deleteRecipe = function() {
      if (window.confirm("Are you sure?")) {
        var url = "/api/recipe/" + this.props.id;
        var options = {method: "DELETE"};

        fetch(url, options)
          .then(this.checkStatus)
          .then(r => this.props.del.call(this))
          .catch(e => console.log(e));
      }
    }
  }

  render() {
    return (
      <ListGroupItem onClick={this.props.click.bind(this)} header={this.state.recipe.title}>
        <Label bsStyle="info" onClick={this.props.edit.bind(this)}>edit</Label>
        <Label bsStyle="danger" onClick={this.deleteRecipe.bind(this)}>delete</Label>
      </ListGroupItem>
    );
  }
}

export default RecipeListItem;
