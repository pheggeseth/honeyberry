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

  startEditingArea = area => () => {
    const {dispatch} = this.props;
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
    const {dispatch, selectedItems} = this.props;
    console.log('saving area edits:', selectedItems);
  };

  discardAreaEdits = () => {
    const {dispatch} = this.props;
    dispatch({type: ITEM_SELECT_ACTIONS.CLEAR_SELECTED_ITEMS});
    dispatch({type: ITEM_SELECT_ACTIONS.STOP_ITEM_SELECTION_MODE});
    dispatch({type: CURRENT_STORE_ACTIONS.STOP_AREA_EDITING_MODE});
  };

  render() {
    const {editingAreaId} = this.props;
    const {areas} = this.state;
    return (
      <div>
        {areas.map((area, index) => (
          <div key={area.id}>
            <CategoryLabel name={area.name} onClick={this.toggleAreaVisiblity(index)} />
            {editingAreaId === area.id
            ? <span>
                <button onClick={this.discardAreaEdits}>Cancel</button>
                <button onClick={this.saveAreaEdits(area)}>Save</button>
              </span>
            : <button onClick={this.startEditingArea(area)}>Edit</button>}
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