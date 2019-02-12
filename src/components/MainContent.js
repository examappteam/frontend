import React from "react"
import "../style.css"
import TwilioConnection from "./teacher-exam-video-page/TwilioConnection"
import StudentDashboard from "./student-dashboard/StudentDashboard";

function MainContent() {
    return (
        <div>
            <StudentDashboard />
        </div>
    )
}

export default MainContent