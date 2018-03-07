// NPM
import Router from 'preact-router';
import Match from 'preact-router/match';
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

// API
import { onInitialLoad, toggleAboutOverlay } from './state/actions';
import store from './state/store';

// Pages
import Home from './pages/Home/Home';
import FourOhFour from './pages/404/404';
import AboutOverlay from './pages/AboutOverlay/AboutOverlay';

// Components
import Footer from './components/Footer/Footer';


class App extends Component {
	state = {
		data: null,
	}

	constructor(props) {
		super(props);
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

	render({ isPhone, isInitialDataLoaded, showAboutOverlay }, { data }) {
		console.log(data);
		if (!isInitialDataLoaded) return <span>loading...</span>;
		return (
			<div class="app">
				<Home aboutText={data.about} feedItems={data.feed.items}/>
				<Router>
				</Router>
				<AboutOverlay text={data.about} />
				<Footer />
				<div class="show-about" onClick={showAboutOverlay}>ABOUT</div>
			</div>
		);
	}
}

const mapStateToProps = ({ isPhone, isInitialDataLoaded }) => {
	return { isPhone, isInitialDataLoaded };
};

const mapDispatchToProps = (dispatch) => {
	return {
		showAboutOverlay: () => {
			dispatch(toggleAboutOverlay());
		},
	};
};


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);


