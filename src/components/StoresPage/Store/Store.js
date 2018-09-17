import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const EditButton = styled.button`
  
`;

class Store extends Component {
  toggleEditStore = () => {
    console.log('editing store', this.props.storeObj);
  };
  render() {
    return (
      <div>
        {this.props.storeObj.name}
        <EditButton onClick={this.toggleEditStore}>Edit</EditButton>
      </div>
    );
  }
}

export default connect(null)(Store);