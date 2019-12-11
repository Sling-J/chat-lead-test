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
import TariffPayment from "./pages/tariff/tariffPayment";
import TariffPrices from "./pages/tariff/tariffPrices";
import TariffHistory from "./pages/tariff/tariffHistory";

const App = () => (
   <Router>
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
         <Route
            exact
            path={"/bots/tariff/payment"}
            component={onlyAutorizenUsers(TariffPayment)}
         />
         <Route
            exact
            path={"/bots/tariff/prices"}
            component={onlyAutorizenUsers(TariffPrices)}
         />
         <Route
            exact
            path={"/bots/tariff/history"}
            component={onlyAutorizenUsers(TariffHistory)}
         />
      </Switch>
   </Router>
);

export default App;
