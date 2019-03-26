import React, {Component} from "react"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import ScrollableListMenu from "../common/ScrollableListMenu"
import MdModal from "../common/modals/MdModal"
import StudentManager from "../common/StudentManager"
import "./styles/DashboardStyle.css"

class TeacherDashboardCourseView extends Component {
    constructor() {
        super()
        this.state = {
            categories:[
                [
                    { id: 1, name: "Teppo Tuomio"},
                    { id: 2, name: "Jaska Kaski" },
                    { id: 3, name: "Asd Dsa" },
                    { id: 4, name: "Jesus Hung" },
                    { id: 5, name: "Esimerkki Erkki" },
                    { id: 6, name: "Maija Meikäläinen" }
                ],
                [
                    { id: 1, name: "Starting test" },
                    { id: 2, name: "Middle test" },
                    { id: 3, name: "Late test" },
                    { id: 4, name: "Grammar test" },
                    { id: 5, name: "Word test" },
                    { id: 6, name: "Another test" }
                ],
                [
                    { id: 1, name: "Unprofessional English", date: "14.3.2019" },
                    { id: 2, name: "Professional English", date: "14.4.2019" },
                    { id: 3, name: "Final English exam", date: "15.3.2019" }
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
        this.setState( () => {
            return {
                selectedCategoryId: category,
                selectionId: id - 1                   
            }
        })
    }

    changeShowState=()=>{
        this.setState(prevState=>({
                showState: !prevState.showState
            
        }));
        console.log("showstate",this.state.showState)
    }

    componentDidMount() {

    }

    render() {
        return(
                <div>
                    <div className="pure-g class-head">
                    <div className="pure-u-1-3"></div>
                    <div className="pure-u-1-3">
                        <h1 className="floating-text">TVT17SPO</h1>
                    </div>
                </div>
                <div className="pure-g">
                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu 
                                menuHeader="List of students in course" 
                                menuItems={this.state.categories[0]}
                                selectedItem={this.state.selectionId}
                                selectedCategory={this.state.selectedCategoryId}
                                category={0}
                                handler={this.onScrollableListItemClicked.bind(this)}
                            />
                            <button onClick={this.changeShowState} className="pure-button pure-button-primary">Add new student</button>
                            <Modal close={this.changeShowState} show={this.state.showState}>
                                <StudentManager />
                            </Modal>
                            <button className="pure-button pure-button-disabled">Remove selected</button> 
                        </div>
                        <div className="pure-u-1-3"></div>
                    </div>
                    <div className="pure-g">
                    <div className="pure-u-1-3">
                            <div className="padded-box">
                                <MdModal show={this.state.showState} close={this.changeShowState}>
                                    <StudentManager />
                                </MdModal>
                                <ScrollableListMenu 
                                    menuHeader="List of students in class" 
                                    menuItems={this.state.categories[0]}
                                    selectedItem={this.state.selectionId}
                                    selectedCategory={this.state.selectedCategoryId}
                                    category={0}
                                    handler={this.onScrollableListItemClicked.bind(this)}
                                />
                                <button onClick={this.changeShowState} className="pure-button pure-button-primary">Add new student</button>
                                <button className="pure-button pure-button-disabled">Remove selected</button> 
                            </div>
                        </div>
                        <div className="pure-u-1-3">
                            <div className="padded-box">
                                <ScrollableListMenu 
                                    menuHeader="Previous exams" 
                                    menuItems={this.state.categories[1]}
                                    selectedItem={this.state.selectionId}
                                    selectedCategory={this.state.selectedCategoryId}
                                    category={1}
                                    handler={this.onScrollableListItemClicked.bind(this)}
                                />
                                <button className="pure-button pure-button-disabled">View results</button>
                            </div>
                        </div>
                        <div className="pure-u-1-3">
                            <div className="padded-box">
                                <ScrollableListMenu 
                                    menuHeader="Upcoming exams" 
                                    menuItems={this.state.categories[2]}
                                    selectedItem={this.state.selectionId}
                                    selectedCategory={this.state.selectedCategoryId}
                                    category={2}
                                    handler={this.onScrollableListItemClicked.bind(this)
                                }/>
                                <button className="pure-button pure-button-primary">Add exam from list</button>
                                <button className="pure-button pure-button-disabled">Remove selected</button>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default TeacherDashboardCourseView