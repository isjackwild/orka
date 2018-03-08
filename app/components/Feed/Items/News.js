// NPM
import { h, render, Component } from 'preact';

import { FEED_CATEGORIES } from '../../../CONSTANTS';

const News = ({ title, type, slug }) => (
	<li class="feed__item feed__item--news">
		<span class="feed__item-type">{FEED_CATEGORIES[type]}</span>
		<div class="feed__item-title-wrapper">
			<h1 class="feed__item-title">{title}</h1>
			<a class="feed__item-link" href={slug}>Read More →</a>
		</div>
	</li>
);


export default News;
