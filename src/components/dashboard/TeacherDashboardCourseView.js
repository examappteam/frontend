import React, {Component} from "react"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import ScrollableListMenu from "../common/ScrollableListMenu"
import MdModal from "../common/modals/MdModal"
import StudentManager from "../common/StudentManager"
import AddExamFromListDialog from "./dialogs/AddExamFromListDialog"
import LgModal from "../common/modals/LgModal"

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
            showAddStudent: false,
            showAddExam: false
        }
        this.onScrollableListItemClicked = this.onScrollableListItemClicked.bind(this)
        this.changeShowAddExam = this.changeShowAddExam.bind(this)
        this.changeShowAddStudent = this.changeShowAddStudent.bind(this)

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

    changeShowAddStudent=()=>{
        this.setState(prevState=>({
                showAddStudent: !prevState.showAddStudent
            
        }));
    }

    
    changeShowAddExam=()=>{
        this.setState(prevState=>({
                showAddExam: !prevState.showAddExam
            
        }));
    }

    componentDidMount() {

    }

    render() {
        return(
            <div>
                <div className="pure-g class-head">
                    <div className="pure-u-1-3"></div>
                    <div className="pure-u-1-3"></div>
                </div>
                <div className="pure-g">
                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu 
                                menuHeader="Students in course" 
                                menuItems={this.state.categories[0]}
                                selectedItem={this.state.selectionId}
                                selectedCategory={this.state.selectedCategoryId}
                                selectedLink={"/course_view"}
                                category={0}
                                handler={this.onScrollableListItemClicked.bind(this)}
                            />
                            <button onClick={this.changeShowAddStudent} className="pure-button pure-button-primary">Add new student</button>
                            <MdModal close={this.changeShowAddStudent} show={this.state.showAddStudent}>
                                <StudentManager />
                            </MdModal>
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
                                selectedLink={"/course_view"}
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
                                selectedLink={"/course_view"}
                                category={2}
                                handler={this.onScrollableListItemClicked.bind(this)
                            }/>
                            <button onClick={this.changeShowAddExam} className="pure-button pure-button-primary">Add exam from list</button>
                            <LgModal close={this.changeShowAddExam} show={this.state.showAddExam}>
                                <AddExamFromListDialog close={this.changeShowAddExam}/>
                            </LgModal>
                            <button className="pure-button pure-button-disabled">Remove selected</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeacherDashboardCourseView