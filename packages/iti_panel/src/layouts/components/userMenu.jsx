import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, Button, Dropdown, DropdownDivider, Form, InputGroup, ListGroup, Offcanvas, } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

export const UserMenu = () => {
    const authUser = useSelector((state) => state.loginUserReducer);
  console.log(authUser.userType);
  return (
    <Dropdown.Menu className="main-header-dropdown pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end">
      <div className="header-navheading border-bottom">
        <h6 className="main-notification-title">User</h6>
        <p className="main-notification-text mb-0">{authUser.userType.toUpperCase()}</p>
      </div>
      <Dropdown.Item as={Link} to="#profile" className="d-flex">
        <i className="fe fe-user fs-16 align-middle me-2"></i>Profile
      </Dropdown.Item>
      {/* <Dropdown.Item as={Link} to="#inbox" className="d-flex">
                  <i className="fe fe-inbox fs-16 align-middle me-2"></i>Inbox{" "}
                  <span className="badge bg-success ms-auto">25</span>
                </Dropdown.Item> */}
      <Dropdown.Item
        as={Link}
        to="#activity"
        className=" d-flex border-block-end"
      >
        <i className="fe fe-compass fs-16 align-middle me-2"></i>
        Activity
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="#Settings" className="d-flex">
        <i className="fe fe-settings fs-16 align-middle me-2"></i>
        Settings
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="#Support" className="d-flex">
        <i className="fe fe-headphones fs-16 align-middle me-2"></i>
        Support
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/" className="d-flex">
        <i className="fe fe-power fs-16 align-middle me-2"></i>Log Out
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};
// const Header = () => {}
// const mapStateToProps = (state) => ({
//   local_varaiable: state,
// });

// export default connect(mapStateToProps, { ThemeChanger })(Header);
