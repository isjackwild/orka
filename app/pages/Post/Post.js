// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import ImageLoader from '../../Components/ImageLoader/ImageLoader';

import { FEED_CATEGORIES } from '../../CONSTANTS';


const NewsView = ({ title, type, text, embeds, images, isVisible }) => (
	<section class={`post post--${isVisible ? 'visible' : 'hidden'}`}>
		<span class="post__type feed__item-type">{FEED_CATEGORIES[type]}</span>
		<h1 class="post__title feed__item-title">{title}</h1>
		{isVisible ?
			<div>
				<div class="post__text" dangerouslySetInnerHTML={{ __html: text }}>hey there</div>
				{embeds && embeds.length ?
					<div class="post__embeds">
						{ embeds.map(e => <div class={`post__embed placeholder placeholder--${Math.floor(Math.random() * 12)}`} dangerouslySetInnerHTML={{ __html: e }}>lkjlkj</div>) }
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

const VideoView = ({ title, type, text, embeds, images, isVisible, randomId, placeholderStyle }) => (
	<section class={`post post--video post--${isVisible ? 'visible' : 'hidden'}`}>
		<h1 class="post__title feed__item-title">{title}</h1>
		{isVisible ?
			<div class="post__video-wrapper"><div class={`post__video  placeholder placeholder--${placeholderStyle}`} id={`post__video--${randomId}`}></div></div>
		: null}
	</section>
);

class Post extends Component {
	state = {
		playstate: null,
		randomId: null,
	}

	constructor(props) {
		super(props);

		this.placeholderStyle = Math.floor(Math.random() * 12);

		this.onPlayerReady = this.onPlayerReady.bind(this);
		this.onPlayerStateChange = this.onPlayerStateChange.bind(this);

		this.ytPlayer = null;
	}

	generateId() {
		const S4 = () => {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4());
	}

	shouldComponentUpdate(newProps) {
		return this.props.title !== newProps.title;
	}

	componentWillMount() {
		this.setState({ randomId: this.generateId() });
	}

	componentDidMount() {
		if (this.props.youtubeApiReady && this.props.type === 'feed--video') return this.onYouTubeIframeAPIReady();
	}

	componentDidUpdate(lastProps) {
		if (!lastProps.youtubeApiReady && this.props.youtubeApiReady && this.props.type === 'feed--video') return this.onYouTubeIframeAPIReady();
	}

	generateId() {
		const S4 = () => {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4());
	}

	onYouTubeIframeAPIReady() {
		console.log('hey api');

		const params = {
			height: '200%',
			width: '200%',
			playerVars: {
				controls: 1,
				color: 'white',
				modestbranding: 1,
				autoplay: 1,
				loop: 1,
				videoId: this.props.ytid,
				showinfo: 0,
				autohide: 1,
				playsinline: 1,
				fs: 0,
				iv_load_policy: 3,
				cc_load_policy: 0,
				rel: 0,
			},
			events: {
				onReady: this.onPlayerReady,
				onStateChange: this.onPlayerStateChange,
			},
		};

		this.ytPlayer = new YT.Player(`post__video--${this.state.randomId}`, params);
		this.ytPlayer.allowedGestureDelegation = 'media';
	}

	onPlayerReady(e) {
		console.log('player ready', this.props.ytid);
		this.ytPlayer.loadVideoById({
			'videoId': this.props.ytid,
		});
	}

	onPlayerStateChange(e) {
		this.setState({ playState: e.data });
	}

	render(props, state) {
		if (props.type === 'feed--video') return <VideoView { ...props } { ...state } placeholderStyle={this.placeholderStyle} />;
		return <NewsView { ...props } />;
	}
}


const mapStateToProps = ({ youtubeApiReady }) => {
	return { youtubeApiReady };
};


export default connect(
	mapStateToProps,
)(Post);
