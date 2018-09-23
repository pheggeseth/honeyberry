import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ITEM_ACTIONS } from '../../redux/actions/itemActions';
import { CATEGORY_ACTIONS } from '../../redux/actions/categoryActions';

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
      categories: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {items, categories, dispatch} = nextProps;
    if (items.length === 0) dispatch({type: ITEM_ACTIONS.FETCH_ALL_ITEMS});
    if (categories.length === 0) dispatch({type: CATEGORY_ACTIONS.FETCH_ALL_CATEGORIES});
    if (categories.length !== prevState.categories.length) {
      return {
        categories: categories.map(category => ({
          ...category,
          visible: false
        }))
      }
    } else {
      return prevState;
    }
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