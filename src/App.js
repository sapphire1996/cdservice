import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import NotFound from './components/dashboard/NotFound';
import Admin from './components/admin/AdminPannel';
import CdsPerLg from './components/admin/CdsPerLg';
import CoursePerCds from './components/admin/CoursePerCds';
import Register from './components/admin/AppExcel';
import Registration from './components/dashboard/Registration'
import EditGuidline from './components/admin/EditGuidline';
import RegTable from './components/admin/RegTable';
import Profile from './components/dashboard/Profile';
import ResetPassword from "./components/auth/PasswordReset";
import Footer from './components/layout/Footer';
import AppGuidline from './components/dashboard/AppGuidline';
import AdminGuidline from './components/admin/AdminGuidline';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
       < div className = "App" >
       <Navbar/>
       <Switch>
         <Route exact path="/" component={Dashboard}/>
         <Route path='/project/:id' component={ProjectDetails}/>
         <Route path='/signin' component={SignIn}/>
         <Route path='/signup' component={SignUp}/>
         <Route path='/post' component={CreateProject}/>
         <Route path='/admin' component={Admin}/>
         <Route path='/register' component={Register}/>
         <Route path='/registration' component={Registration}/>
         <Route path='/cds/:id' component={CdsPerLg}/>
         <Route path='/course/:id' component={CoursePerCds}/>
         <Route path='/profile/:id' component={Profile}/>
         <Route path='/guildline' component={EditGuidline}/>
         <Route path='/reg' component={RegTable}/>
         <Route path='/resetpassword' component={ResetPassword}/>
         <Route path='/appGuidline' component={AppGuidline}/>
         <Route path='/adminGuidline' component={AdminGuidline}/>
         <Route component={NotFound}/>
       </Switch>
       <Footer/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
