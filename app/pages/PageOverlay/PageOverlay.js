// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';
import page from 'page';
import PubSub from 'pubsub-js';

import ScrollOverlay from '../../components/ScrollOverlay/ScrollOverlay';
import Post from '../Post/Post';

import { setPageLoading } from '../../state/actions';
import store from '../../state/store';

import { FEED_CATEGORIES } from '../../CONSTANTS';


const View = ({ title, type, text, embeds, images, ytid, isVisible, hide }) => (
	<ScrollOverlay isVisible={isVisible} hide={hide}>
		{isVisible ?
			<Post title={title} type={type} text={text} embeds={embeds} images={images} ytid={ytid} isVisible={isVisible} />
		: null}
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
		PubSub.subscribe('page.hide', () => this.hide());
	}

	componentDidUpdate(lastProps, lastSlug) {
		if (this.props.slug && this.props.slug !== lastProps.slug) return this.fetchPageData();
		if (!this.props.slug && this.state.isVisible) return this.setState({ isVisible: false });
	}

	fetchPageData() {
		store.dispatch(setPageLoading(true));

		fetch(`/api/page/${this.props.slug}`)
		.then(response => response.json())
		.then(this.onPageDataLoaded)
		.catch(this.onError);
	}

	onPageDataLoaded(data) {
		console.log(data);
		setTimeout(() => {
			store.dispatch(setPageLoading(false))
		}, 333);
		document.body.classList.toggle('no-scroll');
		this.setState({ data, isVisible: true });
	}

	hide() {
		document.body.classList.toggle('no-scroll');
		this.setState({ isVisible: false, data: null });
		page('/');
	}

	onError(err) {
		setTimeout(() => {
			store.dispatch(setPageLoading(false))
		}, 333);
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