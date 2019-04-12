import React, {Component} from "react"

class AnswerBox extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Answer submitted was: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} id="form-answerbox">
          <label>
            Answer:<br/>
            <textarea value={this.state.value} onChange={this.handleChange} style={{width: '100%'}}/>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default AnswerBox