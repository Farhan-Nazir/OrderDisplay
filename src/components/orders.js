import React, { Component } from "react";
import "./orders.css";
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNo: 1,
      status: ""
    };
  }
  componentDidMount() {
    const url = "http://localhost:5000/api/orders"; // site that doesn’t send Access-Control-*
    fetch(url)
      .then(res => res.text())
      .then(data => {
        console.log(data);
      })
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
  }

  btnAdd() {
    let inprogressItems = document.getElementById("inprogress-items");
    let newDiv = document.createElement("button");
    this.setState(prevState => {
      return { orderNo: prevState.orderNo + 1 };
    });
    newDiv.id = this.state.orderNo;

    newDiv.appendChild(
      document.createTextNode("Order #: " + this.state.orderNo)
    );
    newDiv.onclick = () => {
      let readyItems = document.getElementById("readyItems");
      let inprogressItem = document.getElementById(newDiv.id);
      inprogressItem.parentNode.removeChild(inprogressItem);
      let readyItemDiv = document.createElement("button");
      readyItemDiv.id = inprogressItem.id;
      readyItemDiv.appendChild(
        document.createTextNode(inprogressItem.textContent)
      );
      readyItemDiv.onclick = () => {
        let deletDiv = document.getElementById(readyItemDiv.id);
        readyItems.removeChild(deletDiv);
      };
      readyItems.appendChild(readyItemDiv);
      console.log(inprogressItem);
    };
    inprogressItems.appendChild(newDiv);
  }

  render() {
    return (
      <div className="main">
        <div className="orderProgress">
          <h1>Order Started </h1>
          <div className="inprogress-items" id="inprogress-items" />
        </div>
        <div className="pageDivider" />
        <div className="orderCompleted">
          <h1>Order is Ready</h1>
          <div className="ready-items" id="readyItems" />
        </div>
      </div>
    );
  }
}
export default Orders;
