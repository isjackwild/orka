// NPM
import Router from 'preact-router';
import Match from 'preact-router/match';
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

// API
import { onInitialLoad } from './state/actions';
import store from './state/store';

// Pages
import Home from './pages/Home';
import FourOhFour from './pages/404';
import AboutOverlay from './pages/AboutOverlay';


class App extends Component {
	state = {
		data: null,
	}

	constructor(props) {
		super(props)
		this.onInitialDataLoaded = this.onInitialDataLoaded.bind(this);
	}

	componentWillMount() {
		this.fetchInitialData();
	}

	componentDidMount() {
		console.log('mounted App');
	}

	fetchInitialData() {
		fetch(`/api/initial-data`)
		.then(response => response.json())
		.then(this.onInitialDataLoaded);
	}

	onInitialDataLoaded(data) {
		store.dispatch(onInitialLoad());
		this.setState({ data });
	}

	render({ isPhone, isInitialDataLoaded }, { data }) {
		if (!isInitialDataLoaded) return <span>loading...</span>;
		return (
			<div class="app">
				<Home/>
				<Router>
				</Router>
				<AboutOverlay text={data.about} />
			</div>
		);
	}
}

const mapStateToProps = ({ isPhone, isInitialDataLoaded }) => {
	return { isPhone, isInitialDataLoaded };
};

export default connect(
	mapStateToProps,
)(App);


