import React, {Component} from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles/styles.css";

function AnswerForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <legend>Student's answer {props.answer.answerId}</legend>
                
                {/** ANSWER BOX, READ-ONLY **/}
                <div className="pure-u-1-1">
                    <div className="pure-u-4-5">
                        <p>
                            <textarea 
                                id="studentAnswer" 
                                type="text" 
                                value={props.answer.answerExample}
                                readOnly 
                                />
                        </p>
                    </div>

                {/** GIVING POINTS **/}
                    <div id="pointsDiv" className="pure-u-1-12">
                        <p>
                            <label for="points"> Points: </label><br/>
                            <select id="points" value={props.answer.value} onChange={props.handleChange}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </p>
                    </div>
                </div>

            <div className="pure-u-4-5">    
            {/* First two buttons */}
                <div className="pure-button-group" role="group" aria-label="..."> 
                    <button 
                        id="review" 
                        type="submit" 
                        className="pure-button">
                            <i className="fas fa-angle-left"></i> Previous question
                    </button>
                    <button 
                        id="review" 
                        type="submit" 
                        className="pure-button">
                            Next question <i className="fas fa-angle-right"></i>
                    </button>
                </div>

            {/* Second two buttons */}
                <div className="pure-button-group" role="group" aria-label="...">
                    <Link to="../dashboard">
                        <button 
                            id="review" 
                            type="submit" 
                            className="pure-button button-secondary" >
                                Save current and exit
                        </button>
                    </Link>
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
    </form>
    )
}

export default AnswerForm