import React, {Component} from "react"
import ScrollableListMenu from "../common/ScrollableListMenu"

import MdModal from "../common/modals/MdModal"
import StudentManager from "../../components/common/StudentManager"
import { BrowserRouter as Router, Route, Link} from "react-router-dom"
import "./styles/DashboardStyle.css"
import CreateNewCourseDialog from "./dialogs/CreateNewCourseDialog"
import teacherExamPoolData from "./teacherExamPoolData"
import Login from '../login/Login';

class TeacherDashboard extends Component {
    constructor() {
        super()
        this.state = {
            categories:[
                [
                    { id: 1, name: "Basics of Java" },
                    { id: 2, name: "Basic beginner course" },
                    { id: 3, name: "Object oriented analysis" },
                    { id: 4, name: "Advanced maths" },
                    { id: 5, name: "Best course ever" },
                    { id: 6, name: "Java for experts" }
                ],
                [
                    { id: 1, name: "Programming test", linkedCourse: "Basics of Java" },
                    { id: 2, name: "Beginner exam", linkedCourse: "Basic beginner course" },
                    { id: 3, name: "Analysis pt. 1", linkedCourse: "Object oriented analysis" },
                    { id: 4, name: "Vector calculation", linkedCourse: "Advanced maths" },
                    { id: 5, name: "Best exam ever", linkedCourse: "Best course ever" },
                    { id: 6, name: "Live coding exam", linkedCourse: "Java for experts" }
                ],
                [
                    { id: 1, name: "Professional English test",
                      description: "The Professional English test consists of 30 questions. There’s no time limit, so take your time. You will need headphones or speakers for the listening section. You will get your results as soon as you’ve finished the test.",
                      date: "5.2.2019"},
                    { id: 2,description: "The Unprofessional English test consists of 30 questions. There’s no time limit, so take your time. You will need headphones or speakers for the listening section. You will get your results as soon as you’ve finished the test.", name: "Unprofessional English exam", date: "14.3.2019" },
                    { id: 3,description: "The Professional Swedish test consists of 30 questions. There’s no time limit, so take your time. You will need headphones or speakers for the listening section. You will get your results as soon as you’ve finished the test.", name: "Professional Swedish test", date: "14.4.2019" },
                    { id: 4,description: "The Engineering mathematics test consists of 30 questions. There’s no time limit, so take your time. You will need headphones or speakers for the listening section. You will get your results as soon as you’ve finished the test.", name: "Engineering mathematics test", date: "15.3.2019" }
                ]
            ],
            selectedCategoryId: 0,
            selectionId: 0,
            exams: [{id: 1, title: "Loading..."}],
            showState: false
        }

        this.onScrollableListItemClicked = this.onScrollableListItemClicked.bind(this)
        this.changeShowState = this.changeShowState.bind(this)
        this.fetchExamWithId = this.fetchExamWithId.bind(this)
        this.handleRemoveClick = this.handleRemoveClick.bind(this)
    }

    componentDidMount() {
        this.fetchExamWithId(1)
    }

