
$(function(){


    var tpl = '<li class="{type}"><a href="{link}"></a><img src="{picture}" width="180" height="120"><h3>{title}</h3><p>{article}</p></li>'
    var tagbox =  $('.indexlist');
    var indexlist = tagbox.find('cite')
    var indexarticle = $('.index_article');


    



    // 标题滚动
    new IScroll('#indextle', {
        tap: true,
        scrollX: true,
        scrollY: false,
        preventDefaultException: {tagName: /^(A)$/}
    });

    indexarticle.append('<div class="index_article_body"/>');
    indexarticle.scroll = new IScroll('.index_article', {
        tap: true,
        scrollX: false,
        scrollY: true,
        preventDefaultException: {tagName: /^(A)$/}
    });
    indexarticle.append('<span>正在加载，点击返回</span>');



    var update = function(item){

        $.ajax({ 
            type:'get', 
            dataType:'json', 
            url: item.getAttribute('url'), 
            data:{count:item.count},
            beforeSend:function(){}, 
            success:function(json){
                var $this = $(item);
                for(var i=0,data,l=json.length;i<l;i++){
                    data = json[i];
                    $this.find('ul').append(tpl.replace(/\{(\w*?)\}/gi,function(s,str){return data[str];}));
                }
                item.scroll.refresh();
            }
        });

    }


    indexlist.each(function(){
        var that = this;
        update(this);
        this.scroll =  new IScroll(this, {
            tap: true,
            scrollX: false,
            scrollY: true,
            preventDefaultException: {tagName: /^(A)$/}
        });
        this.scroll.on('scrollEnd',function(){
            update(that);
        });
        this.scroll.on('click',function(){
            alert('sfesf');
        })
    });


    // 切换
    $(document).on('click','.indextle li',function(){
        var $this = $(this);
        var idx = $this.parent().find('li').not('.indextle_link').index($this);

        if($this.is('.indextle_link')) return;
        $this.addClass('on').siblings('li').removeClass('on');



        tagbox.animate({'left':-indexlist.eq(idx).position().left},200);

        return false;
    }).on('click','.indexlist a',function(){

        indexarticle.addClass('loading').show();

        // 文章点击事件
        var url = this.getAttribute('href') || location.href; 
        $.ajax({ 
            type:'get', 
            dataType:'text', 
            url: url,
            success:function(text){
                if(indexarticle.get(0).disable) {
                    indexarticle.get(0).disable = false;
                    return false;   
                }

                indexarticle.removeClass('loading').find('.index_article_body').html(text);
                indexarticle.scroll.refresh();

                $this = null;
            }
        });
        return false;

    }).on('click','.loading span',function(){
        // 取消加载

        $(this).closest('.index_article').hide().get(0).disable = true;


    }).on('click','.index_article .header-back',function(){
        indexarticle.hide();
        return false;
    });

})


