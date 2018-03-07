(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preactRouter = require('preact-router');

var _preactRouter2 = _interopRequireDefault(_preactRouter);

var _match = require('preact-router/match');

var _match2 = _interopRequireDefault(_match);

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _actions = require('./state/actions');

var _store = require('./state/store');

var _store2 = _interopRequireDefault(_store);

var _Home = require('./pages/Home/Home');

var _Home2 = _interopRequireDefault(_Home);

var _ = require('./pages/404/404');

var _2 = _interopRequireDefault(_);

var _AboutOverlay = require('./pages/AboutOverlay/AboutOverlay');

var _AboutOverlay2 = _interopRequireDefault(_AboutOverlay);

var _Footer = require('./components/Footer/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // NPM


// API


// Pages


// Components


var App = function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {
			data: null
		};

		_this.onInitialDataLoaded = _this.onInitialDataLoaded.bind(_this);
		return _this;
	}

	_createClass(App, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.fetchInitialData();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			console.log('mounted App');
		}
	}, {
		key: 'fetchInitialData',
		value: function fetchInitialData() {
			fetch('/api/initial-data').then(function (response) {
				return response.json();
			}).then(this.onInitialDataLoaded);
		}
	}, {
		key: 'onInitialDataLoaded',
		value: function onInitialDataLoaded(data) {
			_store2.default.dispatch((0, _actions.onInitialLoad)());
			this.setState({ data: data });
		}
	}, {
		key: 'render',
		value: function render(_ref, _ref2) {
			var isPhone = _ref.isPhone,
			    isInitialDataLoaded = _ref.isInitialDataLoaded,
			    showAboutOverlay = _ref.showAboutOverlay;
			var data = _ref2.data;

			console.log(data);
			if (!isInitialDataLoaded) return (0, _preact.h)(
				'span',
				null,
				'loading...'
			);
			return (0, _preact.h)(
				'div',
				{ 'class': 'app' },
				(0, _preact.h)(_Home2.default, { aboutText: data.about, feedItems: data.feed.items }),
				(0, _preact.h)(_preactRouter2.default, null),
				(0, _preact.h)(_AboutOverlay2.default, { text: data.about }),
				(0, _preact.h)(_Footer2.default, null),
				(0, _preact.h)(
					'div',
					{ 'class': 'show-about', onClick: showAboutOverlay },
					'ABOUT'
				)
			);
		}
	}]);

	return App;
}(_preact.Component);

var mapStateToProps = function mapStateToProps(_ref3) {
	var isPhone = _ref3.isPhone,
	    isInitialDataLoaded = _ref3.isInitialDataLoaded;

	return { isPhone: isPhone, isInitialDataLoaded: isInitialDataLoaded };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		showAboutOverlay: function showAboutOverlay() {
			dispatch((0, _actions.toggleAboutOverlay)());
		}
	};
};

exports.default = (0, _preactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

},{"./components/Footer/Footer":10,"./pages/404/404":11,"./pages/AboutOverlay/AboutOverlay":12,"./pages/Home/Home":13,"./state/actions":15,"./state/store":17,"preact":33,"preact-redux":30,"preact-router":31,"preact-router/match":32}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var FEED_CATEGORIES = exports.FEED_CATEGORIES = [];
FEED_CATEGORIES["feed--live"] = "Live";
FEED_CATEGORIES["feed--news"] = "News";
FEED_CATEGORIES["feed--shop"] = "Shop";
FEED_CATEGORIES["feed--video"] = "Video";

},{}],3:[function(require,module,exports){
'use strict';

require('fastclick');

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _store = require('./state/store');

var _store2 = _interopRequireDefault(_store);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// App
var kickIt = function kickIt() {
	(0, _preact.render)((0, _preact.h)(
		_preactRedux.Provider,
		{ store: _store2.default },
		(0, _preact.h)(_App2.default, null)
	), document.body);
}; // NPM


document.addEventListener('DOMContentLoaded', kickIt);

},{"./App":1,"./state/store":17,"fastclick":18,"preact":33,"preact-redux":30}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _preact = require("preact");

var About = function About(_ref) {
	var text = _ref.text;
	return (0, _preact.h)(
		"section",
		{ "class": "about" },
		(0, _preact.h)("span", { dangerouslySetInnerHTML: { __html: text } })
	);
}; // NPM
exports.default = About;

},{"preact":33}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _preact = require('preact');

var _Live = require('./Items/Live');

var _Live2 = _interopRequireDefault(_Live);

var _News = require('./Items/News');

var _News2 = _interopRequireDefault(_News);

var _Shop = require('./Items/Shop');

var _Shop2 = _interopRequireDefault(_Shop);

var _Video = require('./Items/Video');

var _Video2 = _interopRequireDefault(_Video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Feed = function Feed(_ref) {
	var items = _ref.items;
	return (0, _preact.h)(
		'section',
		{ 'class': 'feed' },
		(0, _preact.h)(
			'ul',
			{ 'class': 'feed__items' },
			items.map(function (item) {
				switch (item.type) {
					case 'feed--live':
						return (0, _preact.h)(_Live2.default, { title: item.title, link: item.link, type: item.type });
					case 'feed--news':
						return (0, _preact.h)(_News2.default, { title: item.title, type: item.type });
					case 'feed--shop':
						return (0, _preact.h)(_Shop2.default, { title: item.title, link: item.link, type: item.type });
					case 'feed--video':
						return (0, _preact.h)(_Video2.default, { title: item.title, type: item.type });
				}
			})
		)
	);
}; // NPM
exports.default = Feed;

},{"./Items/Live":6,"./Items/News":7,"./Items/Shop":8,"./Items/Video":9,"preact":33}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _preact = require('preact');

var _CONSTANTS = require('../../../CONSTANTS');

// NPM
var Live = function Live(_ref) {
	var title = _ref.title,
	    link = _ref.link,
	    type = _ref.type;
	return (0, _preact.h)(
		'li',
		{ 'class': 'feed__item  feed__item--live' },
		(0, _preact.h)(
			'span',
			null,
			_CONSTANTS.FEED_CATEGORIES[type]
		),
		(0, _preact.h)(
			'h1',
			null,
			title
		),
		link ? (0, _preact.h)(
			'a',
			{ target: '_blank', href: link },
			'Link'
		) : null
	);
};

exports.default = Live;

},{"../../../CONSTANTS":2,"preact":33}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _preact = require('preact');

var _CONSTANTS = require('../../../CONSTANTS');

// NPM
var News = function News(_ref) {
	var title = _ref.title,
	    type = _ref.type;
	return (0, _preact.h)(
		'li',
		{ 'class': 'feed__item feed__item--news' },
		(0, _preact.h)(
			'span',
			null,
			_CONSTANTS.FEED_CATEGORIES[type]
		),
		(0, _preact.h)(
			'h1',
			null,
			title
		),
		(0, _preact.h)(
			'a',
			null,
			'Read More'
		)
	);
};

exports.default = News;

},{"../../../CONSTANTS":2,"preact":33}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _preact = require('preact');

var _CONSTANTS = require('../../../CONSTANTS');

// NPM
var Shop = function Shop(_ref) {
	var title = _ref.title,
	    link = _ref.link,
	    type = _ref.type;
	return (0, _preact.h)(
		'li',
		{ 'class': 'feed__item feed__item--shop' },
		(0, _preact.h)(
			'span',
			null,
			_CONSTANTS.FEED_CATEGORIES[type]
		),
		(0, _preact.h)(
			'h1',
			null,
			title
		),
		(0, _preact.h)(
			'a',
			{ target: '_blank', href: link },
			'Link'
		)
	);
};

exports.default = Shop;

},{"../../../CONSTANTS":2,"preact":33}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _preact = require('preact');

var _CONSTANTS = require('../../../CONSTANTS');

// NPM
var Video = function Video(_ref) {
	var title = _ref.title,
	    type = _ref.type;
	return (0, _preact.h)(
		'li',
		{ 'class': 'feed__item feed__item--video' },
		(0, _preact.h)(
			'span',
			null,
			_CONSTANTS.FEED_CATEGORIES[type]
		),
		(0, _preact.h)(
			'h1',
			null,
			title
		),
		(0, _preact.h)(
			'a',
			null,
			'Watch'
		)
	);
};

exports.default = Video;

},{"../../../CONSTANTS":2,"preact":33}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _preact = require("preact");

var Footer = function Footer() {
	return (0, _preact.h)(
		"footer",
		{ "class": "content-footer" },
		"Site by Jack Wild"
	);
}; // NPM
exports.default = Footer;

},{"preact":33}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _preact = require("preact");

var FourOhFour = function FourOhFour() {
	return (0, _preact.h)(
		"div",
		{ "class": "404" },
		(0, _preact.h)(
			"h1",
			null,
			"404"
		)
	);
}; // NPM
exports.default = FourOhFour;

},{"preact":33}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _actions = require('../../state/actions');

var _About = require('../../components/About/About');

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // NPM


// API


// Components


var View = function View(_ref) {
	var text = _ref.text,
	    isAboutOverlayVisible = _ref.isAboutOverlayVisible,
	    onScroll = _ref.onScroll,
	    shimOpacity = _ref.shimOpacity,
	    applyInnerTransform = _ref.applyInnerTransform;
	return (0, _preact.h)(
		'div',
		{ 'class': 'about-overlay about-overlay--' + (isAboutOverlayVisible ? 'visible' : 'hidden'), onScroll: onScroll },
		(0, _preact.h)('div', { 'class': 'about-overlay__shim ' + (!applyInnerTransform ? 'about-overlay__shim--visible' : ''), style: { opacity: shimOpacity } }),
		(0, _preact.h)(
			'div',
			{ 'class': 'about-overlay__inner ' + (applyInnerTransform ? 'about-overlay__inner--transform' : '') },
			(0, _preact.h)(_About2.default, { text: text })
		)
	);
};

var AboutOverlay = function (_Component) {
	_inherits(AboutOverlay, _Component);

	function AboutOverlay(props) {
		_classCallCheck(this, AboutOverlay);

		var _this = _possibleConstructorReturn(this, (AboutOverlay.__proto__ || Object.getPrototypeOf(AboutOverlay)).call(this, props));

		_this.state = {
			applyInnerTransform: true,
			shimOpacity: 0
		};

		_this.onScroll = _this.onScroll.bind(_this);
		return _this;
	}

	_createClass(AboutOverlay, [{
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(_ref2) {
			var isAboutOverlayVisible = _ref2.isAboutOverlayVisible;

			if (!isAboutOverlayVisible && this.props.isAboutOverlayVisible) this.show();
		}
	}, {
		key: 'onScroll',
		value: function onScroll(_ref3) {
			var target = _ref3.target;

			var max = target.scrollHeight - window.innerHeight;
			var shimOpacity = 1 - target.scrollTop / max;
			this.setState({ shimOpacity: shimOpacity });
			if (target.scrollTop === max) {
				this.props.hide();
				this.setState({ applyInnerTransform: true });
			}
		}
	}, {
		key: 'show',
		value: function show() {
			document.querySelector('.about-overlay').scrollTop = 0;
			this.setState({ applyInnerTransform: false, shimOpacity: 1 });
		}
	}, {
		key: 'render',
		value: function render(props, state) {
			return (0, _preact.h)(View, _extends({}, props, state, { onScroll: this.onScroll }));
		}
	}]);

	return AboutOverlay;
}(_preact.Component);

;

var mapStateToProps = function mapStateToProps(_ref4) {
	var isAboutOverlayVisible = _ref4.isAboutOverlayVisible;

	return { isAboutOverlayVisible: isAboutOverlayVisible };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		hide: function hide() {
			dispatch((0, _actions.toggleAboutOverlay)());
		}
	};
};

exports.default = (0, _preactRedux.connect)(mapStateToProps, mapDispatchToProps)(AboutOverlay);

},{"../../components/About/About":4,"../../state/actions":15,"preact":33,"preact-redux":30}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _About = require('../../components/About/About');

var _About2 = _interopRequireDefault(_About);

var _Feed = require('../../components/Feed/Feed');

var _Feed2 = _interopRequireDefault(_Feed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // NPM


// Components


var View = function View(_ref) {
	var aboutText = _ref.aboutText,
	    feedItems = _ref.feedItems;
	return (0, _preact.h)(
		'main',
		{ 'data-page': 'home', 'class': 'home' },
		(0, _preact.h)(_About2.default, { text: aboutText }),
		(0, _preact.h)(_Feed2.default, { items: feedItems })
	);
};

var Home = function (_Component) {
	_inherits(Home, _Component);

	function Home() {
		_classCallCheck(this, Home);

		return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
	}

	_createClass(Home, [{
		key: 'render',
		value: function render(props, state) {
			console.log(props);
			return (0, _preact.h)(View, props);
		}
	}]);

	return Home;
}(_preact.Component);

;

exports.default = Home;

},{"../../components/About/About":4,"../../components/Feed/Feed":5,"preact":33}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ON_INITIAL_LOAD = exports.ON_INITIAL_LOAD = 'ON_INITIAL_LOAD';
var TOGGLE_ABOUT_OVERLAY = exports.TOGGLE_ABOUT_OVERLAY = 'TOGGLE_ABOUT_OVERLAY';

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toggleAboutOverlay = exports.onInitialLoad = undefined;

var _actionTypes = require('./action-types');

var onInitialLoad = exports.onInitialLoad = function onInitialLoad() {
	return { type: _actionTypes.ON_INITIAL_LOAD, value: true };
};

var toggleAboutOverlay = exports.toggleAboutOverlay = function toggleAboutOverlay() {
	return { type: _actionTypes.TOGGLE_ABOUT_OVERLAY };
};

},{"./action-types":14}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = require('./action-types');

var onInitialLoad = function onInitialLoad(state) {
	return _extends({}, state, { isInitialDataLoaded: true, isLoading: false });
};

var toggleAboutOverlay = function toggleAboutOverlay(state) {
	return _extends({}, state, { isAboutOverlayVisible: !state.isAboutOverlayVisible });
};

var REDUCERS = {};
REDUCERS[_actionTypes.ON_INITIAL_LOAD] = onInitialLoad;
REDUCERS[_actionTypes.TOGGLE_ABOUT_OVERLAY] = toggleAboutOverlay;

exports.default = REDUCERS;

},{"./action-types":14}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mobileDetect = require('mobile-detect');

var _mobileDetect2 = _interopRequireDefault(_mobileDetect);

var _redux = require('redux');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md = new _mobileDetect2.default(window.navigator.userAgent);
var INITIAL = {
	isPhone: md.phone(),
	isDesktop: !md.mobile(),
	isInitialDataLoaded: false,
	isLoading: true,
	isAboutOverlayVisible: false
};

var store = (0, _redux.createStore)(function (state, action) {
	return action && _reducers2.default[action.type] ? _reducers2.default[action.type](state, action) : state;
}, INITIAL, window.devToolsExtension && window.devToolsExtension());

window.store = store;
exports.default = store;

},{"./actions":15,"./reducers":16,"mobile-detect":29,"redux":40}],18:[function(require,module,exports){
;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());

},{}],19:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":26}],20:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":19,"./_getRawTag":23,"./_objectToString":24}],21:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],22:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":25}],23:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":19}],24:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],25:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],26:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":21}],27:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],28:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    getPrototype = require('./_getPrototype'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

},{"./_baseGetTag":20,"./_getPrototype":22,"./isObjectLike":27}],29:[function(require,module,exports){
// THIS FILE IS GENERATED - DO NOT EDIT!
/*!mobile-detect v1.4.1 2017-12-24*/
/*global module:false, define:false*/
/*jshint latedef:false*/
/*!@license Copyright 2013, Heinrich Goebl, License: MIT, see https://github.com/hgoebl/mobile-detect.js*/
(function (define, undefined) {
define(function () {
    'use strict';

    var impl = {};

    impl.mobileDetectRules = {
    "phones": {
        "iPhone": "\\biPhone\\b|\\biPod\\b",
        "BlackBerry": "BlackBerry|\\bBB10\\b|rim[0-9]+",
        "HTC": "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m|Android [0-9.]+; Pixel",
        "Nexus": "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",
        "Dell": "Dell[;]? (Streak|Aero|Venue|Venue Pro|Flash|Smoke|Mini 3iX)|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
        "Motorola": "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b|XT1068|XT1092",
        "Samsung": "\\bSamsung\\b|SM-G950F|SM-G955F|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350|SM-J120F|SM-G920F|SM-G920V|SM-G930F|SM-N910C|SM-A310F|GT-I9190|SM-J500FN|SM-G903F",
        "LG": "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323)",
        "Sony": "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",
        "Asus": "Asus.*Galaxy|PadFone.*Mobile",
        "NokiaLumia": "Lumia [0-9]{3,4}",
        "Micromax": "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
        "Palm": "PalmSource|Palm",
        "Vertu": "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
        "Pantech": "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
        "Fly": "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
        "Wiko": "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA(?!nna)|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
        "iMobile": "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
        "SimValley": "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
        "Wolfgang": "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
        "Alcatel": "Alcatel",
        "Nintendo": "Nintendo 3DS",
        "Amoi": "Amoi",
        "INQ": "INQ",
        "GenericPhone": "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"
    },
    "tablets": {
        "iPad": "iPad|iPad.*Mobile",
        "NexusTablet": "Android.*Nexus[\\s]+(7|9|10)",
        "SamsungTablet": "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-T116BU|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561|SM-T713|SM-T719|SM-T813|SM-T819|SM-T580|SM-T355Y?|SM-T280|SM-T817A|SM-T820|SM-W700|SM-P580|SM-T587|SM-P350|SM-P555M|SM-P355M|SM-T113NU|SM-T815Y",
        "Kindle": "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI|KFFOWI|KFGIWI|KFMEWI)\\b|Android.*Silk\/[0-9.]+ like Chrome\/[0-9.]+ (?!Mobile)",
        "SurfaceTablet": "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
        "HPTablet": "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
        "AsusTablet": "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K011 | K017 | K01E |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA|P01Z|\\bP027\\b",
        "BlackBerryTablet": "PlayBook|RIM Tablet",
        "HTCtablet": "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
        "MotorolaTablet": "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
        "NookTablet": "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
        "AcerTablet": "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20\\b|\\bA3-A30",
        "ToshibaTablet": "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
        "LGTablet": "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
        "FujitsuTablet": "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
        "PrestigioTablet": "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
        "LenovoTablet": "Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-850M|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)|TB-X103F|TB-X304F|TB-8703F",
        "DellTablet": "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
        "YarvikTablet": "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
        "MedionTablet": "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
        "ArnovaTablet": "97G4|AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
        "IntensoTablet": "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
        "IRUTablet": "M702pro",
        "MegafonTablet": "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
        "EbodaTablet": "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
        "AllViewTablet": "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
        "ArchosTablet": "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|c|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
        "AinolTablet": "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
        "NokiaLumiaTablet": "Lumia 2520",
        "SonyTablet": "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31",
        "PhilipsTablet": "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
        "CubeTablet": "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
        "CobyTablet": "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
        "MIDTablet": "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",
        "MSITablet": "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
        "SMiTTablet": "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
        "RockChipTablet": "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
        "FlyTablet": "IQ310|Fly Vision",
        "bqTablet": "Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris ([E|M]10|M8))|Maxwell.*Lite|Maxwell.*Plus",
        "HuaweiTablet": "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim|M2-A01L",
        "NecTablet": "\\bN-06D|\\bN-08D",
        "PantechTablet": "Pantech.*P4100",
        "BronchoTablet": "Broncho.*(N701|N708|N802|a710)",
        "VersusTablet": "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
        "ZyncTablet": "z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900",
        "PositivoTablet": "TB07STA|TB10STA|TB07FTA|TB10FTA",
        "NabiTablet": "Android.*\\bNabi",
        "KoboTablet": "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
        "DanewTablet": "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
        "TexetTablet": "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
        "PlaystationTablet": "Playstation.*(Portable|Vita)",
        "TrekstorTablet": "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
        "PyleAudioTablet": "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
        "AdvanTablet": "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
        "DanyTechTablet": "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
        "GalapadTablet": "Android.*\\bG1\\b",
        "MicromaxTablet": "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
        "KarbonnTablet": "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
        "AllFineTablet": "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
        "PROSCANTablet": "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
        "YONESTablet": "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
        "ChangJiaTablet": "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
        "GUTablet": "TX-A1301|TX-M9002|Q702|kf026",
        "PointOfViewTablet": "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
        "OvermaxTablet": "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)|Qualcore 1027",
        "HCLTablet": "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
        "DPSTablet": "DPS Dream 9|DPS Dual 7",
        "VistureTablet": "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
        "CrestaTablet": "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
        "MediatekTablet": "\\bMT8125|MT8389|MT8135|MT8377\\b",
        "ConcordeTablet": "Concorde([ ]+)?Tab|ConCorde ReadMan",
        "GoCleverTablet": "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
        "ModecomTablet": "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
        "VoninoTablet": "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
        "ECSTablet": "V07OT2|TM105A|S10OT1|TR10CS1",
        "StorexTablet": "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
        "VodafoneTablet": "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7|VF-1497",
        "EssentielBTablet": "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
        "RossMoorTablet": "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
        "iMobileTablet": "i-mobile i-note",
        "TolinoTablet": "tolino tab [0-9.]+|tolino shine",
        "AudioSonicTablet": "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
        "AMPETablet": "Android.* A78 ",
        "SkkTablet": "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
        "TecnoTablet": "TECNO P9",
        "JXDTablet": "Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
        "iJoyTablet": "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
        "FX2Tablet": "FX2 PAD7|FX2 PAD10",
        "XoroTablet": "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
        "ViewsonicTablet": "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
        "VerizonTablet": "QTAQZ3|QTAIR7|QTAQTZ3|QTASUN1|QTASUN2|QTAXIA1",
        "OdysTablet": "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
        "CaptivaTablet": "CAPTIVA PAD",
        "IconbitTablet": "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
        "TeclastTablet": "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
        "OndaTablet": "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+",
        "JaytechTablet": "TPC-PA762",
        "BlaupunktTablet": "Endeavour 800NG|Endeavour 1010",
        "DigmaTablet": "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
        "EvolioTablet": "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
        "LavaTablet": "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
        "AocTablet": "MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712",
        "MpmanTablet": "MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",
        "CelkonTablet": "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
        "WolderTablet": "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
        "MiTablet": "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
        "NibiruTablet": "Nibiru M1|Nibiru Jupiter One",
        "NexoTablet": "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
        "LeaderTablet": "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
        "UbislateTablet": "UbiSlate[\\s]?7C",
        "PocketBookTablet": "Pocketbook",
        "KocasoTablet": "\\b(TB-1207)\\b",
        "HisenseTablet": "\\b(F5281|E2371)\\b",
        "Hudl": "Hudl HT7S3|Hudl 2",
        "TelstraTablet": "T-Hub2",
        "GenericTablet": "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bTP750\\b|\\bQTAQZ3\\b"
    },
    "oss": {
        "AndroidOS": "Android",
        "BlackBerryOS": "blackberry|\\bBB10\\b|rim tablet os",
        "PalmOS": "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
        "SymbianOS": "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
        "WindowsMobileOS": "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;",
        "WindowsPhoneOS": "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
        "iOS": "\\biPhone.*Mobile|\\biPod|\\biPad|AppleCoreMedia",
        "MeeGoOS": "MeeGo",
        "MaemoOS": "Maemo",
        "JavaOS": "J2ME\/|\\bMIDP\\b|\\bCLDC\\b",
        "webOS": "webOS|hpwOS",
        "badaOS": "\\bBada\\b",
        "BREWOS": "BREW"
    },
    "uas": {
        "Chrome": "\\bCrMo\\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?",
        "Dolfin": "\\bDolfin\\b",
        "Opera": "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR\/[0-9.]+|Coast\/[0-9.]+",
        "Skyfire": "Skyfire",
        "Edge": "Mobile Safari\/[.0-9]* Edge",
        "IE": "IEMobile|MSIEMobile",
        "Firefox": "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS",
        "Bolt": "bolt",
        "TeaShark": "teashark",
        "Blazer": "Blazer",
        "Safari": "Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",
        "UCBrowser": "UC.*Browser|UCWEB",
        "baiduboxapp": "baiduboxapp",
        "baidubrowser": "baidubrowser",
        "DiigoBrowser": "DiigoBrowser",
        "Puffin": "Puffin",
        "Mercury": "\\bMercury\\b",
        "ObigoBrowser": "Obigo",
        "NetFront": "NF-Browser",
        "GenericBrowser": "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger",
        "PaleMoon": "Android.*PaleMoon|Mobile.*PaleMoon"
    },
    "props": {
        "Mobile": "Mobile\/[VER]",
        "Build": "Build\/[VER]",
        "Version": "Version\/[VER]",
        "VendorID": "VendorID\/[VER]",
        "iPad": "iPad.*CPU[a-z ]+[VER]",
        "iPhone": "iPhone.*CPU[a-z ]+[VER]",
        "iPod": "iPod.*CPU[a-z ]+[VER]",
        "Kindle": "Kindle\/[VER]",
        "Chrome": [
            "Chrome\/[VER]",
            "CriOS\/[VER]",
            "CrMo\/[VER]"
        ],
        "Coast": [
            "Coast\/[VER]"
        ],
        "Dolfin": "Dolfin\/[VER]",
        "Firefox": [
            "Firefox\/[VER]",
            "FxiOS\/[VER]"
        ],
        "Fennec": "Fennec\/[VER]",
        "Edge": "Edge\/[VER]",
        "IE": [
            "IEMobile\/[VER];",
            "IEMobile [VER]",
            "MSIE [VER];",
            "Trident\/[0-9.]+;.*rv:[VER]"
        ],
        "NetFront": "NetFront\/[VER]",
        "NokiaBrowser": "NokiaBrowser\/[VER]",
        "Opera": [
            " OPR\/[VER]",
            "Opera Mini\/[VER]",
            "Version\/[VER]"
        ],
        "Opera Mini": "Opera Mini\/[VER]",
        "Opera Mobi": "Version\/[VER]",
        "UCBrowser": [
            "UCWEB[VER]",
            "UC.*Browser\/[VER]"
        ],
        "MQQBrowser": "MQQBrowser\/[VER]",
        "MicroMessenger": "MicroMessenger\/[VER]",
        "baiduboxapp": "baiduboxapp\/[VER]",
        "baidubrowser": "baidubrowser\/[VER]",
        "SamsungBrowser": "SamsungBrowser\/[VER]",
        "Iron": "Iron\/[VER]",
        "Safari": [
            "Version\/[VER]",
            "Safari\/[VER]"
        ],
        "Skyfire": "Skyfire\/[VER]",
        "Tizen": "Tizen\/[VER]",
        "Webkit": "webkit[ \/][VER]",
        "PaleMoon": "PaleMoon\/[VER]",
        "Gecko": "Gecko\/[VER]",
        "Trident": "Trident\/[VER]",
        "Presto": "Presto\/[VER]",
        "Goanna": "Goanna\/[VER]",
        "iOS": " \\bi?OS\\b [VER][ ;]{1}",
        "Android": "Android [VER]",
        "BlackBerry": [
            "BlackBerry[\\w]+\/[VER]",
            "BlackBerry.*Version\/[VER]",
            "Version\/[VER]"
        ],
        "BREW": "BREW [VER]",
        "Java": "Java\/[VER]",
        "Windows Phone OS": [
            "Windows Phone OS [VER]",
            "Windows Phone [VER]"
        ],
        "Windows Phone": "Windows Phone [VER]",
        "Windows CE": "Windows CE\/[VER]",
        "Windows NT": "Windows NT [VER]",
        "Symbian": [
            "SymbianOS\/[VER]",
            "Symbian\/[VER]"
        ],
        "webOS": [
            "webOS\/[VER]",
            "hpwOS\/[VER];"
        ]
    },
    "utils": {
        "Bot": "Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|YandexMobileBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom",
        "MobileBot": "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker\/M1A1-R2D2",
        "DesktopMode": "WPDesktop",
        "TV": "SonyDTV|HbbTV",
        "WebKit": "(webkit)[ \/]([\\w.]+)",
        "Console": "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|PLAYSTATION|Xbox)\\b",
        "Watch": "SM-V700"
    }
};

    // following patterns come from http://detectmobilebrowsers.com/
    impl.detectMobileBrowsers = {
        fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        tabletPattern: /android|ipad|playbook|silk/i
    };

    var hasOwnProp = Object.prototype.hasOwnProperty,
        isArray;

    impl.FALLBACK_PHONE = 'UnknownPhone';
    impl.FALLBACK_TABLET = 'UnknownTablet';
    impl.FALLBACK_MOBILE = 'UnknownMobile';

    isArray = ('isArray' in Array) ?
        Array.isArray : function (value) { return Object.prototype.toString.call(value) === '[object Array]'; };

    function equalIC(a, b) {
        return a != null && b != null && a.toLowerCase() === b.toLowerCase();
    }

    function containsIC(array, value) {
        var valueLC, i, len = array.length;
        if (!len || !value) {
            return false;
        }
        valueLC = value.toLowerCase();
        for (i = 0; i < len; ++i) {
            if (valueLC === array[i].toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    function convertPropsToRegExp(object) {
        for (var key in object) {
            if (hasOwnProp.call(object, key)) {
                object[key] = new RegExp(object[key], 'i');
            }
        }
    }

    function prepareUserAgent(userAgent) {
        return (userAgent || '').substr(0, 500); // mitigate vulnerable to ReDoS
    }

    (function init() {
        var key, values, value, i, len, verPos, mobileDetectRules = impl.mobileDetectRules;
        for (key in mobileDetectRules.props) {
            if (hasOwnProp.call(mobileDetectRules.props, key)) {
                values = mobileDetectRules.props[key];
                if (!isArray(values)) {
                    values = [values];
                }
                len = values.length;
                for (i = 0; i < len; ++i) {
                    value = values[i];
                    verPos = value.indexOf('[VER]');
                    if (verPos >= 0) {
                        value = value.substring(0, verPos) + '([\\w._\\+]+)' + value.substring(verPos + 5);
                    }
                    values[i] = new RegExp(value, 'i');
                }
                mobileDetectRules.props[key] = values;
            }
        }
        convertPropsToRegExp(mobileDetectRules.oss);
        convertPropsToRegExp(mobileDetectRules.phones);
        convertPropsToRegExp(mobileDetectRules.tablets);
        convertPropsToRegExp(mobileDetectRules.uas);
        convertPropsToRegExp(mobileDetectRules.utils);

        // copy some patterns to oss0 which are tested first (see issue#15)
        mobileDetectRules.oss0 = {
            WindowsPhoneOS: mobileDetectRules.oss.WindowsPhoneOS,
            WindowsMobileOS: mobileDetectRules.oss.WindowsMobileOS
        };
    }());

    /**
     * Test userAgent string against a set of rules and find the first matched key.
     * @param {Object} rules (key is String, value is RegExp)
     * @param {String} userAgent the navigator.userAgent (or HTTP-Header 'User-Agent').
     * @returns {String|null} the matched key if found, otherwise <tt>null</tt>
     * @private
     */
    impl.findMatch = function(rules, userAgent) {
        for (var key in rules) {
            if (hasOwnProp.call(rules, key)) {
                if (rules[key].test(userAgent)) {
                    return key;
                }
            }
        }
        return null;
    };

    /**
     * Test userAgent string against a set of rules and return an array of matched keys.
     * @param {Object} rules (key is String, value is RegExp)
     * @param {String} userAgent the navigator.userAgent (or HTTP-Header 'User-Agent').
     * @returns {Array} an array of matched keys, may be empty when there is no match, but not <tt>null</tt>
     * @private
     */
    impl.findMatches = function(rules, userAgent) {
        var result = [];
        for (var key in rules) {
            if (hasOwnProp.call(rules, key)) {
                if (rules[key].test(userAgent)) {
                    result.push(key);
                }
            }
        }
        return result;
    };

    /**
     * Check the version of the given property in the User-Agent.
     *
     * @param {String} propertyName
     * @param {String} userAgent
     * @return {String} version or <tt>null</tt> if version not found
     * @private
     */
    impl.getVersionStr = function (propertyName, userAgent) {
        var props = impl.mobileDetectRules.props, patterns, i, len, match;
        if (hasOwnProp.call(props, propertyName)) {
            patterns = props[propertyName];
            len = patterns.length;
            for (i = 0; i < len; ++i) {
                match = patterns[i].exec(userAgent);
                if (match !== null) {
                    return match[1];
                }
            }
        }
        return null;
    };

    /**
     * Check the version of the given property in the User-Agent.
     * Will return a float number. (eg. 2_0 will return 2.0, 4.3.1 will return 4.31)
     *
     * @param {String} propertyName
     * @param {String} userAgent
     * @return {Number} version or <tt>NaN</tt> if version not found
     * @private
     */
    impl.getVersion = function (propertyName, userAgent) {
        var version = impl.getVersionStr(propertyName, userAgent);
        return version ? impl.prepareVersionNo(version) : NaN;
    };

    /**
     * Prepare the version number.
     *
     * @param {String} version
     * @return {Number} the version number as a floating number
     * @private
     */
    impl.prepareVersionNo = function (version) {
        var numbers;

        numbers = version.split(/[a-z._ \/\-]/i);
        if (numbers.length === 1) {
            version = numbers[0];
        }
        if (numbers.length > 1) {
            version = numbers[0] + '.';
            numbers.shift();
            version += numbers.join('');
        }
        return Number(version);
    };

    impl.isMobileFallback = function (userAgent) {
        return impl.detectMobileBrowsers.fullPattern.test(userAgent) ||
            impl.detectMobileBrowsers.shortPattern.test(userAgent.substr(0,4));
    };

    impl.isTabletFallback = function (userAgent) {
        return impl.detectMobileBrowsers.tabletPattern.test(userAgent);
    };

    impl.prepareDetectionCache = function (cache, userAgent, maxPhoneWidth) {
        if (cache.mobile !== undefined) {
            return;
        }
        var phone, tablet, phoneSized;

        // first check for stronger tablet rules, then phone (see issue#5)
        tablet = impl.findMatch(impl.mobileDetectRules.tablets, userAgent);
        if (tablet) {
            cache.mobile = cache.tablet = tablet;
            cache.phone = null;
            return; // unambiguously identified as tablet
        }

        phone = impl.findMatch(impl.mobileDetectRules.phones, userAgent);
        if (phone) {
            cache.mobile = cache.phone = phone;
            cache.tablet = null;
            return; // unambiguously identified as phone
        }

        // our rules haven't found a match -> try more general fallback rules
        if (impl.isMobileFallback(userAgent)) {
            phoneSized = MobileDetect.isPhoneSized(maxPhoneWidth);
            if (phoneSized === undefined) {
                cache.mobile = impl.FALLBACK_MOBILE;
                cache.tablet = cache.phone = null;
            } else if (phoneSized) {
                cache.mobile = cache.phone = impl.FALLBACK_PHONE;
                cache.tablet = null;
            } else {
                cache.mobile = cache.tablet = impl.FALLBACK_TABLET;
                cache.phone = null;
            }
        } else if (impl.isTabletFallback(userAgent)) {
            cache.mobile = cache.tablet = impl.FALLBACK_TABLET;
            cache.phone = null;
        } else {
            // not mobile at all!
            cache.mobile = cache.tablet = cache.phone = null;
        }
    };

    // t is a reference to a MobileDetect instance
    impl.mobileGrade = function (t) {
        // impl note:
        // To keep in sync w/ Mobile_Detect.php easily, the following code is tightly aligned to the PHP version.
        // When changes are made in Mobile_Detect.php, copy this method and replace:
        //     $this-> / t.
        //     self::MOBILE_GRADE_(.) / '$1'
        //     , self::VERSION_TYPE_FLOAT / (nothing)
        //     isIOS() / os('iOS')
        //     [reg] / (nothing)   <-- jsdelivr complaining about unescaped unicode character U+00AE
        var $isMobile = t.mobile() !== null;

        if (
            // Apple iOS 3.2-5.1 - Tested on the original iPad (4.3 / 5.0), iPad 2 (4.3), iPad 3 (5.1), original iPhone (3.1), iPhone 3 (3.2), 3GS (4.3), 4 (4.3 / 5.0), and 4S (5.1)
            t.os('iOS') && t.version('iPad')>=4.3 ||
            t.os('iOS') && t.version('iPhone')>=3.1 ||
            t.os('iOS') && t.version('iPod')>=3.1 ||

            // Android 2.1-2.3 - Tested on the HTC Incredible (2.2), original Droid (2.2), HTC Aria (2.1), Google Nexus S (2.3). Functional on 1.5 & 1.6 but performance may be sluggish, tested on Google G1 (1.5)
            // Android 3.1 (Honeycomb)  - Tested on the Samsung Galaxy Tab 10.1 and Motorola XOOM
            // Android 4.0 (ICS)  - Tested on a Galaxy Nexus. Note: transition performance can be poor on upgraded devices
            // Android 4.1 (Jelly Bean)  - Tested on a Galaxy Nexus and Galaxy 7
            ( t.version('Android')>2.1 && t.is('Webkit') ) ||

            // Windows Phone 7-7.5 - Tested on the HTC Surround (7.0) HTC Trophy (7.5), LG-E900 (7.5), Nokia Lumia 800
            t.version('Windows Phone OS')>=7.0 ||

            // Blackberry 7 - Tested on BlackBerry Torch 9810
            // Blackberry 6.0 - Tested on the Torch 9800 and Style 9670
            t.is('BlackBerry') && t.version('BlackBerry')>=6.0 ||
            // Blackberry Playbook (1.0-2.0) - Tested on PlayBook
            t.match('Playbook.*Tablet') ||

            // Palm WebOS (1.4-2.0) - Tested on the Palm Pixi (1.4), Pre (1.4), Pre 2 (2.0)
            ( t.version('webOS')>=1.4 && t.match('Palm|Pre|Pixi') ) ||
            // Palm WebOS 3.0  - Tested on HP TouchPad
            t.match('hp.*TouchPad') ||

            // Firefox Mobile (12 Beta) - Tested on Android 2.3 device
            ( t.is('Firefox') && t.version('Firefox')>=12 ) ||

            // Chrome for Android - Tested on Android 4.0, 4.1 device
            ( t.is('Chrome') && t.is('AndroidOS') && t.version('Android')>=4.0 ) ||

            // Skyfire 4.1 - Tested on Android 2.3 device
            ( t.is('Skyfire') && t.version('Skyfire')>=4.1 && t.is('AndroidOS') && t.version('Android')>=2.3 ) ||

            // Opera Mobile 11.5-12: Tested on Android 2.3
            ( t.is('Opera') && t.version('Opera Mobi')>11 && t.is('AndroidOS') ) ||

            // Meego 1.2 - Tested on Nokia 950 and N9
            t.is('MeeGoOS') ||

            // Tizen (pre-release) - Tested on early hardware
            t.is('Tizen') ||

            // Samsung Bada 2.0 - Tested on a Samsung Wave 3, Dolphin browser
            // @todo: more tests here!
            t.is('Dolfin') && t.version('Bada')>=2.0 ||

            // UC Browser - Tested on Android 2.3 device
            ( (t.is('UC Browser') || t.is('Dolfin')) && t.version('Android')>=2.3 ) ||

            // Kindle 3 and Fire  - Tested on the built-in WebKit browser for each
            ( t.match('Kindle Fire') ||
                t.is('Kindle') && t.version('Kindle')>=3.0 ) ||

            // Nook Color 1.4.1 - Tested on original Nook Color, not Nook Tablet
            t.is('AndroidOS') && t.is('NookTablet') ||

            // Chrome Desktop 11-21 - Tested on OS X 10.7 and Windows 7
            t.version('Chrome')>=11 && !$isMobile ||

            // Safari Desktop 4-5 - Tested on OS X 10.7 and Windows 7
            t.version('Safari')>=5.0 && !$isMobile ||

            // Firefox Desktop 4-13 - Tested on OS X 10.7 and Windows 7
            t.version('Firefox')>=4.0 && !$isMobile ||

            // Internet Explorer 7-9 - Tested on Windows XP, Vista and 7
            t.version('MSIE')>=7.0 && !$isMobile ||

            // Opera Desktop 10-12 - Tested on OS X 10.7 and Windows 7
            // @reference: http://my.opera.com/community/openweb/idopera/
            t.version('Opera')>=10 && !$isMobile

            ){
            return 'A';
        }

        if (
            t.os('iOS') && t.version('iPad')<4.3 ||
            t.os('iOS') && t.version('iPhone')<3.1 ||
            t.os('iOS') && t.version('iPod')<3.1 ||

            // Blackberry 5.0: Tested on the Storm 2 9550, Bold 9770
            t.is('Blackberry') && t.version('BlackBerry')>=5 && t.version('BlackBerry')<6 ||

            //Opera Mini (5.0-6.5) - Tested on iOS 3.2/4.3 and Android 2.3
            ( t.version('Opera Mini')>=5.0 && t.version('Opera Mini')<=6.5 &&
                (t.version('Android')>=2.3 || t.is('iOS')) ) ||

            // Nokia Symbian^3 - Tested on Nokia N8 (Symbian^3), C7 (Symbian^3), also works on N97 (Symbian^1)
            t.match('NokiaN8|NokiaC7|N97.*Series60|Symbian/3') ||

            // @todo: report this (tested on Nokia N71)
            t.version('Opera Mobi')>=11 && t.is('SymbianOS')
            ){
            return 'B';
        }

        if (
        // Blackberry 4.x - Tested on the Curve 8330
            t.version('BlackBerry')<5.0 ||
            // Windows Mobile - Tested on the HTC Leo (WinMo 5.2)
            t.match('MSIEMobile|Windows CE.*Mobile') || t.version('Windows Mobile')<=5.2

            ){
            return 'C';
        }

        //All older smartphone platforms and featurephones - Any device that doesn't support media queries
        //will receive the basic, C grade experience.
        return 'C';
    };

    impl.detectOS = function (ua) {
        return impl.findMatch(impl.mobileDetectRules.oss0, ua) ||
            impl.findMatch(impl.mobileDetectRules.oss, ua);
    };

    impl.getDeviceSmallerSide = function () {
        return window.screen.width < window.screen.height ?
            window.screen.width :
            window.screen.height;
    };

    /**
     * Constructor for MobileDetect object.
     * <br>
     * Such an object will keep a reference to the given user-agent string and cache most of the detect queries.<br>
     * <div style="background-color: #d9edf7; border: 1px solid #bce8f1; color: #3a87ad; padding: 14px; border-radius: 2px; margin-top: 20px">
     *     <strong>Find information how to download and install:</strong>
     *     <a href="https://github.com/hgoebl/mobile-detect.js/">github.com/hgoebl/mobile-detect.js/</a>
     * </div>
     *
     * @example <pre>
     *     var md = new MobileDetect(window.navigator.userAgent);
     *     if (md.mobile()) {
     *         location.href = (md.mobileGrade() === 'A') ? '/mobile/' : '/lynx/';
     *     }
     * </pre>
     *
     * @param {string} userAgent typically taken from window.navigator.userAgent or http_header['User-Agent']
     * @param {number} [maxPhoneWidth=600] <strong>only for browsers</strong> specify a value for the maximum
     *        width of smallest device side (in logical "CSS" pixels) until a device detected as mobile will be handled
     *        as phone.
     *        This is only used in cases where the device cannot be classified as phone or tablet.<br>
     *        See <a href="http://developer.android.com/guide/practices/screens_support.html">Declaring Tablet Layouts
     *        for Android</a>.<br>
     *        If you provide a value < 0, then this "fuzzy" check is disabled.
     * @constructor
     * @global
     */
    function MobileDetect(userAgent, maxPhoneWidth) {
        this.ua = prepareUserAgent(userAgent);
        this._cache = {};
        //600dp is typical 7" tablet minimum width
        this.maxPhoneWidth = maxPhoneWidth || 600;
    }

    MobileDetect.prototype = {
        constructor: MobileDetect,

        /**
         * Returns the detected phone or tablet type or <tt>null</tt> if it is not a mobile device.
         * <br>
         * For a list of possible return values see {@link MobileDetect#phone} and {@link MobileDetect#tablet}.<br>
         * <br>
         * If the device is not detected by the regular expressions from Mobile-Detect, a test is made against
         * the patterns of <a href="http://detectmobilebrowsers.com/">detectmobilebrowsers.com</a>. If this test
         * is positive, a value of <code>UnknownPhone</code>, <code>UnknownTablet</code> or
         * <code>UnknownMobile</code> is returned.<br>
         * When used in browser, the decision whether phone or tablet is made based on <code>screen.width/height</code>.<br>
         * <br>
         * When used server-side (node.js), there is no way to tell the difference between <code>UnknownTablet</code>
         * and <code>UnknownMobile</code>, so you will get <code>UnknownMobile</code> here.<br>
         * Be aware that since v1.0.0 in this special case you will get <code>UnknownMobile</code> only for:
         * {@link MobileDetect#mobile}, not for {@link MobileDetect#phone} and {@link MobileDetect#tablet}.
         * In versions before v1.0.0 all 3 methods returned <code>UnknownMobile</code> which was tedious to use.
         * <br>
         * In most cases you will use the return value just as a boolean.
         *
         * @returns {String} the key for the phone family or tablet family, e.g. "Nexus".
         * @function MobileDetect#mobile
         */
        mobile: function () {
            impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
            return this._cache.mobile;
        },

        /**
         * Returns the detected phone type/family string or <tt>null</tt>.
         * <br>
         * The returned tablet (family or producer) is one of following keys:<br>
         * <br><tt>iPhone, BlackBerry, HTC, Nexus, Dell, Motorola, Samsung, LG, Sony, Asus,
         * NokiaLumia, Micromax, Palm, Vertu, Pantech, Fly, Wiko, iMobile, SimValley,
         * Wolfgang, Alcatel, Nintendo, Amoi, INQ, GenericPhone</tt><br>
         * <br>
         * If the device is not detected by the regular expressions from Mobile-Detect, a test is made against
         * the patterns of <a href="http://detectmobilebrowsers.com/">detectmobilebrowsers.com</a>. If this test
         * is positive, a value of <code>UnknownPhone</code> or <code>UnknownMobile</code> is returned.<br>
         * When used in browser, the decision whether phone or tablet is made based on <code>screen.width/height</code>.<br>
         * <br>
         * When used server-side (node.js), there is no way to tell the difference between <code>UnknownTablet</code>
         * and <code>UnknownMobile</code>, so you will get <code>null</code> here, while {@link MobileDetect#mobile}
         * will return <code>UnknownMobile</code>.<br>
         * Be aware that since v1.0.0 in this special case you will get <code>UnknownMobile</code> only for:
         * {@link MobileDetect#mobile}, not for {@link MobileDetect#phone} and {@link MobileDetect#tablet}.
         * In versions before v1.0.0 all 3 methods returned <code>UnknownMobile</code> which was tedious to use.
         * <br>
         * In most cases you will use the return value just as a boolean.
         *
         * @returns {String} the key of the phone family or producer, e.g. "iPhone"
         * @function MobileDetect#phone
         */
        phone: function () {
            impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
            return this._cache.phone;
        },

        /**
         * Returns the detected tablet type/family string or <tt>null</tt>.
         * <br>
         * The returned tablet (family or producer) is one of following keys:<br>
         * <br><tt>iPad, NexusTablet, SamsungTablet, Kindle, SurfaceTablet, HPTablet, AsusTablet,
         * BlackBerryTablet, HTCtablet, MotorolaTablet, NookTablet, AcerTablet,
         * ToshibaTablet, LGTablet, FujitsuTablet, PrestigioTablet, LenovoTablet,
         * DellTablet, YarvikTablet, MedionTablet, ArnovaTablet, IntensoTablet, IRUTablet,
         * MegafonTablet, EbodaTablet, AllViewTablet, ArchosTablet, AinolTablet,
         * NokiaLumiaTablet, SonyTablet, PhilipsTablet, CubeTablet, CobyTablet, MIDTablet,
         * MSITablet, SMiTTablet, RockChipTablet, FlyTablet, bqTablet, HuaweiTablet,
         * NecTablet, PantechTablet, BronchoTablet, VersusTablet, ZyncTablet,
         * PositivoTablet, NabiTablet, KoboTablet, DanewTablet, TexetTablet,
         * PlaystationTablet, TrekstorTablet, PyleAudioTablet, AdvanTablet,
         * DanyTechTablet, GalapadTablet, MicromaxTablet, KarbonnTablet, AllFineTablet,
         * PROSCANTablet, YONESTablet, ChangJiaTablet, GUTablet, PointOfViewTablet,
         * OvermaxTablet, HCLTablet, DPSTablet, VistureTablet, CrestaTablet,
         * MediatekTablet, ConcordeTablet, GoCleverTablet, ModecomTablet, VoninoTablet,
         * ECSTablet, StorexTablet, VodafoneTablet, EssentielBTablet, RossMoorTablet,
         * iMobileTablet, TolinoTablet, AudioSonicTablet, AMPETablet, SkkTablet,
         * TecnoTablet, JXDTablet, iJoyTablet, FX2Tablet, XoroTablet, ViewsonicTablet,
         * VerizonTablet, OdysTablet, CaptivaTablet, IconbitTablet, TeclastTablet,
         * OndaTablet, JaytechTablet, BlaupunktTablet, DigmaTablet, EvolioTablet,
         * LavaTablet, AocTablet, MpmanTablet, CelkonTablet, WolderTablet, MiTablet,
         * NibiruTablet, NexoTablet, LeaderTablet, UbislateTablet, PocketBookTablet,
         * KocasoTablet, HisenseTablet, Hudl, TelstraTablet, GenericTablet</tt><br>
         * <br>
         * If the device is not detected by the regular expressions from Mobile-Detect, a test is made against
         * the patterns of <a href="http://detectmobilebrowsers.com/">detectmobilebrowsers.com</a>. If this test
         * is positive, a value of <code>UnknownTablet</code> or <code>UnknownMobile</code> is returned.<br>
         * When used in browser, the decision whether phone or tablet is made based on <code>screen.width/height</code>.<br>
         * <br>
         * When used server-side (node.js), there is no way to tell the difference between <code>UnknownTablet</code>
         * and <code>UnknownMobile</code>, so you will get <code>null</code> here, while {@link MobileDetect#mobile}
         * will return <code>UnknownMobile</code>.<br>
         * Be aware that since v1.0.0 in this special case you will get <code>UnknownMobile</code> only for:
         * {@link MobileDetect#mobile}, not for {@link MobileDetect#phone} and {@link MobileDetect#tablet}.
         * In versions before v1.0.0 all 3 methods returned <code>UnknownMobile</code> which was tedious to use.
         * <br>
         * In most cases you will use the return value just as a boolean.
         *
         * @returns {String} the key of the tablet family or producer, e.g. "SamsungTablet"
         * @function MobileDetect#tablet
         */
        tablet: function () {
            impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
            return this._cache.tablet;
        },

        /**
         * Returns the (first) detected user-agent string or <tt>null</tt>.
         * <br>
         * The returned user-agent is one of following keys:<br>
         * <br><tt>Chrome, Dolfin, Opera, Skyfire, Edge, IE, Firefox, Bolt, TeaShark, Blazer,
         * Safari, UCBrowser, baiduboxapp, baidubrowser, DiigoBrowser, Puffin, Mercury,
         * ObigoBrowser, NetFront, GenericBrowser, PaleMoon</tt><br>
         * <br>
         * In most cases calling {@link MobileDetect#userAgent} will be sufficient. But there are rare
         * cases where a mobile device pretends to be more than one particular browser. You can get the
         * list of all matches with {@link MobileDetect#userAgents} or check for a particular value by
         * providing one of the defined keys as first argument to {@link MobileDetect#is}.
         *
         * @returns {String} the key for the detected user-agent or <tt>null</tt>
         * @function MobileDetect#userAgent
         */
        userAgent: function () {
            if (this._cache.userAgent === undefined) {
                this._cache.userAgent = impl.findMatch(impl.mobileDetectRules.uas, this.ua);
            }
            return this._cache.userAgent;
        },

        /**
         * Returns all detected user-agent strings.
         * <br>
         * The array is empty or contains one or more of following keys:<br>
         * <br><tt>Chrome, Dolfin, Opera, Skyfire, Edge, IE, Firefox, Bolt, TeaShark, Blazer,
         * Safari, UCBrowser, baiduboxapp, baidubrowser, DiigoBrowser, Puffin, Mercury,
         * ObigoBrowser, NetFront, GenericBrowser, PaleMoon</tt><br>
         * <br>
         * In most cases calling {@link MobileDetect#userAgent} will be sufficient. But there are rare
         * cases where a mobile device pretends to be more than one particular browser. You can get the
         * list of all matches with {@link MobileDetect#userAgents} or check for a particular value by
         * providing one of the defined keys as first argument to {@link MobileDetect#is}.
         *
         * @returns {Array} the array of detected user-agent keys or <tt>[]</tt>
         * @function MobileDetect#userAgents
         */
        userAgents: function () {
            if (this._cache.userAgents === undefined) {
                this._cache.userAgents = impl.findMatches(impl.mobileDetectRules.uas, this.ua);
            }
            return this._cache.userAgents;
        },

        /**
         * Returns the detected operating system string or <tt>null</tt>.
         * <br>
         * The operating system is one of following keys:<br>
         * <br><tt>AndroidOS, BlackBerryOS, PalmOS, SymbianOS, WindowsMobileOS, WindowsPhoneOS,
         * iOS, MeeGoOS, MaemoOS, JavaOS, webOS, badaOS, BREWOS</tt><br>
         *
         * @returns {String} the key for the detected operating system.
         * @function MobileDetect#os
         */
        os: function () {
            if (this._cache.os === undefined) {
                this._cache.os = impl.detectOS(this.ua);
            }
            return this._cache.os;
        },

        /**
         * Get the version (as Number) of the given property in the User-Agent.
         * <br>
         * Will return a float number. (eg. 2_0 will return 2.0, 4.3.1 will return 4.31)
         *
         * @param {String} key a key defining a thing which has a version.<br>
         *        You can use one of following keys:<br>
         * <br><tt>Mobile, Build, Version, VendorID, iPad, iPhone, iPod, Kindle, Chrome, Coast,
         * Dolfin, Firefox, Fennec, Edge, IE, NetFront, NokiaBrowser, Opera, Opera Mini,
         * Opera Mobi, UCBrowser, MQQBrowser, MicroMessenger, baiduboxapp, baidubrowser,
         * SamsungBrowser, Iron, Safari, Skyfire, Tizen, Webkit, PaleMoon, Gecko, Trident,
         * Presto, Goanna, iOS, Android, BlackBerry, BREW, Java, Windows Phone OS, Windows
         * Phone, Windows CE, Windows NT, Symbian, webOS</tt><br>
         *
         * @returns {Number} the version as float or <tt>NaN</tt> if User-Agent doesn't contain this version.
         *          Be careful when comparing this value with '==' operator!
         * @function MobileDetect#version
         */
        version: function (key) {
            return impl.getVersion(key, this.ua);
        },

        /**
         * Get the version (as String) of the given property in the User-Agent.
         * <br>
         *
         * @param {String} key a key defining a thing which has a version.<br>
         *        You can use one of following keys:<br>
         * <br><tt>Mobile, Build, Version, VendorID, iPad, iPhone, iPod, Kindle, Chrome, Coast,
         * Dolfin, Firefox, Fennec, Edge, IE, NetFront, NokiaBrowser, Opera, Opera Mini,
         * Opera Mobi, UCBrowser, MQQBrowser, MicroMessenger, baiduboxapp, baidubrowser,
         * SamsungBrowser, Iron, Safari, Skyfire, Tizen, Webkit, PaleMoon, Gecko, Trident,
         * Presto, Goanna, iOS, Android, BlackBerry, BREW, Java, Windows Phone OS, Windows
         * Phone, Windows CE, Windows NT, Symbian, webOS</tt><br>
         *
         * @returns {String} the "raw" version as String or <tt>null</tt> if User-Agent doesn't contain this version.
         *
         * @function MobileDetect#versionStr
         */
        versionStr: function (key) {
            return impl.getVersionStr(key, this.ua);
        },

        /**
         * Global test key against userAgent, os, phone, tablet and some other properties of userAgent string.
         *
         * @param {String} key the key (case-insensitive) of a userAgent, an operating system, phone or
         *        tablet family.<br>
         *        For a complete list of possible values, see {@link MobileDetect#userAgent},
         *        {@link MobileDetect#os}, {@link MobileDetect#phone}, {@link MobileDetect#tablet}.<br>
         *        Additionally you have following keys:<br>
         * <br><tt>Bot, MobileBot, DesktopMode, TV, WebKit, Console, Watch</tt><br>
         *
         * @returns {boolean} <tt>true</tt> when the given key is one of the defined keys of userAgent, os, phone,
         *                    tablet or one of the listed additional keys, otherwise <tt>false</tt>
         * @function MobileDetect#is
         */
        is: function (key) {
            return containsIC(this.userAgents(), key) ||
                   equalIC(key, this.os()) ||
                   equalIC(key, this.phone()) ||
                   equalIC(key, this.tablet()) ||
                   containsIC(impl.findMatches(impl.mobileDetectRules.utils, this.ua), key);
        },

        /**
         * Do a quick test against navigator::userAgent.
         *
         * @param {String|RegExp} pattern the pattern, either as String or RegExp
         *                        (a string will be converted to a case-insensitive RegExp).
         * @returns {boolean} <tt>true</tt> when the pattern matches, otherwise <tt>false</tt>
         * @function MobileDetect#match
         */
        match: function (pattern) {
            if (!(pattern instanceof RegExp)) {
                pattern = new RegExp(pattern, 'i');
            }
            return pattern.test(this.ua);
        },

        /**
         * Checks whether the mobile device can be considered as phone regarding <code>screen.width</code>.
         * <br>
         * Obviously this method makes sense in browser environments only (not for Node.js)!
         * @param {number} [maxPhoneWidth] the maximum logical pixels (aka. CSS-pixels) to be considered as phone.<br>
         *        The argument is optional and if not present or falsy, the value of the constructor is taken.
         * @returns {boolean|undefined} <code>undefined</code> if screen size wasn't detectable, else <code>true</code>
         *          when screen.width is less or equal to maxPhoneWidth, otherwise <code>false</code>.<br>
         *          Will always return <code>undefined</code> server-side.
         */
        isPhoneSized: function (maxPhoneWidth) {
            return MobileDetect.isPhoneSized(maxPhoneWidth || this.maxPhoneWidth);
        },

        /**
         * Returns the mobile grade ('A', 'B', 'C').
         *
         * @returns {String} one of the mobile grades ('A', 'B', 'C').
         * @function MobileDetect#mobileGrade
         */
        mobileGrade: function () {
            if (this._cache.grade === undefined) {
                this._cache.grade = impl.mobileGrade(this);
            }
            return this._cache.grade;
        }
    };

    // environment-dependent
    if (typeof window !== 'undefined' && window.screen) {
        MobileDetect.isPhoneSized = function (maxPhoneWidth) {
            return maxPhoneWidth < 0 ? undefined : impl.getDeviceSmallerSide() <= maxPhoneWidth;
        };
    } else {
        MobileDetect.isPhoneSized = function () {};
    }

    // should not be replaced by a completely new object - just overwrite existing methods
    MobileDetect._impl = impl;
    
    MobileDetect.version = '1.4.1 2017-12-24';

    return MobileDetect;
}); // end of call of define()
})((function (undefined) {
    if (typeof module !== 'undefined' && module.exports) {
        return function (factory) { module.exports = factory(); };
    } else if (typeof define === 'function' && define.amd) {
        return define;
    } else if (typeof window !== 'undefined') {
        return function (factory) { window.MobileDetect = factory(); };
    } else {
        // please file a bug if you get this error!
        throw new Error('unknown environment');
    }
})());
},{}],30:[function(require,module,exports){
(function (global){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('preact'), require('redux')) :
	typeof define === 'function' && define.amd ? define(['preact', 'redux'], factory) :
	(global.preactRedux = factory(global.preact,global.Redux));
}(this, (function (preact,redux) {

var Children = {
	only: function only(children) {
		return children && children[0] || null;
	}
};

function proptype() {}
proptype.isRequired = proptype;

var PropTypes = {
	element: proptype,
	func: proptype,
	shape: function shape() {
		return proptype;
	},
	instanceOf: function instanceOf() {
		return proptype;
	}
};

var subscriptionShape = PropTypes.shape({
  trySubscribe: PropTypes.func.isRequired,
  tryUnsubscribe: PropTypes.func.isRequired,
  notifyNestedSubs: PropTypes.func.isRequired,
  isSubscribed: PropTypes.func.isRequired
});

var storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
});

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  warning('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      classCallCheck(this, Provider);

      var _this = possibleConstructorReturn(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return Children.only(this.props.children);
    };

    return Provider;
  }(preact.Component);

  {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = storeShape.isRequired, _Provider$childContex[subscriptionKey] = subscriptionShape, _Provider$childContex);

  return Provider;
}

var Provider = createProvider();

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty$1 = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

var hoistNonReactStatics = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty$1(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};

var invariant = function () {};

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get$$1() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();

var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = storeShape, _contextTypes[subscriptionKey] = subscriptionShape, _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = subscriptionShape, _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    invariant(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      inherits(Connect, _Component);

      function Connect(props, context) {
        classCallCheck(this, Connect);

        var _this = possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        invariant(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        invariant(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return preact.h(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(preact.Component);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;


    {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.
          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }
          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return hoistNonReactStatics(Connect, WrappedComponent);
  };
}

var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var _Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject(value)) {
    warning(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      verifyPlainObject(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}

function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && (typeof mapDispatchToProps === 'undefined' ? 'undefined' : _typeof(mapDispatchToProps)) === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return redux.bindActionCreators(mapDispatchToProps, dispatch);
  }) : undefined;
}

var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}

var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        verifyPlainObject(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      warning('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  {
    verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? defaultMergePropsFactories : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? finalPropsSelectorFactory : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? shallowEqual : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? shallowEqual : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? shallowEqual : _ref2$areMergedPropsE,
        extraOptions = objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

var connect = createConnect();

var index = { Provider: Provider, connect: connect, connectAdvanced: connectAdvanced };

return index;

})));


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"preact":33,"redux":40}],31:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("preact")):"function"==typeof define&&define.amd?define(["preact"],e):t.preactRouter=e(t.preact)}(this,function(t){function e(t,e){for(var n in e)t[n]=e[n];return t}function n(t,e,n){var r,o=/(?:\?([^#]*))?(#.*)?$/,u=t.match(o),a={};if(u&&u[1])for(var p=u[1].split("&"),c=0;c<p.length;c++){var f=p[c].split("=");a[decodeURIComponent(f[0])]=decodeURIComponent(f.slice(1).join("="))}t=i(t.replace(o,"")),e=i(e||"");for(var l=Math.max(t.length,e.length),s=0;s<l;s++)if(e[s]&&":"===e[s].charAt(0)){var h=e[s].replace(/(^\:|[+*?]+$)/g,""),d=(e[s].match(/[+*?]+$/)||C)[0]||"",g=~d.indexOf("+"),m=~d.indexOf("*"),y=t[s]||"";if(!y&&!m&&(d.indexOf("?")<0||g)){r=!1;break}if(a[h]=decodeURIComponent(y),g||m){a[h]=t.slice(s).map(decodeURIComponent).join("/");break}}else if(e[s]!==t[s]){r=!1;break}return(n.default===!0||r!==!1)&&a}function r(t,e){return t.rank<e.rank?1:t.rank>e.rank?-1:t.index-e.index}function o(t,e){return t.index=e,t.rank=p(t),t.attributes}function i(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function u(t){return":"==t.charAt(0)?1+"*+?".indexOf(t.charAt(t.length-1))||4:5}function a(t){return i(t).map(u).join("")}function p(t){return t.attributes.default?0:a(t.attributes.path)}function c(t){return null!=t.__preactattr_||"undefined"!=typeof Symbol&&null!=t[Symbol.for("preactattr")]}function f(t,e){void 0===e&&(e="push"),R&&R[e]?R[e](t):"undefined"!=typeof history&&history[e+"State"]&&history[e+"State"](null,null,t)}function l(){var t;return t=R&&R.location?R.location:R&&R.getCurrentLocation?R.getCurrentLocation():"undefined"!=typeof location?location:x,""+(t.pathname||"")+(t.search||"")}function s(t,e){return void 0===e&&(e=!1),"string"!=typeof t&&t.url&&(e=t.replace,t=t.url),h(t)&&f(t,e?"replace":"push"),d(t)}function h(t){for(var e=U.length;e--;)if(U[e].canRoute(t))return!0;return!1}function d(t){for(var e=!1,n=0;n<U.length;n++)U[n].routeTo(t)===!0&&(e=!0);for(var r=k.length;r--;)k[r](t);return e}function g(t){if(t&&t.getAttribute){var e=t.getAttribute("href"),n=t.getAttribute("target");if(e&&e.match(/^\//g)&&(!n||n.match(/^_?self$/i)))return s(e)}}function m(t){if(0==t.button)return g(t.currentTarget||t.target||this),y(t)}function y(t){return t&&(t.stopImmediatePropagation&&t.stopImmediatePropagation(),t.stopPropagation&&t.stopPropagation(),t.preventDefault()),!1}function v(t){if(!(t.ctrlKey||t.metaKey||t.altKey||t.shiftKey||0!==t.button)){var e=t.target;do if("A"===(e.nodeName+"").toUpperCase()&&e.getAttribute("href")&&c(e)){if(e.hasAttribute("native"))return;if(g(e))return y(t)}while(e=e.parentNode)}}function b(){_||("function"==typeof addEventListener&&(R||addEventListener("popstate",function(){d(l())}),addEventListener("click",v)),_=!0)}var C={},R=null,U=[],k=[],x={},_=!1,A=function(i){function u(t){i.call(this,t),t.history&&(R=t.history),this.state={url:t.url||l()},b()}return i&&(u.__proto__=i),u.prototype=Object.create(i&&i.prototype),u.prototype.constructor=u,u.prototype.shouldComponentUpdate=function(t){return t.static!==!0||(t.url!==this.props.url||t.onChange!==this.props.onChange)},u.prototype.canRoute=function(t){return this.getMatchingChildren(this.props.children,t,!1).length>0},u.prototype.routeTo=function(t){return this._didRoute=!1,this.setState({url:t}),this.updating?this.canRoute(t):(this.forceUpdate(),this._didRoute)},u.prototype.componentWillMount=function(){U.push(this),this.updating=!0},u.prototype.componentDidMount=function(){var t=this;R&&(this.unlisten=R.listen(function(e){t.routeTo(""+(e.pathname||"")+(e.search||""))})),this.updating=!1},u.prototype.componentWillUnmount=function(){"function"==typeof this.unlisten&&this.unlisten(),U.splice(U.indexOf(this),1)},u.prototype.componentWillUpdate=function(){this.updating=!0},u.prototype.componentDidUpdate=function(){this.updating=!1},u.prototype.getMatchingChildren=function(i,u,a){return i.filter(o).sort(r).map(function(r){var o=n(u,r.attributes.path,r.attributes);if(o){if(a!==!1){var i={url:u,matches:o};return e(i,o),delete i.ref,delete i.key,t.cloneElement(r,i)}return r}}).filter(Boolean)},u.prototype.render=function(t,e){var n=t.children,r=t.onChange,o=e.url,i=this.getMatchingChildren(n,o,!0),u=i[0]||null;this._didRoute=!!u;var a=this.previousUrl;return o!==a&&(this.previousUrl=o,"function"==typeof r&&r({router:this,url:o,previous:a,active:i,current:u})),u},u}(t.Component),I=function(n){return t.h("a",e({onClick:m},n))},L=function(e){return t.h(e.component,e)};return A.subscribers=k,A.getCurrentUrl=l,A.route=s,A.Router=A,A.Route=L,A.Link=I,A});


},{"preact":33}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = require('preact');

var _preactRouter = require('preact-router');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(
		Match,
		{ path: path || props.href },
		function (_ref2) {
			var matches = _ref2.matches;
			return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
		}
	);
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

},{"preact":33,"preact-router":31}],33:[function(require,module,exports){
!function() {
    'use strict';
    function VNode() {}
    function h(nodeName, attributes) {
        var lastSimple, child, simple, i, children = EMPTY_CHILDREN;
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && null != attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) && void 0 !== child.pop) for (i = child.length; i--; ) stack.push(child[i]); else {
            if ('boolean' == typeof child) child = null;
            if (simple = 'function' != typeof nodeName) if (null == child) child = ''; else if ('number' == typeof child) child = String(child); else if ('string' != typeof child) simple = !1;
            if (simple && lastSimple) children[children.length - 1] += child; else if (children === EMPTY_CHILDREN) children = [ child ]; else children.push(child);
            lastSimple = simple;
        }
        var p = new VNode();
        p.nodeName = nodeName;
        p.children = children;
        p.attributes = null == attributes ? void 0 : attributes;
        p.key = null == attributes ? void 0 : attributes.key;
        if (void 0 !== options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        for (var i in props) obj[i] = props[i];
        return obj;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function enqueueRender(component) {
        if (!component.__d && (component.__d = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p.__d) renderComponent(p);
    }
    function isSameNodeType(node, vnode, hydrating) {
        if ('string' == typeof vnode || 'number' == typeof vnode) return void 0 !== node.splitText;
        if ('string' == typeof vnode.nodeName) return !node._componentConstructor && isNamedNode(node, vnode.nodeName); else return hydrating || node._componentConstructor === vnode.nodeName;
    }
    function isNamedNode(node, nodeName) {
        return node.__n === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
    }
    function getNodeProps(vnode) {
        var props = extend({}, vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (void 0 !== defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function createNode(nodeName, isSvg) {
        var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
        node.__n = nodeName;
        return node;
    }
    function removeNode(node) {
        var parentNode = node.parentNode;
        if (parentNode) parentNode.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('key' === name) ; else if ('ref' === name) {
            if (old) old(null);
            if (value) value(node);
        } else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || 'string' == typeof value || 'string' == typeof old) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if ('string' != typeof old) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !1 === IS_NON_DIMENSIONAL.test(i) ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var useCapture = name !== (name = name.replace(/Capture$/, ''));
            name = name.toLowerCase().substring(2);
            if (value) {
                if (!old) node.addEventListener(name, eventProxy, useCapture);
            } else node.removeEventListener(name, eventProxy, useCapture);
            (node.__l || (node.__l = {}))[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || !1 === value) node.removeAttribute(name);
        } else {
            var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
            if (null == value || !1 === value) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase()); else node.removeAttribute(name); else if ('function' != typeof value) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this.__l[e.type](options.event && options.event(e) || e);
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = null != parent && void 0 !== parent.ownerSVGElement;
            hydrating = null != dom && !('__preactattr_' in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll, componentRoot);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll, componentRoot) {
        var out = dom, prevSvgMode = isSvgMode;
        if (null == vnode || 'boolean' == typeof vnode) vnode = '';
        if ('string' == typeof vnode || 'number' == typeof vnode) {
            if (dom && void 0 !== dom.splitText && dom.parentNode && (!dom._component || componentRoot)) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                out = document.createTextNode(vnode);
                if (dom) {
                    if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                    recollectNodeTree(dom, !0);
                }
            }
            out.__preactattr_ = !0;
            return out;
        }
        var vnodeName = vnode.nodeName;
        if ('function' == typeof vnodeName) return buildComponentFromVNode(dom, vnode, context, mountAll);
        isSvgMode = 'svg' === vnodeName ? !0 : 'foreignObject' === vnodeName ? !1 : isSvgMode;
        vnodeName = String(vnodeName);
        if (!dom || !isNamedNode(dom, vnodeName)) {
            out = createNode(vnodeName, isSvgMode);
            if (dom) {
                while (dom.firstChild) out.appendChild(dom.firstChild);
                if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, !0);
            }
        }
        var fc = out.firstChild, props = out.__preactattr_, vchildren = vnode.children;
        if (null == props) {
            props = out.__preactattr_ = {};
            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
        }
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && null != fc && void 0 !== fc.splitText && null == fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || null != fc) innerDiffNode(out, vchildren, context, mountAll, hydrating || null != props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
        var j, c, f, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren ? vchildren.length : 0;
        if (0 !== len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child.__preactattr_, key = vlen && props ? _child._component ? _child._component.__k : props.key : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (props || (void 0 !== _child.splitText ? isHydrating ? _child.nodeValue.trim() : !0 : isHydrating)) children[childrenLen++] = _child;
        }
        if (0 !== vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && void 0 !== keyed[key]) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) if (void 0 !== children[j] && isSameNodeType(c = children[j], vchild, isHydrating)) {
                child = c;
                children[j] = void 0;
                if (j === childrenLen - 1) childrenLen--;
                if (j === min) min++;
                break;
            }
            child = idiff(child, vchild, context, mountAll);
            f = originalChildren[i];
            if (child && child !== dom && child !== f) if (null == f) dom.appendChild(child); else if (child === f.nextSibling) removeNode(f); else dom.insertBefore(child, f);
        }
        if (keyedLen) for (var i in keyed) if (void 0 !== keyed[i]) recollectNodeTree(keyed[i], !1);
        while (min <= childrenLen) if (void 0 !== (child = children[childrenLen--])) recollectNodeTree(child, !1);
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component); else {
            if (null != node.__preactattr_ && node.__preactattr_.ref) node.__preactattr_.ref(null);
            if (!1 === unmountOnly || null == node.__preactattr_) removeNode(node);
            removeChildren(node);
        }
    }
    function removeChildren(node) {
        node = node.lastChild;
        while (node) {
            var next = node.previousSibling;
            recollectNodeTree(node, !0);
            node = next;
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if ((!attrs || null == attrs[name]) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name;
        (components[name] || (components[name] = [])).push(component);
    }
    function createComponent(Ctor, props, context) {
        var inst, list = components[Ctor.name];
        if (Ctor.prototype && Ctor.prototype.render) {
            inst = new Ctor(props, context);
            Component.call(inst, props, context);
        } else {
            inst = new Component(props, context);
            inst.constructor = Ctor;
            inst.render = doRender;
        }
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.__b = list[i].__b;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function doRender(props, state, context) {
        return this.constructor(props, context);
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component.__x) {
            component.__x = !0;
            if (component.__r = props.ref) delete props.ref;
            if (component.__k = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.__c) component.__c = component.context;
                component.context = context;
            }
            if (!component.__p) component.__p = component.props;
            component.props = props;
            component.__x = !1;
            if (0 !== opts) if (1 === opts || !1 !== options.syncComponentUpdates || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__r) component.__r(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component.__x) {
            var rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.__p || props, previousState = component.__s || state, previousContext = component.__c || context, isUpdate = component.base, nextBase = component.__b, initialBase = isUpdate || nextBase, initialChildComponent = component._component, skip = !1;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && !1 === component.shouldComponentUpdate(props, state, context)) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.__p = component.__s = component.__c = component.__b = null;
            component.__d = !1;
            if (!skip) {
                rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(extend({}, context), component.getChildContext());
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if ('function' == typeof childComponent) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__k) setComponentProps(inst, childProps, 1, context, !1); else {
                        toUnmount = inst;
                        component._component = inst = createComponent(childComponent, childProps, context);
                        inst.__b = inst.__b || nextBase;
                        inst.__u = component;
                        setComponentProps(inst, childProps, 0, context, !1);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase, !1);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t.__u) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            if (null != component.__h) while (component.__h.length) component.__h.pop().call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c.__u)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.__b) {
                c.__b = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom, !1);
            }
        }
        return dom;
    }
    function unmountComponent(component) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component.__x = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner); else if (base) {
            if (base.__preactattr_ && base.__preactattr_.ref) base.__preactattr_.ref(null);
            component.__b = base;
            removeNode(base);
            collectComponent(component);
            removeChildren(base);
        }
        if (component.__r) component.__r(null);
    }
    function Component(props, context) {
        this.__d = !0;
        this.context = context;
        this.props = props;
        this.state = this.state || {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent, !1);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var defer = 'function' == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var items = [];
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        setState: function(state, callback) {
            var s = this.state;
            if (!this.__s) this.__s = extend({}, s);
            extend(s, 'function' == typeof state ? state(s, this.props) : state);
            if (callback) (this.__h = this.__h || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function(callback) {
            if (callback) (this.__h = this.__h || []).push(callback);
            renderComponent(this, 2);
        },
        render: function() {}
    });
    var preact = {
        h: h,
        createElement: h,
        cloneElement: cloneElement,
        Component: Component,
        render: render,
        rerender: rerender,
        options: options
    };
    if ('undefined' != typeof module) module.exports = preact; else self.preact = preact;
}();

},{}],34:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],35:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = applyMiddleware;

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
},{"./compose":38}],36:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
},{}],37:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports['default'] = combineReducers;

var _createStore = require('./createStore');

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2['default'])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2['default'])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
}).call(this,require('_process'))

},{"./createStore":39,"./utils/warning":41,"_process":34,"lodash/isPlainObject":28}],38:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}
},{}],39:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ActionTypes = undefined;
exports['default'] = createStore;

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = require('symbol-observable');

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2['default'])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2['default']] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
}
},{"lodash/isPlainObject":28,"symbol-observable":42}],40:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = require('./combineReducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = require('./bindActionCreators');

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = require('./applyMiddleware');

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2['default'];
exports.combineReducers = _combineReducers2['default'];
exports.bindActionCreators = _bindActionCreators2['default'];
exports.applyMiddleware = _applyMiddleware2['default'];
exports.compose = _compose2['default'];
}).call(this,require('_process'))

},{"./applyMiddleware":35,"./bindActionCreators":36,"./combineReducers":37,"./compose":38,"./createStore":39,"./utils/warning":41,"_process":34}],41:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}
},{}],42:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill.js');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./ponyfill.js":43}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};
},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9hcHAvQXBwLmpzIiwiLi4vYXBwL0NPTlNUQU5UUy5qcyIsIi4uL2FwcC9jbGllbnQuanMiLCIuLi9hcHAvY29tcG9uZW50cy9BYm91dC9BYm91dC5qcyIsIi4uL2FwcC9jb21wb25lbnRzL0ZlZWQvRmVlZC5qcyIsIi4uL2FwcC9jb21wb25lbnRzL0ZlZWQvSXRlbXMvTGl2ZS5qcyIsIi4uL2FwcC9jb21wb25lbnRzL0ZlZWQvSXRlbXMvTmV3cy5qcyIsIi4uL2FwcC9jb21wb25lbnRzL0ZlZWQvSXRlbXMvU2hvcC5qcyIsIi4uL2FwcC9jb21wb25lbnRzL0ZlZWQvSXRlbXMvVmlkZW8uanMiLCIuLi9hcHAvY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyLmpzIiwiLi4vYXBwL3BhZ2VzLzQwNC80MDQuanMiLCIuLi9hcHAvcGFnZXMvQWJvdXRPdmVybGF5L0Fib3V0T3ZlcmxheS5qcyIsIi4uL2FwcC9wYWdlcy9Ib21lL0hvbWUuanMiLCIuLi9hcHAvc3RhdGUvYWN0aW9uLXR5cGVzLmpzIiwiLi4vYXBwL3N0YXRlL2FjdGlvbnMuanMiLCIuLi9hcHAvc3RhdGUvcmVkdWNlcnMuanMiLCIuLi9hcHAvc3RhdGUvc3RvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvZmFzdGNsaWNrL2xpYi9mYXN0Y2xpY2suanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFByb3RvdHlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX29iamVjdFRvU3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb3ZlckFyZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNQbGFpbk9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9tb2JpbGUtZGV0ZWN0L21vYmlsZS1kZXRlY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvcHJlYWN0LXJlZHV4L2Rpc3QvcHJlYWN0LXJlZHV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3ByZWFjdC1yb3V0ZXIvZGlzdC9wcmVhY3Qtcm91dGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3ByZWFjdC1yb3V0ZXIvbWF0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvcHJlYWN0L2Rpc3QvcHJlYWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWR1eC9saWIvYXBwbHlNaWRkbGV3YXJlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9iaW5kQWN0aW9uQ3JlYXRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2NvbWJpbmVSZWR1Y2Vycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWR1eC9saWIvY29tcG9zZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWR1eC9saWIvY3JlYXRlU3RvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZHV4L2xpYi91dGlscy93YXJuaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2xpYi9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvcG9ueWZpbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0NBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7Ozs7Ozs7OytlQWhCQTs7O0FBTUE7OztBQUlBOzs7QUFLQTs7O0lBSU0sRzs7O0FBS0wsY0FBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsd0dBQ1osS0FEWTs7QUFBQSxRQUpuQixLQUltQixHQUpYO0FBQ1AsU0FBTTtBQURDLEdBSVc7O0FBRWxCLFFBQUssbUJBQUwsR0FBMkIsTUFBSyxtQkFBTCxDQUF5QixJQUF6QixPQUEzQjtBQUZrQjtBQUdsQjs7Ozt1Q0FFb0I7QUFDcEIsUUFBSyxnQkFBTDtBQUNBOzs7c0NBRW1CO0FBQ25CLFdBQVEsR0FBUixDQUFZLGFBQVo7QUFDQTs7O3FDQUVrQjtBQUNsQiw4QkFDQyxJQURELENBQ007QUFBQSxXQUFZLFNBQVMsSUFBVCxFQUFaO0FBQUEsSUFETixFQUVDLElBRkQsQ0FFTSxLQUFLLG1CQUZYO0FBR0E7OztzQ0FFbUIsSSxFQUFNO0FBQ3pCLG1CQUFNLFFBQU4sQ0FBZSw2QkFBZjtBQUNBLFFBQUssUUFBTCxDQUFjLEVBQUUsVUFBRixFQUFkO0FBQ0E7OztzQ0FFb0U7QUFBQSxPQUE1RCxPQUE0RCxRQUE1RCxPQUE0RDtBQUFBLE9BQW5ELG1CQUFtRCxRQUFuRCxtQkFBbUQ7QUFBQSxPQUE5QixnQkFBOEIsUUFBOUIsZ0JBQThCO0FBQUEsT0FBUixJQUFRLFNBQVIsSUFBUTs7QUFDcEUsV0FBUSxHQUFSLENBQVksSUFBWjtBQUNBLE9BQUksQ0FBQyxtQkFBTCxFQUEwQixPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBUDtBQUMxQixVQUNDO0FBQUE7QUFBQSxNQUFLLFNBQU0sS0FBWDtBQUNDLHFDQUFNLFdBQVcsS0FBSyxLQUF0QixFQUE2QixXQUFXLEtBQUssSUFBTCxDQUFVLEtBQWxELEdBREQ7QUFFQyxnREFGRDtBQUlDLDZDQUFjLE1BQU0sS0FBSyxLQUF6QixHQUpEO0FBS0MsMENBTEQ7QUFNQztBQUFBO0FBQUEsT0FBSyxTQUFNLFlBQVgsRUFBd0IsU0FBUyxnQkFBakM7QUFBQTtBQUFBO0FBTkQsSUFERDtBQVVBOzs7Ozs7QUFHRixJQUFNLGtCQUFrQixTQUFsQixlQUFrQixRQUFzQztBQUFBLEtBQW5DLE9BQW1DLFNBQW5DLE9BQW1DO0FBQUEsS0FBMUIsbUJBQTBCLFNBQTFCLG1CQUEwQjs7QUFDN0QsUUFBTyxFQUFFLGdCQUFGLEVBQVcsd0NBQVgsRUFBUDtBQUNBLENBRkQ7O0FBSUEsSUFBTSxxQkFBcUIsU0FBckIsa0JBQXFCLENBQUMsUUFBRCxFQUFjO0FBQ3hDLFFBQU87QUFDTixvQkFBa0IsNEJBQU07QUFDdkIsWUFBUyxrQ0FBVDtBQUNBO0FBSEssRUFBUDtBQUtBLENBTkQ7O2tCQVNlLDBCQUNkLGVBRGMsRUFFZCxrQkFGYyxFQUdiLEdBSGEsQzs7Ozs7Ozs7QUM3RVIsSUFBTSw0Q0FBa0IsRUFBeEI7QUFDUCxnQkFBZ0IsWUFBaEIsSUFBZ0MsTUFBaEM7QUFDQSxnQkFBZ0IsWUFBaEIsSUFBZ0MsTUFBaEM7QUFDQSxnQkFBZ0IsWUFBaEIsSUFBZ0MsTUFBaEM7QUFDQSxnQkFBZ0IsYUFBaEIsSUFBaUMsT0FBakM7Ozs7O0FDSEE7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7QUFDQTs7Ozs7O0FBRkE7QUFJQSxJQUFNLFNBQVMsU0FBVCxNQUFTLEdBQU07QUFDcEIscUJBQ0M7QUFBQTtBQUFBLElBQVUsc0JBQVY7QUFDQztBQURELEVBREQsRUFJRyxTQUFTLElBSlo7QUFLQSxDQU5ELEMsQ0FUQTs7O0FBa0JBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLE1BQTlDOzs7Ozs7Ozs7QUNqQkE7O0FBRUEsSUFBTSxRQUFRLFNBQVIsS0FBUTtBQUFBLEtBQUcsSUFBSCxRQUFHLElBQUg7QUFBQSxRQUNiO0FBQUE7QUFBQSxJQUFTLFNBQU0sT0FBZjtBQUNDLDJCQUFNLHlCQUF5QixFQUFFLFFBQVEsSUFBVixFQUEvQjtBQURELEVBRGE7QUFBQSxDQUFkLEMsQ0FIQTtrQkFVZSxLOzs7Ozs7Ozs7QUNUZjs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVAsSUFBTztBQUFBLEtBQUcsS0FBSCxRQUFHLEtBQUg7QUFBQSxRQUNaO0FBQUE7QUFBQSxJQUFTLFNBQU0sTUFBZjtBQUNDO0FBQUE7QUFBQSxLQUFJLFNBQU0sYUFBVjtBQUNFLFNBQU0sR0FBTixDQUFVLGdCQUFRO0FBQ2xCLFlBQU8sS0FBSyxJQUFaO0FBQ0MsVUFBSyxZQUFMO0FBQ0MsYUFBTyxpQ0FBTSxPQUFPLEtBQUssS0FBbEIsRUFBeUIsTUFBTSxLQUFLLElBQXBDLEVBQTBDLE1BQU0sS0FBSyxJQUFyRCxHQUFQO0FBQ0QsVUFBSyxZQUFMO0FBQ0MsYUFBTyxpQ0FBTSxPQUFPLEtBQUssS0FBbEIsRUFBeUIsTUFBTSxLQUFLLElBQXBDLEdBQVA7QUFDRCxVQUFLLFlBQUw7QUFDQyxhQUFPLGlDQUFNLE9BQU8sS0FBSyxLQUFsQixFQUF5QixNQUFNLEtBQUssSUFBcEMsRUFBMEMsTUFBTSxLQUFLLElBQXJELEdBQVA7QUFDRCxVQUFLLGFBQUw7QUFDQyxhQUFPLGtDQUFPLE9BQU8sS0FBSyxLQUFuQixFQUEwQixNQUFNLEtBQUssSUFBckMsR0FBUDtBQVJGO0FBVUEsSUFYQTtBQURGO0FBREQsRUFEWTtBQUFBLENBQWIsQyxDQVJBO2tCQTRCZSxJOzs7Ozs7Ozs7QUMzQmY7O0FBRUE7O0FBSEE7QUFLQSxJQUFNLE9BQU8sU0FBUCxJQUFPO0FBQUEsS0FBRyxLQUFILFFBQUcsS0FBSDtBQUFBLEtBQVUsSUFBVixRQUFVLElBQVY7QUFBQSxLQUFnQixJQUFoQixRQUFnQixJQUFoQjtBQUFBLFFBQ1o7QUFBQTtBQUFBLElBQUksU0FBTSw4QkFBVjtBQUNDO0FBQUE7QUFBQTtBQUFPLDhCQUFnQixJQUFoQjtBQUFQLEdBREQ7QUFFQztBQUFBO0FBQUE7QUFBSztBQUFMLEdBRkQ7QUFHRyxTQUFPO0FBQUE7QUFBQSxLQUFHLFFBQU8sUUFBVixFQUFtQixNQUFNLElBQXpCO0FBQUE7QUFBQSxHQUFQLEdBQWlEO0FBSHBELEVBRFk7QUFBQSxDQUFiOztrQkFTZSxJOzs7Ozs7Ozs7QUNiZjs7QUFFQTs7QUFIQTtBQUtBLElBQU0sT0FBTyxTQUFQLElBQU87QUFBQSxLQUFHLEtBQUgsUUFBRyxLQUFIO0FBQUEsS0FBVSxJQUFWLFFBQVUsSUFBVjtBQUFBLFFBQ1o7QUFBQTtBQUFBLElBQUksU0FBTSw2QkFBVjtBQUNDO0FBQUE7QUFBQTtBQUFPLDhCQUFnQixJQUFoQjtBQUFQLEdBREQ7QUFFQztBQUFBO0FBQUE7QUFBSztBQUFMLEdBRkQ7QUFHQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSEQsRUFEWTtBQUFBLENBQWI7O2tCQVNlLEk7Ozs7Ozs7OztBQ2JmOztBQUVBOztBQUhBO0FBS0EsSUFBTSxPQUFPLFNBQVAsSUFBTztBQUFBLEtBQUcsS0FBSCxRQUFHLEtBQUg7QUFBQSxLQUFVLElBQVYsUUFBVSxJQUFWO0FBQUEsS0FBZ0IsSUFBaEIsUUFBZ0IsSUFBaEI7QUFBQSxRQUNaO0FBQUE7QUFBQSxJQUFJLFNBQU0sNkJBQVY7QUFDQztBQUFBO0FBQUE7QUFBTyw4QkFBZ0IsSUFBaEI7QUFBUCxHQUREO0FBRUM7QUFBQTtBQUFBO0FBQUs7QUFBTCxHQUZEO0FBR0M7QUFBQTtBQUFBLEtBQUcsUUFBTyxRQUFWLEVBQW1CLE1BQU0sSUFBekI7QUFBQTtBQUFBO0FBSEQsRUFEWTtBQUFBLENBQWI7O2tCQVNlLEk7Ozs7Ozs7OztBQ2JmOztBQUVBOztBQUhBO0FBS0EsSUFBTSxRQUFRLFNBQVIsS0FBUTtBQUFBLEtBQUcsS0FBSCxRQUFHLEtBQUg7QUFBQSxLQUFVLElBQVYsUUFBVSxJQUFWO0FBQUEsUUFDYjtBQUFBO0FBQUEsSUFBSSxTQUFNLDhCQUFWO0FBQ0M7QUFBQTtBQUFBO0FBQU8sOEJBQWdCLElBQWhCO0FBQVAsR0FERDtBQUVDO0FBQUE7QUFBQTtBQUFLO0FBQUwsR0FGRDtBQUdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIRCxFQURhO0FBQUEsQ0FBZDs7a0JBU2UsSzs7Ozs7Ozs7O0FDYmY7O0FBRUEsSUFBTSxTQUFTLFNBQVQsTUFBUztBQUFBLFFBQ2Q7QUFBQTtBQUFBLElBQVEsU0FBTSxnQkFBZDtBQUFBO0FBQUEsRUFEYztBQUFBLENBQWYsQyxDQUhBO2tCQVVlLE07Ozs7Ozs7OztBQ1RmOztBQUVBLElBQU0sYUFBYSxTQUFiLFVBQWE7QUFBQSxRQUNsQjtBQUFBO0FBQUEsSUFBSyxTQUFNLEtBQVg7QUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREQsRUFEa0I7QUFBQSxDQUFuQixDLENBSEE7a0JBVWUsVTs7Ozs7Ozs7Ozs7OztBQ1RmOztBQUNBOztBQUdBOztBQUdBOzs7Ozs7Ozs7OytlQVJBOzs7QUFJQTs7O0FBR0E7OztBQUdBLElBQU0sT0FBTyxTQUFQLElBQU87QUFBQSxLQUFHLElBQUgsUUFBRyxJQUFIO0FBQUEsS0FBUyxxQkFBVCxRQUFTLHFCQUFUO0FBQUEsS0FBZ0MsUUFBaEMsUUFBZ0MsUUFBaEM7QUFBQSxLQUEwQyxXQUExQyxRQUEwQyxXQUExQztBQUFBLEtBQXVELG1CQUF2RCxRQUF1RCxtQkFBdkQ7QUFBQSxRQUNaO0FBQUE7QUFBQSxJQUFLLDRDQUF1Qyx3QkFBd0IsU0FBeEIsR0FBb0MsUUFBM0UsQ0FBTCxFQUE0RixVQUFVLFFBQXRHO0FBQ0MsMEJBQUssbUNBQThCLENBQUMsbUJBQUQsR0FBdUIsOEJBQXZCLEdBQXdELEVBQXRGLENBQUwsRUFBaUcsT0FBTyxFQUFFLFNBQVMsV0FBWCxFQUF4RyxHQUREO0FBRUM7QUFBQTtBQUFBLEtBQUssb0NBQStCLHNCQUFzQixpQ0FBdEIsR0FBMEQsRUFBekYsQ0FBTDtBQUNDLHFDQUFPLE1BQU0sSUFBYjtBQUREO0FBRkQsRUFEWTtBQUFBLENBQWI7O0lBVU0sWTs7O0FBTUwsdUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBIQUNaLEtBRFk7O0FBQUEsUUFMbkIsS0FLbUIsR0FMWDtBQUNQLHdCQUFxQixJQURkO0FBRVAsZ0JBQWE7QUFGTixHQUtXOztBQUVsQixRQUFLLFFBQUwsR0FBZ0IsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFoQjtBQUZrQjtBQUdsQjs7OztzQ0FFbUIsQ0FDbkI7Ozs0Q0FFNkM7QUFBQSxPQUF6QixxQkFBeUIsU0FBekIscUJBQXlCOztBQUM3QyxPQUFJLENBQUMscUJBQUQsSUFBMEIsS0FBSyxLQUFMLENBQVcscUJBQXpDLEVBQWdFLEtBQUssSUFBTDtBQUNoRTs7O2tDQUVvQjtBQUFBLE9BQVYsTUFBVSxTQUFWLE1BQVU7O0FBQ3BCLE9BQU0sTUFBTSxPQUFPLFlBQVAsR0FBc0IsT0FBTyxXQUF6QztBQUNBLE9BQU0sY0FBYyxJQUFLLE9BQU8sU0FBUCxHQUFtQixHQUE1QztBQUNBLFFBQUssUUFBTCxDQUFjLEVBQUUsd0JBQUYsRUFBZDtBQUNBLE9BQUksT0FBTyxTQUFQLEtBQXFCLEdBQXpCLEVBQThCO0FBQzdCLFNBQUssS0FBTCxDQUFXLElBQVg7QUFDQSxTQUFLLFFBQUwsQ0FBYyxFQUFFLHFCQUFxQixJQUF2QixFQUFkO0FBQ0E7QUFDRDs7O3lCQUVNO0FBQ04sWUFBUyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxTQUF6QyxHQUFxRCxDQUFyRDtBQUNBLFFBQUssUUFBTCxDQUFjLEVBQUUscUJBQXFCLEtBQXZCLEVBQThCLGFBQWEsQ0FBM0MsRUFBZDtBQUNBOzs7eUJBRU0sSyxFQUFPLEssRUFBTztBQUNwQixVQUFPLGVBQUMsSUFBRCxlQUFXLEtBQVgsRUFBd0IsS0FBeEIsSUFBZ0MsVUFBVSxLQUFLLFFBQS9DLElBQVA7QUFDQTs7Ozs7O0FBQ0Q7O0FBR0QsSUFBTSxrQkFBa0IsU0FBbEIsZUFBa0IsUUFBK0I7QUFBQSxLQUE1QixxQkFBNEIsU0FBNUIscUJBQTRCOztBQUN0RCxRQUFPLEVBQUUsNENBQUYsRUFBUDtBQUNBLENBRkQ7O0FBSUEsSUFBTSxxQkFBcUIsU0FBckIsa0JBQXFCLENBQUMsUUFBRCxFQUFjO0FBQ3hDLFFBQU87QUFDTixRQUFNLGdCQUFNO0FBQ1gsWUFBUyxrQ0FBVDtBQUNBO0FBSEssRUFBUDtBQUtBLENBTkQ7O2tCQVFlLDBCQUNkLGVBRGMsRUFFZCxrQkFGYyxFQUdiLFlBSGEsQzs7Ozs7Ozs7Ozs7QUN0RWY7O0FBR0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFMQTs7O0FBR0E7OztBQUlBLElBQU0sT0FBTyxTQUFQLElBQU87QUFBQSxLQUFHLFNBQUgsUUFBRyxTQUFIO0FBQUEsS0FBYyxTQUFkLFFBQWMsU0FBZDtBQUFBLFFBQ1o7QUFBQTtBQUFBLElBQU0sYUFBVSxNQUFoQixFQUF1QixTQUFNLE1BQTdCO0FBQ0Msb0NBQU8sTUFBTSxTQUFiLEdBREQ7QUFFQyxtQ0FBTSxPQUFPLFNBQWI7QUFGRCxFQURZO0FBQUEsQ0FBYjs7SUFTTSxJOzs7Ozs7Ozs7Ozt5QkFDRSxLLEVBQU8sSyxFQUFPO0FBQ3BCLFdBQVEsR0FBUixDQUFZLEtBQVo7QUFDQSxVQUFPLGVBQUMsSUFBRCxFQUFXLEtBQVgsQ0FBUDtBQUNBOzs7Ozs7QUFDRDs7a0JBRWMsSTs7Ozs7Ozs7QUN2QlIsSUFBTSw0Q0FBa0IsaUJBQXhCO0FBQ0EsSUFBTSxzREFBdUIsc0JBQTdCOzs7Ozs7Ozs7O0FDRFA7O0FBS08sSUFBTSx3Q0FBZ0IsU0FBaEIsYUFBZ0IsR0FBTTtBQUNsQyxRQUFPLEVBQUUsa0NBQUYsRUFBeUIsT0FBTyxJQUFoQyxFQUFQO0FBQ0EsQ0FGTTs7QUFJQSxJQUFNLGtEQUFxQixTQUFyQixrQkFBcUIsR0FBTTtBQUN2QyxRQUFPLEVBQUUsdUNBQUYsRUFBUDtBQUNBLENBRk07Ozs7Ozs7Ozs7O0FDVFA7O0FBS0EsSUFBTSxnQkFBZ0IsU0FBaEIsYUFBZ0IsQ0FBQyxLQUFELEVBQVc7QUFDaEMscUJBQVksS0FBWixJQUFtQixxQkFBcUIsSUFBeEMsRUFBOEMsV0FBVyxLQUF6RDtBQUNBLENBRkQ7O0FBSUEsSUFBTSxxQkFBcUIsU0FBckIsa0JBQXFCLENBQUMsS0FBRCxFQUFXO0FBQ3JDLHFCQUFZLEtBQVosSUFBbUIsdUJBQXVCLENBQUMsTUFBTSxxQkFBakQ7QUFDQSxDQUZEOztBQUtBLElBQU0sV0FBVyxFQUFqQjtBQUNBLHlDQUE0QixhQUE1QjtBQUNBLDhDQUFpQyxrQkFBakM7O2tCQUVlLFE7Ozs7Ozs7OztBQ2xCZjs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNLEtBQUssMkJBQWlCLE9BQU8sU0FBUCxDQUFpQixTQUFsQyxDQUFYO0FBQ0EsSUFBTSxVQUFVO0FBQ2YsVUFBUyxHQUFHLEtBQUgsRUFETTtBQUVmLFlBQVcsQ0FBQyxHQUFHLE1BQUgsRUFGRztBQUdmLHNCQUFxQixLQUhOO0FBSWYsWUFBVyxJQUpJO0FBS2Ysd0JBQXVCO0FBTFIsQ0FBaEI7O0FBUUEsSUFBTSxRQUFRLHdCQUFZLFVBQUMsS0FBRCxFQUFRLE1BQVI7QUFBQSxRQUN6QixVQUFVLG1CQUFTLE9BQU8sSUFBaEIsQ0FBVixHQUFrQyxtQkFBUyxPQUFPLElBQWhCLEVBQXNCLEtBQXRCLEVBQTZCLE1BQTdCLENBQWxDLEdBQXlFLEtBRGhEO0FBQUEsQ0FBWixFQUVYLE9BRlcsRUFFRixPQUFPLGlCQUFQLElBQTRCLE9BQU8saUJBQVAsRUFGMUIsQ0FBZDs7QUFJQSxPQUFPLEtBQVAsR0FBZSxLQUFmO2tCQUNlLEs7OztBQ25CZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3owQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0K0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1c0NBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2WkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiLy8gTlBNXG5pbXBvcnQgUm91dGVyIGZyb20gJ3ByZWFjdC1yb3V0ZXInO1xuaW1wb3J0IE1hdGNoIGZyb20gJ3ByZWFjdC1yb3V0ZXIvbWF0Y2gnO1xuaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbi8vIEFQSVxuaW1wb3J0IHsgb25Jbml0aWFsTG9hZCwgdG9nZ2xlQWJvdXRPdmVybGF5IH0gZnJvbSAnLi9zdGF0ZS9hY3Rpb25zJztcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0YXRlL3N0b3JlJztcblxuLy8gUGFnZXNcbmltcG9ydCBIb21lIGZyb20gJy4vcGFnZXMvSG9tZS9Ib21lJztcbmltcG9ydCBGb3VyT2hGb3VyIGZyb20gJy4vcGFnZXMvNDA0LzQwNCc7XG5pbXBvcnQgQWJvdXRPdmVybGF5IGZyb20gJy4vcGFnZXMvQWJvdXRPdmVybGF5L0Fib3V0T3ZlcmxheSc7XG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCBGb290ZXIgZnJvbSAnLi9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXInO1xuXG5cbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRlID0ge1xuXHRcdGRhdGE6IG51bGwsXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLm9uSW5pdGlhbERhdGFMb2FkZWQgPSB0aGlzLm9uSW5pdGlhbERhdGFMb2FkZWQuYmluZCh0aGlzKTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpIHtcblx0XHR0aGlzLmZldGNoSW5pdGlhbERhdGEoKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGNvbnNvbGUubG9nKCdtb3VudGVkIEFwcCcpO1xuXHR9XG5cblx0ZmV0Y2hJbml0aWFsRGF0YSgpIHtcblx0XHRmZXRjaChgL2FwaS9pbml0aWFsLWRhdGFgKVxuXHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHQudGhlbih0aGlzLm9uSW5pdGlhbERhdGFMb2FkZWQpO1xuXHR9XG5cblx0b25Jbml0aWFsRGF0YUxvYWRlZChkYXRhKSB7XG5cdFx0c3RvcmUuZGlzcGF0Y2gob25Jbml0aWFsTG9hZCgpKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgZGF0YSB9KTtcblx0fVxuXG5cdHJlbmRlcih7IGlzUGhvbmUsIGlzSW5pdGlhbERhdGFMb2FkZWQsIHNob3dBYm91dE92ZXJsYXkgfSwgeyBkYXRhIH0pIHtcblx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRpZiAoIWlzSW5pdGlhbERhdGFMb2FkZWQpIHJldHVybiA8c3Bhbj5sb2FkaW5nLi4uPC9zcGFuPjtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cImFwcFwiPlxuXHRcdFx0XHQ8SG9tZSBhYm91dFRleHQ9e2RhdGEuYWJvdXR9IGZlZWRJdGVtcz17ZGF0YS5mZWVkLml0ZW1zfS8+XG5cdFx0XHRcdDxSb3V0ZXI+XG5cdFx0XHRcdDwvUm91dGVyPlxuXHRcdFx0XHQ8QWJvdXRPdmVybGF5IHRleHQ9e2RhdGEuYWJvdXR9IC8+XG5cdFx0XHRcdDxGb290ZXIgLz5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInNob3ctYWJvdXRcIiBvbkNsaWNrPXtzaG93QWJvdXRPdmVybGF5fT5BQk9VVDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBpc1Bob25lLCBpc0luaXRpYWxEYXRhTG9hZGVkIH0pID0+IHtcblx0cmV0dXJuIHsgaXNQaG9uZSwgaXNJbml0aWFsRGF0YUxvYWRlZCB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG5cdHJldHVybiB7XG5cdFx0c2hvd0Fib3V0T3ZlcmxheTogKCkgPT4ge1xuXHRcdFx0ZGlzcGF0Y2godG9nZ2xlQWJvdXRPdmVybGF5KCkpO1xuXHRcdH0sXG5cdH07XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG5cdG1hcFN0YXRlVG9Qcm9wcyxcblx0bWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShBcHApO1xuXG5cbiIsImV4cG9ydCBjb25zdCBGRUVEX0NBVEVHT1JJRVMgPSBbXTtcbkZFRURfQ0FURUdPUklFU1tcImZlZWQtLWxpdmVcIl0gPSBcIkxpdmVcIjtcbkZFRURfQ0FURUdPUklFU1tcImZlZWQtLW5ld3NcIl0gPSBcIk5ld3NcIjtcbkZFRURfQ0FURUdPUklFU1tcImZlZWQtLXNob3BcIl0gPSBcIlNob3BcIjtcbkZFRURfQ0FURUdPUklFU1tcImZlZWQtLXZpZGVvXCJdID0gXCJWaWRlb1wiO1xuXG4iLCIvLyBOUE1cbmltcG9ydCAnZmFzdGNsaWNrJztcbmltcG9ydCB7IGgsIHJlbmRlciB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbi8vIEFwcFxuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RhdGUvc3RvcmUnO1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XG5cbmNvbnN0IGtpY2tJdCA9ICgpID0+IHtcblx0cmVuZGVyKChcblx0XHQ8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cblx0XHRcdDxBcHAgLz5cblx0XHQ8L1Byb3ZpZGVyPlxuXHQpLCBkb2N1bWVudC5ib2R5KTtcbn07XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGtpY2tJdCk7XG5cbiIsIi8vIE5QTVxuaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5jb25zdCBBYm91dCA9ICh7IHRleHQgfSkgPT4gKFxuXHQ8c2VjdGlvbiBjbGFzcz1cImFib3V0XCI+XG5cdFx0PHNwYW4gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiB0ZXh0IH19Pjwvc3Bhbj5cblx0PC9zZWN0aW9uPlxuKTtcblxuXG5leHBvcnQgZGVmYXVsdCBBYm91dDtcbiIsIi8vIE5QTVxuaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5pbXBvcnQgTGl2ZSBmcm9tICcuL0l0ZW1zL0xpdmUnO1xuaW1wb3J0IE5ld3MgZnJvbSAnLi9JdGVtcy9OZXdzJztcbmltcG9ydCBTaG9wIGZyb20gJy4vSXRlbXMvU2hvcCc7XG5pbXBvcnQgVmlkZW8gZnJvbSAnLi9JdGVtcy9WaWRlbyc7XG5cbmNvbnN0IEZlZWQgPSAoeyBpdGVtcyB9KSA9PiAoXG5cdDxzZWN0aW9uIGNsYXNzPVwiZmVlZFwiPlxuXHRcdDx1bCBjbGFzcz1cImZlZWRfX2l0ZW1zXCI+XG5cdFx0XHR7aXRlbXMubWFwKGl0ZW0gPT4ge1xuXHRcdFx0XHRzd2l0Y2goaXRlbS50eXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnZmVlZC0tbGl2ZSc6XG5cdFx0XHRcdFx0XHRyZXR1cm4gPExpdmUgdGl0bGU9e2l0ZW0udGl0bGV9IGxpbms9e2l0ZW0ubGlua30gdHlwZT17aXRlbS50eXBlfSAvPjtcblx0XHRcdFx0XHRjYXNlICdmZWVkLS1uZXdzJzpcblx0XHRcdFx0XHRcdHJldHVybiA8TmV3cyB0aXRsZT17aXRlbS50aXRsZX0gdHlwZT17aXRlbS50eXBlfSAvPjtcblx0XHRcdFx0XHRjYXNlICdmZWVkLS1zaG9wJzpcblx0XHRcdFx0XHRcdHJldHVybiA8U2hvcCB0aXRsZT17aXRlbS50aXRsZX0gbGluaz17aXRlbS5saW5rfSB0eXBlPXtpdGVtLnR5cGV9IC8+O1xuXHRcdFx0XHRcdGNhc2UgJ2ZlZWQtLXZpZGVvJzpcblx0XHRcdFx0XHRcdHJldHVybiA8VmlkZW8gdGl0bGU9e2l0ZW0udGl0bGV9IHR5cGU9e2l0ZW0udHlwZX0gLz47XG5cdFx0XHRcdH1cblx0XHRcdH0pfVxuXHRcdDwvdWw+XG5cdDwvc2VjdGlvbj5cbik7XG5cblxuZXhwb3J0IGRlZmF1bHQgRmVlZDtcbiIsIi8vIE5QTVxuaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5pbXBvcnQgeyBGRUVEX0NBVEVHT1JJRVMgfSBmcm9tICcuLi8uLi8uLi9DT05TVEFOVFMnO1xuXG5jb25zdCBMaXZlID0gKHsgdGl0bGUsIGxpbmssIHR5cGUgfSkgPT4gKFxuXHQ8bGkgY2xhc3M9XCJmZWVkX19pdGVtICBmZWVkX19pdGVtLS1saXZlXCI+XG5cdFx0PHNwYW4+e0ZFRURfQ0FURUdPUklFU1t0eXBlXX08L3NwYW4+XG5cdFx0PGgxPnt0aXRsZX08L2gxPlxuXHRcdHsgbGluayA/IDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9e2xpbmt9Pkxpbms8L2E+IDogbnVsbCB9XG5cdDwvbGk+XG4pO1xuXG5cbmV4cG9ydCBkZWZhdWx0IExpdmU7XG4iLCIvLyBOUE1cbmltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuaW1wb3J0IHsgRkVFRF9DQVRFR09SSUVTIH0gZnJvbSAnLi4vLi4vLi4vQ09OU1RBTlRTJztcblxuY29uc3QgTmV3cyA9ICh7IHRpdGxlLCB0eXBlIH0pID0+IChcblx0PGxpIGNsYXNzPVwiZmVlZF9faXRlbSBmZWVkX19pdGVtLS1uZXdzXCI+XG5cdFx0PHNwYW4+e0ZFRURfQ0FURUdPUklFU1t0eXBlXX08L3NwYW4+XG5cdFx0PGgxPnt0aXRsZX08L2gxPlxuXHRcdDxhPlJlYWQgTW9yZTwvYT5cblx0PC9saT5cbik7XG5cblxuZXhwb3J0IGRlZmF1bHQgTmV3cztcbiIsIi8vIE5QTVxuaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5pbXBvcnQgeyBGRUVEX0NBVEVHT1JJRVMgfSBmcm9tICcuLi8uLi8uLi9DT05TVEFOVFMnO1xuXG5jb25zdCBTaG9wID0gKHsgdGl0bGUsIGxpbmssIHR5cGUgfSkgPT4gKFxuXHQ8bGkgY2xhc3M9XCJmZWVkX19pdGVtIGZlZWRfX2l0ZW0tLXNob3BcIj5cblx0XHQ8c3Bhbj57RkVFRF9DQVRFR09SSUVTW3R5cGVdfTwvc3Bhbj5cblx0XHQ8aDE+e3RpdGxlfTwvaDE+XG5cdFx0PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj17bGlua30+TGluazwvYT5cblx0PC9saT5cbik7XG5cblxuZXhwb3J0IGRlZmF1bHQgU2hvcDtcbiIsIi8vIE5QTVxuaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5pbXBvcnQgeyBGRUVEX0NBVEVHT1JJRVMgfSBmcm9tICcuLi8uLi8uLi9DT05TVEFOVFMnO1xuXG5jb25zdCBWaWRlbyA9ICh7IHRpdGxlLCB0eXBlIH0pID0+IChcblx0PGxpIGNsYXNzPVwiZmVlZF9faXRlbSBmZWVkX19pdGVtLS12aWRlb1wiPlxuXHRcdDxzcGFuPntGRUVEX0NBVEVHT1JJRVNbdHlwZV19PC9zcGFuPlxuXHRcdDxoMT57dGl0bGV9PC9oMT5cblx0XHQ8YT5XYXRjaDwvYT5cblx0PC9saT5cbik7XG5cblxuZXhwb3J0IGRlZmF1bHQgVmlkZW87XG4iLCIvLyBOUE1cbmltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuY29uc3QgRm9vdGVyID0gKCkgPT4gKFxuXHQ8Zm9vdGVyIGNsYXNzPVwiY29udGVudC1mb290ZXJcIj5cblx0XHRTaXRlIGJ5IEphY2sgV2lsZFxuXHQ8L2Zvb3Rlcj5cbik7XG5cblxuZXhwb3J0IGRlZmF1bHQgRm9vdGVyO1xuIiwiLy8gTlBNXG5pbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cbmNvbnN0IEZvdXJPaEZvdXIgPSAoKSA9PiAoXG5cdDxkaXYgY2xhc3M9XCI0MDRcIj5cblx0XHQ8aDE+NDA0PC9oMT5cblx0PC9kaXY+XG4pO1xuXG5cbmV4cG9ydCBkZWZhdWx0IEZvdXJPaEZvdXI7XG4iLCIvLyBOUE1cbmltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuXG4vLyBBUElcbmltcG9ydCB7IHRvZ2dsZUFib3V0T3ZlcmxheSB9IGZyb20gJy4uLy4uL3N0YXRlL2FjdGlvbnMnO1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgQWJvdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BYm91dC9BYm91dCc7XG5cbmNvbnN0IFZpZXcgPSAoeyB0ZXh0LCBpc0Fib3V0T3ZlcmxheVZpc2libGUsIG9uU2Nyb2xsLCBzaGltT3BhY2l0eSwgYXBwbHlJbm5lclRyYW5zZm9ybSB9KSA9PiAoXG5cdDxkaXYgY2xhc3M9e2BhYm91dC1vdmVybGF5IGFib3V0LW92ZXJsYXktLSR7aXNBYm91dE92ZXJsYXlWaXNpYmxlID8gJ3Zpc2libGUnIDogJ2hpZGRlbid9YH0gb25TY3JvbGw9e29uU2Nyb2xsfT5cblx0XHQ8ZGl2IGNsYXNzPXtgYWJvdXQtb3ZlcmxheV9fc2hpbSAkeyFhcHBseUlubmVyVHJhbnNmb3JtID8gJ2Fib3V0LW92ZXJsYXlfX3NoaW0tLXZpc2libGUnIDogJyd9YH0gc3R5bGU9e3sgb3BhY2l0eTogc2hpbU9wYWNpdHkgfX0+PC9kaXY+XG5cdFx0PGRpdiBjbGFzcz17YGFib3V0LW92ZXJsYXlfX2lubmVyICR7YXBwbHlJbm5lclRyYW5zZm9ybSA/ICdhYm91dC1vdmVybGF5X19pbm5lci0tdHJhbnNmb3JtJyA6ICcnfWB9PlxuXHRcdFx0PEFib3V0IHRleHQ9e3RleHR9IC8+XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxuKTtcblxuXG5jbGFzcyBBYm91dE92ZXJsYXkgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0ZSA9IHtcblx0XHRhcHBseUlubmVyVHJhbnNmb3JtOiB0cnVlLFxuXHRcdHNoaW1PcGFjaXR5OiAwLFxuXHR9XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5vblNjcm9sbCA9IHRoaXMub25TY3JvbGwuYmluZCh0aGlzKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKHsgaXNBYm91dE92ZXJsYXlWaXNpYmxlIH0pIHtcblx0XHRpZiAoIWlzQWJvdXRPdmVybGF5VmlzaWJsZSAmJiB0aGlzLnByb3BzLmlzQWJvdXRPdmVybGF5VmlzaWJsZSkgdGhpcy5zaG93KCk7XG5cdH1cblxuXHRvblNjcm9sbCh7IHRhcmdldCB9KSB7XG5cdFx0Y29uc3QgbWF4ID0gdGFyZ2V0LnNjcm9sbEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRjb25zdCBzaGltT3BhY2l0eSA9IDEgLSAodGFyZ2V0LnNjcm9sbFRvcCAvIG1heCk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHNoaW1PcGFjaXR5IH0pO1xuXHRcdGlmICh0YXJnZXQuc2Nyb2xsVG9wID09PSBtYXgpIHtcblx0XHRcdHRoaXMucHJvcHMuaGlkZSgpO1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGFwcGx5SW5uZXJUcmFuc2Zvcm06IHRydWUgfSk7XG5cdFx0fVxuXHR9XG5cblx0c2hvdygpIHtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtb3ZlcmxheScpLnNjcm9sbFRvcCA9IDA7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGFwcGx5SW5uZXJUcmFuc2Zvcm06IGZhbHNlLCBzaGltT3BhY2l0eTogMSB9KTtcblx0fVxuXG5cdHJlbmRlcihwcm9wcywgc3RhdGUpIHtcblx0XHRyZXR1cm4gPFZpZXcgeyAuLi5wcm9wcyB9IHsgLi4uc3RhdGUgfSBvblNjcm9sbD17dGhpcy5vblNjcm9sbH0gLz47XG5cdH1cbn07XG5cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgaXNBYm91dE92ZXJsYXlWaXNpYmxlIH0pID0+IHtcblx0cmV0dXJuIHsgaXNBYm91dE92ZXJsYXlWaXNpYmxlIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcblx0cmV0dXJuIHtcblx0XHRoaWRlOiAoKSA9PiB7XG5cdFx0XHRkaXNwYXRjaCh0b2dnbGVBYm91dE92ZXJsYXkoKSk7XG5cdFx0fSxcblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG5cdG1hcFN0YXRlVG9Qcm9wcyxcblx0bWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShBYm91dE92ZXJsYXkpOyIsIi8vIE5QTVxuaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgQWJvdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BYm91dC9BYm91dCc7XG5pbXBvcnQgRmVlZCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0ZlZWQvRmVlZCc7XG5cbmNvbnN0IFZpZXcgPSAoeyBhYm91dFRleHQsIGZlZWRJdGVtcyB9KSA9PiAoXG5cdDxtYWluIGRhdGEtcGFnZT1cImhvbWVcIiBjbGFzcz1cImhvbWVcIj5cblx0XHQ8QWJvdXQgdGV4dD17YWJvdXRUZXh0fSAvPlxuXHRcdDxGZWVkIGl0ZW1zPXtmZWVkSXRlbXN9IC8+XG5cdDwvbWFpbj5cbik7XG5cblxuXG5jbGFzcyBIb21lIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyKHByb3BzLCBzdGF0ZSkge1xuXHRcdGNvbnNvbGUubG9nKHByb3BzKTtcblx0XHRyZXR1cm4gPFZpZXcgeyAuLi5wcm9wcyB9IC8+O1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lO1xuIiwiZXhwb3J0IGNvbnN0IE9OX0lOSVRJQUxfTE9BRCA9ICdPTl9JTklUSUFMX0xPQUQnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9BQk9VVF9PVkVSTEFZID0gJ1RPR0dMRV9BQk9VVF9PVkVSTEFZJzsiLCJpbXBvcnQge1xuXHRPTl9JTklUSUFMX0xPQUQsXG5cdFRPR0dMRV9BQk9VVF9PVkVSTEFZLFxufSBmcm9tICcuL2FjdGlvbi10eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBvbkluaXRpYWxMb2FkID0gKCkgPT4ge1xuXHRyZXR1cm4geyB0eXBlOiBPTl9JTklUSUFMX0xPQUQsIHZhbHVlOiB0cnVlIH07XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlQWJvdXRPdmVybGF5ID0gKCkgPT4ge1xuXHRyZXR1cm4geyB0eXBlOiBUT0dHTEVfQUJPVVRfT1ZFUkxBWSB9O1xufTsiLCJpbXBvcnQge1xuXHRPTl9JTklUSUFMX0xPQUQsXG5cdFRPR0dMRV9BQk9VVF9PVkVSTEFZLFxufSBmcm9tICcuL2FjdGlvbi10eXBlcyc7XG5cbmNvbnN0IG9uSW5pdGlhbExvYWQgPSAoc3RhdGUpID0+IHtcblx0cmV0dXJuIHsgLi4uc3RhdGUsIGlzSW5pdGlhbERhdGFMb2FkZWQ6IHRydWUsIGlzTG9hZGluZzogZmFsc2UgfTtcbn07XG5cbmNvbnN0IHRvZ2dsZUFib3V0T3ZlcmxheSA9IChzdGF0ZSkgPT4ge1xuXHRyZXR1cm4geyAuLi5zdGF0ZSwgaXNBYm91dE92ZXJsYXlWaXNpYmxlOiAhc3RhdGUuaXNBYm91dE92ZXJsYXlWaXNpYmxlIH07XG59O1xuXG5cbmNvbnN0IFJFRFVDRVJTID0ge307XG5SRURVQ0VSU1tPTl9JTklUSUFMX0xPQURdID0gb25Jbml0aWFsTG9hZDtcblJFRFVDRVJTW1RPR0dMRV9BQk9VVF9PVkVSTEFZXSA9IHRvZ2dsZUFib3V0T3ZlcmxheTtcblxuZXhwb3J0IGRlZmF1bHQgUkVEVUNFUlM7XG5cblxuIiwiaW1wb3J0IE1vYmlsZURldGVjdCBmcm9tICdtb2JpbGUtZGV0ZWN0JztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFJFRFVDRVJTIGZyb20gJy4vcmVkdWNlcnMnO1xuaW1wb3J0ICcuL2FjdGlvbnMnO1xuXG5jb25zdCBtZCA9IG5ldyBNb2JpbGVEZXRlY3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xuY29uc3QgSU5JVElBTCA9IHtcblx0aXNQaG9uZTogbWQucGhvbmUoKSxcblx0aXNEZXNrdG9wOiAhbWQubW9iaWxlKCksXG5cdGlzSW5pdGlhbERhdGFMb2FkZWQ6IGZhbHNlLFxuXHRpc0xvYWRpbmc6IHRydWUsXG5cdGlzQWJvdXRPdmVybGF5VmlzaWJsZTogZmFsc2UsXG59O1xuXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKChzdGF0ZSwgYWN0aW9uKSA9PiAoXG5cdGFjdGlvbiAmJiBSRURVQ0VSU1thY3Rpb24udHlwZV0gPyBSRURVQ0VSU1thY3Rpb24udHlwZV0oc3RhdGUsIGFjdGlvbikgOiBzdGF0ZVxuKSwgSU5JVElBTCwgd2luZG93LmRldlRvb2xzRXh0ZW5zaW9uICYmIHdpbmRvdy5kZXZUb29sc0V4dGVuc2lvbigpKTtcblxud2luZG93LnN0b3JlID0gc3RvcmU7XG5leHBvcnQgZGVmYXVsdCBzdG9yZTtcbiIsIjsoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEBwcmVzZXJ2ZSBGYXN0Q2xpY2s6IHBvbHlmaWxsIHRvIHJlbW92ZSBjbGljayBkZWxheXMgb24gYnJvd3NlcnMgd2l0aCB0b3VjaCBVSXMuXG5cdCAqXG5cdCAqIEBjb2RpbmdzdGFuZGFyZCBmdGxhYnMtanN2MlxuXHQgKiBAY29weXJpZ2h0IFRoZSBGaW5hbmNpYWwgVGltZXMgTGltaXRlZCBbQWxsIFJpZ2h0cyBSZXNlcnZlZF1cblx0ICogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKHNlZSBMSUNFTlNFLnR4dClcblx0ICovXG5cblx0Lypqc2xpbnQgYnJvd3Nlcjp0cnVlLCBub2RlOnRydWUqL1xuXHQvKmdsb2JhbCBkZWZpbmUsIEV2ZW50LCBOb2RlKi9cblxuXG5cdC8qKlxuXHQgKiBJbnN0YW50aWF0ZSBmYXN0LWNsaWNraW5nIGxpc3RlbmVycyBvbiB0aGUgc3BlY2lmaWVkIGxheWVyLlxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtFbGVtZW50fSBsYXllciBUaGUgbGF5ZXIgdG8gbGlzdGVuIG9uXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzXG5cdCAqL1xuXHRmdW5jdGlvbiBGYXN0Q2xpY2sobGF5ZXIsIG9wdGlvbnMpIHtcblx0XHR2YXIgb2xkT25DbGljaztcblxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0LyoqXG5cdFx0ICogV2hldGhlciBhIGNsaWNrIGlzIGN1cnJlbnRseSBiZWluZyB0cmFja2VkLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgYm9vbGVhblxuXHRcdCAqL1xuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXG5cblx0XHQvKipcblx0XHQgKiBUaW1lc3RhbXAgZm9yIHdoZW4gY2xpY2sgdHJhY2tpbmcgc3RhcnRlZC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0ID0gMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogVGhlIGVsZW1lbnQgYmVpbmcgdHJhY2tlZCBmb3IgYSBjbGljay5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIEV2ZW50VGFyZ2V0XG5cdFx0ICovXG5cdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblxuXG5cdFx0LyoqXG5cdFx0ICogWC1jb29yZGluYXRlIG9mIHRvdWNoIHN0YXJ0IGV2ZW50LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50b3VjaFN0YXJ0WCA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFktY29vcmRpbmF0ZSBvZiB0b3VjaCBzdGFydCBldmVudC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudG91Y2hTdGFydFkgPSAwO1xuXG5cblx0XHQvKipcblx0XHQgKiBJRCBvZiB0aGUgbGFzdCB0b3VjaCwgcmV0cmlldmVkIGZyb20gVG91Y2guaWRlbnRpZmllci5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMubGFzdFRvdWNoSWRlbnRpZmllciA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRvdWNobW92ZSBib3VuZGFyeSwgYmV5b25kIHdoaWNoIGEgY2xpY2sgd2lsbCBiZSBjYW5jZWxsZWQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRvdWNoQm91bmRhcnkgPSBvcHRpb25zLnRvdWNoQm91bmRhcnkgfHwgMTA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBGYXN0Q2xpY2sgbGF5ZXIuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBFbGVtZW50XG5cdFx0ICovXG5cdFx0dGhpcy5sYXllciA9IGxheWVyO1xuXG5cdFx0LyoqXG5cdFx0ICogVGhlIG1pbmltdW0gdGltZSBiZXR3ZWVuIHRhcCh0b3VjaHN0YXJ0IGFuZCB0b3VjaGVuZCkgZXZlbnRzXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRhcERlbGF5ID0gb3B0aW9ucy50YXBEZWxheSB8fCAyMDA7XG5cblx0XHQvKipcblx0XHQgKiBUaGUgbWF4aW11bSB0aW1lIGZvciBhIHRhcFxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50YXBUaW1lb3V0ID0gb3B0aW9ucy50YXBUaW1lb3V0IHx8IDcwMDtcblxuXHRcdGlmIChGYXN0Q2xpY2subm90TmVlZGVkKGxheWVyKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFNvbWUgb2xkIHZlcnNpb25zIG9mIEFuZHJvaWQgZG9uJ3QgaGF2ZSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuXHRcdGZ1bmN0aW9uIGJpbmQobWV0aG9kLCBjb250ZXh0KSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBtZXRob2QuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTsgfTtcblx0XHR9XG5cblxuXHRcdHZhciBtZXRob2RzID0gWydvbk1vdXNlJywgJ29uQ2xpY2snLCAnb25Ub3VjaFN0YXJ0JywgJ29uVG91Y2hNb3ZlJywgJ29uVG91Y2hFbmQnLCAnb25Ub3VjaENhbmNlbCddO1xuXHRcdHZhciBjb250ZXh0ID0gdGhpcztcblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IG1ldGhvZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRjb250ZXh0W21ldGhvZHNbaV1dID0gYmluZChjb250ZXh0W21ldGhvZHNbaV1dLCBjb250ZXh0KTtcblx0XHR9XG5cblx0XHQvLyBTZXQgdXAgZXZlbnQgaGFuZGxlcnMgYXMgcmVxdWlyZWRcblx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdH1cblxuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrLCB0cnVlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQsIGZhbHNlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIGZhbHNlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMub25Ub3VjaENhbmNlbCwgZmFsc2UpO1xuXG5cdFx0Ly8gSGFjayBpcyByZXF1aXJlZCBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IEV2ZW50I3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiAoZS5nLiBBbmRyb2lkIDIpXG5cdFx0Ly8gd2hpY2ggaXMgaG93IEZhc3RDbGljayBub3JtYWxseSBzdG9wcyBjbGljayBldmVudHMgYnViYmxpbmcgdG8gY2FsbGJhY2tzIHJlZ2lzdGVyZWQgb24gdGhlIEZhc3RDbGlja1xuXHRcdC8vIGxheWVyIHdoZW4gdGhleSBhcmUgY2FuY2VsbGVkLlxuXHRcdGlmICghRXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikge1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKSB7XG5cdFx0XHRcdHZhciBybXYgPSBOb2RlLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2NsaWNrJykge1xuXHRcdFx0XHRcdHJtdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjay5oaWphY2tlZCB8fCBjYWxsYmFjaywgY2FwdHVyZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cm12LmNhbGwobGF5ZXIsIHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKSB7XG5cdFx0XHRcdHZhciBhZHYgPSBOb2RlLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2NsaWNrJykge1xuXHRcdFx0XHRcdGFkdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjay5oaWphY2tlZCB8fCAoY2FsbGJhY2suaGlqYWNrZWQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0aWYgKCFldmVudC5wcm9wYWdhdGlvblN0b3BwZWQpIHtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soZXZlbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pLCBjYXB0dXJlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhZHYuY2FsbChsYXllciwgdHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIElmIGEgaGFuZGxlciBpcyBhbHJlYWR5IGRlY2xhcmVkIGluIHRoZSBlbGVtZW50J3Mgb25jbGljayBhdHRyaWJ1dGUsIGl0IHdpbGwgYmUgZmlyZWQgYmVmb3JlXG5cdFx0Ly8gRmFzdENsaWNrJ3Mgb25DbGljayBoYW5kbGVyLiBGaXggdGhpcyBieSBwdWxsaW5nIG91dCB0aGUgdXNlci1kZWZpbmVkIGhhbmRsZXIgZnVuY3Rpb24gYW5kXG5cdFx0Ly8gYWRkaW5nIGl0IGFzIGxpc3RlbmVyLlxuXHRcdGlmICh0eXBlb2YgbGF5ZXIub25jbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuXG5cdFx0XHQvLyBBbmRyb2lkIGJyb3dzZXIgb24gYXQgbGVhc3QgMy4yIHJlcXVpcmVzIGEgbmV3IHJlZmVyZW5jZSB0byB0aGUgZnVuY3Rpb24gaW4gbGF5ZXIub25jbGlja1xuXHRcdFx0Ly8gLSB0aGUgb2xkIG9uZSB3b24ndCB3b3JrIGlmIHBhc3NlZCB0byBhZGRFdmVudExpc3RlbmVyIGRpcmVjdGx5LlxuXHRcdFx0b2xkT25DbGljayA9IGxheWVyLm9uY2xpY2s7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdG9sZE9uQ2xpY2soZXZlbnQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0bGF5ZXIub25jbGljayA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCogV2luZG93cyBQaG9uZSA4LjEgZmFrZXMgdXNlciBhZ2VudCBzdHJpbmcgdG8gbG9vayBsaWtlIEFuZHJvaWQgYW5kIGlQaG9uZS5cblx0KlxuXHQqIEB0eXBlIGJvb2xlYW5cblx0Ki9cblx0dmFyIGRldmljZUlzV2luZG93c1Bob25lID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiV2luZG93cyBQaG9uZVwiKSA+PSAwO1xuXG5cdC8qKlxuXHQgKiBBbmRyb2lkIHJlcXVpcmVzIGV4Y2VwdGlvbnMuXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0FuZHJvaWQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0FuZHJvaWQnKSA+IDAgJiYgIWRldmljZUlzV2luZG93c1Bob25lO1xuXG5cblx0LyoqXG5cdCAqIGlPUyByZXF1aXJlcyBleGNlcHRpb25zLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNJT1MgPSAvaVAoYWR8aG9uZXxvZCkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIWRldmljZUlzV2luZG93c1Bob25lO1xuXG5cblx0LyoqXG5cdCAqIGlPUyA0IHJlcXVpcmVzIGFuIGV4Y2VwdGlvbiBmb3Igc2VsZWN0IGVsZW1lbnRzLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNJT1M0ID0gZGV2aWNlSXNJT1MgJiYgKC9PUyA0X1xcZChfXFxkKT8vKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG5cblx0LyoqXG5cdCAqIGlPUyA2LjAtNy4qIHJlcXVpcmVzIHRoZSB0YXJnZXQgZWxlbWVudCB0byBiZSBtYW51YWxseSBkZXJpdmVkXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0lPU1dpdGhCYWRUYXJnZXQgPSBkZXZpY2VJc0lPUyAmJiAoL09TIFs2LTddX1xcZC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cblx0LyoqXG5cdCAqIEJsYWNrQmVycnkgcmVxdWlyZXMgZXhjZXB0aW9ucy5cblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzQmxhY2tCZXJyeTEwID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdCQjEwJykgPiAwO1xuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmUgd2hldGhlciBhIGdpdmVuIGVsZW1lbnQgcmVxdWlyZXMgYSBuYXRpdmUgY2xpY2suXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0IFRhcmdldCBET00gZWxlbWVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IG5lZWRzIGEgbmF0aXZlIGNsaWNrXG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm5lZWRzQ2xpY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcblx0XHRzd2l0Y2ggKHRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG5cblx0XHQvLyBEb24ndCBzZW5kIGEgc3ludGhldGljIGNsaWNrIHRvIGRpc2FibGVkIGlucHV0cyAoaXNzdWUgIzYyKVxuXHRcdGNhc2UgJ2J1dHRvbic6XG5cdFx0Y2FzZSAnc2VsZWN0Jzpcblx0XHRjYXNlICd0ZXh0YXJlYSc6XG5cdFx0XHRpZiAodGFyZ2V0LmRpc2FibGVkKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdpbnB1dCc6XG5cblx0XHRcdC8vIEZpbGUgaW5wdXRzIG5lZWQgcmVhbCBjbGlja3Mgb24gaU9TIDYgZHVlIHRvIGEgYnJvd3NlciBidWcgKGlzc3VlICM2OClcblx0XHRcdGlmICgoZGV2aWNlSXNJT1MgJiYgdGFyZ2V0LnR5cGUgPT09ICdmaWxlJykgfHwgdGFyZ2V0LmRpc2FibGVkKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdsYWJlbCc6XG5cdFx0Y2FzZSAnaWZyYW1lJzogLy8gaU9TOCBob21lc2NyZWVuIGFwcHMgY2FuIHByZXZlbnQgZXZlbnRzIGJ1YmJsaW5nIGludG8gZnJhbWVzXG5cdFx0Y2FzZSAndmlkZW8nOlxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICgvXFxibmVlZHNjbGlja1xcYi8pLnRlc3QodGFyZ2V0LmNsYXNzTmFtZSk7XG5cdH07XG5cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lIHdoZXRoZXIgYSBnaXZlbiBlbGVtZW50IHJlcXVpcmVzIGEgY2FsbCB0byBmb2N1cyB0byBzaW11bGF0ZSBjbGljayBpbnRvIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0IFRhcmdldCBET00gZWxlbWVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IHJlcXVpcmVzIGEgY2FsbCB0byBmb2N1cyB0byBzaW11bGF0ZSBuYXRpdmUgY2xpY2suXG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm5lZWRzRm9jdXMgPSBmdW5jdGlvbih0YXJnZXQpIHtcblx0XHRzd2l0Y2ggKHRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0Y2FzZSAndGV4dGFyZWEnOlxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0Y2FzZSAnc2VsZWN0Jzpcblx0XHRcdHJldHVybiAhZGV2aWNlSXNBbmRyb2lkO1xuXHRcdGNhc2UgJ2lucHV0Jzpcblx0XHRcdHN3aXRjaCAodGFyZ2V0LnR5cGUpIHtcblx0XHRcdGNhc2UgJ2J1dHRvbic6XG5cdFx0XHRjYXNlICdjaGVja2JveCc6XG5cdFx0XHRjYXNlICdmaWxlJzpcblx0XHRcdGNhc2UgJ2ltYWdlJzpcblx0XHRcdGNhc2UgJ3JhZGlvJzpcblx0XHRcdGNhc2UgJ3N1Ym1pdCc6XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTm8gcG9pbnQgaW4gYXR0ZW1wdGluZyB0byBmb2N1cyBkaXNhYmxlZCBpbnB1dHNcblx0XHRcdHJldHVybiAhdGFyZ2V0LmRpc2FibGVkICYmICF0YXJnZXQucmVhZE9ubHk7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAoL1xcYm5lZWRzZm9jdXNcXGIvKS50ZXN0KHRhcmdldC5jbGFzc05hbWUpO1xuXHRcdH1cblx0fTtcblxuXG5cdC8qKlxuXHQgKiBTZW5kIGEgY2xpY2sgZXZlbnQgdG8gdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldEVsZW1lbnRcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuc2VuZENsaWNrID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCwgZXZlbnQpIHtcblx0XHR2YXIgY2xpY2tFdmVudCwgdG91Y2g7XG5cblx0XHQvLyBPbiBzb21lIEFuZHJvaWQgZGV2aWNlcyBhY3RpdmVFbGVtZW50IG5lZWRzIHRvIGJlIGJsdXJyZWQgb3RoZXJ3aXNlIHRoZSBzeW50aGV0aWMgY2xpY2sgd2lsbCBoYXZlIG5vIGVmZmVjdCAoIzI0KVxuXHRcdGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRhcmdldEVsZW1lbnQpIHtcblx0XHRcdGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuXHRcdH1cblxuXHRcdHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cblx0XHQvLyBTeW50aGVzaXNlIGEgY2xpY2sgZXZlbnQsIHdpdGggYW4gZXh0cmEgYXR0cmlidXRlIHNvIGl0IGNhbiBiZSB0cmFja2VkXG5cdFx0Y2xpY2tFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuXHRcdGNsaWNrRXZlbnQuaW5pdE1vdXNlRXZlbnQodGhpcy5kZXRlcm1pbmVFdmVudFR5cGUodGFyZ2V0RWxlbWVudCksIHRydWUsIHRydWUsIHdpbmRvdywgMSwgdG91Y2guc2NyZWVuWCwgdG91Y2guc2NyZWVuWSwgdG91Y2guY2xpZW50WCwgdG91Y2guY2xpZW50WSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuXHRcdGNsaWNrRXZlbnQuZm9yd2FyZGVkVG91Y2hFdmVudCA9IHRydWU7XG5cdFx0dGFyZ2V0RWxlbWVudC5kaXNwYXRjaEV2ZW50KGNsaWNrRXZlbnQpO1xuXHR9O1xuXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZGV0ZXJtaW5lRXZlbnRUeXBlID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCkge1xuXG5cdFx0Ly9Jc3N1ZSAjMTU5OiBBbmRyb2lkIENocm9tZSBTZWxlY3QgQm94IGRvZXMgbm90IG9wZW4gd2l0aCBhIHN5bnRoZXRpYyBjbGljayBldmVudFxuXHRcdGlmIChkZXZpY2VJc0FuZHJvaWQgJiYgdGFyZ2V0RWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG5cdFx0XHRyZXR1cm4gJ21vdXNlZG93bic7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICdjbGljayc7XG5cdH07XG5cblxuXHQvKipcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXRFbGVtZW50XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmZvY3VzID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCkge1xuXHRcdHZhciBsZW5ndGg7XG5cblx0XHQvLyBJc3N1ZSAjMTYwOiBvbiBpT1MgNywgc29tZSBpbnB1dCBlbGVtZW50cyAoZS5nLiBkYXRlIGRhdGV0aW1lIG1vbnRoKSB0aHJvdyBhIHZhZ3VlIFR5cGVFcnJvciBvbiBzZXRTZWxlY3Rpb25SYW5nZS4gVGhlc2UgZWxlbWVudHMgZG9uJ3QgaGF2ZSBhbiBpbnRlZ2VyIHZhbHVlIGZvciB0aGUgc2VsZWN0aW9uU3RhcnQgYW5kIHNlbGVjdGlvbkVuZCBwcm9wZXJ0aWVzLCBidXQgdW5mb3J0dW5hdGVseSB0aGF0IGNhbid0IGJlIHVzZWQgZm9yIGRldGVjdGlvbiBiZWNhdXNlIGFjY2Vzc2luZyB0aGUgcHJvcGVydGllcyBhbHNvIHRocm93cyBhIFR5cGVFcnJvci4gSnVzdCBjaGVjayB0aGUgdHlwZSBpbnN0ZWFkLiBGaWxlZCBhcyBBcHBsZSBidWcgIzE1MTIyNzI0LlxuXHRcdGlmIChkZXZpY2VJc0lPUyAmJiB0YXJnZXRFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlICYmIHRhcmdldEVsZW1lbnQudHlwZS5pbmRleE9mKCdkYXRlJykgIT09IDAgJiYgdGFyZ2V0RWxlbWVudC50eXBlICE9PSAndGltZScgJiYgdGFyZ2V0RWxlbWVudC50eXBlICE9PSAnbW9udGgnKSB7XG5cdFx0XHRsZW5ndGggPSB0YXJnZXRFbGVtZW50LnZhbHVlLmxlbmd0aDtcblx0XHRcdHRhcmdldEVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UobGVuZ3RoLCBsZW5ndGgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXRFbGVtZW50LmZvY3VzKCk7XG5cdFx0fVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIENoZWNrIHdoZXRoZXIgdGhlIGdpdmVuIHRhcmdldCBlbGVtZW50IGlzIGEgY2hpbGQgb2YgYSBzY3JvbGxhYmxlIGxheWVyIGFuZCBpZiBzbywgc2V0IGEgZmxhZyBvbiBpdC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXRFbGVtZW50XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLnVwZGF0ZVNjcm9sbFBhcmVudCA9IGZ1bmN0aW9uKHRhcmdldEVsZW1lbnQpIHtcblx0XHR2YXIgc2Nyb2xsUGFyZW50LCBwYXJlbnRFbGVtZW50O1xuXG5cdFx0c2Nyb2xsUGFyZW50ID0gdGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQ7XG5cblx0XHQvLyBBdHRlbXB0IHRvIGRpc2NvdmVyIHdoZXRoZXIgdGhlIHRhcmdldCBlbGVtZW50IGlzIGNvbnRhaW5lZCB3aXRoaW4gYSBzY3JvbGxhYmxlIGxheWVyLiBSZS1jaGVjayBpZiB0aGVcblx0XHQvLyB0YXJnZXQgZWxlbWVudCB3YXMgbW92ZWQgdG8gYW5vdGhlciBwYXJlbnQuXG5cdFx0aWYgKCFzY3JvbGxQYXJlbnQgfHwgIXNjcm9sbFBhcmVudC5jb250YWlucyh0YXJnZXRFbGVtZW50KSkge1xuXHRcdFx0cGFyZW50RWxlbWVudCA9IHRhcmdldEVsZW1lbnQ7XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChwYXJlbnRFbGVtZW50LnNjcm9sbEhlaWdodCA+IHBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XG5cdFx0XHRcdFx0c2Nyb2xsUGFyZW50ID0gcGFyZW50RWxlbWVudDtcblx0XHRcdFx0XHR0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudCA9IHBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0fSB3aGlsZSAocGFyZW50RWxlbWVudCk7XG5cdFx0fVxuXG5cdFx0Ly8gQWx3YXlzIHVwZGF0ZSB0aGUgc2Nyb2xsIHRvcCB0cmFja2VyIGlmIHBvc3NpYmxlLlxuXHRcdGlmIChzY3JvbGxQYXJlbnQpIHtcblx0XHRcdHNjcm9sbFBhcmVudC5mYXN0Q2xpY2tMYXN0U2Nyb2xsVG9wID0gc2Nyb2xsUGFyZW50LnNjcm9sbFRvcDtcblx0XHR9XG5cdH07XG5cblxuXHQvKipcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0RWxlbWVudFxuXHQgKiBAcmV0dXJucyB7RWxlbWVudHxFdmVudFRhcmdldH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZ2V0VGFyZ2V0RWxlbWVudEZyb21FdmVudFRhcmdldCA9IGZ1bmN0aW9uKGV2ZW50VGFyZ2V0KSB7XG5cblx0XHQvLyBPbiBzb21lIG9sZGVyIGJyb3dzZXJzIChub3RhYmx5IFNhZmFyaSBvbiBpT1MgNC4xIC0gc2VlIGlzc3VlICM1NikgdGhlIGV2ZW50IHRhcmdldCBtYXkgYmUgYSB0ZXh0IG5vZGUuXG5cdFx0aWYgKGV2ZW50VGFyZ2V0Lm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0cmV0dXJuIGV2ZW50VGFyZ2V0LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50VGFyZ2V0O1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIHRvdWNoIHN0YXJ0LCByZWNvcmQgdGhlIHBvc2l0aW9uIGFuZCBzY3JvbGwgb2Zmc2V0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgdGFyZ2V0RWxlbWVudCwgdG91Y2gsIHNlbGVjdGlvbjtcblxuXHRcdC8vIElnbm9yZSBtdWx0aXBsZSB0b3VjaGVzLCBvdGhlcndpc2UgcGluY2gtdG8tem9vbSBpcyBwcmV2ZW50ZWQgaWYgYm90aCBmaW5nZXJzIGFyZSBvbiB0aGUgRmFzdENsaWNrIGVsZW1lbnQgKGlzc3VlICMxMTEpLlxuXHRcdGlmIChldmVudC50YXJnZXRUb3VjaGVzLmxlbmd0aCA+IDEpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHRhcmdldEVsZW1lbnQgPSB0aGlzLmdldFRhcmdldEVsZW1lbnRGcm9tRXZlbnRUYXJnZXQoZXZlbnQudGFyZ2V0KTtcblx0XHR0b3VjaCA9IGV2ZW50LnRhcmdldFRvdWNoZXNbMF07XG5cblx0XHRpZiAoZGV2aWNlSXNJT1MpIHtcblxuXHRcdFx0Ly8gT25seSB0cnVzdGVkIGV2ZW50cyB3aWxsIGRlc2VsZWN0IHRleHQgb24gaU9TIChpc3N1ZSAjNDkpXG5cdFx0XHRzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0XHRpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgJiYgIXNlbGVjdGlvbi5pc0NvbGxhcHNlZCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFkZXZpY2VJc0lPUzQpIHtcblxuXHRcdFx0XHQvLyBXZWlyZCB0aGluZ3MgaGFwcGVuIG9uIGlPUyB3aGVuIGFuIGFsZXJ0IG9yIGNvbmZpcm0gZGlhbG9nIGlzIG9wZW5lZCBmcm9tIGEgY2xpY2sgZXZlbnQgY2FsbGJhY2sgKGlzc3VlICMyMyk6XG5cdFx0XHRcdC8vIHdoZW4gdGhlIHVzZXIgbmV4dCB0YXBzIGFueXdoZXJlIGVsc2Ugb24gdGhlIHBhZ2UsIG5ldyB0b3VjaHN0YXJ0IGFuZCB0b3VjaGVuZCBldmVudHMgYXJlIGRpc3BhdGNoZWRcblx0XHRcdFx0Ly8gd2l0aCB0aGUgc2FtZSBpZGVudGlmaWVyIGFzIHRoZSB0b3VjaCBldmVudCB0aGF0IHByZXZpb3VzbHkgdHJpZ2dlcmVkIHRoZSBjbGljayB0aGF0IHRyaWdnZXJlZCB0aGUgYWxlcnQuXG5cdFx0XHRcdC8vIFNhZGx5LCB0aGVyZSBpcyBhbiBpc3N1ZSBvbiBpT1MgNCB0aGF0IGNhdXNlcyBzb21lIG5vcm1hbCB0b3VjaCBldmVudHMgdG8gaGF2ZSB0aGUgc2FtZSBpZGVudGlmaWVyIGFzIGFuXG5cdFx0XHRcdC8vIGltbWVkaWF0ZWx5IHByZWNlZWRpbmcgdG91Y2ggZXZlbnQgKGlzc3VlICM1MiksIHNvIHRoaXMgZml4IGlzIHVuYXZhaWxhYmxlIG9uIHRoYXQgcGxhdGZvcm0uXG5cdFx0XHRcdC8vIElzc3VlIDEyMDogdG91Y2guaWRlbnRpZmllciBpcyAwIHdoZW4gQ2hyb21lIGRldiB0b29scyAnRW11bGF0ZSB0b3VjaCBldmVudHMnIGlzIHNldCB3aXRoIGFuIGlPUyBkZXZpY2UgVUEgc3RyaW5nLFxuXHRcdFx0XHQvLyB3aGljaCBjYXVzZXMgYWxsIHRvdWNoIGV2ZW50cyB0byBiZSBpZ25vcmVkLiBBcyB0aGlzIGJsb2NrIG9ubHkgYXBwbGllcyB0byBpT1MsIGFuZCBpT1MgaWRlbnRpZmllcnMgYXJlIGFsd2F5cyBsb25nLFxuXHRcdFx0XHQvLyByYW5kb20gaW50ZWdlcnMsIGl0J3Mgc2FmZSB0byB0byBjb250aW51ZSBpZiB0aGUgaWRlbnRpZmllciBpcyAwIGhlcmUuXG5cdFx0XHRcdGlmICh0b3VjaC5pZGVudGlmaWVyICYmIHRvdWNoLmlkZW50aWZpZXIgPT09IHRoaXMubGFzdFRvdWNoSWRlbnRpZmllcikge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5sYXN0VG91Y2hJZGVudGlmaWVyID0gdG91Y2guaWRlbnRpZmllcjtcblxuXHRcdFx0XHQvLyBJZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgYSBjaGlsZCBvZiBhIHNjcm9sbGFibGUgbGF5ZXIgKHVzaW5nIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaCkgYW5kOlxuXHRcdFx0XHQvLyAxKSB0aGUgdXNlciBkb2VzIGEgZmxpbmcgc2Nyb2xsIG9uIHRoZSBzY3JvbGxhYmxlIGxheWVyXG5cdFx0XHRcdC8vIDIpIHRoZSB1c2VyIHN0b3BzIHRoZSBmbGluZyBzY3JvbGwgd2l0aCBhbm90aGVyIHRhcFxuXHRcdFx0XHQvLyB0aGVuIHRoZSBldmVudC50YXJnZXQgb2YgdGhlIGxhc3QgJ3RvdWNoZW5kJyBldmVudCB3aWxsIGJlIHRoZSBlbGVtZW50IHRoYXQgd2FzIHVuZGVyIHRoZSB1c2VyJ3MgZmluZ2VyXG5cdFx0XHRcdC8vIHdoZW4gdGhlIGZsaW5nIHNjcm9sbCB3YXMgc3RhcnRlZCwgY2F1c2luZyBGYXN0Q2xpY2sgdG8gc2VuZCBhIGNsaWNrIGV2ZW50IHRvIHRoYXQgbGF5ZXIgLSB1bmxlc3MgYSBjaGVja1xuXHRcdFx0XHQvLyBpcyBtYWRlIHRvIGVuc3VyZSB0aGF0IGEgcGFyZW50IGxheWVyIHdhcyBub3Qgc2Nyb2xsZWQgYmVmb3JlIHNlbmRpbmcgYSBzeW50aGV0aWMgY2xpY2sgKGlzc3VlICM0MikuXG5cdFx0XHRcdHRoaXMudXBkYXRlU2Nyb2xsUGFyZW50KHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IHRydWU7XG5cdFx0dGhpcy50cmFja2luZ0NsaWNrU3RhcnQgPSBldmVudC50aW1lU3RhbXA7XG5cdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudDtcblxuXHRcdHRoaXMudG91Y2hTdGFydFggPSB0b3VjaC5wYWdlWDtcblx0XHR0aGlzLnRvdWNoU3RhcnRZID0gdG91Y2gucGFnZVk7XG5cblx0XHQvLyBQcmV2ZW50IHBoYW50b20gY2xpY2tzIG9uIGZhc3QgZG91YmxlLXRhcCAoaXNzdWUgIzM2KVxuXHRcdGlmICgoZXZlbnQudGltZVN0YW1wIC0gdGhpcy5sYXN0Q2xpY2tUaW1lKSA8IHRoaXMudGFwRGVsYXkpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblxuXHQvKipcblx0ICogQmFzZWQgb24gYSB0b3VjaG1vdmUgZXZlbnQgb2JqZWN0LCBjaGVjayB3aGV0aGVyIHRoZSB0b3VjaCBoYXMgbW92ZWQgcGFzdCBhIGJvdW5kYXJ5IHNpbmNlIGl0IHN0YXJ0ZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS50b3VjaEhhc01vdmVkID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXSwgYm91bmRhcnkgPSB0aGlzLnRvdWNoQm91bmRhcnk7XG5cblx0XHRpZiAoTWF0aC5hYnModG91Y2gucGFnZVggLSB0aGlzLnRvdWNoU3RhcnRYKSA+IGJvdW5kYXJ5IHx8IE1hdGguYWJzKHRvdWNoLnBhZ2VZIC0gdGhpcy50b3VjaFN0YXJ0WSkgPiBib3VuZGFyeSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgbGFzdCBwb3NpdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uVG91Y2hNb3ZlID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRpZiAoIXRoaXMudHJhY2tpbmdDbGljaykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIHRvdWNoIGhhcyBtb3ZlZCwgY2FuY2VsIHRoZSBjbGljayB0cmFja2luZ1xuXHRcdGlmICh0aGlzLnRhcmdldEVsZW1lbnQgIT09IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudEZyb21FdmVudFRhcmdldChldmVudC50YXJnZXQpIHx8IHRoaXMudG91Y2hIYXNNb3ZlZChldmVudCkpIHtcblx0XHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBBdHRlbXB0IHRvIGZpbmQgdGhlIGxhYmVsbGVkIGNvbnRyb2wgZm9yIHRoZSBnaXZlbiBsYWJlbCBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEhUTUxMYWJlbEVsZW1lbnR9IGxhYmVsRWxlbWVudFxuXHQgKiBAcmV0dXJucyB7RWxlbWVudHxudWxsfVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5maW5kQ29udHJvbCA9IGZ1bmN0aW9uKGxhYmVsRWxlbWVudCkge1xuXG5cdFx0Ly8gRmFzdCBwYXRoIGZvciBuZXdlciBicm93c2VycyBzdXBwb3J0aW5nIHRoZSBIVE1MNSBjb250cm9sIGF0dHJpYnV0ZVxuXHRcdGlmIChsYWJlbEVsZW1lbnQuY29udHJvbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gbGFiZWxFbGVtZW50LmNvbnRyb2w7XG5cdFx0fVxuXG5cdFx0Ly8gQWxsIGJyb3dzZXJzIHVuZGVyIHRlc3QgdGhhdCBzdXBwb3J0IHRvdWNoIGV2ZW50cyBhbHNvIHN1cHBvcnQgdGhlIEhUTUw1IGh0bWxGb3IgYXR0cmlidXRlXG5cdFx0aWYgKGxhYmVsRWxlbWVudC5odG1sRm9yKSB7XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGFiZWxFbGVtZW50Lmh0bWxGb3IpO1xuXHRcdH1cblxuXHRcdC8vIElmIG5vIGZvciBhdHRyaWJ1dGUgZXhpc3RzLCBhdHRlbXB0IHRvIHJldHJpZXZlIHRoZSBmaXJzdCBsYWJlbGxhYmxlIGRlc2NlbmRhbnQgZWxlbWVudFxuXHRcdC8vIHRoZSBsaXN0IG9mIHdoaWNoIGlzIGRlZmluZWQgaGVyZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNjYXRlZ29yeS1sYWJlbFxuXHRcdHJldHVybiBsYWJlbEVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLCBpbnB1dDpub3QoW3R5cGU9aGlkZGVuXSksIGtleWdlbiwgbWV0ZXIsIG91dHB1dCwgcHJvZ3Jlc3MsIHNlbGVjdCwgdGV4dGFyZWEnKTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBPbiB0b3VjaCBlbmQsIGRldGVybWluZSB3aGV0aGVyIHRvIHNlbmQgYSBjbGljayBldmVudCBhdCBvbmNlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaEVuZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0dmFyIGZvckVsZW1lbnQsIHRyYWNraW5nQ2xpY2tTdGFydCwgdGFyZ2V0VGFnTmFtZSwgc2Nyb2xsUGFyZW50LCB0b3VjaCwgdGFyZ2V0RWxlbWVudCA9IHRoaXMudGFyZ2V0RWxlbWVudDtcblxuXHRcdGlmICghdGhpcy50cmFja2luZ0NsaWNrKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBQcmV2ZW50IHBoYW50b20gY2xpY2tzIG9uIGZhc3QgZG91YmxlLXRhcCAoaXNzdWUgIzM2KVxuXHRcdGlmICgoZXZlbnQudGltZVN0YW1wIC0gdGhpcy5sYXN0Q2xpY2tUaW1lKSA8IHRoaXMudGFwRGVsYXkpIHtcblx0XHRcdHRoaXMuY2FuY2VsTmV4dENsaWNrID0gdHJ1ZTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICgoZXZlbnQudGltZVN0YW1wIC0gdGhpcy50cmFja2luZ0NsaWNrU3RhcnQpID4gdGhpcy50YXBUaW1lb3V0KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBSZXNldCB0byBwcmV2ZW50IHdyb25nIGNsaWNrIGNhbmNlbCBvbiBpbnB1dCAoaXNzdWUgIzE1NikuXG5cdFx0dGhpcy5jYW5jZWxOZXh0Q2xpY2sgPSBmYWxzZTtcblxuXHRcdHRoaXMubGFzdENsaWNrVGltZSA9IGV2ZW50LnRpbWVTdGFtcDtcblxuXHRcdHRyYWNraW5nQ2xpY2tTdGFydCA9IHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0O1xuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0ID0gMDtcblxuXHRcdC8vIE9uIHNvbWUgaU9TIGRldmljZXMsIHRoZSB0YXJnZXRFbGVtZW50IHN1cHBsaWVkIHdpdGggdGhlIGV2ZW50IGlzIGludmFsaWQgaWYgdGhlIGxheWVyXG5cdFx0Ly8gaXMgcGVyZm9ybWluZyBhIHRyYW5zaXRpb24gb3Igc2Nyb2xsLCBhbmQgaGFzIHRvIGJlIHJlLWRldGVjdGVkIG1hbnVhbGx5LiBOb3RlIHRoYXRcblx0XHQvLyBmb3IgdGhpcyB0byBmdW5jdGlvbiBjb3JyZWN0bHksIGl0IG11c3QgYmUgY2FsbGVkICphZnRlciogdGhlIGV2ZW50IHRhcmdldCBpcyBjaGVja2VkIVxuXHRcdC8vIFNlZSBpc3N1ZSAjNTc7IGFsc28gZmlsZWQgYXMgcmRhcjovLzEzMDQ4NTg5IC5cblx0XHRpZiAoZGV2aWNlSXNJT1NXaXRoQmFkVGFyZ2V0KSB7XG5cdFx0XHR0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG5cdFx0XHQvLyBJbiBjZXJ0YWluIGNhc2VzIGFyZ3VtZW50cyBvZiBlbGVtZW50RnJvbVBvaW50IGNhbiBiZSBuZWdhdGl2ZSwgc28gcHJldmVudCBzZXR0aW5nIHRhcmdldEVsZW1lbnQgdG8gbnVsbFxuXHRcdFx0dGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQodG91Y2gucGFnZVggLSB3aW5kb3cucGFnZVhPZmZzZXQsIHRvdWNoLnBhZ2VZIC0gd2luZG93LnBhZ2VZT2Zmc2V0KSB8fCB0YXJnZXRFbGVtZW50O1xuXHRcdFx0dGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQgPSB0aGlzLnRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50O1xuXHRcdH1cblxuXHRcdHRhcmdldFRhZ05hbWUgPSB0YXJnZXRFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRpZiAodGFyZ2V0VGFnTmFtZSA9PT0gJ2xhYmVsJykge1xuXHRcdFx0Zm9yRWxlbWVudCA9IHRoaXMuZmluZENvbnRyb2wodGFyZ2V0RWxlbWVudCk7XG5cdFx0XHRpZiAoZm9yRWxlbWVudCkge1xuXHRcdFx0XHR0aGlzLmZvY3VzKHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGFyZ2V0RWxlbWVudCA9IGZvckVsZW1lbnQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0aGlzLm5lZWRzRm9jdXModGFyZ2V0RWxlbWVudCkpIHtcblxuXHRcdFx0Ly8gQ2FzZSAxOiBJZiB0aGUgdG91Y2ggc3RhcnRlZCBhIHdoaWxlIGFnbyAoYmVzdCBndWVzcyBpcyAxMDBtcyBiYXNlZCBvbiB0ZXN0cyBmb3IgaXNzdWUgIzM2KSB0aGVuIGZvY3VzIHdpbGwgYmUgdHJpZ2dlcmVkIGFueXdheS4gUmV0dXJuIGVhcmx5IGFuZCB1bnNldCB0aGUgdGFyZ2V0IGVsZW1lbnQgcmVmZXJlbmNlIHNvIHRoYXQgdGhlIHN1YnNlcXVlbnQgY2xpY2sgd2lsbCBiZSBhbGxvd2VkIHRocm91Z2guXG5cdFx0XHQvLyBDYXNlIDI6IFdpdGhvdXQgdGhpcyBleGNlcHRpb24gZm9yIGlucHV0IGVsZW1lbnRzIHRhcHBlZCB3aGVuIHRoZSBkb2N1bWVudCBpcyBjb250YWluZWQgaW4gYW4gaWZyYW1lLCB0aGVuIGFueSBpbnB1dHRlZCB0ZXh0IHdvbid0IGJlIHZpc2libGUgZXZlbiB0aG91Z2ggdGhlIHZhbHVlIGF0dHJpYnV0ZSBpcyB1cGRhdGVkIGFzIHRoZSB1c2VyIHR5cGVzIChpc3N1ZSAjMzcpLlxuXHRcdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0cmFja2luZ0NsaWNrU3RhcnQpID4gMTAwIHx8IChkZXZpY2VJc0lPUyAmJiB3aW5kb3cudG9wICE9PSB3aW5kb3cgJiYgdGFyZ2V0VGFnTmFtZSA9PT0gJ2lucHV0JykpIHtcblx0XHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmZvY3VzKHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0dGhpcy5zZW5kQ2xpY2sodGFyZ2V0RWxlbWVudCwgZXZlbnQpO1xuXG5cdFx0XHQvLyBTZWxlY3QgZWxlbWVudHMgbmVlZCB0aGUgZXZlbnQgdG8gZ28gdGhyb3VnaCBvbiBpT1MgNCwgb3RoZXJ3aXNlIHRoZSBzZWxlY3RvciBtZW51IHdvbid0IG9wZW4uXG5cdFx0XHQvLyBBbHNvIHRoaXMgYnJlYWtzIG9wZW5pbmcgc2VsZWN0cyB3aGVuIFZvaWNlT3ZlciBpcyBhY3RpdmUgb24gaU9TNiwgaU9TNyAoYW5kIHBvc3NpYmx5IG90aGVycylcblx0XHRcdGlmICghZGV2aWNlSXNJT1MgfHwgdGFyZ2V0VGFnTmFtZSAhPT0gJ3NlbGVjdCcpIHtcblx0XHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChkZXZpY2VJc0lPUyAmJiAhZGV2aWNlSXNJT1M0KSB7XG5cblx0XHRcdC8vIERvbid0IHNlbmQgYSBzeW50aGV0aWMgY2xpY2sgZXZlbnQgaWYgdGhlIHRhcmdldCBlbGVtZW50IGlzIGNvbnRhaW5lZCB3aXRoaW4gYSBwYXJlbnQgbGF5ZXIgdGhhdCB3YXMgc2Nyb2xsZWRcblx0XHRcdC8vIGFuZCB0aGlzIHRhcCBpcyBiZWluZyB1c2VkIHRvIHN0b3AgdGhlIHNjcm9sbGluZyAodXN1YWxseSBpbml0aWF0ZWQgYnkgYSBmbGluZyAtIGlzc3VlICM0MikuXG5cdFx0XHRzY3JvbGxQYXJlbnQgPSB0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudDtcblx0XHRcdGlmIChzY3JvbGxQYXJlbnQgJiYgc2Nyb2xsUGFyZW50LmZhc3RDbGlja0xhc3RTY3JvbGxUb3AgIT09IHNjcm9sbFBhcmVudC5zY3JvbGxUb3ApIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUHJldmVudCB0aGUgYWN0dWFsIGNsaWNrIGZyb20gZ29pbmcgdGhvdWdoIC0gdW5sZXNzIHRoZSB0YXJnZXQgbm9kZSBpcyBtYXJrZWQgYXMgcmVxdWlyaW5nXG5cdFx0Ly8gcmVhbCBjbGlja3Mgb3IgaWYgaXQgaXMgaW4gdGhlIHdoaXRlbGlzdCBpbiB3aGljaCBjYXNlIG9ubHkgbm9uLXByb2dyYW1tYXRpYyBjbGlja3MgYXJlIHBlcm1pdHRlZC5cblx0XHRpZiAoIXRoaXMubmVlZHNDbGljayh0YXJnZXRFbGVtZW50KSkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuc2VuZENsaWNrKHRhcmdldEVsZW1lbnQsIGV2ZW50KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gdG91Y2ggY2FuY2VsLCBzdG9wIHRyYWNraW5nIHRoZSBjbGljay5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uVG91Y2hDYW5jZWwgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIERldGVybWluZSBtb3VzZSBldmVudHMgd2hpY2ggc2hvdWxkIGJlIHBlcm1pdHRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uTW91c2UgPSBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0Ly8gSWYgYSB0YXJnZXQgZWxlbWVudCB3YXMgbmV2ZXIgc2V0IChiZWNhdXNlIGEgdG91Y2ggZXZlbnQgd2FzIG5ldmVyIGZpcmVkKSBhbGxvdyB0aGUgZXZlbnRcblx0XHRpZiAoIXRoaXMudGFyZ2V0RWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGV2ZW50LmZvcndhcmRlZFRvdWNoRXZlbnQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFByb2dyYW1tYXRpY2FsbHkgZ2VuZXJhdGVkIGV2ZW50cyB0YXJnZXRpbmcgYSBzcGVjaWZpYyBlbGVtZW50IHNob3VsZCBiZSBwZXJtaXR0ZWRcblx0XHRpZiAoIWV2ZW50LmNhbmNlbGFibGUpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIERlcml2ZSBhbmQgY2hlY2sgdGhlIHRhcmdldCBlbGVtZW50IHRvIHNlZSB3aGV0aGVyIHRoZSBtb3VzZSBldmVudCBuZWVkcyB0byBiZSBwZXJtaXR0ZWQ7XG5cdFx0Ly8gdW5sZXNzIGV4cGxpY2l0bHkgZW5hYmxlZCwgcHJldmVudCBub24tdG91Y2ggY2xpY2sgZXZlbnRzIGZyb20gdHJpZ2dlcmluZyBhY3Rpb25zLFxuXHRcdC8vIHRvIHByZXZlbnQgZ2hvc3QvZG91YmxlY2xpY2tzLlxuXHRcdGlmICghdGhpcy5uZWVkc0NsaWNrKHRoaXMudGFyZ2V0RWxlbWVudCkgfHwgdGhpcy5jYW5jZWxOZXh0Q2xpY2spIHtcblxuXHRcdFx0Ly8gUHJldmVudCBhbnkgdXNlci1hZGRlZCBsaXN0ZW5lcnMgZGVjbGFyZWQgb24gRmFzdENsaWNrIGVsZW1lbnQgZnJvbSBiZWluZyBmaXJlZC5cblx0XHRcdGlmIChldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24pIHtcblx0XHRcdFx0ZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIFBhcnQgb2YgdGhlIGhhY2sgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBFdmVudCNzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gKGUuZy4gQW5kcm9pZCAyKVxuXHRcdFx0XHRldmVudC5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDYW5jZWwgdGhlIGV2ZW50XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgbW91c2UgZXZlbnQgaXMgcGVybWl0dGVkLCByZXR1cm4gdHJ1ZSBmb3IgdGhlIGFjdGlvbiB0byBnbyB0aHJvdWdoLlxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIGFjdHVhbCBjbGlja3MsIGRldGVybWluZSB3aGV0aGVyIHRoaXMgaXMgYSB0b3VjaC1nZW5lcmF0ZWQgY2xpY2ssIGEgY2xpY2sgYWN0aW9uIG9jY3VycmluZ1xuXHQgKiBuYXR1cmFsbHkgYWZ0ZXIgYSBkZWxheSBhZnRlciBhIHRvdWNoICh3aGljaCBuZWVkcyB0byBiZSBjYW5jZWxsZWQgdG8gYXZvaWQgZHVwbGljYXRpb24pLCBvclxuXHQgKiBhbiBhY3R1YWwgY2xpY2sgd2hpY2ggc2hvdWxkIGJlIHBlcm1pdHRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciBwZXJtaXR0ZWQ7XG5cblx0XHQvLyBJdCdzIHBvc3NpYmxlIGZvciBhbm90aGVyIEZhc3RDbGljay1saWtlIGxpYnJhcnkgZGVsaXZlcmVkIHdpdGggdGhpcmQtcGFydHkgY29kZSB0byBmaXJlIGEgY2xpY2sgZXZlbnQgYmVmb3JlIEZhc3RDbGljayBkb2VzIChpc3N1ZSAjNDQpLiBJbiB0aGF0IGNhc2UsIHNldCB0aGUgY2xpY2stdHJhY2tpbmcgZmxhZyBiYWNrIHRvIGZhbHNlIGFuZCByZXR1cm4gZWFybHkuIFRoaXMgd2lsbCBjYXVzZSBvblRvdWNoRW5kIHRvIHJldHVybiBlYXJseS5cblx0XHRpZiAodGhpcy50cmFja2luZ0NsaWNrKSB7XG5cdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBWZXJ5IG9kZCBiZWhhdmlvdXIgb24gaU9TIChpc3N1ZSAjMTgpOiBpZiBhIHN1Ym1pdCBlbGVtZW50IGlzIHByZXNlbnQgaW5zaWRlIGEgZm9ybSBhbmQgdGhlIHVzZXIgaGl0cyBlbnRlciBpbiB0aGUgaU9TIHNpbXVsYXRvciBvciBjbGlja3MgdGhlIEdvIGJ1dHRvbiBvbiB0aGUgcG9wLXVwIE9TIGtleWJvYXJkIHRoZSBhIGtpbmQgb2YgJ2Zha2UnIGNsaWNrIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkIHdpdGggdGhlIHN1Ym1pdC10eXBlIGlucHV0IGVsZW1lbnQgYXMgdGhlIHRhcmdldC5cblx0XHRpZiAoZXZlbnQudGFyZ2V0LnR5cGUgPT09ICdzdWJtaXQnICYmIGV2ZW50LmRldGFpbCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cGVybWl0dGVkID0gdGhpcy5vbk1vdXNlKGV2ZW50KTtcblxuXHRcdC8vIE9ubHkgdW5zZXQgdGFyZ2V0RWxlbWVudCBpZiB0aGUgY2xpY2sgaXMgbm90IHBlcm1pdHRlZC4gVGhpcyB3aWxsIGVuc3VyZSB0aGF0IHRoZSBjaGVjayBmb3IgIXRhcmdldEVsZW1lbnQgaW4gb25Nb3VzZSBmYWlscyBhbmQgdGhlIGJyb3dzZXIncyBjbGljayBkb2Vzbid0IGdvIHRocm91Z2guXG5cdFx0aWYgKCFwZXJtaXR0ZWQpIHtcblx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgY2xpY2tzIGFyZSBwZXJtaXR0ZWQsIHJldHVybiB0cnVlIGZvciB0aGUgYWN0aW9uIHRvIGdvIHRocm91Z2guXG5cdFx0cmV0dXJuIHBlcm1pdHRlZDtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYWxsIEZhc3RDbGljaydzIGV2ZW50IGxpc3RlbmVycy5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgbGF5ZXIgPSB0aGlzLmxheWVyO1xuXG5cdFx0aWYgKGRldmljZUlzQW5kcm9pZCkge1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHR9XG5cblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljaywgdHJ1ZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZSwgZmFsc2UpO1xuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vblRvdWNoRW5kLCBmYWxzZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLm9uVG91Y2hDYW5jZWwsIGZhbHNlKTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBDaGVjayB3aGV0aGVyIEZhc3RDbGljayBpcyBuZWVkZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gbGF5ZXIgVGhlIGxheWVyIHRvIGxpc3RlbiBvblxuXHQgKi9cblx0RmFzdENsaWNrLm5vdE5lZWRlZCA9IGZ1bmN0aW9uKGxheWVyKSB7XG5cdFx0dmFyIG1ldGFWaWV3cG9ydDtcblx0XHR2YXIgY2hyb21lVmVyc2lvbjtcblx0XHR2YXIgYmxhY2tiZXJyeVZlcnNpb247XG5cdFx0dmFyIGZpcmVmb3hWZXJzaW9uO1xuXG5cdFx0Ly8gRGV2aWNlcyB0aGF0IGRvbid0IHN1cHBvcnQgdG91Y2ggZG9uJ3QgbmVlZCBGYXN0Q2xpY2tcblx0XHRpZiAodHlwZW9mIHdpbmRvdy5vbnRvdWNoc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBDaHJvbWUgdmVyc2lvbiAtIHplcm8gZm9yIG90aGVyIGJyb3dzZXJzXG5cdFx0Y2hyb21lVmVyc2lvbiA9ICsoL0Nocm9tZVxcLyhbMC05XSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IFssMF0pWzFdO1xuXG5cdFx0aWYgKGNocm9tZVZlcnNpb24pIHtcblxuXHRcdFx0aWYgKGRldmljZUlzQW5kcm9pZCkge1xuXHRcdFx0XHRtZXRhVmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9dmlld3BvcnRdJyk7XG5cblx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydCkge1xuXHRcdFx0XHRcdC8vIENocm9tZSBvbiBBbmRyb2lkIHdpdGggdXNlci1zY2FsYWJsZT1cIm5vXCIgZG9lc24ndCBuZWVkIEZhc3RDbGljayAoaXNzdWUgIzg5KVxuXHRcdFx0XHRcdGlmIChtZXRhVmlld3BvcnQuY29udGVudC5pbmRleE9mKCd1c2VyLXNjYWxhYmxlPW5vJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gQ2hyb21lIDMyIGFuZCBhYm92ZSB3aXRoIHdpZHRoPWRldmljZS13aWR0aCBvciBsZXNzIGRvbid0IG5lZWQgRmFzdENsaWNrXG5cdFx0XHRcdFx0aWYgKGNocm9tZVZlcnNpb24gPiAzMSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGggPD0gd2luZG93Lm91dGVyV2lkdGgpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBDaHJvbWUgZGVza3RvcCBkb2Vzbid0IG5lZWQgRmFzdENsaWNrIChpc3N1ZSAjMTUpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZGV2aWNlSXNCbGFja0JlcnJ5MTApIHtcblx0XHRcdGJsYWNrYmVycnlWZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvVmVyc2lvblxcLyhbMC05XSopXFwuKFswLTldKikvKTtcblxuXHRcdFx0Ly8gQmxhY2tCZXJyeSAxMC4zKyBkb2VzIG5vdCByZXF1aXJlIEZhc3RjbGljayBsaWJyYXJ5LlxuXHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2Z0bGFicy9mYXN0Y2xpY2svaXNzdWVzLzI1MVxuXHRcdFx0aWYgKGJsYWNrYmVycnlWZXJzaW9uWzFdID49IDEwICYmIGJsYWNrYmVycnlWZXJzaW9uWzJdID49IDMpIHtcblx0XHRcdFx0bWV0YVZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPXZpZXdwb3J0XScpO1xuXG5cdFx0XHRcdGlmIChtZXRhVmlld3BvcnQpIHtcblx0XHRcdFx0XHQvLyB1c2VyLXNjYWxhYmxlPW5vIGVsaW1pbmF0ZXMgY2xpY2sgZGVsYXkuXG5cdFx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydC5jb250ZW50LmluZGV4T2YoJ3VzZXItc2NhbGFibGU9bm8nKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyB3aWR0aD1kZXZpY2Utd2lkdGggKG9yIGxlc3MgdGhhbiBkZXZpY2Utd2lkdGgpIGVsaW1pbmF0ZXMgY2xpY2sgZGVsYXkuXG5cdFx0XHRcdFx0aWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCA8PSB3aW5kb3cub3V0ZXJXaWR0aCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSUUxMCB3aXRoIC1tcy10b3VjaC1hY3Rpb246IG5vbmUgb3IgbWFuaXB1bGF0aW9uLCB3aGljaCBkaXNhYmxlcyBkb3VibGUtdGFwLXRvLXpvb20gKGlzc3VlICM5Nylcblx0XHRpZiAobGF5ZXIuc3R5bGUubXNUb3VjaEFjdGlvbiA9PT0gJ25vbmUnIHx8IGxheWVyLnN0eWxlLnRvdWNoQWN0aW9uID09PSAnbWFuaXB1bGF0aW9uJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gRmlyZWZveCB2ZXJzaW9uIC0gemVybyBmb3Igb3RoZXIgYnJvd3NlcnNcblx0XHRmaXJlZm94VmVyc2lvbiA9ICsoL0ZpcmVmb3hcXC8oWzAtOV0rKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KSB8fCBbLDBdKVsxXTtcblxuXHRcdGlmIChmaXJlZm94VmVyc2lvbiA+PSAyNykge1xuXHRcdFx0Ly8gRmlyZWZveCAyNysgZG9lcyBub3QgaGF2ZSB0YXAgZGVsYXkgaWYgdGhlIGNvbnRlbnQgaXMgbm90IHpvb21hYmxlIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTIyODk2XG5cblx0XHRcdG1ldGFWaWV3cG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT12aWV3cG9ydF0nKTtcblx0XHRcdGlmIChtZXRhVmlld3BvcnQgJiYgKG1ldGFWaWV3cG9ydC5jb250ZW50LmluZGV4T2YoJ3VzZXItc2NhbGFibGU9bm8nKSAhPT0gLTEgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoIDw9IHdpbmRvdy5vdXRlcldpZHRoKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJRTExOiBwcmVmaXhlZCAtbXMtdG91Y2gtYWN0aW9uIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYW5kIGl0J3MgcmVjb21lbmRlZCB0byB1c2Ugbm9uLXByZWZpeGVkIHZlcnNpb25cblx0XHQvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvd2luZG93cy9hcHBzL0hoNzY3MzEzLmFzcHhcblx0XHRpZiAobGF5ZXIuc3R5bGUudG91Y2hBY3Rpb24gPT09ICdub25lJyB8fCBsYXllci5zdHlsZS50b3VjaEFjdGlvbiA9PT0gJ21hbmlwdWxhdGlvbicpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBGYWN0b3J5IG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBGYXN0Q2xpY2sgb2JqZWN0XG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gbGF5ZXIgVGhlIGxheWVyIHRvIGxpc3RlbiBvblxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0c1xuXHQgKi9cblx0RmFzdENsaWNrLmF0dGFjaCA9IGZ1bmN0aW9uKGxheWVyLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIG5ldyBGYXN0Q2xpY2sobGF5ZXIsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblxuXHRcdC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gRmFzdENsaWNrO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBGYXN0Q2xpY2suYXR0YWNoO1xuXHRcdG1vZHVsZS5leHBvcnRzLkZhc3RDbGljayA9IEZhc3RDbGljaztcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuRmFzdENsaWNrID0gRmFzdENsaWNrO1xuXHR9XG59KCkpO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgb3ZlckFyZyA9IHJlcXVpcmUoJy4vX292ZXJBcmcnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UHJvdG90eXBlO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VG9TdHJpbmc7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvdmVyQXJnO1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgZ2V0UHJvdG90eXBlID0gcmVxdWlyZSgnLi9fZ2V0UHJvdG90eXBlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUGxhaW5PYmplY3Q7XG4iLCIvLyBUSElTIEZJTEUgSVMgR0VORVJBVEVEIC0gRE8gTk9UIEVESVQhXG4vKiFtb2JpbGUtZGV0ZWN0IHYxLjQuMSAyMDE3LTEyLTI0Ki9cbi8qZ2xvYmFsIG1vZHVsZTpmYWxzZSwgZGVmaW5lOmZhbHNlKi9cbi8qanNoaW50IGxhdGVkZWY6ZmFsc2UqL1xuLyohQGxpY2Vuc2UgQ29weXJpZ2h0IDIwMTMsIEhlaW5yaWNoIEdvZWJsLCBMaWNlbnNlOiBNSVQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vaGdvZWJsL21vYmlsZS1kZXRlY3QuanMqL1xuKGZ1bmN0aW9uIChkZWZpbmUsIHVuZGVmaW5lZCkge1xuZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgaW1wbCA9IHt9O1xuXG4gICAgaW1wbC5tb2JpbGVEZXRlY3RSdWxlcyA9IHtcbiAgICBcInBob25lc1wiOiB7XG4gICAgICAgIFwiaVBob25lXCI6IFwiXFxcXGJpUGhvbmVcXFxcYnxcXFxcYmlQb2RcXFxcYlwiLFxuICAgICAgICBcIkJsYWNrQmVycnlcIjogXCJCbGFja0JlcnJ5fFxcXFxiQkIxMFxcXFxifHJpbVswLTldK1wiLFxuICAgICAgICBcIkhUQ1wiOiBcIkhUQ3xIVEMuKihTZW5zYXRpb258RXZvfFZpc2lvbnxFeHBsb3Jlcnw2ODAwfDgxMDB8ODkwMHxBNzI3MnxTNTEwZXxDMTEwZXxMZWdlbmR8RGVzaXJlfFQ4MjgyKXxBUFg1MTVDS1R8UXRlazkwOTB8QVBBOTI5MktUfEhEX21pbml8U2Vuc2F0aW9uLipaNzEwZXxQRzg2MTAwfFo3MTVlfERlc2lyZS4qKEE4MTgxfEhEKXxBRFI2MjAwfEFEUjY0MDBMfEFEUjY0MjV8MDAxSFR8SW5zcGlyZSA0R3xBbmRyb2lkLipcXFxcYkVWT1xcXFxifFQtTW9iaWxlIEcxfFo1MjBtfEFuZHJvaWQgWzAtOS5dKzsgUGl4ZWxcIixcbiAgICAgICAgXCJOZXh1c1wiOiBcIk5leHVzIE9uZXxOZXh1cyBTfEdhbGF4eS4qTmV4dXN8QW5kcm9pZC4qTmV4dXMuKk1vYmlsZXxOZXh1cyA0fE5leHVzIDV8TmV4dXMgNlwiLFxuICAgICAgICBcIkRlbGxcIjogXCJEZWxsWztdPyAoU3RyZWFrfEFlcm98VmVudWV8VmVudWUgUHJvfEZsYXNofFNtb2tlfE1pbmkgM2lYKXxYQ0QyOHxYQ0QzNXxcXFxcYjAwMURMXFxcXGJ8XFxcXGIxMDFETFxcXFxifFxcXFxiR1MwMVxcXFxiXCIsXG4gICAgICAgIFwiTW90b3JvbGFcIjogXCJNb3Rvcm9sYXxEUk9JRFh8RFJPSUQgQklPTklDfFxcXFxiRHJvaWRcXFxcYi4qQnVpbGR8QW5kcm9pZC4qWG9vbXxIUkkzOXxNT1QtfEExMjYwfEExNjgwfEE1NTV8QTg1M3xBODU1fEE5NTN8QTk1NXxBOTU2fE1vdG9yb2xhLipFTEVDVFJJRll8TW90b3JvbGEuKmkxfGk4Njd8aTk0MHxNQjIwMHxNQjMwMHxNQjUwMXxNQjUwMnxNQjUwOHxNQjUxMXxNQjUyMHxNQjUyNXxNQjUyNnxNQjYxMXxNQjYxMnxNQjYzMnxNQjgxMHxNQjg1NXxNQjg2MHxNQjg2MXxNQjg2NXxNQjg3MHxNRTUwMXxNRTUwMnxNRTUxMXxNRTUyNXxNRTYwMHxNRTYzMnxNRTcyMnxNRTgxMXxNRTg2MHxNRTg2M3xNRTg2NXxNVDYyMHxNVDcxMHxNVDcxNnxNVDcyMHxNVDgxMHxNVDg3MHxNVDkxN3xNb3Rvcm9sYS4qVElUQU5JVU18V1g0MzV8V1g0NDV8WFQzMDB8WFQzMDF8WFQzMTF8WFQzMTZ8WFQzMTd8WFQzMTl8WFQzMjB8WFQzOTB8WFQ1MDJ8WFQ1MzB8WFQ1MzF8WFQ1MzJ8WFQ1MzV8WFQ2MDN8WFQ2MTB8WFQ2MTF8WFQ2MTV8WFQ2ODF8WFQ3MDF8WFQ3MDJ8WFQ3MTF8WFQ3MjB8WFQ4MDB8WFQ4MDZ8WFQ4NjB8WFQ4NjJ8WFQ4NzV8WFQ4ODJ8WFQ4ODN8WFQ4OTR8WFQ5MDF8WFQ5MDd8WFQ5MDl8WFQ5MTB8WFQ5MTJ8WFQ5Mjh8WFQ5MjZ8WFQ5MTV8WFQ5MTl8WFQ5MjV8WFQxMDIxfFxcXFxiTW90byBFXFxcXGJ8WFQxMDY4fFhUMTA5MlwiLFxuICAgICAgICBcIlNhbXN1bmdcIjogXCJcXFxcYlNhbXN1bmdcXFxcYnxTTS1HOTUwRnxTTS1HOTU1RnxTTS1HOTI1MHxHVC0xOTMwMHxTR0gtSTMzN3xCR1QtUzUyMzB8R1QtQjIxMDB8R1QtQjI3MDB8R1QtQjI3MTB8R1QtQjMyMTB8R1QtQjMzMTB8R1QtQjM0MTB8R1QtQjM3MzB8R1QtQjM3NDB8R1QtQjU1MTB8R1QtQjU1MTJ8R1QtQjU3MjJ8R1QtQjY1MjB8R1QtQjczMDB8R1QtQjczMjB8R1QtQjczMzB8R1QtQjczNTB8R1QtQjc1MTB8R1QtQjc3MjJ8R1QtQjc4MDB8R1QtQzMwMTB8R1QtQzMwMTF8R1QtQzMwNjB8R1QtQzMyMDB8R1QtQzMyMTJ8R1QtQzMyMTJJfEdULUMzMjYyfEdULUMzMjIyfEdULUMzMzAwfEdULUMzMzAwS3xHVC1DMzMwM3xHVC1DMzMwM0t8R1QtQzMzMTB8R1QtQzMzMjJ8R1QtQzMzMzB8R1QtQzMzNTB8R1QtQzM1MDB8R1QtQzM1MTB8R1QtQzM1MzB8R1QtQzM2MzB8R1QtQzM3ODB8R1QtQzUwMTB8R1QtQzUyMTJ8R1QtQzY2MjB8R1QtQzY2MjV8R1QtQzY3MTJ8R1QtRTEwNTB8R1QtRTEwNzB8R1QtRTEwNzV8R1QtRTEwODB8R1QtRTEwODF8R1QtRTEwODV8R1QtRTEwODd8R1QtRTExMDB8R1QtRTExMDd8R1QtRTExMTB8R1QtRTExMjB8R1QtRTExMjV8R1QtRTExMzB8R1QtRTExNjB8R1QtRTExNzB8R1QtRTExNzV8R1QtRTExODB8R1QtRTExODJ8R1QtRTEyMDB8R1QtRTEyMTB8R1QtRTEyMjV8R1QtRTEyMzB8R1QtRTEzOTB8R1QtRTIxMDB8R1QtRTIxMjB8R1QtRTIxMjF8R1QtRTIxNTJ8R1QtRTIyMjB8R1QtRTIyMjJ8R1QtRTIyMzB8R1QtRTIyMzJ8R1QtRTIyNTB8R1QtRTIzNzB8R1QtRTI1NTB8R1QtRTI2NTJ8R1QtRTMyMTB8R1QtRTMyMTN8R1QtSTU1MDB8R1QtSTU1MDN8R1QtSTU3MDB8R1QtSTU4MDB8R1QtSTU4MDF8R1QtSTY0MTB8R1QtSTY0MjB8R1QtSTcxMTB8R1QtSTc0MTB8R1QtSTc1MDB8R1QtSTgwMDB8R1QtSTgxNTB8R1QtSTgxNjB8R1QtSTgxOTB8R1QtSTgzMjB8R1QtSTgzMzB8R1QtSTgzNTB8R1QtSTg1MzB8R1QtSTg3MDB8R1QtSTg3MDN8R1QtSTg5MTB8R1QtSTkwMDB8R1QtSTkwMDF8R1QtSTkwMDN8R1QtSTkwMTB8R1QtSTkwMjB8R1QtSTkwMjN8R1QtSTkwNzB8R1QtSTkwODJ8R1QtSTkxMDB8R1QtSTkxMDN8R1QtSTkyMjB8R1QtSTkyNTB8R1QtSTkzMDB8R1QtSTkzMDV8R1QtSTk1MDB8R1QtSTk1MDV8R1QtTTM1MTB8R1QtTTU2NTB8R1QtTTc1MDB8R1QtTTc2MDB8R1QtTTc2MDN8R1QtTTg4MDB8R1QtTTg5MTB8R1QtTjcwMDB8R1QtUzMxMTB8R1QtUzMzMTB8R1QtUzMzNTB8R1QtUzMzNTN8R1QtUzMzNzB8R1QtUzM2NTB8R1QtUzM2NTN8R1QtUzM3NzB8R1QtUzM4NTB8R1QtUzUyMTB8R1QtUzUyMjB8R1QtUzUyMjl8R1QtUzUyMzB8R1QtUzUyMzN8R1QtUzUyNTB8R1QtUzUyNTN8R1QtUzUyNjB8R1QtUzUyNjN8R1QtUzUyNzB8R1QtUzUzMDB8R1QtUzUzMzB8R1QtUzUzNTB8R1QtUzUzNjB8R1QtUzUzNjN8R1QtUzUzNjl8R1QtUzUzODB8R1QtUzUzODBEfEdULVM1NTYwfEdULVM1NTcwfEdULVM1NjAwfEdULVM1NjAzfEdULVM1NjEwfEdULVM1NjIwfEdULVM1NjYwfEdULVM1NjcwfEdULVM1NjkwfEdULVM1NzUwfEdULVM1NzgwfEdULVM1ODMwfEdULVM1ODM5fEdULVM2MTAyfEdULVM2NTAwfEdULVM3MDcwfEdULVM3MjAwfEdULVM3MjIwfEdULVM3MjMwfEdULVM3MjMzfEdULVM3MjUwfEdULVM3NTAwfEdULVM3NTMwfEdULVM3NTUwfEdULVM3NTYyfEdULVM3NzEwfEdULVM4MDAwfEdULVM4MDAzfEdULVM4NTAwfEdULVM4NTMwfEdULVM4NjAwfFNDSC1BMzEwfFNDSC1BNTMwfFNDSC1BNTcwfFNDSC1BNjEwfFNDSC1BNjMwfFNDSC1BNjUwfFNDSC1BNzkwfFNDSC1BNzk1fFNDSC1BODUwfFNDSC1BODcwfFNDSC1BODkwfFNDSC1BOTMwfFNDSC1BOTUwfFNDSC1BOTcwfFNDSC1BOTkwfFNDSC1JMTAwfFNDSC1JMTEwfFNDSC1JNDAwfFNDSC1JNDA1fFNDSC1JNTAwfFNDSC1JNTEwfFNDSC1JNTE1fFNDSC1JNjAwfFNDSC1JNzMwfFNDSC1JNzYwfFNDSC1JNzcwfFNDSC1JODMwfFNDSC1JOTEwfFNDSC1JOTIwfFNDSC1JOTU5fFNDSC1MQzExfFNDSC1OMTUwfFNDSC1OMzAwfFNDSC1SMTAwfFNDSC1SMzAwfFNDSC1SMzUxfFNDSC1SNDAwfFNDSC1SNDEwfFNDSC1UMzAwfFNDSC1VMzEwfFNDSC1VMzIwfFNDSC1VMzUwfFNDSC1VMzYwfFNDSC1VMzY1fFNDSC1VMzcwfFNDSC1VMzgwfFNDSC1VNDEwfFNDSC1VNDMwfFNDSC1VNDUwfFNDSC1VNDYwfFNDSC1VNDcwfFNDSC1VNDkwfFNDSC1VNTQwfFNDSC1VNTUwfFNDSC1VNjIwfFNDSC1VNjQwfFNDSC1VNjUwfFNDSC1VNjYwfFNDSC1VNzAwfFNDSC1VNzQwfFNDSC1VNzUwfFNDSC1VODEwfFNDSC1VODIwfFNDSC1VOTAwfFNDSC1VOTQwfFNDSC1VOTYwfFNDUy0yNlVDfFNHSC1BMTA3fFNHSC1BMTE3fFNHSC1BMTI3fFNHSC1BMTM3fFNHSC1BMTU3fFNHSC1BMTY3fFNHSC1BMTc3fFNHSC1BMTg3fFNHSC1BMTk3fFNHSC1BMjI3fFNHSC1BMjM3fFNHSC1BMjU3fFNHSC1BNDM3fFNHSC1BNTE3fFNHSC1BNTk3fFNHSC1BNjM3fFNHSC1BNjU3fFNHSC1BNjY3fFNHSC1BNjg3fFNHSC1BNjk3fFNHSC1BNzA3fFNHSC1BNzE3fFNHSC1BNzI3fFNHSC1BNzM3fFNHSC1BNzQ3fFNHSC1BNzY3fFNHSC1BNzc3fFNHSC1BNzk3fFNHSC1BODE3fFNHSC1BODI3fFNHSC1BODM3fFNHSC1BODQ3fFNHSC1BODY3fFNHSC1BODc3fFNHSC1BODg3fFNHSC1BODk3fFNHSC1BOTI3fFNHSC1CMTAwfFNHSC1CMTMwfFNHSC1CMjAwfFNHSC1CMjIwfFNHSC1DMTAwfFNHSC1DMTEwfFNHSC1DMTIwfFNHSC1DMTMwfFNHSC1DMTQwfFNHSC1DMTYwfFNHSC1DMTcwfFNHSC1DMTgwfFNHSC1DMjAwfFNHSC1DMjA3fFNHSC1DMjEwfFNHSC1DMjI1fFNHSC1DMjMwfFNHSC1DNDE3fFNHSC1DNDUwfFNHSC1EMzA3fFNHSC1EMzQ3fFNHSC1EMzU3fFNHSC1ENDA3fFNHSC1ENDE1fFNHSC1ENzgwfFNHSC1EODA3fFNHSC1EOTgwfFNHSC1FMTA1fFNHSC1FMjAwfFNHSC1FMzE1fFNHSC1FMzE2fFNHSC1FMzE3fFNHSC1FMzM1fFNHSC1FNTkwfFNHSC1FNjM1fFNHSC1FNzE1fFNHSC1FODkwfFNHSC1GMzAwfFNHSC1GNDgwfFNHSC1JMjAwfFNHSC1JMzAwfFNHSC1JMzIwfFNHSC1JNTUwfFNHSC1JNTc3fFNHSC1JNjAwfFNHSC1JNjA3fFNHSC1JNjE3fFNHSC1JNjI3fFNHSC1JNjM3fFNHSC1JNjc3fFNHSC1JNzAwfFNHSC1JNzE3fFNHSC1JNzI3fFNHSC1pNzQ3TXxTR0gtSTc3N3xTR0gtSTc4MHxTR0gtSTgyN3xTR0gtSTg0N3xTR0gtSTg1N3xTR0gtSTg5NnxTR0gtSTg5N3xTR0gtSTkwMHxTR0gtSTkwN3xTR0gtSTkxN3xTR0gtSTkyN3xTR0gtSTkzN3xTR0gtSTk5N3xTR0gtSjE1MHxTR0gtSjIwMHxTR0gtTDE3MHxTR0gtTDcwMHxTR0gtTTExMHxTR0gtTTE1MHxTR0gtTTIwMHxTR0gtTjEwNXxTR0gtTjUwMHxTR0gtTjYwMHxTR0gtTjYyMHxTR0gtTjYyNXxTR0gtTjcwMHxTR0gtTjcxMHxTR0gtUDEwN3xTR0gtUDIwN3xTR0gtUDMwMHxTR0gtUDMxMHxTR0gtUDUyMHxTR0gtUDczNXxTR0gtUDc3N3xTR0gtUTEwNXxTR0gtUjIxMHxTR0gtUjIyMHxTR0gtUjIyNXxTR0gtUzEwNXxTR0gtUzMwN3xTR0gtVDEwOXxTR0gtVDExOXxTR0gtVDEzOXxTR0gtVDIwOXxTR0gtVDIxOXxTR0gtVDIyOXxTR0gtVDIzOXxTR0gtVDI0OXxTR0gtVDI1OXxTR0gtVDMwOXxTR0gtVDMxOXxTR0gtVDMyOXxTR0gtVDMzOXxTR0gtVDM0OXxTR0gtVDM1OXxTR0gtVDM2OXxTR0gtVDM3OXxTR0gtVDQwOXxTR0gtVDQyOXxTR0gtVDQzOXxTR0gtVDQ1OXxTR0gtVDQ2OXxTR0gtVDQ3OXxTR0gtVDQ5OXxTR0gtVDUwOXxTR0gtVDUxOXxTR0gtVDUzOXxTR0gtVDU1OXxTR0gtVDU4OXxTR0gtVDYwOXxTR0gtVDYxOXxTR0gtVDYyOXxTR0gtVDYzOXxTR0gtVDY1OXxTR0gtVDY2OXxTR0gtVDY3OXxTR0gtVDcwOXxTR0gtVDcxOXxTR0gtVDcyOXxTR0gtVDczOXxTR0gtVDc0NnxTR0gtVDc0OXxTR0gtVDc1OXxTR0gtVDc2OXxTR0gtVDgwOXxTR0gtVDgxOXxTR0gtVDgzOXxTR0gtVDkxOXxTR0gtVDkyOXxTR0gtVDkzOXxTR0gtVDk1OXxTR0gtVDk4OXxTR0gtVTEwMHxTR0gtVTIwMHxTR0gtVTgwMHxTR0gtVjIwNXxTR0gtVjIwNnxTR0gtWDEwMHxTR0gtWDEwNXxTR0gtWDEyMHxTR0gtWDE0MHxTR0gtWDQyNnxTR0gtWDQyN3xTR0gtWDQ3NXxTR0gtWDQ5NXxTR0gtWDQ5N3xTR0gtWDUwN3xTR0gtWDYwMHxTR0gtWDYxMHxTR0gtWDYyMHxTR0gtWDYzMHxTR0gtWDcwMHxTR0gtWDgyMHxTR0gtWDg5MHxTR0gtWjEzMHxTR0gtWjE1MHxTR0gtWjE3MHxTR0gtWlgxMHxTR0gtWlgyMHxTSFctTTExMHxTUEgtQTEyMHxTUEgtQTQwMHxTUEgtQTQyMHxTUEgtQTQ2MHxTUEgtQTUwMHxTUEgtQTU2MHxTUEgtQTYwMHxTUEgtQTYyMHxTUEgtQTY2MHxTUEgtQTcwMHxTUEgtQTc0MHxTUEgtQTc2MHxTUEgtQTc5MHxTUEgtQTgwMHxTUEgtQTgyMHxTUEgtQTg0MHxTUEgtQTg4MHxTUEgtQTkwMHxTUEgtQTk0MHxTUEgtQTk2MHxTUEgtRDYwMHxTUEgtRDcwMHxTUEgtRDcxMHxTUEgtRDcyMHxTUEgtSTMwMHxTUEgtSTMyNXxTUEgtSTMzMHxTUEgtSTM1MHxTUEgtSTUwMHxTUEgtSTYwMHxTUEgtSTcwMHxTUEgtTDcwMHxTUEgtTTEwMHxTUEgtTTIyMHxTUEgtTTI0MHxTUEgtTTMwMHxTUEgtTTMwNXxTUEgtTTMyMHxTUEgtTTMzMHxTUEgtTTM1MHxTUEgtTTM2MHxTUEgtTTM3MHxTUEgtTTM4MHxTUEgtTTUxMHxTUEgtTTU0MHxTUEgtTTU1MHxTUEgtTTU2MHxTUEgtTTU3MHxTUEgtTTU4MHxTUEgtTTYxMHxTUEgtTTYyMHxTUEgtTTYzMHxTUEgtTTgwMHxTUEgtTTgxMHxTUEgtTTg1MHxTUEgtTTkwMHxTUEgtTTkxMHxTUEgtTTkyMHxTUEgtTTkzMHxTUEgtTjEwMHxTUEgtTjIwMHxTUEgtTjI0MHxTUEgtTjMwMHxTUEgtTjQwMHxTUEgtWjQwMHxTV0MtRTEwMHxTQ0gtaTkwOXxHVC1ONzEwMHxHVC1ONzEwNXxTQ0gtSTUzNXxTTS1OOTAwQXxTR0gtSTMxN3xTR0gtVDk5OUx8R1QtUzUzNjBCfEdULUk4MjYyfEdULVM2ODAyfEdULVM2MzEyfEdULVM2MzEwfEdULVM1MzEyfEdULVM1MzEwfEdULUk5MTA1fEdULUk4NTEwfEdULVM2NzkwTnxTTS1HNzEwNXxTTS1OOTAwNXxHVC1TNTMwMXxHVC1JOTI5NXxHVC1JOTE5NXxTTS1DMTAxfEdULVM3MzkyfEdULVM3NTYwfEdULUI3NjEwfEdULUk1NTEwfEdULVM3NTgyfEdULVM3NTMwRXxHVC1JODc1MHxTTS1HOTAwNlZ8U00tRzkwMDhWfFNNLUc5MDA5RHxTTS1HOTAwQXxTTS1HOTAwRHxTTS1HOTAwRnxTTS1HOTAwSHxTTS1HOTAwSXxTTS1HOTAwSnxTTS1HOTAwS3xTTS1HOTAwTHxTTS1HOTAwTXxTTS1HOTAwUHxTTS1HOTAwUjR8U00tRzkwMFN8U00tRzkwMFR8U00tRzkwMFZ8U00tRzkwMFc4fFNIVi1FMTYwS3xTQ0gtUDcwOXxTQ0gtUDcyOXxTTS1UMjU1OHxHVC1JOTIwNXxTTS1HOTM1MHxTTS1KMTIwRnxTTS1HOTIwRnxTTS1HOTIwVnxTTS1HOTMwRnxTTS1OOTEwQ3xTTS1BMzEwRnxHVC1JOTE5MHxTTS1KNTAwRk58U00tRzkwM0ZcIixcbiAgICAgICAgXCJMR1wiOiBcIlxcXFxiTEdcXFxcYjt8TEdbLSBdPyhDODAwfEM5MDB8RTQwMHxFNjEwfEU5MDB8RS05MDB8RjE2MHxGMTgwS3xGMTgwTHxGMTgwU3w3MzB8ODU1fEwxNjB8TFM3NDB8TFM4NDB8TFM5NzB8TFU2MjAwfE1TNjkwfE1TNjk1fE1TNzcwfE1TODQwfE1TODcwfE1TOTEwfFA1MDB8UDcwMHxQNzA1fFZNNjk2fEFTNjgwfEFTNjk1fEFYODQwfEM3Mjl8RTk3MHxHUzUwNXwyNzJ8QzM5NXxFNzM5Qkt8RTk2MHxMNTVDfEw3NUN8TFM2OTZ8TFM4NjB8UDc2OUJLfFAzNTB8UDUwMHxQNTA5fFA4NzB8VU4yNzJ8VVM3MzB8VlM4NDB8VlM5NTB8TE4yNzJ8TE41MTB8TFM2NzB8TFM4NTV8TFc2OTB8TU4yNzB8TU41MTB8UDUwOXxQNzY5fFA5MzB8VU4yMDB8VU4yNzB8VU41MTB8VU42MTB8VVM2NzB8VVM3NDB8VVM3NjB8VVgyNjV8VVg4NDB8Vk4yNzF8Vk41MzB8VlM2NjB8VlM3MDB8VlM3NDB8VlM3NTB8VlM5MTB8VlM5MjB8VlM5MzB8Vlg5MjAwfFZYMTEwMDB8QVg4NDBBfExXNzcwfFA1MDZ8UDkyNXxQOTk5fEU2MTJ8RDk1NXxEODAyfE1TMzIzKVwiLFxuICAgICAgICBcIlNvbnlcIjogXCJTb255U1R8U29ueUxUfFNvbnlFcmljc3NvbnxTb255RXJpY3Nzb25MVDE1aXZ8TFQxOGl8RTEwaXxMVDI4aHxMVDI2d3xTb255RXJpY3Nzb25NVDI3aXxDNTMwM3xDNjkwMnxDNjkwM3xDNjkwNnxDNjk0M3xEMjUzM1wiLFxuICAgICAgICBcIkFzdXNcIjogXCJBc3VzLipHYWxheHl8UGFkRm9uZS4qTW9iaWxlXCIsXG4gICAgICAgIFwiTm9raWFMdW1pYVwiOiBcIkx1bWlhIFswLTldezMsNH1cIixcbiAgICAgICAgXCJNaWNyb21heFwiOiBcIk1pY3JvbWF4LipcXFxcYihBMjEwfEE5MnxBODh8QTcyfEExMTF8QTExMFF8QTExNXxBMTE2fEExMTB8QTkwU3xBMjZ8QTUxfEEzNXxBNTR8QTI1fEEyN3xBODl8QTY4fEE2NXxBNTd8QTkwKVxcXFxiXCIsXG4gICAgICAgIFwiUGFsbVwiOiBcIlBhbG1Tb3VyY2V8UGFsbVwiLFxuICAgICAgICBcIlZlcnR1XCI6IFwiVmVydHV8VmVydHUuKkx0ZHxWZXJ0dS4qQXNjZW50fFZlcnR1LipBeXh0YXxWZXJ0dS4qQ29uc3RlbGxhdGlvbihGfFF1ZXN0KT98VmVydHUuKk1vbmlrYXxWZXJ0dS4qU2lnbmF0dXJlXCIsXG4gICAgICAgIFwiUGFudGVjaFwiOiBcIlBBTlRFQ0h8SU0tQTg1MFN8SU0tQTg0MFN8SU0tQTgzMEx8SU0tQTgzMEt8SU0tQTgzMFN8SU0tQTgyMEx8SU0tQTgxMEt8SU0tQTgxMFN8SU0tQTgwMFN8SU0tVDEwMEt8SU0tQTcyNUx8SU0tQTc4MEx8SU0tQTc3NUN8SU0tQTc3MEt8SU0tQTc2MFN8SU0tQTc1MEt8SU0tQTc0MFN8SU0tQTczMFN8SU0tQTcyMEx8SU0tQTcxMEt8SU0tQTY5MEx8SU0tQTY5MFN8SU0tQTY1MFN8SU0tQTYzMEt8SU0tQTYwMFN8VkVHQSBQVEwyMXxQVDAwM3xQODAxMHxBRFI5MTBMfFA2MDMwfFA2MDIwfFA5MDcwfFA0MTAwfFA5MDYwfFA1MDAwfENETTg5OTJ8VFhUODA0NXxBRFI4OTk1fElTMTFQVHxQMjAzMHxQNjAxMHxQODAwMHxQVDAwMnxJUzA2fENETTg5OTl8UDkwNTB8UFQwMDF8VFhUODA0MHxQMjAyMHxQOTAyMHxQMjAwMHxQNzA0MHxQNzAwMHxDNzkwXCIsXG4gICAgICAgIFwiRmx5XCI6IFwiSVEyMzB8SVE0NDR8SVE0NTB8SVE0NDB8SVE0NDJ8SVE0NDF8SVEyNDV8SVEyNTZ8SVEyMzZ8SVEyNTV8SVEyMzV8SVEyNDV8SVEyNzV8SVEyNDB8SVEyODV8SVEyODB8SVEyNzB8SVEyNjB8SVEyNTBcIixcbiAgICAgICAgXCJXaWtvXCI6IFwiS0lURSA0R3xISUdIV0FZfEdFVEFXQVl8U1RBSVJXQVl8REFSS1NJREV8REFSS0ZVTEx8REFSS05JR0hUfERBUktNT09OfFNMSURFfFdBWCA0R3xSQUlOQk9XfEJMT09NfFNVTlNFVHxHT0EoPyFubmEpfExFTk5ZfEJBUlJZfElHR1l8T1paWXxDSU5LIEZJVkV8Q0lOSyBQRUFYfENJTksgUEVBWCAyfENJTksgU0xJTXxDSU5LIFNMSU0gMnxDSU5LICt8Q0lOSyBLSU5HfENJTksgUEVBWHxDSU5LIFNMSU18U1VCTElNXCIsXG4gICAgICAgIFwiaU1vYmlsZVwiOiBcImktbW9iaWxlIChJUXxpLVNUWUxFfGlkZWF8WkFBfEhpdHopXCIsXG4gICAgICAgIFwiU2ltVmFsbGV5XCI6IFwiXFxcXGIoU1AtODB8WFQtOTMwfFNYLTM0MHxYVC05MzB8U1gtMzEwfFNQLTM2MHxTUDYwfFNQVC04MDB8U1AtMTIwfFNQVC04MDB8U1AtMTQwfFNQWC01fFNQWC04fFNQLTEwMHxTUFgtOHxTUFgtMTIpXFxcXGJcIixcbiAgICAgICAgXCJXb2xmZ2FuZ1wiOiBcIkFULUIyNER8QVQtQVM1MEhEfEFULUFTNDBXfEFULUFTNTVIRHxBVC1BUzQ1cTJ8QVQtQjI2RHxBVC1BUzUwUVwiLFxuICAgICAgICBcIkFsY2F0ZWxcIjogXCJBbGNhdGVsXCIsXG4gICAgICAgIFwiTmludGVuZG9cIjogXCJOaW50ZW5kbyAzRFNcIixcbiAgICAgICAgXCJBbW9pXCI6IFwiQW1vaVwiLFxuICAgICAgICBcIklOUVwiOiBcIklOUVwiLFxuICAgICAgICBcIkdlbmVyaWNQaG9uZVwiOiBcIlRhcGF0YWxrfFBEQTt8U0FHRU18XFxcXGJtbXBcXFxcYnxwb2NrZXR8XFxcXGJwc3BcXFxcYnxzeW1iaWFufFNtYXJ0cGhvbmV8c21hcnRmb258dHJlb3x1cC5icm93c2VyfHVwLmxpbmt8dm9kYWZvbmV8XFxcXGJ3YXBcXFxcYnxub2tpYXxTZXJpZXM0MHxTZXJpZXM2MHxTNjB8U29ueUVyaWNzc29ufE45MDB8TUFVSS4qV0FQLipCcm93c2VyXCJcbiAgICB9LFxuICAgIFwidGFibGV0c1wiOiB7XG4gICAgICAgIFwiaVBhZFwiOiBcImlQYWR8aVBhZC4qTW9iaWxlXCIsXG4gICAgICAgIFwiTmV4dXNUYWJsZXRcIjogXCJBbmRyb2lkLipOZXh1c1tcXFxcc10rKDd8OXwxMClcIixcbiAgICAgICAgXCJTYW1zdW5nVGFibGV0XCI6IFwiU0FNU1VORy4qVGFibGV0fEdhbGF4eS4qVGFifFNDLTAxQ3xHVC1QMTAwMHxHVC1QMTAwM3xHVC1QMTAxMHxHVC1QMzEwNXxHVC1QNjIxMHxHVC1QNjgwMHxHVC1QNjgxMHxHVC1QNzEwMHxHVC1QNzMwMHxHVC1QNzMxMHxHVC1QNzUwMHxHVC1QNzUxMHxTQ0gtSTgwMHxTQ0gtSTgxNXxTQ0gtSTkwNXxTR0gtSTk1N3xTR0gtSTk4N3xTR0gtVDg0OXxTR0gtVDg1OXxTR0gtVDg2OXxTUEgtUDEwMHxHVC1QMzEwMHxHVC1QMzEwOHxHVC1QMzExMHxHVC1QNTEwMHxHVC1QNTExMHxHVC1QNjIwMHxHVC1QNzMyMHxHVC1QNzUxMXxHVC1OODAwMHxHVC1QODUxMHxTR0gtSTQ5N3xTUEgtUDUwMHxTR0gtVDc3OXxTQ0gtSTcwNXxTQ0gtSTkxNXxHVC1OODAxM3xHVC1QMzExM3xHVC1QNTExM3xHVC1QODExMHxHVC1OODAxMHxHVC1OODAwNXxHVC1OODAyMHxHVC1QMTAxM3xHVC1QNjIwMXxHVC1QNzUwMXxHVC1ONTEwMHxHVC1ONTEwNXxHVC1ONTExMHxTSFYtRTE0MEt8U0hWLUUxNDBMfFNIVi1FMTQwU3xTSFYtRTE1MFN8U0hWLUUyMzBLfFNIVi1FMjMwTHxTSFYtRTIzMFN8U0hXLU0xODBLfFNIVy1NMTgwTHxTSFctTTE4MFN8U0hXLU0xODBXfFNIVy1NMzAwV3xTSFctTTMwNVd8U0hXLU0zODBLfFNIVy1NMzgwU3xTSFctTTM4MFd8U0hXLU00MzBXfFNIVy1NNDgwS3xTSFctTTQ4MFN8U0hXLU00ODBXfFNIVy1NNDg1V3xTSFctTTQ4Nld8U0hXLU01MDBXfEdULUk5MjI4fFNDSC1QNzM5fFNDSC1JOTI1fEdULUk5MjAwfEdULVA1MjAwfEdULVA1MjEwfEdULVA1MjEwWHxTTS1UMzExfFNNLVQzMTB8U00tVDMxMFh8U00tVDIxMHxTTS1UMjEwUnxTTS1UMjExfFNNLVA2MDB8U00tUDYwMXxTTS1QNjA1fFNNLVA5MDB8U00tUDkwMXxTTS1UMjE3fFNNLVQyMTdBfFNNLVQyMTdTfFNNLVA2MDAwfFNNLVQzMTAwfFNHSC1JNDY3fFhFNTAwfFNNLVQxMTB8R1QtUDUyMjB8R1QtSTkyMDBYfEdULU41MTEwWHxHVC1ONTEyMHxTTS1QOTA1fFNNLVQxMTF8U00tVDIxMDV8U00tVDMxNXxTTS1UMzIwfFNNLVQzMjBYfFNNLVQzMjF8U00tVDUyMHxTTS1UNTI1fFNNLVQ1MzBOVXxTTS1UMjMwTlV8U00tVDMzME5VfFNNLVQ5MDB8WEU1MDBUMUN8U00tUDYwNVZ8U00tUDkwNVZ8U00tVDMzN1Z8U00tVDUzN1Z8U00tVDcwN1Z8U00tVDgwN1Z8U00tUDYwMFh8U00tUDkwMFh8U00tVDIxMFh8U00tVDIzMHxTTS1UMjMwWHxTTS1UMzI1fEdULVA3NTAzfFNNLVQ1MzF8U00tVDMzMHxTTS1UNTMwfFNNLVQ3MDV8U00tVDcwNUN8U00tVDUzNXxTTS1UMzMxfFNNLVQ4MDB8U00tVDcwMHxTTS1UNTM3fFNNLVQ4MDd8U00tUDkwN0F8U00tVDMzN0F8U00tVDUzN0F8U00tVDcwN0F8U00tVDgwN0F8U00tVDIzN3xTTS1UODA3UHxTTS1QNjA3VHxTTS1UMjE3VHxTTS1UMzM3VHxTTS1UODA3VHxTTS1UMTE2TlF8U00tVDExNkJVfFNNLVA1NTB8U00tVDM1MHxTTS1UNTUwfFNNLVQ5MDAwfFNNLVA5MDAwfFNNLVQ3MDVZfFNNLVQ4MDV8R1QtUDMxMTN8U00tVDcxMHxTTS1UODEwfFNNLVQ4MTV8U00tVDM2MHxTTS1UNTMzfFNNLVQxMTN8U00tVDMzNXxTTS1UNzE1fFNNLVQ1NjB8U00tVDY3MHxTTS1UNjc3fFNNLVQzNzd8U00tVDU2N3xTTS1UMzU3VHxTTS1UNTU1fFNNLVQ1NjF8U00tVDcxM3xTTS1UNzE5fFNNLVQ4MTN8U00tVDgxOXxTTS1UNTgwfFNNLVQzNTVZP3xTTS1UMjgwfFNNLVQ4MTdBfFNNLVQ4MjB8U00tVzcwMHxTTS1QNTgwfFNNLVQ1ODd8U00tUDM1MHxTTS1QNTU1TXxTTS1QMzU1TXxTTS1UMTEzTlV8U00tVDgxNVlcIixcbiAgICAgICAgXCJLaW5kbGVcIjogXCJLaW5kbGV8U2lsay4qQWNjZWxlcmF0ZWR8QW5kcm9pZC4qXFxcXGIoS0ZPVHxLRlRUfEtGSldJfEtGSldBfEtGT1RFfEtGU09XSXxLRlRIV0l8S0ZUSFdBfEtGQVBXSXxLRkFQV0F8V0ZKV0FFfEtGU0FXQXxLRlNBV0l8S0ZBU1dJfEtGQVJXSXxLRkZPV0l8S0ZHSVdJfEtGTUVXSSlcXFxcYnxBbmRyb2lkLipTaWxrXFwvWzAtOS5dKyBsaWtlIENocm9tZVxcL1swLTkuXSsgKD8hTW9iaWxlKVwiLFxuICAgICAgICBcIlN1cmZhY2VUYWJsZXRcIjogXCJXaW5kb3dzIE5UIFswLTkuXSs7IEFSTTsuKihUYWJsZXR8QVJNQkpTKVwiLFxuICAgICAgICBcIkhQVGFibGV0XCI6IFwiSFAgU2xhdGUgKDd8OHwxMCl8SFAgRWxpdGVQYWQgOTAwfGhwLXRhYmxldHxFbGl0ZUJvb2suKlRvdWNofEhQIDh8U2xhdGUgMjF8SFAgU2xhdGVCb29rIDEwXCIsXG4gICAgICAgIFwiQXN1c1RhYmxldFwiOiBcIl4uKlBhZEZvbmUoKD8hTW9iaWxlKS4pKiR8VHJhbnNmb3JtZXJ8VEYxMDF8VEYxMDFHfFRGMzAwVHxURjMwMFRHfFRGMzAwVEx8VEY3MDBUfFRGNzAwS0x8VEY3MDFUfFRGODEwQ3xNRTE3MXxNRTMwMVR8TUUzMDJDfE1FMzcxTUd8TUUzNzBUfE1FMzcyTUd8TUUxNzJWfE1FMTczWHxNRTQwMEN8U2xpZGVyIFNMMTAxfFxcXFxiSzAwRlxcXFxifFxcXFxiSzAwQ1xcXFxifFxcXFxiSzAwRVxcXFxifFxcXFxiSzAwTFxcXFxifFRYMjAxTEF8TUUxNzZDfE1FMTAyQXxcXFxcYk04MFRBXFxcXGJ8TUUzNzJDTHxNRTU2MENHfE1FMzcyQ0d8TUUzMDJLTHwgSzAxMCB8IEswMTEgfCBLMDE3IHwgSzAxRSB8TUU1NzJDfE1FMTAzS3xNRTE3MEN8TUUxNzFDfFxcXFxiTUU3MENcXFxcYnxNRTU4MUN8TUU1ODFDTHxNRTg1MTBDfE1FMTgxQ3xQMDFZfFBPMU1BfFAwMVp8XFxcXGJQMDI3XFxcXGJcIixcbiAgICAgICAgXCJCbGFja0JlcnJ5VGFibGV0XCI6IFwiUGxheUJvb2t8UklNIFRhYmxldFwiLFxuICAgICAgICBcIkhUQ3RhYmxldFwiOiBcIkhUQ19GbHllcl9QNTEyfEhUQyBGbHllcnxIVEMgSmV0c3RyZWFtfEhUQy1QNzE1YXxIVEMgRVZPIFZpZXcgNEd8UEc0MTIwMHxQRzA5NDEwXCIsXG4gICAgICAgIFwiTW90b3JvbGFUYWJsZXRcIjogXCJ4b29tfHNob2xlc3R8TVo2MTV8TVo2MDV8TVo1MDV8TVo2MDF8TVo2MDJ8TVo2MDN8TVo2MDR8TVo2MDZ8TVo2MDd8TVo2MDh8TVo2MDl8TVo2MTV8TVo2MTZ8TVo2MTdcIixcbiAgICAgICAgXCJOb29rVGFibGV0XCI6IFwiQW5kcm9pZC4qTm9va3xOb29rQ29sb3J8bm9vayBicm93c2VyfEJOUlYyMDB8Qk5SVjIwMEF8Qk5UVjI1MHxCTlRWMjUwQXxCTlRWNDAwfEJOVFY2MDB8TG9naWNQRCBab29tMlwiLFxuICAgICAgICBcIkFjZXJUYWJsZXRcIjogXCJBbmRyb2lkLio7IFxcXFxiKEExMDB8QTEwMXxBMTEwfEEyMDB8QTIxMHxBMjExfEE1MDB8QTUwMXxBNTEwfEE1MTF8QTcwMHxBNzAxfFc1MDB8VzUwMFB8VzUwMXxXNTAxUHxXNTEwfFc1MTF8VzcwMHxHMTAwfEcxMDBXfEIxLUE3MXxCMS03MTB8QjEtNzExfEExLTgxMHxBMS04MTF8QTEtODMwKVxcXFxifFczLTgxMHxcXFxcYkEzLUExMFxcXFxifFxcXFxiQTMtQTExXFxcXGJ8XFxcXGJBMy1BMjBcXFxcYnxcXFxcYkEzLUEzMFwiLFxuICAgICAgICBcIlRvc2hpYmFUYWJsZXRcIjogXCJBbmRyb2lkLiooQVQxMDB8QVQxMDV8QVQyMDB8QVQyMDV8QVQyNzB8QVQyNzV8QVQzMDB8QVQzMDV8QVQxUzV8QVQ1MDB8QVQ1NzB8QVQ3MDB8QVQ4MzApfFRPU0hJQkEuKkZPTElPXCIsXG4gICAgICAgIFwiTEdUYWJsZXRcIjogXCJcXFxcYkwtMDZDfExHLVY5MDl8TEctVjkwMHxMRy1WNzAwfExHLVY1MTB8TEctVjUwMHxMRy1WNDEwfExHLVY0MDB8TEctVks4MTBcXFxcYlwiLFxuICAgICAgICBcIkZ1aml0c3VUYWJsZXRcIjogXCJBbmRyb2lkLipcXFxcYihGLTAxRHxGLTAyRnxGLTA1RXxGLTEwRHxNNTMyfFE1NzIpXFxcXGJcIixcbiAgICAgICAgXCJQcmVzdGlnaW9UYWJsZXRcIjogXCJQTVAzMTcwQnxQTVAzMjcwQnxQTVAzNDcwQnxQTVA3MTcwQnxQTVAzMzcwQnxQTVAzNTcwQ3xQTVA1ODcwQ3xQTVAzNjcwQnxQTVA1NTcwQ3xQTVA1NzcwRHxQTVAzOTcwQnxQTVAzODcwQ3xQTVA1NTgwQ3xQTVA1ODgwRHxQTVA1NzgwRHxQTVA1NTg4Q3xQTVA3MjgwQ3xQTVA3MjgwQzNHfFBNUDcyODB8UE1QNzg4MER8UE1QNTU5N0R8UE1QNTU5N3xQTVA3MTAwRHxQRVIzNDY0fFBFUjMyNzR8UEVSMzU3NHxQRVIzODg0fFBFUjUyNzR8UEVSNTQ3NHxQTVA1MDk3Q1BST3xQTVA1MDk3fFBNUDczODBEfFBNUDUyOTdDfFBNUDUyOTdDX1FVQUR8UE1QODEyRXxQTVA4MTJFM0d8UE1QODEyRnxQTVA4MTBFfFBNUDg4MFREfFBNVDMwMTd8UE1UMzAzN3xQTVQzMDQ3fFBNVDMwNTd8UE1UNzAwOHxQTVQ1ODg3fFBNVDUwMDF8UE1UNTAwMlwiLFxuICAgICAgICBcIkxlbm92b1RhYmxldFwiOiBcIkxlbm92byBUQUJ8SWRlYShUYWJ8UGFkKSggQTF8QTEwfCBLMXwpfFRoaW5rUGFkKFsgXSspP1RhYmxldHxZVDMtODUwTXxZVDMtWDkwTHxZVDMtWDkwRnxZVDMtWDkwWHxMZW5vdm8uKihTMjEwOXxTMjExMHxTNTAwMHxTNjAwMHxLMzAxMXxBMzAwMHxBMzUwMHxBMTAwMHxBMjEwN3xBMjEwOXxBMTEwN3xBNTUwMHxBNzYwMHxCNjAwMHxCODAwMHxCODA4MCkoLXwpKEZMfEZ8SFZ8SHwpfFRCLVgxMDNGfFRCLVgzMDRGfFRCLTg3MDNGXCIsXG4gICAgICAgIFwiRGVsbFRhYmxldFwiOiBcIlZlbnVlIDExfFZlbnVlIDh8VmVudWUgN3xEZWxsIFN0cmVhayAxMHxEZWxsIFN0cmVhayA3XCIsXG4gICAgICAgIFwiWWFydmlrVGFibGV0XCI6IFwiQW5kcm9pZC4qXFxcXGIoVEFCMjEwfFRBQjIxMXxUQUIyMjR8VEFCMjUwfFRBQjI2MHxUQUIyNjR8VEFCMzEwfFRBQjM2MHxUQUIzNjR8VEFCNDEwfFRBQjQxMXxUQUI0MjB8VEFCNDI0fFRBQjQ1MHxUQUI0NjB8VEFCNDYxfFRBQjQ2NHxUQUI0NjV8VEFCNDY3fFRBQjQ2OHxUQUIwNy0xMDB8VEFCMDctMTAxfFRBQjA3LTE1MHxUQUIwNy0xNTF8VEFCMDctMTUyfFRBQjA3LTIwMHxUQUIwNy0yMDEtM0d8VEFCMDctMjEwfFRBQjA3LTIxMXxUQUIwNy0yMTJ8VEFCMDctMjE0fFRBQjA3LTIyMHxUQUIwNy00MDB8VEFCMDctNDg1fFRBQjA4LTE1MHxUQUIwOC0yMDB8VEFCMDgtMjAxLTNHfFRBQjA4LTIwMS0zMHxUQUIwOS0xMDB8VEFCMDktMjExfFRBQjA5LTQxMHxUQUIxMC0xNTB8VEFCMTAtMjAxfFRBQjEwLTIxMXxUQUIxMC00MDB8VEFCMTAtNDEwfFRBQjEzLTIwMXxUQUIyNzRFVUt8VEFCMjc1RVVLfFRBQjM3NEVVS3xUQUI0NjJFVUt8VEFCNDc0RVVLfFRBQjktMjAwKVxcXFxiXCIsXG4gICAgICAgIFwiTWVkaW9uVGFibGV0XCI6IFwiQW5kcm9pZC4qXFxcXGJPWU9cXFxcYnxMSUZFLiooUDkyMTJ8UDk1MTR8UDk1MTZ8Uzk1MTIpfExJRkVUQUJcIixcbiAgICAgICAgXCJBcm5vdmFUYWJsZXRcIjogXCI5N0c0fEFOMTBHMnxBTjdiRzN8QU43ZkczfEFOOEczfEFOOGNHM3xBTjdHM3xBTjlHM3xBTjdkRzN8QU43ZEczU1R8QU43ZEczQ2hpbGRQYWR8QU4xMGJHM3xBTjEwYkczRFR8QU45RzJcIixcbiAgICAgICAgXCJJbnRlbnNvVGFibGV0XCI6IFwiSU5NODAwMktQfElOTTEwMTBGUHxJTk04MDVORHxJbnRlbnNvIFRhYnxUQUIxMDA0XCIsXG4gICAgICAgIFwiSVJVVGFibGV0XCI6IFwiTTcwMnByb1wiLFxuICAgICAgICBcIk1lZ2Fmb25UYWJsZXRcIjogXCJNZWdhRm9uIFY5fFxcXFxiWlRFIFY5XFxcXGJ8QW5kcm9pZC4qXFxcXGJNVDdBXFxcXGJcIixcbiAgICAgICAgXCJFYm9kYVRhYmxldFwiOiBcIkUtQm9kYSAoU3VwcmVtZXxJbXByZXNzcGVlZHxJenp5Y29tbXxFc3NlbnRpYWwpXCIsXG4gICAgICAgIFwiQWxsVmlld1RhYmxldFwiOiBcIkFsbHZpZXcuKihWaXZhfEFsbGRyb3xDaXR5fFNwZWVkfEFsbCBUVnxGcmVuenl8UXVhc2FyfFNoaW5lfFRYMXxBWDF8QVgyKVwiLFxuICAgICAgICBcIkFyY2hvc1RhYmxldFwiOiBcIlxcXFxiKDEwMUc5fDgwRzl8QTEwMUlUKVxcXFxifFFpbGl2ZSA5N1J8QXJjaG9zNXxcXFxcYkFSQ0hPUyAoNzB8Nzl8ODB8OTB8OTd8MTAxfEZBTUlMWVBBRHwpKGJ8Y3wpKEcxMHwgQ29iYWx0fCBUSVRBTklVTShIRHwpfCBYZW5vbnwgTmVvbnxYU0t8IDJ8IFhTIDJ8IFBMQVRJTlVNfCBDQVJCT058R0FNRVBBRClcXFxcYlwiLFxuICAgICAgICBcIkFpbm9sVGFibGV0XCI6IFwiTk9WTzd8Tk9WTzh8Tk9WTzEwfE5vdm83QXVyb3JhfE5vdm83QmFzaWN8Tk9WTzdQQUxBRElOfG5vdm85LVNwYXJrXCIsXG4gICAgICAgIFwiTm9raWFMdW1pYVRhYmxldFwiOiBcIkx1bWlhIDI1MjBcIixcbiAgICAgICAgXCJTb255VGFibGV0XCI6IFwiU29ueS4qVGFibGV0fFhwZXJpYSBUYWJsZXR8U29ueSBUYWJsZXQgU3xTTy0wM0V8U0dQVDEyfFNHUFQxM3xTR1BUMTE0fFNHUFQxMjF8U0dQVDEyMnxTR1BUMTIzfFNHUFQxMTF8U0dQVDExMnxTR1BUMTEzfFNHUFQxMzF8U0dQVDEzMnxTR1BUMTMzfFNHUFQyMTF8U0dQVDIxMnxTR1BUMjEzfFNHUDMxMXxTR1AzMTJ8U0dQMzIxfEVCUkQxMTAxfEVCUkQxMTAyfEVCUkQxMjAxfFNHUDM1MXxTR1AzNDF8U0dQNTExfFNHUDUxMnxTR1A1MjF8U0dQNTQxfFNHUDU1MXxTR1A2MjF8U0dQNjEyfFNPVDMxXCIsXG4gICAgICAgIFwiUGhpbGlwc1RhYmxldFwiOiBcIlxcXFxiKFBJMjAxMHxQSTMwMDB8UEkzMTAwfFBJMzEwNXxQSTMxMTB8UEkzMjA1fFBJMzIxMHxQSTM5MDB8UEk0MDEwfFBJNzAwMHxQSTcxMDApXFxcXGJcIixcbiAgICAgICAgXCJDdWJlVGFibGV0XCI6IFwiQW5kcm9pZC4qKEs4R1R8VTlHVHxVMTBHVHxVMTZHVHxVMTdHVHxVMThHVHxVMTlHVHxVMjBHVHxVMjNHVHxVMzBHVCl8Q1VCRSBVOEdUXCIsXG4gICAgICAgIFwiQ29ieVRhYmxldFwiOiBcIk1JRDEwNDJ8TUlEMTA0NXxNSUQxMTI1fE1JRDExMjZ8TUlENzAxMnxNSUQ3MDE0fE1JRDcwMTV8TUlENzAzNHxNSUQ3MDM1fE1JRDcwMzZ8TUlENzA0MnxNSUQ3MDQ4fE1JRDcxMjd8TUlEODA0MnxNSUQ4MDQ4fE1JRDgxMjd8TUlEOTA0MnxNSUQ5NzQwfE1JRDk3NDJ8TUlENzAyMnxNSUQ3MDEwXCIsXG4gICAgICAgIFwiTUlEVGFibGV0XCI6IFwiTTk3MDF8TTkwMDB8TTkxMDB8TTgwNnxNMTA1MnxNODA2fFQ3MDN8TUlENzAxfE1JRDcxM3xNSUQ3MTB8TUlENzI3fE1JRDc2MHxNSUQ4MzB8TUlENzI4fE1JRDkzM3xNSUQxMjV8TUlEODEwfE1JRDczMnxNSUQxMjB8TUlEOTMwfE1JRDgwMHxNSUQ3MzF8TUlEOTAwfE1JRDEwMHxNSUQ4MjB8TUlENzM1fE1JRDk4MHxNSUQxMzB8TUlEODMzfE1JRDczN3xNSUQ5NjB8TUlEMTM1fE1JRDg2MHxNSUQ3MzZ8TUlEMTQwfE1JRDkzMHxNSUQ4MzV8TUlENzMzfE1JRDRYMTBcIixcbiAgICAgICAgXCJNU0lUYWJsZXRcIjogXCJNU0kgXFxcXGIoUHJpbW8gNzNLfFByaW1vIDczTHxQcmltbyA4MUx8UHJpbW8gNzd8UHJpbW8gOTN8UHJpbW8gNzV8UHJpbW8gNzZ8UHJpbW8gNzN8UHJpbW8gODF8UHJpbW8gOTF8UHJpbW8gOTB8RW5qb3kgNzF8RW5qb3kgN3xFbmpveSAxMClcXFxcYlwiLFxuICAgICAgICBcIlNNaVRUYWJsZXRcIjogXCJBbmRyb2lkLiooXFxcXGJNSURcXFxcYnxNSUQtNTYwfE1UVi1UMTIwMHxNVFYtUE5ENTMxfE1UVi1QMTEwMXxNVFYtUE5ENTMwKVwiLFxuICAgICAgICBcIlJvY2tDaGlwVGFibGV0XCI6IFwiQW5kcm9pZC4qKFJLMjgxOHxSSzI4MDhBfFJLMjkxOHxSSzMwNjYpfFJLMjczOHxSSzI4MDhBXCIsXG4gICAgICAgIFwiRmx5VGFibGV0XCI6IFwiSVEzMTB8Rmx5IFZpc2lvblwiLFxuICAgICAgICBcImJxVGFibGV0XCI6IFwiQW5kcm9pZC4qKGJxKT8uKihFbGNhbm98Q3VyaWV8RWRpc29ufE1heHdlbGx8S2VwbGVyfFBhc2NhbHxUZXNsYXxIeXBhdGlhfFBsYXRvbnxOZXd0b258TGl2aW5nc3RvbmV8Q2VydmFudGVzfEF2YW50fEFxdWFyaXMgKFtFfE1dMTB8TTgpKXxNYXh3ZWxsLipMaXRlfE1heHdlbGwuKlBsdXNcIixcbiAgICAgICAgXCJIdWF3ZWlUYWJsZXRcIjogXCJNZWRpYVBhZHxNZWRpYVBhZCA3IFlvdXRofElERU9TIFM3fFM3LTIwMWN8UzctMjAydXxTNy0xMDF8UzctMTAzfFM3LTEwNHxTNy0xMDV8UzctMTA2fFM3LTIwMXxTNy1TbGltfE0yLUEwMUxcIixcbiAgICAgICAgXCJOZWNUYWJsZXRcIjogXCJcXFxcYk4tMDZEfFxcXFxiTi0wOERcIixcbiAgICAgICAgXCJQYW50ZWNoVGFibGV0XCI6IFwiUGFudGVjaC4qUDQxMDBcIixcbiAgICAgICAgXCJCcm9uY2hvVGFibGV0XCI6IFwiQnJvbmNoby4qKE43MDF8TjcwOHxOODAyfGE3MTApXCIsXG4gICAgICAgIFwiVmVyc3VzVGFibGV0XCI6IFwiVE9VQ0hQQUQuKls3ODkxMF18XFxcXGJUT1VDSFRBQlxcXFxiXCIsXG4gICAgICAgIFwiWnluY1RhYmxldFwiOiBcInoxMDAwfFo5OSAyR3x6OTl8ejkzMHx6OTk5fHo5OTB8ejkwOXxaOTE5fHo5MDBcIixcbiAgICAgICAgXCJQb3NpdGl2b1RhYmxldFwiOiBcIlRCMDdTVEF8VEIxMFNUQXxUQjA3RlRBfFRCMTBGVEFcIixcbiAgICAgICAgXCJOYWJpVGFibGV0XCI6IFwiQW5kcm9pZC4qXFxcXGJOYWJpXCIsXG4gICAgICAgIFwiS29ib1RhYmxldFwiOiBcIktvYm8gVG91Y2h8XFxcXGJLMDgwXFxcXGJ8XFxcXGJWb3hcXFxcYiBCdWlsZHxcXFxcYkFyY1xcXFxiIEJ1aWxkXCIsXG4gICAgICAgIFwiRGFuZXdUYWJsZXRcIjogXCJEU2xpZGUuKlxcXFxiKDcwMHw3MDFSfDcwMnw3MDNSfDcwNHw4MDJ8OTcwfDk3MXw5NzJ8OTczfDk3NHwxMDEwfDEwMTIpXFxcXGJcIixcbiAgICAgICAgXCJUZXhldFRhYmxldFwiOiBcIk5hdmlQYWR8VEItNzcyQXxUTS03MDQ1fFRNLTcwNTV8VE0tOTc1MHxUTS03MDE2fFRNLTcwMjR8VE0tNzAyNnxUTS03MDQxfFRNLTcwNDN8VE0tNzA0N3xUTS04MDQxfFRNLTk3NDF8VE0tOTc0N3xUTS05NzQ4fFRNLTk3NTF8VE0tNzAyMnxUTS03MDIxfFRNLTcwMjB8VE0tNzAxMXxUTS03MDEwfFRNLTcwMjN8VE0tNzAyNXxUTS03MDM3V3xUTS03MDM4V3xUTS03MDI3V3xUTS05NzIwfFRNLTk3MjV8VE0tOTczN1d8VE0tMTAyMHxUTS05NzM4V3xUTS05NzQwfFRNLTk3NDNXfFRCLTgwN0F8VEItNzcxQXxUQi03MjdBfFRCLTcyNUF8VEItNzE5QXxUQi04MjNBfFRCLTgwNUF8VEItNzIzQXxUQi03MTVBfFRCLTcwN0F8VEItNzA1QXxUQi03MDlBfFRCLTcxMUF8VEItODkwSER8VEItODgwSER8VEItNzkwSER8VEItNzgwSER8VEItNzcwSER8VEItNzIxSER8VEItNzEwSER8VEItNDM0SER8VEItODYwSER8VEItODQwSER8VEItNzYwSER8VEItNzUwSER8VEItNzQwSER8VEItNzMwSER8VEItNzIySER8VEItNzIwSER8VEItNzAwSER8VEItNTAwSER8VEItNDcwSER8VEItNDMxSER8VEItNDMwSER8VEItNTA2fFRCLTUwNHxUQi00NDZ8VEItNDM2fFRCLTQxNnxUQi0xNDZTRXxUQi0xMjZTRVwiLFxuICAgICAgICBcIlBsYXlzdGF0aW9uVGFibGV0XCI6IFwiUGxheXN0YXRpb24uKihQb3J0YWJsZXxWaXRhKVwiLFxuICAgICAgICBcIlRyZWtzdG9yVGFibGV0XCI6IFwiU1QxMDQxNi0xfFZUMTA0MTYtMXxTVDcwNDA4LTF8U1Q3MDJ4eC0xfFNUNzAyeHgtMnxTVDgwMjA4fFNUOTcyMTZ8U1Q3MDEwNC0yfFZUMTA0MTYtMnxTVDEwMjE2LTJBfFN1cmZUYWJcIixcbiAgICAgICAgXCJQeWxlQXVkaW9UYWJsZXRcIjogXCJcXFxcYihQVEJMMTBDRVV8UFRCTDEwQ3xQVEJMNzJCQ3xQVEJMNzJCQ0VVfFBUQkw3Q0VVfFBUQkw3Q3xQVEJMOTJCQ3xQVEJMOTJCQ0VVfFBUQkw5Q0VVfFBUQkw5Q1VLfFBUQkw5QylcXFxcYlwiLFxuICAgICAgICBcIkFkdmFuVGFibGV0XCI6IFwiQW5kcm9pZC4qIFxcXFxiKEUzQXxUM1h8VDVDfFQ1QnxUM0V8VDNDfFQzQnxUMUp8VDFGfFQyQXxUMUh8VDFpfEUxQ3xUMS1FfFQ1LUF8VDR8RTEtQnxUMkNpfFQxLUJ8VDEtRHxPMS1BfEUxLUF8VDEtQXxUM0F8VDRpKVxcXFxiIFwiLFxuICAgICAgICBcIkRhbnlUZWNoVGFibGV0XCI6IFwiR2VuaXVzIFRhYiBHM3xHZW5pdXMgVGFiIFMyfEdlbml1cyBUYWIgUTN8R2VuaXVzIFRhYiBHNHxHZW5pdXMgVGFiIFE0fEdlbml1cyBUYWIgRy1JSXxHZW5pdXMgVEFCIEdJSXxHZW5pdXMgVEFCIEdJSUl8R2VuaXVzIFRhYiBTMVwiLFxuICAgICAgICBcIkdhbGFwYWRUYWJsZXRcIjogXCJBbmRyb2lkLipcXFxcYkcxXFxcXGJcIixcbiAgICAgICAgXCJNaWNyb21heFRhYmxldFwiOiBcIkZ1bmJvb2t8TWljcm9tYXguKlxcXFxiKFAyNTB8UDU2MHxQMzYwfFAzNjJ8UDYwMHxQMzAwfFAzNTB8UDUwMHxQMjc1KVxcXFxiXCIsXG4gICAgICAgIFwiS2FyYm9ublRhYmxldFwiOiBcIkFuZHJvaWQuKlxcXFxiKEEzOXxBMzd8QTM0fFNUOHxTVDEwfFNUN3xTbWFydCBUYWIzfFNtYXJ0IFRhYjIpXFxcXGJcIixcbiAgICAgICAgXCJBbGxGaW5lVGFibGV0XCI6IFwiRmluZTcgR2VuaXVzfEZpbmU3IFNoaW5lfEZpbmU3IEFpcnxGaW5lOCBTdHlsZXxGaW5lOSBNb3JlfEZpbmUxMCBKb3l8RmluZTExIFdpZGVcIixcbiAgICAgICAgXCJQUk9TQ0FOVGFibGV0XCI6IFwiXFxcXGIoUEVNNjN8UExUMTAyM0d8UExUMTA0MXxQTFQxMDQ0fFBMVDEwNDRHfFBMVDEwOTF8UExUNDMxMXxQTFQ0MzExUEx8UExUNDMxNXxQTFQ3MDMwfFBMVDcwMzN8UExUNzAzM0R8UExUNzAzNXxQTFQ3MDM1RHxQTFQ3MDQ0S3xQTFQ3MDQ1S3xQTFQ3MDQ1S0J8UExUNzA3MUtHfFBMVDcwNzJ8UExUNzIyM0d8UExUNzIyNUd8UExUNzc3N0d8UExUNzgxMEt8UExUNzg0OUd8UExUNzg1MUd8UExUNzg1Mkd8UExUODAxNXxQTFQ4MDMxfFBMVDgwMzR8UExUODAzNnxQTFQ4MDgwS3xQTFQ4MDgyfFBMVDgwODh8UExUODIyM0d8UExUODIzNEd8UExUODIzNUd8UExUODgxNkt8UExUOTAxMXxQTFQ5MDQ1S3xQTFQ5MjMzR3xQTFQ5NzM1fFBMVDk3NjBHfFBMVDk3NzBHKVxcXFxiXCIsXG4gICAgICAgIFwiWU9ORVNUYWJsZXRcIjogXCJCUTEwNzh8QkMxMDAzfEJDMTA3N3xSSzk3MDJ8QkM5NzMwfEJDOTAwMXxJVDkwMDF8QkM3MDA4fEJDNzAxMHxCQzcwOHxCQzcyOHxCQzcwMTJ8QkM3MDMwfEJDNzAyN3xCQzcwMjZcIixcbiAgICAgICAgXCJDaGFuZ0ppYVRhYmxldFwiOiBcIlRQQzcxMDJ8VFBDNzEwM3xUUEM3MTA1fFRQQzcxMDZ8VFBDNzEwN3xUUEM3MjAxfFRQQzcyMDN8VFBDNzIwNXxUUEM3MjEwfFRQQzc3MDh8VFBDNzcwOXxUUEM3NzEyfFRQQzcxMTB8VFBDODEwMXxUUEM4MTAzfFRQQzgxMDV8VFBDODEwNnxUUEM4MjAzfFRQQzgyMDV8VFBDODUwM3xUUEM5MTA2fFRQQzk3MDF8VFBDOTcxMDF8VFBDOTcxMDN8VFBDOTcxMDV8VFBDOTcxMDZ8VFBDOTcxMTF8VFBDOTcxMTN8VFBDOTcyMDN8VFBDOTc2MDN8VFBDOTc4MDl8VFBDOTcyMDV8VFBDMTAxMDF8VFBDMTAxMDN8VFBDMTAxMDZ8VFBDMTAxMTF8VFBDMTAyMDN8VFBDMTAyMDV8VFBDMTA1MDNcIixcbiAgICAgICAgXCJHVVRhYmxldFwiOiBcIlRYLUExMzAxfFRYLU05MDAyfFE3MDJ8a2YwMjZcIixcbiAgICAgICAgXCJQb2ludE9mVmlld1RhYmxldFwiOiBcIlRBQi1QNTA2fFRBQi1uYXZpLTctM0ctTXxUQUItUDUxN3xUQUItUC01Mjd8VEFCLVA3MDF8VEFCLVA3MDN8VEFCLVA3MjF8VEFCLVA3MzFOfFRBQi1QNzQxfFRBQi1QODI1fFRBQi1QOTA1fFRBQi1QOTI1fFRBQi1QUjk0NXxUQUItUEwxMDE1fFRBQi1QMTAyNXxUQUItUEkxMDQ1fFRBQi1QMTMyNXxUQUItUFJPVEFCWzAtOV0rfFRBQi1QUk9UQUIyNXxUQUItUFJPVEFCMjZ8VEFCLVBST1RBQjI3fFRBQi1QUk9UQUIyNlhMfFRBQi1QUk9UQUIyLUlQUzl8VEFCLVBST1RBQjMwLUlQUzl8VEFCLVBST1RBQjI1WFhMfFRBQi1QUk9UQUIyNi1JUFMxMHxUQUItUFJPVEFCMzAtSVBTMTBcIixcbiAgICAgICAgXCJPdmVybWF4VGFibGV0XCI6IFwiT1YtKFN0ZWVsQ29yZXxOZXdCYXNlfEJhc2Vjb3JlfEJhc2VvbmV8RXhlbGxlbnxRdWF0dG9yfEVkdVRhYnxTb2x1dGlvbnxBQ1RJT058QmFzaWNUYWJ8VGVkZHlUYWJ8TWFnaWNUYWJ8U3RyZWFtfFRCLTA4fFRCLTA5KXxRdWFsY29yZSAxMDI3XCIsXG4gICAgICAgIFwiSENMVGFibGV0XCI6IFwiSENMLipUYWJsZXR8Q29ubmVjdC0zRy0yLjB8Q29ubmVjdC0yRy0yLjB8TUUgVGFibGV0IFUxfE1FIFRhYmxldCBVMnxNRSBUYWJsZXQgRzF8TUUgVGFibGV0IFgxfE1FIFRhYmxldCBZMnxNRSBUYWJsZXQgU3luY1wiLFxuICAgICAgICBcIkRQU1RhYmxldFwiOiBcIkRQUyBEcmVhbSA5fERQUyBEdWFsIDdcIixcbiAgICAgICAgXCJWaXN0dXJlVGFibGV0XCI6IFwiVjk3IEhEfGk3NSAzR3xWaXN0dXJlIFY0KCBIRCk/fFZpc3R1cmUgVjUoIEhEKT98VmlzdHVyZSBWMTBcIixcbiAgICAgICAgXCJDcmVzdGFUYWJsZXRcIjogXCJDVFAoLSk/ODEwfENUUCgtKT84MTh8Q1RQKC0pPzgyOHxDVFAoLSk/ODM4fENUUCgtKT84ODh8Q1RQKC0pPzk3OHxDVFAoLSk/OTgwfENUUCgtKT85ODd8Q1RQKC0pPzk4OHxDVFAoLSk/OTg5XCIsXG4gICAgICAgIFwiTWVkaWF0ZWtUYWJsZXRcIjogXCJcXFxcYk1UODEyNXxNVDgzODl8TVQ4MTM1fE1UODM3N1xcXFxiXCIsXG4gICAgICAgIFwiQ29uY29yZGVUYWJsZXRcIjogXCJDb25jb3JkZShbIF0rKT9UYWJ8Q29uQ29yZGUgUmVhZE1hblwiLFxuICAgICAgICBcIkdvQ2xldmVyVGFibGV0XCI6IFwiR09DTEVWRVIgVEFCfEE3R09DTEVWRVJ8TTEwNDJ8TTc4NDF8TTc0MnxSMTA0MkJLfFIxMDQxfFRBQiBBOTc1fFRBQiBBNzg0MnxUQUIgQTc0MXxUQUIgQTc0MUx8VEFCIE03MjNHfFRBQiBNNzIxfFRBQiBBMTAyMXxUQUIgSTkyMXxUQUIgUjcyMXxUQUIgSTcyMHxUQUIgVDc2fFRBQiBSNzB8VEFCIFI3Ni4yfFRBQiBSMTA2fFRBQiBSODMuMnxUQUIgTTgxM0d8VEFCIEk3MjF8R0NUQTcyMnxUQUIgSTcwfFRBQiBJNzF8VEFCIFM3M3xUQUIgUjczfFRBQiBSNzR8VEFCIFI5M3xUQUIgUjc1fFRBQiBSNzYuMXxUQUIgQTczfFRBQiBBOTN8VEFCIEE5My4yfFRBQiBUNzJ8VEFCIFI4M3xUQUIgUjk3NHxUQUIgUjk3M3xUQUIgQTEwMXxUQUIgQTEwM3xUQUIgQTEwNHxUQUIgQTEwNC4yfFIxMDVCS3xNNzEzR3xBOTcyQkt8VEFCIEE5NzF8VEFCIFI5NzQuMnxUQUIgUjEwNHxUQUIgUjgzLjN8VEFCIEExMDQyXCIsXG4gICAgICAgIFwiTW9kZWNvbVRhYmxldFwiOiBcIkZyZWVUQUIgOTAwMHxGcmVlVEFCIDcuNHxGcmVlVEFCIDcwMDR8RnJlZVRBQiA3ODAwfEZyZWVUQUIgMjA5NnxGcmVlVEFCIDcuNXxGcmVlVEFCIDEwMTR8RnJlZVRBQiAxMDAxIHxGcmVlVEFCIDgwMDF8RnJlZVRBQiA5NzA2fEZyZWVUQUIgOTcwMnxGcmVlVEFCIDcwMDN8RnJlZVRBQiA3MDAyfEZyZWVUQUIgMTAwMnxGcmVlVEFCIDc4MDF8RnJlZVRBQiAxMzMxfEZyZWVUQUIgMTAwNHxGcmVlVEFCIDgwMDJ8RnJlZVRBQiA4MDE0fEZyZWVUQUIgOTcwNHxGcmVlVEFCIDEwMDNcIixcbiAgICAgICAgXCJWb25pbm9UYWJsZXRcIjogXCJcXFxcYihBcmd1c1sgX10/U3xEaWFtb25kWyBfXT83OUhEfEVtZXJhbGRbIF9dPzc4RXxMdW5hWyBfXT83MEN8T255eFsgX10/U3xPbnl4WyBfXT9afE9yaW5bIF9dP0hEfE9yaW5bIF9dP1N8T3Rpc1sgX10/U3xTcGVlZFN0YXJbIF9dP1N8TWFnbmV0WyBfXT9NOXxQcmltdXNbIF9dPzk0WyBfXT8zR3xQcmltdXNbIF9dPzk0SER8UHJpbXVzWyBfXT9RU3xBbmRyb2lkLipcXFxcYlE4XFxcXGJ8U2lyaXVzWyBfXT9FVk9bIF9dP1FTfFNpcml1c1sgX10/UVN8U3Bpcml0WyBfXT9TKVxcXFxiXCIsXG4gICAgICAgIFwiRUNTVGFibGV0XCI6IFwiVjA3T1QyfFRNMTA1QXxTMTBPVDF8VFIxMENTMVwiLFxuICAgICAgICBcIlN0b3JleFRhYmxldFwiOiBcImVaZWVbXyddPyhUYWJ8R28pWzAtOV0rfFRhYkxDN3xMb29uZXkgVHVuZXMgVGFiXCIsXG4gICAgICAgIFwiVm9kYWZvbmVUYWJsZXRcIjogXCJTbWFydFRhYihbIF0rKT9bMC05XSt8U21hcnRUYWJJSTEwfFNtYXJ0VGFiSUk3fFZGLTE0OTdcIixcbiAgICAgICAgXCJFc3NlbnRpZWxCVGFibGV0XCI6IFwiU21hcnRbICddP1RBQlsgXSs/WzAtOV0rfEZhbWlseVsgJ10/VEFCMlwiLFxuICAgICAgICBcIlJvc3NNb29yVGFibGV0XCI6IFwiUk0tNzkwfFJNLTk5N3xSTUQtODc4R3xSTUQtOTc0UnxSTVQtNzA1QXxSTVQtNzAxfFJNRS02MDF8Uk1ULTUwMXxSTVQtNzExXCIsXG4gICAgICAgIFwiaU1vYmlsZVRhYmxldFwiOiBcImktbW9iaWxlIGktbm90ZVwiLFxuICAgICAgICBcIlRvbGlub1RhYmxldFwiOiBcInRvbGlubyB0YWIgWzAtOS5dK3x0b2xpbm8gc2hpbmVcIixcbiAgICAgICAgXCJBdWRpb1NvbmljVGFibGV0XCI6IFwiXFxcXGJDLTIyUXxUNy1RQ3xULTE3QnxULTE3UFxcXFxiXCIsXG4gICAgICAgIFwiQU1QRVRhYmxldFwiOiBcIkFuZHJvaWQuKiBBNzggXCIsXG4gICAgICAgIFwiU2trVGFibGV0XCI6IFwiQW5kcm9pZC4qIChTS1lQQUR8UEhPRU5JWHxDWUNMT1BTKVwiLFxuICAgICAgICBcIlRlY25vVGFibGV0XCI6IFwiVEVDTk8gUDlcIixcbiAgICAgICAgXCJKWERUYWJsZXRcIjogXCJBbmRyb2lkLiogXFxcXGIoRjMwMDB8QTMzMDB8SlhENTAwMHxKWEQzMDAwfEpYRDIwMDB8SlhEMzAwQnxKWEQzMDB8UzU4MDB8Uzc4MDB8UzYwMmJ8UzUxMTBifFM3MzAwfFM1MzAwfFM2MDJ8UzYwM3xTNTEwMHxTNTExMHxTNjAxfFM3MTAwYXxQMzAwMEZ8UDMwMDBzfFAxMDF8UDIwMHN8UDEwMDBtfFAyMDBtfFA5MTAwfFAxMDAwc3xTNjYwMGJ8UzkwOHxQMTAwMHxQMzAwfFMxOHxTNjYwMHxTOTEwMClcXFxcYlwiLFxuICAgICAgICBcImlKb3lUYWJsZXRcIjogXCJUYWJsZXQgKFNwaXJpdCA3fEVzc2VudGlhfEdhbGF0ZWF8RnVzaW9ufE9uaXggN3xMYW5kYXxUaXRhbnxTY29vYnl8RGVveHxTdGVsbGF8VGhlbWlzfEFyZ29ufFVuaXF1ZSA3fFN5Z251c3xIZXhlbnxGaW5pdHkgN3xDcmVhbXxDcmVhbSBYMnxKYWRlfE5lb24gN3xOZXJvbiA3fEthbmR5fFNjYXBlfFNhcGh5ciA3fFJlYmVsfEJpb3h8UmViZWx8UmViZWwgOEdCfE15c3R8RHJhY28gN3xNeXN0fFRhYjctMDA0fE15c3R8VGFkZW8gSm9uZXN8VGFibGV0IEJvaW5nfEFycm93fERyYWNvIER1YWwgQ2FtfEF1cml4fE1pbnR8QW1pdHl8UmV2b2x1dGlvbnxGaW5pdHkgOXxOZW9uIDl8VDl3fEFtaXR5IDRHQiBEdWFsIENhbXxTdG9uZSA0R0J8U3RvbmUgOEdCfEFuZHJvbWVkYXxTaWxrZW58WDJ8QW5kcm9tZWRhIElJfEhhbGxleXxGbGFtZXxTYXBoeXIgOSw3fFRvdWNoIDh8UGxhbmV0fFRyaXRvbnxVbmlxdWUgMTB8SGV4ZW4gMTB8TWVtcGhpcyA0R0J8TWVtcGhpcyA4R0J8T25peCAxMClcIixcbiAgICAgICAgXCJGWDJUYWJsZXRcIjogXCJGWDIgUEFEN3xGWDIgUEFEMTBcIixcbiAgICAgICAgXCJYb3JvVGFibGV0XCI6IFwiS2lkc1BBRCA3MDF8UEFEWyBdPzcxMnxQQURbIF0/NzE0fFBBRFsgXT83MTZ8UEFEWyBdPzcxN3xQQURbIF0/NzE4fFBBRFsgXT83MjB8UEFEWyBdPzcyMXxQQURbIF0/NzIyfFBBRFsgXT83OTB8UEFEWyBdPzc5MnxQQURbIF0/OTAwfFBBRFsgXT85NzE1RHxQQURbIF0/OTcxNkRSfFBBRFsgXT85NzE4RFJ8UEFEWyBdPzk3MTlRUnxQQURbIF0/OTcyMFFSfFRlbGVQQUQxMDMwfFRlbGVwYWQxMDMyfFRlbGVQQUQ3MzB8VGVsZVBBRDczMXxUZWxlUEFENzMyfFRlbGVQQUQ3MzVRfFRlbGVQQUQ4MzB8VGVsZVBBRDk3MzB8VGVsZVBBRDc5NXxNZWdhUEFEIDEzMzF8TWVnYVBBRCAxODUxfE1lZ2FQQUQgMjE1MVwiLFxuICAgICAgICBcIlZpZXdzb25pY1RhYmxldFwiOiBcIlZpZXdQYWQgMTBwaXxWaWV3UGFkIDEwZXxWaWV3UGFkIDEwc3xWaWV3UGFkIEU3MnxWaWV3UGFkN3xWaWV3UGFkIEUxMDB8Vmlld1BhZCA3ZXxWaWV3U29uaWMgVkI3MzN8VkIxMDBhXCIsXG4gICAgICAgIFwiVmVyaXpvblRhYmxldFwiOiBcIlFUQVFaM3xRVEFJUjd8UVRBUVRaM3xRVEFTVU4xfFFUQVNVTjJ8UVRBWElBMVwiLFxuICAgICAgICBcIk9keXNUYWJsZXRcIjogXCJMT09YfFhFTk8xMHxPRFlTWyAtXShTcGFjZXxFVk98WHByZXNzfE5PT04pfFxcXFxiWEVMSU9cXFxcYnxYZWxpbzEwUHJvfFhFTElPN1BIT05FVEFCfFhFTElPMTBFWFRSRU1FfFhFTElPUFQyfE5FT19RVUFEMTBcIixcbiAgICAgICAgXCJDYXB0aXZhVGFibGV0XCI6IFwiQ0FQVElWQSBQQURcIixcbiAgICAgICAgXCJJY29uYml0VGFibGV0XCI6IFwiTmV0VEFCfE5ULTM3MDJ8TlQtMzcwMlN8TlQtMzcwMlN8TlQtMzYwM1B8TlQtMzYwM1B8TlQtMDcwNFN8TlQtMDcwNFN8TlQtMzgwNUN8TlQtMzgwNUN8TlQtMDgwNkN8TlQtMDgwNkN8TlQtMDkwOVR8TlQtMDkwOVR8TlQtMDkwN1N8TlQtMDkwN1N8TlQtMDkwMlN8TlQtMDkwMlNcIixcbiAgICAgICAgXCJUZWNsYXN0VGFibGV0XCI6IFwiVDk4IDRHfFxcXFxiUDgwXFxcXGJ8XFxcXGJYOTBIRFxcXFxifFg5OCBBaXJ8WDk4IEFpciAzR3xcXFxcYlg4OVxcXFxifFA4MCAzR3xcXFxcYlg4MGhcXFxcYnxQOTggQWlyfFxcXFxiWDg5SERcXFxcYnxQOTggM0d8XFxcXGJQOTBIRFxcXFxifFA4OSAzR3xYOTggM0d8XFxcXGJQNzBoXFxcXGJ8UDc5SEQgM0d8RzE4ZCAzR3xcXFxcYlA3OUhEXFxcXGJ8XFxcXGJQODlzXFxcXGJ8XFxcXGJBODhcXFxcYnxcXFxcYlAxMEhEXFxcXGJ8XFxcXGJQMTlIRFxcXFxifEcxOCAzR3xcXFxcYlA3OEhEXFxcXGJ8XFxcXGJBNzhcXFxcYnxcXFxcYlA3NVxcXFxifEcxN3MgM0d8RzE3aCAzR3xcXFxcYlA4NXRcXFxcYnxcXFxcYlA5MFxcXFxifFxcXFxiUDExXFxcXGJ8XFxcXGJQOTh0XFxcXGJ8XFxcXGJQOThIRFxcXFxifFxcXFxiRzE4ZFxcXFxifFxcXFxiUDg1c1xcXFxifFxcXFxiUDExSERcXFxcYnxcXFxcYlA4OHNcXFxcYnxcXFxcYkE4MEhEXFxcXGJ8XFxcXGJBODBzZVxcXFxifFxcXFxiQTEwaFxcXFxifFxcXFxiUDg5XFxcXGJ8XFxcXGJQNzhzXFxcXGJ8XFxcXGJHMThcXFxcYnxcXFxcYlA4NVxcXFxifFxcXFxiQTcwaFxcXFxifFxcXFxiQTcwXFxcXGJ8XFxcXGJHMTdcXFxcYnxcXFxcYlAxOFxcXFxifFxcXFxiQTgwc1xcXFxifFxcXFxiQTExc1xcXFxifFxcXFxiUDg4SERcXFxcYnxcXFxcYkE4MGhcXFxcYnxcXFxcYlA3NnNcXFxcYnxcXFxcYlA3NmhcXFxcYnxcXFxcYlA5OFxcXFxifFxcXFxiQTEwSERcXFxcYnxcXFxcYlA3OFxcXFxifFxcXFxiUDg4XFxcXGJ8XFxcXGJBMTFcXFxcYnxcXFxcYkExMHRcXFxcYnxcXFxcYlA3NmFcXFxcYnxcXFxcYlA3NnRcXFxcYnxcXFxcYlA3NmVcXFxcYnxcXFxcYlA4NUhEXFxcXGJ8XFxcXGJQODVhXFxcXGJ8XFxcXGJQODZcXFxcYnxcXFxcYlA3NUhEXFxcXGJ8XFxcXGJQNzZ2XFxcXGJ8XFxcXGJBMTJcXFxcYnxcXFxcYlA3NWFcXFxcYnxcXFxcYkExNVxcXFxifFxcXFxiUDc2VGlcXFxcYnxcXFxcYlA4MUhEXFxcXGJ8XFxcXGJBMTBcXFxcYnxcXFxcYlQ3NjBWRVxcXFxifFxcXFxiVDcyMEhEXFxcXGJ8XFxcXGJQNzZcXFxcYnxcXFxcYlA3M1xcXFxifFxcXFxiUDcxXFxcXGJ8XFxcXGJQNzJcXFxcYnxcXFxcYlQ3MjBTRVxcXFxifFxcXFxiQzUyMFRpXFxcXGJ8XFxcXGJUNzYwXFxcXGJ8XFxcXGJUNzIwVkVcXFxcYnxUNzIwLTNHRXxUNzIwLVdpRmlcIixcbiAgICAgICAgXCJPbmRhVGFibGV0XCI6IFwiXFxcXGIoVjk3NWl8VmkzMHxWWDUzMHxWNzAxfFZpNjB8VjcwMXN8Vmk1MHxWODAxc3xWNzE5fFZ4NjEwd3xWWDYxMFd8VjgxOWl8VmkxMHxWWDU4MFd8VmkxMHxWNzExc3xWODEzfFY4MTF8VjgyMHd8VjgyMHxWaTIwfFY3MTF8VkkzMFd8VjcxMnxWODkxd3xWOTcyfFY4MTl3fFY4MjB3fFZpNjB8VjgyMHd8VjcxMXxWODEzc3xWODAxfFY4MTl8Vjk3NXN8VjgwMXxWODE5fFY4MTl8VjgxOHxWODExfFY3MTJ8Vjk3NW18VjEwMXd8Vjk2MXd8VjgxMnxWODE4fFY5NzF8Vjk3MXN8VjkxOXxWOTg5fFYxMTZ3fFYxMDJ3fFY5NzN8Vmk0MClcXFxcYltcXFxcc10rXCIsXG4gICAgICAgIFwiSmF5dGVjaFRhYmxldFwiOiBcIlRQQy1QQTc2MlwiLFxuICAgICAgICBcIkJsYXVwdW5rdFRhYmxldFwiOiBcIkVuZGVhdm91ciA4MDBOR3xFbmRlYXZvdXIgMTAxMFwiLFxuICAgICAgICBcIkRpZ21hVGFibGV0XCI6IFwiXFxcXGIoaUR4MTB8aUR4OXxpRHg4fGlEeDd8aUR4RDd8aUR4RDh8aURzUTh8aURzUTd8aURzUTh8aURzRDEwfGlEbkQ3fDNUUzgwNEh8aURzUTExfGlEajd8aURzMTApXFxcXGJcIixcbiAgICAgICAgXCJFdm9saW9UYWJsZXRcIjogXCJBUklBX01pbmlfd2lmaXxBcmlhWyBfXU1pbml8RXZvbGlvIFgxMHxFdm9saW8gWDd8RXZvbGlvIFg4fFxcXFxiRXZvdGFiXFxcXGJ8XFxcXGJOZXVyYVxcXFxiXCIsXG4gICAgICAgIFwiTGF2YVRhYmxldFwiOiBcIlFQQUQgRTcwNHxcXFxcYkl2b3J5U1xcXFxifEUtVEFCIElWT1JZfFxcXFxiRS1UQUJcXFxcYlwiLFxuICAgICAgICBcIkFvY1RhYmxldFwiOiBcIk1XMDgxMXxNVzA4MTJ8TVcwOTIyfE1USzgzODJ8TVcxMDMxfE1XMDgzMXxNVzA4MjF8TVcwOTMxfE1XMDcxMlwiLFxuICAgICAgICBcIk1wbWFuVGFibGV0XCI6IFwiTVAxMSBPQ1RBfE1QMTAgT0NUQXxNUFFDMTExNHxNUFFDMTAwNHxNUFFDOTk0fE1QUUM5NzR8TVBRQzk3M3xNUFFDODA0fE1QUUM3ODR8TVBRQzc4MHxcXFxcYk1QRzdcXFxcYnxNUERDRzc1fE1QRENHNzF8TVBEQzEwMDZ8TVAxMDFEQ3xNUERDOTAwMHxNUERDOTA1fE1QREM3MDZIRHxNUERDNzA2fE1QREM3MDV8TVBEQzExMHxNUERDMTAwfE1QREM5OXxNUERDOTd8TVBEQzg4fE1QREM4fE1QREM3N3xNUDcwOXxNSUQ3MDF8TUlENzExfE1JRDE3MHxNUERDNzAzfE1QUUMxMDEwXCIsXG4gICAgICAgIFwiQ2Vsa29uVGFibGV0XCI6IFwiQ1Q2OTV8Q1Q4ODh8Q1RbXFxcXHNdPzkxMHxDVDcgVGFifENUOSBUYWJ8Q1QzIFRhYnxDVDIgVGFifENUMSBUYWJ8QzgyMHxDNzIwfFxcXFxiQ1QtMVxcXFxiXCIsXG4gICAgICAgIFwiV29sZGVyVGFibGV0XCI6IFwibWlUYWIgXFxcXGIoRElBTU9ORHxTUEFDRXxCUk9PS0xZTnxORU98RkxZfE1BTkhBVFRBTnxGVU5LfEVWT0xVVElPTnxTS1l8R09DQVJ8SVJPTnxHRU5JVVN8UE9QfE1JTlR8RVBTSUxPTnxCUk9BRFdBWXxKVU1QfEhPUHxMRUdFTkR8TkVXIEFHRXxMSU5FfEFEVkFOQ0V8RkVFTHxGT0xMT1d8TElLRXxMSU5LfExJVkV8VEhJTkt8RlJFRURPTXxDSElDQUdPfENMRVZFTEFORHxCQUxUSU1PUkUtR0h8SU9XQXxCT1NUT058U0VBVFRMRXxQSE9FTklYfERBTExBU3xJTiAxMDF8TWFzdGVyQ2hlZilcXFxcYlwiLFxuICAgICAgICBcIk1pVGFibGV0XCI6IFwiXFxcXGJNSSBQQURcXFxcYnxcXFxcYkhNIE5PVEUgMVdcXFxcYlwiLFxuICAgICAgICBcIk5pYmlydVRhYmxldFwiOiBcIk5pYmlydSBNMXxOaWJpcnUgSnVwaXRlciBPbmVcIixcbiAgICAgICAgXCJOZXhvVGFibGV0XCI6IFwiTkVYTyBOT1ZBfE5FWE8gMTB8TkVYTyBBVklPfE5FWE8gRlJFRXxORVhPIEdPfE5FWE8gRVZPfE5FWE8gM0d8TkVYTyBTTUFSVHxORVhPIEtJRERPfE5FWE8gTU9CSVwiLFxuICAgICAgICBcIkxlYWRlclRhYmxldFwiOiBcIlRCTFQxMFF8VEJMVDEwSXxUQkwtMTBXREtCfFRCTC0xMFdES0JPMjAxM3xUQkwtVzIzMFYyfFRCTC1XNDUwfFRCTC1XNTAwfFNWNTcyfFRCTFQ3SXxUQkEtQUM3LThHfFRCTFQ3OXxUQkwtOFcxNnxUQkwtMTBXMzJ8VEJMLTEwV0tCfFRCTC1XMTAwXCIsXG4gICAgICAgIFwiVWJpc2xhdGVUYWJsZXRcIjogXCJVYmlTbGF0ZVtcXFxcc10/N0NcIixcbiAgICAgICAgXCJQb2NrZXRCb29rVGFibGV0XCI6IFwiUG9ja2V0Ym9va1wiLFxuICAgICAgICBcIktvY2Fzb1RhYmxldFwiOiBcIlxcXFxiKFRCLTEyMDcpXFxcXGJcIixcbiAgICAgICAgXCJIaXNlbnNlVGFibGV0XCI6IFwiXFxcXGIoRjUyODF8RTIzNzEpXFxcXGJcIixcbiAgICAgICAgXCJIdWRsXCI6IFwiSHVkbCBIVDdTM3xIdWRsIDJcIixcbiAgICAgICAgXCJUZWxzdHJhVGFibGV0XCI6IFwiVC1IdWIyXCIsXG4gICAgICAgIFwiR2VuZXJpY1RhYmxldFwiOiBcIkFuZHJvaWQuKlxcXFxiOTdEXFxcXGJ8VGFibGV0KD8hLipQQyl8Qk5UVjI1MEF8TUlELVdDRE1BfExvZ2ljUEQgWm9vbTJ8XFxcXGJBN0VCXFxcXGJ8Q2F0Tm92YTh8QTFfMDd8Q1Q3MDR8Q1QxMDAyfFxcXFxiTTcyMVxcXFxifHJrMzBzZGt8XFxcXGJFVk9UQUJcXFxcYnxNNzU4QXxFVDkwNHxBTFVNSVVNMTB8U21hcnRmcmVuIFRhYnxFbmRlYXZvdXIgMTAxMHxUYWJsZXQtUEMtNHxUYWdpIFRhYnxcXFxcYk02cHJvXFxcXGJ8Q1QxMDIwV3xhcmMgMTBIRHxcXFxcYlRQNzUwXFxcXGJ8XFxcXGJRVEFRWjNcXFxcYlwiXG4gICAgfSxcbiAgICBcIm9zc1wiOiB7XG4gICAgICAgIFwiQW5kcm9pZE9TXCI6IFwiQW5kcm9pZFwiLFxuICAgICAgICBcIkJsYWNrQmVycnlPU1wiOiBcImJsYWNrYmVycnl8XFxcXGJCQjEwXFxcXGJ8cmltIHRhYmxldCBvc1wiLFxuICAgICAgICBcIlBhbG1PU1wiOiBcIlBhbG1PU3xhdmFudGdvfGJsYXplcnxlbGFpbmV8aGlwdG9wfHBhbG18cGx1Y2tlcnx4aWlub1wiLFxuICAgICAgICBcIlN5bWJpYW5PU1wiOiBcIlN5bWJpYW58U3ltYk9TfFNlcmllczYwfFNlcmllczQwfFNZQi1bMC05XSt8XFxcXGJTNjBcXFxcYlwiLFxuICAgICAgICBcIldpbmRvd3NNb2JpbGVPU1wiOiBcIldpbmRvd3MgQ0UuKihQUEN8U21hcnRwaG9uZXxNb2JpbGV8WzAtOV17M314WzAtOV17M30pfFdpbmRvdyBNb2JpbGV8V2luZG93cyBQaG9uZSBbMC05Ll0rfFdDRTtcIixcbiAgICAgICAgXCJXaW5kb3dzUGhvbmVPU1wiOiBcIldpbmRvd3MgUGhvbmUgMTAuMHxXaW5kb3dzIFBob25lIDguMXxXaW5kb3dzIFBob25lIDguMHxXaW5kb3dzIFBob25lIE9TfFhCTFdQN3xadW5lV1A3fFdpbmRvd3MgTlQgNi5bMjNdOyBBUk07XCIsXG4gICAgICAgIFwiaU9TXCI6IFwiXFxcXGJpUGhvbmUuKk1vYmlsZXxcXFxcYmlQb2R8XFxcXGJpUGFkfEFwcGxlQ29yZU1lZGlhXCIsXG4gICAgICAgIFwiTWVlR29PU1wiOiBcIk1lZUdvXCIsXG4gICAgICAgIFwiTWFlbW9PU1wiOiBcIk1hZW1vXCIsXG4gICAgICAgIFwiSmF2YU9TXCI6IFwiSjJNRVxcL3xcXFxcYk1JRFBcXFxcYnxcXFxcYkNMRENcXFxcYlwiLFxuICAgICAgICBcIndlYk9TXCI6IFwid2ViT1N8aHB3T1NcIixcbiAgICAgICAgXCJiYWRhT1NcIjogXCJcXFxcYkJhZGFcXFxcYlwiLFxuICAgICAgICBcIkJSRVdPU1wiOiBcIkJSRVdcIlxuICAgIH0sXG4gICAgXCJ1YXNcIjoge1xuICAgICAgICBcIkNocm9tZVwiOiBcIlxcXFxiQ3JNb1xcXFxifENyaU9TfEFuZHJvaWQuKkNocm9tZVxcL1suMC05XSogKE1vYmlsZSk/XCIsXG4gICAgICAgIFwiRG9sZmluXCI6IFwiXFxcXGJEb2xmaW5cXFxcYlwiLFxuICAgICAgICBcIk9wZXJhXCI6IFwiT3BlcmEuKk1pbml8T3BlcmEuKk1vYml8QW5kcm9pZC4qT3BlcmF8TW9iaWxlLipPUFJcXC9bMC05Ll0rfENvYXN0XFwvWzAtOS5dK1wiLFxuICAgICAgICBcIlNreWZpcmVcIjogXCJTa3lmaXJlXCIsXG4gICAgICAgIFwiRWRnZVwiOiBcIk1vYmlsZSBTYWZhcmlcXC9bLjAtOV0qIEVkZ2VcIixcbiAgICAgICAgXCJJRVwiOiBcIklFTW9iaWxlfE1TSUVNb2JpbGVcIixcbiAgICAgICAgXCJGaXJlZm94XCI6IFwiZmVubmVjfGZpcmVmb3guKm1hZW1vfChNb2JpbGV8VGFibGV0KS4qRmlyZWZveHxGaXJlZm94LipNb2JpbGV8RnhpT1NcIixcbiAgICAgICAgXCJCb2x0XCI6IFwiYm9sdFwiLFxuICAgICAgICBcIlRlYVNoYXJrXCI6IFwidGVhc2hhcmtcIixcbiAgICAgICAgXCJCbGF6ZXJcIjogXCJCbGF6ZXJcIixcbiAgICAgICAgXCJTYWZhcmlcIjogXCJWZXJzaW9uLipNb2JpbGUuKlNhZmFyaXxTYWZhcmkuKk1vYmlsZXxNb2JpbGVTYWZhcmlcIixcbiAgICAgICAgXCJVQ0Jyb3dzZXJcIjogXCJVQy4qQnJvd3NlcnxVQ1dFQlwiLFxuICAgICAgICBcImJhaWR1Ym94YXBwXCI6IFwiYmFpZHVib3hhcHBcIixcbiAgICAgICAgXCJiYWlkdWJyb3dzZXJcIjogXCJiYWlkdWJyb3dzZXJcIixcbiAgICAgICAgXCJEaWlnb0Jyb3dzZXJcIjogXCJEaWlnb0Jyb3dzZXJcIixcbiAgICAgICAgXCJQdWZmaW5cIjogXCJQdWZmaW5cIixcbiAgICAgICAgXCJNZXJjdXJ5XCI6IFwiXFxcXGJNZXJjdXJ5XFxcXGJcIixcbiAgICAgICAgXCJPYmlnb0Jyb3dzZXJcIjogXCJPYmlnb1wiLFxuICAgICAgICBcIk5ldEZyb250XCI6IFwiTkYtQnJvd3NlclwiLFxuICAgICAgICBcIkdlbmVyaWNCcm93c2VyXCI6IFwiTm9raWFCcm93c2VyfE92aUJyb3dzZXJ8T25lQnJvd3NlcnxUd29ua3lCZWFtQnJvd3NlcnxTRU1DLipCcm93c2VyfEZseUZsb3d8TWluaW1vfE5ldEZyb250fE5vdmFycmEtVmlzaW9ufE1RUUJyb3dzZXJ8TWljcm9NZXNzZW5nZXJcIixcbiAgICAgICAgXCJQYWxlTW9vblwiOiBcIkFuZHJvaWQuKlBhbGVNb29ufE1vYmlsZS4qUGFsZU1vb25cIlxuICAgIH0sXG4gICAgXCJwcm9wc1wiOiB7XG4gICAgICAgIFwiTW9iaWxlXCI6IFwiTW9iaWxlXFwvW1ZFUl1cIixcbiAgICAgICAgXCJCdWlsZFwiOiBcIkJ1aWxkXFwvW1ZFUl1cIixcbiAgICAgICAgXCJWZXJzaW9uXCI6IFwiVmVyc2lvblxcL1tWRVJdXCIsXG4gICAgICAgIFwiVmVuZG9ySURcIjogXCJWZW5kb3JJRFxcL1tWRVJdXCIsXG4gICAgICAgIFwiaVBhZFwiOiBcImlQYWQuKkNQVVthLXogXStbVkVSXVwiLFxuICAgICAgICBcImlQaG9uZVwiOiBcImlQaG9uZS4qQ1BVW2EteiBdK1tWRVJdXCIsXG4gICAgICAgIFwiaVBvZFwiOiBcImlQb2QuKkNQVVthLXogXStbVkVSXVwiLFxuICAgICAgICBcIktpbmRsZVwiOiBcIktpbmRsZVxcL1tWRVJdXCIsXG4gICAgICAgIFwiQ2hyb21lXCI6IFtcbiAgICAgICAgICAgIFwiQ2hyb21lXFwvW1ZFUl1cIixcbiAgICAgICAgICAgIFwiQ3JpT1NcXC9bVkVSXVwiLFxuICAgICAgICAgICAgXCJDck1vXFwvW1ZFUl1cIlxuICAgICAgICBdLFxuICAgICAgICBcIkNvYXN0XCI6IFtcbiAgICAgICAgICAgIFwiQ29hc3RcXC9bVkVSXVwiXG4gICAgICAgIF0sXG4gICAgICAgIFwiRG9sZmluXCI6IFwiRG9sZmluXFwvW1ZFUl1cIixcbiAgICAgICAgXCJGaXJlZm94XCI6IFtcbiAgICAgICAgICAgIFwiRmlyZWZveFxcL1tWRVJdXCIsXG4gICAgICAgICAgICBcIkZ4aU9TXFwvW1ZFUl1cIlxuICAgICAgICBdLFxuICAgICAgICBcIkZlbm5lY1wiOiBcIkZlbm5lY1xcL1tWRVJdXCIsXG4gICAgICAgIFwiRWRnZVwiOiBcIkVkZ2VcXC9bVkVSXVwiLFxuICAgICAgICBcIklFXCI6IFtcbiAgICAgICAgICAgIFwiSUVNb2JpbGVcXC9bVkVSXTtcIixcbiAgICAgICAgICAgIFwiSUVNb2JpbGUgW1ZFUl1cIixcbiAgICAgICAgICAgIFwiTVNJRSBbVkVSXTtcIixcbiAgICAgICAgICAgIFwiVHJpZGVudFxcL1swLTkuXSs7LipydjpbVkVSXVwiXG4gICAgICAgIF0sXG4gICAgICAgIFwiTmV0RnJvbnRcIjogXCJOZXRGcm9udFxcL1tWRVJdXCIsXG4gICAgICAgIFwiTm9raWFCcm93c2VyXCI6IFwiTm9raWFCcm93c2VyXFwvW1ZFUl1cIixcbiAgICAgICAgXCJPcGVyYVwiOiBbXG4gICAgICAgICAgICBcIiBPUFJcXC9bVkVSXVwiLFxuICAgICAgICAgICAgXCJPcGVyYSBNaW5pXFwvW1ZFUl1cIixcbiAgICAgICAgICAgIFwiVmVyc2lvblxcL1tWRVJdXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJPcGVyYSBNaW5pXCI6IFwiT3BlcmEgTWluaVxcL1tWRVJdXCIsXG4gICAgICAgIFwiT3BlcmEgTW9iaVwiOiBcIlZlcnNpb25cXC9bVkVSXVwiLFxuICAgICAgICBcIlVDQnJvd3NlclwiOiBbXG4gICAgICAgICAgICBcIlVDV0VCW1ZFUl1cIixcbiAgICAgICAgICAgIFwiVUMuKkJyb3dzZXJcXC9bVkVSXVwiXG4gICAgICAgIF0sXG4gICAgICAgIFwiTVFRQnJvd3NlclwiOiBcIk1RUUJyb3dzZXJcXC9bVkVSXVwiLFxuICAgICAgICBcIk1pY3JvTWVzc2VuZ2VyXCI6IFwiTWljcm9NZXNzZW5nZXJcXC9bVkVSXVwiLFxuICAgICAgICBcImJhaWR1Ym94YXBwXCI6IFwiYmFpZHVib3hhcHBcXC9bVkVSXVwiLFxuICAgICAgICBcImJhaWR1YnJvd3NlclwiOiBcImJhaWR1YnJvd3NlclxcL1tWRVJdXCIsXG4gICAgICAgIFwiU2Ftc3VuZ0Jyb3dzZXJcIjogXCJTYW1zdW5nQnJvd3NlclxcL1tWRVJdXCIsXG4gICAgICAgIFwiSXJvblwiOiBcIklyb25cXC9bVkVSXVwiLFxuICAgICAgICBcIlNhZmFyaVwiOiBbXG4gICAgICAgICAgICBcIlZlcnNpb25cXC9bVkVSXVwiLFxuICAgICAgICAgICAgXCJTYWZhcmlcXC9bVkVSXVwiXG4gICAgICAgIF0sXG4gICAgICAgIFwiU2t5ZmlyZVwiOiBcIlNreWZpcmVcXC9bVkVSXVwiLFxuICAgICAgICBcIlRpemVuXCI6IFwiVGl6ZW5cXC9bVkVSXVwiLFxuICAgICAgICBcIldlYmtpdFwiOiBcIndlYmtpdFsgXFwvXVtWRVJdXCIsXG4gICAgICAgIFwiUGFsZU1vb25cIjogXCJQYWxlTW9vblxcL1tWRVJdXCIsXG4gICAgICAgIFwiR2Vja29cIjogXCJHZWNrb1xcL1tWRVJdXCIsXG4gICAgICAgIFwiVHJpZGVudFwiOiBcIlRyaWRlbnRcXC9bVkVSXVwiLFxuICAgICAgICBcIlByZXN0b1wiOiBcIlByZXN0b1xcL1tWRVJdXCIsXG4gICAgICAgIFwiR29hbm5hXCI6IFwiR29hbm5hXFwvW1ZFUl1cIixcbiAgICAgICAgXCJpT1NcIjogXCIgXFxcXGJpP09TXFxcXGIgW1ZFUl1bIDtdezF9XCIsXG4gICAgICAgIFwiQW5kcm9pZFwiOiBcIkFuZHJvaWQgW1ZFUl1cIixcbiAgICAgICAgXCJCbGFja0JlcnJ5XCI6IFtcbiAgICAgICAgICAgIFwiQmxhY2tCZXJyeVtcXFxcd10rXFwvW1ZFUl1cIixcbiAgICAgICAgICAgIFwiQmxhY2tCZXJyeS4qVmVyc2lvblxcL1tWRVJdXCIsXG4gICAgICAgICAgICBcIlZlcnNpb25cXC9bVkVSXVwiXG4gICAgICAgIF0sXG4gICAgICAgIFwiQlJFV1wiOiBcIkJSRVcgW1ZFUl1cIixcbiAgICAgICAgXCJKYXZhXCI6IFwiSmF2YVxcL1tWRVJdXCIsXG4gICAgICAgIFwiV2luZG93cyBQaG9uZSBPU1wiOiBbXG4gICAgICAgICAgICBcIldpbmRvd3MgUGhvbmUgT1MgW1ZFUl1cIixcbiAgICAgICAgICAgIFwiV2luZG93cyBQaG9uZSBbVkVSXVwiXG4gICAgICAgIF0sXG4gICAgICAgIFwiV2luZG93cyBQaG9uZVwiOiBcIldpbmRvd3MgUGhvbmUgW1ZFUl1cIixcbiAgICAgICAgXCJXaW5kb3dzIENFXCI6IFwiV2luZG93cyBDRVxcL1tWRVJdXCIsXG4gICAgICAgIFwiV2luZG93cyBOVFwiOiBcIldpbmRvd3MgTlQgW1ZFUl1cIixcbiAgICAgICAgXCJTeW1iaWFuXCI6IFtcbiAgICAgICAgICAgIFwiU3ltYmlhbk9TXFwvW1ZFUl1cIixcbiAgICAgICAgICAgIFwiU3ltYmlhblxcL1tWRVJdXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJ3ZWJPU1wiOiBbXG4gICAgICAgICAgICBcIndlYk9TXFwvW1ZFUl1cIixcbiAgICAgICAgICAgIFwiaHB3T1NcXC9bVkVSXTtcIlxuICAgICAgICBdXG4gICAgfSxcbiAgICBcInV0aWxzXCI6IHtcbiAgICAgICAgXCJCb3RcIjogXCJHb29nbGVib3R8ZmFjZWJvb2tleHRlcm5hbGhpdHxBZHNCb3QtR29vZ2xlfEdvb2dsZSBLZXl3b3JkIFN1Z2dlc3Rpb258RmFjZWJvdHxZYW5kZXhCb3R8WWFuZGV4TW9iaWxlQm90fGJpbmdib3R8aWFfYXJjaGl2ZXJ8QWhyZWZzQm90fEV6b29tc3xHU0xGYm90fFdCU2VhcmNoQm90fFR3aXR0ZXJib3R8VHdlZXRtZW1lQm90fFR3aWtsZXxQYXBlckxpQm90fFdvdGJveHxVbndpbmRGZXRjaG9yfEV4YWJvdHxNSjEyYm90fFlhbmRleEltYWdlc3xUdXJuaXRpbkJvdHxQaW5nZG9tXCIsXG4gICAgICAgIFwiTW9iaWxlQm90XCI6IFwiR29vZ2xlYm90LU1vYmlsZXxBZHNCb3QtR29vZ2xlLU1vYmlsZXxZYWhvb1NlZWtlclxcL00xQTEtUjJEMlwiLFxuICAgICAgICBcIkRlc2t0b3BNb2RlXCI6IFwiV1BEZXNrdG9wXCIsXG4gICAgICAgIFwiVFZcIjogXCJTb255RFRWfEhiYlRWXCIsXG4gICAgICAgIFwiV2ViS2l0XCI6IFwiKHdlYmtpdClbIFxcL10oW1xcXFx3Ll0rKVwiLFxuICAgICAgICBcIkNvbnNvbGVcIjogXCJcXFxcYihOaW50ZW5kb3xOaW50ZW5kbyBXaWlVfE5pbnRlbmRvIDNEU3xQTEFZU1RBVElPTnxYYm94KVxcXFxiXCIsXG4gICAgICAgIFwiV2F0Y2hcIjogXCJTTS1WNzAwXCJcbiAgICB9XG59O1xuXG4gICAgLy8gZm9sbG93aW5nIHBhdHRlcm5zIGNvbWUgZnJvbSBodHRwOi8vZGV0ZWN0bW9iaWxlYnJvd3NlcnMuY29tL1xuICAgIGltcGwuZGV0ZWN0TW9iaWxlQnJvd3NlcnMgPSB7XG4gICAgICAgIGZ1bGxQYXR0ZXJuOiAvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2ksXG4gICAgICAgIHNob3J0UGF0dGVybjogLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2ksXG4gICAgICAgIHRhYmxldFBhdHRlcm46IC9hbmRyb2lkfGlwYWR8cGxheWJvb2t8c2lsay9pXG4gICAgfTtcblxuICAgIHZhciBoYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgICAgaXNBcnJheTtcblxuICAgIGltcGwuRkFMTEJBQ0tfUEhPTkUgPSAnVW5rbm93blBob25lJztcbiAgICBpbXBsLkZBTExCQUNLX1RBQkxFVCA9ICdVbmtub3duVGFibGV0JztcbiAgICBpbXBsLkZBTExCQUNLX01PQklMRSA9ICdVbmtub3duTW9iaWxlJztcblxuICAgIGlzQXJyYXkgPSAoJ2lzQXJyYXknIGluIEFycmF5KSA/XG4gICAgICAgIEFycmF5LmlzQXJyYXkgOiBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XSc7IH07XG5cbiAgICBmdW5jdGlvbiBlcXVhbElDKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgIT0gbnVsbCAmJiBiICE9IG51bGwgJiYgYS50b0xvd2VyQ2FzZSgpID09PSBiLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udGFpbnNJQyhhcnJheSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHZhbHVlTEMsIGksIGxlbiA9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgaWYgKCFsZW4gfHwgIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVMQyA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlTEMgPT09IGFycmF5W2ldLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29udmVydFByb3BzVG9SZWdFeHAob2JqZWN0KSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wLmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0W2tleV0gPSBuZXcgUmVnRXhwKG9iamVjdFtrZXldLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVVzZXJBZ2VudCh1c2VyQWdlbnQpIHtcbiAgICAgICAgcmV0dXJuICh1c2VyQWdlbnQgfHwgJycpLnN1YnN0cigwLCA1MDApOyAvLyBtaXRpZ2F0ZSB2dWxuZXJhYmxlIHRvIFJlRG9TXG4gICAgfVxuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHZhciBrZXksIHZhbHVlcywgdmFsdWUsIGksIGxlbiwgdmVyUG9zLCBtb2JpbGVEZXRlY3RSdWxlcyA9IGltcGwubW9iaWxlRGV0ZWN0UnVsZXM7XG4gICAgICAgIGZvciAoa2V5IGluIG1vYmlsZURldGVjdFJ1bGVzLnByb3BzKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcC5jYWxsKG1vYmlsZURldGVjdFJ1bGVzLnByb3BzLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzID0gbW9iaWxlRGV0ZWN0UnVsZXMucHJvcHNba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBbdmFsdWVzXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGVuID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIHZlclBvcyA9IHZhbHVlLmluZGV4T2YoJ1tWRVJdJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2ZXJQb3MgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgdmVyUG9zKSArICcoW1xcXFx3Ll9cXFxcK10rKScgKyB2YWx1ZS5zdWJzdHJpbmcodmVyUG9zICsgNSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzW2ldID0gbmV3IFJlZ0V4cCh2YWx1ZSwgJ2knKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbW9iaWxlRGV0ZWN0UnVsZXMucHJvcHNba2V5XSA9IHZhbHVlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb252ZXJ0UHJvcHNUb1JlZ0V4cChtb2JpbGVEZXRlY3RSdWxlcy5vc3MpO1xuICAgICAgICBjb252ZXJ0UHJvcHNUb1JlZ0V4cChtb2JpbGVEZXRlY3RSdWxlcy5waG9uZXMpO1xuICAgICAgICBjb252ZXJ0UHJvcHNUb1JlZ0V4cChtb2JpbGVEZXRlY3RSdWxlcy50YWJsZXRzKTtcbiAgICAgICAgY29udmVydFByb3BzVG9SZWdFeHAobW9iaWxlRGV0ZWN0UnVsZXMudWFzKTtcbiAgICAgICAgY29udmVydFByb3BzVG9SZWdFeHAobW9iaWxlRGV0ZWN0UnVsZXMudXRpbHMpO1xuXG4gICAgICAgIC8vIGNvcHkgc29tZSBwYXR0ZXJucyB0byBvc3MwIHdoaWNoIGFyZSB0ZXN0ZWQgZmlyc3QgKHNlZSBpc3N1ZSMxNSlcbiAgICAgICAgbW9iaWxlRGV0ZWN0UnVsZXMub3NzMCA9IHtcbiAgICAgICAgICAgIFdpbmRvd3NQaG9uZU9TOiBtb2JpbGVEZXRlY3RSdWxlcy5vc3MuV2luZG93c1Bob25lT1MsXG4gICAgICAgICAgICBXaW5kb3dzTW9iaWxlT1M6IG1vYmlsZURldGVjdFJ1bGVzLm9zcy5XaW5kb3dzTW9iaWxlT1NcbiAgICAgICAgfTtcbiAgICB9KCkpO1xuXG4gICAgLyoqXG4gICAgICogVGVzdCB1c2VyQWdlbnQgc3RyaW5nIGFnYWluc3QgYSBzZXQgb2YgcnVsZXMgYW5kIGZpbmQgdGhlIGZpcnN0IG1hdGNoZWQga2V5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBydWxlcyAoa2V5IGlzIFN0cmluZywgdmFsdWUgaXMgUmVnRXhwKVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyQWdlbnQgdGhlIG5hdmlnYXRvci51c2VyQWdlbnQgKG9yIEhUVFAtSGVhZGVyICdVc2VyLUFnZW50JykuXG4gICAgICogQHJldHVybnMge1N0cmluZ3xudWxsfSB0aGUgbWF0Y2hlZCBrZXkgaWYgZm91bmQsIG90aGVyd2lzZSA8dHQ+bnVsbDwvdHQ+XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBpbXBsLmZpbmRNYXRjaCA9IGZ1bmN0aW9uKHJ1bGVzLCB1c2VyQWdlbnQpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHJ1bGVzKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcC5jYWxsKHJ1bGVzLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJ1bGVzW2tleV0udGVzdCh1c2VyQWdlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUZXN0IHVzZXJBZ2VudCBzdHJpbmcgYWdhaW5zdCBhIHNldCBvZiBydWxlcyBhbmQgcmV0dXJuIGFuIGFycmF5IG9mIG1hdGNoZWQga2V5cy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcnVsZXMgKGtleSBpcyBTdHJpbmcsIHZhbHVlIGlzIFJlZ0V4cClcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXNlckFnZW50IHRoZSBuYXZpZ2F0b3IudXNlckFnZW50IChvciBIVFRQLUhlYWRlciAnVXNlci1BZ2VudCcpLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gYW4gYXJyYXkgb2YgbWF0Y2hlZCBrZXlzLCBtYXkgYmUgZW1wdHkgd2hlbiB0aGVyZSBpcyBubyBtYXRjaCwgYnV0IG5vdCA8dHQ+bnVsbDwvdHQ+XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBpbXBsLmZpbmRNYXRjaGVzID0gZnVuY3Rpb24ocnVsZXMsIHVzZXJBZ2VudCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBydWxlcykge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3AuY2FsbChydWxlcywga2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChydWxlc1trZXldLnRlc3QodXNlckFnZW50KSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gcHJvcGVydHkgaW4gdGhlIFVzZXItQWdlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVzZXJBZ2VudFxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gdmVyc2lvbiBvciA8dHQ+bnVsbDwvdHQ+IGlmIHZlcnNpb24gbm90IGZvdW5kXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBpbXBsLmdldFZlcnNpb25TdHIgPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lLCB1c2VyQWdlbnQpIHtcbiAgICAgICAgdmFyIHByb3BzID0gaW1wbC5tb2JpbGVEZXRlY3RSdWxlcy5wcm9wcywgcGF0dGVybnMsIGksIGxlbiwgbWF0Y2g7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wLmNhbGwocHJvcHMsIHByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICAgIHBhdHRlcm5zID0gcHJvcHNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgIGxlbiA9IHBhdHRlcm5zLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgICAgIG1hdGNoID0gcGF0dGVybnNbaV0uZXhlYyh1c2VyQWdlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gcHJvcGVydHkgaW4gdGhlIFVzZXItQWdlbnQuXG4gICAgICogV2lsbCByZXR1cm4gYSBmbG9hdCBudW1iZXIuIChlZy4gMl8wIHdpbGwgcmV0dXJuIDIuMCwgNC4zLjEgd2lsbCByZXR1cm4gNC4zMSlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eU5hbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXNlckFnZW50XG4gICAgICogQHJldHVybiB7TnVtYmVyfSB2ZXJzaW9uIG9yIDx0dD5OYU48L3R0PiBpZiB2ZXJzaW9uIG5vdCBmb3VuZFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgaW1wbC5nZXRWZXJzaW9uID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSwgdXNlckFnZW50KSB7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gaW1wbC5nZXRWZXJzaW9uU3RyKHByb3BlcnR5TmFtZSwgdXNlckFnZW50KTtcbiAgICAgICAgcmV0dXJuIHZlcnNpb24gPyBpbXBsLnByZXBhcmVWZXJzaW9uTm8odmVyc2lvbikgOiBOYU47XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFByZXBhcmUgdGhlIHZlcnNpb24gbnVtYmVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSB2ZXJzaW9uIG51bWJlciBhcyBhIGZsb2F0aW5nIG51bWJlclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgaW1wbC5wcmVwYXJlVmVyc2lvbk5vID0gZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgdmFyIG51bWJlcnM7XG5cbiAgICAgICAgbnVtYmVycyA9IHZlcnNpb24uc3BsaXQoL1thLXouXyBcXC9cXC1dL2kpO1xuICAgICAgICBpZiAobnVtYmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBudW1iZXJzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChudW1iZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBudW1iZXJzWzBdICsgJy4nO1xuICAgICAgICAgICAgbnVtYmVycy5zaGlmdCgpO1xuICAgICAgICAgICAgdmVyc2lvbiArPSBudW1iZXJzLmpvaW4oJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOdW1iZXIodmVyc2lvbik7XG4gICAgfTtcblxuICAgIGltcGwuaXNNb2JpbGVGYWxsYmFjayA9IGZ1bmN0aW9uICh1c2VyQWdlbnQpIHtcbiAgICAgICAgcmV0dXJuIGltcGwuZGV0ZWN0TW9iaWxlQnJvd3NlcnMuZnVsbFBhdHRlcm4udGVzdCh1c2VyQWdlbnQpIHx8XG4gICAgICAgICAgICBpbXBsLmRldGVjdE1vYmlsZUJyb3dzZXJzLnNob3J0UGF0dGVybi50ZXN0KHVzZXJBZ2VudC5zdWJzdHIoMCw0KSk7XG4gICAgfTtcblxuICAgIGltcGwuaXNUYWJsZXRGYWxsYmFjayA9IGZ1bmN0aW9uICh1c2VyQWdlbnQpIHtcbiAgICAgICAgcmV0dXJuIGltcGwuZGV0ZWN0TW9iaWxlQnJvd3NlcnMudGFibGV0UGF0dGVybi50ZXN0KHVzZXJBZ2VudCk7XG4gICAgfTtcblxuICAgIGltcGwucHJlcGFyZURldGVjdGlvbkNhY2hlID0gZnVuY3Rpb24gKGNhY2hlLCB1c2VyQWdlbnQsIG1heFBob25lV2lkdGgpIHtcbiAgICAgICAgaWYgKGNhY2hlLm1vYmlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBob25lLCB0YWJsZXQsIHBob25lU2l6ZWQ7XG5cbiAgICAgICAgLy8gZmlyc3QgY2hlY2sgZm9yIHN0cm9uZ2VyIHRhYmxldCBydWxlcywgdGhlbiBwaG9uZSAoc2VlIGlzc3VlIzUpXG4gICAgICAgIHRhYmxldCA9IGltcGwuZmluZE1hdGNoKGltcGwubW9iaWxlRGV0ZWN0UnVsZXMudGFibGV0cywgdXNlckFnZW50KTtcbiAgICAgICAgaWYgKHRhYmxldCkge1xuICAgICAgICAgICAgY2FjaGUubW9iaWxlID0gY2FjaGUudGFibGV0ID0gdGFibGV0O1xuICAgICAgICAgICAgY2FjaGUucGhvbmUgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuOyAvLyB1bmFtYmlndW91c2x5IGlkZW50aWZpZWQgYXMgdGFibGV0XG4gICAgICAgIH1cblxuICAgICAgICBwaG9uZSA9IGltcGwuZmluZE1hdGNoKGltcGwubW9iaWxlRGV0ZWN0UnVsZXMucGhvbmVzLCB1c2VyQWdlbnQpO1xuICAgICAgICBpZiAocGhvbmUpIHtcbiAgICAgICAgICAgIGNhY2hlLm1vYmlsZSA9IGNhY2hlLnBob25lID0gcGhvbmU7XG4gICAgICAgICAgICBjYWNoZS50YWJsZXQgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuOyAvLyB1bmFtYmlndW91c2x5IGlkZW50aWZpZWQgYXMgcGhvbmVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG91ciBydWxlcyBoYXZlbid0IGZvdW5kIGEgbWF0Y2ggLT4gdHJ5IG1vcmUgZ2VuZXJhbCBmYWxsYmFjayBydWxlc1xuICAgICAgICBpZiAoaW1wbC5pc01vYmlsZUZhbGxiYWNrKHVzZXJBZ2VudCkpIHtcbiAgICAgICAgICAgIHBob25lU2l6ZWQgPSBNb2JpbGVEZXRlY3QuaXNQaG9uZVNpemVkKG1heFBob25lV2lkdGgpO1xuICAgICAgICAgICAgaWYgKHBob25lU2l6ZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNhY2hlLm1vYmlsZSA9IGltcGwuRkFMTEJBQ0tfTU9CSUxFO1xuICAgICAgICAgICAgICAgIGNhY2hlLnRhYmxldCA9IGNhY2hlLnBob25lID0gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGhvbmVTaXplZCkge1xuICAgICAgICAgICAgICAgIGNhY2hlLm1vYmlsZSA9IGNhY2hlLnBob25lID0gaW1wbC5GQUxMQkFDS19QSE9ORTtcbiAgICAgICAgICAgICAgICBjYWNoZS50YWJsZXQgPSBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWNoZS5tb2JpbGUgPSBjYWNoZS50YWJsZXQgPSBpbXBsLkZBTExCQUNLX1RBQkxFVDtcbiAgICAgICAgICAgICAgICBjYWNoZS5waG9uZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaW1wbC5pc1RhYmxldEZhbGxiYWNrKHVzZXJBZ2VudCkpIHtcbiAgICAgICAgICAgIGNhY2hlLm1vYmlsZSA9IGNhY2hlLnRhYmxldCA9IGltcGwuRkFMTEJBQ0tfVEFCTEVUO1xuICAgICAgICAgICAgY2FjaGUucGhvbmUgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gbm90IG1vYmlsZSBhdCBhbGwhXG4gICAgICAgICAgICBjYWNoZS5tb2JpbGUgPSBjYWNoZS50YWJsZXQgPSBjYWNoZS5waG9uZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gdCBpcyBhIHJlZmVyZW5jZSB0byBhIE1vYmlsZURldGVjdCBpbnN0YW5jZVxuICAgIGltcGwubW9iaWxlR3JhZGUgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAvLyBpbXBsIG5vdGU6XG4gICAgICAgIC8vIFRvIGtlZXAgaW4gc3luYyB3LyBNb2JpbGVfRGV0ZWN0LnBocCBlYXNpbHksIHRoZSBmb2xsb3dpbmcgY29kZSBpcyB0aWdodGx5IGFsaWduZWQgdG8gdGhlIFBIUCB2ZXJzaW9uLlxuICAgICAgICAvLyBXaGVuIGNoYW5nZXMgYXJlIG1hZGUgaW4gTW9iaWxlX0RldGVjdC5waHAsIGNvcHkgdGhpcyBtZXRob2QgYW5kIHJlcGxhY2U6XG4gICAgICAgIC8vICAgICAkdGhpcy0+IC8gdC5cbiAgICAgICAgLy8gICAgIHNlbGY6Ok1PQklMRV9HUkFERV8oLikgLyAnJDEnXG4gICAgICAgIC8vICAgICAsIHNlbGY6OlZFUlNJT05fVFlQRV9GTE9BVCAvIChub3RoaW5nKVxuICAgICAgICAvLyAgICAgaXNJT1MoKSAvIG9zKCdpT1MnKVxuICAgICAgICAvLyAgICAgW3JlZ10gLyAobm90aGluZykgICA8LS0ganNkZWxpdnIgY29tcGxhaW5pbmcgYWJvdXQgdW5lc2NhcGVkIHVuaWNvZGUgY2hhcmFjdGVyIFUrMDBBRVxuICAgICAgICB2YXIgJGlzTW9iaWxlID0gdC5tb2JpbGUoKSAhPT0gbnVsbDtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAvLyBBcHBsZSBpT1MgMy4yLTUuMSAtIFRlc3RlZCBvbiB0aGUgb3JpZ2luYWwgaVBhZCAoNC4zIC8gNS4wKSwgaVBhZCAyICg0LjMpLCBpUGFkIDMgKDUuMSksIG9yaWdpbmFsIGlQaG9uZSAoMy4xKSwgaVBob25lIDMgKDMuMiksIDNHUyAoNC4zKSwgNCAoNC4zIC8gNS4wKSwgYW5kIDRTICg1LjEpXG4gICAgICAgICAgICB0Lm9zKCdpT1MnKSAmJiB0LnZlcnNpb24oJ2lQYWQnKT49NC4zIHx8XG4gICAgICAgICAgICB0Lm9zKCdpT1MnKSAmJiB0LnZlcnNpb24oJ2lQaG9uZScpPj0zLjEgfHxcbiAgICAgICAgICAgIHQub3MoJ2lPUycpICYmIHQudmVyc2lvbignaVBvZCcpPj0zLjEgfHxcblxuICAgICAgICAgICAgLy8gQW5kcm9pZCAyLjEtMi4zIC0gVGVzdGVkIG9uIHRoZSBIVEMgSW5jcmVkaWJsZSAoMi4yKSwgb3JpZ2luYWwgRHJvaWQgKDIuMiksIEhUQyBBcmlhICgyLjEpLCBHb29nbGUgTmV4dXMgUyAoMi4zKS4gRnVuY3Rpb25hbCBvbiAxLjUgJiAxLjYgYnV0IHBlcmZvcm1hbmNlIG1heSBiZSBzbHVnZ2lzaCwgdGVzdGVkIG9uIEdvb2dsZSBHMSAoMS41KVxuICAgICAgICAgICAgLy8gQW5kcm9pZCAzLjEgKEhvbmV5Y29tYikgIC0gVGVzdGVkIG9uIHRoZSBTYW1zdW5nIEdhbGF4eSBUYWIgMTAuMSBhbmQgTW90b3JvbGEgWE9PTVxuICAgICAgICAgICAgLy8gQW5kcm9pZCA0LjAgKElDUykgIC0gVGVzdGVkIG9uIGEgR2FsYXh5IE5leHVzLiBOb3RlOiB0cmFuc2l0aW9uIHBlcmZvcm1hbmNlIGNhbiBiZSBwb29yIG9uIHVwZ3JhZGVkIGRldmljZXNcbiAgICAgICAgICAgIC8vIEFuZHJvaWQgNC4xIChKZWxseSBCZWFuKSAgLSBUZXN0ZWQgb24gYSBHYWxheHkgTmV4dXMgYW5kIEdhbGF4eSA3XG4gICAgICAgICAgICAoIHQudmVyc2lvbignQW5kcm9pZCcpPjIuMSAmJiB0LmlzKCdXZWJraXQnKSApIHx8XG5cbiAgICAgICAgICAgIC8vIFdpbmRvd3MgUGhvbmUgNy03LjUgLSBUZXN0ZWQgb24gdGhlIEhUQyBTdXJyb3VuZCAoNy4wKSBIVEMgVHJvcGh5ICg3LjUpLCBMRy1FOTAwICg3LjUpLCBOb2tpYSBMdW1pYSA4MDBcbiAgICAgICAgICAgIHQudmVyc2lvbignV2luZG93cyBQaG9uZSBPUycpPj03LjAgfHxcblxuICAgICAgICAgICAgLy8gQmxhY2tiZXJyeSA3IC0gVGVzdGVkIG9uIEJsYWNrQmVycnkgVG9yY2ggOTgxMFxuICAgICAgICAgICAgLy8gQmxhY2tiZXJyeSA2LjAgLSBUZXN0ZWQgb24gdGhlIFRvcmNoIDk4MDAgYW5kIFN0eWxlIDk2NzBcbiAgICAgICAgICAgIHQuaXMoJ0JsYWNrQmVycnknKSAmJiB0LnZlcnNpb24oJ0JsYWNrQmVycnknKT49Ni4wIHx8XG4gICAgICAgICAgICAvLyBCbGFja2JlcnJ5IFBsYXlib29rICgxLjAtMi4wKSAtIFRlc3RlZCBvbiBQbGF5Qm9va1xuICAgICAgICAgICAgdC5tYXRjaCgnUGxheWJvb2suKlRhYmxldCcpIHx8XG5cbiAgICAgICAgICAgIC8vIFBhbG0gV2ViT1MgKDEuNC0yLjApIC0gVGVzdGVkIG9uIHRoZSBQYWxtIFBpeGkgKDEuNCksIFByZSAoMS40KSwgUHJlIDIgKDIuMClcbiAgICAgICAgICAgICggdC52ZXJzaW9uKCd3ZWJPUycpPj0xLjQgJiYgdC5tYXRjaCgnUGFsbXxQcmV8UGl4aScpICkgfHxcbiAgICAgICAgICAgIC8vIFBhbG0gV2ViT1MgMy4wICAtIFRlc3RlZCBvbiBIUCBUb3VjaFBhZFxuICAgICAgICAgICAgdC5tYXRjaCgnaHAuKlRvdWNoUGFkJykgfHxcblxuICAgICAgICAgICAgLy8gRmlyZWZveCBNb2JpbGUgKDEyIEJldGEpIC0gVGVzdGVkIG9uIEFuZHJvaWQgMi4zIGRldmljZVxuICAgICAgICAgICAgKCB0LmlzKCdGaXJlZm94JykgJiYgdC52ZXJzaW9uKCdGaXJlZm94Jyk+PTEyICkgfHxcblxuICAgICAgICAgICAgLy8gQ2hyb21lIGZvciBBbmRyb2lkIC0gVGVzdGVkIG9uIEFuZHJvaWQgNC4wLCA0LjEgZGV2aWNlXG4gICAgICAgICAgICAoIHQuaXMoJ0Nocm9tZScpICYmIHQuaXMoJ0FuZHJvaWRPUycpICYmIHQudmVyc2lvbignQW5kcm9pZCcpPj00LjAgKSB8fFxuXG4gICAgICAgICAgICAvLyBTa3lmaXJlIDQuMSAtIFRlc3RlZCBvbiBBbmRyb2lkIDIuMyBkZXZpY2VcbiAgICAgICAgICAgICggdC5pcygnU2t5ZmlyZScpICYmIHQudmVyc2lvbignU2t5ZmlyZScpPj00LjEgJiYgdC5pcygnQW5kcm9pZE9TJykgJiYgdC52ZXJzaW9uKCdBbmRyb2lkJyk+PTIuMyApIHx8XG5cbiAgICAgICAgICAgIC8vIE9wZXJhIE1vYmlsZSAxMS41LTEyOiBUZXN0ZWQgb24gQW5kcm9pZCAyLjNcbiAgICAgICAgICAgICggdC5pcygnT3BlcmEnKSAmJiB0LnZlcnNpb24oJ09wZXJhIE1vYmknKT4xMSAmJiB0LmlzKCdBbmRyb2lkT1MnKSApIHx8XG5cbiAgICAgICAgICAgIC8vIE1lZWdvIDEuMiAtIFRlc3RlZCBvbiBOb2tpYSA5NTAgYW5kIE45XG4gICAgICAgICAgICB0LmlzKCdNZWVHb09TJykgfHxcblxuICAgICAgICAgICAgLy8gVGl6ZW4gKHByZS1yZWxlYXNlKSAtIFRlc3RlZCBvbiBlYXJseSBoYXJkd2FyZVxuICAgICAgICAgICAgdC5pcygnVGl6ZW4nKSB8fFxuXG4gICAgICAgICAgICAvLyBTYW1zdW5nIEJhZGEgMi4wIC0gVGVzdGVkIG9uIGEgU2Ftc3VuZyBXYXZlIDMsIERvbHBoaW4gYnJvd3NlclxuICAgICAgICAgICAgLy8gQHRvZG86IG1vcmUgdGVzdHMgaGVyZSFcbiAgICAgICAgICAgIHQuaXMoJ0RvbGZpbicpICYmIHQudmVyc2lvbignQmFkYScpPj0yLjAgfHxcblxuICAgICAgICAgICAgLy8gVUMgQnJvd3NlciAtIFRlc3RlZCBvbiBBbmRyb2lkIDIuMyBkZXZpY2VcbiAgICAgICAgICAgICggKHQuaXMoJ1VDIEJyb3dzZXInKSB8fCB0LmlzKCdEb2xmaW4nKSkgJiYgdC52ZXJzaW9uKCdBbmRyb2lkJyk+PTIuMyApIHx8XG5cbiAgICAgICAgICAgIC8vIEtpbmRsZSAzIGFuZCBGaXJlICAtIFRlc3RlZCBvbiB0aGUgYnVpbHQtaW4gV2ViS2l0IGJyb3dzZXIgZm9yIGVhY2hcbiAgICAgICAgICAgICggdC5tYXRjaCgnS2luZGxlIEZpcmUnKSB8fFxuICAgICAgICAgICAgICAgIHQuaXMoJ0tpbmRsZScpICYmIHQudmVyc2lvbignS2luZGxlJyk+PTMuMCApIHx8XG5cbiAgICAgICAgICAgIC8vIE5vb2sgQ29sb3IgMS40LjEgLSBUZXN0ZWQgb24gb3JpZ2luYWwgTm9vayBDb2xvciwgbm90IE5vb2sgVGFibGV0XG4gICAgICAgICAgICB0LmlzKCdBbmRyb2lkT1MnKSAmJiB0LmlzKCdOb29rVGFibGV0JykgfHxcblxuICAgICAgICAgICAgLy8gQ2hyb21lIERlc2t0b3AgMTEtMjEgLSBUZXN0ZWQgb24gT1MgWCAxMC43IGFuZCBXaW5kb3dzIDdcbiAgICAgICAgICAgIHQudmVyc2lvbignQ2hyb21lJyk+PTExICYmICEkaXNNb2JpbGUgfHxcblxuICAgICAgICAgICAgLy8gU2FmYXJpIERlc2t0b3AgNC01IC0gVGVzdGVkIG9uIE9TIFggMTAuNyBhbmQgV2luZG93cyA3XG4gICAgICAgICAgICB0LnZlcnNpb24oJ1NhZmFyaScpPj01LjAgJiYgISRpc01vYmlsZSB8fFxuXG4gICAgICAgICAgICAvLyBGaXJlZm94IERlc2t0b3AgNC0xMyAtIFRlc3RlZCBvbiBPUyBYIDEwLjcgYW5kIFdpbmRvd3MgN1xuICAgICAgICAgICAgdC52ZXJzaW9uKCdGaXJlZm94Jyk+PTQuMCAmJiAhJGlzTW9iaWxlIHx8XG5cbiAgICAgICAgICAgIC8vIEludGVybmV0IEV4cGxvcmVyIDctOSAtIFRlc3RlZCBvbiBXaW5kb3dzIFhQLCBWaXN0YSBhbmQgN1xuICAgICAgICAgICAgdC52ZXJzaW9uKCdNU0lFJyk+PTcuMCAmJiAhJGlzTW9iaWxlIHx8XG5cbiAgICAgICAgICAgIC8vIE9wZXJhIERlc2t0b3AgMTAtMTIgLSBUZXN0ZWQgb24gT1MgWCAxMC43IGFuZCBXaW5kb3dzIDdcbiAgICAgICAgICAgIC8vIEByZWZlcmVuY2U6IGh0dHA6Ly9teS5vcGVyYS5jb20vY29tbXVuaXR5L29wZW53ZWIvaWRvcGVyYS9cbiAgICAgICAgICAgIHQudmVyc2lvbignT3BlcmEnKT49MTAgJiYgISRpc01vYmlsZVxuXG4gICAgICAgICAgICApe1xuICAgICAgICAgICAgcmV0dXJuICdBJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHQub3MoJ2lPUycpICYmIHQudmVyc2lvbignaVBhZCcpPDQuMyB8fFxuICAgICAgICAgICAgdC5vcygnaU9TJykgJiYgdC52ZXJzaW9uKCdpUGhvbmUnKTwzLjEgfHxcbiAgICAgICAgICAgIHQub3MoJ2lPUycpICYmIHQudmVyc2lvbignaVBvZCcpPDMuMSB8fFxuXG4gICAgICAgICAgICAvLyBCbGFja2JlcnJ5IDUuMDogVGVzdGVkIG9uIHRoZSBTdG9ybSAyIDk1NTAsIEJvbGQgOTc3MFxuICAgICAgICAgICAgdC5pcygnQmxhY2tiZXJyeScpICYmIHQudmVyc2lvbignQmxhY2tCZXJyeScpPj01ICYmIHQudmVyc2lvbignQmxhY2tCZXJyeScpPDYgfHxcblxuICAgICAgICAgICAgLy9PcGVyYSBNaW5pICg1LjAtNi41KSAtIFRlc3RlZCBvbiBpT1MgMy4yLzQuMyBhbmQgQW5kcm9pZCAyLjNcbiAgICAgICAgICAgICggdC52ZXJzaW9uKCdPcGVyYSBNaW5pJyk+PTUuMCAmJiB0LnZlcnNpb24oJ09wZXJhIE1pbmknKTw9Ni41ICYmXG4gICAgICAgICAgICAgICAgKHQudmVyc2lvbignQW5kcm9pZCcpPj0yLjMgfHwgdC5pcygnaU9TJykpICkgfHxcblxuICAgICAgICAgICAgLy8gTm9raWEgU3ltYmlhbl4zIC0gVGVzdGVkIG9uIE5va2lhIE44IChTeW1iaWFuXjMpLCBDNyAoU3ltYmlhbl4zKSwgYWxzbyB3b3JrcyBvbiBOOTcgKFN5bWJpYW5eMSlcbiAgICAgICAgICAgIHQubWF0Y2goJ05va2lhTjh8Tm9raWFDN3xOOTcuKlNlcmllczYwfFN5bWJpYW4vMycpIHx8XG5cbiAgICAgICAgICAgIC8vIEB0b2RvOiByZXBvcnQgdGhpcyAodGVzdGVkIG9uIE5va2lhIE43MSlcbiAgICAgICAgICAgIHQudmVyc2lvbignT3BlcmEgTW9iaScpPj0xMSAmJiB0LmlzKCdTeW1iaWFuT1MnKVxuICAgICAgICAgICAgKXtcbiAgICAgICAgICAgIHJldHVybiAnQic7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgIC8vIEJsYWNrYmVycnkgNC54IC0gVGVzdGVkIG9uIHRoZSBDdXJ2ZSA4MzMwXG4gICAgICAgICAgICB0LnZlcnNpb24oJ0JsYWNrQmVycnknKTw1LjAgfHxcbiAgICAgICAgICAgIC8vIFdpbmRvd3MgTW9iaWxlIC0gVGVzdGVkIG9uIHRoZSBIVEMgTGVvIChXaW5NbyA1LjIpXG4gICAgICAgICAgICB0Lm1hdGNoKCdNU0lFTW9iaWxlfFdpbmRvd3MgQ0UuKk1vYmlsZScpIHx8IHQudmVyc2lvbignV2luZG93cyBNb2JpbGUnKTw9NS4yXG5cbiAgICAgICAgICAgICl7XG4gICAgICAgICAgICByZXR1cm4gJ0MnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BbGwgb2xkZXIgc21hcnRwaG9uZSBwbGF0Zm9ybXMgYW5kIGZlYXR1cmVwaG9uZXMgLSBBbnkgZGV2aWNlIHRoYXQgZG9lc24ndCBzdXBwb3J0IG1lZGlhIHF1ZXJpZXNcbiAgICAgICAgLy93aWxsIHJlY2VpdmUgdGhlIGJhc2ljLCBDIGdyYWRlIGV4cGVyaWVuY2UuXG4gICAgICAgIHJldHVybiAnQyc7XG4gICAgfTtcblxuICAgIGltcGwuZGV0ZWN0T1MgPSBmdW5jdGlvbiAodWEpIHtcbiAgICAgICAgcmV0dXJuIGltcGwuZmluZE1hdGNoKGltcGwubW9iaWxlRGV0ZWN0UnVsZXMub3NzMCwgdWEpIHx8XG4gICAgICAgICAgICBpbXBsLmZpbmRNYXRjaChpbXBsLm1vYmlsZURldGVjdFJ1bGVzLm9zcywgdWEpO1xuICAgIH07XG5cbiAgICBpbXBsLmdldERldmljZVNtYWxsZXJTaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LnNjcmVlbi53aWR0aCA8IHdpbmRvdy5zY3JlZW4uaGVpZ2h0ID9cbiAgICAgICAgICAgIHdpbmRvdy5zY3JlZW4ud2lkdGggOlxuICAgICAgICAgICAgd2luZG93LnNjcmVlbi5oZWlnaHQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yIGZvciBNb2JpbGVEZXRlY3Qgb2JqZWN0LlxuICAgICAqIDxicj5cbiAgICAgKiBTdWNoIGFuIG9iamVjdCB3aWxsIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIGdpdmVuIHVzZXItYWdlbnQgc3RyaW5nIGFuZCBjYWNoZSBtb3N0IG9mIHRoZSBkZXRlY3QgcXVlcmllcy48YnI+XG4gICAgICogPGRpdiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNkOWVkZjc7IGJvcmRlcjogMXB4IHNvbGlkICNiY2U4ZjE7IGNvbG9yOiAjM2E4N2FkOyBwYWRkaW5nOiAxNHB4OyBib3JkZXItcmFkaXVzOiAycHg7IG1hcmdpbi10b3A6IDIwcHhcIj5cbiAgICAgKiAgICAgPHN0cm9uZz5GaW5kIGluZm9ybWF0aW9uIGhvdyB0byBkb3dubG9hZCBhbmQgaW5zdGFsbDo8L3N0cm9uZz5cbiAgICAgKiAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9oZ29lYmwvbW9iaWxlLWRldGVjdC5qcy9cIj5naXRodWIuY29tL2hnb2VibC9tb2JpbGUtZGV0ZWN0LmpzLzwvYT5cbiAgICAgKiA8L2Rpdj5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIDxwcmU+XG4gICAgICogICAgIHZhciBtZCA9IG5ldyBNb2JpbGVEZXRlY3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAqICAgICBpZiAobWQubW9iaWxlKCkpIHtcbiAgICAgKiAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAobWQubW9iaWxlR3JhZGUoKSA9PT0gJ0EnKSA/ICcvbW9iaWxlLycgOiAnL2x5bngvJztcbiAgICAgKiAgICAgfVxuICAgICAqIDwvcHJlPlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJBZ2VudCB0eXBpY2FsbHkgdGFrZW4gZnJvbSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCBvciBodHRwX2hlYWRlclsnVXNlci1BZ2VudCddXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFttYXhQaG9uZVdpZHRoPTYwMF0gPHN0cm9uZz5vbmx5IGZvciBicm93c2Vyczwvc3Ryb25nPiBzcGVjaWZ5IGEgdmFsdWUgZm9yIHRoZSBtYXhpbXVtXG4gICAgICogICAgICAgIHdpZHRoIG9mIHNtYWxsZXN0IGRldmljZSBzaWRlIChpbiBsb2dpY2FsIFwiQ1NTXCIgcGl4ZWxzKSB1bnRpbCBhIGRldmljZSBkZXRlY3RlZCBhcyBtb2JpbGUgd2lsbCBiZSBoYW5kbGVkXG4gICAgICogICAgICAgIGFzIHBob25lLlxuICAgICAqICAgICAgICBUaGlzIGlzIG9ubHkgdXNlZCBpbiBjYXNlcyB3aGVyZSB0aGUgZGV2aWNlIGNhbm5vdCBiZSBjbGFzc2lmaWVkIGFzIHBob25lIG9yIHRhYmxldC48YnI+XG4gICAgICogICAgICAgIFNlZSA8YSBocmVmPVwiaHR0cDovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9ndWlkZS9wcmFjdGljZXMvc2NyZWVuc19zdXBwb3J0Lmh0bWxcIj5EZWNsYXJpbmcgVGFibGV0IExheW91dHNcbiAgICAgKiAgICAgICAgZm9yIEFuZHJvaWQ8L2E+Ljxicj5cbiAgICAgKiAgICAgICAgSWYgeW91IHByb3ZpZGUgYSB2YWx1ZSA8IDAsIHRoZW4gdGhpcyBcImZ1enp5XCIgY2hlY2sgaXMgZGlzYWJsZWQuXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGdsb2JhbFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE1vYmlsZURldGVjdCh1c2VyQWdlbnQsIG1heFBob25lV2lkdGgpIHtcbiAgICAgICAgdGhpcy51YSA9IHByZXBhcmVVc2VyQWdlbnQodXNlckFnZW50KTtcbiAgICAgICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICAgICAgLy82MDBkcCBpcyB0eXBpY2FsIDdcIiB0YWJsZXQgbWluaW11bSB3aWR0aFxuICAgICAgICB0aGlzLm1heFBob25lV2lkdGggPSBtYXhQaG9uZVdpZHRoIHx8IDYwMDtcbiAgICB9XG5cbiAgICBNb2JpbGVEZXRlY3QucHJvdG90eXBlID0ge1xuICAgICAgICBjb25zdHJ1Y3RvcjogTW9iaWxlRGV0ZWN0LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBkZXRlY3RlZCBwaG9uZSBvciB0YWJsZXQgdHlwZSBvciA8dHQ+bnVsbDwvdHQ+IGlmIGl0IGlzIG5vdCBhIG1vYmlsZSBkZXZpY2UuXG4gICAgICAgICAqIDxicj5cbiAgICAgICAgICogRm9yIGEgbGlzdCBvZiBwb3NzaWJsZSByZXR1cm4gdmFsdWVzIHNlZSB7QGxpbmsgTW9iaWxlRGV0ZWN0I3Bob25lfSBhbmQge0BsaW5rIE1vYmlsZURldGVjdCN0YWJsZXR9Ljxicj5cbiAgICAgICAgICogPGJyPlxuICAgICAgICAgKiBJZiB0aGUgZGV2aWNlIGlzIG5vdCBkZXRlY3RlZCBieSB0aGUgcmVndWxhciBleHByZXNzaW9ucyBmcm9tIE1vYmlsZS1EZXRlY3QsIGEgdGVzdCBpcyBtYWRlIGFnYWluc3RcbiAgICAgICAgICogdGhlIHBhdHRlcm5zIG9mIDxhIGhyZWY9XCJodHRwOi8vZGV0ZWN0bW9iaWxlYnJvd3NlcnMuY29tL1wiPmRldGVjdG1vYmlsZWJyb3dzZXJzLmNvbTwvYT4uIElmIHRoaXMgdGVzdFxuICAgICAgICAgKiBpcyBwb3NpdGl2ZSwgYSB2YWx1ZSBvZiA8Y29kZT5Vbmtub3duUGhvbmU8L2NvZGU+LCA8Y29kZT5Vbmtub3duVGFibGV0PC9jb2RlPiBvclxuICAgICAgICAgKiA8Y29kZT5Vbmtub3duTW9iaWxlPC9jb2RlPiBpcyByZXR1cm5lZC48YnI+XG4gICAgICAgICAqIFdoZW4gdXNlZCBpbiBicm93c2VyLCB0aGUgZGVjaXNpb24gd2hldGhlciBwaG9uZSBvciB0YWJsZXQgaXMgbWFkZSBiYXNlZCBvbiA8Y29kZT5zY3JlZW4ud2lkdGgvaGVpZ2h0PC9jb2RlPi48YnI+XG4gICAgICAgICAqIDxicj5cbiAgICAgICAgICogV2hlbiB1c2VkIHNlcnZlci1zaWRlIChub2RlLmpzKSwgdGhlcmUgaXMgbm8gd2F5IHRvIHRlbGwgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiA8Y29kZT5Vbmtub3duVGFibGV0PC9jb2RlPlxuICAgICAgICAgKiBhbmQgPGNvZGU+VW5rbm93bk1vYmlsZTwvY29kZT4sIHNvIHlvdSB3aWxsIGdldCA8Y29kZT5Vbmtub3duTW9iaWxlPC9jb2RlPiBoZXJlLjxicj5cbiAgICAgICAgICogQmUgYXdhcmUgdGhhdCBzaW5jZSB2MS4wLjAgaW4gdGhpcyBzcGVjaWFsIGNhc2UgeW91IHdpbGwgZ2V0IDxjb2RlPlVua25vd25Nb2JpbGU8L2NvZGU+IG9ubHkgZm9yOlxuICAgICAgICAgKiB7QGxpbmsgTW9iaWxlRGV0ZWN0I21vYmlsZX0sIG5vdCBmb3Ige0BsaW5rIE1vYmlsZURldGVjdCNwaG9uZX0gYW5kIHtAbGluayBNb2JpbGVEZXRlY3QjdGFibGV0fS5cbiAgICAgICAgICogSW4gdmVyc2lvbnMgYmVmb3JlIHYxLjAuMCBhbGwgMyBtZXRob2RzIHJldHVybmVkIDxjb2RlPlVua25vd25Nb2JpbGU8L2NvZGU+IHdoaWNoIHdhcyB0ZWRpb3VzIHRvIHVzZS5cbiAgICAgICAgICogPGJyPlxuICAgICAgICAgKiBJbiBtb3N0IGNhc2VzIHlvdSB3aWxsIHVzZSB0aGUgcmV0dXJuIHZhbHVlIGp1c3QgYXMgYSBib29sZWFuLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUga2V5IGZvciB0aGUgcGhvbmUgZmFtaWx5IG9yIHRhYmxldCBmYW1pbHksIGUuZy4gXCJOZXh1c1wiLlxuICAgICAgICAgKiBAZnVuY3Rpb24gTW9iaWxlRGV0ZWN0I21vYmlsZVxuICAgICAgICAgKi9cbiAgICAgICAgbW9iaWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpbXBsLnByZXBhcmVEZXRlY3Rpb25DYWNoZSh0aGlzLl9jYWNoZSwgdGhpcy51YSwgdGhpcy5tYXhQaG9uZVdpZHRoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYWNoZS5tb2JpbGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGRldGVjdGVkIHBob25lIHR5cGUvZmFtaWx5IHN0cmluZyBvciA8dHQ+bnVsbDwvdHQ+LlxuICAgICAgICAgKiA8YnI+XG4gICAgICAgICAqIFRoZSByZXR1cm5lZCB0YWJsZXQgKGZhbWlseSBvciBwcm9kdWNlcikgaXMgb25lIG9mIGZvbGxvd2luZyBrZXlzOjxicj5cbiAgICAgICAgICogPGJyPjx0dD5pUGhvbmUsIEJsYWNrQmVycnksIEhUQywgTmV4dXMsIERlbGwsIE1vdG9yb2xhLCBTYW1zdW5nLCBMRywgU29ueSwgQXN1cyxcbiAgICAgICAgICogTm9raWFMdW1pYSwgTWljcm9tYXgsIFBhbG0sIFZlcnR1LCBQYW50ZWNoLCBGbHksIFdpa28sIGlNb2JpbGUsIFNpbVZhbGxleSxcbiAgICAgICAgICogV29sZmdhbmcsIEFsY2F0ZWwsIE5pbnRlbmRvLCBBbW9pLCBJTlEsIEdlbmVyaWNQaG9uZTwvdHQ+PGJyPlxuICAgICAgICAgKiA8YnI+XG4gICAgICAgICAqIElmIHRoZSBkZXZpY2UgaXMgbm90IGRldGVjdGVkIGJ5IHRoZSByZWd1bGFyIGV4cHJlc3Npb25zIGZyb20gTW9iaWxlLURldGVjdCwgYSB0ZXN0IGlzIG1hZGUgYWdhaW5zdFxuICAgICAgICAgKiB0aGUgcGF0dGVybnMgb2YgPGEgaHJlZj1cImh0dHA6Ly9kZXRlY3Rtb2JpbGVicm93c2Vycy5jb20vXCI+ZGV0ZWN0bW9iaWxlYnJvd3NlcnMuY29tPC9hPi4gSWYgdGhpcyB0ZXN0XG4gICAgICAgICAqIGlzIHBvc2l0aXZlLCBhIHZhbHVlIG9mIDxjb2RlPlVua25vd25QaG9uZTwvY29kZT4gb3IgPGNvZGU+VW5rbm93bk1vYmlsZTwvY29kZT4gaXMgcmV0dXJuZWQuPGJyPlxuICAgICAgICAgKiBXaGVuIHVzZWQgaW4gYnJvd3NlciwgdGhlIGRlY2lzaW9uIHdoZXRoZXIgcGhvbmUgb3IgdGFibGV0IGlzIG1hZGUgYmFzZWQgb24gPGNvZGU+c2NyZWVuLndpZHRoL2hlaWdodDwvY29kZT4uPGJyPlxuICAgICAgICAgKiA8YnI+XG4gICAgICAgICAqIFdoZW4gdXNlZCBzZXJ2ZXItc2lkZSAobm9kZS5qcyksIHRoZXJlIGlzIG5vIHdheSB0byB0ZWxsIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gPGNvZGU+VW5rbm93blRhYmxldDwvY29kZT5cbiAgICAgICAgICogYW5kIDxjb2RlPlVua25vd25Nb2JpbGU8L2NvZGU+LCBzbyB5b3Ugd2lsbCBnZXQgPGNvZGU+bnVsbDwvY29kZT4gaGVyZSwgd2hpbGUge0BsaW5rIE1vYmlsZURldGVjdCNtb2JpbGV9XG4gICAgICAgICAqIHdpbGwgcmV0dXJuIDxjb2RlPlVua25vd25Nb2JpbGU8L2NvZGU+Ljxicj5cbiAgICAgICAgICogQmUgYXdhcmUgdGhhdCBzaW5jZSB2MS4wLjAgaW4gdGhpcyBzcGVjaWFsIGNhc2UgeW91IHdpbGwgZ2V0IDxjb2RlPlVua25vd25Nb2JpbGU8L2NvZGU+IG9ubHkgZm9yOlxuICAgICAgICAgKiB7QGxpbmsgTW9iaWxlRGV0ZWN0I21vYmlsZX0sIG5vdCBmb3Ige0BsaW5rIE1vYmlsZURldGVjdCNwaG9uZX0gYW5kIHtAbGluayBNb2JpbGVEZXRlY3QjdGFibGV0fS5cbiAgICAgICAgICogSW4gdmVyc2lvbnMgYmVmb3JlIHYxLjAuMCBhbGwgMyBtZXRob2RzIHJldHVybmVkIDxjb2RlPlVua25vd25Nb2JpbGU8L2NvZGU+IHdoaWNoIHdhcyB0ZWRpb3VzIHRvIHVzZS5cbiAgICAgICAgICogPGJyPlxuICAgICAgICAgKiBJbiBtb3N0IGNhc2VzIHlvdSB3aWxsIHVzZSB0aGUgcmV0dXJuIHZhbHVlIGp1c3QgYXMgYSBib29sZWFuLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUga2V5IG9mIHRoZSBwaG9uZSBmYW1pbHkgb3IgcHJvZHVjZXIsIGUuZy4gXCJpUGhvbmVcIlxuICAgICAgICAgKiBAZnVuY3Rpb24gTW9iaWxlRGV0ZWN0I3Bob25lXG4gICAgICAgICAqL1xuICAgICAgICBwaG9uZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW1wbC5wcmVwYXJlRGV0ZWN0aW9uQ2FjaGUodGhpcy5fY2FjaGUsIHRoaXMudWEsIHRoaXMubWF4UGhvbmVXaWR0aCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGUucGhvbmU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGRldGVjdGVkIHRhYmxldCB0eXBlL2ZhbWlseSBzdHJpbmcgb3IgPHR0Pm51bGw8L3R0Pi5cbiAgICAgICAgICogPGJyPlxuICAgICAgICAgKiBUaGUgcmV0dXJuZWQgdGFibGV0IChmYW1pbHkgb3IgcHJvZHVjZXIpIGlzIG9uZSBvZiBmb2xsb3dpbmcga2V5czo8YnI+XG4gICAgICAgICAqIDxicj48dHQ+aVBhZCwgTmV4dXNUYWJsZXQsIFNhbXN1bmdUYWJsZXQsIEtpbmRsZSwgU3VyZmFjZVRhYmxldCwgSFBUYWJsZXQsIEFzdXNUYWJsZXQsXG4gICAgICAgICAqIEJsYWNrQmVycnlUYWJsZXQsIEhUQ3RhYmxldCwgTW90b3JvbGFUYWJsZXQsIE5vb2tUYWJsZXQsIEFjZXJUYWJsZXQsXG4gICAgICAgICAqIFRvc2hpYmFUYWJsZXQsIExHVGFibGV0LCBGdWppdHN1VGFibGV0LCBQcmVzdGlnaW9UYWJsZXQsIExlbm92b1RhYmxldCxcbiAgICAgICAgICogRGVsbFRhYmxldCwgWWFydmlrVGFibGV0LCBNZWRpb25UYWJsZXQsIEFybm92YVRhYmxldCwgSW50ZW5zb1RhYmxldCwgSVJVVGFibGV0LFxuICAgICAgICAgKiBNZWdhZm9uVGFibGV0LCBFYm9kYVRhYmxldCwgQWxsVmlld1RhYmxldCwgQXJjaG9zVGFibGV0LCBBaW5vbFRhYmxldCxcbiAgICAgICAgICogTm9raWFMdW1pYVRhYmxldCwgU29ueVRhYmxldCwgUGhpbGlwc1RhYmxldCwgQ3ViZVRhYmxldCwgQ29ieVRhYmxldCwgTUlEVGFibGV0LFxuICAgICAgICAgKiBNU0lUYWJsZXQsIFNNaVRUYWJsZXQsIFJvY2tDaGlwVGFibGV0LCBGbHlUYWJsZXQsIGJxVGFibGV0LCBIdWF3ZWlUYWJsZXQsXG4gICAgICAgICAqIE5lY1RhYmxldCwgUGFudGVjaFRhYmxldCwgQnJvbmNob1RhYmxldCwgVmVyc3VzVGFibGV0LCBaeW5jVGFibGV0LFxuICAgICAgICAgKiBQb3NpdGl2b1RhYmxldCwgTmFiaVRhYmxldCwgS29ib1RhYmxldCwgRGFuZXdUYWJsZXQsIFRleGV0VGFibGV0LFxuICAgICAgICAgKiBQbGF5c3RhdGlvblRhYmxldCwgVHJla3N0b3JUYWJsZXQsIFB5bGVBdWRpb1RhYmxldCwgQWR2YW5UYWJsZXQsXG4gICAgICAgICAqIERhbnlUZWNoVGFibGV0LCBHYWxhcGFkVGFibGV0LCBNaWNyb21heFRhYmxldCwgS2FyYm9ublRhYmxldCwgQWxsRmluZVRhYmxldCxcbiAgICAgICAgICogUFJPU0NBTlRhYmxldCwgWU9ORVNUYWJsZXQsIENoYW5nSmlhVGFibGV0LCBHVVRhYmxldCwgUG9pbnRPZlZpZXdUYWJsZXQsXG4gICAgICAgICAqIE92ZXJtYXhUYWJsZXQsIEhDTFRhYmxldCwgRFBTVGFibGV0LCBWaXN0dXJlVGFibGV0LCBDcmVzdGFUYWJsZXQsXG4gICAgICAgICAqIE1lZGlhdGVrVGFibGV0LCBDb25jb3JkZVRhYmxldCwgR29DbGV2ZXJUYWJsZXQsIE1vZGVjb21UYWJsZXQsIFZvbmlub1RhYmxldCxcbiAgICAgICAgICogRUNTVGFibGV0LCBTdG9yZXhUYWJsZXQsIFZvZGFmb25lVGFibGV0LCBFc3NlbnRpZWxCVGFibGV0LCBSb3NzTW9vclRhYmxldCxcbiAgICAgICAgICogaU1vYmlsZVRhYmxldCwgVG9saW5vVGFibGV0LCBBdWRpb1NvbmljVGFibGV0LCBBTVBFVGFibGV0LCBTa2tUYWJsZXQsXG4gICAgICAgICAqIFRlY25vVGFibGV0LCBKWERUYWJsZXQsIGlKb3lUYWJsZXQsIEZYMlRhYmxldCwgWG9yb1RhYmxldCwgVmlld3NvbmljVGFibGV0LFxuICAgICAgICAgKiBWZXJpem9uVGFibGV0LCBPZHlzVGFibGV0LCBDYXB0aXZhVGFibGV0LCBJY29uYml0VGFibGV0LCBUZWNsYXN0VGFibGV0LFxuICAgICAgICAgKiBPbmRhVGFibGV0LCBKYXl0ZWNoVGFibGV0LCBCbGF1cHVua3RUYWJsZXQsIERpZ21hVGFibGV0LCBFdm9saW9UYWJsZXQsXG4gICAgICAgICAqIExhdmFUYWJsZXQsIEFvY1RhYmxldCwgTXBtYW5UYWJsZXQsIENlbGtvblRhYmxldCwgV29sZGVyVGFibGV0LCBNaVRhYmxldCxcbiAgICAgICAgICogTmliaXJ1VGFibGV0LCBOZXhvVGFibGV0LCBMZWFkZXJUYWJsZXQsIFViaXNsYXRlVGFibGV0LCBQb2NrZXRCb29rVGFibGV0LFxuICAgICAgICAgKiBLb2Nhc29UYWJsZXQsIEhpc2Vuc2VUYWJsZXQsIEh1ZGwsIFRlbHN0cmFUYWJsZXQsIEdlbmVyaWNUYWJsZXQ8L3R0Pjxicj5cbiAgICAgICAgICogPGJyPlxuICAgICAgICAgKiBJZiB0aGUgZGV2aWNlIGlzIG5vdCBkZXRlY3RlZCBieSB0aGUgcmVndWxhciBleHByZXNzaW9ucyBmcm9tIE1vYmlsZS1EZXRlY3QsIGEgdGVzdCBpcyBtYWRlIGFnYWluc3RcbiAgICAgICAgICogdGhlIHBhdHRlcm5zIG9mIDxhIGhyZWY9XCJodHRwOi8vZGV0ZWN0bW9iaWxlYnJvd3NlcnMuY29tL1wiPmRldGVjdG1vYmlsZWJyb3dzZXJzLmNvbTwvYT4uIElmIHRoaXMgdGVzdFxuICAgICAgICAgKiBpcyBwb3NpdGl2ZSwgYSB2YWx1ZSBvZiA8Y29kZT5Vbmtub3duVGFibGV0PC9jb2RlPiBvciA8Y29kZT5Vbmtub3duTW9iaWxlPC9jb2RlPiBpcyByZXR1cm5lZC48YnI+XG4gICAgICAgICAqIFdoZW4gdXNlZCBpbiBicm93c2VyLCB0aGUgZGVjaXNpb24gd2hldGhlciBwaG9uZSBvciB0YWJsZXQgaXMgbWFkZSBiYXNlZCBvbiA8Y29kZT5zY3JlZW4ud2lkdGgvaGVpZ2h0PC9jb2RlPi48YnI+XG4gICAgICAgICAqIDxicj5cbiAgICAgICAgICogV2hlbiB1c2VkIHNlcnZlci1zaWRlIChub2RlLmpzKSwgdGhlcmUgaXMgbm8gd2F5IHRvIHRlbGwgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiA8Y29kZT5Vbmtub3duVGFibGV0PC9jb2RlPlxuICAgICAgICAgKiBhbmQgPGNvZGU+VW5rbm93bk1vYmlsZTwvY29kZT4sIHNvIHlvdSB3aWxsIGdldCA8Y29kZT5udWxsPC9jb2RlPiBoZXJlLCB3aGlsZSB7QGxpbmsgTW9iaWxlRGV0ZWN0I21vYmlsZX1cbiAgICAgICAgICogd2lsbCByZXR1cm4gPGNvZGU+VW5rbm93bk1vYmlsZTwvY29kZT4uPGJyPlxuICAgICAgICAgKiBCZSBhd2FyZSB0aGF0IHNpbmNlIHYxLjAuMCBpbiB0aGlzIHNwZWNpYWwgY2FzZSB5b3Ugd2lsbCBnZXQgPGNvZGU+VW5rbm93bk1vYmlsZTwvY29kZT4gb25seSBmb3I6XG4gICAgICAgICAqIHtAbGluayBNb2JpbGVEZXRlY3QjbW9iaWxlfSwgbm90IGZvciB7QGxpbmsgTW9iaWxlRGV0ZWN0I3Bob25lfSBhbmQge0BsaW5rIE1vYmlsZURldGVjdCN0YWJsZXR9LlxuICAgICAgICAgKiBJbiB2ZXJzaW9ucyBiZWZvcmUgdjEuMC4wIGFsbCAzIG1ldGhvZHMgcmV0dXJuZWQgPGNvZGU+VW5rbm93bk1vYmlsZTwvY29kZT4gd2hpY2ggd2FzIHRlZGlvdXMgdG8gdXNlLlxuICAgICAgICAgKiA8YnI+XG4gICAgICAgICAqIEluIG1vc3QgY2FzZXMgeW91IHdpbGwgdXNlIHRoZSByZXR1cm4gdmFsdWUganVzdCBhcyBhIGJvb2xlYW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBrZXkgb2YgdGhlIHRhYmxldCBmYW1pbHkgb3IgcHJvZHVjZXIsIGUuZy4gXCJTYW1zdW5nVGFibGV0XCJcbiAgICAgICAgICogQGZ1bmN0aW9uIE1vYmlsZURldGVjdCN0YWJsZXRcbiAgICAgICAgICovXG4gICAgICAgIHRhYmxldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW1wbC5wcmVwYXJlRGV0ZWN0aW9uQ2FjaGUodGhpcy5fY2FjaGUsIHRoaXMudWEsIHRoaXMubWF4UGhvbmVXaWR0aCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGUudGFibGV0O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSAoZmlyc3QpIGRldGVjdGVkIHVzZXItYWdlbnQgc3RyaW5nIG9yIDx0dD5udWxsPC90dD4uXG4gICAgICAgICAqIDxicj5cbiAgICAgICAgICogVGhlIHJldHVybmVkIHVzZXItYWdlbnQgaXMgb25lIG9mIGZvbGxvd2luZyBrZXlzOjxicj5cbiAgICAgICAgICogPGJyPjx0dD5DaHJvbWUsIERvbGZpbiwgT3BlcmEsIFNreWZpcmUsIEVkZ2UsIElFLCBGaXJlZm94LCBCb2x0LCBUZWFTaGFyaywgQmxhemVyLFxuICAgICAgICAgKiBTYWZhcmksIFVDQnJvd3NlciwgYmFpZHVib3hhcHAsIGJhaWR1YnJvd3NlciwgRGlpZ29Ccm93c2VyLCBQdWZmaW4sIE1lcmN1cnksXG4gICAgICAgICAqIE9iaWdvQnJvd3NlciwgTmV0RnJvbnQsIEdlbmVyaWNCcm93c2VyLCBQYWxlTW9vbjwvdHQ+PGJyPlxuICAgICAgICAgKiA8YnI+XG4gICAgICAgICAqIEluIG1vc3QgY2FzZXMgY2FsbGluZyB7QGxpbmsgTW9iaWxlRGV0ZWN0I3VzZXJBZ2VudH0gd2lsbCBiZSBzdWZmaWNpZW50LiBCdXQgdGhlcmUgYXJlIHJhcmVcbiAgICAgICAgICogY2FzZXMgd2hlcmUgYSBtb2JpbGUgZGV2aWNlIHByZXRlbmRzIHRvIGJlIG1vcmUgdGhhbiBvbmUgcGFydGljdWxhciBicm93c2VyLiBZb3UgY2FuIGdldCB0aGVcbiAgICAgICAgICogbGlzdCBvZiBhbGwgbWF0Y2hlcyB3aXRoIHtAbGluayBNb2JpbGVEZXRlY3QjdXNlckFnZW50c30gb3IgY2hlY2sgZm9yIGEgcGFydGljdWxhciB2YWx1ZSBieVxuICAgICAgICAgKiBwcm92aWRpbmcgb25lIG9mIHRoZSBkZWZpbmVkIGtleXMgYXMgZmlyc3QgYXJndW1lbnQgdG8ge0BsaW5rIE1vYmlsZURldGVjdCNpc30uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBrZXkgZm9yIHRoZSBkZXRlY3RlZCB1c2VyLWFnZW50IG9yIDx0dD5udWxsPC90dD5cbiAgICAgICAgICogQGZ1bmN0aW9uIE1vYmlsZURldGVjdCN1c2VyQWdlbnRcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJBZ2VudDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlLnVzZXJBZ2VudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUudXNlckFnZW50ID0gaW1wbC5maW5kTWF0Y2goaW1wbC5tb2JpbGVEZXRlY3RSdWxlcy51YXMsIHRoaXMudWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlLnVzZXJBZ2VudDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyBhbGwgZGV0ZWN0ZWQgdXNlci1hZ2VudCBzdHJpbmdzLlxuICAgICAgICAgKiA8YnI+XG4gICAgICAgICAqIFRoZSBhcnJheSBpcyBlbXB0eSBvciBjb250YWlucyBvbmUgb3IgbW9yZSBvZiBmb2xsb3dpbmcga2V5czo8YnI+XG4gICAgICAgICAqIDxicj48dHQ+Q2hyb21lLCBEb2xmaW4sIE9wZXJhLCBTa3lmaXJlLCBFZGdlLCBJRSwgRmlyZWZveCwgQm9sdCwgVGVhU2hhcmssIEJsYXplcixcbiAgICAgICAgICogU2FmYXJpLCBVQ0Jyb3dzZXIsIGJhaWR1Ym94YXBwLCBiYWlkdWJyb3dzZXIsIERpaWdvQnJvd3NlciwgUHVmZmluLCBNZXJjdXJ5LFxuICAgICAgICAgKiBPYmlnb0Jyb3dzZXIsIE5ldEZyb250LCBHZW5lcmljQnJvd3NlciwgUGFsZU1vb248L3R0Pjxicj5cbiAgICAgICAgICogPGJyPlxuICAgICAgICAgKiBJbiBtb3N0IGNhc2VzIGNhbGxpbmcge0BsaW5rIE1vYmlsZURldGVjdCN1c2VyQWdlbnR9IHdpbGwgYmUgc3VmZmljaWVudC4gQnV0IHRoZXJlIGFyZSByYXJlXG4gICAgICAgICAqIGNhc2VzIHdoZXJlIGEgbW9iaWxlIGRldmljZSBwcmV0ZW5kcyB0byBiZSBtb3JlIHRoYW4gb25lIHBhcnRpY3VsYXIgYnJvd3Nlci4gWW91IGNhbiBnZXQgdGhlXG4gICAgICAgICAqIGxpc3Qgb2YgYWxsIG1hdGNoZXMgd2l0aCB7QGxpbmsgTW9iaWxlRGV0ZWN0I3VzZXJBZ2VudHN9IG9yIGNoZWNrIGZvciBhIHBhcnRpY3VsYXIgdmFsdWUgYnlcbiAgICAgICAgICogcHJvdmlkaW5nIG9uZSBvZiB0aGUgZGVmaW5lZCBrZXlzIGFzIGZpcnN0IGFyZ3VtZW50IHRvIHtAbGluayBNb2JpbGVEZXRlY3QjaXN9LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9IHRoZSBhcnJheSBvZiBkZXRlY3RlZCB1c2VyLWFnZW50IGtleXMgb3IgPHR0PltdPC90dD5cbiAgICAgICAgICogQGZ1bmN0aW9uIE1vYmlsZURldGVjdCN1c2VyQWdlbnRzXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyQWdlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2FjaGUudXNlckFnZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUudXNlckFnZW50cyA9IGltcGwuZmluZE1hdGNoZXMoaW1wbC5tb2JpbGVEZXRlY3RSdWxlcy51YXMsIHRoaXMudWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlLnVzZXJBZ2VudHM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGRldGVjdGVkIG9wZXJhdGluZyBzeXN0ZW0gc3RyaW5nIG9yIDx0dD5udWxsPC90dD4uXG4gICAgICAgICAqIDxicj5cbiAgICAgICAgICogVGhlIG9wZXJhdGluZyBzeXN0ZW0gaXMgb25lIG9mIGZvbGxvd2luZyBrZXlzOjxicj5cbiAgICAgICAgICogPGJyPjx0dD5BbmRyb2lkT1MsIEJsYWNrQmVycnlPUywgUGFsbU9TLCBTeW1iaWFuT1MsIFdpbmRvd3NNb2JpbGVPUywgV2luZG93c1Bob25lT1MsXG4gICAgICAgICAqIGlPUywgTWVlR29PUywgTWFlbW9PUywgSmF2YU9TLCB3ZWJPUywgYmFkYU9TLCBCUkVXT1M8L3R0Pjxicj5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge1N0cmluZ30gdGhlIGtleSBmb3IgdGhlIGRldGVjdGVkIG9wZXJhdGluZyBzeXN0ZW0uXG4gICAgICAgICAqIEBmdW5jdGlvbiBNb2JpbGVEZXRlY3Qjb3NcbiAgICAgICAgICovXG4gICAgICAgIG9zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2FjaGUub3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlLm9zID0gaW1wbC5kZXRlY3RPUyh0aGlzLnVhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYWNoZS5vcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSB2ZXJzaW9uIChhcyBOdW1iZXIpIG9mIHRoZSBnaXZlbiBwcm9wZXJ0eSBpbiB0aGUgVXNlci1BZ2VudC5cbiAgICAgICAgICogPGJyPlxuICAgICAgICAgKiBXaWxsIHJldHVybiBhIGZsb2F0IG51bWJlci4gKGVnLiAyXzAgd2lsbCByZXR1cm4gMi4wLCA0LjMuMSB3aWxsIHJldHVybiA0LjMxKVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IGEga2V5IGRlZmluaW5nIGEgdGhpbmcgd2hpY2ggaGFzIGEgdmVyc2lvbi48YnI+XG4gICAgICAgICAqICAgICAgICBZb3UgY2FuIHVzZSBvbmUgb2YgZm9sbG93aW5nIGtleXM6PGJyPlxuICAgICAgICAgKiA8YnI+PHR0Pk1vYmlsZSwgQnVpbGQsIFZlcnNpb24sIFZlbmRvcklELCBpUGFkLCBpUGhvbmUsIGlQb2QsIEtpbmRsZSwgQ2hyb21lLCBDb2FzdCxcbiAgICAgICAgICogRG9sZmluLCBGaXJlZm94LCBGZW5uZWMsIEVkZ2UsIElFLCBOZXRGcm9udCwgTm9raWFCcm93c2VyLCBPcGVyYSwgT3BlcmEgTWluaSxcbiAgICAgICAgICogT3BlcmEgTW9iaSwgVUNCcm93c2VyLCBNUVFCcm93c2VyLCBNaWNyb01lc3NlbmdlciwgYmFpZHVib3hhcHAsIGJhaWR1YnJvd3NlcixcbiAgICAgICAgICogU2Ftc3VuZ0Jyb3dzZXIsIElyb24sIFNhZmFyaSwgU2t5ZmlyZSwgVGl6ZW4sIFdlYmtpdCwgUGFsZU1vb24sIEdlY2tvLCBUcmlkZW50LFxuICAgICAgICAgKiBQcmVzdG8sIEdvYW5uYSwgaU9TLCBBbmRyb2lkLCBCbGFja0JlcnJ5LCBCUkVXLCBKYXZhLCBXaW5kb3dzIFBob25lIE9TLCBXaW5kb3dzXG4gICAgICAgICAqIFBob25lLCBXaW5kb3dzIENFLCBXaW5kb3dzIE5ULCBTeW1iaWFuLCB3ZWJPUzwvdHQ+PGJyPlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgdmVyc2lvbiBhcyBmbG9hdCBvciA8dHQ+TmFOPC90dD4gaWYgVXNlci1BZ2VudCBkb2Vzbid0IGNvbnRhaW4gdGhpcyB2ZXJzaW9uLlxuICAgICAgICAgKiAgICAgICAgICBCZSBjYXJlZnVsIHdoZW4gY29tcGFyaW5nIHRoaXMgdmFsdWUgd2l0aCAnPT0nIG9wZXJhdG9yIVxuICAgICAgICAgKiBAZnVuY3Rpb24gTW9iaWxlRGV0ZWN0I3ZlcnNpb25cbiAgICAgICAgICovXG4gICAgICAgIHZlcnNpb246IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbXBsLmdldFZlcnNpb24oa2V5LCB0aGlzLnVhKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSB2ZXJzaW9uIChhcyBTdHJpbmcpIG9mIHRoZSBnaXZlbiBwcm9wZXJ0eSBpbiB0aGUgVXNlci1BZ2VudC5cbiAgICAgICAgICogPGJyPlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IGEga2V5IGRlZmluaW5nIGEgdGhpbmcgd2hpY2ggaGFzIGEgdmVyc2lvbi48YnI+XG4gICAgICAgICAqICAgICAgICBZb3UgY2FuIHVzZSBvbmUgb2YgZm9sbG93aW5nIGtleXM6PGJyPlxuICAgICAgICAgKiA8YnI+PHR0Pk1vYmlsZSwgQnVpbGQsIFZlcnNpb24sIFZlbmRvcklELCBpUGFkLCBpUGhvbmUsIGlQb2QsIEtpbmRsZSwgQ2hyb21lLCBDb2FzdCxcbiAgICAgICAgICogRG9sZmluLCBGaXJlZm94LCBGZW5uZWMsIEVkZ2UsIElFLCBOZXRGcm9udCwgTm9raWFCcm93c2VyLCBPcGVyYSwgT3BlcmEgTWluaSxcbiAgICAgICAgICogT3BlcmEgTW9iaSwgVUNCcm93c2VyLCBNUVFCcm93c2VyLCBNaWNyb01lc3NlbmdlciwgYmFpZHVib3hhcHAsIGJhaWR1YnJvd3NlcixcbiAgICAgICAgICogU2Ftc3VuZ0Jyb3dzZXIsIElyb24sIFNhZmFyaSwgU2t5ZmlyZSwgVGl6ZW4sIFdlYmtpdCwgUGFsZU1vb24sIEdlY2tvLCBUcmlkZW50LFxuICAgICAgICAgKiBQcmVzdG8sIEdvYW5uYSwgaU9TLCBBbmRyb2lkLCBCbGFja0JlcnJ5LCBCUkVXLCBKYXZhLCBXaW5kb3dzIFBob25lIE9TLCBXaW5kb3dzXG4gICAgICAgICAqIFBob25lLCBXaW5kb3dzIENFLCBXaW5kb3dzIE5ULCBTeW1iaWFuLCB3ZWJPUzwvdHQ+PGJyPlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgXCJyYXdcIiB2ZXJzaW9uIGFzIFN0cmluZyBvciA8dHQ+bnVsbDwvdHQ+IGlmIFVzZXItQWdlbnQgZG9lc24ndCBjb250YWluIHRoaXMgdmVyc2lvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQGZ1bmN0aW9uIE1vYmlsZURldGVjdCN2ZXJzaW9uU3RyXG4gICAgICAgICAqL1xuICAgICAgICB2ZXJzaW9uU3RyOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gaW1wbC5nZXRWZXJzaW9uU3RyKGtleSwgdGhpcy51YSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdsb2JhbCB0ZXN0IGtleSBhZ2FpbnN0IHVzZXJBZ2VudCwgb3MsIHBob25lLCB0YWJsZXQgYW5kIHNvbWUgb3RoZXIgcHJvcGVydGllcyBvZiB1c2VyQWdlbnQgc3RyaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IHRoZSBrZXkgKGNhc2UtaW5zZW5zaXRpdmUpIG9mIGEgdXNlckFnZW50LCBhbiBvcGVyYXRpbmcgc3lzdGVtLCBwaG9uZSBvclxuICAgICAgICAgKiAgICAgICAgdGFibGV0IGZhbWlseS48YnI+XG4gICAgICAgICAqICAgICAgICBGb3IgYSBjb21wbGV0ZSBsaXN0IG9mIHBvc3NpYmxlIHZhbHVlcywgc2VlIHtAbGluayBNb2JpbGVEZXRlY3QjdXNlckFnZW50fSxcbiAgICAgICAgICogICAgICAgIHtAbGluayBNb2JpbGVEZXRlY3Qjb3N9LCB7QGxpbmsgTW9iaWxlRGV0ZWN0I3Bob25lfSwge0BsaW5rIE1vYmlsZURldGVjdCN0YWJsZXR9Ljxicj5cbiAgICAgICAgICogICAgICAgIEFkZGl0aW9uYWxseSB5b3UgaGF2ZSBmb2xsb3dpbmcga2V5czo8YnI+XG4gICAgICAgICAqIDxicj48dHQ+Qm90LCBNb2JpbGVCb3QsIERlc2t0b3BNb2RlLCBUViwgV2ViS2l0LCBDb25zb2xlLCBXYXRjaDwvdHQ+PGJyPlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gPHR0PnRydWU8L3R0PiB3aGVuIHRoZSBnaXZlbiBrZXkgaXMgb25lIG9mIHRoZSBkZWZpbmVkIGtleXMgb2YgdXNlckFnZW50LCBvcywgcGhvbmUsXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICB0YWJsZXQgb3Igb25lIG9mIHRoZSBsaXN0ZWQgYWRkaXRpb25hbCBrZXlzLCBvdGhlcndpc2UgPHR0PmZhbHNlPC90dD5cbiAgICAgICAgICogQGZ1bmN0aW9uIE1vYmlsZURldGVjdCNpc1xuICAgICAgICAgKi9cbiAgICAgICAgaXM6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBjb250YWluc0lDKHRoaXMudXNlckFnZW50cygpLCBrZXkpIHx8XG4gICAgICAgICAgICAgICAgICAgZXF1YWxJQyhrZXksIHRoaXMub3MoKSkgfHxcbiAgICAgICAgICAgICAgICAgICBlcXVhbElDKGtleSwgdGhpcy5waG9uZSgpKSB8fFxuICAgICAgICAgICAgICAgICAgIGVxdWFsSUMoa2V5LCB0aGlzLnRhYmxldCgpKSB8fFxuICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zSUMoaW1wbC5maW5kTWF0Y2hlcyhpbXBsLm1vYmlsZURldGVjdFJ1bGVzLnV0aWxzLCB0aGlzLnVhKSwga2V5KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRG8gYSBxdWljayB0ZXN0IGFnYWluc3QgbmF2aWdhdG9yOjp1c2VyQWdlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gcGF0dGVybiB0aGUgcGF0dGVybiwgZWl0aGVyIGFzIFN0cmluZyBvciBSZWdFeHBcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAoYSBzdHJpbmcgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYSBjYXNlLWluc2Vuc2l0aXZlIFJlZ0V4cCkuXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSA8dHQ+dHJ1ZTwvdHQ+IHdoZW4gdGhlIHBhdHRlcm4gbWF0Y2hlcywgb3RoZXJ3aXNlIDx0dD5mYWxzZTwvdHQ+XG4gICAgICAgICAqIEBmdW5jdGlvbiBNb2JpbGVEZXRlY3QjbWF0Y2hcbiAgICAgICAgICovXG4gICAgICAgIG1hdGNoOiBmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgICAgICAgaWYgKCEocGF0dGVybiBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgICAgICAgICBwYXR0ZXJuID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhdHRlcm4udGVzdCh0aGlzLnVhKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIG1vYmlsZSBkZXZpY2UgY2FuIGJlIGNvbnNpZGVyZWQgYXMgcGhvbmUgcmVnYXJkaW5nIDxjb2RlPnNjcmVlbi53aWR0aDwvY29kZT4uXG4gICAgICAgICAqIDxicj5cbiAgICAgICAgICogT2J2aW91c2x5IHRoaXMgbWV0aG9kIG1ha2VzIHNlbnNlIGluIGJyb3dzZXIgZW52aXJvbm1lbnRzIG9ubHkgKG5vdCBmb3IgTm9kZS5qcykhXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4UGhvbmVXaWR0aF0gdGhlIG1heGltdW0gbG9naWNhbCBwaXhlbHMgKGFrYS4gQ1NTLXBpeGVscykgdG8gYmUgY29uc2lkZXJlZCBhcyBwaG9uZS48YnI+XG4gICAgICAgICAqICAgICAgICBUaGUgYXJndW1lbnQgaXMgb3B0aW9uYWwgYW5kIGlmIG5vdCBwcmVzZW50IG9yIGZhbHN5LCB0aGUgdmFsdWUgb2YgdGhlIGNvbnN0cnVjdG9yIGlzIHRha2VuLlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbnx1bmRlZmluZWR9IDxjb2RlPnVuZGVmaW5lZDwvY29kZT4gaWYgc2NyZWVuIHNpemUgd2Fzbid0IGRldGVjdGFibGUsIGVsc2UgPGNvZGU+dHJ1ZTwvY29kZT5cbiAgICAgICAgICogICAgICAgICAgd2hlbiBzY3JlZW4ud2lkdGggaXMgbGVzcyBvciBlcXVhbCB0byBtYXhQaG9uZVdpZHRoLCBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+Ljxicj5cbiAgICAgICAgICogICAgICAgICAgV2lsbCBhbHdheXMgcmV0dXJuIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4gc2VydmVyLXNpZGUuXG4gICAgICAgICAqL1xuICAgICAgICBpc1Bob25lU2l6ZWQ6IGZ1bmN0aW9uIChtYXhQaG9uZVdpZHRoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9iaWxlRGV0ZWN0LmlzUGhvbmVTaXplZChtYXhQaG9uZVdpZHRoIHx8IHRoaXMubWF4UGhvbmVXaWR0aCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIG1vYmlsZSBncmFkZSAoJ0EnLCAnQicsICdDJykuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IG9uZSBvZiB0aGUgbW9iaWxlIGdyYWRlcyAoJ0EnLCAnQicsICdDJykuXG4gICAgICAgICAqIEBmdW5jdGlvbiBNb2JpbGVEZXRlY3QjbW9iaWxlR3JhZGVcbiAgICAgICAgICovXG4gICAgICAgIG1vYmlsZUdyYWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2FjaGUuZ3JhZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlLmdyYWRlID0gaW1wbC5tb2JpbGVHcmFkZSh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYWNoZS5ncmFkZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBlbnZpcm9ubWVudC1kZXBlbmRlbnRcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnNjcmVlbikge1xuICAgICAgICBNb2JpbGVEZXRlY3QuaXNQaG9uZVNpemVkID0gZnVuY3Rpb24gKG1heFBob25lV2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXhQaG9uZVdpZHRoIDwgMCA/IHVuZGVmaW5lZCA6IGltcGwuZ2V0RGV2aWNlU21hbGxlclNpZGUoKSA8PSBtYXhQaG9uZVdpZHRoO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIE1vYmlsZURldGVjdC5pc1Bob25lU2l6ZWQgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICB9XG5cbiAgICAvLyBzaG91bGQgbm90IGJlIHJlcGxhY2VkIGJ5IGEgY29tcGxldGVseSBuZXcgb2JqZWN0IC0ganVzdCBvdmVyd3JpdGUgZXhpc3RpbmcgbWV0aG9kc1xuICAgIE1vYmlsZURldGVjdC5faW1wbCA9IGltcGw7XG4gICAgXG4gICAgTW9iaWxlRGV0ZWN0LnZlcnNpb24gPSAnMS40LjEgMjAxNy0xMi0yNCc7XG5cbiAgICByZXR1cm4gTW9iaWxlRGV0ZWN0O1xufSk7IC8vIGVuZCBvZiBjYWxsIG9mIGRlZmluZSgpXG59KSgoZnVuY3Rpb24gKHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGZhY3RvcnkpIHsgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7IH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgcmV0dXJuIGRlZmluZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZmFjdG9yeSkgeyB3aW5kb3cuTW9iaWxlRGV0ZWN0ID0gZmFjdG9yeSgpOyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHBsZWFzZSBmaWxlIGEgYnVnIGlmIHlvdSBnZXQgdGhpcyBlcnJvciFcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIGVudmlyb25tZW50Jyk7XG4gICAgfVxufSkoKSk7IiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ3ByZWFjdCcpLCByZXF1aXJlKCdyZWR1eCcpKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ3ByZWFjdCcsICdyZWR1eCddLCBmYWN0b3J5KSA6XG5cdChnbG9iYWwucHJlYWN0UmVkdXggPSBmYWN0b3J5KGdsb2JhbC5wcmVhY3QsZ2xvYmFsLlJlZHV4KSk7XG59KHRoaXMsIChmdW5jdGlvbiAocHJlYWN0LHJlZHV4KSB7XG5cbnZhciBDaGlsZHJlbiA9IHtcblx0b25seTogZnVuY3Rpb24gb25seShjaGlsZHJlbikge1xuXHRcdHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlblswXSB8fCBudWxsO1xuXHR9XG59O1xuXG5mdW5jdGlvbiBwcm9wdHlwZSgpIHt9XG5wcm9wdHlwZS5pc1JlcXVpcmVkID0gcHJvcHR5cGU7XG5cbnZhciBQcm9wVHlwZXMgPSB7XG5cdGVsZW1lbnQ6IHByb3B0eXBlLFxuXHRmdW5jOiBwcm9wdHlwZSxcblx0c2hhcGU6IGZ1bmN0aW9uIHNoYXBlKCkge1xuXHRcdHJldHVybiBwcm9wdHlwZTtcblx0fSxcblx0aW5zdGFuY2VPZjogZnVuY3Rpb24gaW5zdGFuY2VPZigpIHtcblx0XHRyZXR1cm4gcHJvcHR5cGU7XG5cdH1cbn07XG5cbnZhciBzdWJzY3JpcHRpb25TaGFwZSA9IFByb3BUeXBlcy5zaGFwZSh7XG4gIHRyeVN1YnNjcmliZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdHJ5VW5zdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG5vdGlmeU5lc3RlZFN1YnM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlzU3Vic2NyaWJlZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufSk7XG5cbnZhciBzdG9yZVNoYXBlID0gUHJvcFR5cGVzLnNoYXBlKHtcbiAgc3Vic2NyaWJlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZ2V0U3RhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn0pO1xuXG4vKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbiAgfSBjYXRjaCAoZSkge31cbiAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xufVxuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuXG5cblxuXG5cblxuXG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxudmFyIGluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuXG5cblxuXG5cblxuXG5cbnZhciBvYmplY3RXaXRob3V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTtcbiAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4gPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cbnZhciBkaWRXYXJuQWJvdXRSZWNlaXZpbmdTdG9yZSA9IGZhbHNlO1xuZnVuY3Rpb24gd2FybkFib3V0UmVjZWl2aW5nU3RvcmUoKSB7XG4gIGlmIChkaWRXYXJuQWJvdXRSZWNlaXZpbmdTdG9yZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBkaWRXYXJuQWJvdXRSZWNlaXZpbmdTdG9yZSA9IHRydWU7XG5cbiAgd2FybmluZygnPFByb3ZpZGVyPiBkb2VzIG5vdCBzdXBwb3J0IGNoYW5naW5nIGBzdG9yZWAgb24gdGhlIGZseS4gJyArICdJdCBpcyBtb3N0IGxpa2VseSB0aGF0IHlvdSBzZWUgdGhpcyBlcnJvciBiZWNhdXNlIHlvdSB1cGRhdGVkIHRvICcgKyAnUmVkdXggMi54IGFuZCBSZWFjdCBSZWR1eCAyLnggd2hpY2ggbm8gbG9uZ2VyIGhvdCByZWxvYWQgcmVkdWNlcnMgJyArICdhdXRvbWF0aWNhbGx5LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVhY3QtcmVkdXgvcmVsZWFzZXMvJyArICd0YWcvdjIuMC4wIGZvciB0aGUgbWlncmF0aW9uIGluc3RydWN0aW9ucy4nKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXIoKSB7XG4gIHZhciBfUHJvdmlkZXIkY2hpbGRDb250ZXg7XG5cbiAgdmFyIHN0b3JlS2V5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnc3RvcmUnO1xuICB2YXIgc3ViS2V5ID0gYXJndW1lbnRzWzFdO1xuXG4gIHZhciBzdWJzY3JpcHRpb25LZXkgPSBzdWJLZXkgfHwgc3RvcmVLZXkgKyAnU3Vic2NyaXB0aW9uJztcblxuICB2YXIgUHJvdmlkZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIGluaGVyaXRzKFByb3ZpZGVyLCBfQ29tcG9uZW50KTtcblxuICAgIFByb3ZpZGVyLnByb3RvdHlwZS5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICB2YXIgX3JlZjtcblxuICAgICAgcmV0dXJuIF9yZWYgPSB7fSwgX3JlZltzdG9yZUtleV0gPSB0aGlzW3N0b3JlS2V5XSwgX3JlZltzdWJzY3JpcHRpb25LZXldID0gbnVsbCwgX3JlZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUHJvdmlkZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFByb3ZpZGVyKTtcblxuICAgICAgdmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgICAgX3RoaXNbc3RvcmVLZXldID0gcHJvcHMuc3RvcmU7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgUHJvdmlkZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBDaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICAgIH07XG5cbiAgICByZXR1cm4gUHJvdmlkZXI7XG4gIH0ocHJlYWN0LkNvbXBvbmVudCk7XG5cbiAge1xuICAgIFByb3ZpZGVyLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgICAgaWYgKHRoaXNbc3RvcmVLZXldICE9PSBuZXh0UHJvcHMuc3RvcmUpIHtcbiAgICAgICAgd2FybkFib3V0UmVjZWl2aW5nU3RvcmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgUHJvdmlkZXIuY2hpbGRDb250ZXh0VHlwZXMgPSAoX1Byb3ZpZGVyJGNoaWxkQ29udGV4ID0ge30sIF9Qcm92aWRlciRjaGlsZENvbnRleFtzdG9yZUtleV0gPSBzdG9yZVNoYXBlLmlzUmVxdWlyZWQsIF9Qcm92aWRlciRjaGlsZENvbnRleFtzdWJzY3JpcHRpb25LZXldID0gc3Vic2NyaXB0aW9uU2hhcGUsIF9Qcm92aWRlciRjaGlsZENvbnRleCk7XG5cbiAgcmV0dXJuIFByb3ZpZGVyO1xufVxuXG52YXIgUHJvdmlkZXIgPSBjcmVhdGVQcm92aWRlcigpO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG52YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgICBjaGlsZENvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZXM6IHRydWUsXG4gICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGRpc3BsYXlOYW1lOiB0cnVlLFxuICAgIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBtaXhpbnM6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlLFxuICAgIHR5cGU6IHRydWVcbn07XG5cbnZhciBLTk9XTl9TVEFUSUNTID0ge1xuICAgIG5hbWU6IHRydWUsXG4gICAgbGVuZ3RoOiB0cnVlLFxuICAgIHByb3RvdHlwZTogdHJ1ZSxcbiAgICBjYWxsZXI6IHRydWUsXG4gICAgY2FsbGVlOiB0cnVlLFxuICAgIGFyZ3VtZW50czogdHJ1ZSxcbiAgICBhcml0eTogdHJ1ZVxufTtcblxudmFyIGRlZmluZVByb3BlcnR5JDEgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBvYmplY3RQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZiAmJiBnZXRQcm90b3R5cGVPZihPYmplY3QpO1xuXG52YXIgaG9pc3ROb25SZWFjdFN0YXRpY3MgPSBmdW5jdGlvbiBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIHNvdXJjZUNvbXBvbmVudCwgYmxhY2tsaXN0KSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2VDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIGRvbid0IGhvaXN0IG92ZXIgc3RyaW5nIChodG1sKSBjb21wb25lbnRzXG5cbiAgICAgICAgaWYgKG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICAgICAgdmFyIGluaGVyaXRlZENvbXBvbmVudCA9IGdldFByb3RvdHlwZU9mKHNvdXJjZUNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAoaW5oZXJpdGVkQ29tcG9uZW50ICYmIGluaGVyaXRlZENvbXBvbmVudCAhPT0gb2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICAgICAgICAgICAgaG9pc3ROb25SZWFjdFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50LCBpbmhlcml0ZWRDb21wb25lbnQsIGJsYWNrbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXMoc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgICBpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZUNvbXBvbmVudCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgIGlmICghUkVBQ1RfU1RBVElDU1trZXldICYmICFLTk9XTl9TVEFUSUNTW2tleV0gJiYgKCFibGFja2xpc3QgfHwgIWJsYWNrbGlzdFtrZXldKSkge1xuICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZUNvbXBvbmVudCwga2V5KTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBdm9pZCBmYWlsdXJlcyBmcm9tIHJlYWQtb25seSBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnR5JDEodGFyZ2V0Q29tcG9uZW50LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRDb21wb25lbnQ7XG59O1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24gKCkge307XG5cbi8vIGVuY2Fwc3VsYXRlcyB0aGUgc3Vic2NyaXB0aW9uIGxvZ2ljIGZvciBjb25uZWN0aW5nIGEgY29tcG9uZW50IHRvIHRoZSByZWR1eCBzdG9yZSwgYXNcbi8vIHdlbGwgYXMgbmVzdGluZyBzdWJzY3JpcHRpb25zIG9mIGRlc2NlbmRhbnQgY29tcG9uZW50cywgc28gdGhhdCB3ZSBjYW4gZW5zdXJlIHRoZVxuLy8gYW5jZXN0b3IgY29tcG9uZW50cyByZS1yZW5kZXIgYmVmb3JlIGRlc2NlbmRhbnRzXG5cbnZhciBDTEVBUkVEID0gbnVsbDtcbnZhciBudWxsTGlzdGVuZXJzID0ge1xuICBub3RpZnk6IGZ1bmN0aW9uIG5vdGlmeSgpIHt9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVMaXN0ZW5lckNvbGxlY3Rpb24oKSB7XG4gIC8vIHRoZSBjdXJyZW50L25leHQgcGF0dGVybiBpcyBjb3BpZWQgZnJvbSByZWR1eCdzIGNyZWF0ZVN0b3JlIGNvZGUuXG4gIC8vIFRPRE86IHJlZmFjdG9yK2V4cG9zZSB0aGF0IGNvZGUgdG8gYmUgcmV1c2FibGUgaGVyZT9cbiAgdmFyIGN1cnJlbnQgPSBbXTtcbiAgdmFyIG5leHQgPSBbXTtcblxuICByZXR1cm4ge1xuICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIG5leHQgPSBDTEVBUkVEO1xuICAgICAgY3VycmVudCA9IENMRUFSRUQ7XG4gICAgfSxcbiAgICBub3RpZnk6IGZ1bmN0aW9uIG5vdGlmeSgpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBjdXJyZW50ID0gbmV4dDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxpc3RlbmVyc1tpXSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcbiAgICAgIGlmIChuZXh0ID09PSBjdXJyZW50KSBuZXh0ID0gY3VycmVudC5zbGljZSgpO1xuICAgICAgbmV4dC5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICBpZiAoIWlzU3Vic2NyaWJlZCB8fCBjdXJyZW50ID09PSBDTEVBUkVEKSByZXR1cm47XG4gICAgICAgIGlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChuZXh0ID09PSBjdXJyZW50KSBuZXh0ID0gY3VycmVudC5zbGljZSgpO1xuICAgICAgICBuZXh0LnNwbGljZShuZXh0LmluZGV4T2YobGlzdGVuZXIpLCAxKTtcbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuXG52YXIgU3Vic2NyaXB0aW9uID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdWJzY3JpcHRpb24oc3RvcmUsIHBhcmVudFN1Yiwgb25TdGF0ZUNoYW5nZSkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFN1YnNjcmlwdGlvbik7XG5cbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgdGhpcy5wYXJlbnRTdWIgPSBwYXJlbnRTdWI7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlID0gb25TdGF0ZUNoYW5nZTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlID0gbnVsbDtcbiAgICB0aGlzLmxpc3RlbmVycyA9IG51bGxMaXN0ZW5lcnM7XG4gIH1cblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmFkZE5lc3RlZFN1YiA9IGZ1bmN0aW9uIGFkZE5lc3RlZFN1YihsaXN0ZW5lcikge1xuICAgIHRoaXMudHJ5U3Vic2NyaWJlKCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzLnN1YnNjcmliZShsaXN0ZW5lcik7XG4gIH07XG5cbiAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5ub3RpZnlOZXN0ZWRTdWJzID0gZnVuY3Rpb24gbm90aWZ5TmVzdGVkU3VicygpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5ub3RpZnkoKTtcbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmlzU3Vic2NyaWJlZCA9IGZ1bmN0aW9uIGlzU3Vic2NyaWJlZCgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLnVuc3Vic2NyaWJlKTtcbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnRyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIHRyeVN1YnNjcmliZSgpIHtcbiAgICBpZiAoIXRoaXMudW5zdWJzY3JpYmUpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSB0aGlzLnBhcmVudFN1YiA/IHRoaXMucGFyZW50U3ViLmFkZE5lc3RlZFN1Yih0aGlzLm9uU3RhdGVDaGFuZ2UpIDogdGhpcy5zdG9yZS5zdWJzY3JpYmUodGhpcy5vblN0YXRlQ2hhbmdlKTtcblxuICAgICAgdGhpcy5saXN0ZW5lcnMgPSBjcmVhdGVMaXN0ZW5lckNvbGxlY3Rpb24oKTtcbiAgICB9XG4gIH07XG5cbiAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS50cnlVbnN1YnNjcmliZSA9IGZ1bmN0aW9uIHRyeVVuc3Vic2NyaWJlKCkge1xuICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlKSB7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlID0gbnVsbDtcbiAgICAgIHRoaXMubGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IG51bGxMaXN0ZW5lcnM7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBTdWJzY3JpcHRpb247XG59KCk7XG5cbnZhciBob3RSZWxvYWRpbmdWZXJzaW9uID0gMDtcbnZhciBkdW1teVN0YXRlID0ge307XG5mdW5jdGlvbiBub29wKCkge31cbmZ1bmN0aW9uIG1ha2VTZWxlY3RvclN0YXRlZnVsKHNvdXJjZVNlbGVjdG9yLCBzdG9yZSkge1xuICAvLyB3cmFwIHRoZSBzZWxlY3RvciBpbiBhbiBvYmplY3QgdGhhdCB0cmFja3MgaXRzIHJlc3VsdHMgYmV0d2VlbiBydW5zLlxuICB2YXIgc2VsZWN0b3IgPSB7XG4gICAgcnVuOiBmdW5jdGlvbiBydW5Db21wb25lbnRTZWxlY3Rvcihwcm9wcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIG5leHRQcm9wcyA9IHNvdXJjZVNlbGVjdG9yKHN0b3JlLmdldFN0YXRlKCksIHByb3BzKTtcbiAgICAgICAgaWYgKG5leHRQcm9wcyAhPT0gc2VsZWN0b3IucHJvcHMgfHwgc2VsZWN0b3IuZXJyb3IpIHtcbiAgICAgICAgICBzZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgIHNlbGVjdG9yLnByb3BzID0gbmV4dFByb3BzO1xuICAgICAgICAgIHNlbGVjdG9yLmVycm9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgc2VsZWN0b3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHNlbGVjdG9yO1xufVxuXG5mdW5jdGlvbiBjb25uZWN0QWR2YW5jZWQoXG4vKlxuICBzZWxlY3RvckZhY3RvcnkgaXMgYSBmdW5jIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIHJldHVybmluZyB0aGUgc2VsZWN0b3IgZnVuY3Rpb24gdXNlZCB0b1xuICBjb21wdXRlIG5ldyBwcm9wcyBmcm9tIHN0YXRlLCBwcm9wcywgYW5kIGRpc3BhdGNoLiBGb3IgZXhhbXBsZTpcbiAgICAgZXhwb3J0IGRlZmF1bHQgY29ubmVjdEFkdmFuY2VkKChkaXNwYXRjaCwgb3B0aW9ucykgPT4gKHN0YXRlLCBwcm9wcykgPT4gKHtcbiAgICAgIHRoaW5nOiBzdGF0ZS50aGluZ3NbcHJvcHMudGhpbmdJZF0sXG4gICAgICBzYXZlVGhpbmc6IGZpZWxkcyA9PiBkaXNwYXRjaChhY3Rpb25DcmVhdG9ycy5zYXZlVGhpbmcocHJvcHMudGhpbmdJZCwgZmllbGRzKSksXG4gICAgfSkpKFlvdXJDb21wb25lbnQpXG4gICBBY2Nlc3MgdG8gZGlzcGF0Y2ggaXMgcHJvdmlkZWQgdG8gdGhlIGZhY3Rvcnkgc28gc2VsZWN0b3JGYWN0b3JpZXMgY2FuIGJpbmQgYWN0aW9uQ3JlYXRvcnNcbiAgb3V0c2lkZSBvZiB0aGVpciBzZWxlY3RvciBhcyBhbiBvcHRpbWl6YXRpb24uIE9wdGlvbnMgcGFzc2VkIHRvIGNvbm5lY3RBZHZhbmNlZCBhcmUgcGFzc2VkIHRvXG4gIHRoZSBzZWxlY3RvckZhY3RvcnksIGFsb25nIHdpdGggZGlzcGxheU5hbWUgYW5kIFdyYXBwZWRDb21wb25lbnQsIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICBOb3RlIHRoYXQgc2VsZWN0b3JGYWN0b3J5IGlzIHJlc3BvbnNpYmxlIGZvciBhbGwgY2FjaGluZy9tZW1vaXphdGlvbiBvZiBpbmJvdW5kIGFuZCBvdXRib3VuZFxuICBwcm9wcy4gRG8gbm90IHVzZSBjb25uZWN0QWR2YW5jZWQgZGlyZWN0bHkgd2l0aG91dCBtZW1vaXppbmcgcmVzdWx0cyBiZXR3ZWVuIGNhbGxzIHRvIHlvdXJcbiAgc2VsZWN0b3IsIG90aGVyd2lzZSB0aGUgQ29ubmVjdCBjb21wb25lbnQgd2lsbCByZS1yZW5kZXIgb24gZXZlcnkgc3RhdGUgb3IgcHJvcHMgY2hhbmdlLlxuKi9cbnNlbGVjdG9yRmFjdG9yeSkge1xuICB2YXIgX2NvbnRleHRUeXBlcywgX2NoaWxkQ29udGV4dFR5cGVzO1xuXG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICB2YXIgX3JlZiRnZXREaXNwbGF5TmFtZSA9IF9yZWYuZ2V0RGlzcGxheU5hbWUsXG4gICAgICBnZXREaXNwbGF5TmFtZSA9IF9yZWYkZ2V0RGlzcGxheU5hbWUgPT09IHVuZGVmaW5lZCA/IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuICdDb25uZWN0QWR2YW5jZWQoJyArIG5hbWUgKyAnKSc7XG4gIH0gOiBfcmVmJGdldERpc3BsYXlOYW1lLFxuICAgICAgX3JlZiRtZXRob2ROYW1lID0gX3JlZi5tZXRob2ROYW1lLFxuICAgICAgbWV0aG9kTmFtZSA9IF9yZWYkbWV0aG9kTmFtZSA9PT0gdW5kZWZpbmVkID8gJ2Nvbm5lY3RBZHZhbmNlZCcgOiBfcmVmJG1ldGhvZE5hbWUsXG4gICAgICBfcmVmJHJlbmRlckNvdW50UHJvcCA9IF9yZWYucmVuZGVyQ291bnRQcm9wLFxuICAgICAgcmVuZGVyQ291bnRQcm9wID0gX3JlZiRyZW5kZXJDb3VudFByb3AgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IF9yZWYkcmVuZGVyQ291bnRQcm9wLFxuICAgICAgX3JlZiRzaG91bGRIYW5kbGVTdGF0ID0gX3JlZi5zaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMsXG4gICAgICBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMgPSBfcmVmJHNob3VsZEhhbmRsZVN0YXQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmJHNob3VsZEhhbmRsZVN0YXQsXG4gICAgICBfcmVmJHN0b3JlS2V5ID0gX3JlZi5zdG9yZUtleSxcbiAgICAgIHN0b3JlS2V5ID0gX3JlZiRzdG9yZUtleSA9PT0gdW5kZWZpbmVkID8gJ3N0b3JlJyA6IF9yZWYkc3RvcmVLZXksXG4gICAgICBfcmVmJHdpdGhSZWYgPSBfcmVmLndpdGhSZWYsXG4gICAgICB3aXRoUmVmID0gX3JlZiR3aXRoUmVmID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkd2l0aFJlZixcbiAgICAgIGNvbm5lY3RPcHRpb25zID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWydnZXREaXNwbGF5TmFtZScsICdtZXRob2ROYW1lJywgJ3JlbmRlckNvdW50UHJvcCcsICdzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMnLCAnc3RvcmVLZXknLCAnd2l0aFJlZiddKTtcblxuICB2YXIgc3Vic2NyaXB0aW9uS2V5ID0gc3RvcmVLZXkgKyAnU3Vic2NyaXB0aW9uJztcbiAgdmFyIHZlcnNpb24gPSBob3RSZWxvYWRpbmdWZXJzaW9uKys7XG5cbiAgdmFyIGNvbnRleHRUeXBlcyA9IChfY29udGV4dFR5cGVzID0ge30sIF9jb250ZXh0VHlwZXNbc3RvcmVLZXldID0gc3RvcmVTaGFwZSwgX2NvbnRleHRUeXBlc1tzdWJzY3JpcHRpb25LZXldID0gc3Vic2NyaXB0aW9uU2hhcGUsIF9jb250ZXh0VHlwZXMpO1xuICB2YXIgY2hpbGRDb250ZXh0VHlwZXMgPSAoX2NoaWxkQ29udGV4dFR5cGVzID0ge30sIF9jaGlsZENvbnRleHRUeXBlc1tzdWJzY3JpcHRpb25LZXldID0gc3Vic2NyaXB0aW9uU2hhcGUsIF9jaGlsZENvbnRleHRUeXBlcyk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBXaXRoQ29ubmVjdChXcmFwcGVkQ29tcG9uZW50KSB7XG4gICAgaW52YXJpYW50KHR5cGVvZiBXcmFwcGVkQ29tcG9uZW50ID09ICdmdW5jdGlvbicsICdZb3UgbXVzdCBwYXNzIGEgY29tcG9uZW50IHRvIHRoZSBmdW5jdGlvbiByZXR1cm5lZCBieSAnICsgKCdjb25uZWN0LiBJbnN0ZWFkIHJlY2VpdmVkICcgKyBKU09OLnN0cmluZ2lmeShXcmFwcGVkQ29tcG9uZW50KSkpO1xuXG4gICAgdmFyIHdyYXBwZWRDb21wb25lbnROYW1lID0gV3JhcHBlZENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBXcmFwcGVkQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCc7XG5cbiAgICB2YXIgZGlzcGxheU5hbWUgPSBnZXREaXNwbGF5TmFtZSh3cmFwcGVkQ29tcG9uZW50TmFtZSk7XG5cbiAgICB2YXIgc2VsZWN0b3JGYWN0b3J5T3B0aW9ucyA9IF9leHRlbmRzKHt9LCBjb25uZWN0T3B0aW9ucywge1xuICAgICAgZ2V0RGlzcGxheU5hbWU6IGdldERpc3BsYXlOYW1lLFxuICAgICAgbWV0aG9kTmFtZTogbWV0aG9kTmFtZSxcbiAgICAgIHJlbmRlckNvdW50UHJvcDogcmVuZGVyQ291bnRQcm9wLFxuICAgICAgc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzOiBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMsXG4gICAgICBzdG9yZUtleTogc3RvcmVLZXksXG4gICAgICB3aXRoUmVmOiB3aXRoUmVmLFxuICAgICAgZGlzcGxheU5hbWU6IGRpc3BsYXlOYW1lLFxuICAgICAgd3JhcHBlZENvbXBvbmVudE5hbWU6IHdyYXBwZWRDb21wb25lbnROYW1lLFxuICAgICAgV3JhcHBlZENvbXBvbmVudDogV3JhcHBlZENvbXBvbmVudFxuICAgIH0pO1xuXG4gICAgdmFyIENvbm5lY3QgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgICAgaW5oZXJpdHMoQ29ubmVjdCwgX0NvbXBvbmVudCk7XG5cbiAgICAgIGZ1bmN0aW9uIENvbm5lY3QocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29ubmVjdCk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgICAgICBfdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7fTtcbiAgICAgICAgX3RoaXMucmVuZGVyQ291bnQgPSAwO1xuICAgICAgICBfdGhpcy5zdG9yZSA9IHByb3BzW3N0b3JlS2V5XSB8fCBjb250ZXh0W3N0b3JlS2V5XTtcbiAgICAgICAgX3RoaXMucHJvcHNNb2RlID0gQm9vbGVhbihwcm9wc1tzdG9yZUtleV0pO1xuICAgICAgICBfdGhpcy5zZXRXcmFwcGVkSW5zdGFuY2UgPSBfdGhpcy5zZXRXcmFwcGVkSW5zdGFuY2UuYmluZChfdGhpcyk7XG5cbiAgICAgICAgaW52YXJpYW50KF90aGlzLnN0b3JlLCAnQ291bGQgbm90IGZpbmQgXCInICsgc3RvcmVLZXkgKyAnXCIgaW4gZWl0aGVyIHRoZSBjb250ZXh0IG9yIHByb3BzIG9mICcgKyAoJ1wiJyArIGRpc3BsYXlOYW1lICsgJ1wiLiBFaXRoZXIgd3JhcCB0aGUgcm9vdCBjb21wb25lbnQgaW4gYSA8UHJvdmlkZXI+LCAnKSArICgnb3IgZXhwbGljaXRseSBwYXNzIFwiJyArIHN0b3JlS2V5ICsgJ1wiIGFzIGEgcHJvcCB0byBcIicgKyBkaXNwbGF5TmFtZSArICdcIi4nKSk7XG5cbiAgICAgICAgX3RoaXMuaW5pdFNlbGVjdG9yKCk7XG4gICAgICAgIF90aGlzLmluaXRTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgfVxuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICAgIHZhciBfcmVmMjtcblxuICAgICAgICAvLyBJZiB0aGlzIGNvbXBvbmVudCByZWNlaXZlZCBzdG9yZSBmcm9tIHByb3BzLCBpdHMgc3Vic2NyaXB0aW9uIHNob3VsZCBiZSB0cmFuc3BhcmVudFxuICAgICAgICAvLyB0byBhbnkgZGVzY2VuZGFudHMgcmVjZWl2aW5nIHN0b3JlK3N1YnNjcmlwdGlvbiBmcm9tIGNvbnRleHQ7IGl0IHBhc3NlcyBhbG9uZ1xuICAgICAgICAvLyBzdWJzY3JpcHRpb24gcGFzc2VkIHRvIGl0LiBPdGhlcndpc2UsIGl0IHNoYWRvd3MgdGhlIHBhcmVudCBzdWJzY3JpcHRpb24sIHdoaWNoIGFsbG93c1xuICAgICAgICAvLyBDb25uZWN0IHRvIGNvbnRyb2wgb3JkZXJpbmcgb2Ygbm90aWZpY2F0aW9ucyB0byBmbG93IHRvcC1kb3duLlxuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gdGhpcy5wcm9wc01vZGUgPyBudWxsIDogdGhpcy5zdWJzY3JpcHRpb247XG4gICAgICAgIHJldHVybiBfcmVmMiA9IHt9LCBfcmVmMltzdWJzY3JpcHRpb25LZXldID0gc3Vic2NyaXB0aW9uIHx8IHRoaXMuY29udGV4dFtzdWJzY3JpcHRpb25LZXldLCBfcmVmMjtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICghc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzKSByZXR1cm47XG5cbiAgICAgICAgLy8gY29tcG9uZW50V2lsbE1vdW50IGZpcmVzIGR1cmluZyBzZXJ2ZXIgc2lkZSByZW5kZXJpbmcsIGJ1dCBjb21wb25lbnREaWRNb3VudCBhbmRcbiAgICAgICAgLy8gY29tcG9uZW50V2lsbFVubW91bnQgZG8gbm90LiBCZWNhdXNlIG9mIHRoaXMsIHRyeVN1YnNjcmliZSBoYXBwZW5zIGR1cmluZyAuLi5kaWRNb3VudC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB1bnN1YnNjcmlwdGlvbiB3b3VsZCBuZXZlciB0YWtlIHBsYWNlIGR1cmluZyBTU1IsIGNhdXNpbmcgYSBtZW1vcnkgbGVhay5cbiAgICAgICAgLy8gVG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIGEgY2hpbGQgY29tcG9uZW50IG1heSBoYXZlIHRyaWdnZXJlZCBhIHN0YXRlIGNoYW5nZSBieVxuICAgICAgICAvLyBkaXNwYXRjaGluZyBhbiBhY3Rpb24gaW4gaXRzIGNvbXBvbmVudFdpbGxNb3VudCwgd2UgaGF2ZSB0byByZS1ydW4gdGhlIHNlbGVjdCBhbmQgbWF5YmVcbiAgICAgICAgLy8gcmUtcmVuZGVyLlxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi50cnlTdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4odGhpcy5wcm9wcyk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSkgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuKG5leHRQcm9wcyk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikgdGhpcy5zdWJzY3JpcHRpb24udHJ5VW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLm5vdGlmeU5lc3RlZFN1YnMgPSBub29wO1xuICAgICAgICB0aGlzLnN0b3JlID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4gPSBub29wO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuZ2V0V3JhcHBlZEluc3RhbmNlID0gZnVuY3Rpb24gZ2V0V3JhcHBlZEluc3RhbmNlKCkge1xuICAgICAgICBpbnZhcmlhbnQod2l0aFJlZiwgJ1RvIGFjY2VzcyB0aGUgd3JhcHBlZCBpbnN0YW5jZSwgeW91IG5lZWQgdG8gc3BlY2lmeSAnICsgKCd7IHdpdGhSZWY6IHRydWUgfSBpbiB0aGUgb3B0aW9ucyBhcmd1bWVudCBvZiB0aGUgJyArIG1ldGhvZE5hbWUgKyAnKCkgY2FsbC4nKSk7XG4gICAgICAgIHJldHVybiB0aGlzLndyYXBwZWRJbnN0YW5jZTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLnNldFdyYXBwZWRJbnN0YW5jZSA9IGZ1bmN0aW9uIHNldFdyYXBwZWRJbnN0YW5jZShyZWYpIHtcbiAgICAgICAgdGhpcy53cmFwcGVkSW5zdGFuY2UgPSByZWY7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5pbml0U2VsZWN0b3IgPSBmdW5jdGlvbiBpbml0U2VsZWN0b3IoKSB7XG4gICAgICAgIHZhciBzb3VyY2VTZWxlY3RvciA9IHNlbGVjdG9yRmFjdG9yeSh0aGlzLnN0b3JlLmRpc3BhdGNoLCBzZWxlY3RvckZhY3RvcnlPcHRpb25zKTtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IG1ha2VTZWxlY3RvclN0YXRlZnVsKHNvdXJjZVNlbGVjdG9yLCB0aGlzLnN0b3JlKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4odGhpcy5wcm9wcyk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5pbml0U3Vic2NyaXB0aW9uID0gZnVuY3Rpb24gaW5pdFN1YnNjcmlwdGlvbigpIHtcbiAgICAgICAgaWYgKCFzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMpIHJldHVybjtcblxuICAgICAgICAvLyBwYXJlbnRTdWIncyBzb3VyY2Ugc2hvdWxkIG1hdGNoIHdoZXJlIHN0b3JlIGNhbWUgZnJvbTogcHJvcHMgdnMuIGNvbnRleHQuIEEgY29tcG9uZW50XG4gICAgICAgIC8vIGNvbm5lY3RlZCB0byB0aGUgc3RvcmUgdmlhIHByb3BzIHNob3VsZG4ndCB1c2Ugc3Vic2NyaXB0aW9uIGZyb20gY29udGV4dCwgb3IgdmljZSB2ZXJzYS5cbiAgICAgICAgdmFyIHBhcmVudFN1YiA9ICh0aGlzLnByb3BzTW9kZSA/IHRoaXMucHJvcHMgOiB0aGlzLmNvbnRleHQpW3N1YnNjcmlwdGlvbktleV07XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbih0aGlzLnN0b3JlLCBwYXJlbnRTdWIsIHRoaXMub25TdGF0ZUNoYW5nZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBgbm90aWZ5TmVzdGVkU3Vic2AgaXMgZHVwbGljYXRlZCB0byBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgdGhlIGNvbXBvbmVudCBpcyAgdW5tb3VudGVkIGluXG4gICAgICAgIC8vIHRoZSBtaWRkbGUgb2YgdGhlIG5vdGlmaWNhdGlvbiBsb29wLCB3aGVyZSBgdGhpcy5zdWJzY3JpcHRpb25gIHdpbGwgdGhlbiBiZSBudWxsLiBBblxuICAgICAgICAvLyBleHRyYSBudWxsIGNoZWNrIGV2ZXJ5IGNoYW5nZSBjYW4gYmUgYXZvaWRlZCBieSBjb3B5aW5nIHRoZSBtZXRob2Qgb250byBgdGhpc2AgYW5kIHRoZW5cbiAgICAgICAgLy8gcmVwbGFjaW5nIGl0IHdpdGggYSBuby1vcCBvbiB1bm1vdW50LiBUaGlzIGNhbiBwcm9iYWJseSBiZSBhdm9pZGVkIGlmIFN1YnNjcmlwdGlvbidzXG4gICAgICAgIC8vIGxpc3RlbmVycyBsb2dpYyBpcyBjaGFuZ2VkIHRvIG5vdCBjYWxsIGxpc3RlbmVycyB0aGF0IGhhdmUgYmVlbiB1bnN1YnNjcmliZWQgaW4gdGhlXG4gICAgICAgIC8vIG1pZGRsZSBvZiB0aGUgbm90aWZpY2F0aW9uIGxvb3AuXG4gICAgICAgIHRoaXMubm90aWZ5TmVzdGVkU3VicyA9IHRoaXMuc3Vic2NyaXB0aW9uLm5vdGlmeU5lc3RlZFN1YnMuYmluZCh0aGlzLnN1YnNjcmlwdGlvbik7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5vblN0YXRlQ2hhbmdlID0gZnVuY3Rpb24gb25TdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4odGhpcy5wcm9wcyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSkge1xuICAgICAgICAgIHRoaXMubm90aWZ5TmVzdGVkU3VicygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlID0gdGhpcy5ub3RpZnlOZXN0ZWRTdWJzT25Db21wb25lbnREaWRVcGRhdGU7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZShkdW1teVN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUubm90aWZ5TmVzdGVkU3Vic09uQ29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gbm90aWZ5TmVzdGVkU3Vic09uQ29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICAvLyBgY29tcG9uZW50RGlkVXBkYXRlYCBpcyBjb25kaXRpb25hbGx5IGltcGxlbWVudGVkIHdoZW4gYG9uU3RhdGVDaGFuZ2VgIGRldGVybWluZXMgaXRcbiAgICAgICAgLy8gbmVlZHMgdG8gbm90aWZ5IG5lc3RlZCBzdWJzLiBPbmNlIGNhbGxlZCwgaXQgdW5pbXBsZW1lbnRzIGl0c2VsZiB1bnRpbCBmdXJ0aGVyIHN0YXRlXG4gICAgICAgIC8vIGNoYW5nZXMgb2NjdXIuIERvaW5nIGl0IHRoaXMgd2F5IHZzIGhhdmluZyBhIHBlcm1hbmVudCBgY29tcG9uZW50RGlkVXBkYXRlYCB0aGF0IGRvZXNcbiAgICAgICAgLy8gYSBib29sZWFuIGNoZWNrIGV2ZXJ5IHRpbWUgYXZvaWRzIGFuIGV4dHJhIG1ldGhvZCBjYWxsIG1vc3Qgb2YgdGhlIHRpbWUsIHJlc3VsdGluZ1xuICAgICAgICAvLyBpbiBzb21lIHBlcmYgYm9vc3QuXG4gICAgICAgIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm5vdGlmeU5lc3RlZFN1YnMoKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmlzU3Vic2NyaWJlZCA9IGZ1bmN0aW9uIGlzU3Vic2NyaWJlZCgpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5zdWJzY3JpcHRpb24pICYmIHRoaXMuc3Vic2NyaXB0aW9uLmlzU3Vic2NyaWJlZCgpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuYWRkRXh0cmFQcm9wcyA9IGZ1bmN0aW9uIGFkZEV4dHJhUHJvcHMocHJvcHMpIHtcbiAgICAgICAgaWYgKCF3aXRoUmVmICYmICFyZW5kZXJDb3VudFByb3AgJiYgISh0aGlzLnByb3BzTW9kZSAmJiB0aGlzLnN1YnNjcmlwdGlvbikpIHJldHVybiBwcm9wcztcbiAgICAgICAgLy8gbWFrZSBhIHNoYWxsb3cgY29weSBzbyB0aGF0IGZpZWxkcyBhZGRlZCBkb24ndCBsZWFrIHRvIHRoZSBvcmlnaW5hbCBzZWxlY3Rvci5cbiAgICAgICAgLy8gdGhpcyBpcyBlc3BlY2lhbGx5IGltcG9ydGFudCBmb3IgJ3JlZicgc2luY2UgdGhhdCdzIGEgcmVmZXJlbmNlIGJhY2sgdG8gdGhlIGNvbXBvbmVudFxuICAgICAgICAvLyBpbnN0YW5jZS4gYSBzaW5nbGV0b24gbWVtb2l6ZWQgc2VsZWN0b3Igd291bGQgdGhlbiBiZSBob2xkaW5nIGEgcmVmZXJlbmNlIHRvIHRoZVxuICAgICAgICAvLyBpbnN0YW5jZSwgcHJldmVudGluZyB0aGUgaW5zdGFuY2UgZnJvbSBiZWluZyBnYXJiYWdlIGNvbGxlY3RlZCwgYW5kIHRoYXQgd291bGQgYmUgYmFkXG4gICAgICAgIHZhciB3aXRoRXh0cmFzID0gX2V4dGVuZHMoe30sIHByb3BzKTtcbiAgICAgICAgaWYgKHdpdGhSZWYpIHdpdGhFeHRyYXMucmVmID0gdGhpcy5zZXRXcmFwcGVkSW5zdGFuY2U7XG4gICAgICAgIGlmIChyZW5kZXJDb3VudFByb3ApIHdpdGhFeHRyYXNbcmVuZGVyQ291bnRQcm9wXSA9IHRoaXMucmVuZGVyQ291bnQrKztcbiAgICAgICAgaWYgKHRoaXMucHJvcHNNb2RlICYmIHRoaXMuc3Vic2NyaXB0aW9uKSB3aXRoRXh0cmFzW3N1YnNjcmlwdGlvbktleV0gPSB0aGlzLnN1YnNjcmlwdGlvbjtcbiAgICAgICAgcmV0dXJuIHdpdGhFeHRyYXM7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBzZWxlY3RvciA9IHRoaXMuc2VsZWN0b3I7XG4gICAgICAgIHNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChzZWxlY3Rvci5lcnJvcikge1xuICAgICAgICAgIHRocm93IHNlbGVjdG9yLmVycm9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwcmVhY3QuaChXcmFwcGVkQ29tcG9uZW50LCB0aGlzLmFkZEV4dHJhUHJvcHMoc2VsZWN0b3IucHJvcHMpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbm5lY3Q7XG4gICAgfShwcmVhY3QuQ29tcG9uZW50KTtcblxuICAgIENvbm5lY3QuV3JhcHBlZENvbXBvbmVudCA9IFdyYXBwZWRDb21wb25lbnQ7XG4gICAgQ29ubmVjdC5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICAgIENvbm5lY3QuY2hpbGRDb250ZXh0VHlwZXMgPSBjaGlsZENvbnRleHRUeXBlcztcbiAgICBDb25uZWN0LmNvbnRleHRUeXBlcyA9IGNvbnRleHRUeXBlcztcblxuXG4gICAge1xuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIC8vIFdlIGFyZSBob3QgcmVsb2FkaW5nIVxuICAgICAgICBpZiAodGhpcy52ZXJzaW9uICE9PSB2ZXJzaW9uKSB7XG4gICAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgICB0aGlzLmluaXRTZWxlY3RvcigpO1xuXG4gICAgICAgICAgLy8gSWYgYW55IGNvbm5lY3RlZCBkZXNjZW5kYW50cyBkb24ndCBob3QgcmVsb2FkIChhbmQgcmVzdWJzY3JpYmUgaW4gdGhlIHByb2Nlc3MpLCB0aGVpclxuICAgICAgICAgIC8vIGxpc3RlbmVycyB3aWxsIGJlIGxvc3Qgd2hlbiB3ZSB1bnN1YnNjcmliZS4gVW5mb3J0dW5hdGVseSwgYnkgY29weWluZyBvdmVyIGFsbFxuICAgICAgICAgIC8vIGxpc3RlbmVycywgdGhpcyBkb2VzIG1lYW4gdGhhdCB0aGUgb2xkIHZlcnNpb25zIG9mIGNvbm5lY3RlZCBkZXNjZW5kYW50cyB3aWxsIHN0aWxsIGJlXG4gICAgICAgICAgLy8gbm90aWZpZWQgb2Ygc3RhdGUgY2hhbmdlczsgaG93ZXZlciwgdGhlaXIgb25TdGF0ZUNoYW5nZSBmdW5jdGlvbiBpcyBhIG5vLW9wIHNvIHRoaXNcbiAgICAgICAgICAvLyBpc24ndCBhIGh1Z2UgZGVhbC5cbiAgICAgICAgICB2YXIgb2xkTGlzdGVuZXJzID0gW107XG5cbiAgICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIG9sZExpc3RlbmVycyA9IHRoaXMuc3Vic2NyaXB0aW9uLmxpc3RlbmVycy5nZXQoKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnRyeVVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaW5pdFN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgIGlmIChzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnRyeVN1YnNjcmliZSgpO1xuICAgICAgICAgICAgb2xkTGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpczIuc3Vic2NyaXB0aW9uLmxpc3RlbmVycy5zdWJzY3JpYmUobGlzdGVuZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBob2lzdE5vblJlYWN0U3RhdGljcyhDb25uZWN0LCBXcmFwcGVkQ29tcG9uZW50KTtcbiAgfTtcbn1cblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgaWYgKHggPT09IHkpIHtcbiAgICByZXR1cm4geCAhPT0gMCB8fCB5ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbmZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XG4gIGlmIChpcyhvYmpBLCBvYmpCKSkgcmV0dXJuIHRydWU7XG5cbiAgaWYgKCh0eXBlb2Ygb2JqQSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob2JqQSkpICE9PSAnb2JqZWN0JyB8fCBvYmpBID09PSBudWxsIHx8ICh0eXBlb2Ygb2JqQiA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob2JqQikpICE9PSAnb2JqZWN0JyB8fCBvYmpCID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKG9iakIpO1xuXG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXNCLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc093bi5jYWxsKG9iakIsIGtleXNBW2ldKSB8fCAhaXMob2JqQVtrZXlzQVtpXV0sIG9iakJba2V5c0FbaV1dKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSAodHlwZW9mIGdsb2JhbCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoZ2xvYmFsKSkgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSAodHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHNlbGYpKSA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgX1N5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8kMSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5JDEgPSBvYmplY3RQcm90byQxLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90byQxLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyQxID0gX1N5bWJvbCA/IF9TeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5JDEuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWckMSksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZyQxXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnJDFdID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnJDFdID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWckMV07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byQyID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nJDEgPSBvYmplY3RQcm90byQyLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nJDEuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nO1xudmFyIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IF9TeW1ib2wgPyBfU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgICB9XG4gICAgcmV0dXJuIHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkgPyBnZXRSYXdUYWcodmFsdWUpIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHwgYmFzZUdldFRhZyh2YWx1ZSkgIT0gb2JqZWN0VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHZlcmlmeVBsYWluT2JqZWN0KHZhbHVlLCBkaXNwbGF5TmFtZSwgbWV0aG9kTmFtZSkge1xuICBpZiAoIWlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgd2FybmluZyhtZXRob2ROYW1lICsgJygpIGluICcgKyBkaXNwbGF5TmFtZSArICcgbXVzdCByZXR1cm4gYSBwbGFpbiBvYmplY3QuIEluc3RlYWQgcmVjZWl2ZWQgJyArIHZhbHVlICsgJy4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50KGdldENvbnN0YW50KSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbml0Q29uc3RhbnRTZWxlY3RvcihkaXNwYXRjaCwgb3B0aW9ucykge1xuICAgIHZhciBjb25zdGFudCA9IGdldENvbnN0YW50KGRpc3BhdGNoLCBvcHRpb25zKTtcblxuICAgIGZ1bmN0aW9uIGNvbnN0YW50U2VsZWN0b3IoKSB7XG4gICAgICByZXR1cm4gY29uc3RhbnQ7XG4gICAgfVxuICAgIGNvbnN0YW50U2VsZWN0b3IuZGVwZW5kc09uT3duUHJvcHMgPSBmYWxzZTtcbiAgICByZXR1cm4gY29uc3RhbnRTZWxlY3RvcjtcbiAgfTtcbn1cblxuLy8gZGVwZW5kc09uT3duUHJvcHMgaXMgdXNlZCBieSBjcmVhdGVNYXBUb1Byb3BzUHJveHkgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gcGFzcyBwcm9wcyBhcyBhcmdzXG4vLyB0byB0aGUgbWFwVG9Qcm9wcyBmdW5jdGlvbiBiZWluZyB3cmFwcGVkLiBJdCBpcyBhbHNvIHVzZWQgYnkgbWFrZVB1cmVQcm9wc1NlbGVjdG9yIHRvIGRldGVybWluZVxuLy8gd2hldGhlciBtYXBUb1Byb3BzIG5lZWRzIHRvIGJlIGludm9rZWQgd2hlbiBwcm9wcyBoYXZlIGNoYW5nZWQuXG4vLyBcbi8vIEEgbGVuZ3RoIG9mIG9uZSBzaWduYWxzIHRoYXQgbWFwVG9Qcm9wcyBkb2VzIG5vdCBkZXBlbmQgb24gcHJvcHMgZnJvbSB0aGUgcGFyZW50IGNvbXBvbmVudC5cbi8vIEEgbGVuZ3RoIG9mIHplcm8gaXMgYXNzdW1lZCB0byBtZWFuIG1hcFRvUHJvcHMgaXMgZ2V0dGluZyBhcmdzIHZpYSBhcmd1bWVudHMgb3IgLi4uYXJncyBhbmRcbi8vIHRoZXJlZm9yZSBub3QgcmVwb3J0aW5nIGl0cyBsZW5ndGggYWNjdXJhdGVseS4uXG5mdW5jdGlvbiBnZXREZXBlbmRzT25Pd25Qcm9wcyhtYXBUb1Byb3BzKSB7XG4gIHJldHVybiBtYXBUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzICE9PSBudWxsICYmIG1hcFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMgIT09IHVuZGVmaW5lZCA/IEJvb2xlYW4obWFwVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcykgOiBtYXBUb1Byb3BzLmxlbmd0aCAhPT0gMTtcbn1cblxuLy8gVXNlZCBieSB3aGVuTWFwU3RhdGVUb1Byb3BzSXNGdW5jdGlvbiBhbmQgd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzRnVuY3Rpb24sXG4vLyB0aGlzIGZ1bmN0aW9uIHdyYXBzIG1hcFRvUHJvcHMgaW4gYSBwcm94eSBmdW5jdGlvbiB3aGljaCBkb2VzIHNldmVyYWwgdGhpbmdzOlxuLy8gXG4vLyAgKiBEZXRlY3RzIHdoZXRoZXIgdGhlIG1hcFRvUHJvcHMgZnVuY3Rpb24gYmVpbmcgY2FsbGVkIGRlcGVuZHMgb24gcHJvcHMsIHdoaWNoXG4vLyAgICBpcyB1c2VkIGJ5IHNlbGVjdG9yRmFjdG9yeSB0byBkZWNpZGUgaWYgaXQgc2hvdWxkIHJlaW52b2tlIG9uIHByb3BzIGNoYW5nZXMuXG4vLyAgICBcbi8vICAqIE9uIGZpcnN0IGNhbGwsIGhhbmRsZXMgbWFwVG9Qcm9wcyBpZiByZXR1cm5zIGFub3RoZXIgZnVuY3Rpb24sIGFuZCB0cmVhdHMgdGhhdFxuLy8gICAgbmV3IGZ1bmN0aW9uIGFzIHRoZSB0cnVlIG1hcFRvUHJvcHMgZm9yIHN1YnNlcXVlbnQgY2FsbHMuXG4vLyAgICBcbi8vICAqIE9uIGZpcnN0IGNhbGwsIHZlcmlmaWVzIHRoZSBmaXJzdCByZXN1bHQgaXMgYSBwbGFpbiBvYmplY3QsIGluIG9yZGVyIHRvIHdhcm5cbi8vICAgIHRoZSBkZXZlbG9wZXIgdGhhdCB0aGVpciBtYXBUb1Byb3BzIGZ1bmN0aW9uIGlzIG5vdCByZXR1cm5pbmcgYSB2YWxpZCByZXN1bHQuXG4vLyAgICBcbmZ1bmN0aW9uIHdyYXBNYXBUb1Byb3BzRnVuYyhtYXBUb1Byb3BzLCBtZXRob2ROYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbml0UHJveHlTZWxlY3RvcihkaXNwYXRjaCwgX3JlZikge1xuICAgIHZhciBkaXNwbGF5TmFtZSA9IF9yZWYuZGlzcGxheU5hbWU7XG5cbiAgICB2YXIgcHJveHkgPSBmdW5jdGlvbiBtYXBUb1Byb3BzUHJveHkoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcykge1xuICAgICAgcmV0dXJuIHByb3h5LmRlcGVuZHNPbk93blByb3BzID8gcHJveHkubWFwVG9Qcm9wcyhzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKSA6IHByb3h5Lm1hcFRvUHJvcHMoc3RhdGVPckRpc3BhdGNoKTtcbiAgICB9O1xuXG4gICAgLy8gYWxsb3cgZGV0ZWN0RmFjdG9yeUFuZFZlcmlmeSB0byBnZXQgb3duUHJvcHNcbiAgICBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA9IHRydWU7XG5cbiAgICBwcm94eS5tYXBUb1Byb3BzID0gZnVuY3Rpb24gZGV0ZWN0RmFjdG9yeUFuZFZlcmlmeShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKSB7XG4gICAgICBwcm94eS5tYXBUb1Byb3BzID0gbWFwVG9Qcm9wcztcbiAgICAgIHByb3h5LmRlcGVuZHNPbk93blByb3BzID0gZ2V0RGVwZW5kc09uT3duUHJvcHMobWFwVG9Qcm9wcyk7XG4gICAgICB2YXIgcHJvcHMgPSBwcm94eShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKTtcblxuICAgICAgaWYgKHR5cGVvZiBwcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcm94eS5tYXBUb1Byb3BzID0gcHJvcHM7XG4gICAgICAgIHByb3h5LmRlcGVuZHNPbk93blByb3BzID0gZ2V0RGVwZW5kc09uT3duUHJvcHMocHJvcHMpO1xuICAgICAgICBwcm9wcyA9IHByb3h5KHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpO1xuICAgICAgfVxuXG4gICAgICB2ZXJpZnlQbGFpbk9iamVjdChwcm9wcywgZGlzcGxheU5hbWUsIG1ldGhvZE5hbWUpO1xuXG4gICAgICByZXR1cm4gcHJvcHM7XG4gICAgfTtcblxuICAgIHJldHVybiBwcm94eTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzRnVuY3Rpb24obWFwRGlzcGF0Y2hUb1Byb3BzKSB7XG4gIHJldHVybiB0eXBlb2YgbWFwRGlzcGF0Y2hUb1Byb3BzID09PSAnZnVuY3Rpb24nID8gd3JhcE1hcFRvUHJvcHNGdW5jKG1hcERpc3BhdGNoVG9Qcm9wcywgJ21hcERpc3BhdGNoVG9Qcm9wcycpIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNNaXNzaW5nKG1hcERpc3BhdGNoVG9Qcm9wcykge1xuICByZXR1cm4gIW1hcERpc3BhdGNoVG9Qcm9wcyA/IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgcmV0dXJuIHsgZGlzcGF0Y2g6IGRpc3BhdGNoIH07XG4gIH0pIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNPYmplY3QobWFwRGlzcGF0Y2hUb1Byb3BzKSB7XG4gIHJldHVybiBtYXBEaXNwYXRjaFRvUHJvcHMgJiYgKHR5cGVvZiBtYXBEaXNwYXRjaFRvUHJvcHMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG1hcERpc3BhdGNoVG9Qcm9wcykpID09PSAnb2JqZWN0JyA/IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgcmV0dXJuIHJlZHV4LmJpbmRBY3Rpb25DcmVhdG9ycyhtYXBEaXNwYXRjaFRvUHJvcHMsIGRpc3BhdGNoKTtcbiAgfSkgOiB1bmRlZmluZWQ7XG59XG5cbnZhciBkZWZhdWx0TWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzID0gW3doZW5NYXBEaXNwYXRjaFRvUHJvcHNJc0Z1bmN0aW9uLCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNNaXNzaW5nLCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNPYmplY3RdO1xuXG5mdW5jdGlvbiB3aGVuTWFwU3RhdGVUb1Byb3BzSXNGdW5jdGlvbihtYXBTdGF0ZVRvUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtYXBTdGF0ZVRvUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWFwVG9Qcm9wc0Z1bmMobWFwU3RhdGVUb1Byb3BzLCAnbWFwU3RhdGVUb1Byb3BzJykgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHdoZW5NYXBTdGF0ZVRvUHJvcHNJc01pc3NpbmcobWFwU3RhdGVUb1Byb3BzKSB7XG4gIHJldHVybiAhbWFwU3RhdGVUb1Byb3BzID8gd3JhcE1hcFRvUHJvcHNDb25zdGFudChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9KSA6IHVuZGVmaW5lZDtcbn1cblxudmFyIGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMgPSBbd2hlbk1hcFN0YXRlVG9Qcm9wc0lzRnVuY3Rpb24sIHdoZW5NYXBTdGF0ZVRvUHJvcHNJc01pc3NpbmddO1xuXG5mdW5jdGlvbiBkZWZhdWx0TWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcykge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIG93blByb3BzLCBzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzKTtcbn1cblxuZnVuY3Rpb24gd3JhcE1lcmdlUHJvcHNGdW5jKG1lcmdlUHJvcHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGluaXRNZXJnZVByb3BzUHJveHkoZGlzcGF0Y2gsIF9yZWYpIHtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSBfcmVmLmRpc3BsYXlOYW1lLFxuICAgICAgICBwdXJlID0gX3JlZi5wdXJlLFxuICAgICAgICBhcmVNZXJnZWRQcm9wc0VxdWFsID0gX3JlZi5hcmVNZXJnZWRQcm9wc0VxdWFsO1xuXG4gICAgdmFyIGhhc1J1bk9uY2UgPSBmYWxzZTtcbiAgICB2YXIgbWVyZ2VkUHJvcHMgPSB2b2lkIDA7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VQcm9wc1Byb3h5KHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKSB7XG4gICAgICB2YXIgbmV4dE1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG5cbiAgICAgIGlmIChoYXNSdW5PbmNlKSB7XG4gICAgICAgIGlmICghcHVyZSB8fCAhYXJlTWVyZ2VkUHJvcHNFcXVhbChuZXh0TWVyZ2VkUHJvcHMsIG1lcmdlZFByb3BzKSkgbWVyZ2VkUHJvcHMgPSBuZXh0TWVyZ2VkUHJvcHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYXNSdW5PbmNlID0gdHJ1ZTtcbiAgICAgICAgbWVyZ2VkUHJvcHMgPSBuZXh0TWVyZ2VkUHJvcHM7XG5cbiAgICAgICAgdmVyaWZ5UGxhaW5PYmplY3QobWVyZ2VkUHJvcHMsIGRpc3BsYXlOYW1lLCAnbWVyZ2VQcm9wcycpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gICAgfTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd2hlbk1lcmdlUHJvcHNJc0Z1bmN0aW9uKG1lcmdlUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtZXJnZVByb3BzID09PSAnZnVuY3Rpb24nID8gd3JhcE1lcmdlUHJvcHNGdW5jKG1lcmdlUHJvcHMpIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB3aGVuTWVyZ2VQcm9wc0lzT21pdHRlZChtZXJnZVByb3BzKSB7XG4gIHJldHVybiAhbWVyZ2VQcm9wcyA/IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1lcmdlUHJvcHM7XG4gIH0gOiB1bmRlZmluZWQ7XG59XG5cbnZhciBkZWZhdWx0TWVyZ2VQcm9wc0ZhY3RvcmllcyA9IFt3aGVuTWVyZ2VQcm9wc0lzRnVuY3Rpb24sIHdoZW5NZXJnZVByb3BzSXNPbWl0dGVkXTtcblxuZnVuY3Rpb24gdmVyaWZ5KHNlbGVjdG9yLCBtZXRob2ROYW1lLCBkaXNwbGF5TmFtZSkge1xuICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHZhbHVlIGZvciAnICsgbWV0aG9kTmFtZSArICcgaW4gJyArIGRpc3BsYXlOYW1lICsgJy4nKTtcbiAgfSBlbHNlIGlmIChtZXRob2ROYW1lID09PSAnbWFwU3RhdGVUb1Byb3BzJyB8fCBtZXRob2ROYW1lID09PSAnbWFwRGlzcGF0Y2hUb1Byb3BzJykge1xuICAgIGlmICghc2VsZWN0b3IuaGFzT3duUHJvcGVydHkoJ2RlcGVuZHNPbk93blByb3BzJykpIHtcbiAgICAgIHdhcm5pbmcoJ1RoZSBzZWxlY3RvciBmb3IgJyArIG1ldGhvZE5hbWUgKyAnIG9mICcgKyBkaXNwbGF5TmFtZSArICcgZGlkIG5vdCBzcGVjaWZ5IGEgdmFsdWUgZm9yIGRlcGVuZHNPbk93blByb3BzLicpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB2ZXJpZnlTdWJzZWxlY3RvcnMobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZlcmlmeShtYXBTdGF0ZVRvUHJvcHMsICdtYXBTdGF0ZVRvUHJvcHMnLCBkaXNwbGF5TmFtZSk7XG4gIHZlcmlmeShtYXBEaXNwYXRjaFRvUHJvcHMsICdtYXBEaXNwYXRjaFRvUHJvcHMnLCBkaXNwbGF5TmFtZSk7XG4gIHZlcmlmeShtZXJnZVByb3BzLCAnbWVyZ2VQcm9wcycsIGRpc3BsYXlOYW1lKTtcbn1cblxuZnVuY3Rpb24gaW1wdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGltcHVyZUZpbmFsUHJvcHNTZWxlY3RvcihzdGF0ZSwgb3duUHJvcHMpIHtcbiAgICByZXR1cm4gbWVyZ2VQcm9wcyhtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKSwgbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyksIG93blByb3BzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHVyZUZpbmFsUHJvcHNTZWxlY3RvckZhY3RvcnkobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIGRpc3BhdGNoLCBfcmVmKSB7XG4gIHZhciBhcmVTdGF0ZXNFcXVhbCA9IF9yZWYuYXJlU3RhdGVzRXF1YWwsXG4gICAgICBhcmVPd25Qcm9wc0VxdWFsID0gX3JlZi5hcmVPd25Qcm9wc0VxdWFsLFxuICAgICAgYXJlU3RhdGVQcm9wc0VxdWFsID0gX3JlZi5hcmVTdGF0ZVByb3BzRXF1YWw7XG5cbiAgdmFyIGhhc1J1bkF0TGVhc3RPbmNlID0gZmFsc2U7XG4gIHZhciBzdGF0ZSA9IHZvaWQgMDtcbiAgdmFyIG93blByb3BzID0gdm9pZCAwO1xuICB2YXIgc3RhdGVQcm9wcyA9IHZvaWQgMDtcbiAgdmFyIGRpc3BhdGNoUHJvcHMgPSB2b2lkIDA7XG4gIHZhciBtZXJnZWRQcm9wcyA9IHZvaWQgMDtcblxuICBmdW5jdGlvbiBoYW5kbGVGaXJzdENhbGwoZmlyc3RTdGF0ZSwgZmlyc3RPd25Qcm9wcykge1xuICAgIHN0YXRlID0gZmlyc3RTdGF0ZTtcbiAgICBvd25Qcm9wcyA9IGZpcnN0T3duUHJvcHM7XG4gICAgc3RhdGVQcm9wcyA9IG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpO1xuICAgIGRpc3BhdGNoUHJvcHMgPSBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gsIG93blByb3BzKTtcbiAgICBtZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuICAgIGhhc1J1bkF0TGVhc3RPbmNlID0gdHJ1ZTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVOZXdQcm9wc0FuZE5ld1N0YXRlKCkge1xuICAgIHN0YXRlUHJvcHMgPSBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKTtcblxuICAgIGlmIChtYXBEaXNwYXRjaFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMpIGRpc3BhdGNoUHJvcHMgPSBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gsIG93blByb3BzKTtcblxuICAgIG1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTmV3UHJvcHMoKSB7XG4gICAgaWYgKG1hcFN0YXRlVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcykgc3RhdGVQcm9wcyA9IG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpO1xuXG4gICAgaWYgKG1hcERpc3BhdGNoVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcykgZGlzcGF0Y2hQcm9wcyA9IG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpO1xuXG4gICAgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVOZXdTdGF0ZSgpIHtcbiAgICB2YXIgbmV4dFN0YXRlUHJvcHMgPSBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKTtcbiAgICB2YXIgc3RhdGVQcm9wc0NoYW5nZWQgPSAhYXJlU3RhdGVQcm9wc0VxdWFsKG5leHRTdGF0ZVByb3BzLCBzdGF0ZVByb3BzKTtcbiAgICBzdGF0ZVByb3BzID0gbmV4dFN0YXRlUHJvcHM7XG5cbiAgICBpZiAoc3RhdGVQcm9wc0NoYW5nZWQpIG1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG5cbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVTdWJzZXF1ZW50Q2FsbHMobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpIHtcbiAgICB2YXIgcHJvcHNDaGFuZ2VkID0gIWFyZU93blByb3BzRXF1YWwobmV4dE93blByb3BzLCBvd25Qcm9wcyk7XG4gICAgdmFyIHN0YXRlQ2hhbmdlZCA9ICFhcmVTdGF0ZXNFcXVhbChuZXh0U3RhdGUsIHN0YXRlKTtcbiAgICBzdGF0ZSA9IG5leHRTdGF0ZTtcbiAgICBvd25Qcm9wcyA9IG5leHRPd25Qcm9wcztcblxuICAgIGlmIChwcm9wc0NoYW5nZWQgJiYgc3RhdGVDaGFuZ2VkKSByZXR1cm4gaGFuZGxlTmV3UHJvcHNBbmROZXdTdGF0ZSgpO1xuICAgIGlmIChwcm9wc0NoYW5nZWQpIHJldHVybiBoYW5kbGVOZXdQcm9wcygpO1xuICAgIGlmIChzdGF0ZUNoYW5nZWQpIHJldHVybiBoYW5kbGVOZXdTdGF0ZSgpO1xuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBwdXJlRmluYWxQcm9wc1NlbGVjdG9yKG5leHRTdGF0ZSwgbmV4dE93blByb3BzKSB7XG4gICAgcmV0dXJuIGhhc1J1bkF0TGVhc3RPbmNlID8gaGFuZGxlU3Vic2VxdWVudENhbGxzKG5leHRTdGF0ZSwgbmV4dE93blByb3BzKSA6IGhhbmRsZUZpcnN0Q2FsbChuZXh0U3RhdGUsIG5leHRPd25Qcm9wcyk7XG4gIH07XG59XG5cbi8vIFRPRE86IEFkZCBtb3JlIGNvbW1lbnRzXG5cbi8vIElmIHB1cmUgaXMgdHJ1ZSwgdGhlIHNlbGVjdG9yIHJldHVybmVkIGJ5IHNlbGVjdG9yRmFjdG9yeSB3aWxsIG1lbW9pemUgaXRzIHJlc3VsdHMsXG4vLyBhbGxvd2luZyBjb25uZWN0QWR2YW5jZWQncyBzaG91bGRDb21wb25lbnRVcGRhdGUgdG8gcmV0dXJuIGZhbHNlIGlmIGZpbmFsXG4vLyBwcm9wcyBoYXZlIG5vdCBjaGFuZ2VkLiBJZiBmYWxzZSwgdGhlIHNlbGVjdG9yIHdpbGwgYWx3YXlzIHJldHVybiBhIG5ld1xuLy8gb2JqZWN0IGFuZCBzaG91bGRDb21wb25lbnRVcGRhdGUgd2lsbCBhbHdheXMgcmV0dXJuIHRydWUuXG5cbmZ1bmN0aW9uIGZpbmFsUHJvcHNTZWxlY3RvckZhY3RvcnkoZGlzcGF0Y2gsIF9yZWYyKSB7XG4gIHZhciBpbml0TWFwU3RhdGVUb1Byb3BzID0gX3JlZjIuaW5pdE1hcFN0YXRlVG9Qcm9wcyxcbiAgICAgIGluaXRNYXBEaXNwYXRjaFRvUHJvcHMgPSBfcmVmMi5pbml0TWFwRGlzcGF0Y2hUb1Byb3BzLFxuICAgICAgaW5pdE1lcmdlUHJvcHMgPSBfcmVmMi5pbml0TWVyZ2VQcm9wcyxcbiAgICAgIG9wdGlvbnMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmMiwgWydpbml0TWFwU3RhdGVUb1Byb3BzJywgJ2luaXRNYXBEaXNwYXRjaFRvUHJvcHMnLCAnaW5pdE1lcmdlUHJvcHMnXSk7XG5cbiAgdmFyIG1hcFN0YXRlVG9Qcm9wcyA9IGluaXRNYXBTdGF0ZVRvUHJvcHMoZGlzcGF0Y2gsIG9wdGlvbnMpO1xuICB2YXIgbWFwRGlzcGF0Y2hUb1Byb3BzID0gaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3B0aW9ucyk7XG4gIHZhciBtZXJnZVByb3BzID0gaW5pdE1lcmdlUHJvcHMoZGlzcGF0Y2gsIG9wdGlvbnMpO1xuXG4gIHtcbiAgICB2ZXJpZnlTdWJzZWxlY3RvcnMobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIG9wdGlvbnMuZGlzcGxheU5hbWUpO1xuICB9XG5cbiAgdmFyIHNlbGVjdG9yRmFjdG9yeSA9IG9wdGlvbnMucHVyZSA/IHB1cmVGaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5IDogaW1wdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeTtcblxuICByZXR1cm4gc2VsZWN0b3JGYWN0b3J5KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBkaXNwYXRjaCwgb3B0aW9ucyk7XG59XG5cbi8qXG4gIGNvbm5lY3QgaXMgYSBmYWNhZGUgb3ZlciBjb25uZWN0QWR2YW5jZWQuIEl0IHR1cm5zIGl0cyBhcmdzIGludG8gYSBjb21wYXRpYmxlXG4gIHNlbGVjdG9yRmFjdG9yeSwgd2hpY2ggaGFzIHRoZSBzaWduYXR1cmU6XG5cbiAgICAoZGlzcGF0Y2gsIG9wdGlvbnMpID0+IChuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykgPT4gbmV4dEZpbmFsUHJvcHNcbiAgXG4gIGNvbm5lY3QgcGFzc2VzIGl0cyBhcmdzIHRvIGNvbm5lY3RBZHZhbmNlZCBhcyBvcHRpb25zLCB3aGljaCB3aWxsIGluIHR1cm4gcGFzcyB0aGVtIHRvXG4gIHNlbGVjdG9yRmFjdG9yeSBlYWNoIHRpbWUgYSBDb25uZWN0IGNvbXBvbmVudCBpbnN0YW5jZSBpcyBpbnN0YW50aWF0ZWQgb3IgaG90IHJlbG9hZGVkLlxuXG4gIHNlbGVjdG9yRmFjdG9yeSByZXR1cm5zIGEgZmluYWwgcHJvcHMgc2VsZWN0b3IgZnJvbSBpdHMgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzLCBtZXJnZVByb3BzLFxuICBtZXJnZVByb3BzRmFjdG9yaWVzLCBhbmQgcHVyZSBhcmdzLlxuXG4gIFRoZSByZXN1bHRpbmcgZmluYWwgcHJvcHMgc2VsZWN0b3IgaXMgY2FsbGVkIGJ5IHRoZSBDb25uZWN0IGNvbXBvbmVudCBpbnN0YW5jZSB3aGVuZXZlclxuICBpdCByZWNlaXZlcyBuZXcgcHJvcHMgb3Igc3RvcmUgc3RhdGUuXG4gKi9cblxuZnVuY3Rpb24gbWF0Y2goYXJnLCBmYWN0b3JpZXMsIG5hbWUpIHtcbiAgZm9yICh2YXIgaSA9IGZhY3Rvcmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciByZXN1bHQgPSBmYWN0b3JpZXNbaV0oYXJnKTtcbiAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCwgb3B0aW9ucykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZSBvZiB0eXBlICcgKyAodHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoYXJnKSkgKyAnIGZvciAnICsgbmFtZSArICcgYXJndW1lbnQgd2hlbiBjb25uZWN0aW5nIGNvbXBvbmVudCAnICsgb3B0aW9ucy53cmFwcGVkQ29tcG9uZW50TmFtZSArICcuJyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0cmljdEVxdWFsKGEsIGIpIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59XG5cbi8vIGNyZWF0ZUNvbm5lY3Qgd2l0aCBkZWZhdWx0IGFyZ3MgYnVpbGRzIHRoZSAnb2ZmaWNpYWwnIGNvbm5lY3QgYmVoYXZpb3IuIENhbGxpbmcgaXQgd2l0aFxuLy8gZGlmZmVyZW50IG9wdGlvbnMgb3BlbnMgdXAgc29tZSB0ZXN0aW5nIGFuZCBleHRlbnNpYmlsaXR5IHNjZW5hcmlvc1xuZnVuY3Rpb24gY3JlYXRlQ29ubmVjdCgpIHtcbiAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9LFxuICAgICAgX3JlZiRjb25uZWN0SE9DID0gX3JlZi5jb25uZWN0SE9DLFxuICAgICAgY29ubmVjdEhPQyA9IF9yZWYkY29ubmVjdEhPQyA9PT0gdW5kZWZpbmVkID8gY29ubmVjdEFkdmFuY2VkIDogX3JlZiRjb25uZWN0SE9DLFxuICAgICAgX3JlZiRtYXBTdGF0ZVRvUHJvcHNGID0gX3JlZi5tYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMsXG4gICAgICBtYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMgPSBfcmVmJG1hcFN0YXRlVG9Qcm9wc0YgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMgOiBfcmVmJG1hcFN0YXRlVG9Qcm9wc0YsXG4gICAgICBfcmVmJG1hcERpc3BhdGNoVG9Qcm8gPSBfcmVmLm1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyxcbiAgICAgIG1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyA9IF9yZWYkbWFwRGlzcGF0Y2hUb1BybyA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdE1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyA6IF9yZWYkbWFwRGlzcGF0Y2hUb1BybyxcbiAgICAgIF9yZWYkbWVyZ2VQcm9wc0ZhY3RvciA9IF9yZWYubWVyZ2VQcm9wc0ZhY3RvcmllcyxcbiAgICAgIG1lcmdlUHJvcHNGYWN0b3JpZXMgPSBfcmVmJG1lcmdlUHJvcHNGYWN0b3IgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRNZXJnZVByb3BzRmFjdG9yaWVzIDogX3JlZiRtZXJnZVByb3BzRmFjdG9yLFxuICAgICAgX3JlZiRzZWxlY3RvckZhY3RvcnkgPSBfcmVmLnNlbGVjdG9yRmFjdG9yeSxcbiAgICAgIHNlbGVjdG9yRmFjdG9yeSA9IF9yZWYkc2VsZWN0b3JGYWN0b3J5ID09PSB1bmRlZmluZWQgPyBmaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5IDogX3JlZiRzZWxlY3RvckZhY3Rvcnk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMpIHtcbiAgICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IHt9O1xuXG4gICAgdmFyIF9yZWYyJHB1cmUgPSBfcmVmMi5wdXJlLFxuICAgICAgICBwdXJlID0gX3JlZjIkcHVyZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYyJHB1cmUsXG4gICAgICAgIF9yZWYyJGFyZVN0YXRlc0VxdWFsID0gX3JlZjIuYXJlU3RhdGVzRXF1YWwsXG4gICAgICAgIGFyZVN0YXRlc0VxdWFsID0gX3JlZjIkYXJlU3RhdGVzRXF1YWwgPT09IHVuZGVmaW5lZCA/IHN0cmljdEVxdWFsIDogX3JlZjIkYXJlU3RhdGVzRXF1YWwsXG4gICAgICAgIF9yZWYyJGFyZU93blByb3BzRXF1YSA9IF9yZWYyLmFyZU93blByb3BzRXF1YWwsXG4gICAgICAgIGFyZU93blByb3BzRXF1YWwgPSBfcmVmMiRhcmVPd25Qcm9wc0VxdWEgPT09IHVuZGVmaW5lZCA/IHNoYWxsb3dFcXVhbCA6IF9yZWYyJGFyZU93blByb3BzRXF1YSxcbiAgICAgICAgX3JlZjIkYXJlU3RhdGVQcm9wc0VxID0gX3JlZjIuYXJlU3RhdGVQcm9wc0VxdWFsLFxuICAgICAgICBhcmVTdGF0ZVByb3BzRXF1YWwgPSBfcmVmMiRhcmVTdGF0ZVByb3BzRXEgPT09IHVuZGVmaW5lZCA/IHNoYWxsb3dFcXVhbCA6IF9yZWYyJGFyZVN0YXRlUHJvcHNFcSxcbiAgICAgICAgX3JlZjIkYXJlTWVyZ2VkUHJvcHNFID0gX3JlZjIuYXJlTWVyZ2VkUHJvcHNFcXVhbCxcbiAgICAgICAgYXJlTWVyZ2VkUHJvcHNFcXVhbCA9IF9yZWYyJGFyZU1lcmdlZFByb3BzRSA9PT0gdW5kZWZpbmVkID8gc2hhbGxvd0VxdWFsIDogX3JlZjIkYXJlTWVyZ2VkUHJvcHNFLFxuICAgICAgICBleHRyYU9wdGlvbnMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmMiwgWydwdXJlJywgJ2FyZVN0YXRlc0VxdWFsJywgJ2FyZU93blByb3BzRXF1YWwnLCAnYXJlU3RhdGVQcm9wc0VxdWFsJywgJ2FyZU1lcmdlZFByb3BzRXF1YWwnXSk7XG5cbiAgICB2YXIgaW5pdE1hcFN0YXRlVG9Qcm9wcyA9IG1hdGNoKG1hcFN0YXRlVG9Qcm9wcywgbWFwU3RhdGVUb1Byb3BzRmFjdG9yaWVzLCAnbWFwU3RhdGVUb1Byb3BzJyk7XG4gICAgdmFyIGluaXRNYXBEaXNwYXRjaFRvUHJvcHMgPSBtYXRjaChtYXBEaXNwYXRjaFRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcywgJ21hcERpc3BhdGNoVG9Qcm9wcycpO1xuICAgIHZhciBpbml0TWVyZ2VQcm9wcyA9IG1hdGNoKG1lcmdlUHJvcHMsIG1lcmdlUHJvcHNGYWN0b3JpZXMsICdtZXJnZVByb3BzJyk7XG5cbiAgICByZXR1cm4gY29ubmVjdEhPQyhzZWxlY3RvckZhY3RvcnksIF9leHRlbmRzKHtcbiAgICAgIC8vIHVzZWQgaW4gZXJyb3IgbWVzc2FnZXNcbiAgICAgIG1ldGhvZE5hbWU6ICdjb25uZWN0JyxcblxuICAgICAgLy8gdXNlZCB0byBjb21wdXRlIENvbm5lY3QncyBkaXNwbGF5TmFtZSBmcm9tIHRoZSB3cmFwcGVkIGNvbXBvbmVudCdzIGRpc3BsYXlOYW1lLlxuICAgICAgZ2V0RGlzcGxheU5hbWU6IGZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICdDb25uZWN0KCcgKyBuYW1lICsgJyknO1xuICAgICAgfSxcblxuICAgICAgLy8gaWYgbWFwU3RhdGVUb1Byb3BzIGlzIGZhbHN5LCB0aGUgQ29ubmVjdCBjb21wb25lbnQgZG9lc24ndCBzdWJzY3JpYmUgdG8gc3RvcmUgc3RhdGUgY2hhbmdlc1xuICAgICAgc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzOiBCb29sZWFuKG1hcFN0YXRlVG9Qcm9wcyksXG5cbiAgICAgIC8vIHBhc3NlZCB0aHJvdWdoIHRvIHNlbGVjdG9yRmFjdG9yeVxuICAgICAgaW5pdE1hcFN0YXRlVG9Qcm9wczogaW5pdE1hcFN0YXRlVG9Qcm9wcyxcbiAgICAgIGluaXRNYXBEaXNwYXRjaFRvUHJvcHM6IGluaXRNYXBEaXNwYXRjaFRvUHJvcHMsXG4gICAgICBpbml0TWVyZ2VQcm9wczogaW5pdE1lcmdlUHJvcHMsXG4gICAgICBwdXJlOiBwdXJlLFxuICAgICAgYXJlU3RhdGVzRXF1YWw6IGFyZVN0YXRlc0VxdWFsLFxuICAgICAgYXJlT3duUHJvcHNFcXVhbDogYXJlT3duUHJvcHNFcXVhbCxcbiAgICAgIGFyZVN0YXRlUHJvcHNFcXVhbDogYXJlU3RhdGVQcm9wc0VxdWFsLFxuICAgICAgYXJlTWVyZ2VkUHJvcHNFcXVhbDogYXJlTWVyZ2VkUHJvcHNFcXVhbFxuXG4gICAgfSwgZXh0cmFPcHRpb25zKSk7XG4gIH07XG59XG5cbnZhciBjb25uZWN0ID0gY3JlYXRlQ29ubmVjdCgpO1xuXG52YXIgaW5kZXggPSB7IFByb3ZpZGVyOiBQcm92aWRlciwgY29ubmVjdDogY29ubmVjdCwgY29ubmVjdEFkdmFuY2VkOiBjb25uZWN0QWR2YW5jZWQgfTtcblxucmV0dXJuIGluZGV4O1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJlYWN0LXJlZHV4LmpzLm1hcFxuIiwiIWZ1bmN0aW9uKHQsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwicHJlYWN0XCIpKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcInByZWFjdFwiXSxlKTp0LnByZWFjdFJvdXRlcj1lKHQucHJlYWN0KX0odGhpcyxmdW5jdGlvbih0KXtmdW5jdGlvbiBlKHQsZSl7Zm9yKHZhciBuIGluIGUpdFtuXT1lW25dO3JldHVybiB0fWZ1bmN0aW9uIG4odCxlLG4pe3ZhciByLG89Lyg/OlxcPyhbXiNdKikpPygjLiopPyQvLHU9dC5tYXRjaChvKSxhPXt9O2lmKHUmJnVbMV0pZm9yKHZhciBwPXVbMV0uc3BsaXQoXCImXCIpLGM9MDtjPHAubGVuZ3RoO2MrKyl7dmFyIGY9cFtjXS5zcGxpdChcIj1cIik7YVtkZWNvZGVVUklDb21wb25lbnQoZlswXSldPWRlY29kZVVSSUNvbXBvbmVudChmLnNsaWNlKDEpLmpvaW4oXCI9XCIpKX10PWkodC5yZXBsYWNlKG8sXCJcIikpLGU9aShlfHxcIlwiKTtmb3IodmFyIGw9TWF0aC5tYXgodC5sZW5ndGgsZS5sZW5ndGgpLHM9MDtzPGw7cysrKWlmKGVbc10mJlwiOlwiPT09ZVtzXS5jaGFyQXQoMCkpe3ZhciBoPWVbc10ucmVwbGFjZSgvKF5cXDp8WysqP10rJCkvZyxcIlwiKSxkPShlW3NdLm1hdGNoKC9bKyo/XSskLyl8fEMpWzBdfHxcIlwiLGc9fmQuaW5kZXhPZihcIitcIiksbT1+ZC5pbmRleE9mKFwiKlwiKSx5PXRbc118fFwiXCI7aWYoIXkmJiFtJiYoZC5pbmRleE9mKFwiP1wiKTwwfHxnKSl7cj0hMTticmVha31pZihhW2hdPWRlY29kZVVSSUNvbXBvbmVudCh5KSxnfHxtKXthW2hdPXQuc2xpY2UocykubWFwKGRlY29kZVVSSUNvbXBvbmVudCkuam9pbihcIi9cIik7YnJlYWt9fWVsc2UgaWYoZVtzXSE9PXRbc10pe3I9ITE7YnJlYWt9cmV0dXJuKG4uZGVmYXVsdD09PSEwfHxyIT09ITEpJiZhfWZ1bmN0aW9uIHIodCxlKXtyZXR1cm4gdC5yYW5rPGUucmFuaz8xOnQucmFuaz5lLnJhbms/LTE6dC5pbmRleC1lLmluZGV4fWZ1bmN0aW9uIG8odCxlKXtyZXR1cm4gdC5pbmRleD1lLHQucmFuaz1wKHQpLHQuYXR0cmlidXRlc31mdW5jdGlvbiBpKHQpe3JldHVybiB0LnJlcGxhY2UoLyheXFwvK3xcXC8rJCkvZyxcIlwiKS5zcGxpdChcIi9cIil9ZnVuY3Rpb24gdSh0KXtyZXR1cm5cIjpcIj09dC5jaGFyQXQoMCk/MStcIiorP1wiLmluZGV4T2YodC5jaGFyQXQodC5sZW5ndGgtMSkpfHw0OjV9ZnVuY3Rpb24gYSh0KXtyZXR1cm4gaSh0KS5tYXAodSkuam9pbihcIlwiKX1mdW5jdGlvbiBwKHQpe3JldHVybiB0LmF0dHJpYnV0ZXMuZGVmYXVsdD8wOmEodC5hdHRyaWJ1dGVzLnBhdGgpfWZ1bmN0aW9uIGModCl7cmV0dXJuIG51bGwhPXQuX19wcmVhY3RhdHRyX3x8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmbnVsbCE9dFtTeW1ib2wuZm9yKFwicHJlYWN0YXR0clwiKV19ZnVuY3Rpb24gZih0LGUpe3ZvaWQgMD09PWUmJihlPVwicHVzaFwiKSxSJiZSW2VdP1JbZV0odCk6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGhpc3RvcnkmJmhpc3RvcnlbZStcIlN0YXRlXCJdJiZoaXN0b3J5W2UrXCJTdGF0ZVwiXShudWxsLG51bGwsdCl9ZnVuY3Rpb24gbCgpe3ZhciB0O3JldHVybiB0PVImJlIubG9jYXRpb24/Ui5sb2NhdGlvbjpSJiZSLmdldEN1cnJlbnRMb2NhdGlvbj9SLmdldEN1cnJlbnRMb2NhdGlvbigpOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBsb2NhdGlvbj9sb2NhdGlvbjp4LFwiXCIrKHQucGF0aG5hbWV8fFwiXCIpKyh0LnNlYXJjaHx8XCJcIil9ZnVuY3Rpb24gcyh0LGUpe3JldHVybiB2b2lkIDA9PT1lJiYoZT0hMSksXCJzdHJpbmdcIiE9dHlwZW9mIHQmJnQudXJsJiYoZT10LnJlcGxhY2UsdD10LnVybCksaCh0KSYmZih0LGU/XCJyZXBsYWNlXCI6XCJwdXNoXCIpLGQodCl9ZnVuY3Rpb24gaCh0KXtmb3IodmFyIGU9VS5sZW5ndGg7ZS0tOylpZihVW2VdLmNhblJvdXRlKHQpKXJldHVybiEwO3JldHVybiExfWZ1bmN0aW9uIGQodCl7Zm9yKHZhciBlPSExLG49MDtuPFUubGVuZ3RoO24rKylVW25dLnJvdXRlVG8odCk9PT0hMCYmKGU9ITApO2Zvcih2YXIgcj1rLmxlbmd0aDtyLS07KWtbcl0odCk7cmV0dXJuIGV9ZnVuY3Rpb24gZyh0KXtpZih0JiZ0LmdldEF0dHJpYnV0ZSl7dmFyIGU9dC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLG49dC5nZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIik7aWYoZSYmZS5tYXRjaCgvXlxcLy9nKSYmKCFufHxuLm1hdGNoKC9eXz9zZWxmJC9pKSkpcmV0dXJuIHMoZSl9fWZ1bmN0aW9uIG0odCl7aWYoMD09dC5idXR0b24pcmV0dXJuIGcodC5jdXJyZW50VGFyZ2V0fHx0LnRhcmdldHx8dGhpcykseSh0KX1mdW5jdGlvbiB5KHQpe3JldHVybiB0JiYodC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24mJnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCksdC5zdG9wUHJvcGFnYXRpb24mJnQuc3RvcFByb3BhZ2F0aW9uKCksdC5wcmV2ZW50RGVmYXVsdCgpKSwhMX1mdW5jdGlvbiB2KHQpe2lmKCEodC5jdHJsS2V5fHx0Lm1ldGFLZXl8fHQuYWx0S2V5fHx0LnNoaWZ0S2V5fHwwIT09dC5idXR0b24pKXt2YXIgZT10LnRhcmdldDtkbyBpZihcIkFcIj09PShlLm5vZGVOYW1lK1wiXCIpLnRvVXBwZXJDYXNlKCkmJmUuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSYmYyhlKSl7aWYoZS5oYXNBdHRyaWJ1dGUoXCJuYXRpdmVcIikpcmV0dXJuO2lmKGcoZSkpcmV0dXJuIHkodCl9d2hpbGUoZT1lLnBhcmVudE5vZGUpfX1mdW5jdGlvbiBiKCl7X3x8KFwiZnVuY3Rpb25cIj09dHlwZW9mIGFkZEV2ZW50TGlzdGVuZXImJihSfHxhZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIixmdW5jdGlvbigpe2QobCgpKX0pLGFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHYpKSxfPSEwKX12YXIgQz17fSxSPW51bGwsVT1bXSxrPVtdLHg9e30sXz0hMSxBPWZ1bmN0aW9uKGkpe2Z1bmN0aW9uIHUodCl7aS5jYWxsKHRoaXMsdCksdC5oaXN0b3J5JiYoUj10Lmhpc3RvcnkpLHRoaXMuc3RhdGU9e3VybDp0LnVybHx8bCgpfSxiKCl9cmV0dXJuIGkmJih1Ll9fcHJvdG9fXz1pKSx1LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGkmJmkucHJvdG90eXBlKSx1LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj11LHUucHJvdG90eXBlLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbih0KXtyZXR1cm4gdC5zdGF0aWMhPT0hMHx8KHQudXJsIT09dGhpcy5wcm9wcy51cmx8fHQub25DaGFuZ2UhPT10aGlzLnByb3BzLm9uQ2hhbmdlKX0sdS5wcm90b3R5cGUuY2FuUm91dGU9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZ2V0TWF0Y2hpbmdDaGlsZHJlbih0aGlzLnByb3BzLmNoaWxkcmVuLHQsITEpLmxlbmd0aD4wfSx1LnByb3RvdHlwZS5yb3V0ZVRvPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLl9kaWRSb3V0ZT0hMSx0aGlzLnNldFN0YXRlKHt1cmw6dH0pLHRoaXMudXBkYXRpbmc/dGhpcy5jYW5Sb3V0ZSh0KToodGhpcy5mb3JjZVVwZGF0ZSgpLHRoaXMuX2RpZFJvdXRlKX0sdS5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50PWZ1bmN0aW9uKCl7VS5wdXNoKHRoaXMpLHRoaXMudXBkYXRpbmc9ITB9LHUucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztSJiYodGhpcy51bmxpc3Rlbj1SLmxpc3RlbihmdW5jdGlvbihlKXt0LnJvdXRlVG8oXCJcIisoZS5wYXRobmFtZXx8XCJcIikrKGUuc2VhcmNofHxcIlwiKSl9KSksdGhpcy51cGRhdGluZz0hMX0sdS5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLnVubGlzdGVuJiZ0aGlzLnVubGlzdGVuKCksVS5zcGxpY2UoVS5pbmRleE9mKHRoaXMpLDEpfSx1LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVXBkYXRlPWZ1bmN0aW9uKCl7dGhpcy51cGRhdGluZz0hMH0sdS5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlPWZ1bmN0aW9uKCl7dGhpcy51cGRhdGluZz0hMX0sdS5wcm90b3R5cGUuZ2V0TWF0Y2hpbmdDaGlsZHJlbj1mdW5jdGlvbihpLHUsYSl7cmV0dXJuIGkuZmlsdGVyKG8pLnNvcnQocikubWFwKGZ1bmN0aW9uKHIpe3ZhciBvPW4odSxyLmF0dHJpYnV0ZXMucGF0aCxyLmF0dHJpYnV0ZXMpO2lmKG8pe2lmKGEhPT0hMSl7dmFyIGk9e3VybDp1LG1hdGNoZXM6b307cmV0dXJuIGUoaSxvKSxkZWxldGUgaS5yZWYsZGVsZXRlIGkua2V5LHQuY2xvbmVFbGVtZW50KHIsaSl9cmV0dXJuIHJ9fSkuZmlsdGVyKEJvb2xlYW4pfSx1LnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24odCxlKXt2YXIgbj10LmNoaWxkcmVuLHI9dC5vbkNoYW5nZSxvPWUudXJsLGk9dGhpcy5nZXRNYXRjaGluZ0NoaWxkcmVuKG4sbywhMCksdT1pWzBdfHxudWxsO3RoaXMuX2RpZFJvdXRlPSEhdTt2YXIgYT10aGlzLnByZXZpb3VzVXJsO3JldHVybiBvIT09YSYmKHRoaXMucHJldmlvdXNVcmw9byxcImZ1bmN0aW9uXCI9PXR5cGVvZiByJiZyKHtyb3V0ZXI6dGhpcyx1cmw6byxwcmV2aW91czphLGFjdGl2ZTppLGN1cnJlbnQ6dX0pKSx1fSx1fSh0LkNvbXBvbmVudCksST1mdW5jdGlvbihuKXtyZXR1cm4gdC5oKFwiYVwiLGUoe29uQ2xpY2s6bX0sbikpfSxMPWZ1bmN0aW9uKGUpe3JldHVybiB0LmgoZS5jb21wb25lbnQsZSl9O3JldHVybiBBLnN1YnNjcmliZXJzPWssQS5nZXRDdXJyZW50VXJsPWwsQS5yb3V0ZT1zLEEuUm91dGVyPUEsQS5Sb3V0ZT1MLEEuTGluaz1JLEF9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC1yb3V0ZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkxpbmsgPSBleHBvcnRzLk1hdGNoID0gdW5kZWZpbmVkO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3ByZWFjdCA9IHJlcXVpcmUoJ3ByZWFjdCcpO1xuXG52YXIgX3ByZWFjdFJvdXRlciA9IHJlcXVpcmUoJ3ByZWFjdC1yb3V0ZXInKTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBNYXRjaCA9IGV4cG9ydHMuTWF0Y2ggPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuXHRfaW5oZXJpdHMoTWF0Y2gsIF9Db21wb25lbnQpO1xuXG5cdGZ1bmN0aW9uIE1hdGNoKCkge1xuXHRcdHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWF0Y2gpO1xuXG5cdFx0Zm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcblx0XHRcdGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIF9yZXQgPSAoX3RlbXAgPSAoX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29tcG9uZW50LmNhbGwuYXBwbHkoX0NvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkpLCBfdGhpcyksIF90aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uICh1cmwpIHtcblx0XHRcdF90aGlzLm5leHRVcmwgPSB1cmw7XG5cdFx0XHRfdGhpcy5zZXRTdGF0ZSh7fSk7XG5cdFx0fSwgX3RlbXApLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG5cdH1cblxuXHRNYXRjaC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRfcHJlYWN0Um91dGVyLnN1YnNjcmliZXJzLnB1c2godGhpcy51cGRhdGUpO1xuXHR9O1xuXG5cdE1hdGNoLnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdF9wcmVhY3RSb3V0ZXIuc3Vic2NyaWJlcnMuc3BsaWNlKF9wcmVhY3RSb3V0ZXIuc3Vic2NyaWJlcnMuaW5kZXhPZih0aGlzLnVwZGF0ZSkgPj4+IDAsIDEpO1xuXHR9O1xuXG5cdE1hdGNoLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIocHJvcHMpIHtcblx0XHR2YXIgdXJsID0gdGhpcy5uZXh0VXJsIHx8ICgwLCBfcHJlYWN0Um91dGVyLmdldEN1cnJlbnRVcmwpKCksXG5cdFx0ICAgIHBhdGggPSB1cmwucmVwbGFjZSgvXFw/LiskLywgJycpO1xuXHRcdHRoaXMubmV4dFVybCA9IG51bGw7XG5cdFx0cmV0dXJuIHByb3BzLmNoaWxkcmVuWzBdICYmIHByb3BzLmNoaWxkcmVuWzBdKHtcblx0XHRcdHVybDogdXJsLFxuXHRcdFx0cGF0aDogcGF0aCxcblx0XHRcdG1hdGNoZXM6IHBhdGggPT09IHByb3BzLnBhdGhcblx0XHR9KTtcblx0fTtcblxuXHRyZXR1cm4gTWF0Y2g7XG59KF9wcmVhY3QuQ29tcG9uZW50KTtcblxudmFyIExpbmsgPSBmdW5jdGlvbiBMaW5rKF9yZWYpIHtcblx0dmFyIGFjdGl2ZUNsYXNzTmFtZSA9IF9yZWYuYWN0aXZlQ2xhc3NOYW1lLFxuXHQgICAgcGF0aCA9IF9yZWYucGF0aCxcblx0ICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnYWN0aXZlQ2xhc3NOYW1lJywgJ3BhdGgnXSk7XG5cblx0cmV0dXJuICgwLCBfcHJlYWN0LmgpKFxuXHRcdE1hdGNoLFxuXHRcdHsgcGF0aDogcGF0aCB8fCBwcm9wcy5ocmVmIH0sXG5cdFx0ZnVuY3Rpb24gKF9yZWYyKSB7XG5cdFx0XHR2YXIgbWF0Y2hlcyA9IF9yZWYyLm1hdGNoZXM7XG5cdFx0XHRyZXR1cm4gKDAsIF9wcmVhY3QuaCkoX3ByZWFjdFJvdXRlci5MaW5rLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHsgJ2NsYXNzJzogW3Byb3BzLmNsYXNzIHx8IHByb3BzLmNsYXNzTmFtZSwgbWF0Y2hlcyAmJiBhY3RpdmVDbGFzc05hbWVdLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJykgfSkpO1xuXHRcdH1cblx0KTtcbn07XG5cbmV4cG9ydHMuTGluayA9IExpbms7XG5leHBvcnRzLmRlZmF1bHQgPSBNYXRjaDtcblxuTWF0Y2guTGluayA9IExpbms7XG4iLCIhZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGZ1bmN0aW9uIFZOb2RlKCkge31cbiAgICBmdW5jdGlvbiBoKG5vZGVOYW1lLCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHZhciBsYXN0U2ltcGxlLCBjaGlsZCwgc2ltcGxlLCBpLCBjaGlsZHJlbiA9IEVNUFRZX0NISUxEUkVOO1xuICAgICAgICBmb3IgKGkgPSBhcmd1bWVudHMubGVuZ3RoOyBpLS0gPiAyOyApIHN0YWNrLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMgJiYgbnVsbCAhPSBhdHRyaWJ1dGVzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCkgc3RhY2sucHVzaChhdHRyaWJ1dGVzLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzLmNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIGlmICgoY2hpbGQgPSBzdGFjay5wb3AoKSkgJiYgdm9pZCAwICE9PSBjaGlsZC5wb3ApIGZvciAoaSA9IGNoaWxkLmxlbmd0aDsgaS0tOyApIHN0YWNrLnB1c2goY2hpbGRbaV0pOyBlbHNlIHtcbiAgICAgICAgICAgIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIGNoaWxkKSBjaGlsZCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoc2ltcGxlID0gJ2Z1bmN0aW9uJyAhPSB0eXBlb2Ygbm9kZU5hbWUpIGlmIChudWxsID09IGNoaWxkKSBjaGlsZCA9ICcnOyBlbHNlIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgY2hpbGQpIGNoaWxkID0gU3RyaW5nKGNoaWxkKTsgZWxzZSBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIGNoaWxkKSBzaW1wbGUgPSAhMTtcbiAgICAgICAgICAgIGlmIChzaW1wbGUgJiYgbGFzdFNpbXBsZSkgY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gMV0gKz0gY2hpbGQ7IGVsc2UgaWYgKGNoaWxkcmVuID09PSBFTVBUWV9DSElMRFJFTikgY2hpbGRyZW4gPSBbIGNoaWxkIF07IGVsc2UgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgICAgICBsYXN0U2ltcGxlID0gc2ltcGxlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwID0gbmV3IFZOb2RlKCk7XG4gICAgICAgIHAubm9kZU5hbWUgPSBub2RlTmFtZTtcbiAgICAgICAgcC5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgICBwLmF0dHJpYnV0ZXMgPSBudWxsID09IGF0dHJpYnV0ZXMgPyB2b2lkIDAgOiBhdHRyaWJ1dGVzO1xuICAgICAgICBwLmtleSA9IG51bGwgPT0gYXR0cmlidXRlcyA/IHZvaWQgMCA6IGF0dHJpYnV0ZXMua2V5O1xuICAgICAgICBpZiAodm9pZCAwICE9PSBvcHRpb25zLnZub2RlKSBvcHRpb25zLnZub2RlKHApO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZXh0ZW5kKG9iaiwgcHJvcHMpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBwcm9wcykgb2JqW2ldID0gcHJvcHNbaV07XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNsb25lRWxlbWVudCh2bm9kZSwgcHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIGgodm5vZGUubm9kZU5hbWUsIGV4dGVuZChleHRlbmQoe30sIHZub2RlLmF0dHJpYnV0ZXMpLCBwcm9wcyksIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpIDogdm5vZGUuY2hpbGRyZW4pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlbnF1ZXVlUmVuZGVyKGNvbXBvbmVudCkge1xuICAgICAgICBpZiAoIWNvbXBvbmVudC5fX2QgJiYgKGNvbXBvbmVudC5fX2QgPSAhMCkgJiYgMSA9PSBpdGVtcy5wdXNoKGNvbXBvbmVudCkpIChvcHRpb25zLmRlYm91bmNlUmVuZGVyaW5nIHx8IGRlZmVyKShyZXJlbmRlcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlcmVuZGVyKCkge1xuICAgICAgICB2YXIgcCwgbGlzdCA9IGl0ZW1zO1xuICAgICAgICBpdGVtcyA9IFtdO1xuICAgICAgICB3aGlsZSAocCA9IGxpc3QucG9wKCkpIGlmIChwLl9fZCkgcmVuZGVyQ29tcG9uZW50KHApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1NhbWVOb2RlVHlwZShub2RlLCB2bm9kZSwgaHlkcmF0aW5nKSB7XG4gICAgICAgIGlmICgnc3RyaW5nJyA9PSB0eXBlb2Ygdm5vZGUgfHwgJ251bWJlcicgPT0gdHlwZW9mIHZub2RlKSByZXR1cm4gdm9pZCAwICE9PSBub2RlLnNwbGl0VGV4dDtcbiAgICAgICAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiB2bm9kZS5ub2RlTmFtZSkgcmV0dXJuICFub2RlLl9jb21wb25lbnRDb25zdHJ1Y3RvciAmJiBpc05hbWVkTm9kZShub2RlLCB2bm9kZS5ub2RlTmFtZSk7IGVsc2UgcmV0dXJuIGh5ZHJhdGluZyB8fCBub2RlLl9jb21wb25lbnRDb25zdHJ1Y3RvciA9PT0gdm5vZGUubm9kZU5hbWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTmFtZWROb2RlKG5vZGUsIG5vZGVOYW1lKSB7XG4gICAgICAgIHJldHVybiBub2RlLl9fbiA9PT0gbm9kZU5hbWUgfHwgbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXROb2RlUHJvcHModm5vZGUpIHtcbiAgICAgICAgdmFyIHByb3BzID0gZXh0ZW5kKHt9LCB2bm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGRlZmF1bHRQcm9wcyA9IHZub2RlLm5vZGVOYW1lLmRlZmF1bHRQcm9wcztcbiAgICAgICAgaWYgKHZvaWQgMCAhPT0gZGVmYXVsdFByb3BzKSBmb3IgKHZhciBpIGluIGRlZmF1bHRQcm9wcykgaWYgKHZvaWQgMCA9PT0gcHJvcHNbaV0pIHByb3BzW2ldID0gZGVmYXVsdFByb3BzW2ldO1xuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZU5vZGUobm9kZU5hbWUsIGlzU3ZnKSB7XG4gICAgICAgIHZhciBub2RlID0gaXNTdmcgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgbm9kZU5hbWUpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlTmFtZSk7XG4gICAgICAgIG5vZGUuX19uID0gbm9kZU5hbWU7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChwYXJlbnROb2RlKSBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRBY2Nlc3Nvcihub2RlLCBuYW1lLCBvbGQsIHZhbHVlLCBpc1N2Zykge1xuICAgICAgICBpZiAoJ2NsYXNzTmFtZScgPT09IG5hbWUpIG5hbWUgPSAnY2xhc3MnO1xuICAgICAgICBpZiAoJ2tleScgPT09IG5hbWUpIDsgZWxzZSBpZiAoJ3JlZicgPT09IG5hbWUpIHtcbiAgICAgICAgICAgIGlmIChvbGQpIG9sZChudWxsKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkgdmFsdWUobm9kZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2NsYXNzJyA9PT0gbmFtZSAmJiAhaXNTdmcpIG5vZGUuY2xhc3NOYW1lID0gdmFsdWUgfHwgJyc7IGVsc2UgaWYgKCdzdHlsZScgPT09IG5hbWUpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUgfHwgJ3N0cmluZycgPT0gdHlwZW9mIHZhbHVlIHx8ICdzdHJpbmcnID09IHR5cGVvZiBvbGQpIG5vZGUuc3R5bGUuY3NzVGV4dCA9IHZhbHVlIHx8ICcnO1xuICAgICAgICAgICAgaWYgKHZhbHVlICYmICdvYmplY3QnID09IHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICgnc3RyaW5nJyAhPSB0eXBlb2Ygb2xkKSBmb3IgKHZhciBpIGluIG9sZCkgaWYgKCEoaSBpbiB2YWx1ZSkpIG5vZGUuc3R5bGVbaV0gPSAnJztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHZhbHVlKSBub2RlLnN0eWxlW2ldID0gJ251bWJlcicgPT0gdHlwZW9mIHZhbHVlW2ldICYmICExID09PSBJU19OT05fRElNRU5TSU9OQUwudGVzdChpKSA/IHZhbHVlW2ldICsgJ3B4JyA6IHZhbHVlW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCdkYW5nZXJvdXNseVNldElubmVySFRNTCcgPT09IG5hbWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkgbm9kZS5pbm5lckhUTUwgPSB2YWx1ZS5fX2h0bWwgfHwgJyc7XG4gICAgICAgIH0gZWxzZSBpZiAoJ28nID09IG5hbWVbMF0gJiYgJ24nID09IG5hbWVbMV0pIHtcbiAgICAgICAgICAgIHZhciB1c2VDYXB0dXJlID0gbmFtZSAhPT0gKG5hbWUgPSBuYW1lLnJlcGxhY2UoL0NhcHR1cmUkLywgJycpKTtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCkuc3Vic3RyaW5nKDIpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvbGQpIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudFByb3h5LCB1c2VDYXB0dXJlKTtcbiAgICAgICAgICAgIH0gZWxzZSBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnRQcm94eSwgdXNlQ2FwdHVyZSk7XG4gICAgICAgICAgICAobm9kZS5fX2wgfHwgKG5vZGUuX19sID0ge30pKVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKCdsaXN0JyAhPT0gbmFtZSAmJiAndHlwZScgIT09IG5hbWUgJiYgIWlzU3ZnICYmIG5hbWUgaW4gbm9kZSkge1xuICAgICAgICAgICAgc2V0UHJvcGVydHkobm9kZSwgbmFtZSwgbnVsbCA9PSB2YWx1ZSA/ICcnIDogdmFsdWUpO1xuICAgICAgICAgICAgaWYgKG51bGwgPT0gdmFsdWUgfHwgITEgPT09IHZhbHVlKSBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBucyA9IGlzU3ZnICYmIG5hbWUgIT09IChuYW1lID0gbmFtZS5yZXBsYWNlKC9eeGxpbmtcXDo/LywgJycpKTtcbiAgICAgICAgICAgIGlmIChudWxsID09IHZhbHVlIHx8ICExID09PSB2YWx1ZSkgaWYgKG5zKSBub2RlLnJlbW92ZUF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgbmFtZS50b0xvd2VyQ2FzZSgpKTsgZWxzZSBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTsgZWxzZSBpZiAoJ2Z1bmN0aW9uJyAhPSB0eXBlb2YgdmFsdWUpIGlmIChucykgbm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIG5hbWUudG9Mb3dlckNhc2UoKSwgdmFsdWUpOyBlbHNlIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRQcm9wZXJ0eShub2RlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbm9kZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cbiAgICBmdW5jdGlvbiBldmVudFByb3h5KGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19sW2UudHlwZV0ob3B0aW9ucy5ldmVudCAmJiBvcHRpb25zLmV2ZW50KGUpIHx8IGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmbHVzaE1vdW50cygpIHtcbiAgICAgICAgdmFyIGM7XG4gICAgICAgIHdoaWxlIChjID0gbW91bnRzLnBvcCgpKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5hZnRlck1vdW50KSBvcHRpb25zLmFmdGVyTW91bnQoYyk7XG4gICAgICAgICAgICBpZiAoYy5jb21wb25lbnREaWRNb3VudCkgYy5jb21wb25lbnREaWRNb3VudCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpZmYoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwsIHBhcmVudCwgY29tcG9uZW50Um9vdCkge1xuICAgICAgICBpZiAoIWRpZmZMZXZlbCsrKSB7XG4gICAgICAgICAgICBpc1N2Z01vZGUgPSBudWxsICE9IHBhcmVudCAmJiB2b2lkIDAgIT09IHBhcmVudC5vd25lclNWR0VsZW1lbnQ7XG4gICAgICAgICAgICBoeWRyYXRpbmcgPSBudWxsICE9IGRvbSAmJiAhKCdfX3ByZWFjdGF0dHJfJyBpbiBkb20pO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXQgPSBpZGlmZihkb20sIHZub2RlLCBjb250ZXh0LCBtb3VudEFsbCwgY29tcG9uZW50Um9vdCk7XG4gICAgICAgIGlmIChwYXJlbnQgJiYgcmV0LnBhcmVudE5vZGUgIT09IHBhcmVudCkgcGFyZW50LmFwcGVuZENoaWxkKHJldCk7XG4gICAgICAgIGlmICghLS1kaWZmTGV2ZWwpIHtcbiAgICAgICAgICAgIGh5ZHJhdGluZyA9ICExO1xuICAgICAgICAgICAgaWYgKCFjb21wb25lbnRSb290KSBmbHVzaE1vdW50cygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlkaWZmKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsLCBjb21wb25lbnRSb290KSB7XG4gICAgICAgIHZhciBvdXQgPSBkb20sIHByZXZTdmdNb2RlID0gaXNTdmdNb2RlO1xuICAgICAgICBpZiAobnVsbCA9PSB2bm9kZSB8fCAnYm9vbGVhbicgPT0gdHlwZW9mIHZub2RlKSB2bm9kZSA9ICcnO1xuICAgICAgICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIHZub2RlIHx8ICdudW1iZXInID09IHR5cGVvZiB2bm9kZSkge1xuICAgICAgICAgICAgaWYgKGRvbSAmJiB2b2lkIDAgIT09IGRvbS5zcGxpdFRleHQgJiYgZG9tLnBhcmVudE5vZGUgJiYgKCFkb20uX2NvbXBvbmVudCB8fCBjb21wb25lbnRSb290KSkge1xuICAgICAgICAgICAgICAgIGlmIChkb20ubm9kZVZhbHVlICE9IHZub2RlKSBkb20ubm9kZVZhbHVlID0gdm5vZGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoZG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb20ucGFyZW50Tm9kZSkgZG9tLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG91dCwgZG9tKTtcbiAgICAgICAgICAgICAgICAgICAgcmVjb2xsZWN0Tm9kZVRyZWUoZG9tLCAhMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0Ll9fcHJlYWN0YXR0cl8gPSAhMDtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZub2RlTmFtZSA9IHZub2RlLm5vZGVOYW1lO1xuICAgICAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2Ygdm5vZGVOYW1lKSByZXR1cm4gYnVpbGRDb21wb25lbnRGcm9tVk5vZGUoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwpO1xuICAgICAgICBpc1N2Z01vZGUgPSAnc3ZnJyA9PT0gdm5vZGVOYW1lID8gITAgOiAnZm9yZWlnbk9iamVjdCcgPT09IHZub2RlTmFtZSA/ICExIDogaXNTdmdNb2RlO1xuICAgICAgICB2bm9kZU5hbWUgPSBTdHJpbmcodm5vZGVOYW1lKTtcbiAgICAgICAgaWYgKCFkb20gfHwgIWlzTmFtZWROb2RlKGRvbSwgdm5vZGVOYW1lKSkge1xuICAgICAgICAgICAgb3V0ID0gY3JlYXRlTm9kZSh2bm9kZU5hbWUsIGlzU3ZnTW9kZSk7XG4gICAgICAgICAgICBpZiAoZG9tKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGRvbS5maXJzdENoaWxkKSBvdXQuYXBwZW5kQ2hpbGQoZG9tLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgICAgIGlmIChkb20ucGFyZW50Tm9kZSkgZG9tLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG91dCwgZG9tKTtcbiAgICAgICAgICAgICAgICByZWNvbGxlY3ROb2RlVHJlZShkb20sICEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZmMgPSBvdXQuZmlyc3RDaGlsZCwgcHJvcHMgPSBvdXQuX19wcmVhY3RhdHRyXywgdmNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChudWxsID09IHByb3BzKSB7XG4gICAgICAgICAgICBwcm9wcyA9IG91dC5fX3ByZWFjdGF0dHJfID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBhID0gb3V0LmF0dHJpYnV0ZXMsIGkgPSBhLmxlbmd0aDsgaS0tOyApIHByb3BzW2FbaV0ubmFtZV0gPSBhW2ldLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaHlkcmF0aW5nICYmIHZjaGlsZHJlbiAmJiAxID09PSB2Y2hpbGRyZW4ubGVuZ3RoICYmICdzdHJpbmcnID09IHR5cGVvZiB2Y2hpbGRyZW5bMF0gJiYgbnVsbCAhPSBmYyAmJiB2b2lkIDAgIT09IGZjLnNwbGl0VGV4dCAmJiBudWxsID09IGZjLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICBpZiAoZmMubm9kZVZhbHVlICE9IHZjaGlsZHJlblswXSkgZmMubm9kZVZhbHVlID0gdmNoaWxkcmVuWzBdO1xuICAgICAgICB9IGVsc2UgaWYgKHZjaGlsZHJlbiAmJiB2Y2hpbGRyZW4ubGVuZ3RoIHx8IG51bGwgIT0gZmMpIGlubmVyRGlmZk5vZGUob3V0LCB2Y2hpbGRyZW4sIGNvbnRleHQsIG1vdW50QWxsLCBoeWRyYXRpbmcgfHwgbnVsbCAhPSBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCk7XG4gICAgICAgIGRpZmZBdHRyaWJ1dGVzKG91dCwgdm5vZGUuYXR0cmlidXRlcywgcHJvcHMpO1xuICAgICAgICBpc1N2Z01vZGUgPSBwcmV2U3ZnTW9kZTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5uZXJEaWZmTm9kZShkb20sIHZjaGlsZHJlbiwgY29udGV4dCwgbW91bnRBbGwsIGlzSHlkcmF0aW5nKSB7XG4gICAgICAgIHZhciBqLCBjLCBmLCB2Y2hpbGQsIGNoaWxkLCBvcmlnaW5hbENoaWxkcmVuID0gZG9tLmNoaWxkTm9kZXMsIGNoaWxkcmVuID0gW10sIGtleWVkID0ge30sIGtleWVkTGVuID0gMCwgbWluID0gMCwgbGVuID0gb3JpZ2luYWxDaGlsZHJlbi5sZW5ndGgsIGNoaWxkcmVuTGVuID0gMCwgdmxlbiA9IHZjaGlsZHJlbiA/IHZjaGlsZHJlbi5sZW5ndGggOiAwO1xuICAgICAgICBpZiAoMCAhPT0gbGVuKSBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgX2NoaWxkID0gb3JpZ2luYWxDaGlsZHJlbltpXSwgcHJvcHMgPSBfY2hpbGQuX19wcmVhY3RhdHRyXywga2V5ID0gdmxlbiAmJiBwcm9wcyA/IF9jaGlsZC5fY29tcG9uZW50ID8gX2NoaWxkLl9jb21wb25lbnQuX19rIDogcHJvcHMua2V5IDogbnVsbDtcbiAgICAgICAgICAgIGlmIChudWxsICE9IGtleSkge1xuICAgICAgICAgICAgICAgIGtleWVkTGVuKys7XG4gICAgICAgICAgICAgICAga2V5ZWRba2V5XSA9IF9jaGlsZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcHMgfHwgKHZvaWQgMCAhPT0gX2NoaWxkLnNwbGl0VGV4dCA/IGlzSHlkcmF0aW5nID8gX2NoaWxkLm5vZGVWYWx1ZS50cmltKCkgOiAhMCA6IGlzSHlkcmF0aW5nKSkgY2hpbGRyZW5bY2hpbGRyZW5MZW4rK10gPSBfY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKDAgIT09IHZsZW4pIGZvciAodmFyIGkgPSAwOyBpIDwgdmxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2Y2hpbGQgPSB2Y2hpbGRyZW5baV07XG4gICAgICAgICAgICBjaGlsZCA9IG51bGw7XG4gICAgICAgICAgICB2YXIga2V5ID0gdmNoaWxkLmtleTtcbiAgICAgICAgICAgIGlmIChudWxsICE9IGtleSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXllZExlbiAmJiB2b2lkIDAgIT09IGtleWVkW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSBrZXllZFtrZXldO1xuICAgICAgICAgICAgICAgICAgICBrZXllZFtrZXldID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICBrZXllZExlbi0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWNoaWxkICYmIG1pbiA8IGNoaWxkcmVuTGVuKSBmb3IgKGogPSBtaW47IGogPCBjaGlsZHJlbkxlbjsgaisrKSBpZiAodm9pZCAwICE9PSBjaGlsZHJlbltqXSAmJiBpc1NhbWVOb2RlVHlwZShjID0gY2hpbGRyZW5bal0sIHZjaGlsZCwgaXNIeWRyYXRpbmcpKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQgPSBjO1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuW2pdID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIGlmIChqID09PSBjaGlsZHJlbkxlbiAtIDEpIGNoaWxkcmVuTGVuLS07XG4gICAgICAgICAgICAgICAgaWYgKGogPT09IG1pbikgbWluKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGlsZCA9IGlkaWZmKGNoaWxkLCB2Y2hpbGQsIGNvbnRleHQsIG1vdW50QWxsKTtcbiAgICAgICAgICAgIGYgPSBvcmlnaW5hbENoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGNoaWxkICYmIGNoaWxkICE9PSBkb20gJiYgY2hpbGQgIT09IGYpIGlmIChudWxsID09IGYpIGRvbS5hcHBlbmRDaGlsZChjaGlsZCk7IGVsc2UgaWYgKGNoaWxkID09PSBmLm5leHRTaWJsaW5nKSByZW1vdmVOb2RlKGYpOyBlbHNlIGRvbS5pbnNlcnRCZWZvcmUoY2hpbGQsIGYpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXllZExlbikgZm9yICh2YXIgaSBpbiBrZXllZCkgaWYgKHZvaWQgMCAhPT0ga2V5ZWRbaV0pIHJlY29sbGVjdE5vZGVUcmVlKGtleWVkW2ldLCAhMSk7XG4gICAgICAgIHdoaWxlIChtaW4gPD0gY2hpbGRyZW5MZW4pIGlmICh2b2lkIDAgIT09IChjaGlsZCA9IGNoaWxkcmVuW2NoaWxkcmVuTGVuLS1dKSkgcmVjb2xsZWN0Tm9kZVRyZWUoY2hpbGQsICExKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVjb2xsZWN0Tm9kZVRyZWUobm9kZSwgdW5tb3VudE9ubHkpIHtcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IG5vZGUuX2NvbXBvbmVudDtcbiAgICAgICAgaWYgKGNvbXBvbmVudCkgdW5tb3VudENvbXBvbmVudChjb21wb25lbnQpOyBlbHNlIHtcbiAgICAgICAgICAgIGlmIChudWxsICE9IG5vZGUuX19wcmVhY3RhdHRyXyAmJiBub2RlLl9fcHJlYWN0YXR0cl8ucmVmKSBub2RlLl9fcHJlYWN0YXR0cl8ucmVmKG51bGwpO1xuICAgICAgICAgICAgaWYgKCExID09PSB1bm1vdW50T25seSB8fCBudWxsID09IG5vZGUuX19wcmVhY3RhdHRyXykgcmVtb3ZlTm9kZShub2RlKTtcbiAgICAgICAgICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuKG5vZGUpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUubGFzdENoaWxkO1xuICAgICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICAgICAgdmFyIG5leHQgPSBub2RlLnByZXZpb3VzU2libGluZztcbiAgICAgICAgICAgIHJlY29sbGVjdE5vZGVUcmVlKG5vZGUsICEwKTtcbiAgICAgICAgICAgIG5vZGUgPSBuZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpZmZBdHRyaWJ1dGVzKGRvbSwgYXR0cnMsIG9sZCkge1xuICAgICAgICB2YXIgbmFtZTtcbiAgICAgICAgZm9yIChuYW1lIGluIG9sZCkgaWYgKCghYXR0cnMgfHwgbnVsbCA9PSBhdHRyc1tuYW1lXSkgJiYgbnVsbCAhPSBvbGRbbmFtZV0pIHNldEFjY2Vzc29yKGRvbSwgbmFtZSwgb2xkW25hbWVdLCBvbGRbbmFtZV0gPSB2b2lkIDAsIGlzU3ZnTW9kZSk7XG4gICAgICAgIGZvciAobmFtZSBpbiBhdHRycykgaWYgKCEoJ2NoaWxkcmVuJyA9PT0gbmFtZSB8fCAnaW5uZXJIVE1MJyA9PT0gbmFtZSB8fCBuYW1lIGluIG9sZCAmJiBhdHRyc1tuYW1lXSA9PT0gKCd2YWx1ZScgPT09IG5hbWUgfHwgJ2NoZWNrZWQnID09PSBuYW1lID8gZG9tW25hbWVdIDogb2xkW25hbWVdKSkpIHNldEFjY2Vzc29yKGRvbSwgbmFtZSwgb2xkW25hbWVdLCBvbGRbbmFtZV0gPSBhdHRyc1tuYW1lXSwgaXNTdmdNb2RlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29sbGVjdENvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBjb21wb25lbnQuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgKGNvbXBvbmVudHNbbmFtZV0gfHwgKGNvbXBvbmVudHNbbmFtZV0gPSBbXSkpLnB1c2goY29tcG9uZW50KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KEN0b3IsIHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBpbnN0LCBsaXN0ID0gY29tcG9uZW50c1tDdG9yLm5hbWVdO1xuICAgICAgICBpZiAoQ3Rvci5wcm90b3R5cGUgJiYgQ3Rvci5wcm90b3R5cGUucmVuZGVyKSB7XG4gICAgICAgICAgICBpbnN0ID0gbmV3IEN0b3IocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgQ29tcG9uZW50LmNhbGwoaW5zdCwgcHJvcHMsIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5zdCA9IG5ldyBDb21wb25lbnQocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgaW5zdC5jb25zdHJ1Y3RvciA9IEN0b3I7XG4gICAgICAgICAgICBpbnN0LnJlbmRlciA9IGRvUmVuZGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0KSBmb3IgKHZhciBpID0gbGlzdC5sZW5ndGg7IGktLTsgKSBpZiAobGlzdFtpXS5jb25zdHJ1Y3RvciA9PT0gQ3Rvcikge1xuICAgICAgICAgICAgaW5zdC5fX2IgPSBsaXN0W2ldLl9fYjtcbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRvUmVuZGVyKHByb3BzLCBzdGF0ZSwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldENvbXBvbmVudFByb3BzKGNvbXBvbmVudCwgcHJvcHMsIG9wdHMsIGNvbnRleHQsIG1vdW50QWxsKSB7XG4gICAgICAgIGlmICghY29tcG9uZW50Ll9feCkge1xuICAgICAgICAgICAgY29tcG9uZW50Ll9feCA9ICEwO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5fX3IgPSBwcm9wcy5yZWYpIGRlbGV0ZSBwcm9wcy5yZWY7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50Ll9fayA9IHByb3BzLmtleSkgZGVsZXRlIHByb3BzLmtleTtcbiAgICAgICAgICAgIGlmICghY29tcG9uZW50LmJhc2UgfHwgbW91bnRBbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCkgY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcykgY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gY29tcG9uZW50LmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBvbmVudC5fX2MpIGNvbXBvbmVudC5fX2MgPSBjb21wb25lbnQuY29udGV4dDtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNvbXBvbmVudC5fX3ApIGNvbXBvbmVudC5fX3AgPSBjb21wb25lbnQucHJvcHM7XG4gICAgICAgICAgICBjb21wb25lbnQucHJvcHMgPSBwcm9wcztcbiAgICAgICAgICAgIGNvbXBvbmVudC5fX3ggPSAhMTtcbiAgICAgICAgICAgIGlmICgwICE9PSBvcHRzKSBpZiAoMSA9PT0gb3B0cyB8fCAhMSAhPT0gb3B0aW9ucy5zeW5jQ29tcG9uZW50VXBkYXRlcyB8fCAhY29tcG9uZW50LmJhc2UpIHJlbmRlckNvbXBvbmVudChjb21wb25lbnQsIDEsIG1vdW50QWxsKTsgZWxzZSBlbnF1ZXVlUmVuZGVyKGNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50Ll9fcikgY29tcG9uZW50Ll9fcihjb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlckNvbXBvbmVudChjb21wb25lbnQsIG9wdHMsIG1vdW50QWxsLCBpc0NoaWxkKSB7XG4gICAgICAgIGlmICghY29tcG9uZW50Ll9feCkge1xuICAgICAgICAgICAgdmFyIHJlbmRlcmVkLCBpbnN0LCBjYmFzZSwgcHJvcHMgPSBjb21wb25lbnQucHJvcHMsIHN0YXRlID0gY29tcG9uZW50LnN0YXRlLCBjb250ZXh0ID0gY29tcG9uZW50LmNvbnRleHQsIHByZXZpb3VzUHJvcHMgPSBjb21wb25lbnQuX19wIHx8IHByb3BzLCBwcmV2aW91c1N0YXRlID0gY29tcG9uZW50Ll9fcyB8fCBzdGF0ZSwgcHJldmlvdXNDb250ZXh0ID0gY29tcG9uZW50Ll9fYyB8fCBjb250ZXh0LCBpc1VwZGF0ZSA9IGNvbXBvbmVudC5iYXNlLCBuZXh0QmFzZSA9IGNvbXBvbmVudC5fX2IsIGluaXRpYWxCYXNlID0gaXNVcGRhdGUgfHwgbmV4dEJhc2UsIGluaXRpYWxDaGlsZENvbXBvbmVudCA9IGNvbXBvbmVudC5fY29tcG9uZW50LCBza2lwID0gITE7XG4gICAgICAgICAgICBpZiAoaXNVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQucHJvcHMgPSBwcmV2aW91c1Byb3BzO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5zdGF0ZSA9IHByZXZpb3VzU3RhdGU7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LmNvbnRleHQgPSBwcmV2aW91c0NvbnRleHQ7XG4gICAgICAgICAgICAgICAgaWYgKDIgIT09IG9wdHMgJiYgY29tcG9uZW50LnNob3VsZENvbXBvbmVudFVwZGF0ZSAmJiAhMSA9PT0gY29tcG9uZW50LnNob3VsZENvbXBvbmVudFVwZGF0ZShwcm9wcywgc3RhdGUsIGNvbnRleHQpKSBza2lwID0gITA7IGVsc2UgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsVXBkYXRlKSBjb21wb25lbnQuY29tcG9uZW50V2lsbFVwZGF0ZShwcm9wcywgc3RhdGUsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5wcm9wcyA9IHByb3BzO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBvbmVudC5fX3AgPSBjb21wb25lbnQuX19zID0gY29tcG9uZW50Ll9fYyA9IGNvbXBvbmVudC5fX2IgPSBudWxsO1xuICAgICAgICAgICAgY29tcG9uZW50Ll9fZCA9ICExO1xuICAgICAgICAgICAgaWYgKCFza2lwKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyZWQgPSBjb21wb25lbnQucmVuZGVyKHByb3BzLCBzdGF0ZSwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5nZXRDaGlsZENvbnRleHQpIGNvbnRleHQgPSBleHRlbmQoZXh0ZW5kKHt9LCBjb250ZXh0KSwgY29tcG9uZW50LmdldENoaWxkQ29udGV4dCgpKTtcbiAgICAgICAgICAgICAgICB2YXIgdG9Vbm1vdW50LCBiYXNlLCBjaGlsZENvbXBvbmVudCA9IHJlbmRlcmVkICYmIHJlbmRlcmVkLm5vZGVOYW1lO1xuICAgICAgICAgICAgICAgIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBjaGlsZENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRQcm9wcyA9IGdldE5vZGVQcm9wcyhyZW5kZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgIGluc3QgPSBpbml0aWFsQ2hpbGRDb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnN0ICYmIGluc3QuY29uc3RydWN0b3IgPT09IGNoaWxkQ29tcG9uZW50ICYmIGNoaWxkUHJvcHMua2V5ID09IGluc3QuX19rKSBzZXRDb21wb25lbnRQcm9wcyhpbnN0LCBjaGlsZFByb3BzLCAxLCBjb250ZXh0LCAhMSk7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9Vbm1vdW50ID0gaW5zdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5fY29tcG9uZW50ID0gaW5zdCA9IGNyZWF0ZUNvbXBvbmVudChjaGlsZENvbXBvbmVudCwgY2hpbGRQcm9wcywgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0Ll9fYiA9IGluc3QuX19iIHx8IG5leHRCYXNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdC5fX3UgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDb21wb25lbnRQcm9wcyhpbnN0LCBjaGlsZFByb3BzLCAwLCBjb250ZXh0LCAhMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJDb21wb25lbnQoaW5zdCwgMSwgbW91bnRBbGwsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBiYXNlID0gaW5zdC5iYXNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNiYXNlID0gaW5pdGlhbEJhc2U7XG4gICAgICAgICAgICAgICAgICAgIHRvVW5tb3VudCA9IGluaXRpYWxDaGlsZENvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvVW5tb3VudCkgY2Jhc2UgPSBjb21wb25lbnQuX2NvbXBvbmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsQmFzZSB8fCAxID09PSBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2Jhc2UpIGNiYXNlLl9jb21wb25lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IGRpZmYoY2Jhc2UsIHJlbmRlcmVkLCBjb250ZXh0LCBtb3VudEFsbCB8fCAhaXNVcGRhdGUsIGluaXRpYWxCYXNlICYmIGluaXRpYWxCYXNlLnBhcmVudE5vZGUsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbEJhc2UgJiYgYmFzZSAhPT0gaW5pdGlhbEJhc2UgJiYgaW5zdCAhPT0gaW5pdGlhbENoaWxkQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiYXNlUGFyZW50ID0gaW5pdGlhbEJhc2UucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VQYXJlbnQgJiYgYmFzZSAhPT0gYmFzZVBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVBhcmVudC5yZXBsYWNlQ2hpbGQoYmFzZSwgaW5pdGlhbEJhc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0b1VubW91bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsQmFzZS5fY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvbGxlY3ROb2RlVHJlZShpbml0aWFsQmFzZSwgITEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0b1VubW91bnQpIHVubW91bnRDb21wb25lbnQodG9Vbm1vdW50KTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuYmFzZSA9IGJhc2U7XG4gICAgICAgICAgICAgICAgaWYgKGJhc2UgJiYgIWlzQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudCwgdCA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHQgPSB0Ll9fdSkgKGNvbXBvbmVudFJlZiA9IHQpLmJhc2UgPSBiYXNlO1xuICAgICAgICAgICAgICAgICAgICBiYXNlLl9jb21wb25lbnQgPSBjb21wb25lbnRSZWY7XG4gICAgICAgICAgICAgICAgICAgIGJhc2UuX2NvbXBvbmVudENvbnN0cnVjdG9yID0gY29tcG9uZW50UmVmLmNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNVcGRhdGUgfHwgbW91bnRBbGwpIG1vdW50cy51bnNoaWZ0KGNvbXBvbmVudCk7IGVsc2UgaWYgKCFza2lwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUpIGNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUocHJldmlvdXNQcm9wcywgcHJldmlvdXNTdGF0ZSwgcHJldmlvdXNDb250ZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5hZnRlclVwZGF0ZSkgb3B0aW9ucy5hZnRlclVwZGF0ZShjb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG51bGwgIT0gY29tcG9uZW50Ll9faCkgd2hpbGUgKGNvbXBvbmVudC5fX2gubGVuZ3RoKSBjb21wb25lbnQuX19oLnBvcCgpLmNhbGwoY29tcG9uZW50KTtcbiAgICAgICAgICAgIGlmICghZGlmZkxldmVsICYmICFpc0NoaWxkKSBmbHVzaE1vdW50cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJ1aWxkQ29tcG9uZW50RnJvbVZOb2RlKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsKSB7XG4gICAgICAgIHZhciBjID0gZG9tICYmIGRvbS5fY29tcG9uZW50LCBvcmlnaW5hbENvbXBvbmVudCA9IGMsIG9sZERvbSA9IGRvbSwgaXNEaXJlY3RPd25lciA9IGMgJiYgZG9tLl9jb21wb25lbnRDb25zdHJ1Y3RvciA9PT0gdm5vZGUubm9kZU5hbWUsIGlzT3duZXIgPSBpc0RpcmVjdE93bmVyLCBwcm9wcyA9IGdldE5vZGVQcm9wcyh2bm9kZSk7XG4gICAgICAgIHdoaWxlIChjICYmICFpc093bmVyICYmIChjID0gYy5fX3UpKSBpc093bmVyID0gYy5jb25zdHJ1Y3RvciA9PT0gdm5vZGUubm9kZU5hbWU7XG4gICAgICAgIGlmIChjICYmIGlzT3duZXIgJiYgKCFtb3VudEFsbCB8fCBjLl9jb21wb25lbnQpKSB7XG4gICAgICAgICAgICBzZXRDb21wb25lbnRQcm9wcyhjLCBwcm9wcywgMywgY29udGV4dCwgbW91bnRBbGwpO1xuICAgICAgICAgICAgZG9tID0gYy5iYXNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsQ29tcG9uZW50ICYmICFpc0RpcmVjdE93bmVyKSB7XG4gICAgICAgICAgICAgICAgdW5tb3VudENvbXBvbmVudChvcmlnaW5hbENvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgZG9tID0gb2xkRG9tID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGMgPSBjcmVhdGVDb21wb25lbnQodm5vZGUubm9kZU5hbWUsIHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgICAgIGlmIChkb20gJiYgIWMuX19iKSB7XG4gICAgICAgICAgICAgICAgYy5fX2IgPSBkb207XG4gICAgICAgICAgICAgICAgb2xkRG9tID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldENvbXBvbmVudFByb3BzKGMsIHByb3BzLCAxLCBjb250ZXh0LCBtb3VudEFsbCk7XG4gICAgICAgICAgICBkb20gPSBjLmJhc2U7XG4gICAgICAgICAgICBpZiAob2xkRG9tICYmIGRvbSAhPT0gb2xkRG9tKSB7XG4gICAgICAgICAgICAgICAgb2xkRG9tLl9jb21wb25lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJlY29sbGVjdE5vZGVUcmVlKG9sZERvbSwgITEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkb207XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVubW91bnRDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmJlZm9yZVVubW91bnQpIG9wdGlvbnMuYmVmb3JlVW5tb3VudChjb21wb25lbnQpO1xuICAgICAgICB2YXIgYmFzZSA9IGNvbXBvbmVudC5iYXNlO1xuICAgICAgICBjb21wb25lbnQuX194ID0gITA7XG4gICAgICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbFVubW91bnQpIGNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuICAgICAgICBjb21wb25lbnQuYmFzZSA9IG51bGw7XG4gICAgICAgIHZhciBpbm5lciA9IGNvbXBvbmVudC5fY29tcG9uZW50O1xuICAgICAgICBpZiAoaW5uZXIpIHVubW91bnRDb21wb25lbnQoaW5uZXIpOyBlbHNlIGlmIChiYXNlKSB7XG4gICAgICAgICAgICBpZiAoYmFzZS5fX3ByZWFjdGF0dHJfICYmIGJhc2UuX19wcmVhY3RhdHRyXy5yZWYpIGJhc2UuX19wcmVhY3RhdHRyXy5yZWYobnVsbCk7XG4gICAgICAgICAgICBjb21wb25lbnQuX19iID0gYmFzZTtcbiAgICAgICAgICAgIHJlbW92ZU5vZGUoYmFzZSk7XG4gICAgICAgICAgICBjb2xsZWN0Q29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgICAgICByZW1vdmVDaGlsZHJlbihiYXNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcG9uZW50Ll9fcikgY29tcG9uZW50Ll9fcihudWxsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gQ29tcG9uZW50KHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX19kID0gITA7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuc3RhdGUgfHwge307XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlcih2bm9kZSwgcGFyZW50LCBtZXJnZSkge1xuICAgICAgICByZXR1cm4gZGlmZihtZXJnZSwgdm5vZGUsIHt9LCAhMSwgcGFyZW50LCAhMSk7XG4gICAgfVxuICAgIHZhciBvcHRpb25zID0ge307XG4gICAgdmFyIHN0YWNrID0gW107XG4gICAgdmFyIEVNUFRZX0NISUxEUkVOID0gW107XG4gICAgdmFyIGRlZmVyID0gJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgUHJvbWlzZSA/IFByb21pc2UucmVzb2x2ZSgpLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSkgOiBzZXRUaW1lb3V0O1xuICAgIHZhciBJU19OT05fRElNRU5TSU9OQUwgPSAvYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmQvaTtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICB2YXIgbW91bnRzID0gW107XG4gICAgdmFyIGRpZmZMZXZlbCA9IDA7XG4gICAgdmFyIGlzU3ZnTW9kZSA9ICExO1xuICAgIHZhciBoeWRyYXRpbmcgPSAhMTtcbiAgICB2YXIgY29tcG9uZW50cyA9IHt9O1xuICAgIGV4dGVuZChDb21wb25lbnQucHJvdG90eXBlLCB7XG4gICAgICAgIHNldFN0YXRlOiBmdW5jdGlvbihzdGF0ZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBzID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fX3MpIHRoaXMuX19zID0gZXh0ZW5kKHt9LCBzKTtcbiAgICAgICAgICAgIGV4dGVuZChzLCAnZnVuY3Rpb24nID09IHR5cGVvZiBzdGF0ZSA/IHN0YXRlKHMsIHRoaXMucHJvcHMpIDogc3RhdGUpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSAodGhpcy5fX2ggPSB0aGlzLl9faCB8fCBbXSkucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICBlbnF1ZXVlUmVuZGVyKHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBmb3JjZVVwZGF0ZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgKHRoaXMuX19oID0gdGhpcy5fX2ggfHwgW10pLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgcmVuZGVyQ29tcG9uZW50KHRoaXMsIDIpO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge31cbiAgICB9KTtcbiAgICB2YXIgcHJlYWN0ID0ge1xuICAgICAgICBoOiBoLFxuICAgICAgICBjcmVhdGVFbGVtZW50OiBoLFxuICAgICAgICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudCxcbiAgICAgICAgQ29tcG9uZW50OiBDb21wb25lbnQsXG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICByZXJlbmRlcjogcmVyZW5kZXIsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9O1xuICAgIGlmICgndW5kZWZpbmVkJyAhPSB0eXBlb2YgbW9kdWxlKSBtb2R1bGUuZXhwb3J0cyA9IHByZWFjdDsgZWxzZSBzZWxmLnByZWFjdCA9IHByZWFjdDtcbn0oKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC5qcy5tYXAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBhcHBseU1pZGRsZXdhcmU7XG5cbnZhciBfY29tcG9zZSA9IHJlcXVpcmUoJy4vY29tcG9zZScpO1xuXG52YXIgX2NvbXBvc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9zZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RvcmUgZW5oYW5jZXIgdGhhdCBhcHBsaWVzIG1pZGRsZXdhcmUgdG8gdGhlIGRpc3BhdGNoIG1ldGhvZFxuICogb2YgdGhlIFJlZHV4IHN0b3JlLiBUaGlzIGlzIGhhbmR5IGZvciBhIHZhcmlldHkgb2YgdGFza3MsIHN1Y2ggYXMgZXhwcmVzc2luZ1xuICogYXN5bmNocm9ub3VzIGFjdGlvbnMgaW4gYSBjb25jaXNlIG1hbm5lciwgb3IgbG9nZ2luZyBldmVyeSBhY3Rpb24gcGF5bG9hZC5cbiAqXG4gKiBTZWUgYHJlZHV4LXRodW5rYCBwYWNrYWdlIGFzIGFuIGV4YW1wbGUgb2YgdGhlIFJlZHV4IG1pZGRsZXdhcmUuXG4gKlxuICogQmVjYXVzZSBtaWRkbGV3YXJlIGlzIHBvdGVudGlhbGx5IGFzeW5jaHJvbm91cywgdGhpcyBzaG91bGQgYmUgdGhlIGZpcnN0XG4gKiBzdG9yZSBlbmhhbmNlciBpbiB0aGUgY29tcG9zaXRpb24gY2hhaW4uXG4gKlxuICogTm90ZSB0aGF0IGVhY2ggbWlkZGxld2FyZSB3aWxsIGJlIGdpdmVuIHRoZSBgZGlzcGF0Y2hgIGFuZCBgZ2V0U3RhdGVgIGZ1bmN0aW9uc1xuICogYXMgbmFtZWQgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IG1pZGRsZXdhcmVzIFRoZSBtaWRkbGV3YXJlIGNoYWluIHRvIGJlIGFwcGxpZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgc3RvcmUgZW5oYW5jZXIgYXBwbHlpbmcgdGhlIG1pZGRsZXdhcmUuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5TWlkZGxld2FyZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1pZGRsZXdhcmVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgbWlkZGxld2FyZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGNyZWF0ZVN0b3JlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgICAgIHZhciBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcik7XG4gICAgICB2YXIgX2Rpc3BhdGNoID0gc3RvcmUuZGlzcGF0Y2g7XG4gICAgICB2YXIgY2hhaW4gPSBbXTtcblxuICAgICAgdmFyIG1pZGRsZXdhcmVBUEkgPSB7XG4gICAgICAgIGdldFN0YXRlOiBzdG9yZS5nZXRTdGF0ZSxcbiAgICAgICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgICAgIHJldHVybiBfZGlzcGF0Y2goYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNoYWluID0gbWlkZGxld2FyZXMubWFwKGZ1bmN0aW9uIChtaWRkbGV3YXJlKSB7XG4gICAgICAgIHJldHVybiBtaWRkbGV3YXJlKG1pZGRsZXdhcmVBUEkpO1xuICAgICAgfSk7XG4gICAgICBfZGlzcGF0Y2ggPSBfY29tcG9zZTJbJ2RlZmF1bHQnXS5hcHBseSh1bmRlZmluZWQsIGNoYWluKShzdG9yZS5kaXNwYXRjaCk7XG5cbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RvcmUsIHtcbiAgICAgICAgZGlzcGF0Y2g6IF9kaXNwYXRjaFxuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzWydkZWZhdWx0J10gPSBiaW5kQWN0aW9uQ3JlYXRvcnM7XG5mdW5jdGlvbiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkaXNwYXRjaChhY3Rpb25DcmVhdG9yLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gIH07XG59XG5cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgYWN0aW9uIGNyZWF0b3JzLCBpbnRvIGFuIG9iamVjdCB3aXRoIHRoZVxuICogc2FtZSBrZXlzLCBidXQgd2l0aCBldmVyeSBmdW5jdGlvbiB3cmFwcGVkIGludG8gYSBgZGlzcGF0Y2hgIGNhbGwgc28gdGhleVxuICogbWF5IGJlIGludm9rZWQgZGlyZWN0bHkuIFRoaXMgaXMganVzdCBhIGNvbnZlbmllbmNlIG1ldGhvZCwgYXMgeW91IGNhbiBjYWxsXG4gKiBgc3RvcmUuZGlzcGF0Y2goTXlBY3Rpb25DcmVhdG9ycy5kb1NvbWV0aGluZygpKWAgeW91cnNlbGYganVzdCBmaW5lLlxuICpcbiAqIEZvciBjb252ZW5pZW5jZSwgeW91IGNhbiBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24gYXMgdGhlIGZpcnN0IGFyZ3VtZW50LFxuICogYW5kIGdldCBhIGZ1bmN0aW9uIGluIHJldHVybi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdH0gYWN0aW9uQ3JlYXRvcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgYWN0aW9uXG4gKiBjcmVhdG9yIGZ1bmN0aW9ucy4gT25lIGhhbmR5IHdheSB0byBvYnRhaW4gaXQgaXMgdG8gdXNlIEVTNiBgaW1wb3J0ICogYXNgXG4gKiBzeW50YXguIFlvdSBtYXkgYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRpc3BhdGNoIFRoZSBgZGlzcGF0Y2hgIGZ1bmN0aW9uIGF2YWlsYWJsZSBvbiB5b3VyIFJlZHV4XG4gKiBzdG9yZS5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb258T2JqZWN0fSBUaGUgb2JqZWN0IG1pbWlja2luZyB0aGUgb3JpZ2luYWwgb2JqZWN0LCBidXQgd2l0aFxuICogZXZlcnkgYWN0aW9uIGNyZWF0b3Igd3JhcHBlZCBpbnRvIHRoZSBgZGlzcGF0Y2hgIGNhbGwuIElmIHlvdSBwYXNzZWQgYVxuICogZnVuY3Rpb24gYXMgYGFjdGlvbkNyZWF0b3JzYCwgdGhlIHJldHVybiB2YWx1ZSB3aWxsIGFsc28gYmUgYSBzaW5nbGVcbiAqIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiaW5kQWN0aW9uQ3JlYXRvcnMoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKSB7XG4gIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgIT09ICdvYmplY3QnIHx8IGFjdGlvbkNyZWF0b3JzID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdiaW5kQWN0aW9uQ3JlYXRvcnMgZXhwZWN0ZWQgYW4gb2JqZWN0IG9yIGEgZnVuY3Rpb24sIGluc3RlYWQgcmVjZWl2ZWQgJyArIChhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBhY3Rpb25DcmVhdG9ycykgKyAnLiAnICsgJ0RpZCB5b3Ugd3JpdGUgXCJpbXBvcnQgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiIGluc3RlYWQgb2YgXCJpbXBvcnQgKiBhcyBBY3Rpb25DcmVhdG9ycyBmcm9tXCI/Jyk7XG4gIH1cblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFjdGlvbkNyZWF0b3JzKTtcbiAgdmFyIGJvdW5kQWN0aW9uQ3JlYXRvcnMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgdmFyIGFjdGlvbkNyZWF0b3IgPSBhY3Rpb25DcmVhdG9yc1trZXldO1xuICAgIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYm91bmRBY3Rpb25DcmVhdG9yc1trZXldID0gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYm91bmRBY3Rpb25DcmVhdG9ycztcbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzWydkZWZhdWx0J10gPSBjb21iaW5lUmVkdWNlcnM7XG5cbnZhciBfY3JlYXRlU3RvcmUgPSByZXF1aXJlKCcuL2NyZWF0ZVN0b3JlJyk7XG5cbnZhciBfaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC9pc1BsYWluT2JqZWN0Jyk7XG5cbnZhciBfaXNQbGFpbk9iamVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1BsYWluT2JqZWN0KTtcblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnLi91dGlscy93YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbikge1xuICB2YXIgYWN0aW9uVHlwZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZTtcbiAgdmFyIGFjdGlvbk5hbWUgPSBhY3Rpb25UeXBlICYmICdcIicgKyBhY3Rpb25UeXBlLnRvU3RyaW5nKCkgKyAnXCInIHx8ICdhbiBhY3Rpb24nO1xuXG4gIHJldHVybiAnR2l2ZW4gYWN0aW9uICcgKyBhY3Rpb25OYW1lICsgJywgcmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkLiAnICsgJ1RvIGlnbm9yZSBhbiBhY3Rpb24sIHlvdSBtdXN0IGV4cGxpY2l0bHkgcmV0dXJuIHRoZSBwcmV2aW91cyBzdGF0ZS4gJyArICdJZiB5b3Ugd2FudCB0aGlzIHJlZHVjZXIgdG8gaG9sZCBubyB2YWx1ZSwgeW91IGNhbiByZXR1cm4gbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC4nO1xufVxuXG5mdW5jdGlvbiBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKGlucHV0U3RhdGUsIHJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSkge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBhcmd1bWVudE5hbWUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUID8gJ3ByZWxvYWRlZFN0YXRlIGFyZ3VtZW50IHBhc3NlZCB0byBjcmVhdGVTdG9yZScgOiAncHJldmlvdXMgc3RhdGUgcmVjZWl2ZWQgYnkgdGhlIHJlZHVjZXInO1xuXG4gIGlmIChyZWR1Y2VyS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJ1N0b3JlIGRvZXMgbm90IGhhdmUgYSB2YWxpZCByZWR1Y2VyLiBNYWtlIHN1cmUgdGhlIGFyZ3VtZW50IHBhc3NlZCAnICsgJ3RvIGNvbWJpbmVSZWR1Y2VycyBpcyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSByZWR1Y2Vycy4nO1xuICB9XG5cbiAgaWYgKCEoMCwgX2lzUGxhaW5PYmplY3QyWydkZWZhdWx0J10pKGlucHV0U3RhdGUpKSB7XG4gICAgcmV0dXJuICdUaGUgJyArIGFyZ3VtZW50TmFtZSArICcgaGFzIHVuZXhwZWN0ZWQgdHlwZSBvZiBcIicgKyB7fS50b1N0cmluZy5jYWxsKGlucHV0U3RhdGUpLm1hdGNoKC9cXHMoW2EtenxBLVpdKykvKVsxXSArICdcIi4gRXhwZWN0ZWQgYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyAnICsgKCdrZXlzOiBcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIicpO1xuICB9XG5cbiAgdmFyIHVuZXhwZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMoaW5wdXRTdGF0ZSkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gIXJlZHVjZXJzLmhhc093blByb3BlcnR5KGtleSkgJiYgIXVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldO1xuICB9KTtcblxuICB1bmV4cGVjdGVkS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XSA9IHRydWU7XG4gIH0pO1xuXG4gIGlmICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuICdVbmV4cGVjdGVkICcgKyAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMSA/ICdrZXlzJyA6ICdrZXknKSArICcgJyArICgnXCInICsgdW5leHBlY3RlZEtleXMuam9pbignXCIsIFwiJykgKyAnXCIgZm91bmQgaW4gJyArIGFyZ3VtZW50TmFtZSArICcuICcpICsgJ0V4cGVjdGVkIHRvIGZpbmQgb25lIG9mIHRoZSBrbm93biByZWR1Y2VyIGtleXMgaW5zdGVhZDogJyArICgnXCInICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyAnXCIuIFVuZXhwZWN0ZWQga2V5cyB3aWxsIGJlIGlnbm9yZWQuJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0UmVkdWNlclNoYXBlKHJlZHVjZXJzKSB7XG4gIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgcmVkdWNlciA9IHJlZHVjZXJzW2tleV07XG4gICAgdmFyIGluaXRpYWxTdGF0ZSA9IHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCBkdXJpbmcgaW5pdGlhbGl6YXRpb24uICcgKyAnSWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGUgcmVkdWNlciBpcyB1bmRlZmluZWQsIHlvdSBtdXN0ICcgKyAnZXhwbGljaXRseSByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSAnICsgJ25vdCBiZSB1bmRlZmluZWQuIElmIHlvdSBkb25cXCd0IHdhbnQgdG8gc2V0IGEgdmFsdWUgZm9yIHRoaXMgcmVkdWNlciwgJyArICd5b3UgY2FuIHVzZSBudWxsIGluc3RlYWQgb2YgdW5kZWZpbmVkLicpO1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gJ0BAcmVkdXgvUFJPQkVfVU5LTk9XTl9BQ1RJT05fJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KS5zcGxpdCgnJykuam9pbignLicpO1xuICAgIGlmICh0eXBlb2YgcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogdHlwZSB9KSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIHdoZW4gcHJvYmVkIHdpdGggYSByYW5kb20gdHlwZS4gJyArICgnRG9uXFwndCB0cnkgdG8gaGFuZGxlICcgKyBfY3JlYXRlU3RvcmUuQWN0aW9uVHlwZXMuSU5JVCArICcgb3Igb3RoZXIgYWN0aW9ucyBpbiBcInJlZHV4LypcIiAnKSArICduYW1lc3BhY2UuIFRoZXkgYXJlIGNvbnNpZGVyZWQgcHJpdmF0ZS4gSW5zdGVhZCwgeW91IG11c3QgcmV0dXJuIHRoZSAnICsgJ2N1cnJlbnQgc3RhdGUgZm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHVubGVzcyBpdCBpcyB1bmRlZmluZWQsICcgKyAnaW4gd2hpY2ggY2FzZSB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUsIHJlZ2FyZGxlc3Mgb2YgdGhlICcgKyAnYWN0aW9uIHR5cGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSBub3QgYmUgdW5kZWZpbmVkLCBidXQgY2FuIGJlIG51bGwuJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBkaWZmZXJlbnQgcmVkdWNlciBmdW5jdGlvbnMsIGludG8gYSBzaW5nbGVcbiAqIHJlZHVjZXIgZnVuY3Rpb24uIEl0IHdpbGwgY2FsbCBldmVyeSBjaGlsZCByZWR1Y2VyLCBhbmQgZ2F0aGVyIHRoZWlyIHJlc3VsdHNcbiAqIGludG8gYSBzaW5nbGUgc3RhdGUgb2JqZWN0LCB3aG9zZSBrZXlzIGNvcnJlc3BvbmQgdG8gdGhlIGtleXMgb2YgdGhlIHBhc3NlZFxuICogcmVkdWNlciBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlZHVjZXJzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgY29ycmVzcG9uZCB0byBkaWZmZXJlbnRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zIHRoYXQgbmVlZCB0byBiZSBjb21iaW5lZCBpbnRvIG9uZS4gT25lIGhhbmR5IHdheSB0byBvYnRhaW5cbiAqIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzIHJlZHVjZXJzYCBzeW50YXguIFRoZSByZWR1Y2VycyBtYXkgbmV2ZXIgcmV0dXJuXG4gKiB1bmRlZmluZWQgZm9yIGFueSBhY3Rpb24uIEluc3RlYWQsIHRoZXkgc2hvdWxkIHJldHVybiB0aGVpciBpbml0aWFsIHN0YXRlXG4gKiBpZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZW0gd2FzIHVuZGVmaW5lZCwgYW5kIHRoZSBjdXJyZW50IHN0YXRlIGZvciBhbnlcbiAqIHVucmVjb2duaXplZCBhY3Rpb24uXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHJlZHVjZXIgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGV2ZXJ5IHJlZHVjZXIgaW5zaWRlIHRoZVxuICogcGFzc2VkIG9iamVjdCwgYW5kIGJ1aWxkcyBhIHN0YXRlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlLlxuICovXG5mdW5jdGlvbiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgZmluYWxSZWR1Y2VycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSgnTm8gcmVkdWNlciBwcm92aWRlZCBmb3Iga2V5IFwiJyArIGtleSArICdcIicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cbiAgdmFyIGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcblxuICB2YXIgdW5leHBlY3RlZEtleUNhY2hlID0gdm9pZCAwO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHt9O1xuICB9XG5cbiAgdmFyIHNoYXBlQXNzZXJ0aW9uRXJyb3IgPSB2b2lkIDA7XG4gIHRyeSB7XG4gICAgYXNzZXJ0UmVkdWNlclNoYXBlKGZpbmFsUmVkdWNlcnMpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc2hhcGVBc3NlcnRpb25FcnJvciA9IGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gY29tYmluYXRpb24oKSB7XG4gICAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICB2YXIgYWN0aW9uID0gYXJndW1lbnRzWzFdO1xuXG4gICAgaWYgKHNoYXBlQXNzZXJ0aW9uRXJyb3IpIHtcbiAgICAgIHRocm93IHNoYXBlQXNzZXJ0aW9uRXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB3YXJuaW5nTWVzc2FnZSA9IGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2Uoc3RhdGUsIGZpbmFsUmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKTtcbiAgICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgICAoMCwgX3dhcm5pbmcyWydkZWZhdWx0J10pKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBuZXh0U3RhdGUgPSB7fTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgZmluYWxSZWR1Y2VyS2V5cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfa2V5ID0gZmluYWxSZWR1Y2VyS2V5c1tfaV07XG4gICAgICB2YXIgcmVkdWNlciA9IGZpbmFsUmVkdWNlcnNbX2tleV07XG4gICAgICB2YXIgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW19rZXldO1xuICAgICAgdmFyIG5leHRTdGF0ZUZvcktleSA9IHJlZHVjZXIocHJldmlvdXNTdGF0ZUZvcktleSwgYWN0aW9uKTtcbiAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlRm9yS2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2UoX2tleSwgYWN0aW9uKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBuZXh0U3RhdGVbX2tleV0gPSBuZXh0U3RhdGVGb3JLZXk7XG4gICAgICBoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCBuZXh0U3RhdGVGb3JLZXkgIT09IHByZXZpb3VzU3RhdGVGb3JLZXk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDaGFuZ2VkID8gbmV4dFN0YXRlIDogc3RhdGU7XG4gIH07XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGNvbXBvc2U7XG4vKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmNzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYShiLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5BY3Rpb25UeXBlcyA9IHVuZGVmaW5lZDtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNyZWF0ZVN0b3JlO1xuXG52YXIgX2lzUGxhaW5PYmplY3QgPSByZXF1aXJlKCdsb2Rhc2gvaXNQbGFpbk9iamVjdCcpO1xuXG52YXIgX2lzUGxhaW5PYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQbGFpbk9iamVjdCk7XG5cbnZhciBfc3ltYm9sT2JzZXJ2YWJsZSA9IHJlcXVpcmUoJ3N5bWJvbC1vYnNlcnZhYmxlJyk7XG5cbnZhciBfc3ltYm9sT2JzZXJ2YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2xPYnNlcnZhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4vKipcbiAqIFRoZXNlIGFyZSBwcml2YXRlIGFjdGlvbiB0eXBlcyByZXNlcnZlZCBieSBSZWR1eC5cbiAqIEZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB5b3UgbXVzdCByZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGUuXG4gKiBJZiB0aGUgY3VycmVudCBzdGF0ZSBpcyB1bmRlZmluZWQsIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAqIERvIG5vdCByZWZlcmVuY2UgdGhlc2UgYWN0aW9uIHR5cGVzIGRpcmVjdGx5IGluIHlvdXIgY29kZS5cbiAqL1xudmFyIEFjdGlvblR5cGVzID0gZXhwb3J0cy5BY3Rpb25UeXBlcyA9IHtcbiAgSU5JVDogJ0BAcmVkdXgvSU5JVCdcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFJlZHV4IHN0b3JlIHRoYXQgaG9sZHMgdGhlIHN0YXRlIHRyZWUuXG4gICAqIFRoZSBvbmx5IHdheSB0byBjaGFuZ2UgdGhlIGRhdGEgaW4gdGhlIHN0b3JlIGlzIHRvIGNhbGwgYGRpc3BhdGNoKClgIG9uIGl0LlxuICAgKlxuICAgKiBUaGVyZSBzaG91bGQgb25seSBiZSBhIHNpbmdsZSBzdG9yZSBpbiB5b3VyIGFwcC4gVG8gc3BlY2lmeSBob3cgZGlmZmVyZW50XG4gICAqIHBhcnRzIG9mIHRoZSBzdGF0ZSB0cmVlIHJlc3BvbmQgdG8gYWN0aW9ucywgeW91IG1heSBjb21iaW5lIHNldmVyYWwgcmVkdWNlcnNcbiAgICogaW50byBhIHNpbmdsZSByZWR1Y2VyIGZ1bmN0aW9uIGJ5IHVzaW5nIGBjb21iaW5lUmVkdWNlcnNgLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWR1Y2VyIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuZXh0IHN0YXRlIHRyZWUsIGdpdmVuXG4gICAqIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBhY3Rpb24gdG8gaGFuZGxlLlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gW3ByZWxvYWRlZFN0YXRlXSBUaGUgaW5pdGlhbCBzdGF0ZS4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAgICogdG8gaHlkcmF0ZSB0aGUgc3RhdGUgZnJvbSB0aGUgc2VydmVyIGluIHVuaXZlcnNhbCBhcHBzLCBvciB0byByZXN0b3JlIGFcbiAgICogcHJldmlvdXNseSBzZXJpYWxpemVkIHVzZXIgc2Vzc2lvbi5cbiAgICogSWYgeW91IHVzZSBgY29tYmluZVJlZHVjZXJzYCB0byBwcm9kdWNlIHRoZSByb290IHJlZHVjZXIgZnVuY3Rpb24sIHRoaXMgbXVzdCBiZVxuICAgKiBhbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZSBhcyBgY29tYmluZVJlZHVjZXJzYCBrZXlzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZW5oYW5jZXJdIFRoZSBzdG9yZSBlbmhhbmNlci4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAgICogdG8gZW5oYW5jZSB0aGUgc3RvcmUgd2l0aCB0aGlyZC1wYXJ0eSBjYXBhYmlsaXRpZXMgc3VjaCBhcyBtaWRkbGV3YXJlLFxuICAgKiB0aW1lIHRyYXZlbCwgcGVyc2lzdGVuY2UsIGV0Yy4gVGhlIG9ubHkgc3RvcmUgZW5oYW5jZXIgdGhhdCBzaGlwcyB3aXRoIFJlZHV4XG4gICAqIGlzIGBhcHBseU1pZGRsZXdhcmUoKWAuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTdG9yZX0gQSBSZWR1eCBzdG9yZSB0aGF0IGxldHMgeW91IHJlYWQgdGhlIHN0YXRlLCBkaXNwYXRjaCBhY3Rpb25zXG4gICAqIGFuZCBzdWJzY3JpYmUgdG8gY2hhbmdlcy5cbiAgICovXG59O2Z1bmN0aW9uIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICB2YXIgX3JlZjI7XG5cbiAgaWYgKHR5cGVvZiBwcmVsb2FkZWRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW5oYW5jZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZW5oYW5jZXIgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgICBwcmVsb2FkZWRTdGF0ZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgZW5oYW5jZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW5oYW5jZXIoY3JlYXRlU3RvcmUpKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIHJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciBjdXJyZW50UmVkdWNlciA9IHJlZHVjZXI7XG4gIHZhciBjdXJyZW50U3RhdGUgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgdmFyIGN1cnJlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgdmFyIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzO1xuICB2YXIgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKG5leHRMaXN0ZW5lcnMgPT09IGN1cnJlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIHRoZSBzdGF0ZSB0cmVlIG1hbmFnZWQgYnkgdGhlIHN0b3JlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7YW55fSBUaGUgY3VycmVudCBzdGF0ZSB0cmVlIG9mIHlvdXIgYXBwbGljYXRpb24uXG4gICAqL1xuICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGFuZ2UgbGlzdGVuZXIuIEl0IHdpbGwgYmUgY2FsbGVkIGFueSB0aW1lIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLFxuICAgKiBhbmQgc29tZSBwYXJ0IG9mIHRoZSBzdGF0ZSB0cmVlIG1heSBwb3RlbnRpYWxseSBoYXZlIGNoYW5nZWQuIFlvdSBtYXkgdGhlblxuICAgKiBjYWxsIGBnZXRTdGF0ZSgpYCB0byByZWFkIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgaW5zaWRlIHRoZSBjYWxsYmFjay5cbiAgICpcbiAgICogWW91IG1heSBjYWxsIGBkaXNwYXRjaCgpYCBmcm9tIGEgY2hhbmdlIGxpc3RlbmVyLCB3aXRoIHRoZSBmb2xsb3dpbmdcbiAgICogY2F2ZWF0czpcbiAgICpcbiAgICogMS4gVGhlIHN1YnNjcmlwdGlvbnMgYXJlIHNuYXBzaG90dGVkIGp1c3QgYmVmb3JlIGV2ZXJ5IGBkaXNwYXRjaCgpYCBjYWxsLlxuICAgKiBJZiB5b3Ugc3Vic2NyaWJlIG9yIHVuc3Vic2NyaWJlIHdoaWxlIHRoZSBsaXN0ZW5lcnMgYXJlIGJlaW5nIGludm9rZWQsIHRoaXNcbiAgICogd2lsbCBub3QgaGF2ZSBhbnkgZWZmZWN0IG9uIHRoZSBgZGlzcGF0Y2goKWAgdGhhdCBpcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3MuXG4gICAqIEhvd2V2ZXIsIHRoZSBuZXh0IGBkaXNwYXRjaCgpYCBjYWxsLCB3aGV0aGVyIG5lc3RlZCBvciBub3QsIHdpbGwgdXNlIGEgbW9yZVxuICAgKiByZWNlbnQgc25hcHNob3Qgb2YgdGhlIHN1YnNjcmlwdGlvbiBsaXN0LlxuICAgKlxuICAgKiAyLiBUaGUgbGlzdGVuZXIgc2hvdWxkIG5vdCBleHBlY3QgdG8gc2VlIGFsbCBzdGF0ZSBjaGFuZ2VzLCBhcyB0aGUgc3RhdGVcbiAgICogbWlnaHQgaGF2ZSBiZWVuIHVwZGF0ZWQgbXVsdGlwbGUgdGltZXMgZHVyaW5nIGEgbmVzdGVkIGBkaXNwYXRjaCgpYCBiZWZvcmVcbiAgICogdGhlIGxpc3RlbmVyIGlzIGNhbGxlZC4gSXQgaXMsIGhvd2V2ZXIsIGd1YXJhbnRlZWQgdGhhdCBhbGwgc3Vic2NyaWJlcnNcbiAgICogcmVnaXN0ZXJlZCBiZWZvcmUgdGhlIGBkaXNwYXRjaCgpYCBzdGFydGVkIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGxhdGVzdFxuICAgKiBzdGF0ZSBieSB0aGUgdGltZSBpdCBleGl0cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgQSBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGV2ZXJ5IGRpc3BhdGNoLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoaXMgY2hhbmdlIGxpc3RlbmVyLlxuICAgKi9cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBsaXN0ZW5lciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBpc1N1YnNjcmliZWQgPSB0cnVlO1xuXG4gICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgIG5leHRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICBpZiAoIWlzU3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuXG4gICAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgICB2YXIgaW5kZXggPSBuZXh0TGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgICAgbmV4dExpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhbiBhY3Rpb24uIEl0IGlzIHRoZSBvbmx5IHdheSB0byB0cmlnZ2VyIGEgc3RhdGUgY2hhbmdlLlxuICAgKlxuICAgKiBUaGUgYHJlZHVjZXJgIGZ1bmN0aW9uLCB1c2VkIHRvIGNyZWF0ZSB0aGUgc3RvcmUsIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlXG4gICAqIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGdpdmVuIGBhY3Rpb25gLiBJdHMgcmV0dXJuIHZhbHVlIHdpbGxcbiAgICogYmUgY29uc2lkZXJlZCB0aGUgKipuZXh0Kiogc3RhdGUgb2YgdGhlIHRyZWUsIGFuZCB0aGUgY2hhbmdlIGxpc3RlbmVyc1xuICAgKiB3aWxsIGJlIG5vdGlmaWVkLlxuICAgKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvbmx5IHN1cHBvcnRzIHBsYWluIG9iamVjdCBhY3Rpb25zLiBJZiB5b3Ugd2FudCB0b1xuICAgKiBkaXNwYXRjaCBhIFByb21pc2UsIGFuIE9ic2VydmFibGUsIGEgdGh1bmssIG9yIHNvbWV0aGluZyBlbHNlLCB5b3UgbmVlZCB0b1xuICAgKiB3cmFwIHlvdXIgc3RvcmUgY3JlYXRpbmcgZnVuY3Rpb24gaW50byB0aGUgY29ycmVzcG9uZGluZyBtaWRkbGV3YXJlLiBGb3JcbiAgICogZXhhbXBsZSwgc2VlIHRoZSBkb2N1bWVudGF0aW9uIGZvciB0aGUgYHJlZHV4LXRodW5rYCBwYWNrYWdlLiBFdmVuIHRoZVxuICAgKiBtaWRkbGV3YXJlIHdpbGwgZXZlbnR1YWxseSBkaXNwYXRjaCBwbGFpbiBvYmplY3QgYWN0aW9ucyB1c2luZyB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBBIHBsYWluIG9iamVjdCByZXByZXNlbnRpbmcg4oCcd2hhdCBjaGFuZ2Vk4oCdLiBJdCBpc1xuICAgKiBhIGdvb2QgaWRlYSB0byBrZWVwIGFjdGlvbnMgc2VyaWFsaXphYmxlIHNvIHlvdSBjYW4gcmVjb3JkIGFuZCByZXBsYXkgdXNlclxuICAgKiBzZXNzaW9ucywgb3IgdXNlIHRoZSB0aW1lIHRyYXZlbGxpbmcgYHJlZHV4LWRldnRvb2xzYC4gQW4gYWN0aW9uIG11c3QgaGF2ZVxuICAgKiBhIGB0eXBlYCBwcm9wZXJ0eSB3aGljaCBtYXkgbm90IGJlIGB1bmRlZmluZWRgLiBJdCBpcyBhIGdvb2QgaWRlYSB0byB1c2VcbiAgICogc3RyaW5nIGNvbnN0YW50cyBmb3IgYWN0aW9uIHR5cGVzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBGb3IgY29udmVuaWVuY2UsIHRoZSBzYW1lIGFjdGlvbiBvYmplY3QgeW91IGRpc3BhdGNoZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCwgaWYgeW91IHVzZSBhIGN1c3RvbSBtaWRkbGV3YXJlLCBpdCBtYXkgd3JhcCBgZGlzcGF0Y2goKWAgdG9cbiAgICogcmV0dXJuIHNvbWV0aGluZyBlbHNlIChmb3IgZXhhbXBsZSwgYSBQcm9taXNlIHlvdSBjYW4gYXdhaXQpLlxuICAgKi9cbiAgZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgaWYgKCEoMCwgX2lzUGxhaW5PYmplY3QyWydkZWZhdWx0J10pKGFjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtdXN0IGJlIHBsYWluIG9iamVjdHMuICcgKyAnVXNlIGN1c3RvbSBtaWRkbGV3YXJlIGZvciBhc3luYyBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYWN0aW9uLnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbWF5IG5vdCBoYXZlIGFuIHVuZGVmaW5lZCBcInR5cGVcIiBwcm9wZXJ0eS4gJyArICdIYXZlIHlvdSBtaXNzcGVsbGVkIGEgY29uc3RhbnQ/Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlcnMgbWF5IG5vdCBkaXNwYXRjaCBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRSZWR1Y2VyKGN1cnJlbnRTdGF0ZSwgYWN0aW9uKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzID0gbmV4dExpc3RlbmVycztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgbGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSByZWR1Y2VyIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBzdG9yZSB0byBjYWxjdWxhdGUgdGhlIHN0YXRlLlxuICAgKlxuICAgKiBZb3UgbWlnaHQgbmVlZCB0aGlzIGlmIHlvdXIgYXBwIGltcGxlbWVudHMgY29kZSBzcGxpdHRpbmcgYW5kIHlvdSB3YW50IHRvXG4gICAqIGxvYWQgc29tZSBvZiB0aGUgcmVkdWNlcnMgZHluYW1pY2FsbHkuIFlvdSBtaWdodCBhbHNvIG5lZWQgdGhpcyBpZiB5b3VcbiAgICogaW1wbGVtZW50IGEgaG90IHJlbG9hZGluZyBtZWNoYW5pc20gZm9yIFJlZHV4LlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0UmVkdWNlciBUaGUgcmVkdWNlciBmb3IgdGhlIHN0b3JlIHRvIHVzZSBpbnN0ZWFkLlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIHJlcGxhY2VSZWR1Y2VyKG5leHRSZWR1Y2VyKSB7XG4gICAgaWYgKHR5cGVvZiBuZXh0UmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgbmV4dFJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBjdXJyZW50UmVkdWNlciA9IG5leHRSZWR1Y2VyO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcm9wZXJhYmlsaXR5IHBvaW50IGZvciBvYnNlcnZhYmxlL3JlYWN0aXZlIGxpYnJhcmllcy5cbiAgICogQHJldHVybnMge29ic2VydmFibGV9IEEgbWluaW1hbCBvYnNlcnZhYmxlIG9mIHN0YXRlIGNoYW5nZXMuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIG9ic2VydmFibGUgcHJvcG9zYWw6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9ic2VydmFibGVcbiAgICovXG4gIGZ1bmN0aW9uIG9ic2VydmFibGUoKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICB2YXIgb3V0ZXJTdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgcmV0dXJuIF9yZWYgPSB7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBtaW5pbWFsIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYnNlcnZlciBBbnkgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgYW4gb2JzZXJ2ZXIuXG4gICAgICAgKiBUaGUgb2JzZXJ2ZXIgb2JqZWN0IHNob3VsZCBoYXZlIGEgYG5leHRgIG1ldGhvZC5cbiAgICAgICAqIEByZXR1cm5zIHtzdWJzY3JpcHRpb259IEFuIG9iamVjdCB3aXRoIGFuIGB1bnN1YnNjcmliZWAgbWV0aG9kIHRoYXQgY2FuXG4gICAgICAgKiBiZSB1c2VkIHRvIHVuc3Vic2NyaWJlIHRoZSBvYnNlcnZhYmxlIGZyb20gdGhlIHN0b3JlLCBhbmQgcHJldmVudCBmdXJ0aGVyXG4gICAgICAgKiBlbWlzc2lvbiBvZiB2YWx1ZXMgZnJvbSB0aGUgb2JzZXJ2YWJsZS5cbiAgICAgICAqL1xuICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYnNlcnZlciAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgb2JzZXJ2ZXIgdG8gYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb2JzZXJ2ZVN0YXRlKCkge1xuICAgICAgICAgIGlmIChvYnNlcnZlci5uZXh0KSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGdldFN0YXRlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9ic2VydmVTdGF0ZSgpO1xuICAgICAgICB2YXIgdW5zdWJzY3JpYmUgPSBvdXRlclN1YnNjcmliZShvYnNlcnZlU3RhdGUpO1xuICAgICAgICByZXR1cm4geyB1bnN1YnNjcmliZTogdW5zdWJzY3JpYmUgfTtcbiAgICAgIH1cbiAgICB9LCBfcmVmW19zeW1ib2xPYnNlcnZhYmxlMlsnZGVmYXVsdCddXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIF9yZWY7XG4gIH1cblxuICAvLyBXaGVuIGEgc3RvcmUgaXMgY3JlYXRlZCwgYW4gXCJJTklUXCIgYWN0aW9uIGlzIGRpc3BhdGNoZWQgc28gdGhhdCBldmVyeVxuICAvLyByZWR1Y2VyIHJldHVybnMgdGhlaXIgaW5pdGlhbCBzdGF0ZS4gVGhpcyBlZmZlY3RpdmVseSBwb3B1bGF0ZXNcbiAgLy8gdGhlIGluaXRpYWwgc3RhdGUgdHJlZS5cbiAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gIHJldHVybiBfcmVmMiA9IHtcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICAgIHJlcGxhY2VSZWR1Y2VyOiByZXBsYWNlUmVkdWNlclxuICB9LCBfcmVmMltfc3ltYm9sT2JzZXJ2YWJsZTJbJ2RlZmF1bHQnXV0gPSBvYnNlcnZhYmxlLCBfcmVmMjtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmNvbXBvc2UgPSBleHBvcnRzLmFwcGx5TWlkZGxld2FyZSA9IGV4cG9ydHMuYmluZEFjdGlvbkNyZWF0b3JzID0gZXhwb3J0cy5jb21iaW5lUmVkdWNlcnMgPSBleHBvcnRzLmNyZWF0ZVN0b3JlID0gdW5kZWZpbmVkO1xuXG52YXIgX2NyZWF0ZVN0b3JlID0gcmVxdWlyZSgnLi9jcmVhdGVTdG9yZScpO1xuXG52YXIgX2NyZWF0ZVN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZVN0b3JlKTtcblxudmFyIF9jb21iaW5lUmVkdWNlcnMgPSByZXF1aXJlKCcuL2NvbWJpbmVSZWR1Y2VycycpO1xuXG52YXIgX2NvbWJpbmVSZWR1Y2VyczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21iaW5lUmVkdWNlcnMpO1xuXG52YXIgX2JpbmRBY3Rpb25DcmVhdG9ycyA9IHJlcXVpcmUoJy4vYmluZEFjdGlvbkNyZWF0b3JzJyk7XG5cbnZhciBfYmluZEFjdGlvbkNyZWF0b3JzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2JpbmRBY3Rpb25DcmVhdG9ycyk7XG5cbnZhciBfYXBwbHlNaWRkbGV3YXJlID0gcmVxdWlyZSgnLi9hcHBseU1pZGRsZXdhcmUnKTtcblxudmFyIF9hcHBseU1pZGRsZXdhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXBwbHlNaWRkbGV3YXJlKTtcblxudmFyIF9jb21wb3NlID0gcmVxdWlyZSgnLi9jb21wb3NlJyk7XG5cbnZhciBfY29tcG9zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb3NlKTtcblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnLi91dGlscy93YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4vKlxuKiBUaGlzIGlzIGEgZHVtbXkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGJlZW4gYWx0ZXJlZCBieSBtaW5pZmljYXRpb24uXG4qIElmIHRoZSBmdW5jdGlvbiBoYXMgYmVlbiBtaW5pZmllZCBhbmQgTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJywgd2FybiB0aGUgdXNlci5cbiovXG5mdW5jdGlvbiBpc0NydXNoZWQoKSB7fVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgaXNDcnVzaGVkLm5hbWUgPT09ICdzdHJpbmcnICYmIGlzQ3J1c2hlZC5uYW1lICE9PSAnaXNDcnVzaGVkJykge1xuICAoMCwgX3dhcm5pbmcyWydkZWZhdWx0J10pKCdZb3UgYXJlIGN1cnJlbnRseSB1c2luZyBtaW5pZmllZCBjb2RlIG91dHNpZGUgb2YgTk9ERV9FTlYgPT09IFxcJ3Byb2R1Y3Rpb25cXCcuICcgKyAnVGhpcyBtZWFucyB0aGF0IHlvdSBhcmUgcnVubmluZyBhIHNsb3dlciBkZXZlbG9wbWVudCBidWlsZCBvZiBSZWR1eC4gJyArICdZb3UgY2FuIHVzZSBsb29zZS1lbnZpZnkgKGh0dHBzOi8vZ2l0aHViLmNvbS96ZXJ0b3NoL2xvb3NlLWVudmlmeSkgZm9yIGJyb3dzZXJpZnkgJyArICdvciBEZWZpbmVQbHVnaW4gZm9yIHdlYnBhY2sgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzAwMzAwMzEpICcgKyAndG8gZW5zdXJlIHlvdSBoYXZlIHRoZSBjb3JyZWN0IGNvZGUgZm9yIHlvdXIgcHJvZHVjdGlvbiBidWlsZC4nKTtcbn1cblxuZXhwb3J0cy5jcmVhdGVTdG9yZSA9IF9jcmVhdGVTdG9yZTJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMuY29tYmluZVJlZHVjZXJzID0gX2NvbWJpbmVSZWR1Y2VyczJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMuYmluZEFjdGlvbkNyZWF0b3JzID0gX2JpbmRBY3Rpb25DcmVhdG9yczJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMuYXBwbHlNaWRkbGV3YXJlID0gX2FwcGx5TWlkZGxld2FyZTJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMuY29tcG9zZSA9IF9jb21wb3NlMlsnZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHdhcm5pbmc7XG4vKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbiAgfSBjYXRjaCAoZSkge31cbiAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9wb255ZmlsbCA9IHJlcXVpcmUoJy4vcG9ueWZpbGwuanMnKTtcblxudmFyIF9wb255ZmlsbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb255ZmlsbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIHJvb3Q7IC8qIGdsb2JhbCB3aW5kb3cgKi9cblxuXG5pZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBzZWxmO1xufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gbW9kdWxlO1xufSBlbHNlIHtcbiAgcm9vdCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG59XG5cbnZhciByZXN1bHQgPSAoMCwgX3BvbnlmaWxsMlsnZGVmYXVsdCddKShyb290KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJlc3VsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGw7XG5mdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHR2YXIgcmVzdWx0O1xuXHR2YXIgX1N5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgX1N5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGlmIChfU3ltYm9sLm9ic2VydmFibGUpIHtcblx0XHRcdHJlc3VsdCA9IF9TeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbCgnb2JzZXJ2YWJsZScpO1xuXHRcdFx0X1N5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59OyJdfQ==
