
// parallax and socials
function parallaxSocials () {

	if ($.browser.mobile) return;

	var windowHeight,
		// parallaxElemens = document.querySelectorAll('.parallax-element'),
		$parallaxElemens = $('.parallax-element'),
		parallaxElemens = [],
		$parallaxArticle = $('.article-holder-3 > article:nth-child(2)'),
		$socialsElement = $('#fixed-socials'),
		$articleHeader = $('.article-header'),
		$articleComments = $('.comments-holder'),
		socialsStatus = {},
		socialsElement = $socialsElement.get(0),
		currentDoc = (document.documentElement || document.body.parentNode || document.body),
		currentParent = (window.pageYOffset !== undefined) ? window : currentDoc,
		currentOffset = (window.pageYOffset !== undefined) ? 'pageYOffset' : 'scrollTop',
		resizeFunction = function () {

			windowHeight = $(window).height();

			if (socialsElement) {


				socialsStatus.start = $articleHeader.height() + parseInt( $articleHeader.css('margin-top') );
				socialsStatus.end = $articleComments.offset().top - $socialsElement.height() - 100;
				socialsStatus.left = $articleHeader.find('.container').offset().left;
				socialsElement.style.transform = 'translateY(' + socialsStatus.start + 'px)';
				// console.log( socialsStatus.end );
				if ( socialsStatus.left === 0) {

					socialsStatus.left = $('.article-page').offset().left;

				}
				$socialsElement.css('left', socialsStatus.left);

				socialsStatus.disabled = (socialsStatus.end - socialsStatus.start) < $socialsElement.height();

			}

			parallaxElemens = [];
			$parallaxElemens.each(function (i) {

				var $self = $(this),
					offset,
					transformBackup = $self.css('transform');

				if (transformBackup !== 'none') {

					transformBackup = transformBackup.split('(')[1];
					transformBackup = transformBackup.split(')')[0];
					transformBackup = transformBackup.split(',');
					transformBackup = transformBackup[5];
					transformBackup = parseFloat( transformBackup );

				} else {

					transformBackup = 0;

				}
				// this.style.transform = 'translateY(0px) translateZ(0)';
				switch (i) {
					case 0: {
						mult = -0.2;
						break;
					}
					case 1: {
						mult = -0.4;
						break;
					}
					case 2: {
						mult = 0.3;
						break;
					}
					case 3: {
						mult = 0.1;
						break;
					}
					case 4: {
						mult = 0.2;
						break;
					}
					case 5: {
						mult = 0.7;
						break;
					}
					case 6: {
						mult = -0.5;
						break;
					}
					case 7: {
						mult = 0.7;
						break;
					}
					case 8: {
						mult = 0.3;
						break;
					}
					case 9: {
						mult = 0.8;
						break;
					}
					case 10: {
						mult = 0.1;
						break;
					}
					case 11: {
						mult = 0.9;
						break;
					}
					default: {
						mult = -0.4;
						break;
					}
				}

				parallaxElemens.push({
					el: this,
					mult: mult,
					offset: $self.offset().top - transformBackup
				});

			});

		};

		if (!$articleHeader.length) {

			$articleHeader = $('.article-video-header');

		}

		resizeFunction();

		$(window).on('scroll', function () {

			var top = currentParent[currentOffset];
				// viewArea = windowHeight + top;

			// console.time('timerName');

			for (var i = parallaxElemens.length - 1; i >= 0; i--) {

				var tp = parallaxElemens[i].el.getBoundingClientRect().top;
				// console.log( windowHeight );
				// if ( tp > 0 ) {

					// if (i == 2) {

						// console.log( parallaxElemens[i].offset - top );
						// console.log( -( ( viewArea - parallaxElemens[1].offset - windowHeight / 2 ) * 0.1 ) );
						// console.log( parallaxElemens[i].el );
						// console.log( tp > 0 )

					// }
					// console.log( -( ( viewArea - parallaxElemens[i].offset - windowHeight / 2 ) * parallaxElemens[i].mult ) )

					// parallaxElemens[i].mult
					parallaxElemens[i].el.style.transform = 'translateY(' + -( ( tp - windowHeight / 2 ) * parallaxElemens[i].mult ) + 'px) translateZ(0)';

				// }

			}

			// console.timeEnd('timerName');

			if (socialsElement) {

				if ( top < socialsStatus.start || socialsStatus.disabled ) {

					if (socialsStatus.state !== 1) {

						$socialsElement.removeClass('fixed');
						socialsStatus.state = 1;
						socialsElement.style.transform = 'translateY(' + socialsStatus.start + 'px) translateZ(0)';

					}

				} else if ( top > socialsStatus.end ) {

					if ( socialsStatus.state !== 3) {

						$socialsElement.removeClass('fixed');
						socialsElement.style.transform = 'translateY(' + socialsStatus.end + 'px) translateZ(0)';
						socialsStatus.state = 3;

					}

				} else if (socialsStatus.state !== 2) {

					$socialsElement.addClass('fixed');
					socialsElement.style.transform = 'translateY(0px) translateZ(0)';
					socialsStatus.state = 2;
					// socialsElement.style.transform = 'translateY(' + top + 'px) translateZ(0)';

				}

			}
			// console.timeEnd('timerName');

		}).on('resize', resizeFunction);

}

