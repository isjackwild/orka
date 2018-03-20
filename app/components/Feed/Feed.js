// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import Live from './Items/Live';
import News from './Items/News';
import Shop from './Items/Shop';
import Video from './Items/Video';

const Feed = ({ items, feedFilter }) => {
	const filteredItems = (() => {
		if (feedFilter === 'feed--all') return items;
		return _.filter(items, item => feedFilter === item.type);
	})();

	return (
		<section class="feed">
			<ul class="feed__items">
				{filteredItems.map(item => {
					switch(item.type) {
						case 'feed--live':
							return <Live { ...item } />;
						case 'feed--news':
							return <News { ...item } />;
						case 'feed--shop':
							return <Shop { ...item } />;
						case 'feed--video':
							return <Video { ...item } />;
					}
				})}
			</ul>
		</section>
	);
}


const mapStateToProps = ({ feedFilter }) => {
	return { feedFilter };
};


export default connect(
	mapStateToProps,
)(Feed);
