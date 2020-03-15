import React, { Component } from "react";
import { FormInput, Button } from "shards-react";

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 100
    };
    this.changeScore = this.changeScore.bind(this);
    this.handleSubmitScore = this.handleSubmitScore.bind(this);
  }
  changeScore(e) {
    this.setState({
      score: e.target.value
    });
    console.log(this.state);
  }
  handleSubmitScore(e) {
    e.preventDefault()
    const score = this.state.score
    console.log('submitting score ', score)
  }
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmitScore(e)}>
        <FormInput
          placeholder="Enter Score"
          className="mb-2"
          type="number"
          onChange={this.changeScore}
        />
        <Button pill theme="success" size="sm">Enter Score</Button>
      </form>
    );
  }
}

export default Score;
