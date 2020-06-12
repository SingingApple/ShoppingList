import React, { useState } from "react";

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

const AppNavbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler onClick={() => setToggle(!toggle)}></NavbarToggler>
          <Collapse isOpen={toggle} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <RegisterModal></RegisterModal>
              </NavItem>
              <NavItem>
                <Logout></Logout>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
