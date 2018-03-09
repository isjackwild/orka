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

const View = ({ text, contact, isVisible, onScroll, shimOpacity, applyInnerTransform, contentHeight, contentScroll }) => (
	<div class={`about-overlay about-overlay--${isVisible ? 'visible' : 'hidden'}`} onScroll={onScroll}>
		<div class={`about-overlay__shim ${!applyInnerTransform ? 'about-overlay__shim--visible' : ''}`} style={{ opacity: shimOpacity }}></div>
		<div
			class="about-overlay__spacer"
			style={{ height: `${contentHeight * SCROLL_LENGTH}px` }}
		></div>
		<div class="about-overlay__inner-scroller" style={{ transform: `translate3d(0, ${contentScroll * -1}px, 0)` }}>
			<div
				class={`about-overlay__inner ${applyInnerTransform ? 'about-overlay__inner--transform' : ''}`}
			>
				<About text={text} contact={contact} />
			</div>
		</div>
	</div>
);

class AboutOverlay extends Component {
	state = {
		applyInnerTransform: true,
		shimOpacity: 0,
		contentHeight: null,
		contentScroll: 0,
		goHomeOnRemove: false,
	}

	constructor(props) {
		super(props);
		this.onScroll = _.throttle(this.onScroll, 8).bind(this);
		this.onResize = _.throttle(this.onResize, 111).bind(this);
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
		const scrollOut = target.scrollTop - (this.state.contentHeight * SCROLL_LENGTH - window.innerHeight);
		const shimOpacity = Math.min(1 - scrollOut / window.innerHeight, 1);
		const contentScroll = Easing.Cubic.EaseOut(target.scrollTop / max) * this.state.contentHeight;

		this.setState({ shimOpacity, contentScroll: contentScroll * 1.01, });
		if (target.scrollTop === max) {
			this.props.hide();
			this.setState({ applyInnerTransform: true });
			if (this.state.goHomeOnRemove) page('/');
		}
	}

	onResize() {
		this.setState({ contentHeight: document.querySelector('.about-overlay__inner').getBoundingClientRect().height });
	}

	show() {
		this.onResize();
		document.querySelector('.about-overlay').scrollTop = 0;
		this.setState({ applyInnerTransform: false, shimOpacity: 1 });
	}

	render(props, state) {
		return <View { ...props } { ...state } onScroll={this.onScroll} />;
	}
};


const mapStateToProps = ({ isAboutOverlayVisible }) => {
	return { isVisible: isAboutOverlayVisible };
};

const mapDispatchToProps = (dispatch) => {
	return {
		hide: () => {
			dispatch(toggleAboutOverlay());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AboutOverlay);