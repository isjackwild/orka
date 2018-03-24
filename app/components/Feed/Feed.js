// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';
import PreactCSSTransitionGroup from 'preact-css-transition-group';

import { setCursorVisibility } from '../../state/actions';

import Live from './Items/Live';
import News from './Items/News';
import Shop from './Items/Shop';
import Video from './Items/Video';

// const Feed = ({ items, feedFilter, showCursor, hideCursor }) => {
// }

class Feed extends Component {
	render({ items, feedFilter, showCursor, hideCursor }) {
		const filteredItems = (() => {
			if (feedFilter === 'feed--all') return items;
			return _.filter(items, item => feedFilter === item.type);
		})();

		const children = filteredItems.map(item => {
			switch(item.type) {
				case 'feed--live':
					return <Live { ...item } showCursor={showCursor} hideCursor={hideCursor} />;
				case 'feed--news':
					return <News { ...item } showCursor={showCursor} hideCursor={hideCursor} />;
				case 'feed--shop':
					return <Shop { ...item } showCursor={showCursor} hideCursor={hideCursor} />;
				case 'feed--video':
					return <Video { ...item } showCursor={showCursor} hideCursor={hideCursor} />;
			}
		});

		return (
			<section class="feed">
				<ul class="feed__items">
					<PreactCSSTransitionGroup transitionName="feed-transition" transitionEnter={true} transitionLeave={true} transitionEnterTimeout={3333} transitionLeaveTimeout={3333}> 
						{ children }
					</PreactCSSTransitionGroup>
				</ul>
			</section>
		);
	}
}


const mapStateToProps = ({ feedFilter }) => {
	return { feedFilter };
};

const mapDispatchToProps = (dispatch) => {
	return {
		showCursor: () => {
			dispatch(setCursorVisibility(true));
		},
		hideCursor: () => {
			dispatch(setCursorVisibility(false))
		},
	};
};


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Feed);
