import { combineReducers } from "redux";
import { ADD_ROULETTE_SET, DELETE_ROULETTE_SET, UPDATE_ROULETTE_RESULT } from "./actionType";

const initialRouletteSet = new Set(['병마용', '스카이 라인', '고가', '대저택', '사빙공']);

function rouletteSet(state = initialRouletteSet, action) {
  if (action.type === ADD_ROULETTE_SET) {
    const newSet = new Set();
    state.forEach(value => newSet.add(value));
    action.payload.forEach(track => newSet.add(track));

    return newSet;
  } else if (action.type === DELETE_ROULETTE_SET) {
    const newSet = new Set();
    state.forEach(value => newSet.add(value));
    action.payload.forEach(track => newSet.add(track));

    return newSet;
  }

  return state;
}

function rouletteResult(state = 'Default initial Result', action) {
  if (action.type === UPDATE_ROULETTE_RESULT) {
    return action.payload;
  }

  return state;
}

export default combineReducers({
  rouletteSet,
  rouletteResult,
});
