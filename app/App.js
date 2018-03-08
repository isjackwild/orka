// NPM
import Router from 'preact-router';
import { route } from 'preact-router';
import Match from 'preact-router/match';
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

// API
import { onInitialLoaded, toggleAboutOverlay } from './state/actions';
import store from './state/store';

// Pages
import Home from './pages/Home/Home';
import FourOhFour from './pages/404/404';
import AboutOverlay from './pages/AboutOverlay/AboutOverlay';
import PageOverlay from './pages/PageOverlay/PageOverlay';

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
		console.log(data);
		store.dispatch(onInitialLoaded());
		this.setState({ data });
	}

	render({ isPhone, isInitialDataLoaded, showAbout }, { data }) {
		if (!isInitialDataLoaded) return <span>loading...</span>;
		return (
			<div class="app">
				<Home aboutText={data.about} feedItems={data.feed.items}/>
				<Footer />
				<Router>
					<div default></div>
					<PageOverlay path="/:slug" />
					<Match path="/about">{ showAbout }</Match>
					<Match path="/contact">{ showAbout }</Match>
				</Router>
				<AboutOverlay text={data.about} />
			</div>
		);
	}
}

const mapStateToProps = ({ isPhone, isInitialDataLoaded }) => {
	return { isPhone, isInitialDataLoaded };
};

const mapDispatchToProps = (dispatch) => {
	return {
		showAbout: () => {
			console.log('show about');
			dispatch(toggleAboutOverlay());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);


