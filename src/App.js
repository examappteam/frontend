import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from "./components/Header"
import StudentDashboard from "./components/dashboard/StudentDashboard"
import TeacherDashboard from "./components/dashboard/TeacherDashboard"
import CreateExamView from "./components/create-exam-view/CreateExamView"
import Footer from "./components/Footer"

function App()  {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/dashboard" component={TeacherDashboard} />
          <Route path="/create_exam" component={CreateExamView} />
          <Footer />
      </div>
      </Router>     
    )
}

export default App;
