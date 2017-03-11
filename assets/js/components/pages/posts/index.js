'use strict';
import _ from 'lodash'
import React, {Component, PropTypes} from 'react';
import {Divider} from '../../common/icons/icons';
import { loadPostsPageData, createPost } from '../../../actions/posts-actions';
import { bindActionCreators } from 'redux';
import ScrollTop from '../../../utils/ScrollTop';
import { connect } from 'react-redux';
import LazyInput from 'lazy-input';
import Errors    from '../../common/errors/errors';
import uuid from "uuid";

class PostsContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            post: {
                comment: '',
                email: '',
                name: ''
            }
        };
        this._handleChange = this._handleChange.bind(this);
        this._sendPost = this._sendPost.bind(this);
    }

    componentDidMount() {
        this.props.loadPostsPageData();
    }

    _sendPost(ev) {
        ev.preventDefault();
        console.log('_sendPost');
        let {post} = this.state;
        this.props.createPost(post.comment, post.name, post.email, uuid.v4());
        //let posts = dataUtils.getItemsArrayFromStore(_.get(this.props, 'questions', [])).map((question)=> {return(<p key={question.id}> {question.content}</p> )});
    }

    _handleChange(ev) {
        let input = ev.target,
            value = input.value,
            post = {...this.state.post, [input.name]: value};
        this.setState({post});
    }

    render() {

        let {state} = this;

        //let posts = dataUtils.getItemsArrayFromStore(_.get(this.props, 'questions', [])).map((question)=> {return(<p key={question.id}> {question.content}</p> )});

        return (
            <section className="schedule">
                <div className="schedule-banner wrapper">
                    <div className="inner">
                        <h3 className="third-headliner">
                            So you have some questions...
                        </h3>
                        <Divider fillColor="#ffffff" className="divider"/>
                        <p className="white regular-text">The Fort Lauderdale IT Climb system consists of 3 connected
                            routes: The <span>Fort Lauderdale Route, The Margaritaville Express Route and the Hollywood Local
                            Route.</span></p>
                    </div>
                </div>
                <div className="container">
                    <h3 className="third-headliner">
                        Fort Lauderdale Route Schedule Information
                    </h3>
                    <p className="regular-text">IT Climbs pick up at the stops on the Fort Lauderdale Route every 30
                        minutes. We do not publish a schedule for these routes as the IT Climbs load and go at each stop.
                        Please be sure to be waiting at the stop so you do not miss the pickup.</p>
                </div>
                <section className="schedule-table container">
                    <div className="wrapper schedule-table-header">
                        <div className="inner">
                            <h2 className="fourth-headliner">
                                Stop 6&nbsp;<span>Hilton Marine</span>&nbsp;
                            </h2>
                            <h2 className="fourth-headliner">
                                Stop 6&nbsp;<span>Margaritaville</span>&nbsp;
                            </h2>
                            <h2 className="fourth-headliner">
                                Stop 6&nbsp;<span>Hilton Marine</span>&nbsp;
                            </h2>
                        </div>
                    </div>
                    <div className="schedule-table-row wrapper">
                        <div className="inner"> <h6 className="sixth-headliner">
                            10:00 am
                        </h6>
                            <h6 className="sixth-headliner">
                                10:00 am
                            </h6>
                            <h6 className="sixth-headliner">
                                10:00 am
                            </h6></div>

                    </div>
                    <div className="schedule-table-row wrapper">
                        <div className="inner"> <h6 className="sixth-headliner">
                            10:00 am
                        </h6>
                            <h6 className="sixth-headliner">
                                10:00 am
                            </h6>
                            <h6 className="sixth-headliner">
                                10:00 am
                            </h6>
                        </div>
                    </div>
                </section>
                <p> from form </p>
                <form action="" method="post" onSubmit={this._sendPost}>

                    <div className="form-group">
                        <label className="form-label">Comment</label>
                        <LazyInput type="text" name="comment"
                                   value={state.cardName} onChange={this._handleChange}
                                   className="form-control"/>
                        <Errors errors={_.get(this.state, 'errors.comment', {})}/>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <LazyInput type="text" name="name"
                                   value={state.cardName} onChange={this._handleChange}
                                   className="form-control"/>
                        <Errors errors={_.get(this.state, 'errors.name', {})}/>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <LazyInput type="text" name="email"
                                   value={state.cardName} onChange={this._handleChange}
                                   className="form-control"/>
                        <Errors errors={_.get(this.state, 'errors.email', {})}/>
                    </div>
                    <input id="submit-button" type='submit'/>
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    total: state.posts.total
});

const mapDispatchToProps = dispatch => bindActionCreators({ loadPostsPageData, createPost }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(PostsContainer))
