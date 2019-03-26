import React from "react"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import "./styles/ScrollableListMenuStyle.css"

function ListMenuItem(props) {
    {console.log("propsit",props)}
    return(
        <div className="listMenuItem" onClick = {(e) => props.handler(e)}>
            <li className="pure-menu-item">
                <p className="pure-menu-link">
                    {props.itemName} 
                    {props.categoryId === props.selectedCategory ?
                        props.id === props.selectedItem + 1 ? 
                            <Link to="/class_view">                           
                                <i class="fa fa-arrow-circle-right fa-lg list-button"></i>                           
                            </Link> 
                        : "" 
                    : ""}
                    <p>{props.itemExtra}</p>                 
                </p>
            </li>
        </div>
    )
}

export default ListMenuItem