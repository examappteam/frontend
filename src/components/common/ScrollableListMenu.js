import React, {} from "react"

import ListMenuItem from "./ListMenuItem"
import "./styles/ScrollableListMenuStyle.css"

function ScrollableListMenu(props) {
    console.log("id",props.menuItems[1].id)
    const category = props.category
    const menuItems = props.menuItems.map(
        item => <ListMenuItem handler={props.handler(category, item.id)}key={item.id} itemName={item.name} itemExtra={item.linkedClass}/>
    )

    return(
        <div className="pure-menu pure-menu-scrollable scrollable-list-menu">
            <p className="pure-menu-link pure-menu-heading"><h3>{props.menuHeader}</h3></p>
            <ul className="pure-menu-list">
               {menuItems}
            </ul>
        </div>
    )
}

export default ScrollableListMenu