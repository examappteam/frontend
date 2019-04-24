import React, {Component} from "react"

import "../styles/DashboardStyle.css"
import "../../common/modals/styles/GeneralModalStyle.css"

class CreateNewCourseDialog extends Component {
    constructor() {
        super()
        this.state = {
            courseName: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target

        this.setState({
            [name]: value
        }) 
    }

    handleClick() {
        fetch('http://examapp.crenxu.com:22501/main/classroom/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken'),
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                classRoomName: this.state.courseName
            }),
        });
    }

    render(props) {
        return(
            <div className="padded-box">
                <form className="pure-form pure-form-aligned">
                    <label>Name of the class: </label>
                    <input
                        type="text" 
                        value={this.state.courseName} 
                        name="courseName" 
                        placeholder="eg. Basic Electronics" 
                        onChange={this.handleChange}
                    />            
                </form>
                <button onClick={this.handleClick} className="pure-button btn-continue">Create class</button>
            </div>        
        )
    }
}

export default CreateNewCourseDialog