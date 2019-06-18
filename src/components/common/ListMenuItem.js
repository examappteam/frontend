import React from "react"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import "./styles/ScrollableListMenuStyle.css"

function ListMenuItem(props) {
    return(
        <div className="listMenuItem" onClick = {(e) => props.handler(e)}>
            <li className="pure-menu-item">
                <div className="pure-menu-link">
                    <p>
                        {props.itemName} 
                        {props.categoryId === props.selectedCategory ?
                            props.id === props.selectedItem + 1 ? 
                            <Router>
                                <Link to={{
                                    pathname: props.selectedLink,
                                    state: {
                                        passedId: props.passedId
                                    }
                                }}>                          
                                    <i className="fa fa-arrow-circle-right fa-lg list-button"></i>                           
                                </Link>
                            </Router> 
                            : "" 
                        : ""}                 
                    </p>
                    <p>{props.itemExtra}</p>
                </div>           
            </li>
        </div>
    )
}

export default ListMenuItem