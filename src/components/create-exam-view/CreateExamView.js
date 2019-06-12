import React, {Component} from "react"

import { BrowserRouter as Router, Route, Link} from "react-router-dom"

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

    componentWillUnmount() {
        questionsData.length = 0
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
        fetch('http://localhost:22501/main/exam/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: sessionStorage.getItem('jwtToken'),
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                creatorId: sessionStorage.getItem('email'),
                title: this.state.examTitle,
                questionDTOs: this.state.examQuestions
            }),
        });
    }

    render() {
        var formElements = []

        for (var i = 0; i <= this.state.formsToRender; i++) {
            formElements.push(<QuestionForm id={i}/>)
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
                    <Link to="/teacherdashboard"><button className="pure-button pure-button-primary" onClick={this.handleSaveClick}>Done! - save this exam</button></Link>
                </div>
            </div>
        )
    }
}

export default CreateExamView
