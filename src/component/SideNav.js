import React, { Component } from 'react';

class SideNav extends Component {
  render() {
    return (
        <nav id="sidebar">
            <div>header</div>
            <div>menu1</div>
            <div className="submenu">
                <a href="#">menu1.1</a>
                <a href="#">menu1.2</a>
                <a href="#">menu1.3</a>
            </div>
            <div>menu2</div>
            <div className="submenu">
                <a href="#">menu2.1</a>
                <a href="#">menu2.2</a>
            </div>
        </nav>
    )
  }
}

export default SideNav;
