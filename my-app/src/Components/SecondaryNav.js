import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  readData,
  niftyData,
  orderData,
  setOhldata,
} from "../actions/basicActions";
import {
  getStocktoken,
  getNiftyStocks,
  findohl,
  sellOriginalOrder,
  buyOriginalOrder,
  getOrderBook,
  getNiftyStocksOhl,
  setSellPriceTarget,
  setBuyPriceTarget,
} from "../userFunctions/UserFunctions";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
function SecondaryNav(props) {
  const [ohldata, setohldata] = useState([]);

  // function fetchWholeData() {
  //   getStocktoken("/getwholedata")
  //     .then((response) => {
  //       if (response.data) {
  //         props.dispatch(readData(response.data));
  //       } else {
  //         console.log("No Response Data");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // function findohlData() {
  //   console.log(props.niftyFiftyData, props);
  //   findohl("/findohl", props.niftyFiftyData)
  //     .then((res) => {
  //       let data = JSON.parse(JSON.stringify(res.data));

  //       setohldata(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  function fetchNiftyOhlData() {
    getNiftyStocksOhl("/get_nifty_fifty_stocks_ohl")
      .then((res) => {
        if (res.data.length > 0) {
          // console.log(res.data);
          // setNiftyStks(res.data);
          props.dispatch(setOhldata(res.data));
          setohldata(res.data);

          // findohl("/findohl", res.data)
          //   .then((res) => {
          //     let data = JSON.parse(JSON.stringify(res.data));
          //     props.dispatch(setOhldata(data));
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
          // props.dispatch(niftyData(res.data));
        } else {
          console.log("No Response Data");
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    // fetchNiftyOhlData();
    // fetchWholeData();
    // fetchNiftyData();
    // const time = new Date().toLocaleTimeString();
    // // if (
    // //   parseInt(time.split(":")[0]) >= 9 &&
    // //   time.split(":")[2].includes("AM")
    // // ) {
    // // }
    // const MINUTE_MS = 20000;
    // const interval = setInterval(() => {
    //   fetchNiftyOhlData();
    // }, MINUTE_MS);
    // if (
    //   15 ==< parseInt(time.split(":")[1]) &&
    //   parseInt(time.split(":")[0])===
    // ) {
    // } else {
    // }}
    // }
  }, [props.ohldata]);
  // console.log(props.ohldata);
  // function callOhl() {
  //   // console.log(props.niftyFiftyData);
  //   findohl("/findohl", props.niftyFiftyData)
  //     .then((res) => {
  //       let data = JSON.parse(JSON.stringify(res.data));

  //       // console.log(res);
  //       setohldata(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  function buycall(stkdata) {
    props.readData.forEach((item) => {
      if (item.symbol === `${stkdata.symbol}-EQ`) {
        let data = setBuyPriceTarget(stkdata, item);

        // console.log(item);
        // let percent = 0.75;
        // let diff = (0.1 / 100) * stkdata.ltp;
        // let totalpercentamount = (percent / 100) * stkdata.ltp;
        // let buyPrice = stkdata.low + diff;
        // let quantity = 0;
        // let triggerPrice = buyPrice - (0.2 / 100) * stkdata.ltp;
        // let stopLossPrice = triggerPrice - (0.05 / 100) * stkdata.ltp;

        // if (stkdata.ltp > 500 && stkdata.ltp < 1000) {
        //   quantity = 375;
        // } else if (stkdata.ltp > 1000 && stkdata.ltp < 1500) {
        //   quantity = 257;
        // } else if (stkdata.ltp < 500) {
        //   quantity = 452;
        // } else if (stkdata.ltp > 1500 && stkdata.ltp < 2200) {
        //   quantity = 125;
        // } else {
        //   quantity = 75;
        // }
        // let targetPrice = stkdata.ltp + totalpercentamount;

        // const data = {
        //   stockdata: item,
        //   price: stkdata.ltp,
        //   targetPrice: Math.round(targetPrice),
        //   buyPrice: Math.round(buyPrice),
        //   triggerPrice: Math.round(triggerPrice),
        //   stopLoss: Math.round(stopLossPrice),
        //   quantity: quantity,
        //   type: "BUY",
        // };

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
  function sellcall(stkdata) {
    // console.log(stkdata);
    props.readData.forEach((item) => {
      // console.log(item);
      if (item.symbol === `${stkdata.symbol}-EQ`) {
        let data = setSellPriceTarget(stkdata, item);
        // let percent = 0.75;
        // let diff = (0.1 / 100) * stkdata.ltp;
        // let totalpercentamount = (percent / 100) * stkdata.ltp;
        // let sellPrice = stkdata.high - diff;
        // let quantity = 0;
        // let triggerPrice = sellPrice + (0.2 / 100) * stkdata.ltp;
        // let stopLossPrice = triggerPrice + (0.05 / 100) * stkdata.ltp;

        // if (stkdata.ltp > 500 && stkdata.ltp < 1000) {
        //   quantity = 375;
        // } else if (stkdata.ltp > 1000 && stkdata.ltp < 1500) {
        //   quantity = 257;
        // } else if (stkdata.ltp < 500) {
        //   quantity = 452;
        // } else if (stkdata.ltp > 1500 && stkdata.ltp < 2200) {
        //   quantity = 125;
        // } else {
        //   quantity = 75;
        // }
        // let targetPrice = stkdata.ltp - totalpercentamount;

        // const data = {
        //   stockdata: item,
        //   price: stkdata.ltp,
        //   targetPrice: Math.round(targetPrice),
        //   sellPrice: Math.round(sellPrice),
        //   triggerPrice: Math.round(triggerPrice),
        //   stopLoss: Math.round(stopLossPrice),
        //   quantity: quantity,
        //   type: "SELL",
        // };
        // console.log(data);

        sellOriginalOrder("/sellorder", data)
          .then((response) => {
            if (response.data) {
              console.log(response.data);
              const orderPlacedData = { orderId: response.data };

              getOrderBook("/get_order_details", orderPlacedData)
                .then((res) => {
                  // console.log(res.data);
                  data["orderResponse"] = res.data;
                  props.dispatch(orderData(data));
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }
    });
  }

  // console.log(props.ohl);
  return (
    // <div
    //   style={{
    //     overflowX: "hidden",
    //   }}
    // >
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        maxHeight: "300px",
        marginLeft: "10px",
        gap: "50px",
        overflowX: "scroll",
        overflowY: "hidden",
      }}
    >
      <div class="stock-data-ohl">
        <h5>Open-High-Low Data</h5>
        {props.ohldata.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {props.ohldata.map((item, index) => {
              return (
                <Card
                  class="stock-data"
                  style={{
                    backgroundColor:
                      item.pos === "open-high" ? "#203647" : "rgb(95, 43, 43)",
                    maxHeight: "200px",
                    minWidth: "250px",
                    // border: "1px solid grey",
                    // textAlign: "initial",
                    // gap: "20px",
                    // borderRadius: "2.5%",
                  }}
                >
                  <Card.Header
                    style={{
                      backgroundColor: "inherit",
                    }}
                  >
                    {item.symbol} <b>{item.pos}</b>
                  </Card.Header>
                  {item.pos === "open-high" ? (
                    <Card.Body>
                      <Card.Title>
                        {" "}
                        O={item.open},H={item.high}
                      </Card.Title>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        LTP-{item.ltp}
                        <Button
                          variant="danger"
                          style={{
                            // backgroundColor: "#D76F30",
                            // width: "100%",
                            // height: "30px",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            sellcall(item);
                          }}
                        >
                          SELL
                        </Button>
                      </div>
                    </Card.Body>
                  ) : (
                    <Card.Body>
                      <Card.Title>
                        {" "}
                        O={item.open},L={item.low}
                      </Card.Title>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        LTP-{item.ltp}{" "}
                        <Button
                          variant="success"
                          style={{
                            // backgroundColor: "#6BB77B",
                            border: "none",

                            // width: "100%",
                            // height: "30px",
                            color: "white",
                          }}
                          onClick={() => {
                            buycall(item);
                          }}
                        >
                          BUY
                        </Button>
                      </div>
                    </Card.Body>
                  )}
                </Card>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
    // </div>
  );
}

const mapStateToProps = (state) => ({
  readData: state.DataCsv.jsonData,
  niftyFiftyData: state.NiftyData.niftyData,
  ohldata: state.Ohl.ohlData,

  // wholeData: state.DataCsv.jsonData,
});
export default connect(mapStateToProps, undefined)(SecondaryNav);
