import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slice/authSlice';

export default function Navbar() {
    const dispatch = useDispatch();

    return (
      <nav className="navbar">
        <div className="container navbar__nav">
          <div className="navbar__menu">
            <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
        </div>
      </nav>
    )
  }