'use strict';
import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { loadBlogPostsPageData } from '../../../actions/blog-posts-actions';
import { bindActionCreators } from 'redux';
import ScrollTop from '../../../utils/ScrollTop';
import { connect } from 'react-redux';
import BlogItem from '../../entities/blogs/blog-item/blog-item';
import BlogCategories from '../../entities/blogs/categories/blogs-categories';
import BlogArchives from '../../entities/blogs/archives/blogs-archives';
import RecentBlogs from '../../entities/blogs/recent-blogs/recent-blogs';
import {Divider} from '../../common/icons/icons';
import {Counter} from '../../common/counter/counter';
import SignUp from '../../common/signUpForm/signUpForm';
import moment from 'moment';
import {Alert} from 'react-bootstrap';

class BlogContainer extends Component {

    componentDidMount() {
        this.props.loadBlogPostsPageData();
    }

    render() {

        let blogItems = _.get(this.props.blogPosts, 'items', []),
            period = null,
            category = null;

        if(this.props.params.period){
            period = moment(`01-${this.props.params.period}`, 'DD-MM-YYYY');
        }else if(this.props.params.category){
            category = {name: this.props.params.category}
        }

        if(period){
            blogItems = blogItems.filter((blog)=> {
                let createdAt = new Date(blog.createdAt);
                return (createdAt.getMonth()==period.month() && createdAt.getFullYear()==period.year())
            });
        }else if(category){
            blogItems = blogItems.filter((blog)=> {
                return (blog.category &&  blog.category == category.name)
            });
        }

        let blogItemsElements = [];
        if(!_.isEmpty(this.props.blogPosts) && blogItems.length===0){
            blogItemsElements.push(<Alert bsStyle="warning" className="regular-text text-center">No records</Alert>)
        }else{
            blogItemsElements = blogItems.map((blogItem)=> {
                return (<BlogItem blogItem={blogItem} showAll={false} inList={true}/>);
            });
        }

        return (
            <section className="captain-blog">
                <div className="captain-blog-banner wrapper">
                    <div className="inner">
                        <h3 className="third-headliner">
                            Captain’s Blog
                        </h3>
                        <Divider fillColor="#ffffff" className="divider"/>
                        <Counter caption="Blogs" time={2000} begin={0} end={300}/>
                        <Counter caption="Events" time={2000} begin={0} end={20}/>
                        <Counter caption="Smiles" time={2000} begin={0} end={500}/>
                    </div>
                </div>
                {(period || category) &&
                <div className="container">
                    <div className="row">
                        <aside className="blog-menu col-md-3 hidden-xs">
                            <RecentBlogs blogItems={blogItems}/>
                            <BlogArchives />
                            <BlogCategories />
                        </aside>
                        <div className="col-md-9 col-xs-12">
                            {blogItemsElements}
                        </div>
                    </div>
                </div>}
                {!(period || category) &&
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {blogItemsElements}
                        </div>
                    </div>
                </div>}
                <SignUp />
            </section>)
    }
}


const mapStateToProps = state => ({
    blogPosts: state.blogPosts
});

const mapDispatchToProps = dispatch => bindActionCreators({ loadBlogPostsPageData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(BlogContainer))
