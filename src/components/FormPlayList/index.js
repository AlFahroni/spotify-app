import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../library/fetchApi';
import Input from '../Input';
import InputGroup from '../InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slice/authSlice';
import { IoCreate } from "react-icons/io5";

export default function CreatePlaylistForm({ uriTracks }) {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const userId = useSelector((state) => state.auth.user.id);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
      title: '',
      description: '',
    });
    const [errorForm, setErrorForm] = useState({
      title: '',
      description: '',
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
      setErrorForm({ ...errorForm, [name]: '' });
    }
    const validateForm = () => {
      let isValid = true;
      if (form.title.length < 10) {
        setErrorForm({
          ...errorForm,
          title: 'Title must have more than 10 characters'
        });
        isValid = false;
      }
      if (form.description.length > 100) {
        setErrorForm({
          ...errorForm,
          description: 'The description must contain at least 10 characters more'
        });
        isValid = false;
      }
      return isValid;
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        if (uriTracks.length > 0) {
            try {
                const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
                name: form.title,
                description: form.description,
                });
                await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);
                toast.success('Playlist has been created successfully');
                setForm({ title: '', description: '' });
            } catch (error) {
              if (error.response.status === 401) {
                dispatch(logout());
              } else {
                toast.error(error.message);
              }
            }
            } else {
            toast.error('Choose a song first');
            }
      }
    }
    return (
      <div className="container mx-auto">

      <div>
        <div>
          <h2 className="container mx-auto text-xl font-semibold py-4 text-white">
            Create Playlist
          </h2>
          <form className="form form-playlist" onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                label="Title"
                placeholder="Title of playlist"
                value={form.title}
                id="title-playlist"
                name="title"
                onChange={handleChange}
                error={errorForm.title}
                className="w-full block border-2 rounded-lg border-white py-3 px-4 mb-3 bg-black text-white"
                required
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="textarea"
                label="Description"
                placeholder="Description of playlist"
                value={form.description}
                id="description-playlist"
                name="description"
                onChange={handleChange}
                required
                error={errorForm.description}
                className="w-full block border-2 rounded-lg border-white px-2 py-1 bg-black text-white"
              />
            </InputGroup>
            <div className="form-playlist__action">
              <button
                type="submit"
                className="w-full py-3 px-4 mb-20 mt-8 bg-sky-600 text-white hover:bg-sky-800 hover:text-sky-600 hover:font-semibold rounded-lg my-4 text-end"
              >
                Create <IoCreate className="inline ml-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      
    );

};
