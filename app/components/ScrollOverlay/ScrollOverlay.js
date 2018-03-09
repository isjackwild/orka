// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';
import page from 'page';

// API
import { toggleAboutOverlay } from '../../state/actions';

// Components
import About from '../../components/About/About';

// OTHER
import Easing from '../../utils/Easings';

const SCROLL_LENGTH = 1.33;

const View = ({ isPhone, _id, classes, isVisible, onScroll, shimOpacity, applyInnerTransform, contentHeight, contentScroll, children }) => (
	<div class={`scroll-overlay scroll-overlay--${_id} scroll-overlay--${isVisible ? 'visible' : 'hidden'}`} onScroll={onScroll}>
		<div class={`scroll-overlay__shim ${!applyInnerTransform ? 'scroll-overlay__shim--visible' : ''}`} style={{ opacity: shimOpacity }}></div>
		<div
			class="scroll-overlay__spacer"
			style={{ height: `${contentHeight * (isPhone ? 1 : SCROLL_LENGTH)}px` }}
		></div>
		<div class="scroll-overlay__inner-scroller" style={{ transform: `translate3d(0, ${contentScroll * -1}px, 0)` }}>
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
		goHomeOnRemove: false,
		_id: null,
	}


	constructor(props) {
		super(props);
		this.setState({ _id: this.generateId() })
		this.onScroll = _.throttle(this.onScroll, 8).bind(this);
		this.onResize = _.throttle(this.onResize, 111).bind(this);
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
		if (this.props.isVisible) {
			this.show();
		}
	}

	componentDidUpdate({ isVisible }) {
		if (!isVisible && this.props.isVisible) this.show();
	}

	onScroll({ target }) {
		const max = target.scrollHeight - window.innerHeight;
		const scrollOut = target.scrollTop - (this.state.contentHeight * (this.props.isPhone ? 1 : SCROLL_LENGTH) - window.innerHeight);
		const shimOpacity = Math.min(1 - scrollOut / window.innerHeight, 1);
		const contentScroll = this.props.isPhone ? target.scrollTop : Easing.Cubic.EaseOut(target.scrollTop / max) * this.state.contentHeight;

		this.setState({ shimOpacity, contentScroll: contentScroll * 1.01, });
		if (target.scrollTop === max) {
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

	render(props, state) {
		return (
			<View { ...props } { ...state } onScroll={this.onScroll}>{props.children}</View>
		);
	}
};


const mapStateToProps = ({ isPhone }) => {
	return { isPhone };
};


export default connect(
	mapStateToProps,
)(ScrollOverlay);