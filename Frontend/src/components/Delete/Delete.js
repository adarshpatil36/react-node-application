import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: "",
      isError: false,
      redirectVar: "",
    };
  }

  componentDidMount() {
    if (cookie.load("cookie")) {
      this.setState({ redirectVar: <Redirect to="/delete" /> });
    } else {
      this.setState({ redirectVar: <Redirect to="/login" /> });
    }
  }

  handleChange = (event) => {
    const val = event.target.value;
    this.setState((prevState) => ({
      bookId: val,
    }));
  };
  delete = () => {
    const { isError, redirectVar, ...data } = this.state;
    axios.post("http://localhost:3001/delete", data).then((res) => {
      if (res.data == "Okay") {
        this.setState({ isError: false, redirectVar: <Redirect to="/home" /> });
      } else {
        this.setState({
          isError: true,
          redirectVar: <Redirect to="/delete" />,
        });
      }
    });
    console.log(">> ", this.state);
  };
  render() {
    return (
      <div>
        {this.state.redirectVar}
        <div class="container">
          <div style={{ width: "50%", cssFloat: "left" }} class="form-group">
            <input
              type="text"
              class="form-control"
              name="BookID"
              placeholder="Search a Book by Book ID"
              value={this.state.bookId}
              onChange={(event) => this.handleChange(event)}
            />
          </div>
          <div style={{ width: "50%", cssFloat: "right" }}>
            <button class="btn btn-success" type="submit" onClick={this.delete}>
              Delete
            </button>
          </div>
        </div>

        {this.state.isError && (
          <div className="errorMessage"> Book does not exist </div>
        )}
      </div>
    );
  }
}

export default Delete;
