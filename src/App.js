import React, { Component } from "react";
import Orders from "./components/orders";

class App extends Component {
  callItem() {
    this.refs.orders.btnAdd();
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={this.callItem.bind(this)}>
          Add
        </button>
        <Orders ref="orders" />
      </div>
    );
  }
}

export default App;
