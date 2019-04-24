import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import {Component} from "react"
import Header from "./components/Header"
import Login from "./components/login/Login"
import Settings from "./components/settings/Settings"
import StudentSettings from "./components/settings/StudentSettings"
import StudentDashboard from "./components/dashboard/StudentDashboard"
import TeacherDashboard from "./components/dashboard/TeacherDashboard"
import TeacherDashboardCourseView from "./components/dashboard/TeacherDashboardCourseView"
import CreateExamView from "./components/create-exam-view/CreateExamView"
import TwilioTeacherVideo from "./components/teacher-exam-video-page/TwilioTeacherVideo"
import ExamGradingView from "./components/exam-grading-page/ExamGradingView"
import StudentVideo from './components/student-video-page/StudentVideo'
import StudentInformation from "./components/StudentInformationForTeacherView/StudentInformation"
import Footer from "./components/Footer"
import {WithAuth} from "./components/login/WithAuth"
import {TeacherWithAuth} from "./components/login/TeacherWithAuth"
import CreateStudent from "./components/settings/CreateStudent"




class App extends Component  {
  

  render(){

    return (
      <Router>
        
           <div>              
        
           
        <Route exact path="/" component={Login }/>
        <Route path="/login" component={Login}/>
        

          

          <WithAuth path="/studentdashboard"  component={StudentDashboard} />
          <WithAuth path="/student_exam_view" component={StudentVideo} />
          <WithAuth path="/studentsettings" component = {StudentSettings}/>

          <TeacherWithAuth path="/exam_grading" component={ExamGradingView} />
          <TeacherWithAuth path="/teacherdashboard" component={TeacherDashboard} />
          <TeacherWithAuth path="/studentinformation" component={StudentInformation} />
          <TeacherWithAuth path="/course_view" component={TeacherDashboardCourseView} />
          <TeacherWithAuth path="/create_exam" component={CreateExamView} />
          <TeacherWithAuth path="/exam_view" component={TwilioTeacherVideo} />
          <TeacherWithAuth path="/createstudent" component={CreateStudent}/>
          <TeacherWithAuth path="/settings" component={Settings} />
          

          
          </div>
          
          </Router>
      
      
    )
}
}
export default App;
