import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'

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
    return fetch("/api/recepies")
     .then(this.checkStatus)
     .then(response => response.json())
     .then(json => this.setState({recepies: json, loading: false}))
     .catch(e => console.log(e));
   }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }

    var recepies = this.state.recepies.map((recipe, index) => {
      return <RecipeListItem
        key={index}
        index={index}
        recipe={recipe}
        click={this.props.click}
        edit={this.props.edit}
        del={this.deleteRecipe} />
    });

    return (
      <ListGroup className="Recepies">
        {recepies}
      </ListGroup>
    );
  }
}

export default Recepies;
