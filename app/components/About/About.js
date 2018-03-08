// NPM
import { h, render, Component } from 'preact';

const ContactOption = ({ name, email }) => (
	<div class="contact-option">
		<span class="contact-option__name">{name}</span>
		<a class="contact-option__email" target="_blank" href={`mailto:${email}`}>{email}</a>
	</div>
);

const About = ({ text }) => (
	<section class="about">
		<div class="about__text" dangerouslySetInnerHTML={{ __html: text }}></div>
		<div class="about__contact">
			<ContactOption name="Enquiries" email="orka@orkaonline.com" />
			<ContactOption name="Enquiries" email="orka@orkaonline.com" />
			<ContactOption name="Enquiries" email="orka@orkaonline.com" />
			<ContactOption name="Enquiries" email="orka@orkaonline.com" />
		</div>
		<span class="about__credits">Site design and development by <a target="_blank" href="https://www.isjackwild.com">Jack Wild</a></span>
	</section>
);


export default About;
