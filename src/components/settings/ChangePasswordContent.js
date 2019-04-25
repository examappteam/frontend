import React, {Component} from 'react';
import './styles/Settings.css';

class ChangePasswordContent extends Component{

    render(){
    return(
        <div id="mleft">
        <h1>Change Password</h1>


        <input  type="password" autoComplete="off" name="password" placeholder="Password" ></input>
        <br />
        <input type="password" name="password" placeholder="New Password" ></input>
        <br />
        <input type="password" name="password" placeholder="New Password" ></input>
        
        </div>
    )
}
}
export default ChangePasswordContent;