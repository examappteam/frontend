import React, {Component} from "react"

import ScrollableListMenu from "../common/ScrollableListMenu"
import WideListButtonView from "../common/WideListButtonView"

import "./styles/DashboardStyle.css"

class TeacherDashboard extends Component {
    constructor() {
        super()
        this.state = {
            ownClasses: [ 
                { id: 1, name: "TVT17SPO" },
                { id: 2, name: "TVT17SPL" },
                { id: 3, name: "EX16SPI" },
                { id: 4, name: "EX16SPO" },
                { id: 5, name: "TVT18SPO" },
                { id: 6, name: "TVT18SPL" }
            ],

            toBeEvaluated: [
                { id: 1, name: "Basics of Java", linkedClass: "TVT17SPO" },
                { id: 2, name: "Basic beginner course", linkedClass: "TVT18SPO" },
                { id: 3, name: "Object oriented analysis", linkedClass: "TVT18SPL" },
                { id: 3, name: "Advanced maths", linkedClass: "TVT16SPO" },
                { id: 3, name: "Best course ever", linkedClass: "TVT15SPO" },
                { id: 3, name: "International exam", linkedClass: "TVT14SPL" }
            ],

            ownExams: [
                { id: 1, name: "Professional English",
                description: "The English test consists of 30 questions. There’s no time limit, so take your time. You will need headphones or speakers for the listening section. You will get your results as soon as you’ve finished the test.",
                date: "5.2.2019"},

                { id: 2, name: "Unprofessional English" },
                { id: 2, name: "Professional Swedish" },
                { id: 2, name: "Exam template" }
            ]
        }
    }

    render() {
        return(
            <div>
                <div className="pure-g">
                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu 
                                menuHeader="My classes" 
                                menuItems={this.state.ownClasses}/>
                                <button className="pure-button pure-button-primary">Add new class</button>
                                <button className="pure-button pure-button-disabled">Delete selected</button> 
                        </div>                  
                    </div>
                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu 
                                menuHeader="Ready for evaluation" 
                                menuItems={this.state.toBeEvaluated}/>
                                <button className="pure-button pure-button-disabled">Evaluate selected</button>
                        </div>  
                    </div>
                    <div className="pure-u-1-3">
                        <div className="padded-box">
                            <ScrollableListMenu 
                                menuHeader="My own exams" 
                                menuItems={this.state.ownExams}/>
                                <button className="pure-button pure-button-primary">Create new exam</button>
                                <button className="pure-button pure-button-disabled">Delete selected</button>                         
                        </div>  
                    </div>
                    
                </div>
                <div className="pure-g">
                <div className="pure-u-3-24"></div>
                <div className="pure-u-18-24">
                    <div className="padded-box">
                        <WideListButtonView title={this.state.ownExams[0].name} exam={this.state.ownExams[0]}/>
                    </div>
                </div>
                <div className="pure-u-3-24"></div>
                </div>
            </div>
        )
    }
}

export default TeacherDashboard