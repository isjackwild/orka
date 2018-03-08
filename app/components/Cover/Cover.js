// NPM
import { h, render, Component } from 'preact';
import { init } from './drawing';

const View = () => (
	<section class="cover">
		<canvas class="cover__canvas"></canvas>
	</section>
);


class Cover extends Component {
	componentDidMount() {
		requestAnimationFrame(init);
	}

	render(props, state) {
		return <View { ...props } { ...state } />;
	}
};

export default Cover;
