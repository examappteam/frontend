import React, {Component} from "react"

import ScrollableListMenu from "../../common/ScrollableListMenu"

//import "../../common/styles/ScrollableListMenuStyle.css"

class AddExamFromListDialog extends Component {
    constructor() {
        super()
        this.state = {
            exampleItems: [
                { id: 1, name: "Basics of Java exam" },
                { id: 1, name: "Basics of C++ exam" },
                { id: 1, name: "Basics of Python exam" },
                { id: 1, name: "Basics of PHP exam" }
            ],
            selectedCategoryId: 999,
            selectionId: 0,
        }
        this.onScrollableListItemClicked = this.onScrollableListItemClicked.bind(this)
    }

    onScrollableListItemClicked = (category, id) => (e) => {
        console.log("event",e)
        e.preventDefault()
        console.log("ran itemclick", category, id)
            this.setState(() =>{
                return{
                    selectionId: id-1                   
                }
                //console.log("states ", this.state.selectedCategoryId, this.state.selectionId)
            })
    }

    render(props) {
        return(
            <div className="padded-box">
                <ScrollableListMenu 
                    menuHeader="My exams" 
                    menuItems={this.state.exampleItems}
                    selectedItem={this.state.selectionId}
                    selectedCategory={this.state.selectedCategoryId}
                    category = {0}
                    handler = {this.onScrollableListItemClicked.bind(this)}/>

                <button className="pure-button btn-continue">Add exam</button>
            </div>           
        )      
    }
}

export default AddExamFromListDialog