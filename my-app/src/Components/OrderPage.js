import React, { useEffect, useState } from "react";
import {
  buyOriginalOrder,
  getOrderBook,
  getPositions,
  getStockDetails,
  sellOriginalOrder,
} from "../userFunctions/UserFunctions";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import "../Stylesheets/Orderpage.css";
import { orderData } from "../actions/basicActions";
function OrderPage(props) {
  const [positions, setpositionsData] = useState([]);
  const [stk, setStk] = useState(false);
  const [stkdata, setStkData] = useState([]);

  function callPositions() {
    getPositions("/getpositions")
      .then((res) => {
        if (res.data) {
          // console.log(res.data.data);
          if (res.data.data) {
            setpositionsData(res.data.data);
            // res.data.data.forEach((e) => {
            // });
          }
        }
      })
      .catch((err) => console.log(err));
  }
  function fetchStockData(data) {
    getStockDetails("/get_stock_data", { data: data })
      .then((res) => {
        console.log("asasa", res.data);
        if (res.data) {
          setStk(true);
          setStkData(res.data);

          if (props.orderData.stockdata.name === res.data.symbol) {
            if (res.data.lastPrice >= props.orderdata.targetPrice) {
              console.log("exit");
            } else if (res.data.lastPrice <= props.orderdata.stopLoss) {
              console.log("exit");
            }
          }
        }
      })

      .catch((err) => console.log(err));
  }

  function sellOrder(stkdata) {
    props.wholeData.forEach((item) => {
      if (item.symbol === `${stkdata.name}-EQ`) {
        let percent = 0.75;
        let diff = (0.1 / 100) * props.current;
        let totalpercentamount = (percent / 100) * props.current;
        let sellPrice = props.high - diff;
        let quantity = 0;
        let triggerPrice = sellPrice + (0.2 / 100) * props.current;
        let stopLossPrice = triggerPrice + (0.05 / 100) * props.current;

        if (props.current > 500 && props.current < 1000) {
          quantity = 375;
        } else if (props.current > 1000 && props.current < 1500) {
          quantity = 257;
        } else if (props.current < 500) {
          quantity = 452;
        } else if (props.current > 1500 && props.current < 2200) {
          quantity = 125;
        } else {
          quantity = 75;
        }
        let targetPrice = props.current - totalpercentamount;

        const data = {
          stockdata: item,
          price: props.current,
          targetPrice: Math.round(targetPrice),
          triggerPrice: Math.round(triggerPrice),
          stopLoss: Math.round(stopLossPrice),
          sellPrice: Math.round(sellPrice),
          quantity: quantity,
          type: "SELL",
        };

        sellOriginalOrder("/sellorder", data)
          .then((response) => {
            if (response.data) {
              const orderPlacedData = { orderId: response.data };
              getOrderBook("/get_order_details", orderPlacedData)
                .then((res) => {
                  // console.log(res.data);
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
    });
  }
  function buyOrder(stkdata) {
    props.wholeData.forEach((item) => {
      if (item.symbol === `${stkdata.name}-EQ`) {
        // console.log(item);
        let percent = 0.75;
        let diff = (0.1 / 100) * props.current;
        let totalpercentamount = (percent / 100) * props.current;
        let buyPrice = props.low + diff;
        let quantity = 0;
        let triggerPrice = buyPrice - (0.2 / 100) * props.current;
        let stopLossPrice = triggerPrice - (0.05 / 100) * props.current;

        if (props.current > 500 && props.current < 1000) {
          quantity = 375;
        } else if (props.current > 1000 && props.current < 1500) {
          quantity = 257;
        } else if (props.current < 500) {
          quantity = 452;
        } else if (props.current > 1500 && props.current < 2200) {
          quantity = 125;
        } else {
          quantity = 75;
        }
        let targetPrice = props.current + totalpercentamount;

        const data = {
          stockdata: item,
          price: props.current,
          targetPrice: Math.round(targetPrice),
          buyPrice: Math.round(buyPrice),
          triggerPrice: Math.round(triggerPrice),
          stopLoss: Math.round(stopLossPrice),
          quantity: quantity,
          type: "BUY",
        };

        buyOriginalOrder("/buyorder", data)
          .then((response) => {
            if (response.data) {
              const orderPlacedData = { orderId: response.data };

              getOrderBook("/get_order_details", orderPlacedData)
                .then((res) => {
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
    });
  }

  useEffect(() => {
    callPositions();
    const MINUTE_MS = 20000;

    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      if (
        parseInt(time.split(":")[0]) >= 3 &&
        parseInt(time.split(":")[0]) !== 12 &&
        time.split(":")[2].includes("PM")
      ) {
        if (positions.length > 0) {
          console.log("exit");
          if (props.orderData.type === "BUY") {
            // sellOrder()
          } else {
            // buyOrder
          }
        }
      } else {
      }
      callPositions();
    }, MINUTE_MS);
  }, []);

  // console.log(props.orderData);
  return (
    <div style={{ minHeight: "40rem", width: "100%" }}>
      <h4 style={{ borderBottom: "2px solid #FF5A09", marginLeft: "10px" }}>
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
              Square Off will be automated
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div style={{ width: "100%", height: "100%" }}>
          <h5>No Orders</h5>
        </div>
      )}

      <div style={{ marginLeft: "10px" }}>order Data</div>

      <div>
        <h5 style={{ borderBottom: "2px solid white", marginLeft: "10px" }}>
          Positions
        </h5>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {positions.length > 0 ? (
            positions.map((value, index) => {
              return (
                <Card
                  border={value.pnl.includes("-") ? "danger" : "success"}
                  style={{ width: "98%", backgroundColor: "inherit" }}
                >
                  <Card.Header
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "goldenrod",
                    }}
                  >
                    <strong>{value.tradingsymbol}</strong>
                    <strong>
                      {value.ltp}rs
                      {parseInt(value.buyavgprice) > 0 ? (
                        <p>
                          {parseInt(value.ltp) - parseInt(value.buyavgprice)}
                        </p>
                      ) : (
                        <p>
                          {parseInt(value.ltp) - parseInt(value.sellavgprice)}
                        </p>
                      )}
                    </strong>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p>{value.producttype}</p> <p>{value.pnl} </p>
                    </Card.Title>
                    <Card.Text
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      If ltp reach target price system will auto square off
                      position
                      <Button variant="danger" disabled>
                        Square Off will be automated
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div style={{ width: "100%", height: "100%" }}>
              <h5>No Positions</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  orderPlaced: state.Order.orderPlaced,
  orderData: state.Order.orderData,

  // logData: state.Log.logData,
});

export default connect(mapStateToProps, undefined)(OrderPage);
