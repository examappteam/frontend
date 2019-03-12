import React from "react"

function ListMenuItem(props) {
    return(
        <div onClick = {(e) => props.handler(e)}>
            <li className="pure-menu-item">
                <a href="#" class="pure-menu-link">
                    {props.itemName} 
                    <p>{props.itemExtra}</p>
                </a>
            </li>
        </div>
    )
}

export default ListMenuItem