// NPM
import { h, render, Component } from 'preact';

import About from '../components/About/About';

const View = ({ text }) => (
	<div class="about-overlay">
		<About text={text} />
	</div>
);


class AboutOverlay extends Component {
	componentDidMount() {
	}

	render(props, state) {
		return <View { ...props } />;
	}
};

export default AboutOverlay;
