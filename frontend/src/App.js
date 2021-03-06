import {Redirect, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { sessionRestoreUser } from './store/session';
import { genSongs } from './store/song';

import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import HomeView from './components/HomeView';
import SwarmPlayer from './components/SwarmPlayer';

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
      dispatch(sessionRestoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

   const sessionUser = useSelector((state) => state.session.user);

  return (
    isLoaded && (
      <>
        <Navigation isLoaded={isLoaded} />
        <Switch>
          <Route path="/" exact>
            {sessionUser ? <Redirect to="songs" / > : <Redirect to="/welcome" />}
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/songs">
            {sessionUser ?  <></>: <Redirect to="/welcome" />}
            <HomeView />
          </Route>
        </Switch>
        {sessionUser ? <SwarmPlayer /> : <></>}
      </>
    )
  );
}

export default App;
