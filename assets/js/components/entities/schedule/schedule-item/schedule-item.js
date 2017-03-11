'use strict';
import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import uiUtils from '../../../../utils/ui_utils';


export default class ScheduleItem extends Component {

    static propTypes = {
        scheduleItem: PropTypes.object.isRequired
    };

    render() {

        let scheduleItem = _.get(this.props, 'scheduleItem', {}),
            stops = scheduleItem.stops || [],
            large = stops.length>3,
            sectionHeaderClass = `schedule-table ${large ? 'hollywood' : ''} container`,
            headers = stops.map((stop)=> {
                let content = (<span>{stop.title}&nbsp;<span>{stop.shortName}</span>&nbsp;</span>);
                if (large) {
                    return (
                        <h2 className="fourth-headliner">
                            {content}
                        </h2>
                    )
                } else {
                    return (
                        <h4 className="fourth-headliner">
                            {content}
                        </h4>)
                }

            }),
            timetable = scheduleItem.timetable || [],
            timetableItems = timetable.map(timetable=> {
                let timetableSchedule = timetable.timetable || [];
                return (<div className="schedule-table-row wrapper">
                    <div className="inner">
                        {timetableSchedule.map(timetableSchedule=>
                            (<h6 className="sixth-headliner">
                                {timetableSchedule}
                            </h6>))}
                    </div>
                </div>)
            });

        return (
            <div className="table-wrapper">
                {scheduleItem &&
                <div className="container inner-text">
                    <h3 className="third-headliner">
                        {scheduleItem.title}
                    </h3>
                    <p className="regular-text" dangerouslySetInnerHTML={uiUtils.createMarkup(scheduleItem.description)}/>
                </div>}
                {scheduleItem && <div className="table-wrapper">
                <section className={sectionHeaderClass}>
                    <div className="wrapper schedule-table-header">
                        <div className="inner">
                            {headers}
                        </div>
                    </div>
                    {timetableItems}
                </section>
                    </div>}
                {!_.isEmpty(scheduleItem.note) &&
                <section className="notes container">
                    <h6 className="note-label">
                        Notes:
                    </h6>
                    <p className="note-text" dangerouslySetInnerHTML={uiUtils.createMarkup(scheduleItem.note)}>
                    </p>
                </section>}
            </div>
        );
    }
}
