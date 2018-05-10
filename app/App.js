// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import 'gsap/TweenLite';
import 'gsap/ScrollToPlugin';
import 'gsap/EasePack';

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
	}

	componentWillMount() {
		initRouter();
		this.loadTimeout = setTimeout(() => {
			this.setState({ loadTimePassed: true });
			document.body.classList.remove('body--loading');
			if (this.state.data) store.dispatch(onInitialLoaded());
		}, 333);

		this.fetchInitialData();
	}

	fetchInitialData() {
		fetch(`/api/initial-data`)
			.then(response => response.json())
			.then(this.onInitialDataLoaded);
	}

	backToTop() {
		TweenLite.to(window, 1.5, { scrollTo: 0, ease: Power3.easeOut });
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
						<footer class="content-footer" onClick={this.backToTop}></footer>
						<Home aboutText={data.about} feedItems={data.feed.items} contact={data.contact} />
						<LoadingCover isVisible={isPageLoading } />
						<PageOverlay/>
						<AboutOverlay text={data.about} contact={data.contact} />
						<OrkaCursor />
					</span>
				: <LoadingCover isVisible={isPageLoading } />}
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


