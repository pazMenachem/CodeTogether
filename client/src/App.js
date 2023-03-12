import React, { useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import NotFound from './components/layout/NotFound';
import Project from './components/layout/Project';
import Dashboard from './components/dashboard/Dashboard';
import AddProject from './components/dashboard/AddProject';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

//TODO
// GENERAL NOTES
// 1. organzise code - **at the end** .1
// 2. Make report - **at the end** .1
// 3. redux stats updated twice for some reason. 2
const App = () => { 
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    return (
        <Provider store={store}>
            <Navbar />
            <Alert />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="project" element={<Project />} /> 
                <Route path="dashboard" element={<PrivateRoute component={Dashboard} />}/>
                <Route path="add-project" element={<PrivateRoute component={AddProject} />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Provider>
)};

export default App;
