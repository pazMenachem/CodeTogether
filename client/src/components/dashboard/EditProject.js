import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProject } from '../../actions/project';

const EditProject = ({ project, editProject }) => {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    program_language: project.program_language,
    github_link: project.github_link,
    difficult: project.difficult,
    projectStartDate: project.projectStartDate,
    contactLink: project.contactLink,
    image: project.image
  });

  const {
    title,
    description,
    program_language,
    github_link,
    difficult,
    projectStartDate,
    contactLink,
    image
  } = formData;
  console.log("edit project has been called")
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    editProject(project._id, formData);
  };

  return (
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Understood</button>
            </div>
            </div>
        </div>
    </div>
    
  );
};

EditProject.propTypes = {
  editProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
}

export default connect(null, { editProject })(EditProject);


{/* <div className="modal fade" id="editProjectModal" tabIndex="-1" aria-labelledby="editProjectModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editProjectModalLabel">Edit Project</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={e => onSubmit(e)}>
            <div className="modal-body">
              <div className="form-group">
                <input type="text" placeholder="Title" name="title" value={title} onChange={e => onChange(e)} />
              </div>
              <div className="form-group">
                <textarea placeholder="Description" name="description" value={description} onChange={e => onChange(e)}></textarea>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Programming Language" name="program_language" value={program_language} onChange={e => onChange(e)} />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Github Link" name="github_link" value={github_link} onChange={e => onChange(e)} />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Difficulty Level" name="difficult" value={difficult} onChange={e => onChange(e)} />
              </div>
              <div className="form-group">
                <label>Project Start Date</label>
                <input type="date" name="projectStartDate" value={projectStartDate} onChange={e => onChange(e)} />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Contact Link" name="contactLink" value={contactLink} onChange={e => onChange(e)} />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Image URL" name="image" value={image} onChange={e => onChange(e)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div> */}