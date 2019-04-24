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
        this.getDescriptionValue = this.getDescriptionValue.bind(this)
        this.getAnswerValue = this.getAnswerValue.bind(this)
        this.getWeightValue = this.getWeightValue.bind(this)
    }

    componentDidMount(props) {
        if(typeof this.props.question != 'undefined') {
            this.setState({
                id: this.props.id,
                weightPercentage: this.props.question.weight
            }) 
        } else {
            this.setState({
                id: this.props.id
            })
        }    
        console.log("QUESTION FROM API: ", this.props)
    }

    componentDidUpdate() {
        var dataToPush = {
            id: this.state.id, 
            description: this.getDescriptionValue(), 
            answer: this.getAnswerValue(), 
            weightPercentage: this.getWeightValue()
        }
        questionsData[this.state.id] = dataToPush
        console.log("DATA TO PUSH: ", questionsData[this.state.id])
    }

    getDescriptionValue(props) {
        if(this.state.description === "") {
            console.log("PROPS: ", this.props)
            return typeof this.props.question != 'undefined' 
                    ? this.props.question.description 
                    : "Question"
        }
        else return this.state.description
    }

    getAnswerValue(props) {
        if(this.state.answer === "") {
            return typeof this.props.question != 'undefined' 
                    ? this.props.question.answer 
                    : "Answer"
        }
        else return this.state.answer
    }

    getWeightValue(props) {
        //console.log("PROPS weight: ", this.props.question.weight)
        if(typeof this.state.weightPercentage == 'undefined') {
            return this.props.question.weight
        }
        else return this.state.weightPercentage
    }
    
    handleChange(event) {
        const {name, value} = event.target
        console.log("VALUE TO CHANGE: ", name, value)
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
                        placeholderForInput={typeof this.props.question != 'undefined' 
                                             ? this.props.question.description 
                                             : "Question"}
                    />
                </div>
                <div className="form-component">
                    <FormTextInput
                        nameForInput="answer"
                        stateForInput={this.state.answer}
                        handlerForInput={this.handleChange}
                        placeholderForInput={typeof this.props.question != 'undefined' 
                                             ? this.props.question.answer 
                                             : "Answer"}
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