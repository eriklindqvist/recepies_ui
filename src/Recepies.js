import React, { Component } from 'react';
import RecipeListItem from './RecipeListItem.js'

class Recepies extends Component {
  constructor(props) {
    super(props);
    this.state = { recepies: [], loading: true };

    var _this = this;

    this.deleteRecipe = function() {
      console.log("deleted: " + this.props.id + " with index " + this.props.index);
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
    return fetch("/api/recepies/names")
     .then(this.checkStatus)
     .then(response => response.json())
     .then(json => this.setState({recepies: json, loading: false}))
     .catch(e => console.log(e));
   }

   /*shouldComponentUpdate() {
     console.log("shouldComponentUpdate?");
     return true;
   }*/

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }

    var recepies = this.state.recepies.map((recipe, index) => {
      return <RecipeListItem
        key={index}
        index={index}
        id={recipe.id}
        title={recipe.title}
        click={this.props.click}
        del={this.deleteRecipe} />
    });

    return (
      <ul className="Recepies">
        {recepies}
      </ul>
    );
  }
}

export default Recepies;
