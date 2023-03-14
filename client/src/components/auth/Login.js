import React, { useState } from 'react'
import { Link, Navigate  } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoginImage from '../../static/Login.png'
import '../css/Login.css'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
}
from 'mdb-react-ui-kit';
//TODO
// 1. place holders get on top of line when moved 3

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate  to="/"/>;
  }

  return ( 
    <MDBContainer fluid id='bodyLogin'>
      <MDBCard className='text-black m-5' id='cardLogin' style={{borderRadius: '50px'}}>
        <MDBCardBody>
          <MDBRow>

            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <h1 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                  <div className="form-group">
                    <TextField 
                    type="email"
                    label="Email Address"
                    variant="outlined"
                    name="email" 
                    value = {email}
                    onChange={onChange} 
                    required
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      type="password"
                      label="Password"
                      name="password"
                      value = {password} 
                      onChange={onChange} 
                      minLength="6"
                    />
                  </div>
                  <Button variant="outlined" value="Register" type="submit">
                    Login
                  </Button>
                </form>
                <p className="my-1">
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
              </MDBCol>

              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                  <MDBCardImage src={LoginImage} fluid/>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>  
        </MDBCard>
      </MDBContainer>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
