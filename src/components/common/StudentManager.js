import React, {Component} from "react"

class StudentManager extends Component{
        constructor(){
                super()
                this.state={
                        studentName: "",
                        studentEmail: "",
                        newStudent: false,
                        existingStudent: false
                }
                this.handleChange = this.handleChange.bind(this)
                this.handleSelectionClick = this.handleSelectionClick.bind(this)
        }

        handleChange(event){
                const{name, value} = event.target
                console.log("handleChange!",name, value)
        
                this.setState({
                        [name]: value
                })
        }

        handleClick(){
                console.log("clicked")
        }

        handleSelectionClick(event){
                const {name} = event.target
                console.log("handleclick",name)
                        this.setState({
                                [name]: true
                        })


        }

        renderSelection(){
                return(
                        <div>
                                <button 
                                className="pure-button"
                                onClick={this.handleSelectionClick}
                                name="existingStudent">Add existing student</button>
                                <button className="pure-button"
                                onClick={this.handleSelectionClick}
                                name="newStudent">Add new student</button>
                        </div>
                )
        }

        renderStudentCreation(){
                return(
                        <div>
                                <h1>Create new student</h1>
                                <br/>
                                <form>
                                        <h3>Name</h3>
                                        <input type="text" 
                                        value={this.state.studentName} 
                                        name="studentName"
                                        onChange={this.handleChange}/><br/>
                                        <h3>Email</h3>
                                        <input type="text" 
                                        value={this.state.studentEmail} 
                                        name="studentEmail"
                                        onChange={this.handleChange}/><br/>
                                </form>
                                <button className="pure-button btn-continue">Continue</button>
                        </div>
        )
        }

        render(){
                var toRender
                if(this.state.newStudent){
                        console.log("newStudent", this.state.newStudent)
                        toRender = this.renderStudentCreation()
                }
                else if(this.state.existingStudent){
                        toRender = <h1>Select student</h1>
                }
                else{
                        toRender = this.renderSelection()
                }
                return(
                        toRender
                )
        }
}

export default StudentManager