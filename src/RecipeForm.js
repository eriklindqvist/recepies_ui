import React, { Component } from 'react';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {recipe: this.props.recipe||{title: "", description:""}};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

   handleChange(e) {
     var recipe = this.state.recipe;
     recipe[e.target.name] = e.target.value;
     this.setState({recipe: recipe});
   }

   handleSubmit(e) {
     e.preventDefault();

     var id = this.state.recipe.id ? '/'+this.state.recipe.id : ''
     var url = "/api/recipe"+id;
     //var url = "https://recepies.local/api/recipe/"+id;
     var data = JSON.stringify(this.state.recipe);
     var method = this.state.recipe.id ? 'PUT' : 'POST';
     var options = {method: method, body: data};

     console.log(url);
     console.log(options);

     fetch(url, options)
      .then(this.checkStatus)
      .then(response => response.json())
      .then(json => this.setState({recipe: json}))
      .then(this.props.submit.call(this))
      .catch(e => console.log(e));
   }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={this.handleChange} value={this.state.recipe.title} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" onChange={this.handleChange} value={this.state.recipe.description} />
        </label>
        <br/>
        <button>Save</button>
      </form>
    );
  }
}

export default RecipeForm;
