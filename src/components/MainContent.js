import React from "react"
import "../style.css"
import TwilioConnection from "./teacher-exam-video-page/TwilioConnection"
import TeacherDashboard from "./dashboard/TeacherDashboard"
import CreateExamView from "./create-exam-view/CreateExamView"

function MainContent() {
    return (
        <div>
            <CreateExamView />
        </div>
    )
}

export default MainContent