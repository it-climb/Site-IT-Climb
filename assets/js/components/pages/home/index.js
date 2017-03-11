'use strict';
import _ from 'lodash';
import React, {Component} from 'react';
import {loadPageData} from '../../../actions/pages-actions';
import {loadNewsPageData} from '../../../actions/news-actions';
import {bindActionCreators} from 'redux';
import ScrollTop from '../../../utils/ScrollTop';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import Button from '../../common/button/customButton';
import {Divider} from '../../common/icons/icons';
import ProgressLine from '../../common/progressLine/progress_line';
import BlogItem from '../../entities/blogs/blog-item/blog-item';
import OrderTickets from '../../common/orderTickets/orderTickets';
import SignUp from '../../common/signUpForm/signUpForm';
import Slider from "react-slick";
import VisibilitySensor from 'react-visibility-sensor';
import RouteItem from '../../entities/routes/route-item/route-item';
import dataUtils from '../../../utils/data_utils';
import uiUtils from '../../../utils/ui_utils';

const PAGE_NAME = 'home';
const EMPTY_PAGE_DATA = {};

class HomeContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBadges: false
        };
    }

    componentDidMount() {
        this.props.loadPageData(PAGE_NAME);
        this.props.loadNewsPageData();
    }

    static _handleBuyNow() {
        window.location.href = 'https://store.ItClimb.com/WebStore/shop/ViewItems.aspx?CG=FLWT&C=WT';
    }

    static _handleSubmitSignUp() {
        console.log('You have submitted form');
    }

    static _handleGoTo(goToPage) {
        return browserHistory && browserHistory.push.bind(browserHistory, goToPage);
    }

    _renderNewsSlider(news){
        let sliderSettings = {
            dots: false,
            infinite: true,
            arrows : news.length > 1,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
            autoplaySpeed:2000,

        };

        let News = news.map((n,index) =><p key={index} className="regular-text news">{n}</p>);

        return (
                <div className="slider row">
                    <h3 className="third-headliner orange">IT Climb News</h3>
                    <Slider {...sliderSettings}>
                        {News}
                    </Slider>
                </div>
        )
    }

    render() {

        //TODO: delete this code after news slider implementations
        let news = _.reduce(_.get(this.props, 'news', {}), (result, value, key)=>{
            result.push(value.title);
            return result;
        }, []);
        /*for(let piece of news){
         console.log(`news = ${piece}`);
         }*/

        let home = _.get(this.props, 'pages.current') || EMPTY_PAGE_DATA,
            fixedBlogPost = _.get(home,'fixedBlogPost', null),
            fixedRoutes = _.get(home, 'fixedRoutes', []),
            bannerUrl = _.get(home, 'banner.url', 'banner.url', '/assets/images/home/img_home-page.png'),
            bannerDivStyle = {
                background: 'url(' + bannerUrl + ') no-repeat center top #6BB0DF',
            };

        return (
            <div className="home-main">
                <section className="visit-section" style={bannerDivStyle}>
                    <div className="container">
                        <h1 className="first-headliner">
                            {home.title}
                        </h1>
                        <Button className="btn btn-main btn-buy" firstColor="#04844A" secondColor='#0A6D38'
                                corner={166} onClick={HomeContainer._handleGoTo('/buy-ticket')}> Buy tickets <span className="btn-circle">&#62;</span>
                        </Button>
                        <VisibilitySensor onChange={(isVisible)=> {
                            isVisible && this.setState({showBadges: true})
                        }}>
                            <ul className={this.state.showBadges ? 'badge-list show-all' : 'badge-list'}>
                                <li className="list-item">
                                    <a href="https://www.tripadvisor.com/Attraction_Review-g34227-d1449782-Reviews-it_climb-Fort_Lauderdale_Broward_County_Florida.html"
                                       target="_blank"
                                       className="tripadvisor-badge">
                                        <img src="/assets/images/home/2014.1x.png 1x" className="img-responsive"
                                             srcSet="/assets/images/home/2014.1x.png 1x, /assets/images/home/2014.png 2x"
                                             alt="tripadvisor choice"/>
                                    </a>
                                </li>
                                <li className="list-item">
                                    <a href="https://www.tripadvisor.com/Attraction_Review-g34227-d1449782-Reviews-it_climb-Fort_Lauderdale_Broward_County_Florida.html"
                                       target="_blank"
                                       className="tripadvisor-badge">
                                        <img src="/assets/images/home/2015.1x.png 1x" className="img-responsive"
                                             srcSet="/assets/images/home/2015.1x.png 1x, /assets/images/home/2015.png 2x"
                                             alt="tripadvisor choice"/>
                                    </a>
                                </li>
                                <li className="list-item">
                                    <a href="https://www.tripadvisor.com/Attraction_Review-g34227-d1449782-Reviews-it_climb-Fort_Lauderdale_Broward_County_Florida.html"
                                       target="_blank"
                                       className="tripadvisor-badge">
                                        <img src="/assets/images/home/2016.1x.png 1x" className="img-responsive"
                                             srcSet="/assets/images/home/2016.1x.png 1x, /assets/images/home/2016.png 2x"
                                             alt="tripadvisor choice"/>
                                    </a>
                                </li>
                            </ul>
                        </VisibilitySensor>
                    </div>
                </section>
                {!_.isEmpty(news) && <section className="news">
                    <div className="container">
                        {this._renderNewsSlider(news)}
                    </div>
                </section>}
                <section className="drift">
                    <div className="container">
                        <h2 className="secondary-headliner">
                            <img src="/assets/images/home/small_boat.png" alt="" className="boat-on-water"/>
                            <div className="inline" dangerouslySetInnerHTML={uiUtils.createPlainMarkup(home.topParagraph)}></div>
                            &nbsp;
                                <Button className="btn btn-main btn-explore-map"
                                        firstColor="#FCAD01" secondColor='#DA8B05' corner={168}
                                        onClick={HomeContainer._handleGoTo('/interactive-map')}>
                                    EXPLORE OUR MAP
                                </Button>
                        </h2>

                    </div>
                </section>
                {fixedRoutes && <section className="picks">
                    <div className="container">
                        <h3 className="third-headliner">
                            Perfect Picks
                        </h3>
                        <Divider fillColor="#231F20" className="divider"/>
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3">
                                <p className="regular-text" dangerouslySetInnerHTML={uiUtils.createMarkup(home.perfectPicksPart)}>
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            {fixedRoutes
                                .map((routeItem, index, array)=>
                                    <RouteItem
                                        key={routeItem.id}
                                        routeItem={routeItem}
                                        showAll={false}
                                        last={dataUtils.isLast(index, array)}/>)
                            }
                        </div>
                        <Button className="btn btn-main btn-view-all" firstColor="#FCAD01" secondColor='#DA8B05'
                                corner={166} onClick={HomeContainer._handleGoTo('/perfect-picks')}>
                            View all
                        </Button>
                    </div>
                </section>}
                <section className="cruise">
                    <div className="container">
                        <div className="row">
                            <div className="wrapper">
                                <div className="inner">
                                    <h2 className="secondary-headliner">
                                        Cruise & Save
                                    </h2>
                                    <Divider fillColor="#ffffff" className="divider"/>
                                    <p className="regular-text white col-md-8 col-md-offset-2" dangerouslySetInnerHTML={uiUtils.createMarkup(home.cruiseAndSavePart)} >
                                    </p>
                                    <div className="col-md-12">
                                        <Button className="btn btn-main btn-view-all" firstColor="#FCAD01" secondColor='#DA8B05'
                                                corner={166} onClick={HomeContainer._handleGoTo('/cruise-and-save')}>
                                            Float on
                                        </Button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="container schedule">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="third-headliner">Schedule</h3>
                            <Divider fillColor="#231F20" className="divider"/>
                            <p className="regular-text"  dangerouslySetInnerHTML={uiUtils.createMarkup(home.schedulePart)}>
                            </p>
                            <Button className="btn btn-main btn-view-all center-block" firstColor="#FCAD01"
                                    secondColor='#DA8B05' corner={166} onClick={HomeContainer._handleGoTo('/schedule')}>
                                Float on
                            </Button>
                        </div>
                        <div className="col-md-6">
                            <h3 className="third-headliner">Groups & Charters</h3>
                            <Divider fillColor="#231F20" className="divider"/>
                            <p className="regular-text" dangerouslySetInnerHTML={uiUtils.createMarkup(home.groupsAndChartersPart)}>
                            </p>
                            <Button className="btn btn-main btn-view-all" firstColor="#FCAD01" secondColor='#DA8B05'
                                    corner={166} onClick={HomeContainer._handleGoTo('/groups-and-charters')}>
                                Float on
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="customers-satisfaction">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="third-headliner">What the flock <span
                                    className="orange">(of birds)</span> are they saying?</h3>
                                <Divider fillColor="#231F20" className="divider"/>
                            </div>
                            <div className="col-md-4 col-xs-12 customer">
                                <img src="/assets/images/home/SunSentinel-logo.png"
                                     srcSet="/assets/images/home/SunSentinel-logo.png 1x, /assets/images/home/SunSentinel-logo@2x.png 2x"
                                     alt="logo"
                                     className="customer-logo"/>
                                <p className="regular-text quoter">
                                    {_.get(home, 'brandText[0]', '')}
                                </p>
                            </div>
                            <div className="col-md-4 col-xs-12 customer">
                                <img src="/assets/images/home/Venice-logo.png"
                                     srcSet="/assets/images/home/Venice-logo.png 1x, /assets/images/home/Venice-logo@2x.png 2x"
                                     alt="logo"
                                     className="customer-logo"/>
                                <p className="regular-text quoter">
                                    {_.get(home, 'brandText[1]', '')}
                                </p>
                            </div>
                            <div className="col-md-4 col-xs-12 customer">
                                <img src="/assets/images/home/FortLaudererdale-logo.png"
                                     srcSet="/assets/images/home/FortLaudererdale-logo.png 1x,/assets/images/home/FortLaudererdale-logo@2x.png 2x"
                                     alt="logo" className="customer-logo"/>
                                <p className="regular-text quoter">
                                    {_.get(home, 'brandText[2]', '')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container blogs">
                    <h3 className="third-headliner">Latest Article</h3>
                    {fixedBlogPost && <BlogItem showHeader={true} blogItem={fixedBlogPost} inList={true} showAll={false} header={home.blogPart}/>}
                    <Button className="btn btn-main btn-view-more" firstColor="#FCAD01" secondColor='#DA8B05'
                            corner={177} onClick={HomeContainer._handleGoTo('/blog')}>
                        VIEW MORE CAPTAIN’S BLOGS
                    </Button>
                </section>
                <section className="places ">
                    <ul className="list-of-places">
                        <li className="item-place">
                            <img src="/assets/images/home/place-1.png" alt="place"
                                 srcSet="/assets/images/home/place-1.png 1x, /assets/images/home/place-1@2x.png 2x "
                                 className="img-responsive"/>
                        </li>
                        <li className="item-place">
                            <div className="wrapper">
                                <div className="inner">
                                    <a href="/" className="social-link instagram"/>
                                    <div className="instagram-text-info">
                                        <h3 className="third-headliner">
                                            #MoreLauderdale
                                        </h3>
                                        <p className="regular-text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ele ifend leo
                                            vitae dolor ullamcorper tempus. Maecenas ac faucibus nis lor ullamcorper
                                            tem.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="item-place">
                            <img src="/assets/images/home/place-2.png" alt="place"
                                 srcSet="/assets/images/home/place-2.png 1x, /assets/images/home/place-2@2x.png 2x"
                                 className="img-responsive"/>
                        </li>
                        <li className="item-place">
                            <div className="wrapper">
                                <div className="inner">
                                    <a href="/" className="social-link instagram"/>
                                    <div className="instagram-text-info">
                                        <h3 className="third-headliner">
                                            #MoreLauderdale
                                        </h3>
                                        <p className="regular-text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ele ifend leo
                                            vitae dolor ullamcorper tempus. Maecenas ac faucibus nis lor ullamcorper
                                            tem.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </li>
                        <li className="item-place">
                            <img src="/assets/images/home/place-3.png" alt="place"
                                 srcSet="/assets/images/home/place-3.png 1x, /assets/images/home/place-3@2x.png 2x"
                                 className="img-responsive"/>
                        </li>
                    </ul>
                </section>
                <OrderTickets/>
                <SignUp signUp={HomeContainer._handleSubmitSignUp.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pages: state.pages,
    news: state.news
});

const mapDispatchToProps = dispatch => bindActionCreators({loadPageData, loadNewsPageData}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(HomeContainer))
