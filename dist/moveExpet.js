	'use strict'	//严格模式
	function getStyle(obj,sname){
		return (obj.currentStyle||getComputedStyle(obj,false))[sname];
	};
	function starmove(obj,json,time,type){
		//var star=parseFloat(getStyle(obj,name));
		//var dis=iTarget-star;
		var star={};
		var dis={};
		for(var name in json){
			star[name]=parseFloat(getStyle(obj,name));
			dis[name]=json[name]-star[name];
		}
		var count=Math.floor(time/30);
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			//如果name是opacity 那么没有px 所以有问题		
			for ( var name in json){
				switch(type){
					case 'lisner':
					var cur=star[name]+dis[name]*n/count;
					break;
					case 'list-out':
					var a=1-n/count;
					var cur=star[name]+dis[name]*(1-Math.pow(a,3));
					break;
					case 'list-in':
					var a=n/count;
					var cur=star[name]+dis[name]*Math.pow(a,3);
					break;
					default :
					var a=1-n/count;
					var cur=star[name]+dis[name]*(1-Math.pow(a,3));
					break;
				}
				

				if(name=='opacity'){
					obj.style[name]=cur;
					obj.style.filter='alpha(opacity:'+cur*100+')';
				}else{
					obj.style[name]=cur+'px';
				}
			}	
				//用判断解决opacity
				
				if (n==count) {
					clearInterval(obj.timer);
				}
			
		},30)	
	}