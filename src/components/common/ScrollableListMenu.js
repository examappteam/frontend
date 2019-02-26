import React, {Component} from "react"

import ListMenuItem from "./ListMenuItem"
import "./styles/ScrollableListMenuStyle.css"

function ScrollableListMenu(props) {
    const menuItems = props.menuItems.map(
        item => <ListMenuItem key={item.id} itemName={item.name} itemExtra={item.linkedClass}/>
    )

    return(
        <div className="pure-menu pure-menu-scrollable scrollable-list-menu">
            <a href="#" className="pure-menu-link pure-menu-heading"><h3>{props.menuHeader}</h3></a>
            <ul className="pure-menu-list">
               {menuItems}
            </ul>
        </div>
    )
}

export default ScrollableListMenu