import  {React, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProject, getProjectById , editProject} from '../../actions/project';


const AddProject = ({ addProject, editProject, getProjectById }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const edit = location.state? true : false;
    const [project, setProject] = useState(null);
    const [formData, setFormData] = useState({
      title:'',
      description:'',
      programLanguage:'',
      date:'',
      githubLink: '',
      // contactLink: project? project.title : '',
      // image: project? project.title : null,
      // current: project? project.title : false
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
        });
      }
    }, [project]);

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { title, 
            description,
            programLanguage, 
            date, 
            difficult, 
            contactLink, 
            image, 
            githubLink,
            current } = formData;

    const submit = async (e) => {
      e.preventDefault();
      try {
        if (edit){
        editProject(formData);}
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
              <input
                type="text"
                placeholder="The title of the project"
                name="title"
                value={title}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Project Description"
                value={description}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Program Language"
                name="programLanguage"
                value={programLanguage}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Github URL"
                name="githubLink"
                value={githubLink}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <h4>Start Date</h4>
              <input type="date" name="date" value={date} onChange={e => onChange(e)} />
            </div>
            <div className="form-group">
              <p>
                <input
                  type="checkbox"
                  name="current"
                  checked={current}
                  value={current}
                  onChange={e => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                }}
                />{' '}
                Current project
              </p>
            </div>

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
