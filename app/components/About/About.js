// NPM
import { h, render, Component } from 'preact';
import _ from 'lodash';
import { connect } from 'preact-redux';

import { setCursorVisibility } from '../../state/actions';

const ContactOption = ({ name, email, showCursor, hideCursor }) => (
	<div class="contact-option" onMouseEnter={showCursor} onMouseLeave={hideCursor}>
		<a target="_blank" href={`mailto:${email}`}>
			<span class="contact-option__name">{name}</span>
			<span class="contact-option__email">{email}</span>
		</a>
	</div>
);

const View = ({ text, contact, showCursor, hideCursor }) => {
	const emailChunks = _.chunk(contact.emails, 2);
	return (
		<section class="about">
			<img class="about__orka" src="assets/images/orka--orka.svg" />
			<div class="about__text" dangerouslySetInnerHTML={{ __html: text }}></div>
			<div class="about__contact">
				{emailChunks.map(c => {
					return (
						<div class="about__contact-col">
							{c.map(e => <ContactOption name={e.name} email={e.emailaddress} showCursor={showCursor} hideCursor={hideCursor} />)}
						</div>
					);
				})}
			</div>
			<ul class="about__social">
				{contact.instagram ? <li class="about__social-item about__social-item--ig"><a target="_blank" href={contact.instagram} alt="instagram" onMouseEnter={showCursor} onMouseLeave={hideCursor}><i class="fab fa-instagram"></i></a></li> : null}
				{contact.facebook ? <li class="about__social-item about__social-item--fb"><a target="_blank" href={contact.facebook} alt="facebook" onMouseEnter={showCursor} onMouseLeave={hideCursor}><i class="fab fa-facebook-f"></i></a></li> : null}
				{contact.twitter ? <li class="about__social-item about__social-item--t"><a target="_blank" href={contact.twitter} alt="twitter" onMouseEnter={showCursor} onMouseLeave={hideCursor}><i class="fab fa-twitter"></i></a></li> : null}
				{contact.bandcamp ? <li class="about__social-item about__social-item--bc"><a target="_blank" href={contact.bandcamp} alt="bandcamp" onMouseEnter={showCursor} onMouseLeave={hideCursor}><i class="fab fa-bandcamp"></i></a></li> : null}
				{contact.vimeo ? <li class="about__social-item about__social-item--v"><a target="_blank" href={contact.vimeo} alt="vimeo" onMouseEnter={showCursor} onMouseLeave={hideCursor}><i class="fab fa-vimeo"></i></a></li> : null}
				{contact.youtube ? <li class="about__social-item about__social-item--yt"><a target="_blank" href={contact.youtube} alt="youtube" onMouseEnter={showCursor} onMouseLeave={hideCursor}><i class="fab fa-youtube"></i></a></li> : null}
			</ul>
			<span class="about__credits">Site design and development by <a target="_blank" href="https://www.isjackwild.com" onMouseEnter={showCursor} onMouseLeave={hideCursor}>Jack Wild</a></span>
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


const mapStateToProps = () => {
	return {}
};

const mapDispatchToProps = (dispatch) => {
	return {
		showCursor: () => {
			dispatch(setCursorVisibility(true));
		},
		hideCursor: () => {
			dispatch(setCursorVisibility(false))
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(About);



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