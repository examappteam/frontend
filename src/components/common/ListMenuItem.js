import React from "react"
import "./styles/ScrollableListMenuStyle.css"

function ListMenuItem(props) {
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