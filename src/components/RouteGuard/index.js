import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function RouteGuard({ children, type, ...props }) {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  if (type === 'guest') {
    return (
      <Route {...props}>
        {!isAuthorized ? children : <Redirect to="/create-playlist" />}
      </Route>
    )
  }

  return (
    <Route {...props}>
      {isAuthorized ? children : <Redirect to="/" />}
    </Route>
  )
}
