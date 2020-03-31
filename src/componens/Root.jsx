import React, {Fragment} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import Auth from "../pages/auth/auth";
import Bots from "../pages/bots/bots";
import SignUp from "../pages/signUp/signUp";
import Profile from "../pages/profile/profile";
import BotSetup from "../pages/botSetup/botSetup";
import Autoride from "../pages/autoride/autoride";
import SingleBot from "../pages/singleBot/singleBot";
import BroadCast from "../pages/broadcast/broadcast";
import GrowthTool from "../pages/growthTool/growthTool";
import Statistics from "../pages/statistics/statistics";
import TariffPrices from "../pages/tariff/tariffPrices";
import TariffPayment from "../pages/tariff/tariffPayment";
import TariffHistory from "../pages/tariff/tariffHistory";
import TariffSuccess from "../pages/tariff/tariffSuccess";
import TariffFailure from "../pages/tariff/tariffFailure";
import PartnersMine from "../pages/partners/partnersMine";
import PartnersTop from "../pages/partners/partnersTop";
import NotFound from "../pages/inDevelopment/inDevelopment";

import MainHeader from "./mainHeader/mainHeader";
import NavBar from "./navbar/navbar";

import onlyDontRegistrationUsers from "./hoc/onlyNotRegistration";
import onlyAuthorizedUsers from "./hoc/onlyAuthorizedUsers";

import history from "../config/history/history";

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
               <Route
                  exact
                  path={"/bots/profile"}
                  component={onlyAuthorizedUsers(Profile)}
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
                     component={onlyAuthorizedUsers(GrowthTool)}
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
                     path={"/bots/tariff/payment/success"}
                     component={onlyAuthorizedUsers(TariffSuccess)}
                  />
                  <Route
                     exact
                     path={"/bots/tariff/payment/failure"}
                     component={onlyAuthorizedUsers(TariffFailure)}
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
                  <Route
                     exact
                     path={"/bots/partners/mine"}
                     component={onlyAuthorizedUsers(PartnersMine)}
                  />
                  <Route
                     exact
                     path={"/bots/partners/top-partners"}
                     component={onlyAuthorizedUsers(PartnersTop)}
                  />
               </div>
            </Switch>
         </div>
      </Fragment>
   )
};

export default Root;
