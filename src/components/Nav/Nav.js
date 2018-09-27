import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/list">
            List
          </Link>
        </li>
        <li>
          <Link to="/stores">
            Stores
          </Link>
        </li>
        <li>
          <Link to="/more">
            More
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
