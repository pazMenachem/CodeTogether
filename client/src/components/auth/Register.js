import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link, Navigate  } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../css/Register.css"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
}
from 'mdb-react-ui-kit';


const Register = ({ setAlert, register, isAuthenticated  }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate  to="/" />;
  }

  return (
        <MDBContainer fluid>
          <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                  <form onSubmit={onSubmit}>
                    <div className="d-flex flex-row align-items-center mb-4 form-group">
                      <MDBIcon fas icon="user me-3" size='lg'/>
                      <TextField
                      label="Your Name" 
                      variant="outlined"
                      name="name"
                      value={name}
                      onChange={onChange}
                      />
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <MDBIcon fas icon="envelope me-3" size='lg'/>
                      <TextField 
                      label="Your Email" 
                      variant="outlined"
                      name="email"
                      value={email}
                      onChange={onChange}/>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <MDBIcon fas icon="lock me-3" size='lg'/>
                      <TextField 
                      label="Password" 
                      variant="outlined" 
                      name="password"
                      type='password'
                      value={password}
                      onChange={onChange}
                      />
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <MDBIcon fas icon="key me-3" size='lg'/>
                      <TextField
                      label="Repeat your password" 
                      variant="outlined" 
                      type='password'
                      name="password2"
                      value={password2}
                      onChange={onChange}/>
                    </div>

                    <Button variant="outlined" value="Register" type="submit">
                      Register
                    </Button>
                  </form>
                  <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                  </p>
                </MDBCol>

                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                  <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                </MDBCol>

              </MDBRow>
            </MDBCardBody>

          </MDBCard>
      </MDBContainer>
  ); 
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
