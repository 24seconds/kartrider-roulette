import {
  ADD_ROULETTE_SET,
  DELETE_ROULETTE_SET,
  UPDATE_ROULETTE_RESULT,
  OPEN_POPUP,
  CLOSE_POPUP,
} from './actionType';

export const addRouletteSet = trackList => ({
  type: ADD_ROULETTE_SET,
  payload: trackList,
});

export const deleteRouletteSet = trackList => ({
  type: DELETE_ROULETTE_SET,
  payload: trackList,
});

export const updateRoulletteResult = track => ({
  type: UPDATE_ROULETTE_RESULT,
  payload: track,
});

export const openPopup = () => ({
  type: OPEN_POPUP,
});

export const closePopup = () => ({
  type: CLOSE_POPUP,
});
