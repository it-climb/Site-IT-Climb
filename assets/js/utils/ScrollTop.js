'use strict';

import React, { Component } from "react";

export default ComposedComponent => class extends Component {

	componentDidMount() {
		if (typeof window == 'object') {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return (
			<ComposedComponent
				{...this.props}
				{...this.state}
			/>
		)
	}
}