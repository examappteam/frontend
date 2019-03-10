import React from "react"

function FormSelectInput(props) {
    return(
        <div>
            <label>Question weight: </label>
                <select 
                    name={props.nameForInput}
                    value={props.stateForInput} 
                    onChange={props.handlerForInput} 
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
        </div>
    )
}

export default FormSelectInput