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
import Card from "react-bootstrap/Card";
import {
  orderData,
  unsetOrderData,
  unsetPositionPage,
} from "../actions/basicActions";
import MiniLoader from "./MiniLoader";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Button from "react-bootstrap/Button";
function PositionToast(props) {
  const [positions, setpositionsData] = useState([
    {
      tradingsymbol: "SBIN-EQ",
      buyavgprice: "2330",
      ltp: 2331,
      netqty: "0",
      exchange: "NSE",
      pnl: "-200",
    },
    {
      tradingsymbol: "DMART-EQ",
      buyavgprice: "2330",
      ltp: 2331,
      netqty: "230",
      exchange: "NSE",
      pnl: "200",
    },
    {
      tradingsymbol: "SBIN-EQ",
      buyavgprice: "2330",
      ltp: 2331,
      netqty: "0",
      exchange: "NSE",
      pnl: "-200",
    },
    {
      tradingsymbol: "DMART-EQ",
      buyavgprice: "2330",
      ltp: 2331,
      netqty: "230",
      exchange: "NSE",
      pnl: "200",
    },
    {
      tradingsymbol: "SBIN-EQ",
      buyavgprice: "2330",
      ltp: 2331,
      netqty: "0",
      exchange: "NSE",
      pnl: "-200",
    },
    {
      tradingsymbol: "DMART-EQ",
      buyavgprice: "2330",
      ltp: 2331,
      netqty: "230",
      exchange: "NSE",
      pnl: "200",
    },
  ]);
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
  function startIntervl() {}

  useEffect(() => {
    // callPositions();
    const MINUTE_MS = 7500;
    console.log(props.positionPage);
    const interval = setInterval(() => {
      if (props.positionPage) {
        callPositions();
      } else {
        return true;
      }
    }, MINUTE_MS);

    return () => {
      clearInterval(interval);
    };

    //   return () => {
    //   };
    // }
  }, [props.positionPage]);
  console.log(props.orderdata);

  return (
    <ToastContainer
      position="top-end"
      style={{ maxHeight: "500px", height: "500px" }}
    >
      <Toast
        onClose={() => props.dispatch(unsetPositionPage(false))}
        show={props.positionPage}
        // show={true}
        style={{ width: "25rem" }}
        bg={"dark"}
      >
        <Toast.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            style={{
              backgroundColor: "black",
              minWidth: "1rem",
              height: "1rem",
              borderRadius: "1rem",
            }}
          ></div>

          <strong>Positions</strong>
        </Toast.Header>
        <Toast.Body className={"Dark" && "text-white"}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",

              gap: "10px",
              overflowX: "hidden",
              overfolwY: "scroll",
            }}
          >
            {positions.length > 0 ? (
              positions.map((value, index) => {
                return (
                  <Card
                    style={{
                      width: "100%",
                      //   border: "0.5px solid white",
                      borderRadius: "1%",
                    }}
                  >
                    {value.netqty > 0 ? (
                      <Card.Header
                        // variant={}
                        style={{
                          display: "flex",
                          borderRadius: "1%",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: value.pnl.includes("-")
                            ? "#cd3121"
                            : "#60c519",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "row",
                              gap: "20px",
                            }}
                          >
                            <strong>{value.tradingsymbol}</strong>
                            <strong>{value.exchange}</strong>
                          </div>

                          {parseInt(value.buyavgprice) > 0 ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                gap: "5px",
                              }}
                            >
                              <p>
                                <strong>BUY</strong>({value.netqty})
                              </p>
                              {value.buyavgprice}
                            </div>
                          ) : (
                            <p>
                              SELL({value.netqty}){value.exchange}
                              {value.sellavgprice}
                              {/* {parseInt(value.ltp) - parseInt(value.sellavgprice)} */}
                            </p>
                          )}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <strong>{value.ltp}</strong>
                          {value.pnl}
                        </div>
                      </Card.Header>
                    ) : (
                      <Card.Header
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          borderRadius: "1%",

                          backgroundColor: value.pnl.includes("-")
                            ? "#cd3121"
                            : "#60c519",
                        }}
                      >
                        <strong>{value.tradingsymbol}</strong>
                        <strong>{value.pnl}</strong>
                      </Card.Header>
                    )}
                  </Card>
                );
              })
            ) : (
              <div style={{ width: "100%" }}>
                <MiniLoader />
              </div>
            )}
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
  wholeData: state.DataCsv.jsonData,
  positionPage: state.Order.OpenPositionPage,

  // logData: state.Log.logData,
});

export default connect(mapStateToProps, undefined)(PositionToast);
