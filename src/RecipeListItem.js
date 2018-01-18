import React, { Component } from 'react';
import { Alert, Collapse, Glyphicon, ListGroupItem, Label } from 'react-bootstrap';

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

    this.deleteRecipe = function(e) {
      e.stopPropagation();

      if (window.confirm("Are you sure?")) {
        var url = "/api/recipe/" + this.props.recipe.id;
        var options = {method: "DELETE", headers: {'Authorization':`Bearer: ${this.props.token}`}};

        fetch(url, options)
          .then(this.checkStatus)
          .then(r => this.props.del.call(this))
          .catch(e => {
            this.setState({error: e.message})
            setTimeout(() => {this.setState({error: null})}, 3000);
          });
      }
    }
  }

  render() {
    if (this.props.token) {
      var edit = <Label bsStyle="info" onClick={this.props.edit.bind(this)}>edit</Label>
      var del = <Label bsStyle="danger" onClick={this.deleteRecipe.bind(this)}>delete</Label>
    }

    return (
      <div>
        <ListGroupItem onClick={this.props.click.bind(this)} header={this.state.recipe.title}>
          {edit}
          {del}
        </ListGroupItem>
        <Collapse in={!!this.state.error}>
          <Alert bsStyle="danger">
            <Glyphicon glyph="exclamation-sign" /> {this.state.error}
          </Alert>
        </Collapse>
      </div>
    );
  }
}

export default RecipeListItem;
