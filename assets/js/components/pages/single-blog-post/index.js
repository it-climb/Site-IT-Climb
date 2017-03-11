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

class SingleBlogPostContainer extends Component {

    static propTypes = {
        params: React.PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.loadBlogPostsPageData();
    }

    render() {

        let blogItems = _.get(this.props.blogPosts, 'items', []),
            singleBlog = blogItems.filter((blog)=>blog.id===this.props.params.slug),
            singleBlogObject = _.get(singleBlog,'[0]', null),
            author = singleBlogObject && singleBlogObject.author || null,
            relatedBlogItems = blogItems
                .filter((blog)=>singleBlogObject.category===blog.category && blog.id!=this.props.params.slug)
                .slice(0,3),
            blogItemsElements = singleBlog.map((blogItem)=> {
                return (<BlogItem blogItem={blogItem} showAll={true}/>);
            }),
            avatarSrc = _.get(author, 'avatar.url', '');

        return (
            <section className="captain-blog single-blog">
                <div className="container">
                    <div className="row">
                        <aside className="blog-menu col-md-3 hidden-xs">
                            <RecentBlogs blogItems={blogItems}/>
                            <BlogArchives/>
                            <BlogCategories/>
                        </aside>
                        <div className="col-md-9 col-xs-12">
                            <div className=" blogs">
                                {blogItemsElements}
                            </div>
                            {author &&
                            <div className="author ">
                                <h3 className="third-headliner">
                                    About the Author
                                    <Divider fillColor="#000000" className="divider"/>
                                </h3>
                                <div className="author-avatar" style={{
                                    background: `url(${avatarSrc}) no-repeat center center #333333`
                                }}/>
                                <div className="author-info">
                                    <h2 className="secondary-headliner">
                                        {author.firstName} {author.lastName}
                                    </h2>
                                    <p className="regular-text">
                                        {author.about}
                                    </p>
                                </div>
                            </div>
                            }
                            <div className="related-posts">
                                <h3 className="third-headliner">
                                    Related Posts
                                    <Divider fillColor="#000000" className="divider"/>
                                </h3>
                                <div className="related-posts-list">
                                    {relatedBlogItems.map((blog)=><BlogItem blogItem={blog} share={false}/>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SignUp />
            </section>)
    }
}


const mapStateToProps = state => ({
    blogPosts: state.blogPosts
});

const mapDispatchToProps = dispatch => bindActionCreators({ loadBlogPostsPageData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(SingleBlogPostContainer))