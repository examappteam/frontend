import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Question from "./Question";


import "../../style.css";
import "./styles/styles.css";
//import students from "./exampleData"
//import questions from "./exampleData"
import NavBars from "./NavBars"
import Questions from "./Questions"
import AnswerForm from "./AnswerForm"

class ExamGradingView extends Component {
    constructor(id) {
        super()
        this.state = {
            questions:[],
            examid: sessionStorage.getItem("examToEdit"),
            }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleFirstClick = this.handleFirstClick.bind(this)
        this.handleSecondClick = this.handleSecondClick.bind(this)
        this.handleThirdClick = this.handleThirdClick.bind(this)

        fetch('http://145.93.168.176:22501/main/exam/finished/'+this.state.examid, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
              Authorization: sessionStorage.getItem('jwtToken'),
            }
          })
        .then(response => response.json())
        .then(data => {
            data.answeredQuestions.forEach(q => {
                let question = new Question(q.id, q.description, q.answer)
                this.state.questions.push(question)
            });
        })
        // let question1 = new Question(1, "1How does Java enable high performance?", "1Java uses What Was It compiler to enable high performance. WWI is used to convert the instructions into bytecodes.");
        // let question2 = new Question(2, "2How does Java enable high performance?", "2Java uses What Was It compiler to enable high performance. WWI is used to convert the instructions into bytecodes.");
        // let question3 = new Question(3, "3How does Java enable high performance?", "3Java uses What Was It compiler to enable high performance. WWI is used to convert the instructions into bytecodes.");
        // let question4 = new Question(4, "4How does Java enable high performance?", "4Java uses What Was It compiler to enable high performance. WWI is used to convert the instructions into bytecodes.");
        // // this.state.questions = [question1, question2, question3, question4]
    }

    componentDidMount(){

    }

    handleChange(event) {
        this.setState(
            {value: event.target.value}
            );
    }

    handleSubmit(event) {
        this.state.value == 0 ? alert("Are you sure you want to give 0 points?") : alert(this.state.value);        event.preventDefault();
    }

    handleFirstClick() {
        this.setState({
            answerExample: "Java uses What Was It compiler to enable high performance. WWI is used to convert the instructions into bytecodes.",
            answerId: 1
        })
    }
    handleSecondClick() {
        this.setState({
            answerExample: "Java uses Wonderful Time compiler to enable high performance. WT is used to convert the instructions into bytecodes.",
            answerId: 2
        })
    }
    handleThirdClick() {
        this.setState({
            answerExample: "Java uses Just In Time compiler to enable high performance. JIT is used to convert the instructions into bytecodes.",
            answerId: 3
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
                    handleFirstClick={this.handleFirstClick}
                    handleSecondClick={this.handleSecondClick}
                    handleThirdClick={this.handleThirdClick}
                    />

                <div className="pure-u-2-3">
                    <h1>{examName} - {courseName}</h1>
                    <form className="pure-form">
                        {this.state.questions.map((Question, index) => {
                            return (
                        <fieldset>
                            <Questions
                                question={this.state.questions[index]}
                            />
                            <AnswerForm
                                answer={this.state.questions[index]}
                                />
                        </fieldset>
                            )})
                        }
                        
                    </form>
                    <div className="pure-button-group" role="group" aria-label="...">
                        <Link to="../dashboard">
                            <button 
                                id="review" 
                                type="submit" 
                                className="pure-button button-success pure-button-active" >
                                    <i className="fas fa-check"></i> Finish grading
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExamGradingView