import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      setDropdownTrigger,
      dropdownIsOpen,
      setDropdownContent
    } = this.props;

    return (
      <div className={`dropdown ${!!dropdownIsOpen ? 'is-active' : ''}`}>
        <div className="dropdown-trigger">{setDropdownTrigger()}</div>
        <div class="dropdown-menu" id="dropdown-menu3" role="menu">
          <div class="dropdown-content">{setDropdownContent()}</div>
        </div>
      </div>
    );
  }
}
