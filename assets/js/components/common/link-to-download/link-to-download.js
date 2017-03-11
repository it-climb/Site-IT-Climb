import React, {PropTypes, Component} from 'react';

export default class LinkToDownload extends Component {

    static propTypes = {
        source: PropTypes.object.isRequired
    };

    render() {
        let {url, img, alt, className} = this.props.source;
        return (
            <div>
                <a href={url} target="_blank"><img src={img} alt={alt} className={className}/></a>
            </div>
        )
    }
}