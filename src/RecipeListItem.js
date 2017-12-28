import React, { Component } from 'react';
import './RecipeListItem.css';

class RecipeListItem extends Component {
  constructor(props) {
    super(props);

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
        //var url = "/api/recipe/" + this.props.id;
        var url = "https://recepies.local/api/recipe/" + this.props.id;
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
      <li>
        <p onClick={this.props.click.bind(this)}>{this.props.title}</p>
        <p onClick={this.deleteRecipe.bind(this)} className="delete">X</p>
      </li>
    );
  }
}

export default RecipeListItem;
