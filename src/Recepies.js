import React, { Component } from 'react';
import RecipeListItem from './RecipeListItem.js'

class Recepies extends Component {
  constructor(props) {
    super(props);
    this.state = { recepies: [], loading: true };
  }

  componentDidMount() {
    return fetch("http://localhost:3000/recepies/names")
     .then(response => response.json())
     .then((json) => this.setState({recepies: json, loading: false}));
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
