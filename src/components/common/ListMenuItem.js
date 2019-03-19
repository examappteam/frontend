import React from "react"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import "./styles/ScrollableListMenuStyle.css"

function ListMenuItem(props) {
    {console.log("propsit",props)}
    return(
        <div className="listMenuItem" onClick = {(e) => props.handler(e)}>
            <li className="pure-menu-item">
                <p class="pure-menu-link">
                    {props.itemName} 
                    <p>{props.itemExtra}</p>
                </p>
            </li>
        </div>
    )
}

export default ListMenuItem