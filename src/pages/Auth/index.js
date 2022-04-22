import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import config from '../../library/config';
import { useDocumentTitle } from '../../library/customHooks';
import { getUserProfile } from '../../library/fetchApi';
import { login } from '../../slice/authSlice';
import { AiOutlineLogin } from "react-icons/ai";

export default function Auth() {
  const dispatch = useDispatch();
  const history = useHistory();
  useDocumentTitle('Auth');

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');
    const expiredDateParams = new URLSearchParams(window.location.hash).get('expires_in');

    if (accessTokenParams !== null) {
      const setUserProfile = async () => {
        try {
          const responseUser = await getUserProfile(accessTokenParams);

          dispatch(login({
            accessToken: accessTokenParams,
            expiredDate: +new Date() + expiredDateParams * 1000,
            user: responseUser,
          }));

          history.push('/create-playlist');
        } catch (error) {
          toast.error(error.message);
        }
      }

      setUserProfile();
    }
  }, [dispatch, history]) ;

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return 'https://accounts.spotify.com/authorize?' + 
      `client_id=${clientId}` +
      `&response_type=token` +
      `&redirect_uri=${config.HOST}` +
      `&state=${state}` +
      `&scope=${config.SPOTIFY_SCOPE}`;
  }

  return (
    <main className="center">
      <div className='flex h-screen'>
        <div className="m-auto ">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-sky-600 uppercase mb-10">GRAMOFON</h1>
            <p className="text-xl font-bold mb-5 text-white">
              Click the button for login
            </p>
            <a href={getSpotifyLinkAuthorize()} external>
              <button className="py-3 px-10 font-semibold text-white bg-sky-600 hover:bg-sky-800 rounded">
                Login <AiOutlineLogin className="inline" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}