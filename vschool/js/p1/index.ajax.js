(function(){
    var pageAjax = null,
        listAjax = null,
        module = 'index',
        hasMoreData = true,
        pageLoading = false;

    var lastNavIndex = 0;

    /*导航条滑动初始化*/
    var n = $('.line li').size();

    $('.line').width($('.line li:first').outerWidth(true) * n);

    $('.line a').each(function(i, el){
        var mod = $(this).data('mod'),
            tpl = $('#page_tpl').html();

        $('#pages').append(tpl.replace('{id}', 'page_' + mod));
    })

    var tabsSwiper = new Swiper('.swiper-container',{
      onlyExternal : true,
      speed:500
    });

    $(".line a").bind('tap',function(e){
      e.preventDefault();

      if($(this).hasClass('active')) return;

      $('#nav').find('.on').removeClass('on');
      $(this).parent().addClass('on');

      $("#nav .line .active").removeClass('active')
      $(this).addClass('active')

      // todo 不刷新导航点击选中失效，目前无解
      globalNavScroll.refresh();

      var mod = $(this).data('mod');

      var direction = 'left',
          index = $(this).parent().index();

      direction = '';
      module = mod;
      hasMoreData = true;

      if(listAjax){
        listAjax.abort();
        listAjax = null;
      }else if(pageAjax){
        pageAjax.abort();
        pageAjax = null;
      }

      tabsSwiper.swipeTo( $(this).parent().index() );

      if(mod){
        switchPage(mod);
      }else{
        //switchPage($(this).attr('href'), true);
      }
      
    });

    var globalNavScroll = new IScroll('#nav', {
        tap: true,
        scrollX: true,
        scrollY: false,
        preventDefaultException: {
            tagName: /^(A|UL|LI)$/
        }
    });

    $('.line a:first').trigger('tap');

    /**
     * 加载页面内容
     * @param  {String} page   页面地址
     * @param  {Bollean} direct 为true则直接跳转页面地址
     * @return {[type]}        [description]
     */
    function switchPage(page, direct){
        var page = page;

        var view = $('#page_' + page);


        if(!view.data('inited')){
            if(pageAjax){
                pageAjax.abort();
                pageAjax = null;
            }
            //showLoading();
            pageLoading = true;
            pageAjax = $.get('data/' + page + '.json', {_time: new Date().getTime()}, function(data){
                var type = 'small';
                if(data){
                    var medias = '';
                    $.each(data, function(i, ele){
                        var type = ele.type || 'small',
                            tpl = $('#media_' + type).html();

                        medias += tpl.replace(/\{(\w*?)\}/gi,function(s,str){return ele[str];})
                    })
                    $('.swiper-slide-active').find('.page-content').html(medias).end()
                        .find('.page-load-helper').remove().end()
                        .find('#_downLine101').show().end()
                        .data('inited', true);

                }
            }).complete(function(e){
                hideLoading();
                pageLoading = false;
                pageAjax = null;
            }).error(function(e){
                var helper = $('.swiper-slide-active').find('.page-load-helper');

                if(!helper.find('.js-load-again').length){
                    helper.append('<a href="javascript:void(0);" class="js-load-again">重新加载</a>')
                }else{
                    helper.find('.js-load-again').text('重新加载')
                }
                
                alert('加载失败，请重试！');
            });

            return false;
        }
    }

    function showLoading(){
        $('#ajax-pop').show();
    }

    function hideLoading(){
        $('#ajax-pop').hide();
    }

    function appendData(data){
        var curPage = $('.swiper-slide-active');

        var html = '';
        $.each(data, function(i, ele){
            var type = ele.type || 'small',
                tpl = $('#media_' + type).html();

            html += tpl.replace(/\{(\w*?)\}/gi,function(s,str){return ele[str];});
        })
        curPage.find('.page-content').append(html);
    }

    function loadMore(view){
        if(hasMoreData){
            listAjax = $.get('./data/' + module + '.json', {mod: module, _time: new Date().getTime()}, function(html){
                if(html){
                    appendData(html);       
                }else{
                    hasMoreData = false;
                }
            }).complete(function(){
                listAjax = null;
            });
        }
    }

    var timer = null;

    $('.page-view').off().on('scroll', function(e){
        if(timer) {
            return;
        }

        var view = $(this);

        var stop = view.scrollTop(),
            h = view.height(),
            sh = view[0].scrollHeight;

        if((stop + h) > (sh - 100) ){
            if(pageLoading || listAjax) return;

            timer = setTimeout(function(){
                
                loadMore();

                clearTimeout(timer);
                timer = null;
            }, 80);
            
        }
    });



    // 点击查看文章详情
    $(document).on('click', '.js-article', function(e){
        e.preventDefault();
        var _this = $(this),
            articleId = _this.data('id'),
            title = '';

        if(!articleId) return;

        title = '文章详情';

        showArticle(articleId, title);
    }).on('click', '.js-load-again', function(e){
        e.preventDefault();
        $(this).text('加载中...')
        switchPage(module);
    });

    function showArticle(id, title){
        var articleContainer = $('#article-container'),
            articleView = articleContainer.find('.article-view'),
            articleBd = articleView.find('.article-bd');

        articleContainer.addClass('show');

        articleView.data('id', id).find('h1').text(title)
            .end().addClass('in')
            .find('.header-back').off('click')
            .on('click', function(e){
                if(articleContainer.data('xhr')){
                    articleContainer.data('xhr').abort();
                }
                articleView.removeClass('in');

                setTimeout(function(){
                    articleContainer.removeClass('show');
                }, 300)
            });

        var xhr = $.get('./wzxq2.html', {id: id}, function(data){
            articleBd.html(data);
        });

        articleContainer.data('xhr', xhr);
    }
})();