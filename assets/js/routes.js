import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MainContainer from './components';
import Home from './components/pages/home';
import BuyTicket from './components/pages/buy-ticket/new_buy_ticket';
import CruiseAndSave from './components/pages/cruise-and-save';
import Schedule from './components/pages/schedule';
import GroupsAndCharters from './components/pages/groups-and-charters';
import GetMoreLauderdale from './components/pages/get-more-lauderdale';
import Blog from './components/pages/blog';
import SingleBlogPost from './components/pages/single-blog-post';
import Faq from './components/pages/faq';
import AllStops from './components/pages/all-it-climb-stops';
import PerfectPicks from './components/pages/perfect-picks';
import InteractiveMap from './components/pages/interactive-map';
import Payment from './containers/payment';
import Posts from './components/pages/posts';
import RouteContainer from './components/pages/route';

export default (
    <Route component={MainContainer} name="app" path="/">
        <IndexRoute component={Home}/>
        <Route component={BuyTicket} path="buy-ticket"/>
        <Route component={CruiseAndSave} path="cruise-and-save"/>
        <Route component={Schedule} path="schedule"/>
        <Route component={GroupsAndCharters} path="groups-and-charters"/>
        <Route component={GetMoreLauderdale} path="get-more-lauderdale"/>
        <Route path="blog">
            <IndexRoute component={Blog}/>
            <Route component={SingleBlogPost} path=":slug"/>
            <Route component={Blog} path="period/:period"/>
            <Route component={Blog} path="category/:category"/>
        </Route>
        <Route components={RouteContainer} path="route/:slug"/>
        <Route component={Faq} path="faq"/>
        <Route component={AllStops} path="all-it-climb-stops" />
        <Route component={PerfectPicks} path="perfect-picks" />
        <Route component={InteractiveMap} path="interactive-map" />
        <Route component={Payment} path="checkout"/>
        <Route component={Posts} path="post"/>
    </Route>
)