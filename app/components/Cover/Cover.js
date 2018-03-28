// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';
import 'gsap/TweenLite';
import 'gsap/ScrollToPlugin';
import 'gsap/EasePack';
import page from 'page';
import PubSub from 'pubsub-js';

// API
import { toggleAboutOverlay } from '../../state/actions';


import { init, play, pause} from './drawing';

const View = ({ opacity, wrapperFixed, overlayOpen, onClick }) => (
	<section class="cover">
		<div class={`cover__canvas-wrapper ${wrapperFixed || overlayOpen ? 'cover__canvas-wrapper--fixed' : null }`} onClick={onClick}>
			<canvas class="cover__canvas" onClick={e => e.stopPropagation()}></canvas>
		</div>
	</section>
);


class Cover extends Component {
	state = {
		height: 0,
		opacity: 1,
		wrapperFixed: false, 
	}

	constructor(props) {
		super(props);

		this.onResize = _.throttle(this.onResize, 111).bind(this);
		this.onScroll = _.throttle(this.onScroll, 16.66).bind(this);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		requestAnimationFrame(init);
		this.onResize();
		window.addEventListener('resize', this.onResize);
		window.addEventListener('scroll', this.onScroll);
	}

	onScroll() {
		if (this.state.offsetTop === null) return;
		const st = document.documentElement.scrollTop || document.body.scrollTop || 0;
		
		const opacity = Math.max(1 - (st / this.state.height), 0);
		this.setState({ opacity });

		// const imageHeight = Math.max(this.state.height - st, 20) + 'px';
		// this.setState({ imageHeight });


		if (st + 20 >= this.state.height && !this.state.wrapperFixed) {
			this.setState({ wrapperFixed: true });
		} else if (st + 20 < this.state.height && this.state.wrapperFixed) {
			this.setState({ wrapperFixed: false });
		}
		// if (opacity < 0) return pause();
		// return play();
	}

	onResize() {
		// console.dir(document.querySelector('.sticky-nav__wrapper'));
		const rect = document.querySelector('.cover').getBoundingClientRect();
		const height = rect.height;
		this.setState({ height });
		this.onScroll();
	}

	onClick() {
		if (this.props.isAboutOverlayVisible || this.props.currentPage) return PubSub.publish('overlay.close');
		return this.backToTop();
	}

	backToTop() {
		TweenLite.to(window, 1.5, { scrollTo: 0, ease: Power3.easeOut });
	}

	render(props, state) {
		return <View { ...props } { ...state } onClick={this.onClick} />;
	}
};

const mapStateToProps = ({ isPageOverlayVisible, isAboutOverlayVisible, currentPage }) => {
	return { isPageOverlayVisible, currentPage, isAboutOverlayVisible, overlayOpen: (isAboutOverlayVisible || isPageOverlayVisible || currentPage) };
};


export default connect(
	mapStateToProps,
)(Cover);

