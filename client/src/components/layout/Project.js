import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadProjects } from '../../actions/project';
import PropTypes from 'prop-types';
import defaultImage from "../../img/defaultProjectImage.png"
import "../css/Project.css";

import { Grid,
        Rating, 
        TextField } from '@mui/material';
import { MDBCard,
         MDBCardBody, 
         MDBCardText,
         MDBCardImage} from 'mdb-react-ui-kit';


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
                <p className='title-card'>{project.title}</p>
                <p className='section'>Description</p>
                <TextField
                sx={{ width: '150%' }}
                multiline 
                value={project.description} 
                rows={4} 
                disabled
                variant="standard"
                >
                </TextField>
                <p className='section'>Programming Language</p><MDBCardText> {project.programLanguage}</MDBCardText>
                <p className='section'>GitHub Link</p><MDBCardText><a href={project.githubLink} target="_blank">{project.githubLink}</a></MDBCardText>
                <p className='section'>Contact</p><MDBCardText><a href={project.contactLink} target="_blank"></a>{project.contactLink}</MDBCardText>
                <p className='section'>Difficult</p>
                <Rating name="disabled" id="stars" value={project.difficult} disabled />
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
