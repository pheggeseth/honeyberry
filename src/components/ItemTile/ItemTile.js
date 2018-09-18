import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.li`
  height: 100px;
  width: 100px;
  background-color: white;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    filter: brightness(0.95);
    cursor: pointer;
  }
`;

class ItemTile extends Component {
  handleClick = () => this.props.onClick();
  render() {
    return (
      <Container onClick={this.handleClick}>
        {this.props.item.name}
      </Container>
    );
  }
}

export default ItemTile;