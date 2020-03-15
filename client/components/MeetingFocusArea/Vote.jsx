import React, { Component } from "react";
import { FormRadio, Button } from "shards-react";

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: null
    };
    this.changeVote = this.changeVote.bind(this);
    this.handleSubmitVote = this.handleSubmitVote.bind(this);
  }
  changeVote(choice) {
    this.setState({
      vote: choice
    });
    console.log(this.state);
  }
  handleSubmitVote(e) {
    e.preventDefault()
    const vote = this.state.vote
    console.log('submitting vote ', vote)
  }
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmitVote(e)}>
        <p className="mb-2">Cast a vote:</p>
        <FormRadio
          name="yes"
          checked={this.state.vote === "yes"}
          onChange={() => this.changeVote("yes")}
        >
          Yes
        </FormRadio>
        <FormRadio
          name="no"
          checked={this.state.vote === "no"}
          onChange={() => this.changeVote("no")}
        >
          No
        </FormRadio>
        <Button pill theme="info" size="sm">Cast Vote</Button>
      </form>
    );
  }
}

export default Vote;
