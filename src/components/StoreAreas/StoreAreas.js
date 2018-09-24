import React, { Component } from 'react';
import { connect } from 'react-redux';
// import styled from 'styled-components';

import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';

import CategoryLabel from '../CategoryLabel/CategoryLabel';
import ItemTile from '../ItemTile/ItemTile';

const mapStateToProps = state => ({
  currentStore: state.currentStore.store,
  areas: state.currentStore.areas,
  selectingItems: state.itemSelect.selectingItems,
  selectedItems: state.itemSelect.selectedItems,
});

class StoreAreas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: []
    };
  }
  componentDidMount() {
    const {currentStore, areas, dispatch} = this.props;
    if (areas.length === 0) {
      dispatch({
        type: CURRENT_STORE_ACTIONS.FETCH_STORE_AREAS,
        payload: currentStore.id
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.areas.length !== prevState.areas.length) {
      return {
        areas: nextProps.areas
      };
    } else {
      return prevState;
    }
  }

  toggleAreaVisiblity = index => () => {
    this.setState(prevState => {
      const areas = [...prevState.areas];
      const areaToToggle = {...areas[index]};
      areaToToggle.visible = !areaToToggle.visible;
      areas.splice(index, 1, areaToToggle);
      return {
        areas
      };
    });
  };

  render() {
    const {areas} = this.state;
    return (
      <div>
        {areas.map((area, index) => (
          <div key={area.id}>
            <CategoryLabel name={area.name} onClick={this.toggleAreaVisiblity(index)} />
            {area.visible
            ? <ul>
                {area.items.map(item => (
                  <ItemTile key={item.id}
                    areaItem
                    item={item}
                  />
                ))}
              </ul>
            : null}
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(StoreAreas);