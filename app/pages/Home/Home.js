// NPM
import { h, render, Component } from 'preact';

// Components
import About from '../../components/About/About';

const View = ({ aboutText }) => (
	<main data-page="home" class="home">
		<About text={aboutText} />
	</main>
);



class Home extends Component {
	render(props, state) {
		console.log(props);
		return <View { ...props } />;
	}
};

export default Home;
