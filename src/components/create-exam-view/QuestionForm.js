import React, {Component} from "react"

import FormTextInput from "./FormTextInput"
import FormSelectInput from "./FormSelectInput"
import questionsData from "./questionsData"

import "./styles/CreateExamViewStyle.css"

class QuestionForm extends Component {
    constructor() {
        super()
        this.state = {
            id: 1, 
            questionName: "", 
            questionAnswer: "", 
            questionWeight: 1 
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({
            id: questionsData.length
        }) 
    }

    componentDidUpdate() {
        var dataToPush = {
            id: this.state.id, 
            questionName: this.state.questionName, 
            questionAnswer: this.state.questionAnswer, 
            questionWeight: this.state.questionWeight
        }
        questionsData[this.state.id] = dataToPush
    }
    
    handleChange(event) {
        const {name, value} = event.target

        this.setState({
            [name]: value
        }) 
    }

    render(props) {
        return(
            <form className="pure-form pure-form-aligned">
                <label>Question no. {this.state.id + 1}:</label>
                <div className="form-component">
                    <FormTextInput                                 
                        nameForInput="questionName"
                        stateForInput={this.state.questionName}
                        handlerForInput={this.handleChange}
                        placeholderForInput="Question"
                    />
                </div>
                <div className="form-component">
                    <FormTextInput
                        nameForInput="questionAnswer"
                        stateForInput={this.state.questionAnswer}
                        handlerForInput={this.handleChange}
                        placeholderForInput="Answer"
                    />
                </div>
                <div className="form-component">
                    <FormSelectInput
                        nameForInput="questionWeight"
                        stateForInput={this.state.questionWeight}
                        handlerForInput={this.handleChange}
                    />
                </div>                          
            </form>        
        )
    }
}

export default QuestionForm