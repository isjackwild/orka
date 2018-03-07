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
		return _.filter(items, item => feedFilter === item.type)
	})();

	return (
		<section class="feed">
			<ul class="feed__items">
				{filteredItems.map(item => {
					switch(item.type) {
						case 'feed--live':
							return <Live title={item.title} link={item.link} type={item.type} />;
						case 'feed--news':
							return <News title={item.title} type={item.type} />;
						case 'feed--shop':
							return <Shop title={item.title} link={item.link} type={item.type} />;
						case 'feed--video':
							return <Video title={item.title} type={item.type} />;
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
