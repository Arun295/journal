// import { getStocktoken } from "../userFunctions/UserFunctions";
import { connect } from "react-redux";
import { orderData } from "../actions/basicActions";
import {
  buyOriginalOrder,
  getOrderBook,
  sellOriginalOrder,
  setBuyPriceTarget,
  setSellPriceTarget,
} from "../userFunctions/UserFunctions";

function StockCard(props) {
  function sellOrder(stkdata) {
    props.wholeData.forEach((item) => {
      if (item.symbol === `${stkdata.name}-EQ`) {
        let data = setSellPriceTarget(stkdata, item);

        // let percent = 0.75;
        // let diff = (0.1 / 100) * props.current;
        // let totalpercentamount = (percent / 100) * props.current;
        // let sellPrice = props.high - diff;
        // let quantity = 0;
        // let triggerPrice = sellPrice + (0.2 / 100) * props.current;
        // let stopLossPrice = triggerPrice + (0.05 / 100) * props.current;

        // if (props.current > 500 && props.current < 1000) {
        //   quantity = 375;
        // } else if (props.current > 1000 && props.current < 1500) {
        //   quantity = 257;
        // } else if (props.current < 500) {
        //   quantity = 452;
        // } else if (props.current > 1500 && props.current < 2200) {
        //   quantity = 125;
        // } else {
        //   quantity = 75;
        // }
        // let targetPrice = props.current - totalpercentamount;

        // const data = {
        //   stockdata: item,
        //   price: props.current,
        //   targetPrice: Math.round(targetPrice),
        //   triggerPrice: Math.round(triggerPrice),
        //   stopLoss: Math.round(stopLossPrice),
        //   sellPrice: Math.round(sellPrice),
        //   quantity: quantity,
        //   type: "SELL",
        // };

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
        let data = setBuyPriceTarget(stkdata, item);

        // let percent = 0.75;
        // let diff = (0.1 / 100) * props.current;
        // let totalpercentamount = (percent / 100) * props.current;
        // let buyPrice = props.low + diff;
        // let quantity = 0;
        // let triggerPrice = buyPrice - (0.2 / 100) * props.current;
        // let stopLossPrice = triggerPrice - (0.05 / 100) * props.current;

        // if (props.current > 500 && props.current < 1000) {
        //   quantity = 375;
        // } else if (props.current > 1000 && props.current < 1500) {
        //   quantity = 257;
        // } else if (props.current < 500) {
        //   quantity = 452;
        // } else if (props.current > 1500 && props.current < 2200) {
        //   quantity = 125;
        // } else {
        //   quantity = 75;
        // }
        // let targetPrice = props.current + totalpercentamount;

        // const data = {
        //   stockdata: item,
        //   price: props.current,
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
  return (
    <div
      style={{
        minWidth: "250px",
        width: "250px",
        height: "150px",
        borderRadius: "1.5%",
        backgroundColor: props.type === "Gainer" ? "#476778d4" : "#ce4158",
        color: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <h5 style={{ color: props.type === "Gainer" ? "#66f12a" : "#e9b8bc" }}>
          {props.type}
        </h5>
        :<h5 style={{ color: "white" }}>{props.name}</h5>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <p> LTP-{props.current}</p>
          <p>OPEN-{props.open}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <p> HIGH-{props.high}</p>
          <p>LOW-{props.low}</p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        {props.type === "Gainer" ? (
          <button
            style={{
              border: "none",
              height: "50px",
              // textAlign: "center",
              color: "White",
              width: "100%",
              backgroundColor: "#D76F30",
            }}
            onClick={() => {
              sellOrder(props);
            }}
          >
            Sell
          </button>
        ) : (
          <button
            style={{
              border: "none",
              height: "50px",
              color: "White",
              width: "100%",
              backgroundColor: "#6BB77B",
            }}
            onClick={() => {
              buyOrder(props);
            }}
          >
            Buy
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  LogIn: state.Log.IsLogged,
  token: state.Log.token,
  wholeData: state.DataCsv.jsonData,
  refreshToken: state.Log.refreshToken,
  // logData: state.Log.logData,
});

export default connect(mapStateToProps, undefined)(StockCard);
