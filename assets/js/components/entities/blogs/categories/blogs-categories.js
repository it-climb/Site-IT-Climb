'use strict';
import _ from 'lodash'
import React, {Component, PropTypes} from 'react';
import CategoriesHolder from '../../../../holders/BlogPostCategoriesHolder';
import {browserHistory} from "react-router";

export default class BlogPostCategories extends Component {

    static propTypes = {
        chooseCategory: PropTypes.func.isRequired
    };

    chooseCategory(category, ev){
        ev.preventDefault();
        browserHistory.push(`/blog/category/${category.name}`);
    }

    render() {

        let categories = CategoriesHolder.getCategories().map((category)=> {
            return (
            <li key={category.name} className="item">
                <a href="/" onClick={this.chooseCategory.bind(this, category)} className="link-to-nav">
                    {category.name}
                </a>
            </li>)
        });

        return (
            <section>
                <h4 className="fourth-headliner">
                    Categories
                </h4>
                <ul className="list-of-nav">
                    {categories}
                </ul>
            </section>
        )
    }
}