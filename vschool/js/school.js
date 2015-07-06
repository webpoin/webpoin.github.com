$(function () {

	// 初始化取5个数据 ,初始化
	var len = 1;

	// 计数器
	var cont = 0;

	// 显示差值（当查看到倒数第几个时，持行异步取数据）
	var differ = 3;

	// 页面宽度的一半
	var dom_half = $(document).width()/2;



	// 模板 标签 + 主体 
	var tpl_tle = '<span>{month}<b>{day}</b></span>';
	var tpl_cnt = '<li><a href="{link}"><h3>{title}</h3><h6><img src="img/school_look.png" alt="">阅读量:7352</h6><em><img src="{picture}" alt=""></em><p><span>{article}</span></p><h4>{author}</h4></li>';



	var box_tle = $('#school_tle');
	var box_cnt = $('#school_cnt');

	// 取下个数据
	var getArticle = function(callback){
		// 计数器累加
		cont += 1;

		$.getJSON('school.json',function(json){
            
        			// 这里有问题 QQ浏览器下 读的json.length 为 undefind
			for(var i=0,data,l=json.length;i<l;i++){
				data = json[i];
				box_tle.append(tpl_tle.replace(/\{(\w*?)\}/gi,function(s,str){return data[str];}));
				box_cnt.append(tpl_cnt.replace(/\{(\w*?)\}/gi,function(s,str){return data[str];}));
			}
			// 回调函数
			callback && callback();

		});
	}



	// 初始化
	// 第一个
	getArticle(function(){
		box_cnt.animate({'margin-left':'-=280'},300);
		box_tle.find('span').eq(0).addClass('on');
	});


	// 循环添加足够数量
	for(var i=cont;i<len;i++){
		getArticle();
	}

	// 绑定事件
    $('.school').swipe({
        swipe: function(e, direction){
            var list = box_tle.find('span');
            var old = list.filter('.on');
            var now = direction == 'left' ? old.next() : old.prev();

            if(now.length ===0) return ;


            // 标签显示动画
            old.removeClass('on');
            now.addClass('on');
            // 主体显示动画
            box_cnt.animate({'margin-left': direction == 'left' ? '-=280' : '+=280' },300);


            // 判断是否在中间部分显示
            var toleft = dom_half - now.position().left - 21;
            box_tle.animate({'margin-left': toleft>0? 0:toleft},300);


            // 当向右显示个数小于三的时候 异步调用数据
            if(list.length - list.index(now) < differ ){getArticle();}
        },
        excludedElements:"button, input, select, textarea, .noSwipe"
    })






});