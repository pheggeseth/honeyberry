import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';

import ItemTile from '../ItemTile/ItemTile';

const mapStateToProps = state => ({
  categories: state.categories,
  items: state.items,
  currentStore: state.currentStore.store,
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

  addItemToCurrentItems = item => () => {
    const action = {
      type: CURRENT_STORE_ACTIONS.ADD_ITEM,
      payload: {
        storeId: this.props.currentStore.id,
        item: item,
      }
    };
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
            <div onClick={this.toggleCategoryVisibility(index)}>{category.name}</div>
            {category.visible 
            ? <ul>
                {this.props.items.filter(item => item.category === category.name)
                .map(item => (
                  <ItemTile key={item.id} item={item} onClick={this.addItemToCurrentItems(item)}/>
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