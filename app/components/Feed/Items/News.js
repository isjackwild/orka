// NPM
import { h, render, Component } from 'preact';

import { FEED_CATEGORIES } from '../../../CONSTANTS';

const News = ({ title, type }) => (
	<li class="feed__item feed__item--news">
		<span>{FEED_CATEGORIES[type]}</span>
		<h1>{title}</h1>
		<a>Read More</a>
	</li>
);


export default News;
