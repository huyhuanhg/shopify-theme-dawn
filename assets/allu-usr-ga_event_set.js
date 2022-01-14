var ga_event_setting = [];
if(jQuery("html").data("browse-mode") == "P") {
  //PC
  ga_event_setting = [
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ä¸Šéƒ¨ãƒãƒŠãƒ¼
      "selector": ".block-header-top-banner a",
      "eventCategory": "block_header_top_banner",
      "eventAction": "mousedown",
      "eventLabel": "ãƒ˜ãƒƒãƒ€ãƒ¼ä¸Šéƒ¨ãƒãƒŠãƒ¼"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ãƒ­ã‚´
      "selector": ".block-header-logo a",
      "eventCategory": "block_header_logo",
      "eventAction": "mousedown",
      "eventLabel": "ãƒ˜ãƒƒãƒ€ãƒ¼ ãƒ­ã‚´"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ä¸Šéƒ¨ãƒ¡ãƒ‹ãƒ¥ãƒ¼
      "selector": ".block-headernav--item-list a",
      "eventCategory": "headernav_item_list",
      "eventAction": "mousedown",
      "eventLabel": "text"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ã‚°ãƒ­ãƒ¼ãƒãƒ«ãƒ¡ãƒ‹ãƒ¥ãƒ¼
      "selector": ".block-globalnav--item-list a , .block-globalnav--item-list-2 a",
      "eventCategory": "block_globalnav_item_list",
      "eventAction": "mousedown",
      "eventLabel": "text"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ãƒ˜ãƒƒãƒ€ãƒ¼æ¤œç´¢çª“
      "selector": ".block-global-search-form .block-global-search--keyword",
      "eventCategory": "block_global_search_keyword",
      "eventAction": "focus",
      "eventLabel": "ãƒ˜ãƒƒãƒ€ãƒ¼æ¤œç´¢çª“ã«ãƒ•ã‚©ãƒ¼ã‚«ã‚¹"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ãƒ˜ãƒƒãƒ€ãƒ¼æ¤œç´¢çª“ ã‚µã‚¸ã‚§ã‚¹ãƒˆ
      "selector": ".block-search-suggest--goods a",
      "eventCategory": "block_search_suggest_goods",
      "eventAction": "mousedown",
      "eventLabel": "href"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ãƒ¡ã‚¬ãƒ‰ãƒ­ãƒƒãƒ—ãƒ€ã‚¦ãƒ³ãƒ¡ãƒ‹ãƒ¥ãƒ¼ ãƒ–ãƒ©ãƒ³ãƒ‰
      "selector": ".block-globalnav-menu--brand a",
      "eventCategory": "block_globalnav_menu_brand",
      "eventAction": "mousedown",
      "eventLabel": "text"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ãƒ¡ã‚¬ãƒ‰ãƒ­ãƒƒãƒ—ãƒ€ã‚¦ãƒ³ãƒ¡ãƒ‹ãƒ¥ãƒ¼ ã‚«ãƒ†ã‚´ãƒª
      "selector": ".block-globalnav-menu--category a",
      "eventCategory": "block_globalnav_menu_category",
      "eventAction": "mousedown",
      "eventLabel": "text"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ãŠæ°—ã«å…¥ã‚Š ãƒ‰ãƒ­ãƒƒãƒ—ãƒ€ã‚¦ãƒ³ãƒ¡ãƒ‹ãƒ¥ãƒ¼
      "selector": ".dropdown-menu-content-favorite a",
      "eventCategory": "dropdown_menu_content_favorite",
      "eventAction": "mousedown",
      "eventLabel": "text"
    },
    {
      //ãƒ‘ãƒ³ããš
      "selector": ".block-topic-path a",
      "eventCategory": "block_topic_path",
      "eventAction": "mousedown",
      "eventLabel": "text"
    },
    {
      //ãƒ•ãƒƒã‚¿ãƒ¼ 
      "selector": ".block-footernav a",
      "eventCategory": "footer",
      "eventAction": "mousedown",
      "eventLabel": "text"
    },
    {
      //ãƒ•ãƒƒã‚¿ãƒ¼ 
      "selector": ".block-footer-bottom a",
      "eventCategory": "footer",
      "eventAction": "mousedown",
      "eventLabel": "alt"
    },
    {
      //ãƒ•ãƒƒã‚¿ãƒ¼ 
      "selector": ".block-page-top a",
      "eventCategory": "block_page_top",
      "eventAction": "mousedown",
      "eventLabel": "ãƒšãƒ¼ã‚¸ä¸Šéƒ¨ã¸æˆ»ã‚‹"
    },
    
    {
      //ãƒˆãƒƒãƒ— ãƒ¡ã‚¤ãƒ³ã‚¹ãƒ©ã‚¤ãƒ€ãƒ¼ ãƒ¡ã‚¤ãƒ³ç”»åƒ
      "selector": ".page-top .block-top-body--mv-slide a",
      "eventCategory": "block_top_body_mv_slide",
      "eventAction": "mousedown",
      "eventLabel": "href"
    },
    {
      //ãƒˆãƒƒãƒ— ãƒ”ãƒƒã‚¯ã‚¢ãƒƒãƒ—ãƒ–ãƒ©ãƒ³ãƒ‰
      "selector": ".page-top .top-pickup-brand-list a",
      "eventCategory": "top_pickup_brand_list",
      "eventAction": "mousedown",
      "eventLabel": "href"
    },
    {
      //ãƒˆãƒƒãƒ— ç‰¹é›†
      "selector": ".page-top .top-feature a",
      "eventCategory": "top_feature",
      "eventAction": "mousedown",
      "eventLabel": "href"
    },
    {
      //ãŠæ°—ã«å…¥ã‚Šè¿½åŠ ãƒœã‚¿ãƒ³
      "selector": ".js-favorite-add-btn",
      "eventCategory": "favorite_add_btn",
      "eventAction": "mousedown",
      "eventLabel": "favorite_add_btn"
    },
    {
      //ã‚¯ã‚¤ãƒƒã‚¯ãƒ“ãƒ¥ãƒ¼ãƒœã‚¿ãƒ³
      "selector": ".js-quickview-trigger-btn",
      "eventCategory": "quickview_trigger_btn",
      "eventAction": "mousedown",
      "eventLabel": "quickview_trigger_btn"
    },
    {
      //ãƒˆãƒƒãƒ— ã‚¤ãƒ³ã‚¹ã‚¿æŠ•ç¨¿
      "selector": ".block-top-instagram-photos--item a",
      "eventCategory": "block_top_instagram_photos_item",
      "eventAction": "mousedown",
      "eventLabel": "href"
    },
    {
      //æœ€è¿‘è¦‹ãŸå•†å“
      "selector": ".block-recent-item a",
      "eventCategory": "block_recent_item",
      "eventAction": "mousedown",
      "eventLabel": "href"
    },
    {
      //ãƒ•ãƒƒã‚¿ãƒ¼ä¸Šéƒ¨ ãƒ–ãƒ©ãƒ³ãƒ‰ãƒªã‚¹ãƒˆ
      "selector": ".block-top-brand-list a",
      "eventCategory": "block_top_brand_list",
      "eventAction": "mousedown",
      "eventLabel": "href"
    },
    {
      //å•†å“è©³ç´°ãƒªã‚¯ã‚¨ã‚¹ãƒˆ
      "selector": ".block-request a",
      "eventCategory": "URL",
      "eventAction": "mousedown",
      "eventLabel": "alt"
    },
    {
      //ãã®ä»–ã®ãƒšãƒ¼ã‚¸å…±é€š
      "selector": "a",
      "eventCategory": "URL",
      "eventAction": "mousedown",
      "eventLabel": "href"
    },
    {
      //ãƒ•ã‚©ãƒ¼ãƒ è¦ç´  ãƒã‚§ãƒƒã‚¯ãƒœãƒƒã‚¯ã‚¹ã€ãƒ©ã‚¸ã‚ªãƒœã‚¿ãƒ³
      "selector": "input[type='checkbox'],input[type='radio']",
      "eventCategory": "URL",
      "eventAction": "change",
      "eventLabel": "name"
    },
    {
      //ãƒ•ã‚©ãƒ¼ãƒ è¦ç´  ãƒœã‚¿ãƒ³é¡žï¼ˆbuttonã€submitï¼‰
      "selector": "input[type='button'],input[type='submit']",
      "eventCategory": "URL",
      "eventAction": "mousedown",
      "eventLabel": "value"
    },
    {
      //ãƒ•ã‚©ãƒ¼ãƒ è¦ç´  ãƒœã‚¿ãƒ³é¡žï¼ˆimageï¼‰
      "selector": "input[type='image']",
      "eventCategory": "URL",
      "eventAction": "mousedown",
      "eventLabel": "value"
    },
    {
      //ãƒ•ã‚©ãƒ¼ãƒ è¦ç´  ãã®ä»–ï¼ˆãƒ†ã‚­ã‚¹ãƒˆå…¥åŠ›ã€ãƒ—ãƒ«ãƒ€ã‚¦ãƒ³ã€ãƒ•ã‚¡ã‚¤ãƒ«é¸æŠžï¼‰
      "selector": "input[type='text'],input[type='password'],input[type='file'],input[type='search'],input[type='url'],input[type='email'],input[type='datetime'],input[type='month'],input[type='week'],input[type='time'],input[type='datetime-local'],input[type='number'],input[type='range'],input[type='color'],textarea,select",
      "eventCategory": "URL",
      "eventAction": "focus",
      "eventLabel": "name"
    }
  ];
} else {
  //SP
  ga_event_setting = [
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ä¸Šéƒ¨ãƒãƒŠãƒ¼
      "selector": ".block-header-top-banner a",
      "eventCategory": "block_header_top_banner",
      "eventAction": "tap",
      "eventLabel": "ãƒ˜ãƒƒãƒ€ãƒ¼ä¸Šéƒ¨ãƒãƒŠãƒ¼"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ãƒ­ã‚´
      "selector": ".block-header-logo a",
      "eventCategory": "block_header_logo",
      "eventAction": "tap",
      "eventLabel": "ãƒ˜ãƒƒãƒ€ãƒ¼ ãƒ­ã‚´"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ä¸Šéƒ¨ãƒ¡ãƒ‹ãƒ¥ãƒ¼
      "selector": ".block-headernav--item-list a",
      "eventCategory": "headernav_item_list",
      "eventAction": "tap",
      "eventLabel": "text"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ã‚°ãƒ­ãƒ¼ãƒãƒ«ãƒ¡ãƒ‹ãƒ¥ãƒ¼
      "selector": ".block-globalnav--item-list a",
      "eventCategory": "block_globalnav_item_list",
      "eventAction": "tap",
      "eventLabel": "text"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ å·¦ãƒˆã‚°ãƒ«ãƒ¡ãƒ‹ãƒ¥ãƒ¼
      "selector": ".block-header-toggle-menu a",
      "eventCategory": "block_header_toggle_menu",
      "eventAction": "tap",
      "eventLabel": "text"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ãƒ˜ãƒƒãƒ€ãƒ¼æ¤œç´¢çª“
      "selector": ".block-search-box--keyword",
      "eventCategory": "block_global_search_keyword",
      "eventAction": "focus",
      "eventLabel": "ãƒ˜ãƒƒãƒ€ãƒ¼æ¤œç´¢çª“ã«ãƒ•ã‚©ãƒ¼ã‚«ã‚¹"
    },
    {
      //ãƒ˜ãƒƒãƒ€ãƒ¼ ãƒ˜ãƒƒãƒ€ãƒ¼æ¤œç´¢çª“ ã‚µã‚¸ã‚§ã‚¹ãƒˆ
      "selector": ".block-search-suggest--goods a",
      "eventCategory": "block_search_suggest_goods",
      "eventAction": "tap",
      "eventLabel": "href"
    },
    {
      //ãƒ‘ãƒ³ããš
      "selector": ".block-topic-path a",
      "eventCategory": "block_topic_path",
      "eventAction": "tap",
      "eventLabel": "text"
    },
    {
      //ãƒ•ãƒƒã‚¿ãƒ¼ 
      "selector": ".block-footernav a",
      "eventCategory": "footer",
      "eventAction": "tap",
      "eventLabel": "text"
    },
    {
      //ãƒ•ãƒƒã‚¿ãƒ¼ 
      "selector": ".block-footer-bottom a",
      "eventCategory": "footer",
      "eventAction": "tap",
      "eventLabel": "alt"
    },
    {
      //ãƒ•ãƒƒã‚¿ãƒ¼ ãƒšãƒ¼ã‚¸ä¸Šéƒ¨ã¸æˆ»ã‚‹
      "selector": ".block-page-top a",
      "eventCategory": "block_page_top",
      "eventAction": "tap",
      "eventLabel": "ãƒšãƒ¼ã‚¸ä¸Šéƒ¨ã¸æˆ»ã‚‹"
    },
    
    {
      //ãƒˆãƒƒãƒ— ãƒ¡ã‚¤ãƒ³ã‚¹ãƒ©ã‚¤ãƒ€ãƒ¼ ãƒ¡ã‚¤ãƒ³ç”»åƒ
      "selector": ".page-top .block-top-body--mv-slide a",
      "eventCategory": "block_top_body_mv_slide",
      "eventAction": "tap",
      "eventLabel": "href"
    },
    {
      //ãƒˆãƒƒãƒ— ãƒ”ãƒƒã‚¯ã‚¢ãƒƒãƒ—ãƒ–ãƒ©ãƒ³ãƒ‰
      "selector": ".page-top .top-pickup-brand-list a",
      "eventCategory": "top_pickup_brand_list",
      "eventAction": "tap",
      "eventLabel": "href"
    },
    {
      //ãƒˆãƒƒãƒ— ç‰¹é›†
      "selector": ".page-top .top-feature a",
      "eventCategory": "top_feature",
      "eventAction": "tap",
      "eventLabel": "href"
    },
    {
      //ãŠæ°—ã«å…¥ã‚Šè¿½åŠ ãƒœã‚¿ãƒ³
      "selector": ".js-favorite-add-btn",
      "eventCategory": "favorite_add_btn",
      "eventAction": "tap",
      "eventLabel": "favorite_add_btn"
    },
    {
      //ãƒˆãƒƒãƒ— ã‚¤ãƒ³ã‚¹ã‚¿æŠ•ç¨¿
      "selector": ".block-top-instagram-photos--item a",
      "eventCategory": "block_top_instagram_photos_item",
      "eventAction": "tap",
      "eventLabel": "href"
    },
    {
      //ã‚«ãƒ†ã‚´ãƒªãƒ„ãƒªãƒ¼
      "selector": ".block-category-tree a",
      "eventCategory": "block_category_tree",
      "eventAction": "tap",
      "eventLabel": "href"
    },
    {
      //ã‚¸ãƒ£ãƒ³ãƒ«ãƒ„ãƒªãƒ¼
      "selector": ".block-genre-tree a",
      "eventCategory": "block_genre_tree",
      "eventAction": "tap",
      "eventLabel": "href"
    },
    {
      //æœ€è¿‘è¦‹ãŸå•†å“
      "selector": ".block-recent-item a",
      "eventCategory": "block_recent_item",
      "eventAction": "tap",
      "eventLabel": "href"
    },
    
    {
      //ãƒ•ãƒƒã‚¿ãƒ¼ä¸Šéƒ¨ ãƒ–ãƒ©ãƒ³ãƒ‰ãƒªã‚¹ãƒˆ
      "selector": ".block-top-brand-list a",
      "eventCategory": "block_top_brand_list",
      "eventAction": "tap",
      "eventLabel": "href"
    },
    {
      //å•†å“è©³ç´°ãƒªã‚¯ã‚¨ã‚¹ãƒˆ
      "selector": ".block-request a",
      "eventCategory": "URL",
      "eventAction": "tap",
      "eventLabel": "alt"
    },
    {
      //ãã®ä»–ã®ãƒšãƒ¼ã‚¸å…±é€š
      "selector": "a",
      "eventCategory": "URL",
      "eventAction": "tap",
      "eventLabel": "href"
    },
    {
      //ãƒ•ã‚©ãƒ¼ãƒ è¦ç´  ãƒã‚§ãƒƒã‚¯ãƒœãƒƒã‚¯ã‚¹ã€ãƒ©ã‚¸ã‚ªãƒœã‚¿ãƒ³
      "selector": "input[type='checkbox'],input[type='radio']",
      "eventCategory": "URL",
      "eventAction": "change",
      "eventLabel": "name"
    },
    {
      //ãƒ•ã‚©ãƒ¼ãƒ è¦ç´  ãƒœã‚¿ãƒ³é¡žï¼ˆbuttonã€submitï¼‰
      "selector": "input[type='button'],input[type='submit']",
      "eventCategory": "URL",
      "eventAction": "tap",
      "eventLabel": "value"
    },
    {
      //ãƒ•ã‚©ãƒ¼ãƒ è¦ç´  ãƒœã‚¿ãƒ³é¡žï¼ˆimageï¼‰
      "selector": "input[type='image']",
      "eventCategory": "URL",
      "eventAction": "tap",
      "eventLabel": "value"
    },
    {
      //ãƒ•ã‚©ãƒ¼ãƒ è¦ç´  ãã®ä»–ï¼ˆãƒ†ã‚­ã‚¹ãƒˆå…¥åŠ›ã€ãƒ—ãƒ«ãƒ€ã‚¦ãƒ³ã€ãƒ•ã‚¡ã‚¤ãƒ«é¸æŠžï¼‰
      "selector": "input[type='text'],input[type='password'],input[type='file'],input[type='search'],input[type='url'],input[type='email'],input[type='datetime'],input[type='month'],input[type='week'],input[type='time'],input[type='datetime-local'],input[type='number'],input[type='range'],input[type='color'],textarea,select",
      "eventCategory": "URL",
      "eventAction": "focus",
      "eventLabel": "name"
    }
  ];
}

