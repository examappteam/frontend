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
            description: "", 
            answer: "", 
            weightPercentage: 1 
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        console.log("QUESTIONS ", questionsData)
        this.setState({
            id: questionsData.length,
            description: questionsData[questionsData.length - 1][0].description,
            answer: questionsData[questionsData.length - 1].answer,
            weightPercentage: questionsData[questionsData.length - 1].weightPercentage
        }) 
    }

    componentDidUpdate() {
        var dataToPush = {
            id: this.state.id, 
            description: this.state.description, 
            answer: this.state.answer, 
            weightPercentage: this.state.weightPercentage
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
                        nameForInput="description"
                        stateForInput={this.state.description}
                        handlerForInput={this.handleChange}
                        placeholderForInput="Question"
                    />
                </div>
                <div className="form-component">
                    <FormTextInput
                        nameForInput="answer"
                        stateForInput={this.state.answer}
                        handlerForInput={this.handleChange}
                        placeholderForInput="Answer"
                    />
                </div>
                <div className="form-component">
                    <FormSelectInput
                        nameForInput="weightPercentage"
                        stateForInput={this.state.weightPercentage}
                        handlerForInput={this.handleChange}
                    />
                </div>                          
            </form>        
        )
    }
}

export default QuestionForm