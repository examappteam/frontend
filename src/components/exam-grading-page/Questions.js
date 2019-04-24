import React, {Component} from "react"
import "./styles/styles.css";


function Questions(props) {
    return (
        <div className="pure-u-4-5">
            <legend>Question {props.question.id}</legend>
                <p>
                    <textarea 
                        name="question"
                        id="question-name" 
                        key={props.question.id} 
                        type="text" 
                        value={props.question.question} 
                        readOnly
                        />
                </p>
        </div>
    )
}

export default Questions