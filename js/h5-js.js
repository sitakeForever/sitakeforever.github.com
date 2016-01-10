window.onload=function(){
	if(!document.addEventListener)
	{
		alert('您的浏览器版本过低，请使用chrome浏览器观看H5相关效果');
	}
	
	//首屏效果
	;(function(){
		var oFBox=document.querySelector('.f-box');
		var oFirst=oFBox.querySelector('.first');
		setTimeout(function(){
			//alert(1);
		},1000);
		oFirst.addEventListener('animationend',function(){
			this.style.display='none';
		},false);
	})();
	
	;(function(){
		var oBox=document.querySelector('.l-box');

			//创建span
			var R=4;
			var C=7;
			var w=oBox.offsetWidth/C;
			var h=oBox.offsetHeight/R;
			for(var r=0;r<R;r++)
			{
				for(var c=0;c<C;c++)
				{
					var oSpan=document.createElement('span');
					oSpan.style.width=w+'px';
					oSpan.style.height=h+'px';
					var l=c*w;
					var t=r*h;
					oSpan.style.left=l+'px';
					oSpan.style.top=t+'px';
					oSpan.style.backgroundPosition='-'+l+'px -'+t+'px';
					oBox.appendChild(oSpan);
				}
			}

			//点击
			var aSpan=oBox.children;
			var disC=oBox.offsetWidth/2;
			var disD=oBox.offsetHeight/2;
			var iNow=0;
			var bReady=true;
			oBox.onclick=function(){
				if(bReady==false)return;
				bReady=false;
				iNow++;
				for(var i=0;i<aSpan.length;i++)
				{
					var x=aSpan[i].offsetLeft+aSpan[i].offsetWidth/2-disC;
					var y=aSpan[i].offsetTop+aSpan[i].offsetHeight/2-disD;
					aSpan[i].style.transition='1s all ease';
					aSpan[i].style.opacity=0;
					aSpan[i].style.transform='perspective(800px) translate('+x+'px,'+y+'px) scale(1.2) rotateX('+rnd(-180,180)+'deg) rotateY('+rnd(-180,180)+'deg)';
				}

				aSpan[0].addEventListener('transitionend',tEnd,false);
				function tEnd()
				{
					for(var i=0;i<aSpan.length;i++)
					{
						aSpan[i].style.transition='none';
						aSpan[i].style.opacity=1;
						aSpan[i].style.transform='perspective(800px) translate(0px,0px) scale(1) rotateX(0deg) rotateY(0deg) ';
						//换图
						aSpan[i].style.backgroundImage='url(images/h5/'+iNow%3+'.jpg)';
						oBox.style.backgroundImage='url(images/h5/'+(iNow+1)%3+'.jpg)';
					}
					bReady=true;
					aSpan[0].removeEventListener('transitionend',tEnd,false);
				}
			};
		
		function rnd(n,m)
		{
			return parseInt(Math.random()*(m-n)+n);
		}
	})();
	
	;(function(){
		var oPrev=document.getElementById('prev');
		var oNext=document.getElementById('next');
		var aLi=document.querySelectorAll('.page2 ul li');
		var aSpan=document.querySelectorAll('.page2 ul span');

		var aClass=[];
		var bFlag=true;
		//获取class
		for(var i=0;i<aLi.length;i++)
		{
			aClass[i]=aLi[i].className;
		}
		function tab()
		{
//			for(var i=0;i<aSpan.length;i++)
//			{
//				aSpan[i].style.display='none';
//			}

			for(var i=0;i<aLi.length;i++)
			{
				aLi[i].className=aClass[i];
				
			}
			var oCur=document.querySelector('.cur');
			
			function tEnd()
			{
				bFlag=true;
//				for(var i=0;i<aSpan.length;i++)
//				{
//					aSpan[i].style.display='block';
//				}
				oCur.removeEventListener('transitionend',tEnd,false);
			}
			oCur.addEventListener('transitionend',tEnd,false);
		}
		//next
		oNext.onclick=function(){
			if(bFlag==false)return;
			bFlag=false;
			aClass.push(aClass.shift());
			tab();
		};
		oPrev.onclick=function(){
			if(bFlag==false)return;
			bFlag=false;
			aClass.unshift(aClass.pop());
			tab();
		};
	})();
	
	//移动端页面跳转
	(function(){
		var aA=document.querySelectorAll('.page4 nav a');
		var arr=['h5/ctrip/index.html','h5/jd/index.html','h5/guokr/index.html',
		'h5/gulp/index.html','h5/juhuasuan/index.html','h5/some/index.html'];
		
		for(var i=0;i<arr.length;i++)
		{
			(function(index){
				aA[i].onclick=function(){
					window.open(arr[index],'_block');
				};
			})(i);
		}
	})();
};
