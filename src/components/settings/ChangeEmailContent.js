import React, {Component} from 'react';


class ChangeEmailContent extends Component{

    render(){
    return(
    <div id="mleft">
        <h1>Change Email</h1>
        <input type="text" autoComplete="off" placeholder="Email" ></input>
        <br />
        <input type="text" autoComplete="off" placeholder="New Email" ></input>
        <br />
        <input type="password" name="password" placeholder="Password" ></input>
        <br />
        <input type="password" name="password" placeholder="Password" ></input>
    </div>
    )
}
}
export default ChangeEmailContent; 