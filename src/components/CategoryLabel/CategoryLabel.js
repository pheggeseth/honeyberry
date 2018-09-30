import React, { Component } from 'react';

import { CategoryLabelContainer } from '../styledComponents';

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