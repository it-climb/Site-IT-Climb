'use strict';
import _ from 'lodash'
import React, {Component, PropTypes} from 'react';
import {Divider} from '../../common/icons/icons';
import { loadQuestionsPageData } from '../../../actions/questions-actions';
import { bindActionCreators } from 'redux';
import ScrollTop from '../../../utils/ScrollTop';
import { connect } from 'react-redux';
import Question from './question';
import dataUtils from '../../../utils/data_utils';

class FaqContainer extends Component {

    constructor(props){
        super(props);
        this.handleShowAnswer = this.handleShowAnswer.bind(this);
    }

    componentDidMount() {
        this.props.loadQuestionsPageData();
    }

    handleShowAnswer(){

    }

    render() {

        let questionsElements = dataUtils.getItemsArrayFromStore(_.get(this.props, 'questions', []))
            .map((question)=><Question question={question.question} answer={question.answer}/>);

        return (
            <section className="faq">
                <div className="wrapper faq-preheader">
                    <div className="inner">
                        <h2 className="secondary-headliner">
                            So you have some questions...
                        </h2>
                    </div>
                </div>
                <div className="container">
                    <div className="question-table">
                        <div className="wrapper question-table-header">
                            <div className="inner">
                                <h5 className="fifth-headliner">
                                    Ask Away!&nbsp;<span className="mobile-view"> Our&nbsp;<span className="green">IT Climb employees</span>&nbsp;are here to help you!</span>
                                </h5>
                            </div>
                        </div>
                        <div className="question-list">
                            {questionsElements}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


const mapStateToProps = state => ({
    questions: state.questions
});

const mapDispatchToProps = dispatch => bindActionCreators({ loadQuestionsPageData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(FaqContainer))