import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link , Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteProject, editProject, loadProjects } from '../../actions/project'
import '../css/DashboardProject.css'

const Project = ({user, projects, deleteProject, loadProjects }) => {
  useEffect(() => {
    loadProjects(user.user._id);
  },[loadProjects, user.user._id]);

  const handleDelete = (id) => {
    deleteProject(id);
    loadProjects(user.user._id)
  }

  if(projects){
      projects = projects.map((project) => (
      <tr className='tb-row' key={project._id}>
          <td className="hide-sm title">{project.title}</td>
          <td className="hide-sm description">{project.description}</td>
          <td>
            <div className="dash-buttons">
              <Link to= "/add-project" state = {{ project }} className="btn btn-light">Edit Project</Link>
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
          <tr className='head-titles'>
            <th className='title-title'>title</th>
            <th className="hide-sm title-description">description</th>
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
