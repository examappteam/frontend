import React, {} from "react"

import ListMenuItem from "./ListMenuItem"
import "./styles/ScrollableListMenuStyle.css"

function ScrollableListMenu(props) {
    const category = props.category
    let menuItems

    // try to find a better way to do this in the future
    if(category === 1) {
        menuItems = props.menuItems.map(
            item => <ListMenuItem 
                handler={props.handler(category, item.id)} 
                id={item.id} 
                itemName={item.name} 
                itemExtra={item.linkedCourse}    // !!!we should be able to use different item extras
                selectedItem={props.selectedItem}
                categoryId={category}
                selectedCategory={props.selectedCategory}
                selectedLink={props.selectedLink}
                passedId={props.passedId}/>
        )
    } else if(category === 2) {
        menuItems = props.menuItems.map(
            item => <ListMenuItem 
                handler={props.handler(category, item.id)} 
                id={item.id} 
                itemName={item.title}       // This is just a temporary solution
                //itemExtra={item.date}
                selectedItem={props.selectedItem}
                categoryId={category}
                selectedCategory={props.selectedCategory}
                selectedLink={props.selectedLink}
                passedId={props.passedId}/>
        )
    } else {
        menuItems = props.menuItems.map(
            item => <ListMenuItem 
                handler={props.handler(category, item.id)} 
                id={item.id} 
                itemName={item.name} 
                itemExtra=""
                selectedItem={props.selectedItem}
                categoryId={category}
                selectedCategory={props.selectedCategory}
                selectedLink={props.selectedLink}
                passedId={props.passedId}/>
        )
    }

    return(
        <div className="pure-menu pure-menu-scrollable scrollable-list-menu">
            <h3 className="pure-menu-link pure-menu-heading">{props.menuHeader}</h3>
            <ul className="pure-menu-list">
               {menuItems}
            </ul>
        </div>
    )
}

export default ScrollableListMenu