import React, {Component} from "react"

import ScrollableListMenu from "../common/ScrollableListMenu"
import WideListButtonView from "../common/WideListButtonView"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles/DashboardStyle.css"

class TeacherDashboard extends Component {
    constructor() {
        super()
        this.state = {
            categories:[[
                    { id: 1, name: "TVT17SPO" },
                    { id: 2, name: "TVT17SPL" },
                    { id: 3, name: "EX16SPI" },
                    { id: 4, name: "EX16SPO" },
                    { id: 5, name: "TVT18SPO" },
                    { id: 6, name: "TVT18SPL" }
                ]
            ,[
                    { id: 1, name: "Basics of Java", linkedClass: "TVT17SPO" },
                    { id: 2, name: "Basic beginner course", linkedClass: "TVT18SPO" },
                    { id: 3, name: "Object oriented analysis", linkedClass: "TVT18SPL" },
                    { id: 4, name: "Advanced maths", linkedClass: "TVT16SPO" },
                    { id: 5, name: "Best course ever", linkedClass: "TVT15SPO" },
                    { id: 6, name: "International exam", linkedClass: "TVT14SPL" }
                ],[
                    { id: 1, name: "Professional English",
                    description: "The English test consists of 30 questions. There’s no time limit, so take your time. You will need headphones or speakers for the listening section. You will get your results as soon as you’ve finished the test.",
                    date: "5.2.2019"},

                    { id: 2, name: "Unprofessional English" },
                    { id: 3, name: "Professional Swedish" },
                    { id: 4, name: "Exam template" }
            ]
        ],
            selectedCategoryId: 0,
            selectionId: 0,
        }

        this.onScrollableListItemClicked = this.onScrollableListItemClicked.bind(this)
    }
    onScrollableListItemClicked = (category, id) =>(e)=>{
        console.log("event",e)
        e.preventDefault()
        console.log("ran itemclick", category, id)
            this.setState(() =>{
                return{
                    selectedCategoryId: category,
                    selectionId: id-1
                    
                }
                console.log("states ", this.state.selectedCategoryId, this.state.selectionId)
            })
    }

    render() {
        console.log(this.state.categories[this.state.selectedCategoryId][this.state.selectionId])
        var key
        
        return(
            <div>
                <div className="pure-g">
                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu 
                                menuHeader="My classes" 
                                menuItems={this.state.categories[0]}
                                category = {0}
                                handler = {this.onScrollableListItemClicked.bind(this)}/>
                                <button onClick = {this.onScrollableListItemClicked(2, 3)} className="pure-button pure-button-primary">Add new class</button>
                                <button className="pure-button pure-button-disabled">Delete selected</button> 
                        </div>                  
                    </div>
                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu 
                                menuHeader="Ready for evaluation" 
                                menuItems={this.state.categories[1]}
                                category = {1}
                                handler = {this.onScrollableListItemClicked.bind(this)}/>
                                <button className="pure-button pure-button-disabled">Evaluate selected</button>
                        </div>  
                    </div>
                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu 
                                menuHeader="My own exams" 
                                menuItems={this.state.categories[2]}
                                category = {2}
                                handler = {this.onScrollableListItemClicked.bind(this)}/>
                                <Link to="/create_exam"><button className="pure-button pure-button-primary">Create new exam</button></Link>
                                
                                <button className="pure-button pure-button-disabled">Delete selected</button>                         
                        </div>  
                    </div>
                    
                </div>
                <div className="pure-g">
                <div className="pure-u-3-24"></div>
                <div className="pure-u-18-24">
                    <div className="padded-box">
                        <WideListButtonView title={this.state.categories[this.state.selectedCategoryId][this.state.selectionId].name} exam={this.state.categories[this.state.selectedCategoryId][this.state.selectionId]}/>
                    </div>
                </div>
                <div className="pure-u-3-24"></div>
                </div>
            </div>
        )
    }
}

export default TeacherDashboard