import React, { Component } from 'react';

import { CategoryLabelContainer } from '../styledComponents';

// const LabelContainer = styled.div`
//   background-color: white;
//   &:hover {
//     filter: brightness(0.9);
//     cursor: pointer;
//   }
// `;

class CategoryLabel extends Component {
  handleClick = () => this.props.onClick();
  render() {
    return (
      <CategoryLabelContainer onClick={this.handleClick}>
        {this.props.name}
      </CategoryLabelContainer>
    );
  }
}

export default CategoryLabel;