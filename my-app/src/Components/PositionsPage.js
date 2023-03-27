import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  exitBuyOrder,
  exitSellOrder,
  getOrderBook,
  getPositions,
  getStockDetails,
  setBuyPriceTarget,
  setSellPriceTarget,
} from "../userFunctions/UserFunctions";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { orderData } from "../actions/basicActions";
import MiniLoader from "./MiniLoader";

function PositionsPage(props) {
  const [positions, setpositionsData] = useState([]);
  const [targetValue, setTarget] = useState([]);
  const [stk, setStk] = useState(false);
  const [stkdata, setStkData] = useState([]);

  function sellOrder(element) {
    // props.wholeData.forEach((item) => {
    // if (item.symbol === `${element.tradingsymbol}-EQ`) {
    const data = {
      price: element.ltp,
      symbol: element.tradingsymbol,
      token: element.token,
      exchange: element.exchange,
      quantity: element.netqty,
      type: "SELL",
    };

    exitSellOrder("/exitsellorder", element)
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
  // });
  // }
  function buyOrder(element) {
    // props.wholeData.forEach((item) => {
    //   if (item.symbol === `${element.tradingsymbol}-EQ`) {
    const data = {
      price: element.ltp,
      symbol: element.tradingsymbol,
      token: element.token,
      exchange: element.exchange,
      quantity: element.netqty,
      type: "BUY",
    };

    exitBuyOrder("/exitbuyorder", element)
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
  //   });
  // }

  function callPositions() {
    getPositions("/getpositions")
      .then((res) => {
        if (res.data) {
          // console.log(res.data.data);
          console.log("hi");
          if (res.data.data) {
            setpositionsData(res.data.data);

            res.data.data.forEach((e) => {
              if (e.netqty !== "0") {
                // console.log(e);

                const time = new Date().toLocaleTimeString();
                if (
                  parseInt(time.split(":")[0]) >= 3 &&
                  parseInt(time.split(":")[0]) !== 12 &&
                  time.split(":")[2].includes("PM")
                ) {
                  //plase market order
                  if (parseInt(e.buyPrice) > 0) {
                    // sellOrder(e);
                  } else {
                    // buyOrder(e);
                  }
                } else {
                  if (parseInt(e.buyavgprice) > 0) {
                    let z = setBuyPriceTarget(parseInt(e.buyavgprice), false);
                    z["symbol"] = e.tradingsymbol;
                    setTarget(z);
                    console.log("BUY");
                    if (parseInt(e.ltp) <= parseInt(z.stopLoss)) {
                      console.log("STOPLOSS HIT executed the order ");

                      sellOrder(e);
                    } else if (parseInt(e.ltp) >= parseInt(z.targetPrice)) {
                      console.log("TARGET REACHED HIT executed the order ");

                      sellOrder(e);
                    } else {
                      console.log("Price in range ");

                      if (
                        e.pnl.includes("-") === false &&
                        parseInt(e.pnl) > 1500
                      ) {
                        // buyOrder(e);
                        // console.log(e);
                        console.log("Price in range ");
                      }
                    }
                  } else {
                    let z = setSellPriceTarget(parseInt(e.sellavgprice), false);
                    z["symbol"] = e.tradingsymbol;
                    setTarget(z);
                    console.log("SELL");

                    if (parseInt(e.ltp) >= parseInt(z.stopLoss)) {
                      console.log("STOPLOSS HIT executed the order ");
                      buyOrder(e);
                    } else if (parseInt(e.ltp) <= parseInt(z.targetPrice)) {
                      console.log("TARGET REACHED HIT executed the order ");
                      buyOrder(e);
                    } else {
                      console.log("Price in range ");

                      if (
                        e.pnl.includes("-") === false &&
                        parseInt(e.pnl) > 1500
                      ) {
                        // buyOrder(e);
                        // console.log(e);
                        console.log("Price in range ");
                      }
                    }
                  }
                }
              }
            });
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

  useEffect(() => {
    // callPositions();
    const MINUTE_MS = 7500;

    const interval = setInterval(() => {
      callPositions();
    }, MINUTE_MS);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!positions.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h6>Getting Data From Server</h6>
          <MiniLoader />
        </div>
      ) : (
        <div>
          <h4
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "2px solid yellow",
            }}
          >
            Positions
          </h4>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: "10px",
            }}
          >
            {positions.length > 0 ? (
              positions.map((value, index) => {
                return (
                  <Card
                    border="warning"
                    style={{ width: "98%", backgroundColor: "inherit" }}
                  >
                    <Card.Header
                      // variant={}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: value.pnl.includes("-")
                          ? "#cd3131"
                          : "#60c029",
                      }}
                    >
                      <strong>{value.tradingsymbol}</strong>
                      <strong>
                        {parseInt(value.buyavgprice) > 0 ? (
                          <p>
                            BUY({value.netqty}) <br />
                            {value.buyavgprice}-{value.ltp}
                            {/* {parseInt(value.ltp) - parseInt(value.buyavgprice)} */}
                          </p>
                        ) : (
                          <p>
                            SELL({value.netqty})
                            <br />
                            {value.sellavgprice}-{value.ltp}
                            {/* {parseInt(value.ltp) - parseInt(value.sellavgprice)} */}
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
                        <div>
                          <p>{value.producttype}</p>
                          {value.exchange}
                        </div>

                        <p>
                          {value.pnl.includes("-") ? (
                            value.pnl
                          ) : (
                            <p>+{value.pnl}</p>
                          )}{" "}
                        </p>
                      </Card.Title>
                      <Card.Text
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {value.tradingsymbol === targetValue.symbol ? (
                          <div>
                            {" "}
                            TARGET-{targetValue.targetPrice} STOPLOSS-
                            {targetValue.stopLoss}
                          </div>
                        ) : (
                          <p>Position is Inactive</p>
                        )}
                        <Button
                          variant="danger"
                          // onClick={() => {
                          //   buyOrder(value);
                          // }}
                          disabled
                        >
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
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  orderPlaced: state.Order.orderPlaced,
  orderData: state.Order.orderData,
  wholeData: state.DataCsv.jsonData,

  // logData: state.Log.logData,
});

export default connect(mapStateToProps, undefined)(PositionsPage);
