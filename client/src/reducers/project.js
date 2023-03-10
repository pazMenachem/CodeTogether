import { LOAD_PROJECTS, 
         ADD_PROJECT,
         DELETE_PROJECT,
         PROJECT_ERROR,
         UPDATE_PROJECT,
        } from '../actions/types';

const initialState = {
  items: [],
  error: {}
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROJECTS:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_PROJECT:
    case UPDATE_PROJECT:  
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case DELETE_PROJECT:
      return {
        ...state,
        item: action.payload
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default projectReducer;
