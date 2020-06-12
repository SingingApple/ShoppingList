import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import RegisterModal from "./Auth/RegisterModal";
import Logout from "./Auth/Logout";
import LoginModal from "./Auth/LoginModal";

const AppNavbar = () => {
  const [toggle, setToggle] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler onClick={() => setToggle(!toggle)}></NavbarToggler>
          <Collapse isOpen={toggle} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? (
                <React.Fragment>
                  <NavItem>
                    <span className="navbar-text-mr-3">
                      <strong>Welcome {user.name} </strong>
                    </span>
                  </NavItem>
                  <NavItem>
                    <Logout></Logout>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem>
                    <RegisterModal></RegisterModal>
                  </NavItem>
                  <NavItem>
                    <LoginModal></LoginModal>
                  </NavItem>
                </React.Fragment>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
