import React, {Component} from "react";

import "../../style.css";
import "./styles/styles.css";
import NavBars from "./NavBars"
import Questions from "./Questions"
import AnswerForm from "./AnswerForm"

class ExamGradingView extends Component {
    constructor() {
        super()
        this.state = {
            questionExample1: "How does Java enable high performance?",
            questionId: 1,
            answerExample: "Java uses What Was It compiler to enable high performance. WWI is used to convert the instructions into bytecodes.",
            answerId: 1,
            value: "You must give points to the current answer in order to continue."
            }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)

    }

    handleChange(event) {
        this.setState(
            {value: event.target.value}
            );
    }

    handleSubmit(event) {
        this.state.value == 0 ? alert("Are you sure you want to give 0 points?") : alert(this.state.value);        event.preventDefault();
    }

    handleClick() {
        this.setState({
            answerExample: "Java uses What Was It compiler to enable high performance. WWI is used to convert the instructions into bytecodes.",
            answerId: 1
        })
    }

    render() {
        const examName = "Programming test";
        const courseName = "Basics of Java";

        //const answerExample = "Java uses What Was It compiler to enable high performance. WWI is used to convert the instructions into bytecodes.";
        
        return (
            <div className="pure-g padded-box">
                <NavBars 
                    data={this.state}
                    handleClick={this.handleClick}
                    />

                <div className="pure-u-2-3">
                    <h1>{examName} - {courseName}</h1>
                    <form className="pure-form">
                        <fieldset>
                            <Questions
                                question={this.state}
                                />
                            <AnswerForm
                                answer={this.state}
                                handleSubmit={this.handleSubmit}
                                handleChange={this.handleChange}
                                handleClick={this.handleClick}
                                />
                        </fieldset>
                    </form>    
                </div>
            </div>
        )
    }
}

export default ExamGradingView