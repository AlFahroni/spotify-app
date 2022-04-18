import React, { useState } from 'react';
import Input from '../Input';
import { searchTrack } from '../../library/fetchApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function SearchBar({ onSuccess, onClearSearch}) {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [text, setText] = useState('');
    const [isClear, setIsClear] = useState(true);
  
  const handleInput = (e) => {
    setText(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    const response = await searchTrack(text, accessToken);
    const tracks = response.tracks.items;
    onSuccess(tracks);
    setIsClear(false);
  } catch (e) {
    toast.error(e);
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
          className="form-search__input"
          required
          value={text}
          onChange={handleInput}
        />
        <button className='button-search' type="submit">Search</button>
    </form>

    {!isClear && (
        <button className='button-search' onClick={handleClear}>Clear search</button>
        )}
      </div>
    )
    }