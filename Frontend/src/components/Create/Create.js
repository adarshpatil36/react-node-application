import React, { Component } from "react";
import axios from "axios";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: "",
      title: "",
      author: "",
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

  onSubmit = (event) => {
    const data = this.state;
    axios.post("http://localhost:3001/create", data).then((res) => {
      console.log(res);
    });
    // window.location = "/home";
  };
  render() {
    return (
      <div>
        <br />
        <div class="container">
          <form action="http://127.0.0.1:3000/create" method="post">
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
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
