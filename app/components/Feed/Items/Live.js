// NPM
import { h, render, Component } from 'preact';

import { FEED_CATEGORIES } from '../../../CONSTANTS';

const Live = ({ title, date, link, type, showCursor, hideCursor }) => (
	<li class="feed__item  feed__item--live">
		<span class="feed__item-type">{FEED_CATEGORIES[type]}</span>
		<div class="feed__item-title-wrapper">
			<h1 class="feed__item-title"><a target="_blank" href={link} onMouseEnter={showCursor} onMouseLeave={hideCursor}>{date} – {title}</a></h1>
			{ link ? <a class="feed__item-link" target="_blank" href={link} onMouseEnter={showCursor} onMouseLeave={hideCursor}>Tickets ❏</a> : null }
		</div>
	</li>
);


export default Live;
