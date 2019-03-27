import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";


import Header from "./components/Header"
import Login from "./components/login/Login"
import Settings from "./components/settings/Settings"
import StudentDashboard from "./components/dashboard/StudentDashboard"
import TeacherDashboard from "./components/dashboard/TeacherDashboard"
import TeacherDashboardClassView from "./components/dashboard/TeacherDashboardClassView"
import CreateExamView from "./components/create-exam-view/CreateExamView"
import TwilioTeacherVideo from "./components/teacher-exam-video-page/TwilioTeacherVideo"
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
          <Route path="/class_view" component={TeacherDashboardClassView} />
          <Route path="/create_exam" component={CreateExamView} />
          <Route path="/exam_view" component={TwilioTeacherVideo} />
          <Footer />
          </div>
          
      
      </Router>
    )
}

export default App;
