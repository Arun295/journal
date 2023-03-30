import React, { useEffect, useState } from "react";
// import {
//   exitBuyOrder,
//   exitSellOrder,
//   getOrderBook,
//   getPositions,
//   getStockDetails,
//   setBuyPriceTarget,
//   setSellPriceTarget,
// } from "../userFunctions/UserFunctions";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import "../Stylesheets/Orderpage.css";
// import { orderData } from "../actions/basicActions";
// import OrdersPage from "./OrdersPage";
import PositionsPage from "./PositionsPage";
function OrderPosition(props) {
  // const [positions, setpositionsData] = useState([]);
  // const [stk, setStk] = useState(false);
  // const [stkdata, setStkData] = useState([]);
  // const [targetValue, setTarget] = useState([]);
  const [ordersPage, setOrdersPage] = useState(true);
  // function sellOrder(element) {
  //   // props.wholeData.forEach((item) => {
  //   // if (item.symbol === `${element.tradingsymbol}-EQ`) {
  //   const data = {
  //     price: element.ltp,
  //     symbol: element.tradingsymbol,
  //     token: element.token,
  //     exchange: element.exchange,
  //     quantity: element.netqty,
  //     type: "SELL",
  //   };

  //   exitSellOrder("/exitsellorder", element)
  //     .then((response) => {
  //       if (response.data) {
  //         const orderPlacedData = { orderId: response.data };
  //         getOrderBook("/get_order_details", orderPlacedData)
  //           .then((res) => {
  //             // console.log(res.data);
  //             data["orderResponse"] = res.data;
  //             // if (res.data.status !== "rejected") {
  //             props.dispatch(orderData(data));
  //             // }
  //           })
  //           .catch((err) => console.log(err));

  //         // props.dispatch(orderData(data));
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }
  // // });
  // // }
  // function buyOrder(element) {
  //   // props.wholeData.forEach((item) => {
  //   //   if (item.symbol === `${element.tradingsymbol}-EQ`) {
  //   const data = {
  //     price: element.ltp,
  //     symbol: element.tradingsymbol,
  //     token: element.token,
  //     exchange: element.exchange,
  //     quantity: element.netqty,
  //     type: "BUY",
  //   };

  //   exitBuyOrder("/exitbuyorder", element)
  //     .then((response) => {
  //       if (response.data) {
  //         const orderPlacedData = { orderId: response.data };

  //         getOrderBook("/get_order_details", orderPlacedData)
  //           .then((res) => {
  //             // console.log(res.data);
  //             data["orderResponse"] = res.data;
  //             // if (res.data.status !== "rejected") {
  //             props.dispatch(orderData(data));
  //             // }
  //           })
  //           .catch((err) => console.log(err));
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }
  // //   });
  // // }

  // function callPositions() {
  //   getPositions("/getpositions")
  //     .then((res) => {
  //       if (res.data) {
  //         // console.log(res.data.data);
  //         console.log("hi");
  //         if (res.data.data) {
  //           setpositionsData(res.data.data);

  //           res.data.data.forEach((e) => {
  //             if (e.netqty !== "0") {
  //               // console.log(e);

  //               const time = new Date().toLocaleTimeString();
  //               if (
  //                 parseInt(time.split(":")[0]) >= 3 &&
  //                 parseInt(time.split(":")[0]) !== 12 &&
  //                 time.split(":")[2].includes("PM")
  //               ) {
  //                 //plase market order
  //                 if (parseInt(e.buyPrice) > 0) {
  //                   // sellOrder(e);
  //                 } else {
  //                   // buyOrder(e);
  //                 }
  //               } else {
  //                 if (parseInt(e.buyavgprice) > 0) {
  //                   let z = setBuyPriceTarget(parseInt(e.buyavgprice), false);
  //                   z["symbol"] = e.tradingsymbol;
  //                   setTarget(z);
  //                   console.log("BUY");
  //                   if (parseInt(e.ltp) <= parseInt(z.stopLoss)) {
  //                     console.log("STOPLOSS HIT executed the order ");

  //                     sellOrder(e);
  //                   } else if (parseInt(e.ltp) >= parseInt(z.targetPrice)) {
  //                     console.log("TARGET REACHED HIT executed the order ");

  //                     sellOrder(e);
  //                   } else {
  //                     console.log("Price in range ");

  //                     if (
  //                       e.pnl.includes("-") === false &&
  //                       parseInt(e.pnl) > 1500
  //                     ) {
  //                       // buyOrder(e);
  //                       // console.log(e);
  //                       console.log("Price in range ");
  //                     }
  //                   }
  //                 } else {
  //                   let z = setSellPriceTarget(parseInt(e.sellavgprice), false);
  //                   z["symbol"] = e.tradingsymbol;
  //                   setTarget(z);
  //                   console.log("SELL");

  //                   if (parseInt(e.ltp) >= parseInt(z.stopLoss)) {
  //                     console.log("STOPLOSS HIT executed the order ");
  //                     buyOrder(e);
  //                   } else if (parseInt(e.ltp) <= parseInt(z.targetPrice)) {
  //                     console.log("TARGET REACHED HIT executed the order ");
  //                     buyOrder(e);
  //                   } else {
  //                     console.log("Price in range ");

  //                     if (
  //                       e.pnl.includes("-") === false &&
  //                       parseInt(e.pnl) > 1500
  //                     ) {
  //                       // buyOrder(e);
  //                       // console.log(e);
  //                       console.log("Price in range ");
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           });
  //         }
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }
  // function fetchStockData(data) {
  //   getStockDetails("/get_stock_data", { data: data })
  //     .then((res) => {
  //       console.log("asasa", res.data);
  //       if (res.data) {
  //         setStk(true);
  //         setStkData(res.data);

  //         if (props.orderData.stockdata.name === res.data.symbol) {
  //           if (res.data.lastPrice >= props.orderdata.targetPrice) {
  //             console.log("exit");
  //           } else if (res.data.lastPrice <= props.orderdata.stopLoss) {
  //             console.log("exit");
  //           }
  //         }
  //       }
  //     })

  //     .catch((err) => console.log(err));
  // }

  // useEffect(() => {
  //   // callPositions();
  //   const MINUTE_MS = 7500;

  //   const interval = setInterval(() => {
  //     callPositions();
  //   }, MINUTE_MS);
  // }, []);

  // console.log(props.orderData);
  return (
    <div style={{ minHeight: "40rem", width: "100%" }}>
      <div
        class="switch"
        style={{
          borderBottom: "2px solid white",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "5rem",
        }}
      >
        <h5
          class="orders"
          style={{
            height: "100%",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRight: "1px solid white",
            cursor: "pointer",
            // backgroundImage: ordersPage
            //   ? "linear-gradient(rgba(154, 154, 154, 0),rgba(129, 129, 129, 0.04), rgba(169, 169, 169, 0.11))"
            //   : "none",
          }}
          onClick={() => {
            setOrdersPage(true);
          }}
        >
          {ordersPage ? ">  Orders  <" : "Orders"}
        </h5>
        <h5
          class="positions"
          style={{
            height: "100%",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRight: "1px solid white",
            cursor: "pointer",
          }}
          onClick={() => {
            setOrdersPage(false);
          }}
        >
          {ordersPage ? "Positions" : ">  Positions  <"}
        </h5>
      </div>
      {ordersPage ? (
        <div>
          {" "}
          <h4
            style={{
              borderBottom: "2px solid #FF5A09",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Orders
          </h4>
          {props.orderData ? (
            <Card
              border={
                props.orderData.orderResponse.status === "rejected"
                  ? "danger"
                  : "primary"
              }
              style={{ width: "98%", backgroundColor: "inherit" }}
            >
              <Card.Header
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>{props.orderData.orderResponse.orderId}</strong>
              </Card.Header>
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p>{props.orderData.stockdata.name}</p>{" "}
                  <p>{props.orderData.orderResponse.status}</p>
                </Card.Title>
                <Card.Text>
                  OrderType :{props.orderData.type}
                  <br />
                  Quantity ={props.orderData.quantity}
                  <br />
                  {props.orderData.orderResponse.message}
                </Card.Text>
                <Button variant="danger" disabled>
                  Squar e Off will be automated
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <div style={{ width: "100%", height: "100%" }}>
              <h5>No Orders</h5>
            </div>
          )}
        </div>
      ) : (
        <div style={{ width: "100%", height: "100%" }}>
          <PositionsPage />
        </div>
      )}

      {/* <div style={{ marginLeft: "10px" }}>order Data</div> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  orderPlaced: state.Order.orderPlaced,
  orderData: state.Order.orderData,
  wholeData: state.DataCsv.jsonData,

  // logData: state.Log.logData,
});

export default connect(mapStateToProps, undefined)(OrderPosition);
