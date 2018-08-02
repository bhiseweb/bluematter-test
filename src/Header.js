import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Nav bsStyle="pills" >
          <IndexLinkContainer to="/">
            <NavItem eventKey={1}>Dashboard</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/client">
            <NavItem eventKey={2}>Clients</NavItem>
          </LinkContainer>
          <LinkContainer to="/expert">
            <NavItem eventKey={3}>Experts</NavItem>
          </LinkContainer>
        </Nav>
      </div>
    );
  }
}

export default Header;

