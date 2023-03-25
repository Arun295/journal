import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { unsetOrderData } from "../actions/basicActions";
function MessageToast(props) {
  const [show, setShow] = useState(true);
  console.log(props.orderPlaced, props.orderData);
  function navigateOrderPage() {}

  return (
    <ToastContainer>
      <Toast
        onClose={() => props.dispatch(unsetOrderData())}
        show={props.orderPlaced}
        // delay={6050}
        // autohide
        bg={
          props.orderData.orderResponse.status === "rejected"
            ? "danger"
            : props.orderData.orderResponse.status === "open"
            ? "success"
            : "warning"
        }
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">
            ID-{props.orderData.orderResponse.orderId}
          </strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body className={"Dark" && "text-white"}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              alignItems: "start",
              gap: "10px",
            }}
          >
            <strong>{props.orderData.stockdata.symbol}</strong>
            {props.orderData.orderResponse.message}
            {props.orderData.orderResponse.status === "open"
              ? "Order Succesfylly Placed"
              : null}
            {props.orderData.orderResponse.status === "open" ? (
              <Link
                style={{
                  backgroundColor: "inherit",
                  color: "white",
                  border: "none",
                }}
                to={"/orderpage"}
              >
                view &rarr;
              </Link>
            ) : null}
          </div>
        </Toast.Body>
      </Toast>

      {/* <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">2 seconds ago</small>
        </Toast.Header>
        <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
      </Toast> */}
    </ToastContainer>
  );
}

const mapStateToProps = (state) => ({
  orderPlaced: state.Order.orderPlaced,
  orderData: state.Order.orderData,

  // logData: state.Log.logData,
});

export default connect(mapStateToProps, undefined)(MessageToast);
