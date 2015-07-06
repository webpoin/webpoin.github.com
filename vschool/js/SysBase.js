var Sys = {};
Sys.Ajax = function(settings) {
    if (!settings) {
        settings = {};
    }
    var ajaxTimeOut = 18000;
    if (settings.loading)
        Sys.UI.SubmitButLoading.show(settings.loadMsg);
    if (settings.timeout)
        ajaxTimeOut = settings.timeout;
    if (settings.ElementById != undefined && settings.ElementById != "") {
        Sys.UI.LoadingById.show(settings.ElementById);
    }
    if (settings.timeout) {
        ajaxTimeOut = settings.timeout;
    }
    $.ajax({
        async: (settings.async == undefined ? true : settings.async),
        url: settings.url,
        type: (settings.type == undefined ? "post" : settings.type),
        data: settings.data,
        timeout: ajaxTimeOut,
        success: function(data) {
            if (settings.loading) {
                Sys.UI.SubmitButLoading.hide();
            }
            if (settings.ElementById != undefined && settings.ElementById != "") {
                Sys.UI.LoadingById.hide(settings.ElementById);
            }
            if (settings.success) {
                if (typeof data == "string") {
                    data = data.replace(/\n/gi, "<br/>");
                    try {
                        data = $.parseJSON(data);
                    } catch (e) {
                        data = eval("(" + data + ")");
                    }
                }
                settings.success(data);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if (settings.loading) {
                Sys.UI.SubmitButLoading.hide();
            }
            if (settings.ElementById != undefined && settings.ElementById != "") {
                Sys.UI.LoadingById.hide(settings.ElementById);
            }
            if (textStatus == "error" && (XMLHttpRequest.status == 0 || XMLHttpRequest.status == 12029)) {
                Sys.UI.errorBox("网络连接异常，请检查您的网络连接是否畅通！");
            } else if (textStatus == "timeout") {
                Sys.UI.errorBox("服务器处理超时，可能您目前的网络状况不好，请稍后重试！" + "<br/>url:" + settings.url + "<br/>timeout:" + ajaxTimeOut);
            } else if (typeof(settings.error) != 'undefined')
                settings.error(XMLHttpRequest, textStatus, errorThrown);
            else {
                switch (XMLHttpRequest.status) {
                    case 0:
                        break;
                    case 403.9:
                        Sys.UI.errorBox("当前访问的用户数过多！");
                        break;
                    case 404:
                        Sys.UI.errorBox("服务器端的处理程序不存在！");
                        break;
                    case 500:
                        Sys.UI.errorBox(XMLHttpRequest.responseText);
                        break;
                    case 12030:
                        break;
                    default:
                        alert(XMLHttpRequest.responseText);
                        break;
                }
            }
        },
        complete: function(XHR, TS) {
            XHR = null, TS = null
        }
    });
};
Sys.UI = {};
Sys.UI.SubmitButLoading = {
    loadMsg: "数据处理中",
    show: function(loadMsg) {
        var el = $("#mysubmitbut");
        var el_loadMsg = $("#loadMsg");
        if (el.length < 1) {
            var str = "<div style=\"display: block;z-index:99999;\" id=\"mysubmitbut\" class=\"window-mask\"></div>";
            var mask = $(str);
            var panel = $(document.body).append(mask);
            var loadMsg = loadMsg || Sys.UI.SubmitButLoading.loadMsg;
            if (loadMsg) {
                var msg = $("<div id=\"loadMsg\" class=\"window-mask-msg\" style=\"display:block;z-index:99999;\"></div>").html(loadMsg).appendTo(panel);
                msg.css("left", (panel.width() - msg.outerWidth()) / 2);
            }
        } else {
            el.show();
            el_loadMsg.show();
        }
    },
    hide: function() {
        $("#mysubmitbut").remove();
        $("#loadMsg").remove();
    }
};

Sys.UI.LoadingById = {
    msg: Sys.UI.SubmitButLoading.loadMsg,
    show: function(jq, loadMsg) {
        jq.children().hide();
        var el = jq.find("#mysubmitbut");
        var el_loadMsg = jq.find("#loadMsg");
        if (el.length < 1) {
            var str = "<div style=\"display: block;z-index:99999;\" id=\"mysubmitbut\" class=\"window-mask\"></div>";
            var panel = jq.append(str);
            var loadMsg = loadMsg || Sys.UI.SubmitButLoading.loadMsg;
            if (loadMsg) {
                var msg = $("<div id=\"loadMsg\" class=\"window-mask-msg\" style=\"display:block;z-index:99999;\"></div>").html(loadMsg).appendTo(panel);
                msg.css("left", (panel.width() - msg.outerWidth()) / 2);
            }
        } else {
            el.show();
            el_loadMsg.show();
        }
    },
    hide: function(jq) {
        jq.children().show();
        jq.find("#mysubmitbut").hide();
        jq.find("#loadMsg").hide();
    }
};
//警告提示框
Sys.UI.warningBox = function(msg, callback) {
        // alert(msg);
    }
    //错误提示框
Sys.UI.errorBox = function(msg, callback) {
    // alert(msg);
}
Sys.Form={};
Sys.Form.showError=function(obj,msg){
      if (!obj) return;
        var $obj = $(obj),
            objOffset = $obj.offset(),
            ol = objOffset.left,
            ot = objOffset.top,
            msg = msg || '出错啦!';

        $('.p3-alert-error').text(msg).css({
            left: ol + 80, // padding-left: 80
            top: ot - $('.p3-alert-error').outerHeight()
        }).show();
        setTimeout(function() {
            $('.p3-alert-error').hide();
        }, 3000);
}


function test() {
    Sys.UI.SubmitButLoading.show();
    window.setTimeout(function() {
        Sys.UI.SubmitButLoading.hide();
    }, 3000);
}

/*$(function() {
    test();
    Sys.UI.SubmitButLoading.show();
    window.setTimeout(function() {
        Sys.UI.SubmitButLoading.hide();
    }, 5000);
});*/

(function($) {
    $.fn.scroll = function(setting, param) {
        if (typeof setting == "string") {
            var mt = $.fn.scroll.methods[setting];
            if (mt) {
                return mt(this, param);
            }
        }
        setting = setting || {};
        return this.each(function() {
            var data = $.data(this, "scroll");
            if (data) {
                $.extend(data.options, setting);
            } else {
                data = $.data(this, "scroll", {
                    options: $.extend({}, $.fn.scroll.defaults, setting)
                });
                renderSlide(this);
            }
        });
    };
    $.fn.scroll.defaults = {
        pullDownAction: function(obj) {

        },
        pullUpAction: function(obj) {

        }
    };

    $.fn.scroll.methods = {
        options: function(obj) {
            return $.data(obj[0], "scroll").options;
        }
    };



    function renderSlide(obj) {
        var options = $.data(obj, "scroll").options;
        var dom = $(obj);
        var p1List = dom.find(".p1-list")
        var myScroll;
        var pullDownEl, pullDownL;
        var pullUpEl, pullUpL;
        var pullUpOffset, pullDownOffset;
        var Downcount = 0,
            Upcount = 0;
        var loadingStep = 0; //加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新

        pullDownEl = $('#pullDown', dom);
        pullDownL = pullDownEl.find('.pullDownLabel');
        pullDownEl['class'] = pullDownEl.attr('class');
        pullDownEl.attr('class', '').hide();
        pullUpEl = $('#pullUp', dom);
        pullUpL = pullUpEl.find('.pullUpLabel');
        pullUpEl['class'] = pullUpEl.attr('class');
        pullUpEl.attr('class', '');
        pullUpOffset = pullUpEl[0].offsetHeight;
        myScroll = new IScroll(obj, {
            probeType: 2, //probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
            bounce: true, //边界反弹  
            interactiveScrollbars: true, //滚动条可以拖动  
            shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
            click: true, // 允许点击事件  
            keyBindings: true, //允许使用按键控制  
            momentum: true // 允许有惯性滑动
        });
        //滚动时
        myScroll.on('scroll', function(e) {
            if (loadingStep == 0 && !pullDownEl.attr('class').match('flip|loading') && !pullUpEl.attr('class').match('flip|loading')) {
                if (this.y > 5 && !pullDownEl.hasClass('flip')) {
                    pullDownEl.attr('class', 'flip');
                    pullDownEl.find('.pullDownLabel')[0].innerHTML = '松手开始更新';
                    this.minScrollY = 0;
                } else if (this.y < 5 && pullDownEl.hasClass('flip')) {
                    pullDownEl.atrr('class', '');
                    pullDownEl.find('.pullDownLabel').innerHTML = '下拉刷新';
                    this.minScrollY = -pullDownOffset;
                } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.hasClass('flip')) {
                    pullUpEl.attr('class', 'flip');
                    pullUpEl.find('.pullUpLabel')[0].innerHTML = '松手开始更新';
                    this.maxScrollY = this.maxScrollY;
                    loadingStep = 1;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.hasClass('flip')) {
                    pullUpEl.attr('class', '');
                    pullUpEl.find('.pullUpLabel')[0].innerHTML = '上拉加载更多';
                    this.maxScrollY = pullUpOffset;
                }
            }
        });
        //滚动完毕
        myScroll.on('scrollEnd', function() {
            if (loadingStep == 1) {
                if (pullUpEl.attr('class').match('flip|loading')) {
                    pullUpEl.removeClass('flip').addClass('loading');
                    pullUpL.html('加载中...');
                    loadingStep = 2;
                    pullUpAction(dom);

                } else if (pullDownEl.attr('class').match('flip|loading')) {
                    pullDownEl.removeClass('flip').addClass('loading');
                    pullDownL.html('加载中...');
                    loadingStep = 2;
                    pullDownAction(dom);
                }
            }
        });

        function pullDownAction() { //下拉事件
                setTimeout(function() {
                    pullDownEl.removeClass('loading');
                    pullDownL.html('下拉显示更多');
                    pullDownEl['class'] = pullDownEl.attr('class');
                    pullDownEl.attr('class', '').hide();
                    myScroll.refresh();
                    loadingStep = 0;
                }, 1000); //1秒
            }
            // 上拉刷新执行的回调
        function pullUpAction() {
            setTimeout(function() {
                // 模拟填充数据
                var li = p1List;
                $('.p1:lt(2)').clone().appendTo(li);
                pullUpEl.removeClass('loading');
                pullUpL.html('上拉显示更多');
                pullUpEl['class'] = pullUpEl.attr('class');
                myScroll.refresh();
                loadingStep = 0;
            }, 2000);
        }

    }
})(jQuery);

