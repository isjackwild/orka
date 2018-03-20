// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import ImageLoader from '../../Components/ImageLoader/ImageLoader';

import { FEED_CATEGORIES } from '../../CONSTANTS';


const View = ({ title, type, text, embeds, images, isVisible }) => (
	<section class={`post post--${isVisible ? 'visible' : 'hidden'}`}>
		<span class="post__type feed__item-type">{FEED_CATEGORIES[type]}</span>
		<h1 class="post__title feed__item-title">{title}</h1>
		{isVisible ?
			<div>
				<div class="post__text" dangerouslySetInnerHTML={{ __html: text }}>hey there</div>
				{embeds && embeds.length ?
					<div class="post__embeds">
						{ embeds.map(e => <div class="post__embed" dangerouslySetInnerHTML={{ __html: e }}>lkjlkj</div>) }
					</div>
				: null}
				{images && images.length ?
					<div class="post__images">
						{ images.map(i => <ImageLoader className="post__image" src={i.hd} />) }
					</div>
				: null}
			</div>
		: null}
	</section>
);

class Post extends Component {
	shouldComponentUpdate(newProps) {
		return this.props.title !== newProps.title;
	}

	render(props) {
		return <View { ...props } />;
	}
}

export default Post;
