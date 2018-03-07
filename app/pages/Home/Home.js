// NPM
import { h, render, Component } from 'preact';

// Components
import About from '../../components/About/About';
import Feed from '../../components/Feed/Feed';
import StickyNav from '../../components/StickyNav/StickyNav';

const View = ({ aboutText, feedItems }) => (
	<main data-page="home" class="home">
		<About text={aboutText} />
		<StickyNav />
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
