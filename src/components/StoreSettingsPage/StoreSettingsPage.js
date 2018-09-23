import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class StoreSettingsPage extends Component {
  render() {
    console.log(this.props.match.params.id);
    return (
      <div>
        store edit page
      </div>
    );
  }
}

export default connect()(StoreSettingsPage);