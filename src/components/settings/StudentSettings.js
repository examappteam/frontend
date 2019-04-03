import React, {Component} from 'react';
import './styles/Settings.css';
import pic from './img/download.jpg';
import Modal from '../common/Modal';
import ChangeEmailContent from './ChangeEmailContent';
import ChangePasswordContent from './ChangePasswordContent';

class StudentSettings extends Component{
    
constructor(props){
    super(props)
    this.state={ pswDialogIsOpen: false};
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
toggleModal2 = () => {
this.setState({ 
pswDialogIsOpen: !this.state.pswDialogIsOpen
});
} 
    render(){
    return(
        
        
        <div>

            <Modal show={this.state.isOpen}
                close={this.toggleModal}>
                <ChangeEmailContent /> 
            </Modal>

            <Modal show={this.state.pswDialogIsOpen}
                close={this.toggleModal2}>
               <ChangePasswordContent />
            </Modal>

            <div id= "settings">
        <div id="mleft">
        <h1>Personal Info</h1>
        
        <div className="pure-g">
        
        <div className="pure-u-1-4">
            

                <img src={pic} alt="d"></img>
                
        </div>

        <div id="settings" class="dropdown">
  <button id="settings" class="dropbtn">Change Information</button>
  <div id="settings" class="dropdown-content">
    
    <input className="buttonchangepswemail" onClick={this.toggleModal} type="button" value="Change Email"/>

    
    
    <input className="buttonchangepswemail" onClick={this.toggleModal2} type="button" value="Change Password" />
    
    

  </div>
</div>
        

        
        
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
export default StudentSettings; 