// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';


const View = ({ title }) => (
	<section class="page-overlay">
		<h1>{title}</h1>
	</section>
);

class AboutOverlay extends Component {
	state = {
		data: null,
	}

	constructor(props) {
		super(props);

		this.onPageDataLoaded = this.onPageDataLoaded.bind(this);
		this.onError = this.onError.bind(this);
	}

	componentDidMount() {
		this.fetchPageData();
	}

	componentDidUpdate() {
	}

	fetchPageData() {
		fetch(`/api/page/${this.props.slug}`)
		.then(response => response.json())
		.then(this.onPageDataLoaded)
		.catch(this.onError);
	}

	onPageDataLoaded(data) {
		this.setState({ data });
	}

	onError(err) {
		console.log(err);
	}

	render(props, state) {
		console.log(props.data);
		return <View { ...state.data } { ...state } onScroll={this.onScroll} />;
	}
};


const mapStateToProps = ({ isAboutOverlayVisible }) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AboutOverlay);