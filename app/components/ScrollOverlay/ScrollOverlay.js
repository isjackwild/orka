// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';
import page from 'page';
import PubSub from 'pubsub-js';
import 'gsap/TweenLite';
import 'gsap/ScrollToPlugin';
import 'gsap/EasePack';

// API
import { toggleAboutOverlay } from '../../state/actions';

// Components
import About from '../../components/About/About';

// OTHER
import Easing from '../../utils/Easings';

const SCROLL_LENGTH = 88;

const View = ({ isPhone, _id, classes, isVisible, onScroll, shimOpacity, applyInnerTransform, contentHeight, contentScroll, scrollTop, children, hide }) => (
	<div class={`scroll-overlay scroll-overlay--${_id} scroll-overlay--${isVisible ? 'visible' : 'hidden'}`} onScroll={onScroll}>
		<div class={`scroll-overlay__shim ${!applyInnerTransform ? 'scroll-overlay__shim--visible' : ''}`} style={{ opacity: shimOpacity }}></div>
		<span class={`scroll-overlay__hint ${!applyInnerTransform ? 'scroll-overlay__hint--visible' : ''}`} onClick={hide}></span>
		<div
			class="scroll-overlay__spacer"
			style={{ height: `${isPhone ? contentHeight + window.innerHeight : contentHeight + SCROLL_LENGTH + window.innerHeight}px` }}
		></div>
		<div class="scroll-overlay__inner-scroller" style={{ transform: `translate3d(0, ${Math.floor((contentScroll * -1) + scrollTop)}px, 0)` }}>
			<div
				class={`scroll-overlay__inner scroll-overlay__inner--${_id} ${applyInnerTransform ? 'scroll-overlay__inner--transform' : ''}`}
			>{children}</div>
		</div>
	</div>
);

class ScrollOverlay extends Component {
	state = {
		applyInnerTransform: true,
		shimOpacity: 0,
		contentHeight: null,
		contentScroll: 0,
		scrollTop: 0,
		goHomeOnRemove: false,
		_id: null,
	}

	constructor(props) {
		super(props);
		this.setState({ _id: this.generateId() })
		this.onScroll = _.throttle(this.onScroll, 8).bind(this);
		this.onResize = _.throttle(this.onResize, 111).bind(this);
		this.close = this.close.bind(this);
	}

	generateId() {
		const S4 = () => {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4());
	}

	componentWillMount() {
		if (this.props.isVisible) {
			this.setState({ goHomeOnRemove: true, applyInnerTransform: false });
		}
	}

	componentDidMount() {
		this.onResize();
		PubSub.subscribe('content.resize', this.onResize);
		PubSub.subscribe('overlay.close', this.close);
		if (this.props.isVisible) {
			this.show();
		}
	}

	componentDidUpdate({ isVisible }) {
		if (!isVisible && this.props.isVisible) this.show();
	}

	onScroll({ target }) {
		const max = target.scrollHeight - window.innerHeight;
		const scrollOut = target.scrollTop - (this.state.contentHeight + (this.props.isPhone ? 0 : SCROLL_LENGTH) - (window.innerHeight * 0.5));
		const shimOpacity = Math.min(1 - scrollOut / (window.innerHeight * 0.5), 1);
		const contentScroll = this.props.isPhone ? target.scrollTop : (Easing.Sinusoidal.EaseOut(target.scrollTop / max) * this.state.contentHeight);
		this.setState({ shimOpacity, contentScroll, scrollTop: target.scrollTop });

		if (target.scrollTop >= max) {
			this.props.hide();
			this.setState({ applyInnerTransform: true });
			if (this.state.goHomeOnRemove) page('/');
		}
	}

	onResize() {
		this.setState({ contentHeight: document.querySelector(`.scroll-overlay__inner--${this.state._id}`).getBoundingClientRect().height });
	}

	show() {
		this.onResize();
		document.querySelector(`.scroll-overlay--${this.state._id}`).scrollTop = 0;
		this.setState({ applyInnerTransform: false, shimOpacity: 1 });
	}

	close() {
		if (!this.props.isVisible) return;
		const el = document.querySelector(`.scroll-overlay--${this.state._id}`);
		TweenLite.to(el, 1.5, { scrollTo: (el.scrollHeight - window.innerHeight) + 11, ease: Power3.easeOut });

		console.log('close overlay');
	}

	render(props, state) {
		return (
			<View { ...props } { ...state } onScroll={this.onScroll} hide={props.hide}>{props.children}</View>
		);
	}
};


const mapStateToProps = ({ isPhone }) => {
	return { isPhone };
};


export default connect(
	mapStateToProps,
)(ScrollOverlay);