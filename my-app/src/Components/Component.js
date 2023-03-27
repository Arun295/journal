import React, { useEffect, useState } from "react";
import {
  getGainers,
  getLoosers,
  getJsonData,
  writeJson,
  getOrderBook,
  getStocktoken,
  findohl,
  getNiftyStocks,
  getNiftyStocksOhl,
} from "../userFunctions/UserFunctions";
import Navbar from "./Navbar";
import SecondaryNav from "./SecondaryNav";
import YestjsonData from "./YestjsonData";
import { connect } from "react-redux";
import { setOhldata, readData, niftyData } from "../actions/basicActions";
import MessageToast from "./MessageToast";

function Component(props) {
  const [topGainerData, settopGainerData] = useState([]);
  const [topLooserData, settopLooserData] = useState([]);
  const [topGainerDataReceived, settopGainerDataReceived] = useState(false);
  const [topLooserDataReceived, settopLooserDataReceived] = useState(false);
  const [startohl, setOhl] = useState(false);
  const [writejson, setWritejson] = useState(false);
  const [timer, settimer] = useState(false);
  const [niftystks, setNiftyStks] = useState([]);
  const date = new Date().toLocaleDateString();
  const [ytopGainerData, ysettopGainerData] = useState([]);
  const [ytopLooserData, ysettopLooserData] = useState([]);

  useEffect(() => {
    const MINUTE_MS = 7000;

    function fetchTopGainersData() {
      return getGainers("/topgainers")
        .then((res) => {
          // console.log(res);
          if (res.data) {
            settopGainerData(res.data);
            settopGainerDataReceived(true);

            return true;
          }
          // setGetjson(true);
        })
        .catch((err) => console.log(err));
    }
    function fetchTopLoosersData() {
      return getLoosers("/toploosers")
        .then((res) => {
          if (res.data) {
            settopLooserData(res.data);
            settopLooserDataReceived(true);

            return true;
          }
        })
        .catch((err) => console.log(err));
      // return true;
    }
    function fetchWholeData() {
      getStocktoken("/getwholedata")
        .then((response) => {
          if (response.data) {
            props.dispatch(readData(response.data));
          } else {
            console.log("No Response Data");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function fetchNiftyOhlData() {
      getNiftyStocksOhl("/get_nifty_fifty_stocks_ohl")
        .then((res) => {
          if (res.data.length > 0) {
            props.dispatch(setOhldata(res.data));
          } else {
            console.log("No Response Data");
          }
        })
        .catch((err) => console.log(err));
    }
    function fetchYJsonData() {
      getJsonData("/getjsonData")
        .then((res) => {
          // console.log(res.data);
          ysettopGainerData(res.data.yesterdaygainers);
          ysettopLooserData(res.data.yesterdayloosers);
        })
        .catch((err) => console.log(err));
    }

    // fetchTopGainersData();
    // fetchTopLoosersData();
    fetchWholeData();
    fetchYJsonData();
    // fetchNiftyOhlData();

    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      // console.log("hii");

      let z = fetchTopGainersData();
      let y = fetchTopLoosersData();
      fetchNiftyOhlData();

      // fetchYJsonData();
      // console.log(time);

      if (
        parseInt(time.split(":")[0]) >= 3 &&
        parseInt(time.split(":")[0]) !== 12 &&
        time.split(":")[2].includes("PM")
      ) {
        setWritejson(true);

        // console.log("writting json ");

        return () => clearInterval(interval);
      }
    }, MINUTE_MS);
  }, []);
  function writeYesterdayJsonData() {
    // console.log(topGainerData.length, topLooserData.length);

    if (topGainerData.length > 0 && topLooserData.length > 0) {
      console.log("writing data");
      writeJson("/writeYesterdayJsonData", {
        header: {
          ContentType: "application/json",
        },
        data: {
          yesterdaygainers: topGainerData,
          yesterdayloosers: topLooserData,
        },
      })
        .then((success) => {
          settopGainerDataReceived(true);
          settopLooserDataReceived(true);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("not writing");
    }
  }
  if (writejson) {
    if (!topGainerDataReceived && !topGainerDataReceived) {
      writeYesterdayJsonData();
    }
  }

  function haultExecution() {}

  //   // return <span>{z}</span>;
  // }
  // console.log(props.niftyFiftyData);
  return (
    <div class="main-component">
      {props.orderPlaced ? <MessageToast /> : null}

      <div class="sub-main-component">
        <Navbar />
        <div style={{}}>
          <SecondaryNav niftystks={niftystks} />
        </div>

        <div class="gain-loose-data-y">
          <h2>Yesterday's Data </h2>
          {writejson ? <p>Yesterdays topGainers&Loosers was Updated</p> : null}
          <YestjsonData
            tod_g={topGainerData}
            tod_l={topLooserData}
            ytopGainerData={ytopGainerData}
            ytopLooserData={ytopLooserData}
          />
        </div>
      </div>

      <h2>Todays Data</h2>

      <div
        class="today-table"
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "300px",
          width: "100%",
          // backgroundColor: "inherit",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        <div
          class="titles"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            // backgroundColor: "red",
          }}
        >
          <h3>Top Gainers</h3>
          <div
            class="gain-loose-data-y"
            style={{
              overflowY: "scroll",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              // flexDirection: "column  ",
            }}
          >
            <table class="table table-success table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Sno</th>
                  <th scope="col">Symbol</th>
                  <th scope="col">OPEN</th>

                  <th scope="col">HIGH</th>
                  <th scope="col">Last Price</th>
                  <th scope="col">Low</th>
                  <th scope="col">Y-day price</th>
                  <th scope="col">MA</th>
                </tr>
              </thead>
              <tbody>
                {topGainerData.map((item, index) => {
                  return (
                    <tr style={{ height: "50px" }}>
                      <th scope="row">{index}</th>
                      <td>{item.symbol}</td>
                      <td>{item.openPrice}</td>
                      <td>{item.highPrice}</td>
                      <td>{item.ltp}</td>
                      <td>{item.lowPrice}</td>
                      <td>{item.previousPrice}</td>
                      <td>{parseInt(item.ma)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="titles"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h3>Top Loosers</h3>

          <div style={{ overflowY: "scroll" }}>
            <table class="table table-danger table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Sno</th>
                  <th scope="col">Symbol</th>
                  <th scope="col">OPEN</th>

                  <th scope="col">HIGH</th>
                  <th scope="col">Last Price</th>
                  <th scope="col">Low</th>
                  <th scope="col">Y-day price</th>
                  <th scope="col">MA</th>
                </tr>
              </thead>
              <tbody>
                {topLooserData.map((item, index) => {
                  return (
                    <tr style={{ height: "50px" }}>
                      <th scope="row">{index}</th>
                      <td>{item.symbol}</td>
                      <td>{item.openPrice}</td>
                      <td>{item.highPrice}</td>
                      <td>{item.ltp}</td>
                      <td>{item.lowPrice}</td>
                      <td>{item.previousPrice}</td>
                      <td>{parseInt(item.ma)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          haultExecution();
        }}
      >
        Stop Execution
      </button>
      {/* <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  orderPlaced: state.Order.orderPlaced,
  niftyFiftyData: state.NiftyData.niftyData,

  // logData: state.Log.logData,
});

export default connect(mapStateToProps, undefined)(Component);