//ã‚¹ãƒžãƒ›ã®ã‚¿ãƒƒãƒ—ã‚¤ãƒ™ãƒ³ãƒˆæ¤œçŸ¥ç”¨å‡¦ç†
/*
å‡¦ç†æ¦‚è¦
touchstartã€touchmoveã€touchendã‚¤ãƒ™ãƒ³ãƒˆã‚’å–å¾—ã—ã€
touchstartã®å¾Œã«touchendãŒèµ·ããŸã‚‰ã€tapã¨ã¿ãªã™
touchstartã®å¾Œã«touchmoveãŒèµ·ããŸã‚‰ã€ãã®å¾ŒtouchendãŒèµ·ãã¦ã‚‚tapã¨ã¯ã¿ãªã•ãªã„
*/
var last_touch_event = "";
var last_touch_event_clear_timer;
jQuery(function(){
  jQuery("body").on("touchstart",function(){
    last_touch_event = "touchstart";
    clearTimeout(last_touch_event_clear_timer);
    last_touch_event_clear_timer = setTimeout(function(){
      last_touch_event = "";
    },500);
  });
  jQuery("body").on("touchmove",function(){
    last_touch_event = "touchmove";
    clearTimeout(last_touch_event_clear_timer);
  });
  jQuery("body").on("touchend",function(){
    last_touch_event = "touchend";
    clearTimeout(last_touch_event_clear_timer);
  });
});

