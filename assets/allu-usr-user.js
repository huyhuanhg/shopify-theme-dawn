//user_script_config
var USC = {
    'is_scroll' : false,
    'is_scroll_class' : 'is-scroll',
    'scroll_speed' : 500
  }
  
  /*------------------------------------------------
   * GETパラメーター取得
  ------------------------------------------------*/
  var getUrlVars = function() {
    var vars = {};
    var param = location.search.substring(1).split('&');
    for (var i = 0; i < param.length; i++) {
      var keySearch = param[i].search(/=/);
      var key = '';
      if (keySearch != -1) key = param[i].slice(0, keySearch);
      var val = param[i].slice(param[i].indexOf('=', 0) + 1);
      if (key != '') vars[key] = decodeURI(val);
    }
    return vars;
  }
  
  /*------------------------------------------------
   * ローカルデータの保持
  ------------------------------------------------*/
  //localstrageが使える場合は使い、使えない場合はcookieを利用する
  try {
    //LocalStorage使える
    localStorage.test = 'hoge';
  } catch(e) {
    //LocalStorage使えない
  }
  
  /*------------------------------------------------
   * スクロールイベント管理
  ------------------------------------------------*/
  //--- scroll event
  var scroll_functions = function() {
    //スクロールに応じた処理はこちらに記述する
    body_scroll.add_class();
  };
  
  //--- scroll event 負荷低減
  var w_scroll = false;
  var event_interval_time = 100;
  jQuery(window).on("scroll load", function() {
    //動作調整中
    scroll_functions();
    /*if (!w_scroll) {
      w_scroll = true;
      setTimeout(function() {
        w_scroll = false;
        scroll_functions();
      }, event_interval_time);
    }*/
  });
  //-- スクロール中はbodyに.is-scroll追加
  var body_scroll = {
    'trigger_scroll_value' : 200,
    'on_scroll' : function(){
      var margin_top = jQuery('.pane-header').height() + jQuery('.block-important-message').height() + jQuery('.pane-globalnav').height();
      jQuery("body").addClass(USC.is_scroll_class);
      jQuery('.pane-header, .block-important-message').hide();
      jQuery('body').css({'padding-top':margin_top});
      USC.is_scroll = true;
      jQuery(".pane-globalnav").css( { 'margin' : 0 });
      //
    },
    'off_scroll' : function(){
      jQuery('body').css({'padding-top':''});
      jQuery(".page-bloglist .wrapper .pane-globalnav").css( { 'margin' : '20px 0 10px' });
      jQuery('.pane-header, .block-important-message').show();
      jQuery("body").removeClass(USC.is_scroll_class);
      USC.is_scroll = false;
    },
    'add_class' : function(){
      if (jQuery(window).scrollTop() > body_scroll.trigger_scroll_value) {
        body_scroll.on_scroll();
      } else {
        body_scroll.off_scroll();
      }
    }
  }
  
  //--- header 固定時の横スクロール
  jQuery(window).on("scroll", function () {
    jQuery(".scroll #header").css("left", -jQuery(window).scrollLeft());
  });
  
  //--- form checkbox,radio style function
  var custom_html_set = function(){
    jQuery("input[type='checkbox'],input[type='radio']").each(function(i){
      if(!jQuery(this).hasClass("original-style-input") && !jQuery(this).hasClass("cancel-original-style-input")){
        var id = jQuery(this).attr("id");
        if(!id){
          id = "original-style-input-" + i;
          jQuery(this).attr("id",id);
        };
        jQuery(this).after('<label class="original-style-label" for="'+id+'"></label>');
        jQuery(this).addClass("original-style-input");
      };
    });
  }
  jQuery(function () {
    custom_html_set();
    setInterval(function () {
      custom_html_set();
    }, 5000);
  });
  
  
  jQuery(function() {
  
    //--- ヘッダー検索窓
    var header_search = {
      'tgt_wrapper' : jQuery('.js-block-global-search'),
      'tgt_input' : jQuery('.js-global-search--keyword'),
      'tgt_toggle_content' : jQuery('.js-block-global-search-toggle-content'),
      'tgt_toggle_close_btn' : jQuery('.js-block-global-search-toggle-content-close-btn'),
      'tgt_toggle_open_btn' : jQuery('.js-block-headernav--search-toggle-btn'),
      'input_bottom_line_animation_speed' : 300,
      'tgt_toggle_content_open_animation_speed' : 500,
      'toggle_open' : function(){
        //console.log('toggle_open');
  
        //検索窓とtoggleコンテンツをくくる要素を表示状態に
        //header_search.tgt_wrapper.show();
        header_search.tgt_wrapper.addClass('is-open');
  
        //header_search.tgt_toggle_content.slideDown(500);
        var outer_width = header_search.tgt_input.outerWidth();
  
        //inputにfocus
        header_search.tgt_input.focus();
      },
      'toggle_close' : function(){
        //console.log('toggle_close');
        //header_search.tgt_toggle_content.slideUp(header_search.tgt_toggle_content_open_animation_speed);
        header_search.tgt_wrapper.removeClass('is-open');
        //suggestを非表示に
        jQuery('#search_suggest_area_').remove();
      }
    };
    header_search.tgt_input.after('<span class="input-text-onfocus-bottom-line"></span>');
    header_search.tgt_input.on('focus',function(){
      if(header_search.tgt_wrapper.hasClass("is-open") == false){
        header_search.toggle_open();
      }
    });
    header_search.tgt_toggle_close_btn.on("click",function(){
      header_search.toggle_close();
    });
    header_search.tgt_toggle_open_btn.on("click",function(){
      header_search.toggle_open();
    });
  
  
    //--- グローバルナビ メガメニュー
    var megamenu = {
      'speed' : 300,
      'flg_open' : false,
      'opened_index' : null,
      'opened_content' : null,
      'open' : function(i,toggle_content){
        if(megamenu.opened_index != i && megamenu.opened_content != null){
          //今開いているメニュー以外のメニューを開く場合、今開いているメニューは即座に閉じる
          megamenu.opened_content.hide();
        }
  
        toggle_content.slideDown(megamenu.speed);
        megamenu.opened_content = toggle_content;
        megamenu.flg_open = true;
        megamenu.opened_index = i;
      }
    }
    jQuery(".js-megamenu-trigger").each(function(i){
      var toggle_content = jQuery(jQuery(this).data('toggle-content'));
      var flg_hover = false;
      jQuery(this).hover(function(){
        //マウスオン
        flg_hover = true;
        //console.log('onmouse',i,megamenu.opened_index,flg_hover);
  
        //初回のオンマウスは反応を遅延させる
        if(megamenu.opened_index == null){
          setTimeout(function(){
            //0.5秒後にflg_hoverがtrueだったら開く
            if(flg_hover){
              megamenu.open(i,toggle_content);
            }
          },500);
        } else {
          megamenu.open(i,toggle_content);
        }
      },function(){
        //マウスアウト
        //console.log('onmouseout');
        flg_hover = false;
        setTimeout(function(){
          //0.5秒後にflg_hoverがfalseだったら閉じる
          if(!flg_hover){
            toggle_content.slideUp(megamenu.speed,function(){
              megamenu.flg_open = false;
              if(megamenu.opened_index == i){
                megamenu.opened_index = null;
              }
            });
          }
        },500);
      });
  
      toggle_content.hover(function(){
        //マウスオン
        flg_hover = true;
        toggle_content.slideDown(megamenu.speed);
      },function(){
        //マウスアウト
        flg_hover = false;
        setTimeout(function(){
          //0.5秒後にflg_hoverがfalseだったら閉じる
          if(!flg_hover){
            toggle_content.slideUp(megamenu.speed,function(){
              megamenu.flg_open = false;
            });
          }
        },500);
      });
    });
  
    //--- dropdown menu
    jQuery('.js-dropdown-menu-trigger').each(function(){
      var toggle_content = jQuery(jQuery(this).data('dropdown-menu-content'));
      var position = jQuery(this).offset();
      var outer_height = jQuery(this).outerHeight();
      jQuery(this).hover(function(){
        position = jQuery(this).offset();
        outer_height = jQuery(this).outerHeight();
        toggle_content.show().css({
          'top' : position.top + outer_height - 14,
          'left' : position.left
        });
      },function(){
        toggle_content.hide();
      });
      toggle_content.hover(function(){
        jQuery(this).show();
      },function(){
        jQuery(this).hide();
      });
    });
  
    //--- 追従型ページトップ
    // jQuery('#footer_pagetop').click(function () {
    //   jQuery('body,html').animate({
    //     scrollTop: 0
    //   }, header_search.tgt_toggle_content_open_animation_speed);
    //   return false;
    // });
  
    //--- ページ上部へ戻るボタン
    jQuery('.js-scroll-pagetop').click(function() {
      jQuery('body,html').animate({
        scrollTop: 0
      }, USC.scroll_speed, 'swing');
      return false;
    });
  
    //--- スムーススクロール
    jQuery(function(){
      jQuery('a[href^="#"]').click(function(){
        var header_height = 100;
        var href= jQuery(this).attr("href");
        var target = jQuery(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - header_height;
        jQuery("html, body").animate({scrollTop:position}, USC.scroll_speed, "swing");
        return false;
      });
    });
  
    //暫定対応 商品詳細のランク部分のトグル機能削除
    jQuery('.block-about-goods-rank--title.js-toggle-btn').each(function(){
      jQuery(this).removeClass('js-toggle-btn');
    });
  
    //--- 汎用 toggle
    var common_toggle_class_name = "is-toggle-open";
    jQuery(".js-toggle-btn").each(function(){
      var toggle_trigger = jQuery(this);
      var toggle_content_selector = toggle_trigger.data("toggle-content-selector");
      var toggle_content = jQuery(toggle_content_selector);
      if(toggle_content_selector == null){
        toggle_content = toggle_trigger.next();
        console.log(toggle_content);
      }
  
      toggle_trigger.append('<span class="toggle-state-icon"></span>');
      toggle_trigger.on("click",function(){
        if(toggle_content.is(':visible')){
          toggle_content.slideUp();
          jQuery('[data-toggle-content-selector="'+toggle_content_selector+'"]').removeClass(common_toggle_class_name);
        } else {
          toggle_content.slideDown();
          jQuery('[data-toggle-content-selector="'+toggle_content_selector+'"]').addClass(common_toggle_class_name);
        }
      });
  
      if(toggle_content.is(':visible')){
        jQuery('[data-toggle-content-selector="'+toggle_content_selector+'"]').addClass(common_toggle_class_name);
      }
  
    });
  
    //--- form selectの装飾
    jQuery('.js-original-style-select-front').remove();
    jQuery("select.js-original-style-select").each(function(i){
      var tgt = jQuery(this);
      var tgt_width = tgt.width() + 25;
      tgt.hide();
      tgt.addClass("js-original-style-select-id-"+i);
      var default_val = tgt.val();
      var html_options = '';
      var html_select_value = '';
      tgt.find('option').each(function(){
        html_options += '<span class="original-style-select-front-option" data-value="'+jQuery(this).attr('value')+'">'+jQuery(this).text()+'</span>';
        if(default_val == jQuery(this).attr('value')){
          html_select_value += jQuery(this).text();
        }
      });
  
      var html = '<a href="javascript:void(0);" style="width:'+tgt_width+'px;" class="original-style-select-front js-original-style-select-front" data-select-for="'+i+'"><span class="original-style-select-front-value">'+html_select_value+'</span><span class="original-style-select-front-options"><span class="original-style-select-front-options-inner">'+html_options+'</span></span></a>';
      tgt.after(html);
  
      //selectの値が変更されたらフロントの要素に反映する
      jQuery(this).on('change',function(){
        var label = jQuery(this).find('option[value="'+jQuery(this).val()+'"]').html();
        jQuery(this).next('.js-original-style-select-front').find('.original-style-select-front-value').html(label);
      });
  
    });
    jQuery('.js-original-style-select-front').each(function(){
      var tgt = jQuery(this);
      tgt.on('focus',function(){
        tgt.addClass("is-focus");
      });
      tgt.on('focusout',function(){
        tgt.removeClass("is-focus");
      });
      tgt.find('.original-style-select-front-value').on('click',function(){
        tgt.addClass("is-focus");
      });
      tgt.find('.original-style-select-front-option').on('click',function(){
        jQuery('.js-original-style-select-id-'+ tgt.data('select-for')).val(jQuery(this).data('value')).change();
        tgt.removeClass("is-focus");
      });
    });
  
    //--- 2コラム レイアウト調整処理
    jQuery('.js-2col-pane-main-header').each(function(){
      var header = jQuery(this);
      var h = header.height();
      var margin = 100;
      jQuery('.pane-contents').css({
        "padding-top" : h + margin
      });
      header.css({
        opacity: 1
      });
    });
  
    //--- 左メニューアコーディオン
    var left_menu_toggle_class_name = 'is-toggle-open';
    jQuery('.block-category-tree--item, .block-category-tree--item__open, .block-genre-tree--item, .block-genre-tree--item__open').each(function(){
      var this_ = jQuery(this);
      var child_list = this_.find('.block-category-tree--items, .block-genre-tree--items');
      if(child_list.size()){
        //子供が存在する場合
        this_.prepend('<div class="btn-menu-toggle js-btn-menu-toggle"></div>');
        child_list.hide();
      }
    });
  
    //--- 開いている項目の親を全て開く
    jQuery('.block-category-tree--item__open,.block-genre-tree--item__open').each(function(){
      jQuery(this).closest('.block-category-tree--items,.block-genre-tree--items').show();
      jQuery(this).parents('.block-category-tree--item,.block-genre-tree--item').each(function(){
        jQuery(this).closest('.block-category-tree--items,.block-genre-tree--items').show();
        jQuery(this).addClass(left_menu_toggle_class_name);
      });
    });
    jQuery('.js-btn-menu-toggle').each(function(){
      var this_ = jQuery(this);
      this_.on('click',function(){
        var tgt_toggle_items = this_.siblings('.block-category-tree--items,.block-genre-tree--items');
        var tgt_toggle_list = this_.closest('.block-category-tree--item, .block-genre-tree--item');
        if(tgt_toggle_items.is(':visible')){
          tgt_toggle_items.slideUp(500);
          tgt_toggle_list.removeClass(left_menu_toggle_class_name);
        } else {
          tgt_toggle_items.slideDown(500);
          tgt_toggle_list.addClass(left_menu_toggle_class_name);
        }
      });
    });
  
    //--- 共通 商品一覧用スライダー
  
    //イベントページの関連イベントではスライダー処理無し
    jQuery('.block-event-page--accessory .block-thumbnail-t-slider').removeClass('block-thumbnail-t-slider');
  
    //--- 商品詳細 商品ランクの詳細リンク動作
    jQuery('.js-goods-detail-rank-detail-link a').on('click',function(){
      var tgt_toggle_content = jQuery('.block-about-goods-rank--toggle-content');
      if(jQuery(tgt_toggle_content).is(":visible") == false){
        jQuery('.block-about-goods-rank--title').click();
      }
    });
  
    //--- 商品詳細 固定カートの表示制御
    var tgt_cart_fixed = jQuery('.block-goods-footer-cart-fixed');
    if(tgt_cart_fixed.length){
      jQuery(window).on("scroll load", function() {
        var position_cart_btn = jQuery('.pane-goods-right-side .block-add-cart').offset().top + 100;
        var st = jQuery(window).scrollTop();
        if(st > position_cart_btn){
          tgt_cart_fixed.addClass('is-show');
        } else {
          tgt_cart_fixed.removeClass('is-show');
        }
        if(st > (jQuery('body').height() - jQuery(window).height() - 100) ) {
          tgt_cart_fixed.removeClass('is-show');
        }
      });
    }
  
    //--- SNSシェアボタン
    var share_url = jQuery('link[rel="canonical"]').attr("href");
    var share_title = jQuery('title').html();
    jQuery('.js-btn-sns-twitter').on('click',function(){
      jQuery(this).attr('href','https://twitter.com/intent/tweet?url='+share_url+'&text='+share_title).attr('target','_blank');
    });
    jQuery('.js-btn-sns-facebook').on('click',function(){
      jQuery(this).attr('href','https://www.facebook.com/sharer.php?src=bm&u='+share_url+'&t='+share_title).attr('target','_blank');
    });
    jQuery('.js-btn-sns-line').on('click',function(){
      jQuery(this).attr('href','//line.me/R/msg/text/?'+share_title+'%0A'+share_url).attr('target','_blank');
    });
  
  });
  
  jQuery(window).on('load',function(){
    //--- 別ページへのアンカーリンク処理
    if(location.hash != ''){
      var header_height = 100;
      var target = jQuery(location.hash);
      var position = target.offset().top - header_height;
      jQuery("html, body").animate({scrollTop:position}, 1, "swing");
      return false;
    }
  });
  
  /*------------------------------------------------
  * ローディングアニメーション
  ------------------------------------------------*/
  var loading_animation = {
    'start' : function(msg){
      jQuery('body').addClass('is-loading');
      if(jQuery('.js-loading-animation').length == 0){
        jQuery('body').append('<div class="loading-animation js-loading-animation"><span class="loading-animation--msg"></span></div>');
      }
      jQuery('.js-loading-animation .loading-animation--msg').text(msg);
    },
    'end' : function(){
      jQuery('body').removeClass('is-loading');
    }
  }
  
  
  /*------------------------------------------------
  * 共通モーダル
  ------------------------------------------------*/
  var user_modal = {
    tgt_selector : '',
    tgt_classname : '',
    open_class_name : 'is-open',
    flg_open : false,
    selector_modal : '.js-user-modal',
    tgt_btn : null,
    st : null,
    timer : null,
    ini : function(){
  
      //btn open trigger
      jQuery('.js-user-modal--open-btn').each(function(){
        jQuery(this).on('click',function(){
          user_modal.open(jQuery(this).data('modal-content-selector'),jQuery(this).data('modal-classname'));
        });
      });
  
      //btn close trigger
      jQuery('.js-user-modal--close-btn').each(function(){
        jQuery(this).on('click',function(){
          user_modal.close();
        });
      });
    },
    open : function(selector,classname,callback){
  
      //console.log(selector);
  
      //
      jQuery('body').append(
        '<div class="user-modal js-user-modal" style="display: none;">'+
        '  <div class="user-modal--bg js-user-modal--close-btn"></div>'+
        '  <div class="user-modal--content">'+
        '    <div class="js-user-modal--close-btn user-modal--header-close-btn">閉じる</div>'+
        '    <div class="user-modal--inner"></div>'+
        '  </div>'+
        '</div>');
  
      //btn close trigger
      jQuery('.js-user-modal--close-btn').each(function(){
        jQuery(this).on('click',function(){
          user_modal.close();
        });
      });
  
      //背景を固定する
      user_modal.st = jQuery( window ).scrollTop();
      jQuery('body').addClass('is-modal-open');
      /*
      jQuery('body').css({
        position: 'fixed',
        width: '100%',
        'overflow-y': 'scroll'
      });
      */
      jQuery('body > .wrapper').css({
        //position: 'relative',
        top: -1 * user_modal.st
      });
  
      //user_modal.tgt_btn = jQuery(this);
      var time_delay = 0;
      if(user_modal.flg_open){
        //モーダルが開いていたら一旦閉じるアニメーション実行
        jQuery(user_modal.selector_modal).removeClass(user_modal.open_class_name);
        time_delay = 500;
      }
  
      //カスタムクラスをセット
      jQuery(user_modal.selector_modal).removeClass(user_modal.tgt_classname);
      jQuery(user_modal.selector_modal).addClass(classname);
  
      user_modal.tgt_classname = classname;
  
      setTimeout(function(){
  
        //直線のセレクタと違う場合にDOMをセット
        if(user_modal.tgt_selector != selector){
  
          //既に格納されていたDOM位置を元に戻す
          user_modal.return_content();
  
          //新しいセレクターの格納
          user_modal.tgt_selector = selector;
  
          //元のDOM位置を保持するための仮DOM
          jQuery(user_modal.tgt_selector).before('<div class="js-user-modal--content-original-position"></div>');
  
          //DOMをモーダルに追加
          jQuery(user_modal.selector_modal + ' .user-modal--inner').append(jQuery(user_modal.tgt_selector));
          jQuery(user_modal.selector_modal).show();
  
        }
  
        //モーダルをセンタリング
        /*
        jQuery(user_modal.selector_modal).css({
          'top' : user_modal.st + 'px'
        });
        */
  
        var modal_height = jQuery(user_modal.selector_modal + ' .user-modal--content').height();
  
        var margin_top = 0;
        if(jQuery(window).height() > modal_height) {
          margin_top = (jQuery(window).height() - modal_height ) * 0.5
          jQuery(user_modal.selector_modal + ' .user-modal--bg').css({
            'height' : jQuery(window).height() + 'px'
          });
        } else {
          jQuery(user_modal.selector_modal + ' .user-modal--bg').css({
            'height' : (modal_height + 40) + 'px'
          });
        }
        if(margin_top < 20) {
          margin_top = 20;
        }
  
        jQuery(user_modal.selector_modal + ' .user-modal--content').css({
          'top' : margin_top + 'px'
        });
  
  
        //モーダル内スクロール位置リセット
        jQuery(user_modal.selector_modal).scrollTop(0);
  
        //modal show
        jQuery(user_modal.selector_modal).addClass(user_modal.open_class_name);
  
        setTimeout(function(){
  
        },500);
  
        user_modal.flg_open = true;
  
        //callback
        if(callback != undefined){
          callback();
        }
  
      },time_delay);
  
    },
    close: function(){
      //console.log('close',user_modal.selector_modal,user_modal.open_class_name);
  
  
      jQuery(user_modal.selector_modal + ' .user-modal--bg').css({
        'height' : ''
      });
  
      jQuery(user_modal.selector_modal).removeClass(user_modal.open_class_name);
  
      setTimeout(function(){
        jQuery(user_modal.selector_modal).hide();
        //既に格納されていたDOM位置を元に戻す
        user_modal.return_content();
        user_modal.tgt_selector = "";
        user_modal.flg_open = false;
  
        jQuery('.js-user-modal').remove();
  
        //背景固定を開放する
        jQuery('body').removeClass('is-modal-open');
        jQuery('body > .wrapper').css({
          top: ''
        });
        jQuery('body,html').animate({scrollTop:user_modal.st}, 0);
  
      },500);
  
    },
    return_content : function(){
      //DOM位置を元に戻す
      jQuery('.js-user-modal--content-original-position').before(jQuery(user_modal.tgt_selector));
      jQuery('.js-user-modal--content-original-position').remove();
    }
  }
  jQuery(function () {
    user_modal.ini();
  });
  
  
  //--- 商品一覧 クイックビュー
  var quickview = {
    //'api_url' : '/design/json/goodslistapi_goods.js',
    'api_url' : eclib.sys.wwwroot + '/api/goodslistapi.aspx',
    'order_goods_id' : null,
    'ini' : function(){
      quickview.set();
    },
    'set' : function(){
      jQuery('.js-quickview-trigger-btn').each(function(){
        if(jQuery(this).data('quickview-event-set') == undefined){
          var tgt_goodsid = jQuery(this).data('goodsid');
          jQuery(this).on("click",function(){
            quickview.open(tgt_goodsid);
          });
          jQuery(this).data('quickview-event-set','1');
        }
      });
    },
    'open' : function(tgt_goodsid){
  
      quickview.order_goods_id = tgt_goodsid;
  
      //console.log('quickview open ' + quickview.order_goods_id);
      loading_animation.start();
      var param = {
          'type' : "json",
          'charset' : "UTF-8",
          'goods' : quickview.order_goods_id,
          'channel' : 'allu'
        };
  
      jQuery.ajax({
        url: quickview.api_url,
        type: 'GET',
        data: param,
        dataType: 'json',
        cache: false,
        timeout: 1000
      }).done(function(json, textStatus, jqXHR) {
        //console.log("GS ajax success");
        quickview.render(json.goods_list[0]);
      }).fail(function(jqXHR, textStatus, errorThrown) {
        //console.log("GS ajax fail", textStatus, errorThrown);
      }).always(function() {
        //console.log("GS ajax always");
        loading_animation.end();
      });
    },
    'render' : function(data){
  
      if(jQuery('.js-quickview-modal-'+quickview.order_goods_id).length == 0){
  
        var html =
          '  <div class="user-modal--content-hidden">'+
          '    <div class="js-quickview-modal-'+quickview.order_goods_id+'">'+
          '      <div class="user-modal--body block-quickview-modal--body">'+
                  '<div class="block-quickview-modal--gallery">'+
                  '  <div class="block-quickview-modal--photos js-block-quickview-modal--photos">';
        if(data.src_l){
          html +=   '    <div class="block-quickview-modal--photo">'+
                    '      <figure><img src="'+data.src_l+'" alt=""></figure>'+
                    '    </div>';
        }
        if(data.src_1){
          html +=   '    <div class="block-quickview-modal--photo">'+
                    '      <figure><img src="'+data.src_1+'" alt=""></figure>'+
                    '    </div>';
        }
        if(data.src_2){
          html +=   '    <div class="block-quickview-modal--photo">'+
                    '      <figure><img src="'+data.src_2+'" alt=""></figure>'+
                    '    </div>';
        }
        if(data.src_3){
          html +=   '    <div class="block-quickview-modal--photo">'+
                    '      <figure><img src="'+data.src_3+'" alt=""></figure>'+
                    '    </div>';
        }
        if(data.src_4){
          html +=   '    <div class="block-quickview-modal--photo">'+
                    '      <figure><img src="'+data.src_4+'" alt=""></figure>'+
                    '    </div>';
        }
        if(data.src_5){
          html +=   '    <div class="block-quickview-modal--photo">'+
                    '      <figure><img src="'+data.src_5+'" alt=""></figure>'+
                    '    </div>';
        }
        if(data.src_6){
          html +=   '    <div class="block-quickview-modal--photo">'+
                    '      <figure><img src="'+data.src_6+'" alt=""></figure>'+
                    '    </div>';
        }
        if(data.src_7){
          html +=   '    <div class="block-quickview-modal--photo">'+
                    '      <figure><img src="'+data.src_7+'" alt=""></figure>'+
                    '    </div>';
        }
        if(data.src_8){
          html +=   '    <div class="block-quickview-modal--photo">'+
                    '      <figure><img src="'+data.src_8+'" alt=""></figure>'+
                    '    </div>';
        }
  
        html +=   '  </div>'+
                  '  <ul class="block-quickview-modal--thums js-block-quickview-modal--thums">';
  
        if(data.src_l){
          html +=   '    <li class="block-quickview-modal--thum">'+
                    '      <figure><img src="'+data.src_l+'" alt="商品名"></figure>'+
                    '    </li>';
        }
        if(data.src_1){
          html +=   '    <li class="block-quickview-modal--thum">'+
                    '      <figure><img src="'+data.src_1+'" alt="商品名"></figure>'+
                    '    </li>';
        }
        if(data.src_2){
          html +=   '    <li class="block-quickview-modal--thum">'+
                    '      <figure><img src="'+data.src_2+'" alt="商品名"></figure>'+
                    '    </li>';
        }
        if(data.src_3){
          html +=   '    <li class="block-quickview-modal--thum">'+
                    '      <figure><img src="'+data.src_3+'" alt="商品名"></figure>'+
                    '    </li>';
        }
        if(data.src_4){
          html +=   '    <li class="block-quickview-modal--thum">'+
                    '      <figure><img src="'+data.src_4+'" alt="商品名"></figure>'+
                    '    </li>';
        }
        if(data.src_5){
          html +=   '    <li class="block-quickview-modal--thum">'+
                    '      <figure><img src="'+data.src_5+'" alt="商品名"></figure>'+
                    '    </li>';
        }
        if(data.src_6){
          html +=   '    <li class="block-quickview-modal--thum">'+
                    '      <figure><img src="'+data.src_6+'" alt="商品名"></figure>'+
                    '    </li>';
        }
        if(data.src_7){
          html +=   '    <li class="block-quickview-modal--thum">'+
                    '      <figure><img src="'+data.src_7+'" alt="商品名"></figure>'+
                    '    </li>';
        }
        if(data.src_8){
          html +=   '    <li class="block-quickview-modal--thum">'+
                    '      <figure><img src="'+data.src_8+'" alt="商品名"></figure>'+
                    '    </li>';
        }
  
        html +=   '  </ul>'+
                  '</div>'+
                  '<div class="block-quickview-modal--info">';
  
        html +=   '  <div class="block-icon">';
        if(data.icon_n){
          html += '<span class="block-icon--auto-new"><img src="'+data.icon_n+'" alt=""></span>';
        }
        if(data.icon_nr){
          html += '<span class="block-icon--henpin_huka"><img src="'+data.icon_nr+'" alt=""></span>';
        }
        if(data.icon_s){
          html += '<span class="block-icon--auto-on-sales"><img src="'+data.icon_s+'" alt=""></span>';
        }
        if(data.icon_g.length > 0){
          jQuery(data.icon_g).each(function(i){
            html += '    <span class="block-icon--src'+i+'"><img src="'+data.icon_g[i]+'" alt=""></span>';
          });
        }
        html +=   '  </div>';
        html +=   '  <p class="block-quickview-modal--brand-name">'+data.brand+'</p>'+
                  '  <h1 class="h1 block-quickview-modal--goods-name">'+data.name+'</h1>'+
                  '  <p class="block-quickview-modal--goods-comment">'+data.comment+'</p>'+
                  '  <div class="block-quickview-modal--price">';
        if(data.sales){
          //セール価格の場合
          html += '    <div class="block-quickview-modal--default-price default-price"><span class="title">通常価格</span><span class="value">'+data.format_price+'</span></div>'+
                  '    <div class="block-quickview-modal--on-sales-price price"><span class="title">SALE</span><span class="value">'+data.s_format_price+'</span></div>';
        } else {
          //通常価格
          html += '    <div class="block-quickview-modal--price-price price">'+data.format_price+'</div>'
        }
        html +=   '  </div>'+
                  '  <div class="block-quickview-modal--add-cart">';
  
        if(data.sold){
          //注文可
          html +=
                  '    <form name="frm" method="GET" action="'+eclib.sys.wwwroot+'/shop/cart/cart.aspx">'+
                  '      <input name="goods" type="hidden" value="'+quickview.order_goods_id+'">'+
                  '      <button class="block-quickview-modal--add-cart--btn btn btn-primary js-enhanced-ecommerce-add-cart-detail" type="submit" value="カートへ入れる">カートへ入れる<span class="icon icon-bag"></span></button>'+
                  '    </form>';
  
  
        } else {
          //注文不可
          html += '    <div class="message-soldout">SOLDOUT</div>';
        }
  
        html +=
                  '  </div>'+
                  '  <div class="block-quickview-modal--detail-link">'+
                  '    <a href="'+eclib.sys.wwwroot+'/shop/g/g'+quickview.order_goods_id+'/" class="btn btn-default btn-arrow-right">詳細を見る</a>'+
                  '  </div>'+
  
                  '  <div class="block-quickview-modal--favorite">'+
                  '    <div class="block-quickview-modal--favorite-goods">'+
                  '      <a class="favorite-add-btn js-favorite-goods-add-btn" href="javascript:void(0)" data-goodsid="'+quickview.order_goods_id+'"><span class="icon icon-favorite-add"></span><span class="label">このアイテムを<br>お気に入り追加</span></a>'+
                  '    </div>';
        if(data.brand_code) {
          html +=
                  '    <div class="block-quickview-modal--favorite-brand">'+
                  '      <a class="favorite-add-btn js-favorite-brand-add-btn" href="javascript:void(0)"><span class="icon icon-favorite-add"></span><span class="label">このブランドを<br>お気に入り追加</span></a>'+
                  '    </div>';
        }
        html +=
                  '  </div>'+
                  '</div>'+
          '      </div>'+
          '    </div>'+
          '  </div>';
  
        jQuery('body').append(html);
  
        //クイックビュー内のブランドお気に入り登録ボタンの挙動
        // API URL /shop/customer/favbrandajax.aspx
        // Request Sample brand: 1010|,1010|10,1010|101010,1010|102010
        if(data.brand_code) {
          jQuery('.js-favorite-brand-add-btn').on('click',function(){
            //代表ブランドのみお気に入り登録。紐づくカテゴリは含めない。
            var tgt_btn = jQuery(this);
            var api_url = eclib.sys.wwwroot + "/shop/customer/favbrandajax.aspx";
            var param = {
              'brand' : data.brand_code + '|',
              'crsirefo_hidden' : jQuery('#js_crsirefo_hidden').val()
            }
            jQuery.ajax({
              url: api_url,
              type: 'POST',
              data: param,
              dataType: 'text',
              cache: false,
              timeout: 1000
            }).done(function(msg, textStatus, jqXHR) {
              //console.log("GS ajax success");
              if(msg.match('<!DOCTYPE html>')){
                //非ログイン
                setTimeout(function() {
                  eclib.ui.showToolTip(tgt_btn, { tooltip : 'ログインしてからご利用ください。', diptimeSec : 2 });
                }, 400);
              } else {
                //ログイン済み
                tgt_btn.addClass('is-loading');
                setTimeout(function() {
                  var msg_ = msg.replace(/\"/g,""); //前後の"を削除
                  eclib.ui.showToolTip(tgt_btn, { tooltip : msg_, diptimeSec : 2 });
                  setTimeout(function() {
                    tgt_btn.removeClass('is-loading');
                  },2000);
                }, 400);
              }
  
            }).fail(function(jqXHR, textStatus, errorThrown) {
              //console.log("GS ajax fail", textStatus, errorThrown);
            }).always(function() {
              //console.log("GS ajax always");
            });
          });
        }
  
      };
  
      user_modal.open(
        '.js-quickview-modal-'+quickview.order_goods_id,
        'block-quickview-modal',
        function(){
  
          //スライダー
          var photos = jQuery('.js-quickview-modal-'+quickview.order_goods_id+' .js-block-quickview-modal--photos')
          photos.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
          });
  
          jQuery('.js-block-quickview-modal--thums').each(function(){
            jQuery(this).find('img').each(function(i){
              jQuery(this).on('click',function(){
                photos.slick('slickGoTo',i);
                return false;
              });
            });
          });
  
          //お気に入りボタン
          var crsi = jQuery('#js_crsirefo_hidden').val();
          goods_ajax_bookmark.set(".js-favorite-goods-add-btn",crsi);
  
        }
      );
    }
  
  }
  jQuery(function() {
    quickview.ini();
  });
  
  
  //--- レコメンド用JS処理
  jQuery(function() {
    jQuery('.zeta-recommend-area').each(function(i){
      var this_ = jQuery(this);
      var zeta_recommend_function = function(){
        if(this_.html() != ""){
  
          clearInterval(timer_);
  
          //お気に入りボタン
          var crsi = jQuery('#js_crsirefo_hidden').val();
          goods_ajax_bookmark.set(".js-favorite-add-btn",crsi);
  
          //クイックビューボタン
          quickview.set();
  
          //ga event セット
          ga_event_set();
  
          //data-templateの値によってJSの実行内容を変更
          //data-template="newarrival"
          if(this_.data('template') == 'newarrival') {
            //slick
            jQuery(this_).find('.block-thumbnail-t').slick();
          }
        }
      };
      var timer_ = setInterval(function(){
        zeta_recommend_function();
      }, 500);
    });
  });
  
  /*------------------------------------------------
  * トップページ お気に入り条件のアイテムエリアタブ
  ------------------------------------------------*/
  jQuery(function () {
    jQuery('.block-top-favorite-term').each(function(){
      var current_classname = "is-conditions-current";
      var tabs = jQuery(this).find('.block-top-favorite-term--conditions-list li');
      var favorite_term = jQuery(this);
      var tab_change = function(index){
        tabs.removeClass(current_classname);
        favorite_term.find('li:eq('+index+')').addClass(current_classname);
        favorite_term.find('.block-top-favorite-term--items').hide();
        favorite_term.find('.block-top-favorite-term--items:eq('+index+')').show();
      }
      tabs.each(function(i){
        jQuery(this).on('click',function(){
          tab_change(i);
        });
      });
      tab_change(0);
    });
  });
  
  /*------------------------------------------------
  * トップページ お気に入り条件のアイテムエリアタブ
  ------------------------------------------------*/
  jQuery(function () {
    jQuery('.block-top-favorite-term').each(function(){
      var current_classname = "is-conditions-current";
      var tabs = jQuery(this).find('.block-top-favorite-term--conditions-list li');
      var favorite_term = jQuery(this);
      var tab_change = function(index){
        tabs.removeClass(current_classname);
        favorite_term.find('li:eq('+index+')').addClass(current_classname);
        favorite_term.find('.block-top-favorite-term--items').hide();
        favorite_term.find('.block-top-favorite-term--items:eq('+index+')').show();
      }
      tabs.each(function(i){
        jQuery(this).on('click',function(){
          tab_change(i);
        });
      });
      tab_change(0);
    });
  });
  
  
  /*------------------------------------------------
  * TOPコンテンツ出し分け
  ------------------------------------------------*/
  jQuery(function() {
    let tabs = jQuery(".gender-tab");
    let main = jQuery(".block-top-body-main");
    let sub = jQuery(".block-top-body-sub");
    let pick = jQuery(".pickup_block");
    let header = jQuery(".block-top-event--header");
    let goods = jQuery(".block-top-event--goods");
    let btn = jQuery(".top-feature-btn-more");
  
    //初期表示
    jQuery(document).ready(function(){
      if (jQuery.cookie('tabs_index')) {// クッキーのindexを取得し読み込み時にオープンする
        var cookies = document.cookie;
        var cookiesArray = cookies.split(';');
        for(var c of cookiesArray){
          var cArray = c.split('=');
          if( cArray[0] == 'tabs_index'){
            tabs_index = cArray[1];  // [key,value] 
          };
        };
        tabs.eq(tabs_index).addClass("active");
        main.removeClass("show").eq(tabs_index).fadeIn("slow");
        main.eq(tabs_index).addClass("show");
        sub.removeClass("show").eq(tabs_index).fadeIn("slow");
        sub.eq(tabs_index).addClass("show");
        pick.removeClass("show").eq(tabs_index).fadeIn("slow");
        pick.eq(tabs_index).addClass("show");
        //該当の新商品・オススメ・ランキング表示
        header.eq(Number(tabs_index)).show();
        goods.eq(Number(tabs_index)).show();
        btn.eq(Number(tabs_index)).show();
        header.eq(Number(tabs_index)+3).show();
        goods.eq(Number(tabs_index)+3).show();
        btn.eq(Number(tabs_index)+3).show();
        header.eq(6).show();
        goods.eq(6).show();
        btn.eq(6).show();
      }else{//クッキーが存在しない場合、｢すべて｣を表示
        //｢すべて｣の新商品・オススメ・ランキング表示
        tabs.eq(0).addClass("active");
        header.eq(0).show();
        goods.eq(0).show();
        btn.eq(0).show();
        header.eq(3).show();
        goods.eq(3).show();
        btn.eq(3).show();
        header.eq(6).show();
        goods.eq(6).show();
        btn.eq(6).show();
      }
    });
    tabs.on("click", function() {
      jQuery(".active").removeClass("active");
      jQuery(this).addClass("active");
      tabs_index = tabs.index(this);
      main.hide();
      sub.hide();
      pick.hide();
      header.hide();
      goods.hide();
      btn.hide();
      main.removeClass("show").eq(tabs_index).fadeIn("slow");
      main.eq(tabs_index).addClass("show");
      sub.removeClass("show").eq(tabs_index).fadeIn("slow");
      sub.eq(tabs_index).addClass("show");
      pick.removeClass("show").eq(tabs_index).fadeIn("slow");
      pick.eq(tabs_index).addClass("show");
      header.eq(tabs_index).fadeIn("slow");
      goods.eq(tabs_index).fadeIn("slow");
      btn.eq(tabs_index).fadeIn("slow");
      header.eq(tabs_index+3).fadeIn("slow");
      goods.eq(tabs_index+3).fadeIn("slow");
      btn.eq(tabs_index+3).fadeIn("slow");
      header.eq(6).fadeIn("slow");
      goods.eq(6).fadeIn("slow");
      btn.eq(6).fadeIn("slow");
      document.cookie = 'tabs_index=' + encodeURIComponent( tabs_index );
    });
  });
  
  
  
  /*------------------------------------------------
  * ブランドブログタブ出し分け
  ------------------------------------------------*/
  jQuery(function() {
    let tabs = jQuery(".simpleblog-brandblog-tab");
    let tablist = jQuery(".block-simpleblog-brandblog-tablist");
    //初期表示
    jQuery(document).ready(function(){
      if (jQuery.cookie('brandblog_tabs_index')) {// クッキーのindexを取得し読み込み時にオープンする
        var cookies = document.cookie;
        var cookiesArray = cookies.split(';');
        for(var c of cookiesArray){
          var cArray = c.split('=');
          if( cArray[0] == 'brandblog_tabs_index'){
            brandblog_tabs_index = cArray[1];  // [key,value] 
          };
        };
        tabs.eq(brandblog_tabs_index).addClass("active");
        tablist.removeClass("show").eq(brandblog_tabs_index).fadeIn("slow");
        tablist.eq(tabs_index).addClass("show");
        //該当の新商品・オススメ・ランキング表示
        header.eq(Number(tabs_index)).show();
        goods.eq(Number(tabs_index)).show();
        btn.eq(Number(tabs_index)).show();
        header.eq(Number(tabs_index)+3).show();
        goods.eq(Number(tabs_index)+3).show();
        btn.eq(Number(tabs_index)+3).show();
        header.eq(Number(tabs_index)+6).show();
        goods.eq(Number(tabs_index)+6).show();
        btn.eq(Number(tabs_index)+6).show();
      }else{//クッキーが存在しない場合、｢すべて｣を表示
        //｢すべて｣の新商品・オススメ・ランキング表示
        tabs.eq(0).addClass("active");
        tablist.eq(0).show();
      }
    });
    tabs.on("click", function() {
      jQuery(".active").removeClass("active");
      jQuery(this).addClass("active");
      brandblog_tabs_index = tabs.index(this);
      tablist.hide();
      tablist.removeClass("show").eq(brandblog_tabs_index).fadeIn("slow");
      tablist.eq(brandblog_tabs_index).addClass("show");
      document.cookie = 'brandblog_tabs_index=' + encodeURIComponent( brandblog_tabs_index );
    });
  });
  
  
  /*------------------------------------------------
  * ONEGAI ALLU バナー表示
  ------------------------------------------------*/
  jQuery(function() {
    var animationFlag = false;
  
    jQuery(window).on('scroll', function(){
      var urlParams = new URLSearchParams(window.location.search);
      var page = urlParams.get('p');
      if(page >=2){
        var doch = jQuery(document).innerHeight(); //ページ全体の高さ
        var winh = jQuery(window).innerHeight(); //ウィンドウの高さ
        var bottom = doch - winh; //ページ全体の高さ - ウィンドウの高さ = ページの最下部位置
        if (bottom*0.5 <= jQuery(window).scrollTop()) {          
          if(!animationFlag){
            animationFlag = true;
            jQuery('.onegai_baner_block').slideToggle(750);
          }
        }
      }
    })
  })
  
  jQuery(function(){//バナー削除処理
    jQuery('.onegai_baner_close').on('click',function(){
      jQuery('.onegai_baner_block').slideToggle(500);
    })
  })