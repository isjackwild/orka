// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';
import page from 'page';

import ScrollOverlay from '../../components/ScrollOverlay/ScrollOverlay';
import Post from '../Post/Post';

import { FEED_CATEGORIES } from '../../CONSTANTS';


const View = ({ title, type, text, embeds, isVisible, hide }) => (
	<ScrollOverlay isVisible={isVisible} hide={hide}>
		<Post title={title} type={type} text={text} embeds={embeds} isVisible={isVisible} />
	</ScrollOverlay>
);

class PageOverlay extends Component {
	state = {
		data: null,
		isVisible: false,
	}

	constructor(props) {
		super(props);

		this.onPageDataLoaded = this.onPageDataLoaded.bind(this);
		this.onError = this.onError.bind(this);
		this.hide = this.hide.bind(this);
	}

	componentDidMount() {
		if (this.props.slug) this.fetchPageData();
	}

	componentDidUpdate(lastProps, lastSlug) {
		if (this.props.slug && this.props.slug !== lastProps.slug) return this.fetchPageData();
		if (!this.props.slug && this.state.isVisible) return this.setState({ isVisible: false });
	}

	fetchPageData() {
		fetch(`/api/page/${this.props.slug}`)
		.then(response => response.json())
		.then(this.onPageDataLoaded)
		.catch(this.onError);
	}

	onPageDataLoaded(data) {
		this.setState({ data, isVisible: true });
	}

	hide() {
		this.setState({ isVisible: false });
		page('/');
	}

	onError(err) {
		console.log(err);
	}

	render(props, state) {
		return <View { ...state.data } { ...state } onScroll={this.onScroll} hide={this.hide} />;
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
)(PageOverlay);