import React from 'react'
import ListView from '../common/ListView';
import '../common/listStyle.css';
import WideListView from '../common/WideListView';

const prevExams = {
        title: "Previous exams",
        exams:[{
                id: 1,
                name: "Basics of Java",
                description: "This Java Online Test simulates a real online certification exams. You will be presented Multiple Choice Questions (MCQs) based on Core Java Concepts, where you will be given four options. You will select the best suitable answer for the question and then proceed to the next question without wasting given time. You will get your online test score after finishing the complete test.",
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
        console.log(upcExams)

        return(
                <div>
                        <div className="pure-g">
                                <div className="pure-u-1-5"></div>
                                <div className="pure-u-1-5">
                                        <ListView title={prevExams.title} exam = {previousExams}/>
                                </div>
                                <div className="pure-u-1-5"></div>
                                <div className="pure-u-1-5">
                                        <ListView title={upcomingExams.title} exam = {upcExams}/>
                                </div>
                                <div className="pure-u-1-5"></div>        
                        </div>
                        <div>
                                <WideListView title={prevExams.exams[0].name} exam={prevExams.exams[0]} />
                        </div>
                </div>
        )

}

export default StudentDashboard