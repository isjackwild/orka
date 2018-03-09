// NPM
import { h, render, Component } from 'preact';

// Components
import About from '../../components/About/About';
import Feed from '../../components/Feed/Feed';
import StickyNav from '../../components/StickyNav/StickyNav';
import Cover from '../../components/Cover/Cover';

const View = ({ aboutText, contact, feedItems }) => (
	<main data-page="home" class="home">
		<Cover />
		<div class="home__content">
			<About text={aboutText} contact={contact} />
			<StickyNav />
			<Feed items={feedItems} />
		</div>
	</main>
);



class Home extends Component {
	render(props, state) {
		return <View { ...props } />;
	}
};

export default Home;
