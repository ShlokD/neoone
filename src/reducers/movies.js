import { SEARCH_MOVIES_SUCCESS } from "../actions/constants";

export const movies = (state = {}, action) => {
  switch(action.type) {
    case SEARCH_MOVIES_SUCCESS:
    const { payload } = action;
    return {
      ...state,
      data: payload
    }
    default: return state;
  }
}
