import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { SET_USER, CLEANUP } from '../actions/actionConstants';

// Async function to fetch user details
export const getUser = async () => {
  const islogin = isLoggedIn();
  if (islogin) {
    try {
      const response = await getAuthData('/user/get-user-details');
      if (response?.status === 200) {
        return response.data; // Return the data instead of logging it
      }
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
};

const initialState = {};

const userModule = (state = { ...initialState }, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case CLEANUP:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userModule;
