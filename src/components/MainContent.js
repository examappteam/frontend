import React from "react"
import "../style.css"
import TwilioConnection from "./teacher-exam-video-page/TwilioConnection"
import TeacherDashboard from "./dashboard/TeacherDashboard"

function MainContent() {
    return (
        <div>
            <TeacherDashboard />
        </div>
    )
}

export default MainContent