import React, { Component } from 'react';
import { connect } from 'react-redux';
// import styled from 'styled-components';

import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';
import { ITEM_SELECT_ACTIONS } from '../../redux/actions/itemSelectActions';

import CategoryLabel from '../CategoryLabel/CategoryLabel';
import ItemTile from '../ItemTile/ItemTile';

const mapStateToProps = state => ({
  currentStore: state.currentStore.store,
  editingAreaId: state.currentStore.editingAreaId,
  areas: state.currentStore.areas,
  selectingItems: state.itemSelect.selectingItems,
  selectedItems: state.itemSelect.selectedItems,
});

class StoreAreas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaVisibility: []
    };
  }
  // componentDidMount() {
  //   const {currentStore, areas, dispatch} = this.props;
  //   if (areas.length === 0) {
  //     dispatch({
  //       type: CURRENT_STORE_ACTIONS.FETCH_STORE_AREAS,
  //       payload: currentStore.id
  //     });
  //   }
  // }

  // componentDidUpdate() {
  //   const {currentStore, areas, dispatch} = this.props;
  //   if (currentStore && areas.length === 0) {
  //     dispatch({
  //       type: CURRENT_STORE_ACTIONS.FETCH_STORE_AREAS,
  //       payload: currentStore.id
  //     });
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.areas && nextProps.areas.length !== prevState.areaVisibility.length) {
      const areaVisibility = nextProps.areas.map(area => ({
        id: area.id,
        visible: false,
      }));
      return {
        areaVisibility
      };
    } else {
      return prevState;
    }
  }

  toggleAreaVisiblity = id => () => {
    this.setState(prevState => {
      const areaVisibility = [...prevState.areaVisibility];
      let indexFound;
      let areaToToggle = areaVisibility.find((area, index) => {
        if (area.id === id) {
          indexFound = index;
          return true;
        } else {
          return false;
        }
      });
      areaToToggle = {
        ...areaToToggle,
        visible: !areaToToggle.visible
      };
      areaVisibility.splice(indexFound, 1, areaToToggle);
      return {
        areaVisibility
      };
    });
  };

  startEditingArea = area => () => {
    const {dispatch} = this.props;
    if (this.state.areaVisibility.find(a => a.id === area.id).visible === false) {
      this.toggleAreaVisiblity(area.id)();
    }
    dispatch({
      type: CURRENT_STORE_ACTIONS.START_AREA_EDITING_MODE,
      payload: area.id
    });
    dispatch({type: ITEM_SELECT_ACTIONS.START_ITEM_SELECTION_MODE});
    dispatch({
      type: ITEM_SELECT_ACTIONS.SET_SELECTED_ITEMS,
      payload: area.items
    });
  };

  saveAreaEdits = area => () => {
    const {dispatch, currentStore, selectedItems} = this.props;
    dispatch({
      type: CURRENT_STORE_ACTIONS.UPDATE_AREA_ITEMS,
      payload: {
        storeId: currentStore.id,
        areaId: area.id,
        items: selectedItems,
      }
    });
    this.stopEditingArea();
  };

  stopEditingArea = () => {
    const {dispatch} = this.props;
    dispatch({type: ITEM_SELECT_ACTIONS.CLEAR_SELECTED_ITEMS});
    dispatch({type: ITEM_SELECT_ACTIONS.STOP_ITEM_SELECTION_MODE});
    dispatch({type: CURRENT_STORE_ACTIONS.STOP_AREA_EDITING_MODE});
  };

  deleteArea = area => () => {
    const confirmed = window.confirm('Are you sure?');
    if (confirmed) {
      const {dispatch, currentStore} = this.props;
      dispatch({
        type: CURRENT_STORE_ACTIONS.DELETE_STORE_AREA,
        payload: {
          storeId: currentStore.id,
          areaId: area.id
        }
      })
    }
  };

  render() {
    const {editingAreaId, areas} = this.props;
    const {areaVisibility} = this.state;
    if (areas) {
      return (
        <div>
          {areas.map(area => (
            <div key={area.id}>
              <CategoryLabel name={area.name} onClick={this.toggleAreaVisiblity(area.id)} />
              {editingAreaId === area.id
              ? <span>
                  <button onClick={this.stopEditingArea}>Cancel</button>
                  <button onClick={this.saveAreaEdits(area)}>Save</button>
                </span>
              : <button onClick={this.startEditingArea(area)}>Edit</button>}
              <button onClick={this.deleteArea(area)}>Delete</button>
              {areaVisibility.find(a => a.id === area.id).visible
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
    } else {
      return null;
    }
    
  }
}

export default connect(mapStateToProps)(StoreAreas);