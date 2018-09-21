import React, { Component } from 'react';
import { connect } from 'react-redux';

import CategoryLabel from '../CategoryLabel/CategoryLabel';
import ItemTile from '../ItemTile/ItemTile';

const mapStateToProps = state => ({
  categories: state.categories,
  items: state.items,
  currentStore: state.currentStore.store,
  currentList: state.currentStore.list,
  currentStoreEssentialItems: state.currentStore.essentials,
  editingEssentials: state.currentStore.editingEssentials,
});

class ItemsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categories.map(category => ({
        ...category,
        visible: false
      }))
    };
  }

  toggleCategoryVisibility = index => () => {
    this.setState(prevState => {
      const categories = [...prevState.categories];
      const categoryToToggle = {...categories[index]};
      categoryToToggle.visible = !categoryToToggle.visible;
      categories.splice(index, 1, categoryToToggle);
      return {
        categories
      };
    });
  };

  render() {
    return (
      <div>
        {this.state.categories.map((category, index) => (
          <div key={category.id}>
            <CategoryLabel name={category.name} onClick={this.toggleCategoryVisibility(index)}/>
            {category.visible 
            ? <ul>
                {this.props.items.filter(item => item.category === category.name)
                .map(item => (
                  <ItemTile key={item.id}
                    categoryItem 
                    item={item} 
                  />
                ))}
              </ul> 
            : null
            }
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ItemsAll);