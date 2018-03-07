// NPM
import { h, render, Component } from 'preact';

// Components
import About from '../../components/About/About';
import Feed from '../../components/Feed/Feed';

const View = ({ aboutText, feedItems }) => (
	<main data-page="home" class="home">
		<About text={aboutText} />
		<Feed items={feedItems} />
	</main>
);



class Home extends Component {
	render(props, state) {
		console.log(props);
		return <View { ...props } />;
	}
};

export default Home;
