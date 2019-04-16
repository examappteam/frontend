import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Auth from "./Auth";

export const DashboardDirect = ({component: Component, ...rest}) => {
    
    return (
        <Route
        {...rest} 
        render={
            
            props => {
                if((sessionStorage.getItem('email')) == "teacher" ){
                 if(((Auth.teacherIsAuthenticated()) || (Auth.studentIsAuthenticated()) ) == null){
                return <Component{...props} />
            }
            
            else {

                return <Redirect to ={
                    {
                        
                        pathname: "/teacherdashboard",
                        state: {
                            from: props.location
                        }
                    
                    }
                } />
            }
        }

        else if ((sessionStorage.getItem('email')) == "student" ){
            if(((Auth.studentIsAuthenticated()) ) == null){
           return <Component{...props} />
       }
       
       else {

           return <Redirect to ={
               {
                   
                   pathname: "/studentdashboard",
                   state: {
                       from: props.location
                   }
               
               }
           } />
       }
   }

   else {
    return <Component{...props} />
   }



            }
        }
        />
    );
};