    addExamToClass(){
        var urlAddress = "http://145.93.168.176:22501/main/classroom/ICT2017/exam"
        fetch(urlAddress,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: sessionStorage.getItem('jwtToken'),
                'Content-type': 'application/json'
            },
            body: JSON.stringify(teacherExamPoolData[1])
        })
        .then(function(response) {
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(data=>{
            console.log("Received classes",data)
            })
    }


    fetchClassesByTeacher(){
        var urlAddress = "http://145.93.168.176:22501/main/classroom/teacher"
        fetch(urlAddress,{
            method: 'GET',                                                 // for fetching data
            headers: {
                Accept: 'application/json',
                Authorization: sessionStorage.getItem('jwtToken'),
                'Content-type': 'application/json'
            }
        })
        .then(function(response) {
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(data=>{
            console.log("Received classes",data)
            })
    }

    fetchExamWithId(id) {
        var urlAddress = "http://examapp.crenxu.com:22501/main/exam/" + id // This whole mess of a function
        fetch(urlAddress, {                                                // should be replaced when we get a better endpoint
            method: 'GET',                                                 // for fetching data
            headers: {
                Accept: 'application/json',
                Authorization: sessionStorage.getItem('jwtToken'),
                'Content-type': 'application/json'
            }
        })
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(data => {
            teacherExamPoolData[id] = data.exam
            this.setState({
                exams: teacherExamPoolData
            })
            console.log("PoolData is: ", teacherExamPoolData)
            console.log("Data is: ", this.state.test)
            this.fetchExamWithId(id + 1)
        })
        .catch(function(error) {
            console.log(error);
        })
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
        if(this.state.selectedCategoryId === 2) {
            sessionStorage.setItem("examToEdit", id)
        }      
    }

    changeShowState=()=>{
        this.setState(prevState=>({
                showState: !prevState.showState
        }));
        console.log("showstate",this.state.showState)
    }

    handleRemoveClick() {
        var idToRemove = this.state.selectionId + 1
        var urlAddress = "http://examapp.crenxu.com:22501/main/exam/" + idToRemove
        fetch(urlAddress, {                                                
            method: 'DELETE',                                                 
            headers: {
                Accept: 'application/json',
                Authorization: sessionStorage.getItem('jwtToken'),
                'Content-type': 'application/json'
            }
        })
        .then(function(response) {
            if (response.ok) {
                delete teacherExamPoolData[idToRemove]
                /*this.setState({
                    exams: teacherExamPoolData    
                })*/
            }
            console.log(teacherExamPoolData)
        })
    }

    render() {
        console.log(this.state.categories[this.state.selectedCategoryId][this.state.selectionId])
        console.log(sessionStorage.getItem('jwtToken'));
        return(
            <div>
                <div className="pure-g">

                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu
                                menuHeader="My classes"
                                menuItems={this.state.categories[0]}
                                selectedItem={this.state.selectionId}
                                selectedCategory={this.state.selectedCategoryId}
                                selectedLink={"/course_view"}
                                passedId={this.state.selectionId}
                                category = {0}
                                handler = {this.onScrollableListItemClicked.bind(this)}/>
                                <button onClick={this.changeShowState} className="pure-button pure-button-primary">Create new class</button>
                                <MdModal close={this.changeShowState} show={this.state.showState}>
                                    <CreateNewCourseDialog close={this.changeShowState}/>
                                </MdModal>
                                <button className="pure-button pure-button-disabled">Delete selected</button>
                        </div>
                    </div>
                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu
                                menuHeader="Ready for evaluation"
                                menuItems={this.state.categories[1]}
                                selectedItem={this.state.selectionId}
                                selectedCategory={this.state.selectedCategoryId}
                                selectedLink={"/exam_grading"}
                                passedId={this.state.selectionId}
                                category = {1}
                                handler = {this.onScrollableListItemClicked.bind(this)}/>

                                <Link to="/exam_grading"><button className="pure-button pure-button-primary">Evaluate selected</button></Link>
                        </div>  

                    </div>
                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu
                                menuHeader="My own exams"
                                menuItems={this.state.exams}
                                selectedItem={this.state.selectionId}
                                selectedCategory={this.state.selectedCategoryId}
                                selectedLink={"/edit_exam"}
                                passedId={this.state.selectionId + 1}
                                category = {2}
                                handler = {this.onScrollableListItemClicked.bind(this)}/>
                                <Link to="/create_exam">
                                    <button className="pure-button pure-button-primary">
                                        Create new exam
                                    </button>
                                </Link>
                                {this.state.selectedCategoryId === 2 ?
                                <button className="pure-button button-error" onClick={this.handleRemoveClick}>
                                    Delete selected
                                </button> :
                                <button className="pure-button pure-button-disabled">
                                    Delete selected
                                </button>}
                        </div>
                    </div>

                </div>
                
            </div>
        )
    }
}

export default TeacherDashboard