//for google analytics event tracking
var ga_tracker_name = "ga_tracker_allu";
var ga_ = function(event_, eventCategory_, eventAction_, eventLabel_, eventValue_, fieldsObject_){
  console.log('------------------------------------------------------------------');
  console.log('ga' , ga_tracker_name + '.send', event_, eventCategory_, eventAction_, eventLabel_, eventValue_, fieldsObject_);
  console.log('ga_tracker_name:'+ga_tracker_name);
  console.log('event_:'+event_);
  console.log('eventCategory_:'+eventCategory_);
  console.log('eventAction_:'+eventAction_);
  console.log('eventLabel_:'+eventLabel_);
  console.log('eventValue_:'+eventValue_);
  console.log('fieldsObject_:'+fieldsObject_);
  console.log('------------------------------------------------------------------');

  //alert('ga');
  if(typeof ga == 'function') { //gaå­˜åœ¨ãƒã‚§ãƒƒã‚¯
  ga(ga_tracker_name + '.send', event_, eventCategory_, eventAction_, eventLabel_, eventValue_, fieldsObject_);
  }
}

var ga_event_set = function(){
  console.log("ga_event_set start");
  jQuery(ga_event_setting).each(function(){
    var selector_ = this.selector;
    var eventCategory_ = this.eventCategory;
    var eventAction_ = this.eventAction;
    var eventLabel_ = this.eventLabel;
    jQuery(selector_).each(function(i){
      if(!jQuery(this).data('event-attr-setting')){
        var index = i + 1;
        var eventCategory = eventCategory_;
        var eventAction = eventAction_;
        var eventLabel = jQuery(this).attr('href');

        //eventCategoryã«URLãŒæŒ‡å®šã•ã‚ŒãŸã‚‰location.pathnameã‚’ä»£å…¥
        if(eventCategory == "URL"){
          eventCategory = location.pathname;
        }

        //
        if(eventLabel_ == "href"){
          eventLabel = jQuery(this).attr('href');
          if(eventLabel){
            if( eventLabel.indexOf(document.domain) != -1 ){
              eventLabel = eventLabel.split(document.domain)[1];
            }
          } else {
            eventLabel = jQuery(this).text();
          }
        } else if (eventLabel_ == "index") {
          eventLabel = index;
        } else if (eventLabel_ == "text") {
          eventLabel = jQuery(this).text();
        } else if (eventLabel_ == "name") {
          // name > value > alt ã®é †ã§undefinedã ã£ãŸå ´åˆã«å‚ç…§ã™ã‚‹
          eventLabel = jQuery(this).attr('name');
          if(eventLabel == undefined){
            eventLabel = jQuery(this).attr('value');
          }
          if(eventLabel == undefined){
            eventLabel = jQuery(this).attr('alt');
          }
        } else if (eventLabel_ == "value") {
          // value > alt ã®é †ã§undefinedã ã£ãŸå ´åˆã«å‚ç…§ã™ã‚‹
          eventLabel = jQuery(this).attr('value');
          if(eventLabel == undefined){
            eventLabel = jQuery(this).attr('alt');
          }
        } else if (eventLabel_ == "alt") {
          eventLabel = jQuery(this).find('img').attr('alt');
        } else if (eventLabel_ == "favorite_add_btn") {
          //ãŠæ°—ã«å…¥ã‚Šãƒœã‚¿ãƒ³
          eventLabel = jQuery(this).attr('data-goodsid');
        } else if (eventLabel_ == "quickview_trigger_btn") {
          //ã‚¯ã‚¤ãƒƒã‚¯ãƒ“ãƒ¥ãƒ¼ãƒœã‚¿ãƒ³
          eventLabel = jQuery(this).attr('data-goodsid');
        } else {
          eventLabel = eventLabel_+index;
        }
        jQuery(this).attr('data-event-attr-setting','event'+','+eventCategory+','+eventAction+','+eventLabel);
      }
    });
  });

  jQuery('[data-event-attr-setting]').each(function(i){
    var eventCategory = jQuery(this).data('event-attr-setting').split(',')[1];
    var eventAction = jQuery(this).data('event-attr-setting').split(',')[2];
    var eventLabel = jQuery(this).data('event-attr-setting').split(',')[3];

    if(!jQuery(this).data('event-setting')){
      if(eventAction == "tap"){
        jQuery(this).on("touchend",function(){
          if(last_touch_event == "touchstart"){
            //ç›´å‰ã®ã‚¤ãƒ™ãƒ³ãƒˆãŒtouchstartã ã£ãŸå ´åˆã®ã¿ã€tapã¨ã¿ãªã™
            ga_('event', eventCategory, eventAction, eventLabel, null,{ nonInteraction: true });
          }
        });
      } else {
        jQuery(this).on(eventAction,function(){
          ga_('event', eventCategory, eventAction, eventLabel, null,{ nonInteraction: true });
        });
      }
      jQuery(this).data('event-setting','1');
    }
  });
}

jQuery(function(){
  ga_event_set();
});