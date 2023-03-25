import React, { useEffect, useState } from "react";
import { loger, setCanvas } from "../actions/basicActions";
import { login } from "../userFunctions/UserFunctions";
import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";

import ModalAlert from "./ModalAlert";
import { Link } from "react-router-dom";
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
        class="navbar"
        style={{
          backgroundColor: "inherit",
          color: "white",
          borderBottom: "0.5px solid white",
        }}
      >
        <div class="container">
          <a class="navbar-brand" href="#" style={{ color: "white" }}>
            Market Automation
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
          <Nav className="me-auto">
            <Link
              style={{
                color: "White",
                width: "95px",
                textDecoration: "none",
                borderLeft: "0.5px solid white",
                borderRight: "0.5px solid white",
                textAlign: "center",
              }}
              to="/orderpage"
            >
              Orders
            </Link>
          </Nav>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, undefined)(Navbar);
