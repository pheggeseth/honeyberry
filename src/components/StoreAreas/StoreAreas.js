import React, { Component } from 'react';
import { connect } from 'react-redux';
// import styled from 'styled-components';

import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';
import { ITEM_SELECT_ACTIONS } from '../../redux/actions/itemSelectActions';

import { List, StoreAreaLabelContainer, StoreAreaLabelName, Button } from '../styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSave, faUndo, faTrash } from '@fortawesome/free-solid-svg-icons';

// import CategoryLabel from '../CategoryLabel/CategoryLabel';
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
    if (nextProps.areas && nextProps.areas.length !== Object.keys(prevState.areaVisibility).length) {
      console.log('reset areaVisibility');
      const areaVisibility = nextProps.areas.reduce((acc, area) => {
        acc[area.id] = false;
        return acc;
      }, {});
      return {
        areaVisibility
      };
    } else {
      return prevState;
    }
  }

  toggleAreaVisiblity = id => () => {
    const areaVisibility = {...this.state.areaVisibility};
    areaVisibility[id] = !areaVisibility[id];
    this.setState({
      areaVisibility
    });
  };

  startEditingArea = area => () => {
    const {dispatch} = this.props;
    if (this.state.areaVisibility[area.id] === false) {
      console.log('toggle visibility');
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
      const {dispatch, selectingItems, currentStore} = this.props;
      if (selectingItems) {
        dispatch({type: ITEM_SELECT_ACTIONS.CLEAR_SELECTED_ITEMS});
        dispatch({type: ITEM_SELECT_ACTIONS.STOP_ITEM_SELECTION_MODE});
      }
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
    // console.log(areaVisibility);
    if (areas) {
      return (
        <div>
          <div style={{color: 'white', fontWeight: 'bold'}}>STORE AREAS</div>
          {areas.map(area => (
            <div key={area.id}>
              <StoreAreaLabelContainer>
                <StoreAreaLabelName onClick={this.toggleAreaVisiblity(area.id)}>
                  {area.name}
                </StoreAreaLabelName>
                {editingAreaId === area.id
                ? <span style={{height: '100%', display: 'flex', alignItems: 'center'}}>
                    <Button className="dark-blue flat"
                      onClick={this.stopEditingArea}
                    >
                      <FontAwesomeIcon icon={faUndo}/>
                    </Button>
                    <Button className="green flat"
                      style={{minWidth: '30px'}}
                      onClick={this.saveAreaEdits(area)}
                    >
                      <FontAwesomeIcon icon={faSave}/>
                    </Button>
                  </span>
                : <Button className="dark-blue flat"
                    style={{minWidth: '30px'}}
                    onClick={this.startEditingArea(area)}
                  >
                    <FontAwesomeIcon icon={faCog}/>
                  </Button>
                }
                <Button className="red flat"
                  style={{minWidth: '30px', borderTopRightRadius: 5, borderBottomRightRadius: 5}}
                  onClick={this.deleteArea(area)}
                >
                  <FontAwesomeIcon icon={faTrash}/>
                </Button>
              </StoreAreaLabelContainer>
              {areaVisibility[area.id] && area.items[0] !== null
              ? <List>
                  {area.items.sort(byNameAlphabetically).map(item => (
                    <ItemTile key={item.id}
                      areaItem
                      item={item}
                    />
                  ))}
                </List>
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

const byNameAlphabetically = (object1, object2) => {
  let name1 = object1.name.toUpperCase();
  let name2 = object2.name.toUpperCase();
  if (name1 < name2) return -1;
  if (name1 > name2) return 1;
  
  return 0;
};

export default connect(mapStateToProps)(StoreAreas);