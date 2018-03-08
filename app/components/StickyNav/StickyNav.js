// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

// API
import { toggleAboutOverlay } from '../../state/actions';

// Components
import FeedFilter from '../FeedFilter/FeedFilter';

const View = ({ showAbout, position }) => (
	<div class="sticky-nav__wrapper">
		<nav class="sticky-nav" style={{ position }}>
			<span class="about-button" onClick={showAbout}>ORKA</span>
			<FeedFilter />
		</nav>
	</div>
);


class StickyNav extends Component {
	state = {
		position: 'relative',
		offsetTop: null,
	}

	constructor(props) {
		super(props);
		this.onResize = _.throttle(this.onResize, 111).bind(this);
		this.onScroll = _.throttle(this.onScroll, 16.66).bind(this);
	}

	componentDidMount() {
		this.onResize();
		window.addEventListener('resize', this.onResize);
		window.addEventListener('scroll', this.onScroll);
	}

	onScroll() {
		if (this.state.offsetTop === null) return;
		const st = document.documentElement.scrollTop || document.body.scrollTop || 0;
		
		if (st > this.state.offsetTop && this.state.position === 'relative') {
			this.setState({ position: 'fixed' });
		} else if (st <= this.state.offsetTop && this.state.position === 'fixed') {
			this.setState({ position: 'relative' });
		}
	}

	onResize() {
		// console.dir(document.querySelector('.sticky-nav__wrapper'));
		const rect = document.querySelector('.sticky-nav__wrapper').getBoundingClientRect();
		const st = document.documentElement.scrollTop || document.body.scrollTop || 0;
		const offsetTop = rect.top + st;
		this.setState({ offsetTop });
		this.onScroll();
	}

	render(props, state) {
		return <View { ...props } { ...state } />;
	}
};


const mapStateToProps = ({ isAboutOverlayVisible }) => {
	return { isAboutOverlayVisible };
};

const mapDispatchToProps = (dispatch) => {
	return {
		showAbout: () => {
			dispatch(toggleAboutOverlay());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(StickyNav);

