import React from 'react'
import "./styles/DashboardStyle.css"
import ScrollableListMenu from '../common/ScrollableListMenu';
import WideListView from '../common/WideListView';

const classes = {
    ownClasses: [ 
        { id: 1, name: "TVT17SPO" },
        { id: 2, name: "TVT17SPL" },
        { id: 3, name: "EX16SPI" },
        { id: 4, name: "EX16SPO" },
        { id: 5, name: "TVT18SPO" },
        { id: 6, name: "TVT18SPL" }
    ],
}

const prevExams = {
        title: "Previous exams",
        exams:[{
                id: 1,
                name: "Basics of Python",
                description: "PCAP – Certified Associate in Python Programming certification is a professional credential that measures your ability to accomplish coding tasks related to the basics of programming in the Python language and the fundamental notions and techniques used in object-oriented programming.",
                date: "5.2.2019"
        },
        {
                id: 2,
                name: "React",
                date: "4.2.2019"
        },
        {
                id: 3,
                name: "Basic web development",
                date: "3.2.2019"
        }

]}

const upcomingExams = {
        title: "Upcoming exams",
        exams:[{
                id: 1,
                name: "Embedded systems",
                date: "20.3.2019"
        },
        {
                id: 2,
                name: "Software engineering physics",
                date: "25.3.2019"
        },
        {
                id: 3,
                name: "Differential algebra",
                date: "26.3.2019"
        },
        {
                id: 4,
                name: "Telecommunication basics",
                date: "27.3.2019"
        },
        {
                id: 5,
                name: "Engineering english",
                date: "28.3.2019"
        }
]}




function StudentDashboard(){

        const upcExams = upcomingExams.exams.map(exam => exam)
        const previousExams = prevExams.exams.map(exam => exam)
        const studentClasses = classes.ownClasses.map(studentClass => studentClass)
        console.log(studentClasses)

        return(
            <div>
                <div className="pure-g">
                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu menuItems = {studentClasses} menuHeader = "Classes"/> 
                        </div>
                    </div>
                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu menuItems = {upcExams} menuHeader = "Upcoming exams"/>
                        </div> 
                    </div>
                    <div className="pure-u-1-5">
                        <div className="padded-box">
                            <ScrollableListMenu menuItems = {previousExams} menuHeader = "Previous exams"/>
                        </div>
                    </div>
                </div>
                <div className="padded-box">
                    <WideListView title={prevExams.exams[0].name} exam={prevExams.exams[0]}/>
                </div>
            </div>
            
        )

}

export default StudentDashboard