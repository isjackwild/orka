// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import { FEED_CATEGORIES } from '../../CONSTANTS';

const View = ({ title, type, isVisible }) => (
	<section class={`page-overlay page-overlay--${isVisible ? 'visible' : 'hidden'}`}>
		<span class="feed__item-type">{FEED_CATEGORIES[type]}</span>
		<h1 class="feed__item-title">{title}</h1>
		<a href='/'>Close</a>
	</section>
);

class AboutOverlay extends Component {
	state = {
		data: null,
		isVisible: false, 
	}

	constructor(props) {
		super(props);

		this.onPageDataLoaded = this.onPageDataLoaded.bind(this);
		this.onError = this.onError.bind(this);
	}

	componentDidMount() {
		if (this.props.slug) this.fetchPageData();
	}

	componentDidUpdate(lastProps, lastSlug) {
		if (this.props.slug && this.props.slug !== lastProps.slug) return this.fetchPageData();
		if (!this.props.slug && this.state.isVisible) return this.setState({ isVisible: false });
	}

	fetchPageData() {
		console.log('fetch', this.props.slug);
		fetch(`/api/page/${this.props.slug}`)
		.then(response => response.json())
		.then(this.onPageDataLoaded)
		.catch(this.onError);
	}

	onPageDataLoaded(data) {
		this.setState({ data, isVisible: true });
	}

	onError(err) {
		console.log(err);
	}

	render(props, state) {
		console.log(props.data);
		return <View { ...state.data } { ...state } onScroll={this.onScroll} />;
	}
};


const mapStateToProps = ({ currentPage }) => {
	return { slug: currentPage };
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AboutOverlay);