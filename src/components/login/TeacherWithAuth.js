import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Auth from "./Auth";
import Header from "../Header";

export const TeacherWithAuth = ({component: Component, ...rest}) => {
    return (
        <Route
        {...rest} 
        render={
            props => {
               if ((Auth.teacherIsAuthenticated())){
                return <div> <Header /> <Component{...props} /> </div>
            }
            else {
                return <Redirect to ={
                    {
                        pathname: "/",
                        state: {
                            from: props.location
                        }
                    }
                } />
            }
            }
        }
        />
    );
};