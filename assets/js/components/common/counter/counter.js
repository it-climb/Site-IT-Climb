import React, {PropTypes} from 'react';
import raf from 'raf';
import ease from 'ease-component';
import {get} from 'lodash';

export class Counter extends React.Component {

    static propTypes = {
        begin: PropTypes.number.isRequired,
        time: PropTypes.number.isRequired,
        end: PropTypes.number.isRequired,
        caption: PropTypes.string
    };

    constructor() {
        super();

        this.state = {
            value: 0,
            mounted: false,
            started: false
        };

        this.animate = () => {
            if (this.stop) return;

            raf(this.animate);
            this.draw()
        };

        this.draw = () => {
            if (!this.state.mounted) return;

            var time = this.props.time,
                begin = this.props.begin,
                end = this.props.end,
                easing = 'outCube',
                now = Date.now();

            if (now - this.start >= time) this.stop = true;
            var percentage = (now - this.start) / time;
            percentage = percentage > 1 ? 1 : percentage;
            var easeVal = ease[easing](percentage);
            var val = begin + (end - begin) * easeVal;

            this.setState({value: val});
        };
    }

    componentDidMount() {
        this.setState({
            value: this.props.begin,
            mounted: true,
            started: true
        });
        this.start = Date.now();
        raf(this.animate);
    }

    componentWillUnmount() {
        this.stop = true;
    }


    render() {
        return (
            <figure className="chart">
                <svg viewBox="0 0 200 200">
                    <g>
                        <text className="number" x="48%" y="50%" textAnchor="middle" strokeWidth="2px"
                              dy=".3em">{Math.round(this.state.value)}</text>
                        <circle className="outer" cx="95" cy="95" r="85"/>
                    </g>
                </svg>
                <figcaption>{this.props.caption}</figcaption>
            </figure>)
    }
}