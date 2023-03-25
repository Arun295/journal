import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import StockCard from "./StockCard";
import { connect } from "react-redux";
import { setCanvas } from "../actions/basicActions";
function Cannvas(props) {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);

  const handleClose = () => {
    props.dispatch(setCanvas(false));
  };
  useEffect(() => {
    if (props.gdata.length > 0 || props.ldata.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [props]);
  console.log(props.canvas);

  //   const handleShow = () => setShow(true);

  return (
    <>
      <Offcanvas
        show={props.canvas}
        onHide={() => {
          handleClose();
        }}
        placement={"end"}
        style={{
          backgroundColor: "#ffffffd4",
          width: "25%",
          // height: "50px",
        }}
      >
        <Offcanvas.Header
          style={{ height: "50px", backgroundColor: "#ab65f1", color: "white" }}
          closeButton
        >
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          {/* <button
            onClick={() => {
              showCanvas();
            }}
          >
            b
          </button> */}
        </Offcanvas.Header>
        <Offcanvas.Body>
          {props.gdata.length > 0
            ? props.gdata.map((item, index) => {
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
          {props.ldata.length > 0
            ? props.ldata.map((item, index) => {
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

// const mapStateToProps = (state) => ({
//   canvas: state.Log.IsLogged,

//   // logData: state.Log.logData,
// });

// export default connect(mapStateToProps, undefined)(Cannvas);

const mapStateToProps = (state) => ({
  canvas: state.Log.canvas,
});
export default connect(mapStateToProps, undefined)(Cannvas);

// export default Cannvas;

// function Cannvas() {
//   return (
//     <>
//       <OffCanvasExample key={0} placement={"top"} name={"top"} />
//     </>
//   );
// }

// export default Cannvas;
