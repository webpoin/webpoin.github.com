	
var data = data || {};

// 切换



require.config({
		paths: {
			echarts: './js/echarts-m/dist'
		}
	});
	require(
		[
			'echarts',
			'echarts/chart/line'
		],
		function(ec) {

			var getChartObj = function(obj){
				if(!obj) return;
				var text = obj.title || '';
				var data = obj.data || {};
				var color = obj.color || '#34b9be';
				var x,res={name:[],value:[]},point=[];

				for(x in data ){
					res.name.push(x);
					res.value.push(data[x]);
					point.push({name:x,value:data[x],xAxis:x,yAxis:data[x],symbol: 'rectangle',symbolSize:0, itemStyle:{normal:{color:'#666',fontSize:20,label:{position:'top',textStyle:{fontWeight:'normal',fontSize:10}}}}})
				}
				point.push({type: 'max',name: '最大值',zlevel:2});


				return {title: {
						text: text,
						textStyle: {
							fontSize: 14,
							color: color
						},
						subtext: '_______________________',
						subtextStyle: {
							color: '#bbb'
						},
						textAlign: 'center',
						y: 30,
						itemGap: -8
					},
					color: [color],
					calculable: false,
					xAxis: [{
						type: 'category',
						axisLine: {
							show:false,
							lineStyle: {
								color: '#ffba00',
								type: 'solid',
								width: 3
							}
						},
						boundaryGap:false,
						axisTick: {
							show: false
						},
						axisLabel: {
							margin: 10
						},
						data: res.name
					}],
					yAxis: [{
						type: 'value',
						splitNumber: 5,
						axisLabel: {
							formatter: ' '
						},
						axisLine: {
							lineStyle: {
								color: '#f2f2f2',
								width: '1'
							}
						}
					}],
					grid: {
						x:24,y: 90,x2:24,y2:30
					},
					series: [{
						name: '',
						type: 'line',
						color: '#34b9be',
						data: res.value,
						markPoint: {data:point,clickable:false,itemStyle:{color:'#f00'}}
					}]
				};

			}

			for(var i=0,l=data.length;i<l;i++){

				(function(item){

					var div = document.createElement('div');
					var option = getChartObj(item);
					var parent = item.forid ? document.getElementById(item.forid) : document.body;

					parent.appendChild(div);
					div.style.cssText = 'margin:0 12px 10px; height: 260px;border-bottom:3px solid #ffba00;';

					ec.init(div).setOption(option);

				})(data[i]);
			}




			// 如果存在切换，则持行异步方法
			if(window.TouchSlide){

				// 切换的四个内容
				var divs = [
					document.getElementById('statistical_day'),
					document.getElementById('statistical_week'),
					document.getElementById('statistical_month'),
					document.getElementById('statistical_year'),
				];

				TouchSlide({ slideCell:"#statistical_tab" ,startFun:function(i){


					var elem = divs[i];

					// 缓存
					if(elem.ajaxd) return;
					elem.ajaxd = true;


					$.getJSON(elem.getAttribute('ajax'),function(json){

						for(var i=0,l=json.length;i<l;i++){
							(function(item){

								var div = document.createElement('div');
								var option = getChartObj(item);
								document.getElementById(elem.getAttribute('id')).appendChild(div);
								div.style.cssText = 'margin:0 12px 10px; height: 260px;border-bottom:3px solid #ffba00;';

								ec.init(div).setOption(option);

							})(json[i]);
						}


					})




				}});

			}
			




		}
	);




