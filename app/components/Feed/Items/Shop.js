// NPM
import { h, render, Component } from 'preact';

import { FEED_CATEGORIES } from '../../../CONSTANTS';

const Shop = ({ title, link, type, showCursor, hideCursor }) => (
	<li class="feed__item feed__item--shop">
		<span class="feed__item-type">{FEED_CATEGORIES[type]}</span>
		<div class="feed__item-title-wrapper">
			<h1 class="feed__item-title"><a target="_blank" href={link} onMouseEnter={showCursor} onMouseLeave={hideCursor}>{title}</a></h1>
			<a class="feed__item-link" target="_blank" href={link} onMouseEnter={showCursor} onMouseLeave={hideCursor}>Buy ☺</a>
		</div>
	</li>
);


export default Shop;
