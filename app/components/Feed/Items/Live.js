// NPM
import { h, render, Component } from 'preact';

import { FEED_CATEGORIES } from '../../../CONSTANTS';

const Live = ({ title, link, type }) => (
	<li class="feed__item  feed__item--live">
		<span>{FEED_CATEGORIES[type]}</span>
		<h1>{title}</h1>
		{ link ? <a target="_blank" href={link}>Link</a> : null }
	</li>
);


export default Live;
