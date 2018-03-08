// NPM
import { h, render, Component } from 'preact';

import { FEED_CATEGORIES } from '../../../CONSTANTS';

const Video = ({ title, type, slug }) => (
	<li class="feed__item feed__item--video">
		<span class="feed__item-type">{FEED_CATEGORIES[type]}</span>
		<div class="feed__item-title-wrapper">
			<h1 class="feed__item-title">{title}</h1>
			<a class="feed__item-link" href={slug}>Watch →</a>
		</div>
	</li>
);


export default Video;
