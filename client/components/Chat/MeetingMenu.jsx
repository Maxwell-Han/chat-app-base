import React, { Component } from "react";
import { Collapse, Form, FormInput, FormGroup, Button } from "shards-react";
import { addItem } from '../../store'
import { connect } from "react-redux";

class AddMeetingItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      description: "",
      collapse: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handelSubmit(e) {
    e.preventDefault();
    const { itemName: name, description } = this.state
    const data = { name, description, roomId: this.props.currentRoomId}
    console.log('adding new meeting item ', data)
    await this.props.addItem(data)
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <section>
        <Button onClick={this.toggle}>Create a Meeting Item</Button>
        <Collapse open={this.state.collapse}>
          <Form onSubmit={this.handelSubmit}>
            <FormGroup>
              <label htmlFor="itemName">Item Name</label>
              <FormInput size="sm" id="#itemName" name="itemName" placeholder="Item" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <label htmlFor="description">Description</label>
              <FormInput
                size="sm"
                id="#description"
                placeholder="enter short description"
                name="description"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button outline pill>
              Create Meeting Item
            </Button>
          </Form>
        </Collapse>
      </section>
    );
  }
}

const mapState = state => {
  return {
    currentItems: state.currentItems,
    currentRoomId: state.currentRoomId
  };
};

const mapDispatch = dispatch => {
  return {
    addItem: (item) => dispatch(addItem(item))
  };
};

 export default connect(mapState, mapDispatch)(AddMeetingItemForm);
