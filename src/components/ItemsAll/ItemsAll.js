import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';

import CategoryLabel from '../CategoryLabel/CategoryLabel';
import ItemTile from '../ItemTile/ItemTile';

const mapStateToProps = state => ({
  categories: state.categories,
  items: state.items,
  currentStore: state.currentStore.store,
  currentList: state.currentStore.list,
});

class ItemsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categories.map(category => ({
        ...category,
        visible: false
      }))
    }
  }

  addItemToCurrentItems = newItem => () => {
    const action = {};
    const existingListItem = this.props.currentList.find(currentItem => currentItem.item_id === newItem.id);
    console.log(existingListItem);
    if (existingListItem) {
      action.type = CURRENT_STORE_ACTIONS.UPDATE_ITEM_QUANTITY;
      action.payload = {
        ...existingListItem,
        quantity: existingListItem.quantity + 1
      };
    } else {
      action.type = CURRENT_STORE_ACTIONS.ADD_ITEM;
      action.payload = {
        storeId: this.props.currentStore.id,
        item: newItem,
      };
    }
    this.props.dispatch(action);
  };

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
                    item={item} 
                    onClick={this.addItemToCurrentItems(item)}
                    added={this.props.currentList.some(i => i.item_id === item.id && !i.completed)}
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