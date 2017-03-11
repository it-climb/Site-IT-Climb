'use strict';
import React, {Component, PropTypes} from 'react';
import PaginationUtils from '../../../../utils/blog-pagination-utils';
import {browserHistory} from "react-router";
import moment from 'moment';

export default class BlogPostArchives extends Component{

    static propTypes = {
        choosePeriod: PropTypes.func.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            paginationArray: PaginationUtils.generateBlogPagination()
        }
    }

    chooseMonth(date, ev){
        ev.preventDefault();
        this.setState({paginationArray:PaginationUtils.updateBlogPagination(this.state.paginationArray, date)},
            ()=>browserHistory.push(`/blog/period/${moment(date).format("MM-YYYY")}`));
    }

    render() {

        let paginationList = this.state.paginationArray.map((paginationMouth)=>{
           return (
           <li key={paginationMouth.key} className="item archive-item">
               <a href="/" onClick={this.chooseMonth.bind(this, paginationMouth.date)}  className="link-to-archive">
                   {paginationMouth.formattedDate}
               </a>
           </li>);
        });

        return (
            <section>
                <h4 className="fourth-headliner">
                    Archives
                </h4>
                <ul className="list-of-nav">
                    {paginationList}
                </ul>
            </section>
        )
    }
}