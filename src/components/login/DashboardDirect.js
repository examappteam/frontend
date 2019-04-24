import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Auth from "./Auth";
import jwt_decode from 'jwt-decode';
export const DashboardDirect = ({component: Component, ...rest}) => {
    
    return (
        <Route
        {...rest} 
        render={
           
            props => {
                var trimmedDecode = jwt_decode(sessionStorage.getItem('jwtToken'));
      
                var trimmedName = trimmedDecode.roles[0];
                console.log("Täällä olen" + trimmedName);
                if((trimmedName) == "ROLE_TEACHER" ){
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

        else if ((trimmedName) == "ROLE_STUDENT" ){
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