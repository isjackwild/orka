// NPM
import { h, render, Component } from 'preact';

const View = ({ title }) => (
	<main data-page="home" class="home">
		<h1>Home</h1>
	</main>
);



class Home extends Component {
	render(props, state) {
		return <View { ...state.data } />;
	}
};

export default Home;
