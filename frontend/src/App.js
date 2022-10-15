import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Songs from "./components/Songs";
import CreatSongFrom from "./components/Navigation/CreateSong";
import UserPage from "./components/UserPage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState()
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
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
          <Route exact path='/'>
            <Songs />
          </Route>
          <Route path={"/songs/new" || "/:artistId/songs/new"} >
            <CreatSongFrom user={user} />
          </Route>
          <Route path='/:serId/songs'>
            <UserPage user={user}/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
