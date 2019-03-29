import React, {Component} from 'react';
import './styles/StudentInformation.css';
import pic from '../settings/img/download.jpg';
import ScrollableListMenu from "../common/ScrollableListMenu"
class StudentInformation extends Component{
    constructor() {
        super()
        this.state = {

            email: "Pekka",
            users: [[
                {id: 1, gender: "Male", email: "Pekkaownaa421@Kakka.com", name: "Haluujafa", surname: "Haleba"}
            ],
        ],
            stId: 0,
            stId2: 0,
            categories:[
    
                [
                    { id: 1, name: "Basics of Java", linkedClass: "TVT17SPO" },
                    { id: 2, name: "Basic beginner course", linkedClass: "TVT18SPO" },
                    { id: 3, name: "Object oriented analysis", linkedClass: "TVT18SPL" },
                    { id: 4, name: "Advanced maths", linkedClass: "TVT16SPO" },
                    { id: 5, name: "Best course ever", linkedClass: "TVT15SPO" },
                    { id: 6, name: "International exam", linkedClass: "TVT14SPL" }
                ],
                [
                    { id: 1, name: "Professional English",
                      description: "The Professional English test consists of 30 questions. There’s no time limit, so take your time. You will need headphones or speakers for the listening section. You will get your results as soon as you’ve finished the test.",
                      date: "5.2.2019"},

                    { id: 2,description: "The Unprofessional English test consists of 30 questions. There’s no time limit, so take your time. You will need headphones or speakers for the listening section. You will get your results as soon as you’ve finished the test.", name: "Unprofessional English", date: "14.3.2019" },
                    { id: 3,description: "The Professional Swedish test consists of 30 questions. There’s no time limit, so take your time. You will need headphones or speakers for the listening section. You will get your results as soon as you’ve finished the test.", name: "Professional Swedish", date: "14.4.2019" },
                    { id: 4,description: "The Engineering mathematics test consists of 30 questions. There’s no time limit, so take your time. You will need headphones or speakers for the listening section. You will get your results as soon as you’ve finished the test.", name: "Engineering mathematics", date: "15.3.2019" }
                ]
            ],
            selectedCategoryId: 0,
            selectionId: 0,
            showState: false
        }

        

        this.onScrollableListItemClicked = this.onScrollableListItemClicked.bind(this)
        this.changeShowState = this.changeShowState.bind(this)
    }

    onScrollableListItemClicked = (category, id) => (e) => {
        console.log("event",e)
        e.preventDefault()
        console.log("ran itemclick", category, id)
            this.setState(() =>{
                return{
                    selectedCategoryId: category,
                    selectionId: id-1                   
                }
                //console.log("states ", this.state.selectedCategoryId, this.state.selectionId)
            })
    }

    changeShowState=()=>{
        this.setState(prevState=>({
                showState: !prevState.showState
            
        }));
        console.log("showstate",this.state.showState)
    }
    render(){
    return(

    <div>
<div id="mleft2">
        <h1>Personal Info About Student</h1>
        
        
            <div id="settings2">
            <div className="pure-g">
            <div className="pure-u-1-4">

        <img className="img" src={pic} alt="d"></img>
        
      

        </div>

        <div className="pure-u-1-1">
<div className="padded-box">
<ScrollableListMenu 
        menuHeader="Evaluated Exams" 
        menuItems={this.state.categories[0]}
        selectedItem={this.state.selectionId}
        selectedCategory={this.state.selectedCategoryId}
        category = {0}
        handler = {this.onScrollableListItemClicked.bind(this)}/>
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
                    </div>
                        </div>
                        </div>
            
    
        
    )
}
}
export default StudentInformation; 