var loading = {
		avgTime: 3000,
		trg: 1,
		state: 0,
		preloader: $('body > .preloader'),
		loaded: function () {

			if(++loading.state == loading.trg) {

				loading.status(1);
				setTimeout(loading.done, 500);

			} else {

				loading.status(loading.state / loading.trg / 1.1);

			}
		},
		status: function (mult) {

			loading.preloader.find('> .after').css({
				'width': mult * 100 + '%'
			});

		},
		done: function () {

			if (loading.finished) return;

			// TODO temp for develop
			$('section.articles-gallery-1 > article, .article-content, .article-name, .article-date, .video').find('p, h1, h2, h3, h4, h5, h6, blockquote, span').attr('contenteditable', true).on('click', function (e) {
				e.preventDefault();
			});
			$('.article-holder-1 a').on('click', function (e) {
				e.preventDefault();
			});
			// end todo

			// initialize plugins
			$('#main-slider').simpleSlider();
			$('body').trigger('scroll');

			// parallax and socials
			parallaxSocials ();

			// WOW init
			if ($.browser.desktop) {

				$('.fadeInUp').addClass('wow fadeInUp');
				$('.fadeInRight').addClass('wow fadeInRight');


				$('#main-slider').addClass('wow').on('mouseover', function () {
					$(this).removeClass('wow animated');
				});
				$('section.articles-gallery-1 article').addClass('wow');

				new WOW().init();

			}

			// blockquote capital letter
			(function () {
				var $blockquote = $('blockquote');
				if ($blockquote.length) {
					$blockquote.each(function () {
						var $self = $(this),
							letter = $self.text().substring(0,1).toUpperCase(),
							text = $self.text().substring(1),
							$capital = $('<span>').addClass('capital'),
							$original = $('<span>').addClass('original').text( letter ),
							$fake = $('<svg><text x="0" y="1em">' + letter + '</text></svg>'),
							$content = $('<span>').addClass('content').text( text ),
							timeout;
						$self.text('');
						$self.prepend([

							$capital.prepend([

								$original,
								$fake

							])

						]).append( $content );

						timeout = setTimeout(function () {

							$self.css({
								'padding-left': $original.innerWidth()
							});

						}, 300);

						$(window).on('resize', function () {

							clearTimeout( timeout );
							timeout = setTimeout(function () {

								$self.css({
									'padding-left': $original.innerWidth()
								});

							}, 300);

						});
					});
				}
			})();
			$('.slider-holder').addClass('touched');

			// hide preloader
			loading.preloader.addClass('done').animate({}).delay(400).animate({
				'opacity': 0
			}, 400, function () {

				$('.slider-holder').removeClass('touched');

				$(window).trigger('resize');
				loading.status(0);
				$(this).detach();
				loading.finished = true;

			});

		}
	};

	// TODO test it
	$('img').each(function () {

		if (!this.naturalWidth || true) {

			loading.trg ++;
			$(this).one('load', loading.loaded);

		}

	});

setTimeout(function () {

	loading.status(1);
	setTimeout(loading.done, 500);

}, 10000);

$(window).on('load', function () {

	loading.status(1);
	setTimeout(loading.done, 500);

});

