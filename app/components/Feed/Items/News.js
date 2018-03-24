// NPM
import { h, render, Component } from 'preact';

import ImageLoader from '../../ImageLoader/ImageLoader';
import { FEED_CATEGORIES } from '../../../CONSTANTS';


const News = ({ title, type, slug, images, showCursor, hideCursor }) => (
	<li class="feed__item feed__item--news">
		<span class="feed__item-type">{FEED_CATEGORIES[type]}</span>
		<div class="feed__item-title-wrapper">
			<h1 class="feed__item-title" ><a href={slug} onMouseEnter={showCursor} onMouseLeave={hideCursor}>{title}</a></h1>
			<a class="feed__item-link" href={slug} onMouseEnter={showCursor} onMouseLeave={hideCursor}>Read More →</a>
		</div>
		{images.length ?
			<a href={slug}><div class="feed__images" onMouseEnter={showCursor} onMouseLeave={hideCursor}>
				{ images.map((sizes) => <ImageLoader src={sizes.thumb} className="feed__image" />) }
			</div></a>
		: null}
	</li>
);


export default News;
