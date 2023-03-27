import React, { useEffect, useState } from "react";
import { loger, setCanvas } from "../actions/basicActions";
import { login } from "../userFunctions/UserFunctions";
import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";
import { NavDropdown } from "react-bootstrap";
import ModalAlert from "./ModalAlert";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
function Navbar(props) {
  const [modal, setmodal] = useState(false);
  function LoginUser() {
    login("/login")
      .then((response) => {
        if (response.data.status === "Success") {
          props.dispatch(loger(response.data));

          setmodal(true);
        }
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function openCanvas() {
    props.dispatch(setCanvas(true));
  }
  // console.log(modal);

  return (
    <div>
      <nav
        class=""
        style={{
          backgroundColor: "inherit",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: "65px",

          borderBottom: "0.5px solid grey",
        }}
      >
        <a
          class="navbar-brand"
          href="#"
          style={{
            textShadow: "2px solid black",
            color: "#e43323",
            // fontFamily:
            //   "sans-serif, 'Helvetica Neue', 'Lucida Grande', Arial",
            // fontStretch: "expanded",
          }}
        >
          <h4>
            <strong>MA</strong> Market Automation
          </h4>
        </a>

        {/* <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form> */}
        <ModalAlert show={modal} />
        {/* <Nav className="me-auto"> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "70%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              style={{
                color: "#EEFBFB",
                width: "95px",
                textDecoration: "none",
                // borderLeft: "0.5px solid white",
                // borderRight: "0.5px solid white",
                //https://bullsarenatrading.com/trading-strategies/best-intraday-strategy/
                textAlign: "center",
              }}
              to="/orderpage"
            >
              <h6>Orders & Positions</h6>
            </Link>
            <h6>
              <NavDropdown title="Strategies" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  GapUp& Gapdown
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </h6>
          </div>

          <Button
            variant="success"
            style={{
              height: "40px",
              textAlign: "center",
              alignItems: "center",
              width: "140px",
            }}
          >
            Login
          </Button>
        </div>

        {/* </Nav> */}
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, undefined)(Navbar);
