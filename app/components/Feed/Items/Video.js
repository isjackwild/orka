// NPM
import { h, render, Component } from 'preact';

import VideoPreview from '../../VideoPreview/VideoPreview'

import { FEED_CATEGORIES } from '../../../CONSTANTS';

const View = ({ title, slug, type, ytid, isFullscreen, toggleFullscreen, fallbackImage, showCursor, hideCursor }) => (
	<li class="feed__item feed__item--video">
		<span class="feed__item-type">{FEED_CATEGORIES[type]}</span>
		<div class="feed__item-title-wrapper">
			<h1 class="feed__item-title"><a href={slug} onMouseEnter={showCursor} onMouseLeave={hideCursor}>{title}</a></h1>
			<a class="feed__item-link" href={slug} onClick={toggleFullscreen} onMouseEnter={showCursor} onMouseLeave={hideCursor}>Watch ❊</a>
		</div>
		<VideoPreview youtubeId={ytid} fallbackImage={fallbackImage} isFullscreen={isFullscreen} />
	</li>
);

class Video extends Component {
	state = {
		isFullscreen: false,
	}

	constructor(props) {
		super(props);

		this.toggleFullscreen = this.toggleFullscreen.bind(this);
	}

	toggleFullscreen() {
		this.setState({ isFullscreen: !this.state.isFullscreen });
	}

	render(props, state) {
		console.log(props);
		return <View { ...props } { ...state } toggleFullscreen={this.toggleFullscreen} />;
	}
}


export default Video;
