// NPM
import { h, render, Component } from 'preact';

import ImageLoader from '../../ImageLoader/ImageLoader';
import { FEED_CATEGORIES } from '../../../CONSTANTS';

// class FeedImage extends Component {
// 	state = {
// 		loaded: false,
// 	}

// 	componentDidMount() {
// 		const loadImg = new Image();
// 		loadImg.onload = () => this.setState({ loaded: true });
// 		loadImg.src = this.props.src;
// 	}

// 	render({ src }, { loaded }) {
// 		return <div class="feed__image-wrapper"><img class={`feed__image feed__image--${loaded ? 'loaded' : 'loading'}`} src={src} /></div>
// 	}
// };

const News = ({ title, type, slug, images }) => (
	<li class="feed__item feed__item--news">
		<span class="feed__item-type">{FEED_CATEGORIES[type]}</span>
		<div class="feed__item-title-wrapper">
			<h1 class="feed__item-title"><a href={slug}>{title}</a></h1>
			<a class="feed__item-link" href={slug}>Read More →</a>
		</div>
		{images.length ?
			<a href={slug}><div class="feed__images">
				{ images.map((sizes) => <ImageLoader src={sizes.thumb} className="feed__image" />) }
			</div></a>
		: null}
	</li>
);


export default News;
