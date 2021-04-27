import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './core/Home';
import Profile from './core/Profile';
import Signin from './core/Signin';
import Signup from './core/Signup';
import AddCourse from './faculty/AddCourse';
import { CreateCourse } from './faculty/helper';
import PrivateRoute from './helper/PrivateRoutes'
import AdminRoute from './helper/AdminRoutes'
import DashBoard from './faculty/Dashboard';
import FacultyCourse from './faculty/FacultyCourse';
import MyCourses from './core/MyCourses';
import UpdateProfile from './core/UpdateProfile';



function router() {
    return (
        <div>
            <BrowserRouter>
                <Switch>

                    <PrivateRoute path="/" exact component={Home} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/signup" exact component={Signup} />
                    <PrivateRoute path="/profile" exact component={Profile} />
                    <PrivateRoute path="/UpdateProfile" exact component={UpdateProfile} />
                    <PrivateRoute path="/MyCourses" exact component={MyCourses} />
                    <AdminRoute path="/createCourse" exact component={AddCourse} />
                    <AdminRoute path="/Dashboard" exact component={DashBoard} />
                    <AdminRoute path="/facultyCourse" exact component={FacultyCourse} />



                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default router
