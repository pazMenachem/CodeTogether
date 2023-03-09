import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link , Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteProject, editProject, loadProjects } from '../../actions/project'
import AddProject from './AddProject'
import EditProject from './EditProject'
import formatDate from '../../utils/formatDate'


const Project = ({user, projects, deleteProject, loadProjects }) => {
  useEffect(() => {
    loadProjects(user.user._id);
  },[loadProjects, user.user._id]);

  const handleDelete = (id) => {
    deleteProject(id);
    loadProjects(user.user._id)
  }

  // const handleEdit = (projectToEdit) => {
  //   <EditProject project={projectToEdit} />
  // }

  if(projects){
      projects = projects.map((project) => (
      <tr key={project._id}>
          <td>{project.title}</td>
          <td className="hide-sm">{project.description}</td>
          <td>
            <div className="dash-buttons">
              <Link to= "/add-project" state = {{ project }} className="btn btn-light">
              <i className="fas fa-user-circle"></i> Edit Project</Link>
            </div>
            <button
              onClick={() => handleDelete (project._id)}
              className="btn btn-danger">Delete
            </button>
          </td>
        </tr>
      ));
  }

  return (
    <Fragment>
      <h2 className="my-2">My projects</h2>
      <table className="table">
        <thead>
          <tr>
            <th>title</th>
            <th className="hide-sm">description</th>
            <th className="hide-sm">Modify</th>
            <th />
          </tr>
        </thead>
        <tbody>{projects}</tbody>
      </table>
    </Fragment>
  );
};

Project.propTypes = {
  user: PropTypes.object,
  deleteProject: PropTypes.func,
};

const mapStateToProps = (state) => ({
  projects: state.project ? state.project.items : [],
  user: state.auth,
});

export default connect(mapStateToProps, { deleteProject, loadProjects })(Project);


          {/* <div className="dash-buttons">
          <Link to="/edit-project" className="btn btn-light">
            <i className="btn btn-danger"></i> Edit Project</Link>
          </div> */}