// NPM
import { h, render, Component } from 'preact';

import { FEED_CATEGORIES } from '../../../CONSTANTS';

const Shop = ({ title, link, type }) => (
	<li class="feed__item feed__item--shop">
		<span>{FEED_CATEGORIES[type]}</span>
		<h1>{title}</h1>
		<a target="_blank" href={link}>Link</a>
	</li>
);


export default Shop;
