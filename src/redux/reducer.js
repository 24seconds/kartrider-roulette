import { combineReducers } from "redux";
import {
  ADD_ROULETTE_SET,
  DELETE_ROULETTE_SET,
  DELETE_ALL_ROULETTE_SET,
} from "./actionType";
import {
  ROULETTE_RESULT_PLACEHOLDER,
} from '../database/constant';

const initialRouletteSet = {};

function rouletteSet(state = initialRouletteSet, action) {
  if (action.type === ADD_ROULETTE_SET) {
    const newState = { ...state };

    action.payload.forEach(track => {
      newState[track] = newState[track] || 0;
      newState[track] += 1;
    });

    return newState;
  } else if (action.type === DELETE_ROULETTE_SET) {
    const newState = { ...state };

    action.payload.forEach(track => {
      newState[track] = newState[track] || 0;
      newState[track] -= 1;

      if (newState[track] <= 0) {
        delete newState[track];
      }
    });

    return newState;
  } else if (action.type === DELETE_ALL_ROULETTE_SET) {
    return {};
  }

  return state;
}

export default combineReducers({
  rouletteSet,
});
