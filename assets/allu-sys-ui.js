/* 名前空間を定義 */
var eclib = eclib || {};
eclib.ui = eclib.ui || {};
/*!
 * UIの表示に関する関数群
 * 
 * @requires module:jquery1.11+
 * @requires module:jquery.cookie.js
 * @requires module:modernizr-custom.js
 */
(function(){
	/* ローカル用の名前空間 */
	var _ui = eclib.ui;

	/*!
	 * megamenu ui
	 */
	jQuery(document).ready(function(){
		var megamenuForHover = function() {
			jQuery('.js-animation-megamenu-hover').hover(function() {
				jQuery(this).children('.js-submenu-hover').stop(true).slideDown(200);
				jQuery(this).children('a').addClass('active');
			}, function() {
				jQuery(this).children('.js-submenu-hover').stop(true).slideUp(200);
				jQuery(this).children('a').removeClass('active');
			});
		}();

		var megamenuForClick = function() {
			jQuery('.js-animation-megamenu-click').children('a').on('click', function(e) {
				var $this = jQuery(this);
				jQuery('.js-animation-megamenu-click').children('a').each(function() {
					if(!jQuery(this).is($this)) {
						jQuery(this).siblings('.js-submenu-click').stop(true).slideUp(200);
						jQuery(this).removeClass('active');
					}
				});

				jQuery(this).addClass('active');
				jQuery(this).siblings('.js-submenu-click').stop(true).slideDown(200);
				return false;
			});
			jQuery(document).on('click touchstart', function(e) {
				if (!jQuery(e.target).closest('.js-animation-megamenu-click').length) {
					jQuery('.js-animation-megamenu-click').children('.js-submenu-click').stop(true).slideUp(200);
					jQuery('.js-animation-megamenu-click').children('a').removeClass('active');
				}
			});
		}();
	});

	/*!
	 * 動的なカテゴリを生成するAJAX
	 */
	jQuery(document).ready(function(){
		jQuery('.js-dynamic-category').each(function() {
			var category = jQuery(this).data('category') != undefined ? jQuery(this).data('category') : '';
			jQuery(this).load(eclib.sys.wwwroot + '/shop/js/category.aspx?category=' + category);
		});
	});

	/*!
	 * 動的なジャンルを生成するAJAX
	 */
	jQuery(document).ready(function(){
		jQuery('.js-dynamic-genre').each(function() {
			var genre = jQuery(this).data('genre') != undefined ? jQuery(this).data('genre') : '';
			jQuery(this).load(eclib.sys.wwwroot + '/shop/js/genre.aspx?genre=' + genre);
		});
	});

	/*!
	 * カート内件数のバッジ表示
	 */
	// jQuery(document).ready(function(){
	// 	jQuery.ajax({
	// 		url: eclib.sys.wwwroot + "/shop/js/cart.aspx",
	// 		cache: false,
	// 		dataType: "html",
	// 		success: function(html) {
	// 			var count = jQuery(html).data('count');
	// 			if(!count) {
	// 				jQuery('.js-cart-count').hide();
	// 			} else {
	// 				jQuery('.js-cart-count').text(count)
	// 										.show();
	// 			}
	// 		}
	// 	});
	// });

	/*!
	 * カート内件数のバッジ表示（店舗用） 2018/08/23 add kawaitak
	 */
	// jQuery(document).ready(function(){
	// 	jQuery.ajax({
	// 		url: eclib.sys.wwwroot + "/shop/js/cart.aspx?cart_fg=1",
	// 		cache: false,
	// 		dataType: "html",
	// 		success: function(html) {
	// 			var count = jQuery(html).data('count');
	// 			if(!count) {
	// 				jQuery('.js-stock-count').hide();
	// 			} else {
	// 				jQuery('.js-stock-count').text(count)
	// 										.show();
	// 			}
	// 		}
	// 	});
	// });

	/*!
	 * アラート表示
	 * 
	 * メッセージ表示
	 * eclib.ui.alert('タイトルXXXX', '本文テキスト\n改行本文テキスト');
	 * 
	 * メッセージ表示しつつ、イベントハンドリング
	 * eclib.ui.alert('タイトルXXXX', '本文テキスト\n改行本文テキスト', {
	 *    quit : function() {
	 *      alert('×ボタン押下');
	 *    },
	 *    ok : function() {
	 *      alert('OKボタン押下');
	 *    }
	 * });
	 */
	_ui.alert = function(title, msg, options) {

		jQuery(document.activeElement).blur();

		var template = '';
		template += '<div class="modal-alert js-modal-alert js-active">';
		template += '  <div class="modal-wrapper">';
		template += '    <div class="modal-content">';
		template += '      <div class="modal-header"><span class="js-modal-title modal-title"></span><span class="js-modal-close modal-close">×</span></div>';
		template += '      <div class="modal-body"><p class="modal-body-wrapper js-modal-body-wrapper"></p></div>';
		template += '      <div class="modal-footer">';
		template += '        <input type="button" class="btn btn-primary" value="OK">';
		template += '      </div>';
		template += '    </div>';
		template += '  </div>';
		template += '</div>';

		var defaults = { quit : function(){}, ok : function(){}, width : null, height : null };
		var options = jQuery.extend({}, defaults, options);
		var gloupId = 'stdui-dialog' + getUUID();

		var $obj = jQuery(template);
		var $overlay = jQuery('<div class="modal-overlay-alert" />');

		var action = function() {
			return {
				close : function () {
					$overlay.remove();
					$obj.remove();

					/* 一番最後に開かれたダイアログをアクティブにする */
					jQuery(document).off('keyup.' + gloupId);

					if(jQuery('.js-modal-alert,.js-modal-dialog').last().length > 0) {
						jQuery('.js-modal-alert,.js-modal-dialog').last().addClass('js-active');
					} else {
						/* 背景固定解除 */
						setBackGroundFixed(false);
					}
				}
			};
		}();

		var showDialog = function() {
			/* 他のダイアログはアクティブを削除する */
			jQuery('.js-modal-alert,.js-modal-dialog').removeClass('js-active');

			/* 背景を固定にする */
			setBackGroundFixed(true);

			/* 幅、高さの設定 */
			if(options.width) {
				$obj.css('width', options.width);
			}
			if(options.height) {
				$obj.css('height', options.height);
			}

			$obj.find('.js-modal-title').text(title);
			$obj.find('.js-modal-body-wrapper').text(msg).html(function(){
				return jQuery(this).text().replace(/\r?\n/g, '<br>');
			});

			$overlay.appendTo('body');
			$obj.appendTo('body');

			var screen = getCenterScreen($obj);
			$obj.css('position', 'absolute')
				.css('top', screen.y + 'px')
				.css('left', screen.x + 'px');
		};

		/* OKボタン押下 */
		$obj.find(':button').on('click', function() {
			options.ok.apply(this, arguments);
			action.close();
		});

		/* ×ボタン、オーバーレイ領域、ESC押下 */
		$obj.find('.js-modal-close').on('click', function() {
			options.quit.apply(this, arguments);
			action.close();
		});
		$overlay.on('click', function() {
			options.quit.apply(this, arguments);
			action.close();
		});
		jQuery(document).on('keyup.' + gloupId, function(e) {
			if ($obj.hasClass("js-active") && e.keyCode === 27) { // etc
				options.quit.apply(this, arguments);
				action.close();
			}
		});

		showDialog();
	};

	/*!
	 * ダイアログ表示
	 * 
	 * モーダル表示(引数はIDを指定)
	 * eclib.ui.dialog('modal');
	 */
	_ui.dialog = function(id, options) {
	
		jQuery(document.activeElement).blur();
	
		var template = '';
		template += '<div class="modal-dialog js-modal-dialog js-active">';
		template += '  <div class="modal-wrapper">';
		template += '    <div class="modal-content js-modal-content">';
		template += '      <div class="modal-header"><span class="js-modal-title modal-title"></span><span class="js-modal-close modal-close">×</span></div>';
		template += '    </div>';
		template += '  </div>';
		template += '</div>';

		var defaults = { quit : function(){}, buttons : {}, links : {}, width : null, height : null };
		var options = jQuery.extend({}, defaults, options);
		var gloupId = 'stdui-dialog' + getUUID();
		var $obj = jQuery(template);
		var $overlay = jQuery('<div class="modal-overlay" />');
		var $contents = jQuery("#" + id);

		var action = function() {
			return {
				close : function () {
					$overlay.remove();
					$obj.remove();

					/* 一番最後に開かれたダイアログをアクティブにする */
					jQuery(document).off('keyup.' + gloupId);

					if(jQuery('.js-modal-alert,.js-modal-dialog').last().length > 0) {
						jQuery('.js-modal-alert,.js-modal-dialog').last().addClass('js-active');
					} else {
						/* 背景固定解除 */
						setBackGroundFixed(false);
					}
				}
			};
		}();

		var quitEvent = function() {
			var ret = options.quit.apply(this, [action]);
			if(ret == undefined || ret) {
				action.close();
			}
		};

		var showDialog = function() {
			/* 他のダイアログはアクティブを削除する */
			jQuery('.js-modal-alert,.js-modal-dialog').removeClass('js-active');

			/* 背景を固定にする */
			setBackGroundFixed(true);

			/* 幅、高さの設定 */
			if(options.width) {
				$obj.css('width', options.width);
			}
			if(options.height) {
				$obj.css('height', options.height);
			}
			
			$obj.find('.js-modal-title').text($contents.data('title'));
			$obj.find('.js-modal-content').append($contents.html());

			$overlay.appendTo('body');
			$obj.appendTo('body');

			var screen = getCenterScreen($obj);
			$obj.css('position', 'absolute')
				.css('top', screen.y + 'px')
				.css('left', screen.x + 'px');

			/* ボタン押下 */
			$obj.find(':button,:submit,:image').on('click', function() {
				if(jQuery(this).attr('name') && options.buttons[jQuery(this).attr("name")]) {
					var ret = options.buttons[jQuery(this).attr("name")].apply(this, [action]);
					if(jQuery(this).attr('type') == 'submit' && (ret == undefined || ret)) {
						$obj.find('form').submit();
					}
					return ret;
				}
			});

			$obj.find('a').on('click', function() {
				if(jQuery(this).attr('name') && options.links[jQuery(this).attr("name")]) {
					return options.links[jQuery(this).attr("name")].apply(this, [action]);
				}
			});


			/* ×ボタン、オーバーレイ領域、ESC押下 */
			$obj.find('.js-modal-close').on('click', function() {
				quitEvent.apply(this, arguments);
			});
			$overlay.on('click', function() {
				quitEvent.apply(this, arguments);
			});
			jQuery(document).on('keyup.' + gloupId, function(e) {
				if ($obj.hasClass("js-active") && e.keyCode === 27) {
					quitEvent.apply(this, arguments);
				}
			});
		};

		showDialog();
	};

	/*!
	 * ヘッダー警告表示
	 */
	_ui.showHeaderWarning = function(contentsHtml, options) {
		var template = '';
		template += '<div class="header-warning">';
		template += '  <div class="header-warning-contents js-header-warning-contents"></div>';
		template += '  <div class="header-warning-close js-header-warning-close">×</div>';
		template += '</div>';

		var defaults = { quit : function(){} };
		var options = jQuery.extend({}, defaults, options);
		var action = function() {
			return {
				close : function () {
					$obj.slideUp(200);
				}
			};
		}();

		var $obj = jQuery(template);
		$obj.find('.js-header-warning-contents').html(contentsHtml);
		$obj.find('.js-header-warning-close').on('click', function() {
			var ret = options.quit.apply(this, [action]);
			if(ret == undefined || ret) {
				action.close();
			}
		});

		$obj.hide();
		$obj.prependTo('body');
		$obj.slideDown(200);

	};

	/*!
	 * ツールチップを表示する
	 */
	_ui.showToolTip = function(jQuerySelector, options) {
		//console.log(jQuerySelector, options);
		var defaults = { tooltip : '', position : 'bottom', diptimeSec : 3, classname: 'balloontip'  };
		var options = jQuery.extend({}, defaults, options);
		
		jQuery(jQuerySelector).each(function() {
			var $this = this;
			
			//画面下部の場合は"top"となるように
			var position_rate = (( jQuery($this).offset().top - jQuery(window).scrollTop()) / jQuery(window).height());
			if(position_rate > 0.8) {
				options.position = "top";
			}

			jQuery($this).showBalloon({ 
				classname: options.classname,
				contents : options.tooltip,
				position : options.position
			});
			if(options.diptimeSec) {
				setTimeout(function() {
					jQuery($this).hideBalloon();
				}, 1000 * options.diptimeSec);
			}
		});
	};

	/*!
	 * ツールチップを非表示にする
	 */
	_ui.hideToolTip = function(jQuerySelector) {
		jQuery(jQuerySelector).hideBalloon();
	};

	/*!
	 * コンテキストメニューを表示する
	 */
	_ui.showContextMenu = function(jQuerySelector, templateid, options) {
		var defaults = { offsetY : 0, offsetX : 0, links : {} };
		var options = jQuery.extend({}, defaults, options);
		var $template = jQuery(templateid);
		var gloupId = 'stdui-contextmenu' + getUUID();

		var innerContextMenu = function() {
			$offset = jQuery(jQuerySelector).offset();
			$template.find('span').off('click');
			$template.find('span').on('click', function() {
				if(jQuery(this).attr('name') && options.links[jQuery(this).attr("name")]) {
					return options.links[jQuery(this).attr("name")].apply(this, arguments);
				}
			});

			$template.css('position', 'absolute')
								.css('top', $offset.top + options.offsetY + jQuery(jQuerySelector).outerHeight())
								.css('left', $offset.left + options.offsetX)
								.fadeIn().promise().done(function(){
						jQuery(document).on('click.' + gloupId + ' touchend.' + gloupId, function() {
							$template.fadeOut();
							jQuery(document).off('click.' + gloupId + ' touchend.' + gloupId);
						});
					});
		};

		jQuery(jQuerySelector).each(function() {
			innerContextMenu.apply(this, arguments);
		});

	};

	/*!
	 * ツールチップUI
	 */
	jQuery(document).ready(function(){
		jQuery.balloon.defaults.css = null;
		jQuery('[data-tooltip]').each(function() {

			var tooltip = jQuery(this).data('tooltip').replace(/\r?\n/g, '<br>');
			var position = jQuery(this).data('tooltip-position');
			if(!position) {
				position = 'top';
			}

			jQuery(this).on({
				'focusin' : function() {
					jQuery(this).hideBalloon()
											.showBalloon({ 
												classname: 'balloontip',
												contents : tooltip,
												position : position
											});
				},
				'focusout' : function() {
					jQuery(this).hideBalloon();
				}
			});
		});
	});

	/*!
	 * 郵便番号サジェストUI
	 */
	/*  郵便番号検索 */
	var timerId_lookupzip_ = null;
	var zipcache_lookupzip_ = '';
	var timerId_zipcache_ = null;
	_ui.zipcodeSuggest = function(zip, pref, addr, addr2, cnt, offsetX, offsetY) {
		var timerOffset = 300;
		var zip_id = '#' + zip + cnt;
		var pref_id = '#' + pref + cnt;
		var addr_id = '#' + addr + cnt;
		var addr2_id = '#' + addr2 + cnt;
		var defaultXOffset = 0;
		var defaultYOffset = jQuery(zip_id).outerHeight();
		offsetX = offsetX + defaultXOffset;
		offsetY = offsetY + defaultYOffset;
		jQuery(zip_id).bind('keyup paste', function() {
			jQuery('ul.js-ziplist').remove();
			clearTimeout(timerId_zipcache_);
			timerId_zipcache_ = setTimeout(function() {
				if (zipcache_lookupzip_ == jQuery(zip_id).val()) {
					zipcache_lookupzip_ = jQuery(zip_id).val();
					return false;
				}
				zipcache_lookupzip_ = jQuery(zip_id).val();
			}, timerOffset);
			clearTimeout(timerId_lookupzip_);
			timerId_lookupzip_ = setTimeout(function() {
				if (!jQuery(zip_id).val().match(/^[0-9]{3}[\-]{0,1}[0-9]{0,4}$/)) {
					return true;
				}

				jQuery.get('../search/lookupzipjson.aspx', {
					zip: jQuery(zip_id).val(),
					charset: 'UTF-8'
				}, function(data, status) {
					var of = jQuery(zip_id).offset();
					var ul = jQuery('<ul></ul>').addClass('js-ziplist block-ziplist--ziplist-frame dropdown');
					ul.css('position', "absolute");
					ul.css('top', of .top + offsetY);
					ul.css('left', of .left + offsetX);
					var searchCount = 0;
					var tempzip, temppref, tempaddr, tempaddr2;
					jQuery.each(data, function(key, item) {
						searchCount++;
						tempzip = item.zip;
						temppref = item.pref;
						tempaddr = item.addr;
						tempaddr2 = item.addr2;
						var li = jQuery('<li><span>' + key + ' ' + item.pref + ' ' + item.addr + ' ' + item.addr2 + '</span></li>');
						li.bind('click', function() {
							jQuery(zip_id).val(item.zip);
							jQuery(pref_id).val(item.pref);
							jQuery(addr_id).val(item.addr);
							jQuery(addr2_id).val(item.addr2);
							jQuery('ul.js-ziplist').remove();
							jQuery(zip_id).blur();
							jQuery(pref_id).change();
							jQuery(addr_id).focus();
							jQuery(addr2_id).blur().focus();
							return false;
						});
						ul.append(li);
					});
					if ((searchCount == 1) && (zipcache_lookupzip_.replace("-", "").length == 7)) {
						jQuery(zip_id).val(tempzip);
						jQuery(pref_id).val(temppref);
						jQuery(addr_id).val(tempaddr);
						jQuery(addr2_id).val(tempaddr2);
						jQuery('ul.js-ziplist').remove();
						jQuery(zip_id).blur();
						jQuery(pref_id).change();
						jQuery(addr_id).focus();
						jQuery(addr2_id).blur().focus();
						return false;
					} else if (searchCount != 0) {
						jQuery(document.body).append(ul);
					}
				}, 'json');
			}, timerOffset);
		});
	};

	/*!
	 * 非推奨ブラウザ警告表示
	 * @requires module:jquery.cookie.js
	 * @requires module:modernizr-custom.js
	 */
	jQuery(document).ready(function(){

		/* スマートフォンでは非推奨ブラウザを警告しない */
		if (eclib.sys.isModeSmartPhone()) return;

		if (jQuery.cookie("confirmOldbrowserBanner") == "true") {
			return;
		}

		if(isOldIE() || isDetectBrowser()) {
			_ui.showHeaderWarning('お使いのブラウザが古いため、サイトが正しく閲覧できない可能性があります。最新のブラウザへアップデートしてください。', {
				quit : function(act) {
					jQuery.cookie("confirmOldbrowserBanner", "true", {
						expires: 365,
						path: '/'
					});
				}
			});
		}

		/* IE <= 10の場合、trueが返却される */
		function isOldIE() {
			var userAgent = window.navigator.userAgent.toLowerCase();
			return userAgent.indexOf('msie') >= 0;
		}

		/* 非推奨ブラウザか？ */
		function isDetectBrowser() {

			/* 対象ブラウザ */
			var isTergetBrowser = function() {
				var userAgent = window.navigator.userAgent.toLowerCase();
				if (userAgent.indexOf('msie') >= 0 || userAgent.indexOf('trident') >= 0) {
					return true;
				}
				if (userAgent.indexOf('edge') >= 0) {
					return true;
				}
				if (userAgent.indexOf('firefox') >= 0) {
					return true;
				}
				if (userAgent.indexOf('chrome') >= 0) {
					return true;
				}
				if (userAgent.indexOf('safari') >= 0) {
					return true;
				}
				return false;
			};

			if(!isTergetBrowser()) { return false; }
			if(Modernizr.cssgrid || Modernizr.cssgridlegacy) {
				return false;
			}
			/* 非推奨ブラウザ */
			return true;
		}

	});


	/** private method.... */

	/* センタースクリーン取得 */
	function getCenterScreen($obj) {
		var x = ((jQuery(window).width() - $obj.outerWidth()) / 2) + jQuery(window).scrollLeft();
		var y = ((jQuery(window).height() - $obj.outerHeight()) / 2);
		if (x < 0) x = 0;
		if (y < 0) y = 0;
		return {
			x : x, y : y
		};
	}

	/* ユニークIDを取得する */
	function getUUID(){
		var randam = Math.floor(Math.random()*1000);
		return randam + new Date().getTime().toString();
	}

	/* 背景を固定する */
	var _currentScrolltop = 0;
	function setBackGroundFixed(isFixed) {
		var $wrapper = jQuery('body').children('.wrapper');
		if(isFixed) {
			if($wrapper.css('position') === 'fixed') { return; }
			_currentScrolltop = jQuery(window).scrollTop();
			$wrapper.css('position', 'fixed').css({'top': -_currentScrolltop});
		} else {
			if($wrapper.css('position') !== 'fixed') { return; }
			$wrapper.css('position', '');
			jQuery('html, body').prop({ scrollTop: _currentScrolltop });
		}
	}

})();