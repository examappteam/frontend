import React from "react"

function FormTextInput(props) {
    return(
        <div>
            <textarea 
                name={props.nameForInput}
                value={props.stateForInput} 
                onChange={props.handlerForInput} 
                placeholder={props.placeholderForInput} 
            />
        </div>
    )
}

export default FormTextInput