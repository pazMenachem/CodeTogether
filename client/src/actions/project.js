import axios from 'axios';
import { setAlert } from './alert';
import { ADD_PROJECT, 
         LOAD_PROJECTS,
         ADD_FAIL,
         DELETE_PROJECT,
         PROJECT_ERROR,
         LOAD_PROJECTS_BY_ID,
         UPDATE_PROJECT,
         } from './types'

//TODO
// load the projects by specific order. 2

export const loadProjects = (id = null) => async (dispatch) => {
  try {
    const url = id ? `/api/project/user/${id}` : '/api/project';
    const response = await axios.get(url);
    dispatch({
      type: LOAD_PROJECTS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getProjectById = (id) => async (dispatch) => {
  try {
    const url = `/api/project/${id}`;
    const response = await axios.get(url);
    return response.data;
  }
  catch (error) {
    console.error(error);
  }
};
  //   dispatch({
  //     type: LOAD_PROJECTS_BY_ID,
  //     payload: response.data,
  //   });

// Add Project 
export const addProject = (formData) => async (dispatch) => {

  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }
  const body = JSON.stringify({ ...formData });
  try{

    const response = await axios.post('/api/project', body, config);

    dispatch({
      type: ADD_PROJECT,
      payload: response.data,
    })
  }
  catch(err){
    const errors = err.response.data.errors;
    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    
    dispatch({
      type: ADD_FAIL
    });
    throw new Error();
  }
} 

// Delete Project
export const deleteProject = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/project/${id}`);

    dispatch({
      type: DELETE_PROJECT,
      payload: id
    });

    dispatch(setAlert('Project Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//update project
export const editProject = ( formData ) => async (dispatch) => {
  try {
      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const res = await axios.put('/api/project/', formData, config);
      console.log("checky checky")
      dispatch({
          type: UPDATE_PROJECT,
          payload: res.data
      });

      dispatch(setAlert('Project edited', 'success'));
            
  } catch (err) {
      const errors = err.response.data.errors;

      if(errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
          type: PROJECT_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
      });
      throw new Error();
  }   
}

