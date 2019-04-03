import React, {Component} from "react"
import ScrollableListMenu from "../common/ScrollableListMenu"
import WideListButtonView from "../common/WideListButtonView"
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
            test: [{id: 1, title: "test"}],
            showState: false
        }

        this.onScrollableListItemClicked = this.onScrollableListItemClicked.bind(this)
        this.changeShowState = this.changeShowState.bind(this)
        this.fetchExamWithId = this.fetchExamWithId.bind(this)
    }

    componentDidMount() {
        this.fetchExamWithId(10)
    }

    fetchExamWithId(id) {
        var urlAddress = "http://examapp.crenxu.com:22501/main/exam/" + id
        fetch(urlAddress, {
            method: 'GET',
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
            teacherExamPoolData[id - 9] = data
            this.setState({
                test: teacherExamPoolData
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
    }

    changeShowState=()=>{
        this.setState(prevState=>({
                showState: !prevState.showState
        }));
        console.log("showstate",this.state.showState)
    }

    componentDidMount(){
        fetch('https://cors-anywhere.herokuapp.com/http://examapp.crenxu.com:22501/main/exam/1', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZWFjaGVyIiwiQVVUSCI6W3siYXV0aG9yaXR5IjoiUk9MRV9URUFDSEVSIn1dLCJpYXQiOjE1NTM2Nzk2MjcsImV4cCI6MTU1Mzc2NjAyN30.YoXboSqq9CnPmU7HNyBmHXQFnZl5N5Nl6g1GclmJefc0ELR3oDpvdnmhfMtUJUWURa3YOzV31xdtJccVlzV6Yg',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
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
                        <MdModal close={this.changeShowState} show={this.state.showState}>
                            <StudentManager />
                        </MdModal>
                            <ScrollableListMenu
                                menuHeader="My courses"
                                menuItems={this.state.categories[0]}
                                selectedItem={this.state.selectionId}
                                selectedCategory={this.state.selectedCategoryId}
                                category = {0}
                                handler = {this.onScrollableListItemClicked.bind(this)}/>
                                <button onClick={this.changeShowState} className="pure-button pure-button-primary">Create new course</button>
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
                                selectedItem={this.state.selectionId}
                                selectedCategory={this.state.selectedCategoryId}
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
