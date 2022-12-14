import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import { getAllSongsThunkCreator } from "./store/songs";

import Songs from "./components/Songs";
import CreatSongFrom from "./components/CreateSong";
import UserPage from "./components/UserPage";
import SingleSongPage from "./components/Songs/SingleSongPage";
import Player from "./components/AudioPlayer";
import UserLoginPage from "./components/UserLoginPage";
import AllAlbums from "./components/Albums";
import SingleAlbum from "./components/SingleAlbum";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState()
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getAllSongsThunkCreator())
  }, [dispatch]);


  //listeing if the user is logged in or not
  const user = useSelector(state => state.session.user)
  
  useEffect(() => {
    if(user) setIsLoggedIn(true)
    if(user === null) setIsLoggedIn(false)
  },[user])

  return (
    <>
      <Navigation user={user} isloggedIn={isLoggedIn} isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Songs />
          </Route>

          <Route path="/logged-in">
            <UserLoginPage user={user} />
          </Route>

          <Route exact strict path="/songs/new">
            <CreatSongFrom user={user} />
          </Route>

          <Route path="/songs/:songId">
            <SingleSongPage />
          </Route>
          
          <Route path="/albums/:Id">
            <SingleAlbum />
          </Route>

          <Route path="/albums">
            <AllAlbums user={user} />
          </Route>


          <Route path="/:userId/songs">
            <UserPage user={user} />
          </Route>

          <Route path="/:userId">
            <UserLoginPage user={user}/>
          </Route>
        </Switch>
      )}
      <Player />
    </>
  );
}

export default App;
