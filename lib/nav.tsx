"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={"/"}>해당금 프로젝트 (Haedangeum)</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href={"/helper"}>VBIF Helper</Nav.Link> */}
            <Nav.Link href={"/materials"}>List of Material</Nav.Link>
            <NavDropdown title="VBIF" id="basic-nav-dropdown">
              <NavDropdown.Item href="/vbif/howtouse">
                howtouse
              </NavDropdown.Item>
              <NavDropdown.Item href="/vbif/helper">helper</NavDropdown.Item>
              <NavDropdown.Item href="/vbif/analyzer">
                analyzer
              </NavDropdown.Item>
            </NavDropdown>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
