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
import LoadingCover from './components/LoadingCover/LoadingCover';

// Components
import Footer from './components/Footer/Footer';
import ScrollOverlay from './components/ScrollOverlay/ScrollOverlay';
import OrkaCursor from './components/OrkaCursor/OrkaCursor';


class App extends Component {
	state = {
		data: null,
		loadTimePassed: false,
	}
	loadTimeout = null;

	constructor(props) {
		super(props);
		this.onInitialDataLoaded = this.onInitialDataLoaded.bind(this);
		console.log('TODO: Draw a cool Orka whale, and use varios patterns for loading images backrounds')
	}

	componentWillMount() {
		initRouter();
		this.loadTimeout = setTimeout(() => {
			this.setState({ loadTimePassed: true });
			document.body.classList.remove('body--loading');
			if (this.state.data) store.dispatch(onInitialLoaded());
		}, 2222);

		this.fetchInitialData();
	}

	fetchInitialData() {
		fetch(`/api/initial-data`)
			.then(response => response.json())
			.then(this.onInitialDataLoaded);
	}

	onInitialDataLoaded(data) {
		this.setState({ data });
		if (!this.state.loadTimePassed) return;

		document.body.classList.remove('body--loading');
		store.dispatch(onInitialLoaded());
	}

	render({ isPhone, isInitialDataLoaded, isPageLoading }, { data }) {
		return (
			<div class={`app ${isPageLoading ? 'app--loading' : ''}`}>
				{isInitialDataLoaded ?
					<span>
						<footer class="content-footer"></footer>
						<Home aboutText={data.about} feedItems={data.feed.items} contact={data.contact} />
						<PageOverlay/>
						<AboutOverlay text={data.about} contact={data.contact} />
						<OrkaCursor />
					</span>
				: null}
				<LoadingCover isVisible={isPageLoading } />
			</div>
		);
	}
}

const mapStateToProps = ({ isPhone, isInitialDataLoaded, isPageLoading }) => {
	return { isPhone, isInitialDataLoaded, isPageLoading };
};


export default connect(
	mapStateToProps,
)(App);


