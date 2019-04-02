import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";


import Header from "./components/Header"
import Login from "./components/login/Login"
import Settings from "./components/settings/Settings"
import StudentDashboard from "./components/dashboard/StudentDashboard"
import TeacherDashboard from "./components/dashboard/TeacherDashboard"
import TeacherDashboardCourseView from "./components/dashboard/TeacherDashboardCourseView"
import CreateExamView from "./components/create-exam-view/CreateExamView"
import TwilioTeacherVideo from "./components/teacher-exam-video-page/TwilioTeacherVideo"
import StudentVideo from './components/student-video-page/StudentVideo'
import StudentInformation from "./components/StudentInformationForTeacherView/StudentInformation"
import Footer from "./components/Footer"

function App()  {
    return (
      <Router>
                            
        <div>
        <Route path exact="/login" component={Login}/>
          <Header />
          
          <Route path="/studentdashboard" component={StudentDashboard} />
          <Route path="/teacherdashboard" component={TeacherDashboard} />
          <Route path="/settings" component={Settings} />
          <Route path="/studentinformation" component={StudentInformation} />
          <Route path="/course_view" component={TeacherDashboardCourseView} />
          <Route path="/create_exam" component={CreateExamView} />
          <Route path="/exam_view" component={TwilioTeacherVideo} />
          <Route path="/student_exam_view" component={StudentVideo} />
          <Footer />
          </div>
          
      
      </Router>
    )
}

export default App;
