import React, {PropTypes, Component} from 'react';

export default class TripAdvisor extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired
    };

    render() {
        let {data} = this.props;
        return (
            <div className="tripadvisor-info">
                    {data && <a target="_blank" href={data.url}>
                        <img src={data.rating_image_url} alt="tripAdvisor"/>
                        <span className="review-count">{data.review_count} reviews</span>
                    </a>}

            </div>)
    }
}