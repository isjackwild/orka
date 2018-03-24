// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';
import page from 'page';
import PubSub from 'pubsub-js';

// API
import { toggleAboutOverlay } from '../../state/actions';

// Components
import About from '../../components/About/About';
import ScrollOverlay from '../../components/ScrollOverlay/ScrollOverlay';


const View = ({ text, hide, contact, isVisible }) => (
	<ScrollOverlay isVisible={isVisible} hide={hide}><About text={text} contact={contact} /></ScrollOverlay>
);

class AboutOverlay extends Component {
	componentDidMount() {
		PubSub.subscribe('about.hide', () => this.props.hide());
	}

	render(props) {
		return <View { ...props } />
	}
}

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


