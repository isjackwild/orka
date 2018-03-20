// NPM
import { h, render, Component } from 'preact';


class ImageLoader extends Component {
	state = {
		loaded: false,
	}

	componentDidMount() {
		const loadImg = new Image();
		loadImg.onload = () => this.setState({ loaded: true });
		loadImg.src = this.props.src;
	}

	render({ src, className }, { loaded }) {
		return <div class={`image-loader ${className}`}><img class={`image-loader__image image-loader__image--${loaded ? 'loaded' : 'loading'}`} src={src} /></div>
	}
};

export default ImageLoader;