/**
 * 注意结构：
 * <div class="g-scroll">
 *     <div class="content-scroll">
 *          <div class="g-scroll-down" id="pullDown" style="display: none;">
 *              <span class="pullDownLabel">下拉刷新</span>
 *          </div>
 *          <div>内容</div>
 *          <div class="g-scroll-up" id="pullUp" style="display: none;">
 *              <span class="pullUpLabel">上拉刷新</span>
 *          </div>
 *     </div>
 * </div>
 * 调用方法：
 * $(selector).gscroll(opt)
 * 
 * opt.up 上拉刷新执行的方法
 * opt.down 下拉刷新执行的方法
 *
 * 覆盖up 或者down 后 必须执行回调传回的after方法
 * 
 * @param  {[type]}
 * @return {[type]}
 */
$.fn.gscroll = function(opt){

    return this.each(function(){
        var _this = $(this);
        var opt = opt || {};
        var myScroll;
        var pullDownEl, pullDownL;
        var pullUpEl, pullUpL;
        var pullUpOffset, pullDownOffset;
        var Downcount = 0,
            Upcount = 0;
        var loadingStep = 0; //加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新

        opt.selector = opt.selector || '.content';

        var actionDefaults = {
            'down': function(after){
                setTimeout(function() {
                    after();
                }, 2000);
            },
            up: function(after){
                setTimeout(function() {
                    // 模拟填充数据
                    //$('.p1:lt(3)').clone().appendTo('.p1-list');

                    after();
                }, 2000);
            }
        };

        actionDefaults = $.extend({}, actionDefaults, opt, true);

        function pullDownAction() { //下拉事件
            actionDefaults['down'].call(_this, afterPullDownAction);
        }
            // 上拉刷新执行的回调
        function pullUpAction() {
            actionDefaults['up'].call(_this, afterPullUpAction);
        }
        function afterPullDownAction(){
            pullDownEl.removeClass('loading');
            pullDownL.html('下拉显示更多');
            pullDownEl['class'] = pullDownEl.attr('class');
            pullDownEl.attr('class', 'g-scroll-down').hide();
            myScroll.refresh();
            loadingStep = 0;
        }
        function afterPullUpAction(){
            pullUpEl.removeClass('loading');
            pullUpL.html('上拉显示更多');
            pullUpEl['class'] = pullUpEl.attr('class');
            myScroll.refresh();
            loadingStep = 0;
        }

        function init() {
            pullDownEl = _this.find('.g-scroll-down');
            pullDownL = pullDownEl.find('.pullDownLabel');
            pullDownEl['class'] = pullDownEl.attr('class');
            pullDownEl.attr('class', 'g-scroll-down').hide();

            pullUpEl = _this.find('.g-scroll-up');
            pullUpL = pullUpEl.find('.pullUpLabel');
            pullUpEl['class'] = pullUpEl.attr('class');
            pullUpEl.attr('class', 'g-scroll-up');
            pullUpOffset = pullUpEl[0].offsetHeight;

            myScroll = new IScroll(_this[0], {
                probeType: 2, //probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
                bounce: true, //边界反弹  
                interactiveScrollbars: true, //滚动条可以拖动  
                shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
                momentum: true // 允许有惯性滑动
            });
            //滚动时
            myScroll.on('scroll', function(e) {
                if (loadingStep == 0 && !pullDownEl.attr('class').match('flip|loading') && !pullUpEl.attr('class').match('flip|loading')) {
                    if (this.y > 5 && !pullDownEl.hasClass('flip')) {
                        pullDownEl.attr('class', 'g-scroll-down flip');
                        pullDownL[0].innerHTML = '松手开始更新';
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.hasClass('flip')) {
                        pullDownEl.atrr('class', 'g-scroll-down');
                        pullDownL[0].innerHTML = '下拉刷新';
                        this.minScrollY = -pullDownOffset;
                    } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.hasClass('flip')) {
                        pullUpEl.attr('class', 'g-scroll-up flip');
                        pullUpL[0].innerHTML = '松手开始更新';
                        this.maxScrollY = this.maxScrollY;
                        loadingStep = 1;
                    } else if (this.y > (this.maxScrollY + 5) && pullUpEl.hasClass('flip')) {
                        pullUpEl.attr('class', 'g-scroll-up');
                        pullUpL[0].innerHTML = '上拉加载更多';
                        this.maxScrollY = pullUpOffset;
                    }
                }
            });
            //滚动完毕
            myScroll.on('scrollEnd', function() {
                if (loadingStep == 1) {
                    if (pullUpEl.attr('class').match('flip|loading')) {
                        pullUpEl.removeClass('flip').addClass('loading');
                        pullUpL.html('加载中...');
                        loadingStep = 2;
                        pullUpAction();

                    } else if (pullDownEl.attr('class').match('flip|loading')) {
                        pullDownEl.removeClass('flip').addClass('loading');
                        pullDownL.html('加载中...');
                        loadingStep = 2;
                        pullDownAction();
                    }
                }
            });
        }

        init();

        _this.data('gscroll', myScroll);
    });
}
