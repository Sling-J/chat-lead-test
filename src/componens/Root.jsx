import React, {Fragment} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import SignUp from "../pages/signUp/signUp";
import Auth from "../pages/auth/auth";
import Statistics from "../pages/statistics/statistics";
import Dialog from "../pages/dialog/dialog";
import TariffPayment from "../pages/tariff/tariffPayment";
import TariffPrices from "../pages/tariff/tariffPrices";
import TariffHistory from "../pages/tariff/tariffHistory";

import Bots from "../pages/bots/bots";
import BotSetup from "../pages/botSetup/botSetup";
import SingleBot from "../pages/singleBot/singleBot";
import Autoride from "../pages/autoride/autoride";
import BroadCast from "../pages/broadcast/broadcast";
import NotFound from "../pages/inDevelopment/inDevelopment";

import onlyDontRegistrationUsers from "./hoc/onlyNotRegistration";
import onlyAuthorizedUsers from "./hoc/onlyAuthorizedUsers";

import history from "../config/history/history";
import MainHeader from "./mainHeader/mainHeader";
import NavBar from "./navbar/navbar";

const Root = () => {
   const matched = history.location.pathname.match(/\d+/);
   const botId = matched && matched[0];

   return (
      <Fragment>
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
            </Switch>
         </div>

         <div>
            <MainHeader botId={botId}/>

            <Switch>
               <Route
                  exact
                  path={"/bots"}
                  component={onlyAuthorizedUsers(Bots)}
               />

               <div>
                  <NavBar botId={botId}/>

                  <Route
                     exact
                     path={"/bots/:botId/setup"}
                     component={onlyAuthorizedUsers(BotSetup)}
                  />
                  <Route
                     exact
                     path={"/bots/:botId/scenario"}
                     component={onlyAuthorizedUsers(SingleBot)}
                  />
                  <Route
                     exact
                     path={"/bots/:botId/autoride"}
                     component={onlyAuthorizedUsers(Autoride)}
                  />
                  <Route
                     exact
                     path={"/bots/:botId/broadcast"}
                     component={onlyAuthorizedUsers(BroadCast)}
                  />
                  <Route
                     exact
                     path={"/bots/:botId/dialog"}
                     component={onlyAuthorizedUsers(NotFound)}
                  />
                  <Route
                     exact
                     path={"/bots/:botId/growth"}
                     component={onlyAuthorizedUsers(NotFound)}
                  />
                  <Route
                     exact
                     path={"/bots/:botId/statistics"}
                     component={onlyAuthorizedUsers(Statistics)}
                  />
                  <Route
                     exact
                     path={"/bots/tariff/payment"}
                     component={onlyAuthorizedUsers(TariffPayment)}
                  />
                  <Route
                     exact
                     path={"/bots/tariff/prices"}
                     component={onlyAuthorizedUsers(TariffPrices)}
                  />
                  <Route
                     exact
                     path={"/bots/tariff/history"}
                     component={onlyAuthorizedUsers(TariffHistory)}
                  />
               </div>
            </Switch>
         </div>
      </Fragment>
   )
};

export default Root;
