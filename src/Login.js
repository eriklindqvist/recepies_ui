import React, { Component } from 'react';
import { Alert, Collapse, Glyphicon, Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import Bcrypt from 'bcryptjs'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {username: "", password: ""};

    this.checkStatus = (response) => {
      let text = response.text()
      if (response.status >= 200 && response.status < 300) {
        return text;
      } else {
        return text.then(err => {throw err})
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    var hash = Bcrypt.hashSync(this.state.password, "$2a$10$Jq0sDp9vs4Asc/kHSmpUke").substr(29);
    var options = {method: 'POST', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: `username=${this.state.username}&password=${hash}`};

    fetch("/auth", options)
      .then(this.checkStatus)
      .then(token => this.props.submit.call(this, token))
      .catch(err => this.setState({error: err}));
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  render() {
    return (
      <Panel>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username">
            <ControlLabel>Username</ControlLabel>
            <FormControl type="text" value={this.state.username} placeholder="Enter username" onChange={this.handleChange}	/>
          </FormGroup>
          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" value={this.state.password} placeholder="Enter password" onChange={this.handleChange}	/>
          </FormGroup>
          <Button type="submit">Login</Button>
        </form>
        <br />
        <Collapse in={!!this.state.error}>
          <Alert bsStyle="danger">
            <Glyphicon glyph="exclamation-sign" /> {this.state.error}
          </Alert>
        </Collapse>
      </Panel>
    )
  }
}

export default Login;
