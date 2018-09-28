import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { 
  LoginContainer, 
  LoginWindow, 
  LoginWindowContentGrid, 
  LoginWindowGridItem,
  AppLogo,
  Input,
  Button,
} from '../styledComponents';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName !== null) {
      this.props.history.push('/stores');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  handleCreateClick = () => {
    this.props.history.push('/register');
  };

  render() {
    return (
      <LoginContainer>
        <LoginWindow>
          { this.renderAlert() }
          <form onSubmit={this.login}>
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
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </LoginWindowGridItem>
              <LoginWindowGridItem>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                  />
              </LoginWindowGridItem>
            <LoginWindowGridItem>
              <Button className="red rounded" style={{height: '100%', flexGrow: 1}}
                type="submit"
                name="submit"
                >
                Log In
              </Button>
            </LoginWindowGridItem>
            <LoginWindowGridItem>
              <Button className="orange rounded flat" style={{height: '70%', flexGrow: 0.7}}
                onClick={this.handleCreateClick}>
                Create An Account
              </Button>
              {/* <Link to="/register">Register</Link> */}
            </LoginWindowGridItem>
            </LoginWindowContentGrid>
          </form>
        </LoginWindow>
      </LoginContainer>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
