// NPM
import { h, render, Component } from 'preact';
import _ from 'lodash';

const ContactOption = ({ name, email }) => (
	<div class="contact-option">
		<span class="contact-option__name">{name}</span>
		<a class="contact-option__email" target="_blank" href={`mailto:${email}`}>{email}</a>
	</div>
);

const View = ({ text, contact }) => {
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
				{contact.instagram ? <li class="about__social-item about__social-item--ig"><a target="_blank" href={contact.instagram} alt="instagram"><i class="fab fa-instagram"></i></a></li> : null}
				{contact.facebook ? <li class="about__social-item about__social-item--fb"><a target="_blank" href={contact.facebook} alt="facebook"><i class="fab fa-facebook-f"></i></a></li> : null}
				{contact.twitter ? <li class="about__social-item about__social-item--t"><a target="_blank" href={contact.twitter} alt="twitter"><i class="fab fa-twitter"></i></a></li> : null}
				{contact.bandcamp ? <li class="about__social-item about__social-item--bc"><a target="_blank" href={contact.bandcamp} alt="bandcamp"><i class="fab fa-bandcamp"></i></a></li> : null}
				{contact.vimeo ? <li class="about__social-item about__social-item--v"><a target="_blank" href={contact.vimeo} alt="vimeo"><i class="fab fa-vimeo"></i></a></li> : null}
				{contact.youtube ? <li class="about__social-item about__social-item--yt"><a target="_blank" href={contact.youtube} alt="youtube"><i class="fab fa-youtube"></i></a></li> : null}
			</ul>
			<span class="about__credits">Site design and development by <a target="_blank" href="https://www.isjackwild.com">Jack Wild</a></span>
		</section>
	)
};


class About extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render(props, state) {
		return <View { ...props } { ...state } />;
	}
}

export default About;


// <a href="https://www.facebook.com/lionfishent/">
// 			<li class="social__icon social__icon--fb"><i class="fab fa-facebook-f"></i></li>
// 		</a>
// 		<a href="https://twitter.com/Lionfish_Ent">
// 			<li class="social__icon social__icon--t"><i class="fab fa-twitter"></i></li>
// 		</a>
// 		<a href="https://www.instagram.com/lionfish_entertainment/">
// 			<li class="social__icon social__icon--ig"><i class="fab fa-instagram"></i></li>
// 		</a>
// 		<a href="https://www.youtube.com/playlist?list=PLUMPgGwdOGO4E15p372wEenA_tVd02V7T">
// 			<li class="social__icon social__icon--yt"><i class="fab fa-youtube"></i></li>
// 		</a>