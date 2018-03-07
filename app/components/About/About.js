// NPM
import { h, render, Component } from 'preact';

const About = ({ text }) => (
	<section class="about">
		<span dangerouslySetInnerHTML={{ __html: text }}></span>
	</section>
);


export default About;
