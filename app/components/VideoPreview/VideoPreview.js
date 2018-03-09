// NPM
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

class VideoPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playState: -1,
			playStarted: false,
			previewLoading: false,
		};

		this.onPlayerReady = this.onPlayerReady.bind(this);
		this.onPlayerStateChange = this.onPlayerStateChange.bind(this);

		this.ytPlayer = null;
		this.randomId = this.generateId();
	}

	componentWillUmount() {
		if (!this.ytPlayer) return;
		this.ytPlayer.destroy();
	}

	componentDidMount() {
		this.connectAPI();
	}

	generateId() {
		const S4 = () => {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4());
	}

	connectAPI() {
		if (window.yt) return this.onYouTubeIframeAPIReady();

		const tag = document.createElement('script');
		tag.type = 'text/javascript';
		tag.src = '//www.youtube.com/iframe_api';
		tag.id = 'youtubeApi';

		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
	}

	onYouTubeIframeAPIReady() {
		this.setState({ previewLoading: true });
		console.log(this.props.youtubeId);

		const params = {
			height: '200%',
			width: '200%',
			playerVars: {
				controls: 0,
				color: 'white',
				modestbranding: 1,
				autoplay: 1,
				loop: 1,
				videoId: this.props.youtubeId,
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

		this.ytPlayer = new YT.Player(`video-preview__player--${this.randomId}`, params);
		this.ytPlayer.allowedGestureDelegation = 'media';
	}

	onPlayerReady(e) {
		console.log('on ready');
		this.ytPlayer.setVolume(0);
		this.ytPlayer.loadVideoById(this.props.youtubeId);
	}

	onPlayerStateChange(e) {
		this.setState({ playState: e.data });
		if (e.data === 1 && !this.state.playStarted) this.onPreviewStartPlaying();
	}

	onPreviewStartPlaying() {
		this.setState({ playStarted: true, previewLoading: false });
	}

	render() {
		const className = `video-thumbnail ${this.state.playStarted ? 'video-thumbnail--show-preview' : ''} ${this.state.previewLoading ? 'video-thumbnail--preview-loading' : ''} ${this.props.className}`;
		const style = { backgroundImage: `url('${this.props.src}')` };

		return (
			<div class="video-preview"><div className="video-preview__player" id={`video-preview__player--${this.randomId}`}></div></div>
		);
	}
}

export default VideoPreview;

