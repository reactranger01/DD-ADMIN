// reducers/betModule.js

import { SET_SELECTED_BET } from '../actions/actionConstants';

// import { SET_SELECTED_BET } from '@actions/actionConstants';

const initialState = {
  status: false,
};
const betModule = (state = { ...initialState }, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_BET:
      return {
        ...state,
        status: action.payload.payload,
      };
    default:
      return state;
  }
};

export default betModule;
