// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

// API
import { onInitialLoaded, toggleAboutOverlay } from './state/actions';
import store from './state/store';
import { init as initRouter } from './routes';

// Pages
import Home from './pages/Home/Home';
import FourOhFour from './pages/404/404';
import AboutOverlay from './pages/AboutOverlay/AboutOverlay';
import PageOverlay from './pages/PageOverlay/PageOverlay';

// Components
import Footer from './components/Footer/Footer';
import ScrollOverlay from './components/ScrollOverlay/ScrollOverlay';


class App extends Component {
	state = {
		data: null,
	}

	constructor(props) {
		super(props);
		this.onInitialDataLoaded = this.onInitialDataLoaded.bind(this);
	}

	componentWillMount() {
		initRouter();
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

	render({ isPhone, isInitialDataLoaded }, { data }) {
		if (!isInitialDataLoaded) return null;
		return (
			<div class="app">
				<Home aboutText={data.about} feedItems={data.feed.items} contact={data.contact} />
				<PageOverlay/>
				<AboutOverlay text={data.about} contact={data.contact} />
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


