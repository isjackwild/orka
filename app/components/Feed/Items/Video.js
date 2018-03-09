// NPM
import { h, render, Component } from 'preact';

import VideoPreview from '../../VideoPreview/VideoPreview'

import { FEED_CATEGORIES } from '../../../CONSTANTS';

const Video = ({ title, type, ytid }) => (
	<li class="feed__item feed__item--video">
		<span class="feed__item-type">{FEED_CATEGORIES[type]}</span>
		<div class="feed__item-title-wrapper">
			<h1 class="feed__item-title">{title}</h1>
			<span class="feed__item-link">Fullscreen ❊</span>
		</div>
		<VideoPreview youtubeId={ytid} />
	</li>
);


export default Video;
