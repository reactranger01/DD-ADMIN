import { CURRENT_CALCULATION } from '../actions/actionConstants';

// import { SET_SELECTED_BET } from '@actions/actionConstants';

const initialState = {
  userPath: {},
};
const calculationModule = (state = { ...initialState }, action = {}) => {
  switch (action.type) {
    case CURRENT_CALCULATION:
      return {
        ...state,
        userPath: action.payload.payload,
      };
    default:
      return state;
  }
};

export default calculationModule;
