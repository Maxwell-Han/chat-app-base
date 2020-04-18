import React, { Component } from "react";
import { addItem } from "../../store";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";

class AddMeetingItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      description: "",
      collapse: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    console.log("submit button ", e);
    e.preventDefault();
    const { itemName: name, description } = this.state;
    const data = { name, description, roomId: this.props.currentRoomId };
    console.log("adding new meeting item ", data);
    await this.props.addItem(data);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <section>
        <Button onClick={this.toggle}>Create a Meeting Item</Button>
        <Form onSubmit={() => this.handleSubmit(e)}>
          <Form.Item label="Item Name" name="itemName">
            <Input
              id="#itemName"
              name="itemName"
              placeholder="Item"
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input
              id="#description"
              placeholder="enter short description"
              name="description"
              onChange={this.handleChange}
            />
          </Form.Item>
          <Button
            type="primary"
            onClick={this.handleSubmit}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      </section>
    );
  }
}

const mapState = (state) => {
  return {
    currentItems: state.currentItems,
    currentRoomId: state.currentRoomId,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
  };
};

export default connect(mapState, mapDispatch)(AddMeetingItemForm);
