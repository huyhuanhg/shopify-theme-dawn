/// <reference path="jquery.js"/>
jQuery.noConflict(); 
/*  半角->全角変換の実行可否変数 */
var ENABLE_HanToZen = true; 
/*  全角->半角変換の実行可否変数 */
var ENABLE_ZenToHan = true;  
/*  default charsetの設定 */
jQuery.ajaxSetup({
    contentType: 'application/x-www-form-urlencoded; charset=utf-8'
}); 
/*  util */
function _ecUtil() { 
    /*  ダブルクリック禁止処理 */
    this.ignoreDblClickFlag = null; 
    /*  郵便番号検索 */
    var timerId_lookupzip_ = null;
    var zipcache_lookupzip_ = '';
    var timerId_zipcache_ = null; 
    /*  配送先自動化 */
    var timeId_RewriteDateSpec = null; 

	/* 2018/09/06 add kawaitak */
    /*  配送先自動化 */
    var timeId_RewriteDateSpecCart = null; 

    /*  全角半角変換 */
    this.hanMap = {};
    this.zenMap = {
        'ａ': 'a',
        'ｂ': 'b',
        'ｃ': 'c',
        'ｄ': 'd',
        'ｅ': 'e',
        'ｆ': 'f',
        'ｇ': 'g',
        'ｈ': 'h',
        'ｉ': 'i',
        'ｊ': 'j',
        'ｋ': 'k',
        'ｌ': 'l',
        'ｍ': 'm',
        'ｎ': 'n',
        'ｏ': 'o',
        'ｐ': 'p',
        'ｑ': 'q',
        'ｒ': 'r',
        'ｓ': 's',
        'ｔ': 't',
        'ｕ': 'u',
        'ｖ': 'v',
        'ｗ': 'w',
        'ｘ': 'x',
        'ｙ': 'y',
        'ｚ': 'z',
        'Ａ': 'A',
        'Ｂ': 'B',
        'Ｃ': 'C',
        'Ｄ': 'D',
        'Ｅ': 'E',
        'Ｆ': 'F',
        'Ｇ': 'G',
        'Ｈ': 'H',
        'Ｉ': 'I',
        'Ｊ': 'J',
        'Ｋ': 'K',
        'Ｌ': 'L',
        'Ｍ': 'M',
        'Ｎ': 'N',
        'Ｏ': 'O',
        'Ｐ': 'P',
        'Ｑ': 'Q',
        'Ｒ': 'R',
        'Ｓ': 'S',
        'Ｔ': 'T',
        'Ｕ': 'U',
        'Ｖ': 'V',
        'Ｗ': 'W',
        'Ｘ': 'X',
        'Ｙ': 'Y',
        'Ｚ': 'Z',
        '０': '0',
        '１': '1',
        '２': '2',
        '３': '3',
        '４': '4',
        '５': '5',
        '６': '6',
        '７': '7',
        '８': '8',
        '９': '9',
        '！': '!',
        '＠': '@',
        '＃': '#',
        '＄': '$',
        '％': '%',
        '＾': '^',
        '＆': '&',
        '＊': '*',
        '（': '(',
        '）': ')',
        '＿': '_',
        '＋': '+',
        '｜': '|',
        '￣': '~',
        '－': '-',
        '＝': '=',
        '￥': '\\',
        '｀': '`',
        '｛': '{',
        '｝': '}',
        '［': '[',
        '］': ']',
        '：': ':',
        '”': '"',
        '；': ';',
        '’': '\'',
        '＜': '<',
        '＞': '>',
        '？': '?',
        '，': ',',
        '．': '.',
        '／': '/',
        '。': '｡',
        '「': '｢',
        '」': '｣',
        '、': '､',
        '・': '･',
        'ヲ': 'ｦ',
        'ァ': 'ｧ',
        'ィ': 'ｨ',
        'ゥ': 'ｩ',
        'ェ': 'ｪ',
        'ォ': 'ｫ',
        'ャ': 'ｬ',
        'ュ': 'ｭ',
        'ョ': 'ｮ',
        'ッ': 'ｯ',
        'ー': 'ｰ',
        'ア': 'ｱ',
        'イ': 'ｲ',
        'ウ': 'ｳ',
        'エ': 'ｴ',
        'オ': 'ｵ',
        'カ': 'ｶ',
        'キ': 'ｷ',
        'ク': 'ｸ',
        'ケ': 'ｹ',
        'コ': 'ｺ',
        'サ': 'ｻ',
        'シ': 'ｼ',
        'ス': 'ｽ',
        'セ': 'ｾ',
        'ソ': 'ｿ',
        'タ': 'ﾀ',
        'チ': 'ﾁ',
        'ツ': 'ﾂ',
        'テ': 'ﾃ',
        'ト': 'ﾄ',
        'ナ': 'ﾅ',
        'ニ': 'ﾆ',
        'ヌ': 'ﾇ',
        'ネ': 'ﾈ',
        'ノ': 'ﾉ',
        'ハ': 'ﾊ',
        'ヒ': 'ﾋ',
        'フ': 'ﾌ',
        'ヘ': 'ﾍ',
        'ホ': 'ﾎ',
        'マ': 'ﾏ',
        'ミ': 'ﾐ',
        'ム': 'ﾑ',
        'メ': 'ﾒ',
        'モ': 'ﾓ',
        'ヤ': 'ﾔ',
        'ユ': 'ﾕ',
        'ヨ': 'ﾖ',
        'ラ': 'ﾗ',
        'リ': 'ﾘ',
        'ル': 'ﾙ',
        'レ': 'ﾚ',
        'ロ': 'ﾛ',
        'ワ': 'ﾜ',
        'ン': 'ﾝ',
        'ガ': 'ｶﾞ',
        'ギ': 'ｷﾞ',
        'グ': 'ｸﾞ',
        'ゲ': 'ｹﾞ',
        'ゴ': 'ｺﾞ',
        'ザ': 'ｻﾞ',
        'ジ': 'ｼﾞ',
        'ズ': 'ｽﾞ',
        'ゼ': 'ｾﾞ',
        'ゾ': 'ｿﾞ',
        'ダ': 'ﾀﾞ',
        'ヂ': 'ﾁﾞ',
        'ヅ': 'ﾂﾞ',
        'デ': 'ﾃﾞ',
        'ド': 'ﾄﾞ',
        'バ': 'ﾊﾞ',
        'パ': 'ﾊﾟ',
        'ビ': 'ﾋﾞ',
        'ピ': 'ﾋﾟ',
        'ブ': 'ﾌﾞ',
        'プ': 'ﾌﾟ',
        'ベ': 'ﾍﾞ',
        'ペ': 'ﾍﾟ',
        'ボ': 'ﾎﾞ',
        'ポ': 'ﾎﾟ',
        'ヴ': 'ｳﾞ',
        '゛': 'ﾞ',
        '゜': 'ﾟ',
        '　': ' '
    }; 
    /*  半角->全角マップ */
    for (var key in this.zenMap) {
        if (!this.hanMap[this.zenMap[key]]) {
            this.hanMap[this.zenMap[key]] = key;
        }
    } 
    /*  半角<->全角変換 */
    this.strConvert = function(obj, isHanToZen) {
        if (obj.value == obj.getAttribute("title")) {
            return true;
        }
        if ((isHanToZen == true) && (ENABLE_HanToZen == false)) {
            return true;
        }
        if ((isHanToZen == false) && (ENABLE_ZenToHan == false)) {
            return true;
        }
        var str = obj.value;
        var conv = '';
        var map = isHanToZen ? this.hanMap : this.zenMap;
        for (var i = 0; i < str.length; i++) {
            var tmp = '';
            if (i < str.length - 1) {
                tmp = str.substring(i, i + 2);
            }
            if (map[tmp]) {
                conv += map[tmp];
                i++;
                continue;
            } else {
                tmp = str.substring(i, i + 1);
                conv += map[tmp] ? map[tmp] : tmp;
            }
        }
        obj.value = conv;
        return true;
    }; 
    /*  ダブルクリック（連続ポスト）の制御 */
    this.ignoreDblClick = function() {
        if (this.ignoreDblClickFlag == null) {
            this.ignoreDblClickFlag = 1;
            return true;
        } else {
            return false;
        }
    }; 
    /*  htmlタグの置き換え */
    this.htmlspecialchars = function(str) {
        if (!str || str == '') {
            return '';
        }
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#039;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        return str;
    }; 
    /*  配送希望日自動切換え */
    this.RewriteDateSpec = function(dest) {
        dest = '#dest_r' + dest;
        var timerOffset = 300;
        var lp_goods = (jQuery('.js-landingpage-change-order-form').val() != undefined) ? jQuery('.js-landingpage-change-order-form').val() : '';
        clearTimeout(timeId_RewriteDateSpec);
        timeId_RewriteDateSpec = setTimeout(function() {
            if (!jQuery(dest).val().match(/^[0-9]+$/)) {
                return true;
            }
            jQuery.get('../js/destajax.aspx', {
                dest: jQuery(dest).val(),
                lp_goods: lp_goods,
                charset: 'shift_jis'
            }, function(data, status) {
                var val = jQuery('select[name=date_detail_spec] :selected').val();
                jQuery('select[name=date_detail_spec]').children().remove();
                jQuery('select[name=date_detail_spec]').html(data);
                jQuery('select[name=date_detail_spec]').val(val);
                if (jQuery('select[name=date_detail_spec] :selected').text() == '') {
                    jQuery('select[name=date_detail_spec] option:first').prop('selected', true);
                }
            }, 'html');
        }, timerOffset);
    }; 
    /*  配送希望日自動切換え(ゲスト)  */
    this.RewriteDateSpecGuest = function() {
        var chkother = '#chkother';
        var s_zip = '#s_zip';
        var d_zip = '#d_zip';
        var s_pref = '#s_pref';
        var d_pref = '#d_pref';
        var chkother_val ='';
        var s_zip_val = '';
        var s_pref_val = '';
        var d_zip_val = '';
        var d_pref_val = '';
        var lp_goods = (jQuery('.js-landingpage-change-order-form').val() != undefined) ? jQuery('.js-landingpage-change-order-form').val() : '';
        var timerOffset = 300;
        if(jQuery(chkother).prop('checked')){
             jQuery(".js-block-order-method--dest-input").show();
             jQuery(".js-block-landingpage-other--dest-input").show();
        } else {
             jQuery(".js-block-order-method--dest-input").hide();
             jQuery(".js-block-landingpage-other--dest-input").hide();
        }
        clearTimeout(timeId_RewriteDateSpec);
        timeId_RewriteDateSpec = setTimeout(function() {
            if (jQuery(chkother).prop('checked') && (jQuery(d_pref).val() != '' || jQuery(d_zip).val() != '')) {
                if (jQuery(d_zip).val() != '' && !jQuery(d_zip).val().match(/^[0-9]{3}[\-]{0,1}[0-9]{0,4}$/)) {
                    return true;
                }
                d_zip_val = jQuery(d_zip).val();
                d_pref_val = jQuery(d_pref).val();
                chkother_val =jQuery(chkother).val();
            } else if (!jQuery(chkother).prop('checked') && (jQuery(s_pref).val() != '' || jQuery(s_zip).val() != '')) {
                if (jQuery(s_zip).val() != '' && !jQuery(s_zip).val().match(/^[0-9]{3}[\-]{0,1}[0-9]{0,4}$/)) {
                    return true;
                }
                s_zip_val = jQuery(s_zip).val();
                s_pref_val = jQuery(s_pref).val();
                chkother_val = '';
            } else {
                s_zip_val = '';
                s_pref_val = '';
                d_zip_val = '';
                d_pref_val = '';
                chkother_val = '';
            }
            jQuery.get('../js/destajax.aspx', {
                chkother: chkother_val,
                s_zip: s_zip_val,
                s_pref: s_pref_val,
                d_zip: d_zip_val,
                d_pref: d_pref_val,
                lp_goods: lp_goods,
                charset: 'shift_jis'
            }, function(data, status) {
                var val = jQuery('select[name=date_detail_spec] :selected').val();
                jQuery('select[name=date_detail_spec]').children().remove();
                jQuery('select[name=date_detail_spec]').html(data);
                jQuery('select[name=date_detail_spec]').val(val);
                if (jQuery('select[name=date_detail_spec] :selected').text() == '') {
                    jQuery('select[name=date_detail_spec] option:first').prop('selected', true);
                }
            }, 'html');
        }, timerOffset);
    }; 

    /*  汎用入力チェック */
    this.confirmInputCheck = function() { 
        /*  メールアドレスチェック */
        if (jQuery('#mail').size() == 1 && jQuery('#cmail').size() == 1) {
            if (jQuery('#mail').val() != jQuery('#cmail').val()) {
                alert('メールアドレスとメールアドレス（確認）が一致しません');
                ecUtil.ignoreDblClickFlag = false;
                return false;
            }
        } 
        /*  メールアドレスチェック２ */
        if (jQuery('#newmail1').size() == 1 && jQuery('#newmail2').size() == 1) {
            if (jQuery('#newmail1').val() != jQuery('#newmail2').val()) {
                alert('メールアドレスとメールアドレス（確認）が一致しません');
                ecUtil.ignoreDblClickFlag = false;
                return false;
            }
        } 
        /*  パスワードチェック */
        if (jQuery('#pwd').size() == 1 && jQuery('#cpwd').size() == 1) {
            if (jQuery('#pwd').val() != jQuery('#cpwd').val()) {
                alert('入力されたパスワードと確認用パスワードが一致しません');
                ecUtil.ignoreDblClickFlag = false;
                return false;
            }
        } 
        /*  パスワードチェック2 */
        if (jQuery('#npwd1').size() == 1 && jQuery('#npwd2').size() == 1) {
            if (jQuery('#npwd1').val() != jQuery('#npwd2').val()) {
                alert('入力されたパスワードと確認用パスワードが一致しません');
                ecUtil.ignoreDblClickFlag = false;
                return false;
            }
        } 
        /*  IDチェック */
        if (jQuery('#newid1').size() == 1 && jQuery('#newid2').size() == 1) {
            if (jQuery('#newid1').val() != jQuery('#newid2').val()) {
                alert('入力されたIDと確認用IDが一致しません');
                ecUtil.ignoreDblClickFlag = false;
                return false;
            }
        } 
        /*  IDとPASSの不一致確認 */
        if (jQuery('#uid').size() == 1 && jQuery('#pwd').size() == 1) {
            if (jQuery('#uid').val() != "" && jQuery('#pwd').val() != "") {
                if (jQuery('#uid').val() == jQuery('#pwd').val()) {
                    alert('会員IDとパスワードは別々のものを指定してください');
                    jQuery('#pwd').val('');
                    jQuery('#cpwd').val('');
                    ecUtil.ignoreDblClickFlag = false;
                    return false;
                }
            }
        }
        return true;
    }; 

	/* 2018/09/06 add kawaitak */
    /*  配送希望日自動切換え（店舗受取用） */
    this.RewriteDateSpecCart = function(shop) {
        shop = '#shop_r' + shop;
        var timerOffset = 300;
        var lp_goods = (jQuery('.js-landingpage-change-order-form').val() != undefined) ? jQuery('.js-landingpage-change-order-form').val() : '';
        clearTimeout(timeId_RewriteDateSpecCart);
        timeId_RewriteDateSpecCart = setTimeout(function() {
//            if (!jQuery(shop).val().match(/^[0-9]+$/)) {
//                return true;
//            }
            jQuery.get('../js/destajax.aspx', {
                shop: jQuery(shop).val(),
                lp_goods: lp_goods,
                cart_fg: 1,
                charset: 'shift_jis'
            }, function(data, status) {
                var val = jQuery('select[name=date_detail_spec] :selected').val();
                jQuery('select[name=date_detail_spec]').children().remove();
                jQuery('select[name=date_detail_spec]').html(data);
                jQuery('select[name=date_detail_spec]').val(val);
                if (jQuery('select[name=date_detail_spec] :selected').text() == '') {
                    jQuery('select[name=date_detail_spec] option:first').prop('selected', true);
                }
            }, 'html');
        }, timerOffset);
    }; 

}
var ecUtil = new _ecUtil();