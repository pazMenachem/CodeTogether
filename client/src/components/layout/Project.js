import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid,
         Rating } from '@mui/material';
import { MDBCard,
         MDBCardBody, 
         MDBCardTitle, 
         MDBCardText,
         MDBCardImage } from 'mdb-react-ui-kit';
import { loadProjects } from '../../actions/project';
import PropTypes from 'prop-types';
import "../css/Project.css";
import defaultImage from "../../img/defaultProjectImage.png"


//TODO
//1. description need to be in scroll display.
const ProjectList = ({ projects, loadProjects }) => {
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div className='container'>
      <Grid container spacing={5}>
        {projects.map((project) => (
          <Grid item xs={6} md={4} key={project.id}>
            <MDBCard>
            <MDBCardImage className='image' src={project.image || defaultImage} alt={project.title} top/>
              <MDBCardBody>
                <MDBCardTitle><p className='title'>{project.title}</p> </MDBCardTitle>
                <MDBCardText><p className='section'>Description</p> {project.description}</MDBCardText>
                <MDBCardText><p className='section'>Programming Language</p> {project.programLanguage}</MDBCardText>
                <MDBCardText><p className='section'>GitHub Link</p><a href={project.githubLink} target="_blank"></a></MDBCardText>
                <MDBCardText><p className='section'>Contact</p><a href={project.contactLink} target="_blank"></a></MDBCardText>
                <MDBCardText><p className='section'>Difficult</p></MDBCardText>
                <Rating name="disabled" id="stars" value={project.difficult} disabled />
                <MDBCardText><p className='section date'>{project.projectStartDate || "Date"}</p></MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      program_language: PropTypes.string.isRequired,
      githubLink: PropTypes.string.isRequired,
      difficult: PropTypes.number.isRequired,
      projectStartDate: PropTypes.instanceOf(Date).isRequired,
      contactLink: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.project ? state.project.items : [],
});

export default connect(mapStateToProps, { loadProjects })(ProjectList);
