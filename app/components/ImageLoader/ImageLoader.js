// NPM
import { h, render, Component } from 'preact';
import PubSub from 'pubsub-js';


class ImageLoader extends Component {
	state = {
		loaded: false,
	}

	constructor(props) {
		super(props);

		this.placeholderStyle = Math.floor(Math.random() * 12);
		this.onLoad = this.onLoad.bind(this);
	}

	componentDidMount() {
		const loadImg = new Image();
		loadImg.onload = this.onLoad;
		loadImg.src = this.props.src;
	}

	onLoad() {
		this.setState({ loaded: true });
		PubSub.publish('content.resize');
	}

	render({ src, className }, { loaded }) {
		return (
			<div class={`image-loader ${className} placeholder placeholder--${this.placeholderStyle}`}>
				<img class={`image-loader__image image-loader__image--${loaded ? 'loaded' : 'loading'}`} src={src} />
			</div>
		)
	}
};

export default ImageLoader;

