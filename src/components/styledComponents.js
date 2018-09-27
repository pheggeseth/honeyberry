import styled from 'styled-components';
import { STYLE_CONSTANTS } from '../styles/styleConstants';

export const ScreenContainer = styled.div`
  height: 100%;

  @media only screen 
  and (min-width: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Screen = styled.div`
  height: 100%;
  width: 100%;
  max-width: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px;
  background-color: gainsboro;

  @media only screen 
  and (min-width: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px)
  and (min-height: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px) {
    max-height: ${100 - STYLE_CONSTANTS.DESKTOP_VERTICAL_MARGIN * 2}vh;
  }
`;

export const Content = styled.div`
  // height: 100%;
  clear: both;
  padding: ${STYLE_CONSTANTS.CONTENT_MARGIN}px;
  margin-bottom: ${STYLE_CONSTANTS.BOTTOM_NAV_HEIGHT}px;
`;

export const BottomNav = styled.div`
  height: ${STYLE_CONSTANTS.BOTTOM_NAV_HEIGHT}px;
  width: inherit;
  max-width: inherit;
  background-color: dimgray;
  position: fixed;
  bottom: 0;
  display: flex;

  @media only screen 
  and (min-width: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px)
  and (min-height: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px) {
    margin-bottom: 5vh;
  }

  & > ul {
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  & > ul li a {
    color: white;
    text-align: center;
    text-decoration: none;
  }
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;

  @media only screen and (min-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 3 + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px) {
    max-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 3}px;
  }
  @media only screen and (min-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 4 + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px) {
    max-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 4}px;
  }
  @media only screen and (min-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 5 + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px) {
    max-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 5}px;
  }
  @media only screen and (min-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 6 + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px) {
    max-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 6}px;
  }
`;

export const ItemTileContainer = styled.div`
  height: ${STYLE_CONSTANTS.TILE_SIZE}px;
  width: ${STYLE_CONSTANTS.TILE_SIZE}px;
  background-color: lightgreen;
  margin: ${STYLE_CONSTANTS.TILE_MARGIN}px;

  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  
  :hover {
    filter: brightness(0.97);
    cursor: pointer;
  }

  &.selected {
    border: 3px solid lightpink;
  }

  &.inCurrentList {
    border: 3px solid lightgreen;
  }

  @media only screen and (max-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 3 + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px) {
    width: calc((100vw - ${STYLE_CONSTANTS.CONTENT_MARGIN * 2 + STYLE_CONSTANTS.TILE_MARGIN * 6}px) / 3);
    height: calc((100vw - ${STYLE_CONSTANTS.CONTENT_MARGIN * 2 + STYLE_CONSTANTS.TILE_MARGIN * 6}px) / 3);
  }
`;

// const ItemTile = styled.div`
//   height: ${TILE_SIZE}px;
//   width: ${TILE_SIZE}px;
//   background-color: lightgreen;
//   margin: ${TILE_MARGIN}px;

//   @media only screen and (max-width: 415px) {
//     width: calc((100vw - ${CONTENT_MARGIN * 2 + TILE_MARGIN * 6}px) / 3);
//     height: calc((100vw - ${CONTENT_MARGIN * 2 + TILE_MARGIN * 6}px) / 3);
//   }
// `;