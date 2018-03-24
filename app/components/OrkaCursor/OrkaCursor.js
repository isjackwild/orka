// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

const View = ({ isOrkaCursorVisible, x, y }) => (
	<div class={`orka-cursor orka-cursor--${isOrkaCursorVisible ? 'visible' : 'hidden'}`} style={{transform: `translate3d(${x}px, ${y}px, 0)`}}></div>
);


class OrkaCursor extends Component {
	state = {
		x: -100,
		y: -100,
	}

	constructor(props) {
		super(props);
		this.onMouseMove = _.throttle(this.onMouseMove, 16.66).bind(this);
	}

	componentDidMount() {
		window.addEventListener('mousemove', this.onMouseMove);
	}

	onMouseMove({ clientX, clientY }) {
		this.setState({ x: clientX, y: clientY });
	}


	render(props, state) {
		return <View { ...props } { ...state } />;
	}
};


const mapStateToProps = ({ isOrkaCursorVisible }) => {
	return { isOrkaCursorVisible };
};

export default connect(
	mapStateToProps,
)(OrkaCursor);

