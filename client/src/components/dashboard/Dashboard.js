import {React, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Project from './Project';

//TODO
//1. change buttons - 3
//8. change add page submit buttons. 3

const Dashboard = ({ auth: { user }}) => {
  return (
    <section className="container">
      <h1 className="h1 fw-bold ">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"/> Welcome {user && user.name}
      </p>
       <div className="dash-buttons">
        <Link to="/add-project" className="btn btn-light">
          <i className="fas fa-user-circle"></i> Add Project</Link>
      </div>
      <Fragment>
        <Project/>
      </Fragment>

    </section>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps)(Dashboard);
