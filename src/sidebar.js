import React, { Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
// import NavItem from 'react-bootstrap/lib/NavItem';

function User() {
  return <div>
          <p>Hello,User</p>
        </div>;
}

class Sidebar extends Component {
  render() {
    return (
        <nav id="sidebar">
           <div>
              <h3>平台商品上架系統</h3>
           </div>
          <User />
          <Nav>
            <NavDropdown eventKey={2} title="暫存提案">
              <MenuItem eventKey={2.1}>Yahoo</MenuItem>
              <MenuItem eventKey={2.2}>momo</MenuItem>
            </NavDropdown>
            <NavItem eventKey={3} href="#">提案表單</NavItem>
          </Nav> 
        </nav>
    )
  }
}

export default Sidebar;