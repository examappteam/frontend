import React, {Component} from 'react';
import ScrollableListMenu from '../common/ScrollableListMenu';
import './styles/Settings.css';
import { BrowserRouter as Link } from "react-router-dom";
import pic from './img/download.jpg';
import Modal from '../common/Modal';

/*
menuItems = {this.state.users[0]} 
         menuHeader = "Classes"
         users = {0}
*/


class Settings extends Component{
    
constructor(props){
    super(props)
    this.state={ isOpen: false};
    this.state={
        email: "Pekka",
        users: [[
            {id: 1, gender: "Male", email: "Pekkaownaa421@Kakka.com", name: "Haluujafa", surname: "Haleba"}
        ],
    ],
        stId: 0,
        stId2: 0,
    }
    
}
toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

    
    render(){
    return(
        
        
        <div>
            
          
            <div id= "settings">
        <div id="mleft">
        <h1>Personal Info</h1>
        
        <div className="pure-g">
        
        <div className="pure-u-1-4">
            

                <img src={pic}></img>
                
        </div>

        <p align="left">
            <input className="buttonchangepswemail" onClick={this.toggleModal} type="button" value="Change Email / Password" />
            </p>
            <Modal show={this.state.isOpen}
          close={this.toggleModal}>
          <p>asd</p>
          
          </Modal> 
        
        
    </div>
    

        <div className="pure-g">
        
    <div className="pure-u-1-2">
        
            <h2>Email</h2> 
            
            
            <br />
            <i>{this.state.users[this.state.stId][this.state.stId2].email}</i>


    </div>
    
    
    
</div>
        <div className="pure-g">
            <div className="pure-u-1-3">
            
            
            <h2>Name</h2>
            <br />
            <i>{this.state.users[this.state.stId][this.state.stId2].name}</i>
            
            </div>
            <div className="pure-u-1-3">
            
            <h2>Surname</h2>
            <br />
            <i>{this.state.users[this.state.stId][this.state.stId2].surname}</i>
            
            </div>
        </div>  
         
                    <div className="pure-g">
                <div className="pure-u-1-2">

                <h2>Gender</h2>
                <br />
                <i>{this.state.users[this.state.stId][this.state.stId2].gender}</i>
                
                </div>
                
                    </div>
                    <br />
                    
                    </div>
                    
                    </div>
                    
        </div>
    )
}
}
export default Settings; 