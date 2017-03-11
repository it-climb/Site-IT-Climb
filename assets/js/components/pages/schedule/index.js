'use strict';
import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { loadSchedulesPageData } from '../../../actions/schedules-actions';
import { bindActionCreators } from 'redux';
import ScrollTop from '../../../utils/ScrollTop';
import { connect } from 'react-redux';
import {Divider} from '../../common/icons/icons';
import OrderTickets from '../../common/orderTickets/orderTickets';
import SignUp from '../../common/signUpForm/signUpForm';
import dataUtils from '../../../utils/data_utils';
import ScheduleItem from '../../../components/entities/schedule/schedule-item/schedule-item';

class ScheduleContainer extends Component {

    componentDidMount(){
        this.props.loadSchedulesPageData();
    }

    render() {

        let scheduleElements = dataUtils.getItemsArrayFromStore(_.get(this.props, 'schedules', []))
            .map((scheduleItem)=><ScheduleItem scheduleItem={scheduleItem}/>);


        return (
            <section className="schedule">
                <div className="schedule-banner wrapper">
                    <div className="inner">
                        <h3 className="third-headliner">
                            IT Climb Schedules
                        </h3>
                        <Divider fillColor="#ffffff" className="divider"/>
                        <p className="white regular-text">The Fort Lauderdale IT Climb system consists of 3 connected
                            routes: TheFort Lauderdale <span>Route, The Margaritaville Express Route and the Hollywood Local
                            Route.</span></p>
                    </div>
                </div>
                {scheduleElements}
                <OrderTickets />
                <SignUp />
            </section>
        )
    }
}

const mapStateToProps = state => ({
    schedules: state.schedules
});

const mapDispatchToProps = dispatch => bindActionCreators({ loadSchedulesPageData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(ScheduleContainer))