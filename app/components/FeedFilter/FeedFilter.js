// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

// API
import { setFilter } from '../../state/actions';

// OTHER
import { FEED_CATEGORIES } from '../../CONSTANTS';

const Filter = ({ feedFilter, setFilter }) => (
	<ul class="filter">
		<li class={`filter__option filter__option--${feedFilter === 'feed--all' ? 'active' : 'inactive'}`}  data-filter="feed--all" data-active={feedFilter === 'feed--all'} onClick={setFilter}>All</li>
		{_.map(FEED_CATEGORIES, (key, value) => {
			const active = feedFilter === value;
			return <li class={`filter__option filter__option--${active ? 'active' : 'inactive'}`} data-filter={value} data-active={active} onClick={setFilter}>{key}</li>
		})}
	</ul>
);



const mapStateToProps = ({ feedFilter }) => {
	return { feedFilter };
};

const mapDispatchToProps = (dispatch) => {
	return {
		setFilter: ({ target }) => {
			dispatch(setFilter(target.dataset.filter));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Filter);

