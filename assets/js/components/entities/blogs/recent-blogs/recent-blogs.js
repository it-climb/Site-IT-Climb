'use strict';
import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import blogPaginationUtils from '../../../../utils/blog-pagination-utils';

export default class BlogPostCategories extends Component {

    static propTypes = {
        blogItems: PropTypes.array.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            blogItems: props.blogItems
        }
    }

    componentWillReceiveProps(newProps){
        let {blogItems} = this.state;
        if(!blogItems || !blogItems.length || blogItems.length==0){
            this.setState({blogItems: newProps.blogItems});
        }
    }

    render() {

        let blogItems = this.state.blogItems.map((blog)=> {
            console.log('blog', blog);
            let goToBlog = blogPaginationUtils.goToBlog.bind(this, blog.id);
            return (
                <li className="item" key={blog.id}>
                    <a href="/" onClick={goToBlog} className="link-to-nav">
                        {blog.title}
                    </a>
                </li>
            )
        });

        return (
            <section>
                <h4 className="fourth-headliner">
                    Recent Posts
                </h4>
                <ul className="list-of-nav">
                    {blogItems}
                </ul>
            </section>
        )
    }
}