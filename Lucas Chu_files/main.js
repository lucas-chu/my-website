document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('particles'), {
    dotColor: '#828282',
    lineColor: '#6b6b6b',
    density: 15000,
    minSpeedX: 0.05,
    minSpeedY: 0.05,
    maxSpeedX: 0.3,
    maxSpeedY: 0.3,
    parallaxMultiplier: -10,
    proximity: 125,
    particleRadius: 5,
    lineWidth: 0.8
  });
  var intro = document.getElementById('intro');
  intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
}, false);

var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'container' ),
		header = container.querySelector( 'header.header' ),
		loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

var ajax_loaded = false

$(document).ready(function() {
      ajax_loaded = true;
});

function init() {
	var onEndInitialAnimation = function() {
		if( support.animations ) {
			this.removeEventListener( animEndEventName, onEndInitialAnimation );
		}

		startLoading();
	};

	// disable scrolling
	window.addEventListener( 'scroll', noscroll );

	// initial animation
	classie.add( container, 'loading' );

	if( support.animations ) {
		container.addEventListener( animEndEventName, onEndInitialAnimation );
	}
	else {
		onEndInitialAnimation();
	}
}

function startLoading() {
	// simulate loading something..
	var simulationFn = function(instance) {
		var progress = 0,
			interval = setInterval( function() {

				// reached the end
				if( ajax_loaded ) {
					classie.remove( container, 'loading' );
					classie.add( container, 'loaded' );
					clearInterval( interval );

					var onEndHeaderAnimation = function(ev) {
						if( support.animations ) {
							if( ev.target !== header ) return;
							this.removeEventListener( animEndEventName, onEndHeaderAnimation );
						}

						classie.add( document.body, 'layout-switch' );
						window.removeEventListener( 'scroll', noscroll );
					};

					if( support.animations ) {
						header.addEventListener( animEndEventName, onEndHeaderAnimation );
					}
					else {
						onEndHeaderAnimation();
					}
				}
			}, 80 );
	};

	loader.setProgressFn( simulationFn );
}

function noscroll() {
	window.scrollTo( 0, 0 );
}


init();
