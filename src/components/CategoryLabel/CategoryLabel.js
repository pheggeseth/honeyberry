import React, { Component } from 'react';
import styled from 'styled-components';

const LabelContainer = styled.div`
  background-color: white;
  &:hover {
    filter: brightness(0.95);
    cursor: pointer;
  }
`;

class CategoryLabel extends Component {
  handleClick = () => this.props.onClick();
  render() {
    return (
      <LabelContainer onClick={this.handleClick}>
        {this.props.name}
      </LabelContainer>
    );
  }
}

export default CategoryLabel;