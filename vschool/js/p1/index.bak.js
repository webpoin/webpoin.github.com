(function(){
    /*导航条滑动初始化*/
    var n = $('.line li').size();

    $('.line').width($('.line li:first').outerWidth(true) * n)

    var tabsSwiper = new Swiper('.swiper-container',{
      onlyExternal : true,
      speed:500
    });

    $(".line a").bind('tap',function(e){
      e.preventDefault()
      $('#nav').find('.on').removeClass('on');
      $(this).parent().addClass('on');

      $("#nav .line .active").removeClass('active')
      $(this).addClass('active')
      tabsSwiper.swipeTo( $(this).parent().index() )
    })
    $(".line a").click(function(e){
      e.preventDefault()
    })

    new IScroll('#nav', {
        tap: true,
        scrollX: true,
        scrollY: false,
        preventDefaultException: {
            tagName: /^(A)$/
        }
    });

    $('.content').height($('.index-main').height());

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
            }, 1000);
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
    /*模拟滚动初始化*/
    loaded();

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
    }, 1000);
})();