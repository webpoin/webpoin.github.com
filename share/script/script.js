var share_box = $('.share_box');
var height = share_box.height();
var rocket = $('.rocket');
var turn = $('.share_turn').find('cite i');


var touch = function(e,direction){
	var scroll = share_box.scrollTop();
	scroll = direction == 'down' ? scroll - height:scroll;
	scroll = direction == 'up' ? scroll +height:scroll;
	scroll = scroll <0 ? 2*height:scroll;
	scroll = scroll >2*height? 0:scroll;



	if(scroll == 2*height){
		rocket.animate({'bottom':500,'opacity':0},1000,function(){
			share_box.animate({'scrollTop': scroll},500,function(){
				rocket.css({bottom:50,opacity:1});
				turn.css({left:0,top:0});
			});
			turn.css('transition','3s left, 3s top');
		});
		turn.css({left:-150,top:-150,transition:'none'});
	}else{
		share_box.animate({'scrollTop': scroll},500);
	}
}


share_box.swipe({
	swipe: touch,
	excludedElements: "button, input, select, textarea, .noSwipe"
});

$('.share_btn').on('click',function(e){
	touch(e,'up');
})

var wechat = $('.wechat_download');
$(document).on('click','a',function(){
	// 非微信关闭
	if( /(\id824001255)|(\.apk)$/.test(this.href) && navigator.userAgent.indexOf("MicroMessenger/")>-1){
		wechat.show();
		return false;
	}
}).on('click',function(){
	wechat.hide();
});







