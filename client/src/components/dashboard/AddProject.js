import  {React, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProject, getProjectById , editProject} from '../../actions/project';
import {TextField, Box} from '@mui/material';


const AddProject = ({ addProject, editProject, getProjectById }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const edit = location.state? true : false;
    const [project, setProject] = useState(null);
    const [formData, setFormData] = useState({
      title:'',
      description:'',
      programLanguage:'',
      githubLink: '',
      contactLink: '',
      image: null,
      difficult: 0,
    },[]);

    useEffect(() => {
      if (edit){
        const fetchData = async () => {
            const proj = await getProjectById(location.state.project._id);
            setProject(proj);
        };
        fetchData();
      }
    }, []);

    useEffect(() => {
      if (project) {
        setFormData({
          title: project.title || '',
          description: project.description || '',
          programLanguage: project.programLanguage || '',
          date: project.date || '',
          githubLink: project.githubLink || '',
          difficult: project.difficult || '',
          contactLink: project.contactLink || '',
        });
      }
    }, [project]);

    const { title, 
            description,
            programLanguage, 
            difficult, 
            contactLink, 
            image, 
            githubLink
          } = formData;

    const submit = async (e) => {
      e.preventDefault();
      try {
        if (edit){
        await editProject(formData);}
        else{
        await addProject(formData);}
        navigate('/dashboard');
      } catch (e) {}
    }
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    
    return (
        <section className="container">
          <h1 className="large fw-bold">{edit? 'Edit' : 'Add'} Your Project</h1>
          <form
            className="form"
            onSubmit={submit}
          >
            <div className="form-group">
              <TextField
                label="Title" 
                variant="outlined"
                name="title"
                value={title}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <TextField
                fullWidth
                multiline
                maxRows={4}
                label="Project Description" 
                variant="outlined"
                name="description"
                rows="5"
                value={description}
                onChange={e => onChange(e)}
              />
            </div>
              <Box
                  sx={{
                    '& > :not(style)': { m: 1 },
                  }}
              >
              <TextField
                variant="outlined"
                label="Program Language"
                name="programLanguage"
                value={programLanguage}
                onChange={e => onChange(e)}
              />
              <TextField
                sx={{ width: '30%' }}
                variant="outlined"
                label="Github URL"
                name="githubLink"
                value={githubLink}
                onChange={e => onChange(e)}
                required
              />

                <TextField
                  variant="outlined"
                  label="Contact Link"
                  name="contactLink"
                  value={contactLink}
                  onChange={e => onChange(e)}
                />
                <TextField
                sx={{ width: '8%' }}
                variant="outlined"
                label="Difficulty (1-5)"
                name="difficult"
                type="number"
                inputProps={{ min: "1", max: "5", step: "1" }}
                value={difficult}
                onChange={e => onChange(e)}
                />
                <div>
                  <TextField
                    variant="outlined"
                    label="Image link"
                    name="image"
                    value={image}
                    onChange={e => onchange(e)}
                  />
                </div>
            </Box>
              

            <input type="submit" className="btn btn-dark my-1"/>
              <Link className="btn btn-dark my-1" to="/dashboard">
                Go Back
              </Link>
          </form>
        </section>
      );
    };

AddProject.propTypes = {
    addProject: PropTypes.func.isRequired,
    getProjectById: PropTypes.func.isRequired,
    editProject:PropTypes.func.isRequired,
    project: PropTypes.object,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { addProject, getProjectById, editProject })(AddProject);
