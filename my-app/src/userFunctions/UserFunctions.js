import axios from "../axios/axios";
export const getGainers = (url) => {
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getLoosers = (url) => {
  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

// export const getMovingAvg = (url, data) => {
//   // console.log(data);
//   return axios
//     .post(url, data)
//     .then((response) => {
//       if (response.data) {
//         return response.data;
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const login = (url) => {
  // console.log(data);
  return axios
    .get(url)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getJsonData = (url) => {
  // console.log(data);
  return axios
    .get(url)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const writeJson = (url, data) => {
  // console.log(data);
  return axios
    .post(url, data)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getStocktoken = (url) => {
  // console.log(data);
  return axios
    .get(url)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export const buyOriginalOrder = (url, data) => {
  // console.log(data);
  return axios
    .post(url, data)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export const sellOriginalOrder = (url, data) => {
  // console.log(data);
  return axios
    .post(url, data)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getNiftyStocksOhl = (url) => {
  // console.log(data);
  return axios
    .get(url)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export const findohl = (url, data) => {
  // console.log(data);
  return axios
    .post(url, data)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getOrderBook = (url, data) => {
  // console.log(data);
  return axios
    .post(url, data)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getStockDetails = (url, data) => {
  // console.log(data);
  return axios
    .post(url, data)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPositions = (url) => {
  // console.log(data);
  return axios
    .get(url)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export const exitBuyOrder = (url, data) => {
  // console.log(data);
  return axios
    .post(url, data)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
export const exitSellOrder = (url, data) => {
  // console.log(data);
  return axios
    .post(url, data)
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setSellPriceTarget = (stkdata, item) => {
  if (item) {
    let percent = 0.75;
    let diff = (0.1 / 100) * stkdata.ltp;
    let totalpercentamount = (percent / 100) * stkdata.ltp;
    let sellPrice = stkdata.high - diff;
    let quantity = 0;
    let triggerPrice = sellPrice + (0.2 / 100) * stkdata.ltp;
    let stopLossPrice = triggerPrice + (0.05 / 100) * stkdata.ltp;

    if (stkdata.ltp > 500 && stkdata.ltp < 1000) {
      quantity = 375;
    } else if (stkdata.ltp > 1000 && stkdata.ltp < 1500) {
      quantity = 257;
    } else if (stkdata.ltp < 500) {
      quantity = 452;
    } else if (stkdata.ltp > 1500 && stkdata.ltp < 2200) {
      quantity = 125;
    } else {
      quantity = 75;
    }
    let targetPrice = stkdata.ltp - totalpercentamount;

    const data = {
      stockdata: item,
      price: stkdata.ltp,
      targetPrice: Math.round(targetPrice),
      sellPrice: Math.round(sellPrice),
      triggerPrice: Math.round(triggerPrice),
      stopLoss: Math.round(stopLossPrice),
      quantity: quantity,
      type: "SELL",
    };
    return data;
  } else {
    // console.log(stkdata);
    let totalpercentamount = (0.75 / 100) * stkdata;
    let stopLossPrice = stkdata + (0.15 / 100) * stkdata;

    let targetPrice = stkdata - totalpercentamount;

    const data = {
      price: stkdata,
      targetPrice: Math.round(targetPrice),
      stopLoss: Math.round(stopLossPrice),
      type: "SELL",
    };
    return data;
  }

  // console.log(data);
};
export const setBuyPriceTarget = (stkdata, item) => {
  if (item) {
    let percent = 0.75;
    let diff = (0.1 / 100) * stkdata.ltp;
    let totalpercentamount = (percent / 100) * stkdata.ltp;
    let buyPrice = stkdata.low + diff;
    let quantity = 0;
    let triggerPrice = buyPrice - (0.2 / 100) * stkdata.ltp;
    let stopLossPrice = triggerPrice - (0.15 / 100) * stkdata.ltp;

    if (stkdata.ltp > 500 && stkdata.ltp < 1000) {
      quantity = 375;
    } else if (stkdata.ltp > 1000 && stkdata.ltp < 1500) {
      quantity = 257;
    } else if (stkdata.ltp < 500) {
      quantity = 452;
    } else if (stkdata.ltp > 1500 && stkdata.ltp < 2200) {
      quantity = 125;
    } else {
      quantity = 75;
    }
    let targetPrice = stkdata.ltp + totalpercentamount;

    const data = {
      stockdata: item,
      price: stkdata.ltp,
      targetPrice: Math.round(targetPrice),
      buyPrice: Math.round(buyPrice),
      triggerPrice: Math.round(triggerPrice),
      stopLoss: Math.round(stopLossPrice),
      quantity: quantity,
      type: "BUY",
    };
    // console.log(data);
    return data;
  } else {
    let totalpercentamount = (0.75 / 100) * stkdata;
    let stopLossPrice = stkdata - (0.15 / 100) * stkdata;
    let targetPrice = stkdata + totalpercentamount;

    const data = {
      price: stkdata,
      targetPrice: Math.round(targetPrice),
      stopLoss: Math.round(stopLossPrice),
      type: "BUY",
    };
    // console.log(data);
    return data;
  }
};