$(document).on('ready', function () {
	var $window = $(window),
		winWidth = $window.width(),
		winHeight = $window.height(),
		bodyHeight = $('body').height(),
		bodyOverflow = {
			fixBody: function () {

				$('body').width($('body').width())
					.addClass('fixed');

			},
			unfixBody: function () {

				$('body')
					.css({
						'width': 'auto'
					})
					.removeClass('fixed');

			},
			resize: function () {

				this.unfixBody();

			}.bind(this)

		},
		goUp = (function () {

			var $el = $('#to-top'),
				state = false,
				speed = 900,
				paused = false;
			var plg = {
				up: function () {

					paused = true;

					$("html, body").stop().animate({scrollTop:0}, speed, 'swing', function () {

						paused = false;

					}).one('touchstart mousewheel DOMMouseScroll wheel', function () {

						$(this).stop(false, false).off('touchstart mousewheel DOMMouseScroll wheel');
						paused = false;

					});

					plg.hide();

				},
				show: function () {

					if (!state && !paused) {

						$el.addClass('opened');

						state = true;

					}

				},
				hide: function () {

					if (state) {

						$el.removeClass('opened');

						state = false;

					}

				},
				$el: $el
			};

			$el.on('click', function () {

				plg.up();

			});

			return plg;

		})();

		// modals
		var modals = {
			opened: [],
			openModal: function ($modal) {

				if (!$modal.data('modal-ununique')) {
					modals.closeModal();
				}
				this.opened.push($modal);
				$modal.addClass('opened');

				bodyOverflow.fixBody();

			},
			closeModal: function ($modal) {

				if ($modal && $modal instanceof jQuery) {

					$modal.removeClass('opened');

					bodyOverflow.unfixBody();

				} else if ($modal) {

					this.closeModal( $( $modal ) );

					return;

				} else if (this.opened.length > 0) {

					for (var y = 0; y < this.opened.length; y++) {

						this.closeModal( this.opened[y] );

					}

					return;

				}
				
				if (this.opened.length > 1) {

					var modal = $modal.get(0);

					// TODO test it
					for (var i = 0; i < this.opened.length; i++) {

						if (modal == this.opened[i].get(0)) {

							this.opened.splice(i, 1);

							break;

						}

					}

				} else {

					this.opened = [];

				}

			}
		};

		$('[data-modal]').on('click', function (e) {

			e.preventDefault();

			var $self = $(this),
				target = $self.attr('data-modal'),
				$target = $(target);

			if ($target.length) {

				modals.openModal($target);

			} else {

				console.warn('Ошибка в элементе:');
				console.log(this);
				console.warn('Не найдены элементы с селектором ' + target);

			}
			
		});

		$('[data-close]').on('click', function (e) {

			e.preventDefault();

			var $self = $(this),
				target = $self.attr('data-close'),
				$target;

			if (target) {

				$target = $(target);

				if ($target.length) {

					modals.closeModal( $target );

				}

			} else {

				modals.closeModal( $self.closest('.opened') );

			}

		});

		$('.modal-holder').on('click', function (e) {

			if (e.target === this) {

				modals.closeModal( $(this) );

			}

		});

		$window.on('keyup', function (e) {

			// esc pressed
			if (e.keyCode == '27') {

				modals.closeModal();

			}

		});

		// add content button
		var createContent = function (type) {

			if ( typeof createContent[type] === 'function') {

				var $editor = createContent[type]();
				this.before( $editor );

			} else {

				console.warn('К сожалению, тип ' + type + ' не предусмотрен программой');
				console.log(this);

			}

		};

		createContent.text = function () {

			var $content = $('<div>', {
					'class': 'editor'
				}),
				$field = editorMethods.createField().appendTo($content),
				$controls = $('<div>', {
					'class': 'controls'
				}).insertBefore($field);

			// controls
			controlsGroups.basic($controls, $field);

			// console.log('text');

			return $content;

		};

		createContent.table = function() {

			var $content = $('<div>')
				.addClass('editor')
				.attr('contenteditable', true);
			// console.log('table');

			return $content;

		};

		$('[data-add-content]').each(function () {

			var $self = $(this);

			$self.on('click', function (e) {

				createContent.call($self, e.target.getAttribute('data-type') );

			});

		});

		// articles and videos hover
		(function () {

			var $gallery = $('.articles-gallery-1');
				$gallery.find('article > .image-holder, .description').hover(function () {
					var $self = $(this),
						$article = $self.closest('article'),
						bg = $article.find('> .image-holder').css('background-color');
					$article.closest('article').addClass('hover');
					$article.find('.description h3').css('color', bg);

				}, function () {
					var $self = $(this),
						$article = $self.closest('article');
					$article.closest('article').removeClass('hover wow animated');
					$article.find('.description h3').attr('style', '');

				});

			var $videos = $('.video-gallery');
				$videos.find('.image-container > .image-holder, .description-container').hover(function () {
					$(this).closest('.video').addClass('hover');
				}, function () {
					$(this).closest('.video').removeClass('hover');
				});

		})();

		// cross overflow fix
		(function () {

			$('.modal-holder.cross-bottom').each(function () {

				var $self = $(this),
					$cross = $self.find('.close-modal');
				$self.on('scroll', function (e) {
					e.stopPropagation();

					$cross.css({
						'bottom': -$self.scrollTop()
					});

				});

			});

			$('.modal-holder.cross-top').each(function () {

				var $self = $(this),
					$cross = $self.find('.close-modal');
				$self.on('scroll', function (e) {
					e.stopPropagation();

					$cross.css({
						'top': $self.scrollTop()
					});

				});

			});

		})();

		// svg width autoresize
		(function () {

			var $svgs = $('.navigation-pannel'),
				resize = function () {

						$svgs.find('.active').each(function () {

							var $self = $(this),
								elWidth = $self.find('span').width();

							$self.find('svg').width( elWidth + 2 );

						});

					};

			resize();
			$window.on('resize', resize);

		})();

		// 404 background update
		(function () {

			var $image = $('.error-404');

			if ($image.length) {

				var i = 0,
					imagesLinks = window.imagesArray404 || [
						'http://www.whowhatwear.com/img/uploads/current/images/0/172/928/main.original.585x0.jpg',
						'http://41.media.tumblr.com/5854c1656eb7158ee7f1a5b73c7109db/tumblr_nz0dacz9o11s8rlzuo1_1280.jpg',
						'http://36.media.tumblr.com/ce291dba4dff54db1fade220e2e52d77/tumblr_nvd4f4c8Ri1s8rlzuo1_1280.jpg',
						'http://40.media.tumblr.com/f67496f497e3b9b3503bc9dfeab039e0/tumblr_npx5uv9ZAt1tqq2cuo1_1280.jpg',
						'http://36.media.tumblr.com/2b3d2196968530a3d6354db86b9dd87b/tumblr_o2ppnfpFeF1qajzcfo1_1280.jpg',
						'http://41.media.tumblr.com/09e6206dd5559a526dce1a34e4f1a027/tumblr_o3ca00zeB21s8rlzuo1_1280.jpg',
						'http://41.media.tumblr.com/58c507c4433829b71ce579feb9fe25f1/tumblr_ndaxigFeZ41tqlchwo1_1280.jpg',
						'http://41.media.tumblr.com/1fc4acc5f2b71fcc0c77ded4004336d6/tumblr_n1a7sbnINJ1rckuolo1_1280.jpg',
						'http://36.media.tumblr.com/d5963b292548566a13d282bc9098d6e3/tumblr_nkg8w58pX01unwfw8o1_500.png',
						'http://36.media.tumblr.com/0097fc0034aa8ec03cdffd8223aa3de1/tumblr_o3f242HCSY1s51980o1_1280.jpg',
						'http://40.media.tumblr.com/8b4ee1bdbdeec8c31fc9b921ae7363da/tumblr_na1vshq8zJ1r7eta3o1_500.jpg',
						'http://40.media.tumblr.com/f67496f497e3b9b3503bc9dfeab039e0/tumblr_npx5uv9ZAt1tqq2cuo1_1280.jpg',
						'http://manrepeller.wpengine.netdna-cdn.com/wp-content/uploads/2015/01/shoe-lifts-man-repeller-1.jpg'
					],
					$imageHelper = $('.background-holder');

				Array.prototype.shuffle = function() {

					for (var i = this.length - 1; i > 0; i--) {

						var num = Math.floor(Math.random() * (i + 1)),
							d = this[num];
						this[num] = this[i];
						this[i] = d;

					}

					return this;

				};

				imagesLinks.shuffle();

				$imageHelper.css({
								'background-image': 'url(' + imagesLinks[1] + ')'
							});

				setInterval(function () {

					if (i % 2) {

						$image.css({
							'background-image': 'url(' + imagesLinks[i] + ')'
						});


						$imageHelper.removeClass('active').one(transitionPrefix, function () {

							$(this).css({
								'background-image': 'url(' + imagesLinks[i + 1] + ')'
							});

						});

					} else {

						$imageHelper.addClass('active').one(transitionPrefix, function () {

							$image.css({
								'background-image': 'url(' + imagesLinks[i + 1] + ')'
							});

						});

					}

					if (imagesLinks.length - 3 < i) {

						i = 0;

					} else {

						i++;

					}

				}, 3000);

			}

		})();

		//scroll
		$(document).on('scroll', function () {

			var top = $(this).scrollTop();

			if (top > bodyHeight - winHeight) {

				goUp.show();

			} else {

				goUp.hide();

			}

		});

		// resize
		$window.on('resize', function () {

			winWidth = $window.width();
			winHeight = $window.height();
			bodyHeight = $('body').height();

		});

});