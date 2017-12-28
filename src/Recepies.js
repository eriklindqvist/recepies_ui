import React, { Component } from 'react';
import RecipeListItem from './RecipeListItem.js'

class Recepies extends Component {
  constructor(props) {
    super(props);
    this.state = { recepies: [], loading: true };

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
    return fetch("/api/recepies/names")
    //return fetch("https://recepies.local/api/recepies/names")
     .then(this.checkStatus)
     .then(response => response.json())
     .then(json => this.setState({recepies: json, loading: false}))
     .catch(e => console.log(e));
   }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }

    var recepies = this.state.recepies.map((recipe) => <RecipeListItem key={recipe.id} id={recipe.id} title={recipe.title} click={this.props.click} /> );

    return (
      <ul className="Recepies">
        {recepies}
      </ul>
    );
  }
}

export default Recepies;
