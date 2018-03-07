// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

// API
import { toggleAboutOverlay } from '../../state/actions';

// Components
import About from '../../components/About/About';

const View = ({ text, isAboutOverlayVisible, onScroll, shimOpacity, applyInnerTransform }) => (
	<div class={`about-overlay about-overlay--${isAboutOverlayVisible ? 'visible' : 'hidden'}`} onScroll={onScroll}>
		<div class={`about-overlay__shim ${!applyInnerTransform ? 'about-overlay__shim--visible' : ''}`} style={{ opacity: shimOpacity }}></div>
		<div class={`about-overlay__inner ${applyInnerTransform ? 'about-overlay__inner--transform' : ''}`}>
			<About text={text} />
		</div>
	</div>
);


class AboutOverlay extends Component {
	state = {
		applyInnerTransform: true,
		shimOpacity: 0,
	}

	constructor(props) {
		super(props);
		this.onScroll = _.throttle(this.onScroll, 16.66).bind(this);
	}

	componentDidMount() {
	}

	componentDidUpdate({ isAboutOverlayVisible }) {
		if (!isAboutOverlayVisible && this.props.isAboutOverlayVisible) this.show();
	}

	onScroll({ target }) {
		const max = target.scrollHeight - window.innerHeight;
		const shimOpacity = 1 - (target.scrollTop / max);
		this.setState({ shimOpacity });
		if (target.scrollTop === max) {
			this.props.hide();
			this.setState({ applyInnerTransform: true });
		}
	}

	show() {
		document.querySelector('.about-overlay').scrollTop = 0;
		this.setState({ applyInnerTransform: false, shimOpacity: 1 });
	}

	render(props, state) {
		return <View { ...props } { ...state } onScroll={this.onScroll} />;
	}
};


const mapStateToProps = ({ isAboutOverlayVisible }) => {
	return { isAboutOverlayVisible };
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