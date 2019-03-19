import React, {Component} from "react"
import "./styles/DashboardStyle.css"
import ScrollableListMenu from '../common/ScrollableListMenu';
import WideListView from '../common/WideListView';

class StudentDashboard extends Component{
        constructor(){
                super()
                this.state={
                categories: [[ 
                        { id: 1, name: "TVT17SPO" },
                        { id: 2, name: "TVT17SPL" },
                        { id: 3, name: "EX16SPI" },
                        { id: 4, name: "EX16SPO" },
                        { id: 5, name: "TVT18SPO" },
                        { id: 6, name: "TVT18SPL" }
                ],
                [
                        {
                                id: 1,
                                name: "Basics of Python",
                                description: "PCAP – Certified Associate in Python Programming certification is a professional credential that measures your ability to accomplish coding tasks related to the basics of programming in the Python language and the fundamental notions and techniques used in object-oriented programming.",
                                date: "5.2.2019"
                        },
                        {
                                id: 2,
                                name: "React",
                                date: "4.2.2019"
                        },
                        {
                                id: 3,
                                name: "Basic web development",
                                date: "3.2.2019"
                        }

                ],[{
                                id: 1,
                                name: "Embedded systems",
                                date: "20.3.2019"
                        },
                        {
                                id: 2,
                                name: "Software engineering physics",
                                date: "25.3.2019"
                        },
                        {
                                id: 3,
                                name: "Differential algebra",
                                date: "26.3.2019"
                        },
                        {
                                id: 4,
                                name: "Telecommunication basics",
                                date: "27.3.2019"
                        },
                        {
                                id: 5,
                                name: "Engineering english",
                                date: "28.3.2019"
                        }
                ]],
                selectedCategoryId: 0,
                selectionId: 0,
        }}

        onScrollableListItemClicked = (category, id) =>(e)=>{
                console.log("event",e)
                e.preventDefault()
                console.log("ran itemclick", category, id)
                    this.setState(() =>{
                        return{
                            selectedCategoryId: category,
                            selectionId: id-1                   
                        }
                    })
            }

        render(){
                return(
                <div>
                        <div className="pure-g">
                        <div className="pure-u-1-3">
                                <div className="padded-box">
                                <ScrollableListMenu 
                                menuItems = {this.state.categories[0]} 
                                menuHeader = "Classes"
                                category = {0}
                                handler = {this.onScrollableListItemClicked.bind(this)}/> 
                                </div>
                        </div>
                        <div className="pure-u-1-3">
                                <div className="padded-box">
                                <ScrollableListMenu 
                                menuItems = {this.state.categories[1]} 
                                menuHeader = "Upcoming exams"
                                category = {1}
                                handler = {this.onScrollableListItemClicked.bind(this)}/>
                                </div> 
                        </div>
                        <div className="pure-u-1-3">
                                <div className="padded-box">
                                <ScrollableListMenu 
                                menuItems = {this.state.categories[2]} 
                                menuHeader = "Previous exams"
                                category = {2}
                                handler = {this.onScrollableListItemClicked.bind(this)}/>
                                </div>
                        </div>
                        </div>
                        <div className="pure-g">
                                <div className="pure-u-3-24"></div>
                                <div className="pure-u-18-24">
                                        <div className="padded-box">
                                                <WideListView title={this.state.categories[this.state.selectedCategoryId][this.state.selectionId].name} exam={this.state.categories[this.state.selectedCategoryId][this.state.selectionId]}/>
                                        </div>
                                </div>
                        </div>
                        <div className="pure-u-3-24"></div>
                        </div>
                )
            
        }

}

export default StudentDashboard