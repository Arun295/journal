import React, { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { unsetOrderData, orderData } from "../actions/basicActions";
import {
  buyOriginalOrder,
  getOrderBook,
  sellOriginalOrder,
} from "../userFunctions/UserFunctions";
function MessageToast(props) {
  const [updatedStock, setUpdatedStock] = useState(undefined);
  const [mymsg, setmymsg] = useState(false);
  console.log(props.orderPlaced, props.orderdata);

  function sell(z) {
    const data = {
      stockdata: props.orderdata.stockdata,
      price: props.orderdata.price,
      targetPrice: props.orderdata.targetPrice,
      triggerPrice: props.orderdata.triggerPrice,
      stopLoss: props.orderdata.stopLoss,
      quantity: props.orderdata.quantity - z,
      type: props.orderdata.type,
      sellPrice: props.orderdata.price,
    };
    console.log("sell", data);
    sellOriginalOrder("/sellorder", data)
      .then((response) => {
        if (response.data) {
          const orderPlacedData = { orderId: response.data };
          getOrderBook("/get_order_details", orderPlacedData)
            .then((res) => {
              // console.log(res.data);
              setUpdatedStock(data.stockdata.symbol);

              data["orderResponse"] = res.data;
              // if (res.data.status !== "rejected") {
              props.dispatch(orderData(data));
              // }
            })
            .catch((err) => console.log(err));

          // props.dispatch(orderData(data));
        }
      })
      .catch((err) => console.log(err));
  }

  function buy(z) {
    const data = {
      stockdata: props.orderdata.stockdata,
      price: props.orderdata.price,
      buyPrice: props.orderdata.price,
      targetPrice: props.orderdata.targetPrice,
      triggerPrice: props.orderdata.triggerPrice,
      stopLoss: props.orderdata.stopLoss,
      quantity: props.orderdata.quantity - z,
      type: props.orderdata.type,
    };
    console.log("buy", data);
    buyOriginalOrder("/buyorder", data)
      .then((response) => {
        if (response.data) {
          const orderPlacedData = { orderId: response.data };

          getOrderBook("/get_order_details", orderPlacedData)
            .then((res) => {
              setUpdatedStock(data.stockdata.symbol);
              // console.log(res.data);
              data["orderResponse"] = res.data;
              // if (res.data.status !== "rejected") {
              props.dispatch(orderData(data));
              // }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (
      (props.orderdata.orderResponse.status = "rejected") &&
      props.orderdata.stockdata.symbol !== updatedStock
    ) {
      if (
        props.orderdata.orderResponse.message.includes("Insufficient Funds")
      ) {
        const myArray = props.orderdata.orderResponse.message.split("Rs.");
        const mybalance = myArray[1].split(".")[0];
        const requiredAmout = myArray[2].split("funds")[0];
        console.log(myArray, mybalance, requiredAmout);
        if (parseInt(mybalance) < 10000) {
          setmymsg("May another trade is going on wait for it to complete");
        } else {
          if (parseInt(requiredAmout) - parseInt(mybalance) <= 10000) {
            if (props.orderdata.type === "BUY") {
              buy(30);
              setmymsg("Quantity reduced to 30");
            } else {
              sell(30);
            }
          } else if (
            parseInt(requiredAmout) - parseInt(mybalance) <= 20000 &&
            parseInt(requiredAmout) - parseInt(mybalance) > 10000 &&
            props.orderdata.quantity !== 75
          ) {
            if (props.orderdata.type === "BUY") {
              buy(45);
              setmymsg("Quantity reduced to 40");
            } else {
              sell(45);
            }
          } else {
            if (props.orderdata.quantity === 75) {
              if (props.orderdata.type === "BUY") {
                buy(20);
                setmymsg("Quantity reduced to 20");
              } else {
                sell(20);
              }
            }
          }
        }
      }
    }
  });

  return (
    <ToastContainer>
      <Toast
        onClose={() => props.dispatch(unsetOrderData())}
        show={props.orderPlaced}
        // delay={6050}
        // autohide
        bg={
          props.orderdata.orderResponse.status === "rejected"
            ? "danger"
            : props.orderdata.orderResponse.status === "open"
            ? "success"
            : "warning"
        }
        style={{ width: "25rem" }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">
            ID-{props.orderdata.orderResponse.orderId}
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
            <strong>
              {props.orderdata.stockdata.symbol} {props.orderdata.quantity}
            </strong>
            {props.orderdata.orderResponse.message}
            {props.orderdata.orderResponse.status === "open"
              ? "Order Executed "
              : null}
            <br />
            {mymsg ? mymsg : null}
            {props.orderdata.orderResponse.status === "open" ? (
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
  orderdata: state.Order.orderData,

  // logData: state.Log.logData,
});

export default connect(mapStateToProps, undefined)(MessageToast);
