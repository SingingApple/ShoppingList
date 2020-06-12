import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";
import { NavLink } from "reactstrap";
const Logout = () => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <NavLink onClick={() => dispatch(logout())}>Logout</NavLink>
    </React.Fragment>
  );
};
export default Logout;
