import React, { useEffect, useState } from "react";
import { getJsonData } from "../userFunctions/UserFunctions";
import StockCard from "./StockCard";
import { connect } from "react-redux";
function YestjsonData(props) {
  const [matchedgainData, setMatchedgainData] = useState([]);
  const [matchedlooseData, setMatchedlooseData] = useState([]);

  // const [cannvas, setcannvas] = useState(false);
  // function fetchYJsonData() {
  //   getJsonData("/getjsonData")
  //     .then((res) => {
  //       ysettopGainerData(res.data.yesterdaygainers);
  //       ysettopLooserData(res.data.yesterdayloosers);
  //     })
  //     .catch((err) => console.log(err));
  // }

  useEffect(() => {
    // fetchYJsonData();

    if (props.tod_g.length > 0) {
      let data = [];
      props.tod_g.forEach((item) => {
        props.ytopGainerData.forEach((yitem) => {
          if (item.symbol === yitem.symbol) {
            // console.log(item.symbol);
            data.push({
              symbol: item.symbol,
              open: item.openPrice,
              high: item.highPrice,
              low: item.lowPrice,
              current: item.ltp,
            });
          }
        });
      });
      // console.log(data);
      setMatchedgainData(data);
    }

    if (props.tod_l.length > 0) {
      let data = [];
      props.tod_l.forEach((item) => {
        props.ytopLooserData.forEach((yitem) => {
          if (item.symbol === yitem.symbol) {
            data.push({
              symbol: item.symbol,
              open: item.openPrice,
              high: item.highPrice,
              low: item.lowPrice,
              current: item.ltp,
            });
          }
        });
      });
      // console.log(data);
      setMatchedlooseData(data);
    }
  }, [props]);

  // console.log(props, matchedgainData);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <h5>Recomendations</h5>
        {matchedgainData.length !== 0 || matchedlooseData.length !== 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              gap: "10px",
              overflowX: "scroll",
              overflowY: "hidden",
            }}
          >
            {matchedgainData.length > 0
              ? matchedgainData.map((item, index) => {
                  return (
                    <StockCard
                      type={"Gainer"}
                      name={item.symbol}
                      open={item.open}
                      high={item.high}
                      low={item.low}
                      current={item.current}
                    />
                  );
                })
              : null}
            {matchedlooseData.length > 0
              ? matchedlooseData.map((item, index) => {
                  return (
                    <StockCard
                      type={"Looser"}
                      name={item.symbol}
                      open={item.open}
                      high={item.high}
                      low={item.low}
                      current={item.current}
                    />
                  );
                })
              : null}
          </div>
        ) : null}
      </div>
      <div
        class="today-table"
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "300px",
          width: "100%",
          flexDirection: "row",
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
          }}
        >
          <h3>Tog Gainers</h3>
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
            <table class="table table-primary table-striped table-hover">
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
                {props.ytopGainerData.map((item, index) => {
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
            <table class="table table-warning table-striped table-hover">
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
                {props.ytopLooserData.map((item, index) => {
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
    </div>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, undefined)(YestjsonData);
