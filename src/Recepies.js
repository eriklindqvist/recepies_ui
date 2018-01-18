import React, { Component } from 'react';
import { Alert, Collapse, Glyphicon, ListGroup } from 'react-bootstrap'

import './Recepies.css';

import RecipeListItem from './RecipeListItem.js'

class Recepies extends Component {
  constructor(props) {
    super(props);
    this.state = { recepies: [], loading: true };

    var _this = this;

    this.deleteRecipe = function() {
      var recepies = _this.state.recepies;
      recepies.splice(this.props.index, 1);
      _this.setState({recepies: recepies});
    }

    this.checkStatus = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
  }

  componentDidMount() {
    var options = {headers: {'Authorization':`Bearer ${this.props.token}`}};

    return fetch("/api/recepies", options)
     .then(this.checkStatus)
     .then(response => response.json())
     .then(json => this.setState({recepies: json, loading: false}))
     .catch(e => this.setState({recepies: null, loading: false, error: e.message}))
   }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }

    var recepies = this.state.recepies && this.state.recepies.map((recipe, index) => {
      return <RecipeListItem
        key={index}
        index={index}
        recipe={recipe}
        click={this.props.click}
        edit={this.props.edit}
        del={this.deleteRecipe}
        token={this.props.token} />
    });

    return (
      <ListGroup className="Recepies">
        {recepies}
        <Collapse in={!!this.state.error}>
          <Alert bsStyle="danger">
            <Glyphicon glyph="exclamation-sign" /> <strong>Could not get recepies:</strong> {this.state.error}
          </Alert>
        </Collapse>
      </ListGroup>
    );
  }
}

export default Recepies;
