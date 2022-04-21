import React, { useState } from 'react';
import Input from '../Input';
import { searchTrack } from '../../library/fetchApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slice/authSlice';
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";

export default function SearchBar({ onSuccess, onClearSearch}) {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [text, setText] = useState('');
    const [isClear, setIsClear] = useState(true);
    const dispatch = useDispatch();
  
  const handleInput = (e) => {
    setText(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    const response = await searchTrack(text, accessToken);
    const tracks = response.tracks.items;
    onSuccess(tracks, text);
    setIsClear(false);
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(logout());
    } else {
      toast.error(error.message);
    }
  }
  }
  const handleClear = () => {
    onClearSearch();
    setText('');
    setIsClear(true);
  }
  return (
    <div>
      <form className="form-search" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Search..."
          required
          value={text}
          onChange={handleInput}
          className="border-2 border-white px-2 py-3 mt-10 rounded-lg bg-black text-white mb-4"
        />
        {!isClear && (
          <button className="align-middle ml-4 " onClick={handleClear}>
            <AiFillCloseCircle
              color="red"
              className="text-white"
              fontSize={30}
            />
          </button>
        )}

        <button
          className="py-3 px-8 mb-20 ml-4 bg-sky-600 rounded text-white hover:bg-sky-800 inline hover:scale-95"
          type="submit"
        >
          Search <BiSearchAlt className="inline" />
        </button>
      </form>
    </div>
  );
}