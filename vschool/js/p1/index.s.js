function abc() {
    /*导航条滑动初始化*/
    var n = $('.line li').size();
    $('.line').width($('.line li:first').outerWidth(true) * n)
    $('#nav .line a').bind('tap', function(e) {
        $('#nav').find('.on').removeClass('on');
        $(this).parent().addClass('on');
    });

    new IScroll('#nav', {
        tap: true,
        scrollX: true,
        scrollY: false,
        preventDefaultException: {
            tagName: /^(A)$/
        }
    });

    var tabsSwiper = new Swiper('.swiper-container', {
        onlyExternal: true,
        speed: 500
    })
    $(".line a").bind('tap', function(e) {
        e.preventDefault()
        $(".line .active").removeClass('active')
        $(this).addClass('active')
        tabsSwiper.swipeTo($(this).parent().index())
    })
    $(".line a").click(function(e) {
        e.preventDefault()
    });
    $('.content').height($('.index-main').height());
    ManageAction.InitTouchSlide();
}



var ManageAction = {
    ViewImgInfo: {
        scr: "",
        title: "",
        remark: ""
    },
    ListData: [],
    InitData: function() {
        ManageAction.IntiNav();
    },
    DataWrap: "",
    TabWrap: "",
    Swiperwrapper: "",
    Tabs: [{
        tabname: "tab1",
        text: "头条",
        selected: true
    }, {
        tabname: "tab2",
        text: "热点"
    }, {
        tabname: "tab3",
        text: "排行"
    }, {
        tabname: "tab4",
        text: "兴趣"
    }, {
        tabname: "tab5",
        text: "微商"
    }, {
        tabname: "tab6",
        text: "体育"
    }, {
        tabname: "tab7",
        text: "财经"
    }],
    IntiNav: function(options) {
        ManageAction.TabWrap = $(".line");
        ManageAction.Swiperwrapper = $(".swiper-wrapper");
        var str = ' <div class="tag swiper-slide">';
        str += '    <ul>';
        str += '      <div class="content clearfix" style="height: 100%;position: relative;overflow: hidden;">';
        str += '        <div class="content-scroller">';
        str += '            <div id="pullDown">';
        str += '                      <span class="pullDownLabel">下拉刷新</span>';
        str += '             </div>';
        str += '             <div class="datawrap">';
        str += '             </div>';
        str += '            <div id="pullUp">';
        str += '               <i class="pullUpIcon"></i>';
        str += '               <span class="pullUpLabel">上拉显示更多</span>';
        str += '           </div>';
        str += '            </div>';
        str += '       </div>';
        str += '      </ul>';
        str += '  </div>';
        var wrap = "";
        var scrollWrap = "";
        for (var i = 0; i < ManageAction.Tabs.length; i++) {
            var tab = ManageAction.Tabs[i];
            var liClass = tab.selected ? "on" : "";
            var li = $('<li class="' + liClass + '"><a tabname=' + tab.tabname + ' href="###">' + tab.text + '</a></li>');
            ManageAction.TabWrap.append(li);
            var tabContent = $(str);
            tabContent.appendTo(ManageAction.Swiperwrapper);
            ManageAction.datawrap = tabContent.find(".datawrap");
            scrollWrap = tabContent.find(".content");
            ManageAction.datawrap.html(tab.text);
            // ManageAction.InitTabData(ManageAction.datawrap);
            // if (i == 0) {
            wrap = ManageAction.datawrap;
            ManageAction.InitTabData(wrap);
            // scrollWrap.scroll();

            // } else {

            //     tabContent.find("#pullDown").remove();
            //     tabContent.find("#pullUp").remove();
            // }
        };
        var scrollWrap = ManageAction.Swiperwrapper.find(".content");
        var obj = $(scrollWrap);
        obj.scroll();

    },

    InitTabData: function(idatawrap) {
        ManageAction.getData();
        var listData = ManageAction.ListData;
        var dataWrap = idatawrap;
        dataWrap.empty();
        var sb = "";
        var bannerHtml = '';
        bannerHtml += ' <div class="banner_slides" id="banner_slides">';
        bannerHtml += '        <ul class="banner_slideContainer">';
        for (var i = 0; i < 4; i++) {
            bannerHtml += '         <li>';
            var item = listData[i];
            bannerHtml += '         <a href="#"><img src="' + item.src + '" width="100%" height="auto" /> </a>';
            bannerHtml += '        </li>';
        };
        bannerHtml += '       </ul>';
        bannerHtml += '     <div class="bannerSlide_foncus"></div>';
        bannerHtml += '  </div> ';
        var pl_list = '<div class="p1-list">';
        var ListLength = listData.length;
        if (ListLength > 0) {
            sb += bannerHtml;
        }

        if (ListLength > 4) {
            pl_list += ManageAction.getRowHtml(listData[4])
        }
        var rowshtml = '';
        rowshtml += '  <div class="p2 clearfix">';
        rowshtml += '     <div class="p2_con">';
        rowshtml += '         <a href=" #">';
        rowshtml += '             <h1>' + listData[5].title + '</h1>';
        rowshtml += '          </a>';
        rowshtml += '          <ul>';
        rowshtml += '             <li style="margin-right:5px;"><img src="' + listData[5].src + '" width="180" height="120" /></li>';
        rowshtml += '             <li style="margin-right:5px;"><img src="' + listData[6].src + '" width="180" height="120" /></li>';
        rowshtml += '             <li><img src="' + listData[7].src + '" width="180" height="120" /></li>';
        rowshtml += '           </ul>';
        rowshtml += '       </div>';
        rowshtml += '   </div>';
        pl_list += rowshtml;
        for (var i = 8; i < ListLength; i++) {
            pl_list += ManageAction.getRowHtml(listData[i]);
        };
        pl_list += '</div>';
        sb += pl_list;
        dataWrap.append(sb);
    },
    getData: function() {
        ManageAction.ListData = [];
        for (var i = 0; i < 10; i++) {
            var obj = new Object();
            obj.src = "img/banner0" + (0 + 1) + ".jpg";
            obj.title = "用读稿，我问你答！";
            obj.remark = '当一位代表刚准备"照本宣科"时，李克强还提醒道："为了节省一点时间，不用念稿子，我问你回答"。';
            ManageAction.ListData.push(obj);
        };
    },
    getRowHtml: function(row) {
        var str = '';
        str += '        <div class="p1 clearfix">';
        str += '            <div class="p1_con">';
        str += '                <a href="#">';
        str += '                    <div class="p1_conl"><img src="' + row.src + '" width="180" height="120" /></div>';
        str += '                    <div class="p1_conr">';
        str += '                        <h1>' + row.title + '</h1>';
        str += '                        <p>' + row.remark + '</p>';
        str += '                    </div>';
        str += '                </a>';
        str += '            </div>';
        str += '        </div>';
        return str;
    },
    InitTouchSlide: function() {
        window.setTimeout(function() {
            TouchSlide({
                slideCell: "#banner_slides",
                titCell: '.bannerSlide_foncus',
                mainCell: '.banner_slideContainer',
                autoPage: '<span></span>',
                effect: 'leftLoop',
                delayTime: 600,
                interTime: 5000,
                autoPlay: true,
                titOnClassName: 'active'
                    // ,
                    // endFun: function(obj) {
                    //     Sys.UI.SubmitButLoading.show();
                    //     window.setTimeout(function() {
                    //         Sys.UI.SubmitButLoading.hide();
                    //     }, 3000);
                    // }
            });
        }, 1000)
    }
}
var MyScroll = {
    Init: function() {
        var myScroll;
        var pullDownEl, pullDownL;
        var pullUpEl, pullUpL;
        var pullUpOffset, pullDownOffset;
        var Downcount = 0,
            Upcount = 0;
        var loadingStep = 0; //加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新
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
                $('.p1:lt(3)').clone().appendTo('.p1-list');

                pullUpEl.removeClass('loading');
                pullUpL.html('上拉显示更多');
                pullUpEl['class'] = pullUpEl.attr('class');
                myScroll.refresh();
                loadingStep = 0;
            }, 2000);
        }

        function loaded() {
            pullDownEl = $('#pullDown');
            pullDownL = pullDownEl.find('.pullDownLabel');
            pullDownEl['class'] = pullDownEl.attr('class');
            pullDownEl.attr('class', '').hide();

            pullUpEl = $('#pullUp');
            pullUpL = pullUpEl.find('.pullUpLabel');
            pullUpEl['class'] = pullUpEl.attr('class');
            pullUpEl.attr('class', '');
            pullUpOffset = pullUpEl[0].offsetHeight;

            myScroll = new IScroll('.content', {
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
        loaded();
        $(function() {
            window.setTimeout(function() {
                TouchSlide({
                    slideCell: "#banner_slides",
                    titCell: '.bannerSlide_foncus',
                    mainCell: '.banner_slideContainer',
                    autoPage: '<span></span>',
                    effect: 'leftLoop',
                    delayTime: 600,
                    interTime: 5000,
                    autoPlay: true,
                    titOnClassName: 'active'
                        // ,
                        // endFun: function(obj) {
                        //     Sys.UI.SubmitButLoading.show();
                        //     window.setTimeout(function() {
                        //         Sys.UI.SubmitButLoading.hide();
                        //     }, 3000);
                        // }
                });
            }, 10000)

        })
    }
}
