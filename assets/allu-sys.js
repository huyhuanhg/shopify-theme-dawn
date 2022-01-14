// 名前空間を定義
var eclib = eclib || {};
eclib.sys = eclib.sys || {};

(function() {
    // ローカル用の名前空間
    var _sys = eclib.sys;

    /*!
     * JavaScriptが有効である場合、要素を非表示状態から表示状態（block）に変更します。
     */
    jQuery(document).ready(function() {
        jQuery(".js-creditcard-js-available").each(function() {
            jQuery(this).show();
        });
    });

    /*!
     * 現在のブラウザ判定による画面モードをHTMLタグのカスタムデータ属性 data-browse-mode から取得します。なお、値が S である場合のみスマートフォンと判定されます。
     */
    _sys.isModeSmartPhone = function() {
        return jQuery("html").data("browse-mode") == "S";
    };
    
     /*!
     * アプリケーションルートをmetaタグから読み取ります。
     */
     _sys.wwwroot = jQuery("meta[name='wwwroot']").attr('content');
     
})();