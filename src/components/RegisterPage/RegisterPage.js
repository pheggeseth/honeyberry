import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

import { 
  LoginContainer, 
  LoginWindow, 
  LoginWindowContentGrid, 
  LoginWindowGridItem,
  AppLogo,
  Input,
  Button,
  Message,
} from '../styledComponents';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Please supply both a username and password.',
      });
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'That username may already be taken. Please choose a different one.',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Sorry! There is a problem with the server, and your account cannot be created at this time.',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  handleBackToLoginClick = () => {
    this.props.history.push('/home');
  };

  render() {
    const message = this.state.message;
    return (
      <LoginContainer>
        <LoginWindow>
          <form onSubmit={this.registerUser}>
            <LoginWindowContentGrid>
              <LoginWindowGridItem>
                <AppLogo>
                  Honeyberry
                </AppLogo>
              </LoginWindowGridItem>
              <LoginWindowGridItem>
                <Input 
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </LoginWindowGridItem>
              <LoginWindowGridItem>
                <Input 
                  type="password"
                  name="password"
                  placeholder="Choose a password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </LoginWindowGridItem>
              <LoginWindowGridItem>
                <Button className="blue rounded" style={{height: '100%', flexGrow: 1}}
                  type="submit"
                  name="submit"
                >
                  Create Account
                </Button>
              </LoginWindowGridItem>
              <LoginWindowGridItem>
                <Button className="dark-blue rounded flat" style={{height: '70%', flexGrow: 0.7}}
                  onClick={this.handleBackToLoginClick}>
                  Back to Login
                </Button>
              </LoginWindowGridItem>
              <LoginWindowGridItem>
                <Message className={message ? 'showMessage' : ''}>
                  {message}
                </Message>
              </LoginWindowGridItem>
            </LoginWindowContentGrid>
          </form>
        </LoginWindow>
      </LoginContainer>
    );
  }
}

export default RegisterPage;

