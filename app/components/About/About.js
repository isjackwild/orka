// NPM
import { h, render, Component } from 'preact';
import _ from 'lodash';

const ContactOption = ({ name, email }) => (
	<div class="contact-option">
		<span class="contact-option__name">{name}</span>
		<a class="contact-option__email" target="_blank" href={`mailto:${email}`}>{email}</a>
	</div>
);

const About = ({ text, contact }) => {
	const emailChunks = _.chunk(contact.emails, 2);
	return (
		<section class="about">
			<div class="about__text" dangerouslySetInnerHTML={{ __html: text }}></div>
			<div class="about__contact">
				{emailChunks.map(c => {
					return (
						<div class="about__contact-col">
							{c.map(e => <ContactOption name={e.name} email={e.emailaddress} />)}
						</div>
					);
				})}
			</div>
			<ul class="about__social">
				{contact.instagram ? <li class="about__social-item about__social-item--ig"><a target="_blank" href={contact.instagram}></a></li> : null}
				{contact.facebook ? <li class="about__social-item about__social-item--fb"><a target="_blank" href={contact.facebook}></a></li> : null}
				{contact.twitter ? <li class="about__social-item about__social-item--t"><a target="_blank" href={contact.twitter}></a></li> : null}
				{contact.bandcamp ? <li class="about__social-item about__social-item--bc"><a target="_blank" href={contact.bandcamp}></a></li> : null}
				{contact.vimeo ? <li class="about__social-item about__social-item--v"><a target="_blank" href={contact.vimeo}></a></li> : null}
				{contact.youtube ? <li class="about__social-item about__social-item--yt"><a target="_blank" href={contact.youtube}></a></li> : null}
			</ul>
			<span class="about__credits">Site design and development by <a target="_blank" href="https://www.isjackwild.com">Jack Wild</a></span>
		</section>
	)
};


export default About;