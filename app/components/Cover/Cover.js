// NPM
import { h, render, Component } from 'preact';
import { init, play, pause} from './drawing';
import _ from 'lodash';

const View = ({ opacity, wrapperFixed }) => (
	<section class="cover">
		<div class={`cover__canvas-wrapper ${wrapperFixed ? 'cover__canvas-wrapper--fixed' : null }`}>
			<canvas class="cover__canvas" style={{ opacity }}></canvas>
		</div>
		<img class="cover__wordmark" src="assets/images/orka-wordmark.png" />
	</section>
);


class Cover extends Component {
	state = {
		height: 0,
		opacity: 1,
		wrapperFixed: false, 
	}

	constructor(props) {
		super(props);

		this.onResize = _.throttle(this.onResize, 111).bind(this);
		this.onScroll = _.throttle(this.onScroll, 16.66).bind(this);
	}

	componentDidMount() {
		requestAnimationFrame(init);
		this.onResize();
		window.addEventListener('resize', this.onResize);
		window.addEventListener('scroll', this.onScroll);
	}

	onScroll() {
		if (this.state.offsetTop === null) return;
		const st = document.documentElement.scrollTop || document.body.scrollTop || 0;
		
		const opacity = Math.max(1 - (st / this.state.height), 0.8);
		this.setState({ opacity });

		// const imageHeight = Math.max(this.state.height - st, 20) + 'px';
		// this.setState({ imageHeight });


		if (st + 20 >= this.state.height && !this.state.wrapperFixed) {
			this.setState({ wrapperFixed: true });
		} else if (st + 20 < this.state.height && this.state.wrapperFixed) {
			this.setState({ wrapperFixed: false });
		}
		// if (opacity < 0) return pause();
		// return play();
	}

	onResize() {
		// console.dir(document.querySelector('.sticky-nav__wrapper'));
		const rect = document.querySelector('.cover').getBoundingClientRect();
		const height = rect.height;
		this.setState({ height });
		this.onScroll();
	}

	render(props, state) {
		return <View { ...props } { ...state } />;
	}
};

export default Cover;
