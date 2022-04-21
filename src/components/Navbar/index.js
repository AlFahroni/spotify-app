import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slice/authSlice';
import { AiOutlineLogout } from "react-icons/ai";

export default function Navbar() {
    const dispatch = useDispatch();

    return (
      <nav className="navbar bg-black">
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-2">
            <span className="text-3xl font-bold text-sky-600 uppercase justify-self-start">
              spotify
            </span>
            <button
              onClick={() => dispatch(logout())}
              className="py-3 px-8 mb-20 rounded justify-self-end bg-sky-600 text-white hover:font-semibold hover:bg-sky-800 "
            >
              Logout <AiOutlineLogout className="inline hover:font-bold" />
            </button>
          </div>
        </div>
      </nav>
    );
  }