// NPM
import { h, render, Component } from 'preact';

import { FEED_CATEGORIES } from '../../../CONSTANTS';

const Video = ({ title, type }) => (
	<li class="feed__item feed__item--video">
		<span>{FEED_CATEGORIES[type]}</span>
		<h1>{title}</h1>
		<a>Watch</a>
	</li>
);


export default Video;
