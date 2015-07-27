

	var dom = document.getElementById('picbox');
	var upd = document.getElementById('update');
	var hover = document.getElementById('hover');	
	var moy = document.getElementById('money');
	var moyall = document.getElementById('moneyall');
	var msg = document.getElementById('hotmsg');
	var updmsg = document.getElementById('updmsg');

	var bkg = document.getElementById('bkg').getContext("2d"); //背景
	var ctx = document.getElementById('ctx').getContext("2d"); //色块
	var loc = document.getElementById('loc').getContext("2d"); //轨迹
	var hot = document.getElementById('hot').getContext("2d"); //移动上去

	var center = {x:320,y:400};
	var size = 20;
	var sina = 0.8660254;


	var level = {son:0,git:0,oth:0};


	// 整理后的数据（合成一个数组，层级越高越前）
	var arrs = (function(date,mid){
		var lev = 0,res = [],son = [],git = [];


		var rec = function(d,p){
			lev ++;
			for (var i=0,l=d.length;i<l;i++) {
				if (d[i].mid == p) {

					if(lev==1){
						son.push(i);
					}else{
						git.push(i);
					}
					arguments.callee(d,d[i].id);
				}
			}
			lev --;
		}

		for (var i in date) {
			if (date[i].mid == mid) {
				rec(date,date[i].id);
				level.son += 1;
				level.git += son.length;
				level.oth += git.length;
				res.push([i].concat(son).concat(git) );
				lev = 0;
				son.length = 0;
				git.length = 0;
			}
		}


		return res;
	})(date,self.id);





	// 计算位置
	var barr = (function(arrs){
		var res = [];
		var color = ['#fc4d7a','#eaed18','#8f8ff1','#f8ac4a','#96b844','#18d1ed']; //颜色值


		// 根据角度，原点，取目标点
		var getpoin = function(r,x,y){
			return [Math.cos(r)*x-Math.sin(r)*y+ center.x,Math.sin(r)*x+Math.cos(r)*y+center.y];
		}

		for(var m,n,p,k,son,span,posa,i=0;i<6;i++){
			for(k=0;k<36;k++){
				m = (function(v,n){return (Math.pow(n,2)+n)>2*v?n:arguments.callee(v,n+1);})(k,1); //当前排数=当前排有的个数
				n = k-(Math.pow(m,2)-m)/2; //多出来的总个数
				posa = getpoin(i*60*0.017453293,(2*m - n%m)*sina*size,1.5*(n%m)*size); // 计算后的点

				if(i<arrs.length && k<arrs[i].length){
					p =  date[arrs[i][k]];
					p.posa = posa;
					p.color = color[i];
					p.logo = host+p.logo;

					span = document.createElement('span');
					span.style.left = p.posa[0]-15+'px';
					span.style.top = p.posa[1]-15+'px';
					span.innerHTML = '<img src="'+p.logo+'" style="border-color:'+p.color+'">';
					span.poin = p;
					dom.appendChild(span);
				}

				// 不足六个加默认
				if( k===0 && i>=arrs.length){
					arrs.push([date.push({id:-1,color:'#ddd',posa:posa,logo:'test.gif'})-1]);
				}

				// 背景
				res.push(posa.concat(color[5-i]));
				// res.push(posa.concat('#cccccc'));
			}



		}

		// 把自身加入到数组中
		self.posa = [center.x,center.y];
		date.push(self);

		return res;
	})(arrs);



	// 绘图
	$(function(){


		// 动画引擎
		var anim = (function(obj){
			var loop = [];
			var timer = false;


			var func =function(){
				loc.clearRect(0,0,10000,10000);
				// ctx.clearRect(0,0,10000,10000);
				for(var each,i=0;i<loop.length;i++){
					
					each = loop[i];
					each.idx ++;
					if(each.idx <each.over){
						each.anim(each.idx/each.over);
					}else{
						loop.splice(i,1);
						each.end && each.end(1);
						i--;
					}
				}
				if(loop.length>0){
					timer = setTimeout(arguments.callee,10);
				}else{
					timer = false;
				}
			}

			return function(obj){
				obj.idx = 0;
				loop.push(obj);
				if(!timer){timer = setTimeout(func,10);}
			}

		})();

		// 动画引擎原料加工
		var getAnimObj = function(p){
			this.over = 100;
			this.x = p.posa[0];
			this.y = p.posa[1];
			this.s1 = size - 3;
			this.s2 = size - 6;
			this.p = p;
			// this.idxall ++;
			anim(this);
		}
		getAnimObj.prototype.idxall = 0;
		getAnimObj.prototype.anim = function(idx){

			ctx.clearRect(this.x-sina*this.s1,this.y-this.s1,2*sina*this.s1,2*this.s1);
			


			// 填充渐变
			ctx.beginPath();
			ctx.moveTo(this.x,this.y+this.s2);
			ctx.lineTo(this.x-sina*this.s2,this.y+0.5*this.s2);
			ctx.lineTo(this.x-sina*this.s2,this.y-0.5*this.s2);
			ctx.lineTo(this.x,this.y-this.s2);
			ctx.lineTo(this.x+sina*this.s2,this.y-0.5*this.s2);
			ctx.lineTo(this.x+sina*this.s2,this.y+0.5*this.s2);
			ctx.closePath();
			ctx.fillStyle= this.p.color;
			ctx.globalAlpha = idx;
			ctx.fill();


		}


	
		// 箭头
		var updateToParent = function(item,money){

			



			var parent = (function(the){for(var i=0,l=date.length;i<l;i++){if(date[i].id === the.mid){return date[i];}}})(item);
			if(!parent) return;
			// if(!money || money<=0) return;


			var self = item.posa; //自身
			var pare = parent.posa; //父级
			var l = Math.sqrt(Math.pow(self[0]-pare[0],2)+Math.pow(self[1]-pare[1],2));
			var k = 5; //角度常数

			var span = document.createElement('span');
			span.style.left = item.posa[0] +'px';
			span.style.top = item.posa[1] -30 +'px';
			upd.appendChild(span);

			if(money){
				
				span.innerHTML = money>0? '<b>+' + money +'</b>':'';
			
				// 动态数据
				moy.innerHTML = Math.round((parseFloat(moy.innerHTML ||0)+money)*100)/100 ;
				moyall.innerHTML = Math.round((parseFloat(moyall.innerHTML ||0)+money)*100)/100 ;
				updmsg.innerHTML ='<h2><img src="'+item.logo+'"/>'+item.storename+'</h2><p>代理等级：一级代理</p><p>分润比例：'+item.proportion+'</p><p>可获分润：<b style="font-size:16px;color:#f00">'+money+'</b>元</p>';
			}
			
			
			this.span = span;
			this.l = l;
			this.over = 100;
			this.parent = parent;
			this.item = item;
			this.poin = {
				// 箭头弧度
				xr:(pare[0]+self[0])*0.5+(pare[1]-self[1])/l*10,
				yr:(pare[1]+self[1])*0.5-(pare[0]-self[0])/l*10,

				// 箭头尾部1
				xa:self[0] + (self[1]-pare[1])*k/l,
				ya:self[1] - (self[0]-pare[0])*k/l,
				// 箭头尾部2
				xb:self[0] - (self[1]-pare[1])*k/l,
				yb:self[1] + (self[0]-pare[0])*k/l,
				// 箭头尾部凹部
				xk:self[0] - (self[0]-pare[0])*k/l,
				yk:self[1] - (self[1]-pare[1])*k/l,
				// 顶部加粗
				xm:pare[0] + (pare[1]-self[1])*0.5/l,
				ym:pare[1] - (pare[0]-self[0])*0.5/l
			}

			// 启动动画 
			anim(this);
		}

		updateToParent.prototype.anim = function(idx){
			var x = idx*2-0.5;
			var pare = this.parent.posa;
			var self = this.item.posa;
			var poin = this.poin;
			var span = this.span;


			if(idx<0.2){
				span.style.fontSize = idx*this.over/2+10 +'px';
				span.style.marginTop = -idx*this.over +'px';
			}else if(idx==0.9){
				span.style.display = 'none';
				span.parentNode.removeChild(span);
			}

			if(idx === 0.5){
				this.end(parent,1);
				this.end = function(){}
			}


			// var bgn = loc.createRadialGradient(self[0],self[1],0,self[0],self[1],size*idx);
			// var bgn_data = ctx.getImageData(self[0],self[1],1,1).data;
			// bgn.addColorStop(0,'rgba('+[bgn_data[0],bgn_data[1],bgn_data[2],bgn_data[3]].join(',')+')');
			// bgn.addColorStop(1,'rgba('+[bgn_data[0],bgn_data[1],bgn_data[2],bgn_data[3]].join(',')+')');



			var start = loc.createRadialGradient(self[0],self[1],0,self[0],self[1],size*(1-idx));
			start.addColorStop(0,"red");
			start.addColorStop(1,'rgba(255,0,0,0)');

			// var d = ctx.getImageData(self[0],self[1],1,1).data;
			// start.addColorStop(0,'rgba('+[253-d[0],253-d[1],253-d[2],253-d[3]].join(',')+')');
			// start.addColorStop(1,'rgba('+[253-d[0],253-d[1],253-d[2]].join(',')+',0)');
			
			

			var over=loc.createRadialGradient(pare[0],pare[1],0,pare[0],pare[1],size*idx);
			over.addColorStop(0,"red");
			over.addColorStop(1,'rgba(255,0,0,0)');


			var grd = loc.createRadialGradient((pare[0]-self[0])*x+self[0],(pare[1]-self[1])*x+self[1],0,(self[0]+pare[0])/2,(self[1]+pare[1])/2,this.l/2);
			grd.addColorStop(0,"#ff0");
			grd.addColorStop(1,'rgba(255,0,0,0.3)');

			
			loc.strokeStyle = '#f00';
			loc.shadowColor = "#666";
			loc.shadowOffsetX = 0;
			loc.shadowOffsetY = 0;
			loc.shadowBlur = 5;

		
			loc.beginPath();
			loc.fillStyle=start;
			loc.arc(self[0],self[1],sina*(size-8),0,2*Math.PI);
			loc.fill();

			loc.beginPath();
			loc.fillStyle=over;
			loc.arc(pare[0],pare[1],sina*(size-8),0,2*Math.PI);
			loc.fill();


			loc.beginPath();
			loc.fillStyle=grd;
			loc.moveTo(pare[0],pare[1]);
			loc.quadraticCurveTo(poin.xr,poin.yr,poin.xa,poin.ya);
			loc.lineTo(poin.xk,poin.yk);
			loc.lineTo(poin.xb,poin.yb);
			loc.quadraticCurveTo(poin.xr,poin.yr,poin.xm,poin.ym);
			loc.closePath();
			loc.fill();
		}

		updateToParent.prototype.end = function(){
		 	new updateToParent(this.parent);
		}



		// 背景
		bkg.lineWidth="1";
		bkg.strokeStyle="#aaa";

		for(var p,s,x,y,i=0,l=barr.length;i<l;i++){
			p = barr[i];
			x = p[0];
			y = p[1];
			s = p[2].split('');

			// bkg.fillStyle= 'rgba('+[parseInt(s[1]+s[2],16),parseInt(s[3]+s[4],16),parseInt(s[5]+s[6],16),'.1'].join(',')+')';
			bkg.fillStyle = '#fefefe'; 
			bkg.beginPath();
			bkg.moveTo(x,y+size);
			bkg.lineTo(x-sina*size,y+0.5*size);
			bkg.lineTo(x-sina*size,y-0.5*size);
			bkg.lineTo(x,y-size);
			bkg.lineTo(x+sina*size,y-0.5*size);
			bkg.lineTo(x+sina*size,y+0.5*size);
			bkg.closePath();
			bkg.stroke();
			bkg.fill();
			// console.log(p[2])
		}

		// 画boss 
		(function(){
			bkg.fillStyle="#f00";
			x = center.x;
			y = center.y;
			bkg.beginPath();
			bkg.moveTo(x,y+size);
			bkg.lineTo(x-sina*size,y+0.5*size);
			bkg.lineTo(x-sina*size,y-0.5*size);
			bkg.lineTo(x,y-size);
			bkg.lineTo(x+sina*size,y-0.5*size);
			bkg.lineTo(x+sina*size,y+0.5*size);
			bkg.closePath();
			bkg.fill();
		})();



		// 动画加载
		for(var p,x,y,i=0,l=arrs.length;i<l;i++){
			(function(arr,idx){
				var self = arguments.callee;
				new getAnimObj(date[arr[idx]]);
				if(idx<arr.length-1){
					setTimeout(function(){self(arr,idx+1);},100);
				}
			})(arrs[i],0);
		}

	
		// 定时更新
		// 如果没发展成员，不刷新
		if(level.son > 0){
			updmsg.style.display = 'block';
			(function(){

				// $.getJSON(update_link,function(json){

					json = [{"data":[{"proportion":"0.5","id":"170","record":"1.5","logo":"http://union.anzimall.com/data/merchants_logo/33/27d755fe00001cc0.jpg","storename":"牛当家旗舰店","rating":"一级"},{"proportion":"0.3","id":"143","record":"12","logo":"http://union.anzimall.com/data/merchants_updatelogo/143/51c7778c0000190a.png","storename":"米兰新娘","rating":"二级"},{"proportion":"0.2","id":"156","record":"5","logo":"http://union.anzimall.com/data/merchants_updatelogo/156/51c7778c00000f0a.png","storename":"万达集团","rating":"三级"},{"proportion":"0.3","id":"148","record":"50","logo":"http://union.anzimall.com/data/merchants_updatelogo/148/51c7778c00001c0a.png","storename":"兰州拉面","rating":"二级"},{"proportion":"0.5","id":"148","record":"100","logo":"http://union.anzimall.com/data/merchants_updatelogo/148/51c7778c00001c0a.png","storename":"兰州拉面","rating":"一级"},{"proportion":"0.3","id":"170","record":"51","logo":"http://union.anzimall.com/data/merchants_logo/33/27d755fe00001cc0.jpg","storename":"牛当家旗舰店","rating":"二级"},{}]},319.5];


					if(!json) return;
					var data = json[0].data;
					for(var item,i=0,l=data.length;i<l;i++){
						item = data[i];
						item.id && new updateToParent(item);
					}
					
				// });


				var random = date[Math.floor(Math.random()*(level.son+level.git+level.oth))];
				var addto = Math.round(Math.random()*10)/100;

				console.log(level.son+level.git+level.oth)

				random && new updateToParent(random,addto);
				setTimeout(arguments.callee,1000);
			})();

		}
		
	});



	// 计算蜂窝级别
	document.getElementById('level_son').innerHTML = level.son<6? level.son+'人(<font color="green">未满</font>)':'6人(<font color="#08c">满额</font>)';
	document.getElementById('level_git').innerHTML = level.git<36? level.git+'人':'36人(<font color="#08c">满额</font>)';
	document.getElementById('level_oth').innerHTML = level.oth<216? level.oth+'人':'216人(<font color="#f00">恭喜您蜂巢全满！</font>)';




	// 移动有描述
	$('#picbox').on('mouseenter','span',function(){
		var poin = this.poin;
		var idx = 0;

		var x = poin.posa[0];
		var y = poin.posa[1];
		var s3 = size+8;
		var s4 = size+2;

		hot.fillStyle= poin.color;
		hot.lineWidth = 2;
		hot.strokeStyle = '#f00';
		hot.shadowColor = "#666";
		hot.shadowOffsetX = 0;
		hot.shadowOffsetY = 0;
		hot.shadowBlur = 5;
		hot.clearRect(0,0,10000,10000);

		hover.innerHTML = '';
		for(var i=0,x1,y1,ed,l=date.length;i<l;i++){
			if(date[i].mid !== poin.id) continue;

			ed=(function(r,x,y){return [Math.cos(r)*x-Math.sin(r)*y,Math.sin(r)*x+Math.cos(r)*y];})(idx*60*0.017453293,0.8660254*2*s3-2,0);
			x1 = ed[0]+x;
			y1 = ed[1]+y;
			hot.beginPath();
			hot.moveTo(x1,y1+s4);
			hot.lineTo(x1-sina*s4,y1+0.5*s4);
			hot.lineTo(x1-sina*s4,y1-0.5*s4);
			hot.lineTo(x1,y1-s4);
			hot.lineTo(x1+sina*s4,y1-0.5*s4);
			hot.lineTo(x1+sina*s4,y1+0.5*s4);
			hot.closePath();
			hot.fill();
			hover.innerHTML += '<img src="'+date[i].logo+'" style="left:'+(x1-10)+'px;top:'+(y1-10)+'px;">';

			idx ++;
		}


		// 填充渐变
		hot.beginPath();
		hot.moveTo(x,y+s3);
		hot.lineTo(x-sina*s3,y+0.5*s3);
		hot.lineTo(x-sina*s3,y-0.5*s3);
		hot.lineTo(x,y-s3);
		hot.lineTo(x+sina*s3,y-0.5*s3);
		hot.lineTo(x+sina*s3,y+0.5*s3);
		hot.closePath();
		// ctx.stroke();
		hot.fill();
		msg.innerHTML = '<h2><img src="'+poin.logo+'"/>'+poin.storename+'</h2><p>代理商数：12589人 </p><p>下级代理：6人</p><p>次级代理：62人</p><p>本月消费：<font color="#08c">125489.00</font>元</p><p>你代理等级：一级代理</p><p>分润比例：1%</p>';
		msg.style.display = 'block';
	}).on('mouseleave','span',function(){
		hot.clearRect(0,0,10000,10000);
		msg.style.display = 'none';
	});