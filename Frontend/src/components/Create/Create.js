import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: "",
      title: "",
      author: "",
      isError: false,
      redirectVar: "",
    };
  }
  updateAuthor = (event) => {
    const author = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      author,
    }));
  };

  updateBookId = (event) => {
    const bookId = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      bookId,
    }));
  };
  updateTitle = (event) => {
    const title = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      title,
    }));
  };

  componentDidMount() {
    if (cookie.load("cookie")) {
      this.setState({ redirectVar: <Redirect to="/create" /> });
    } else {
      this.setState({ redirectVar: <Redirect to="/login" /> });
    }
  }

  onSubmit = (event) => {
    const { isError, redirectVar, ...data } = this.state;
    axios.post("http://localhost:3001/create", data).then((res) => {
      if (res.data == "Okay") {
        this.setState({ isError: false, redirectVar: <Redirect to="/home" /> });
      } else {
        this.setState({
          isError: true,
          redirectVar: <Redirect to="/create" />,
        });
      }
    });
  };
  render() {
    return (
      <div>
        {this.state.redirectVar}
        <div>
          <br />
          <div class="container">
            <div style={{ width: "30%" }} class="form-group">
              <input
                type="text"
                class="form-control"
                name="BookID"
                placeholder="Book ID"
                value={this.state.bookId}
                onChange={(event) => this.updateBookId(event)}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                type="text"
                class="form-control"
                name="Title"
                placeholder="Book Title"
                value={this.state.title}
                onChange={(event) => this.updateTitle(event)}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                type="text"
                class="form-control"
                name="Author"
                placeholder="Book Author"
                value={this.state.author}
                onChange={(event) => this.updateAuthor(event)}
              />
            </div>
            {this.state.isError && (
              <div className="errorMessage"> Book exists already </div>
            )}
            <br />
            <div style={{ width: "30%" }}>
              <button
                class="btn btn-success"
                type="submit"
                onClick={() => this.onSubmit()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
