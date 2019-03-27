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

    handleClick(props) {
        this.props.close()
    }

    render(props) {
        return(
            <div className="padded-box">
                <form className="pure-form pure-form-aligned">
                    <label>Name of the course: </label>
                    <input
                        type="text" 
                        value={this.state.courseName} 
                        name="courseName" 
                        placeholder="eg. Basic Electronics" 
                        onChange={this.handleChange}
                    />            
                </form>
                <button onClick={this.handleClick} className="pure-button btn-continue">Create course</button>
            </div>        
        )
    }
}

export default CreateNewCourseDialog