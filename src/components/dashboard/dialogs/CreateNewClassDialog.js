import React, {Component} from "react"

import "../styles/DashboardStyle.css"
import "../../common/styles/Modal.css"

class CreateNewClassDialog extends Component {
    constructor() {
        super()
        this.state = {
            className: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target

        this.setState({
            [name]: value
        }) 
    }

    render() {
        return(
            <div className="padded-box">
                <form className="pure-form pure-form-aligned">
                    <label>Name of the class: </label>
                    <input
                        type="text" 
                        value={this.state.className} 
                        name="className" 
                        placeholder="eg. TVT17SPO" 
                        onChange={this.handleChange}
                    />            
                </form>
                <button className="pure-button btn-continue">Create class</button>
            </div>        
        )
    }
}

export default CreateNewClassDialog