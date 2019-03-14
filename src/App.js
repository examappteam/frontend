import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import Header from "./components/Header"
import StudentDashboard from "./components/dashboard/StudentDashboard"
import TeacherDashboard from "./components/dashboard/TeacherDashboard"
import CreateExamView from "./components/create-exam-view/CreateExamView"
import TwilioTeacherVideo from "./components/teacher-exam-video-page/TwilioTeacherVideo"
import Footer from "./components/Footer"

function App()  {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/dashboard" component={StudentDashboard} />
          <Route path="/create_exam" component={CreateExamView} />
          <Route path="/exam_view" component={TwilioTeacherVideo} />
          <Footer />
      </div>
      </Router>     
    )
}

export default App;
