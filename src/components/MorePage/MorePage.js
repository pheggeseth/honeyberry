import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
});

class MorePage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div style={{color: 'white', textAlign: 'center'}}>
          <h1 style={{fontWeight: 'bold', fontSize: '2.5em', fontFamily: 'Oleo Script Swash Caps, cursive', marginTop: '5px', marginBottom: 0}}>Technologies Used</h1>
          <ul style={{fontSize: '1.25em', listStyle: 'none', padding: 0, margin: '5px'}}>
            <li>React</li>
            <li>React-Redux</li>
            <li>Redux-Saga</li>
            <li>Node.js / Express</li>
            <li>PostgreSQL</li>
            <li>Passport</li>
            <li>styled-components</li>
            <li>Item icons from SmashIcons & Freepik via flaticon.com</li>
            <li>Google Fonts</li>
            <li>Font Awesome (button icons)</li>
          </ul>
          <h1 style={{fontWeight: 'bold', fontSize: '2.5em', fontFamily: 'Oleo Script Swash Caps, cursive', marginBottom: 0}}>Thank You!</h1>
          <ul style={{fontSize: '1.25em', listStyle: 'none', padding: 0, margin: '5px'}}>
            <li>Prime Digital Academy</li>
            <li>Polaris</li>
            <li>My Family</li>
            <li>You!</li>
          </ul>
          {/* <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <p>Your ID is: {this.props.user.id}</p> */}
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </div>
      );
    }

    return (
      <div>
        {/* <Nav /> */}
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MorePage);