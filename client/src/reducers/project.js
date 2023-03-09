import { LOAD_PROJECTS, 
         ADD_PROJECT,
         DELETE_PROJECT,
         LOAD_PROJECTS_BY_ID
        } from '../actions/types';

const initialState = {
  items: [],
};
//TODO fix reduce?. 2
const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROJECTS:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    // case LOAD_PROJECTS_BY_ID:
    //   return {
    //     ...state,
    //     items: action.payload,
    //   };
      // case DELETE_PROJECT:
      //   return {
      //     ...state,
      //     items: action.payload,
      //   };
    default:
      return state;
  }
};

export default projectReducer;
