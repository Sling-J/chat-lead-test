import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import SignUp from './pages/signUp/signUp';
import Auth from './pages/auth/auth';
import Bots from './pages/bots/bots';
import SingleBot from './pages/singleBot/singleBot';
import Autoride from './pages/autoride/autoride';
import BroadCast from './pages/broadcast/broadcast';
import {Dialog} from './pages/dialog/dialog';
import onlyAutorizenUsers from './componens/hoc/onlyAutorizedUsers';
import onlyDontRegistrationUsers from './componens/hoc/onlyNotRegistration';
import BotSetup from './pages/botSetup/botSetup';
import NotFound from './pages/inDevelopment/inDevelopment';
import Statistics from "./pages/statistics/statistics";

const App = () => (
   <Router>
      <div>
         <Switch>
            <Route exact path={"/"} render={() => (
               <Redirect to={'/signUp'}/>
            )}/>
            <Route exact path={"/forgotPassword"} render={() => (
               <Redirect to={'/signUp'}/>
            )}/>
            <Route
               exact
               path={"/signUp"}
               component={onlyDontRegistrationUsers(SignUp)}
            />
            <Route
               exact
               path={"/auth"}
               component={onlyDontRegistrationUsers(Auth)}
            />
            <Route
               exact
               path={"/bots"}
               component={onlyAutorizenUsers(Bots)}
            />
            <Route
               exact
               path={"/bots/:botId/setup"}
               component={onlyAutorizenUsers(BotSetup)}
            />
            <Route
               exact
               path={"/bots/:botId/scenario"}
               component={onlyAutorizenUsers(SingleBot)}
            />
            <Route
               exact
               path={"/bots/:botId/autoride"}
               component={onlyAutorizenUsers(Autoride)}
            />
            <Route
               exact
               path={"/bots/:botId/broadcast"}
               component={onlyAutorizenUsers(BroadCast)}
            />
            <Route
               exact
               path={"/bots/:botId/dialog"}
               component={onlyAutorizenUsers(NotFound)}
            />
            <Route
               exact
               path={"/bots/:botId/growth"}
               component={onlyAutorizenUsers(NotFound)}
            />
            <Route
               exact
               path={"/bots/:botId/statistics"}
               component={onlyAutorizenUsers(Statistics)}
            />
            <Route
               exact
               path={"/bots/:botId/dialog"}
               component={onlyAutorizenUsers(Dialog)}
            />
         </Switch>
      </div>
   </Router>
);

export default App;
