import React, {Component} from "react"

import "../styles/DashboardStyle.css"
import "../../common/modals/styles/GeneralModalStyle.css"

class CreateNewClassDialog extends Component {
    constructor() {
        super()
        this.state = {
            className: ""
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
                    <label>Name of the class: </label>
                    <input
                        type="text" 
                        value={this.state.className} 
                        name="className" 
                        placeholder="eg. TVT17SPO" 
                        onChange={this.handleChange}
                    />            
                </form>
                <button onClick={this.handleClick} className="pure-button btn-continue">Create class</button>
            </div>        
        )
    }
}

export default CreateNewClassDialog