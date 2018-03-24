// NPM
import { h, render, Component } from 'preact';

const LoadingCover = ({ isVisible }) => (
	<div class={`loading-cover loading-cover--${isVisible ? 'visible' : 'hidden'}`}> 
		<h1 class="loading-cover__inner"></h1>
	</div>
);


export default LoadingCover;
