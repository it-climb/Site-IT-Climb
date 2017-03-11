'use strict';
import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import blogPaginationUtils from '../../../../utils/blog-pagination-utils';
import moment from 'moment';
import {Divider} from '../../../common/icons/icons';
import uiUtils from './../../../../utils/ui_utils';

export default class BlogItem extends Component {

    static propTypes = {
        blogItem: PropTypes.object.isRequired,
        share: PropTypes.bool,
        inList: PropTypes.bool,
        showAll: PropTypes.bool,
        showHeader:PropTypes.bool,
        header: PropTypes.string
    };

    constructor(props){
        super(props);
        this.state = {
            showAllText : false
        }
    }

    static defaultProps = {
        showHeader: false
    };


    readMore(id, ev){
        if(!this.props.showAll){
            blogPaginationUtils.goToBlog(id, ev);
        }else{
            this.setState({showAllText: !this.state.showAllText})
        }
    }

    componentDidMount(){
        this.props.showAll && this.setState({ showAllText : true})
    }

    render() {

        let blogItem = _.get(this.props, 'blogItem', {title: '', id: '', shortText: '', fullText: '', banner: { url: null}, author :{ firstName : '', secondName: ''}, category: '', createdAt: new Date()}),
            {title, id, shortText, fullText, banner, author, category, createdAt} = blogItem,
            postText = this.state.showAllText ? fullText : shortText,
            showingText = (postText.length > 270 && !this.state.showAllText) ? postText.substring(0, 270) + '...' : postText,
            posted = moment(createdAt).format('MMMM D, YYYY'),
            {share} = this.props,
            link = typeof window !== 'undefined' ? encodeURI(this.props.inList ? `${window.location.href}/${id}` : window.location.href) : '',
            facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${link}`,
            twitterShareLink = `https://twitter.com/home?status=${link}`,
            goToBlog = blogPaginationUtils.goToBlog.bind(this, blogItem.id),
            imageSourceElement = (<img src={banner.url} alt="" className="img-responsive blog-img"/>),
            {showAllText} = this.state,
            imageElement = showAllText ? imageSourceElement : (<a href="/" onClick={goToBlog} className="link-to-nav">
                {imageSourceElement}
            </a>),
            titleElement = showAllText? title : (<a href="/" onClick={goToBlog} className="black-link">
                {title}
            </a>);

        return (
            <section className="blog-item">
                {this.props.showHeader && <h2 className="secondary-headliner">
                    Captain's Blog
                    <Divider fillColor="#131375" className="divider"/>
                    <span>{titleElement}</span>
                    <div className="regular-text" dangerouslySetInnerHTML={uiUtils.createMarkup(this.props.header)}/>
                </h2>}
                {blogItem &&
                <div key={blogItem.id}>
                    {imageElement}
                    <div className="response">
                        <h3 className="third-headliner">
                            {titleElement}
                        </h3>
                        <p className="regular-text">
                            {showingText}&nbsp;
                            {!this.state.showAllText && <span className="read-more" onClick={this.readMore.bind(this, id)}>Read more</span>}
                        </p>
                        <p className="regular-text"><span className="up">Posted by</span>&nbsp;<span className="author">{author.firstName} {author.lastName},</span>&nbsp;
                            {posted}</p>
                        {share!==false &&
                        <div>
                            <ul className="social-links">
                                <li className="social-item">
                                    <a href="https://www.facebook.com/pages/Fort-Lauderdale-it-climb/48973533746" target="_blank" className="social-link facebook"/>
                                </li>
                                <li className="social-item">
                                    <a href="https://twitter.com/FtLaudItClimb" target="_blank" className="social-link twitter"/>
                                </li>
                                <li className="social-item">
                                    <a href="https://www.youtube.com/results?search_query=ft+lauderdale+it+climb" target="_blank" className="social-link youtube"/>
                                </li>
                                <li className="social-item">
                                    <a href="https://www.yelp.com/biz/it-climb-fort-lauderdale?osq=it+climb" target="_blank" className="social-link yelp"/>
                                </li>
                            </ul>
                        </div>}
                    </div>
                </div>}
            </section>
        )
    }
}
