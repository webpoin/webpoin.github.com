

// search
// http://search.library.sh.cn/jiapu/search.cgi?index=H&expr=1&dbPath=lswx&database=jp&searchtype=basic

// return 302
// http://search.library.sh.cn/jiapu/display.cgi?dbPath=lswx&database=jp&hsfn=20150729\jp_20150729000807_a37d769d_1_0

// article
// http://search.library.sh.cn/jiapu/display.cgi?&dbPath=lswx&database=jp&hsfn=20150728\jp_20150729000807_a37d769d_1_0&fpage=0&ppage=0&cpage=1&npage=2&lpage=499&record=1&checkType=p2r



var ajax = function(url,callback){
	var http = new XMLHttpRequest();
	http.open("get", url, true); 
	http.onreadystatechange = function(){
		if (http.readyState == 4 && http.status == 200) { callback && callback(http)}  
	}; 
	http.send(null);  
}

var content = document.createElement('div');
	content.style.display = 'none';
document.body.appendChild(content);

var search = function(idx,max){
	max = max || idx;
	var url = 'http://search.library.sh.cn/jiapu/search.cgi?index=H&expr='+idx+'&dbPath=lswx&database=jp&searchtype=basic';
	if(idx>max) {alert('finish,last index is : '+(idx-1));return;};
	
	ajax(url,function(res){
		var url2 = res.responseURL;

		var html = res.responseText;
		var length = html.match(/<center>[\w\W]*?<\/center>/gi);
		// 筛选出结果集，异步采集数据
		var back = function(res){

			var table = res.responseText.match(/<table[\w\W]*?<\/table>/gi)[2] || '';
			table = table.replace(/(\<\w*?)\s[\w\W]*?\>/gi,'$1>').replace(/\<font\>/,'');
			content.innerHTML = content.innerHTML + table;

			back++;
			if(back<length) return;
			search(++idx,max);
		}

		length = length? length[0].match(/\d+/) : 0;
		length==0 && search(++idx,max);

		for(var i=1;i<=length;i++){
			ajax(url2+'&fpage=0&ppage=0&cpage=1&npage=2&lpage=499&record='+i+'&checkType=p2r',back);
		}
	});
}

search(1,3);

