import React from "react"

function ListMenuItem(props) {
    return(
        <li className="pure-menu-item">
            <a href="#" class="pure-menu-link">
                {props.itemName} 
                <p>{props.itemExtra}</p>
            </a>
        </li>
    )
}

export default ListMenuItem