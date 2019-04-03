import React, {Component} from "react"

import QuestionForm from "./QuestionForm"
import questionsData from "./questionsData"

class CreateExamView extends Component {
    constructor() {
        super()
        this.state = {
            formsToRender: 0,
            examTitle: "",
            examQuestions: questionsData
        }
        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleRemoveClick = this.handleRemoveClick.bind(this)
        this.handleSaveClick = this.handleSaveClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target

        this.setState({
            [name]: value
        }) 
    }

    handleAddClick() {
        this.setState(prevState => ({
            formsToRender: prevState.formsToRender + 1
        }))
    }

    handleRemoveClick() {
        if(this.state.formsToRender !== 0) {
            this.setState(prevState => ({
                formsToRender: prevState.formsToRender - 1
            }))
            questionsData.pop()
        }     
    }

    handleSaveClick() {
        /*fetch('http://examapp.crenxu.com:22501/main/exam/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZWFjaGVyIiwiQVVUSCI6W3siYXV0aG9yaXR5IjoiUk9MRV9URUFDSEVSIn1dLCJpYXQiOjE1NTM4NTMyODUsImV4cCI6MTU1MzkzOTY4NX0.9VeObRco0YWx4p6AC0K2PUwoYefwsZ3BdaNJvVjk4wudB5JChXUogJBekYs0QmvBOPsbcovqmkOweSKZt-wZ0w',
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: JSON.stringify({
                creatorId: 1,
                questionDTOs: [
                    {
                        weightPercentage: 1,
                        description: '',
                        answer: ''
                    }                    
                ]
            }),
        });*/
        const axios = require('axios');
        const examInfo = {
            creatorId: 1,
            questionDTOs: [
                {
                    weightPercentage: 1,
                    description: '',
                    answer: ''
                }                    
            ]
        }
        const authToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZWFjaGVyIiwiQVVUSCI6W3siYXV0aG9yaXR5IjoiUk9MRV9URUFDSEVSIn1dLCJpYXQiOjE1NTM4NTk4ODAsImV4cCI6MTU1Mzk0NjI4MH0._jS9doef5Ha5fGxzDCnYEu5cvYyaic1sM0yKpY_FnhYaNWtHmj3exC4_Uk5vNcQZW3zYMHNfZKIh5ln0NGz5EA"
        const url = "http://examapp.crenxu.com:22501/main/exam/"
        const headers = {
            Accept: 'application/json',
            Authorization: authToken,
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
        axios.post(url, examInfo, headers)
            .then(result => console.log(result))
            .catch(error => console.log(error))
    }

    render() {
        var formElements = []

        for (var i = 0; i <= this.state.formsToRender; i++) { 
            formElements.push(<QuestionForm/>)
        }

        return (
            <div className="pure-g padded-box">
                <div className="pure-u-1-3"></div>
                <div className="pure-u-1-3">
                    <form className="pure-form pure-form-aligned">
                        <div style={{marginBottom: 1 + 'em'}}>
                            <label>Title of exam: </label>
                            <input
                                type="text" 
                                value={this.state.examTitle} 
                                name="examTitle" 
                                placeholder="Your exam title here" 
                                onChange={this.handleChange}
                            />
                        </div>                                     
                    </form>
                    {formElements}    
                    
                    <button className="pure-button button-secondary" onClick={this.handleAddClick}>Add new question</button>
                    <button className="pure-button button-error" onClick={this.handleRemoveClick}>Remove question</button>
                    <button className="pure-button pure-button-primary" onClick={this.handleSaveClick}>Done! - save this exam</button>    
                </div>
            </div>
        )
    }
}

export default CreateExamView