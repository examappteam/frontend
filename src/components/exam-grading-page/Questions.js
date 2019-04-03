import React, {Component} from "react"
import "./styles/styles.css";


function Questions(props) {
    return (
        <div className="pure-u-4-5">
            <legend>Question {props.question.questionId}</legend>
                <p>
                    <textarea 
                        name="question"
                        id="question-name" 
                        key={props.question.questionId} 
                        type="text" 
                        value={props.question.questionExample1} 
                        readOnly
                        />
                </p>
        </div>
    )
}

export default Questions